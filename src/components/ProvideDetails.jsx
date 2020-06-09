import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import FormContainer from "./FormContainer";
import Geocode from "react-geocode";
import Collapse from "./Collapse";
import axios from "axios";
import _ from "lodash";
import { IsFormInComplete } from "../utilities/FormHelpers";
import { returnConfigItems } from "../utilities//returnEnvironmentItems";
import { VerifyAddress } from "../services/authService";
import IssueType from "./IssueType";
import DescribeTheProblem from "./describeTheProblem";
import { SubmitReport } from "../services/ReportService";
import { HasResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import SeButton from "./SeButton";
import { GoHome, Go, Routes } from "../Routing";
import Note from "./Note";
import { GetSubCategory } from "../utilities/CategoryHelpers";

Geocode.setApiKey("AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8");

const provideDetails = (props) => {
  const { formik = {} } = props;
  const {
    MapPage,
    location,
    ContactID,
    describeTheProblem,
    Tabs,
    requiresLocation,
    shouldDisableForm,
    isPanelRequired,
    AdditionalInfoPage,
  } = formik.values;

  //Animation 2 is the icon drop. This was pulled out of the MapDefaults file as it has no meaning to WebServices
  const { Animation = 2, Latitude, Longitude } = formik.values.MapDefaults;

  const mapEvent = {
    onMapClicked: 0,
    addressSelect: 1,
  };
  const [updatedLatitude, setLatitude] = useState(Latitude);
  const [updatedLongitude, setLongitude] = useState(Longitude);
  const [Address, setData] = useState([]);
  const [AddressChangeBy, setAddressChange] = useState(mapEvent.onMapClicked);
  const [query, setQuery] = useState(encodeURIComponent());

  useEffect(() => {
    const fetchData = async () => {
      const mapEndPoint = returnConfigItems("mapEndPoint", "mapGISEndPoint");

      if (query !== "undefined" && query.length > 0) {
        const result = await axios(`${mapEndPoint}${query}`);
        if (result.status === 200) {
          setData(result.data);
        } else {
          setData([]);
        }
      }
    };

    formik.setFieldValue("currentTab", "ProviderDetail");
    if (!ContactID || IsFormInComplete(formik)) {
      GoHome(props);
    }
    fetchData();
  }, [query]);

  const { Categories = [] } = formik.values;
  const subCategoryId = formik.values.subRequestTypeID;
  const subCategory = GetSubCategory(Categories, subCategoryId);

  const reverseGeocode = async (latitude, longitude) => {
    const mapReverseEndPoint = returnConfigItems(
      "mapEndPoint",
      "mapReverseGISEndPoint"
    );
    const result = await axios(
      `${mapReverseEndPoint}${longitude}%2C${latitude}&f=pjson`
    );
    return result;
  };

  const handleAddressChange = (e) => {
    setQuery(e.target.value);
    let searchQuery = _.split(e.target.value, ",", 1);

    if (searchQuery.length > 0) {
      let filtered = Address.filter(
        (m) =>
          m.StreetAddress.toLowerCase().indexOf(
            searchQuery.toString().toLowerCase()
          ) > -1
      );
      filtered.map((item) => splitAddress(item.Latitude, item.Longitude));
    }
  };

  const handleAddressSelect = (val) => {
    setQuery(val);

    let searchQuery = _.split(val, ",", 1);
    if (searchQuery.length > 0) {
      let filtered = Address.filter(
        (m) =>
          m.StreetAddress.toLowerCase().indexOf(
            searchQuery.toString().toLowerCase()
          ) > -1
      );
      filtered.map((item) => splitAddress(item.Latitude, item.Longitude));
    }
  };

  const splitAddress = (Latitude, Longitude) => {
    setLatitude(Latitude);
    setLongitude(Longitude);
    rest.formik.setFieldValue("Latitude", Latitude);
    rest.formik.setFieldValue("Longitude", Longitude);
    setAddressChange(mapEvent.addressSelect);
  };

  const onZoom = (val) => {
    rest.formik.setFieldValue("ZoomValue", val);
  };

  const onMarkerDragEnd = async (event, setFieldValue) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    setAddressChange(mapEvent.onMapClicked);

    await reverseGeocode(newLat, newLng).then((response) => {
      try {
        let address = _.split(response.data.address.Match_addr, ",", 3);
        address = UpperCaseFirstLetter(address[0], address[1], address[2]);
        rest.formik.setFieldValue("location", address);
        setLongitude(newLng);
        setLatitude(newLat);
        rest.formik.setFieldValue("Latitude", newLat);
        rest.formik.setFieldValue("Longitude", newLng);
      } catch (ex) {
        rest.formik.setFieldValue("location", "");
        rest.formik.setFieldTouched("location", true);
        rest.formik.errors.location =
          "You must select a location inside Baltimore County.";
      }
    });
  };

  const goToAdditionalPage = async () => {
    const isDetailsFormValid = await validateDetails(formik.values);

    if (isDetailsFormValid) {
      const addressParts = location.split(",");
      rest.formik.setFieldValue("describeTheProblem", describeTheProblem);
      rest.formik.setFieldValue("subRequestTypeAddress", addressParts[0]);
      rest.formik.setFieldValue("subRequestTypeCity", addressParts[1]);
      rest.formik.setFieldValue(
        "subRequestTypeZip",
        addressParts.length === 3 ? addressParts[2] : addressParts[3]
      );
      Go(props, Routes.AdditionalInformation);
    }
  };

  const goServiceRequestForm = (values) => {
    GoHome(props);
  };
  const UpperCaseFirstLetter = (address, city, zip) => {
    return (
      _.startCase(_.camelCase(address)) +
      `, ` +
      _.startCase(_.camelCase(city)) +
      `, ` +
      _.startCase(_.camelCase(zip))
    );
  };

  const {
    values,
    errors,
    actions,
    touched,
    handleSubmit,
    setFieldValue,
    ...rest
  } = props;
  const items = Address.map((item, index) => ({
    id: item.Latitude + item.Longitude,
    label: UpperCaseFirstLetter(item.StreetAddress, item.City, item.Zip),
  }));

  let isValidatingAddress = false;
  /**
   * Determine if the given address is a valid Baltimore County address.
   * Handles Errors in addition to returning whether or not the address is valid.
   * TODO: // https://github.com/baltimorecounty/react-baltcogo/issues/80
   *
   * @param {string} address - address to validate
   * @param {function} errorFunc - function to handle errors
   * @param {string} errorMessage - string that displays a meaningful message to the user
   * @returns {bool} returns true if address is valid.
   */
  const verifyAddress = async (address, addressProperty = "location") => {
    formik.setFieldTouched(addressProperty, true); // Hack since we aren't using default validation and submit
    isValidatingAddress = true;
    if (!address) {
      return false;
    }

    try {
      const addressResponse = await VerifyAddress(address);
      if (HasResponseErrors(addressResponse)) {
        formik.setStatus({
          [addressProperty]: "Please enter a valid Baltimore County address.",
        });
        isValidatingAddress = false;
        return false;
      }
      isValidatingAddress = false;
      return true;
    } catch (ex) {
      formik.setStatus({
        [addressProperty]:
          "Something went wrong please try again in a few moments.",
      });
    }
    isValidatingAddress = false;
    return false;
  };

  // TODO: This should be moved to a Yup.js schema and handled accordingly.
  // https://github.com/baltimorecounty/react-baltcogo/issues/80
  const verifyProblemComment = (problem) => {
    const fieldName = "describeTheProblem";
    formik.setFieldTouched(fieldName, true); // Hack since we aren't using default validation and submit
    if (!problem) {
      return false;
    }

    return true;
  };

  /**
   * Validates the provide details panel's form
   * TODO: This should be moved to a Yup.js schema and handled accordingly.
   * https://github.com/baltimorecounty/react-baltcogo/issues/80
   *
   * @param {array} values - formik form values
   * @returns {bool} - true if the provide details form is valid
   */
  const validateDetails = async (values) => {
    var isValidProblem = verifyProblemComment(values.describeTheProblem);
    var isValidAddress = await verifyAddress(values.location);
    return isValidAddress && isValidProblem;
  };

  const SubmitForm = async (clickEvent) => {
    formik.setSubmitting(true);
    const isDetailsFormValid = await validateDetails(formik.values);

    if (isDetailsFormValid) {
      await SubmitReport(clickEvent, props);
    }
    formik.setSubmitting(false);
  };

  return (
    <FormContainer
      title={MapPage.DetailsTitle}
      tabNames={Tabs}
      currentTab="ProvideDetails"
      shouldDisableForm={shouldDisableForm}
      isPanelRequired={isPanelRequired}
      alert={
        subCategory &&
        !subCategory.shouldDisableForm &&
        subCategory.note && (
          <Note
            className="status"
            type="warning"
            icon="far fa-exclamation-triangle"
            message={subCategory.note}
          />
        )
      }
    >
      <Form>
        <Field type="hidden" name="Latitude" />
        <Field type="hidden" name="Longitude" />
        <Field type="hidden" name="ShowErrorMsg" />
        {requiresLocation ? (
          <div className="cs-form-control address-search">
            <label className="dg_label">{MapPage.DetailsMainLabel}</label>
            <p>{MapPage.DetailsMainLabelExplanation}</p>
            <IssueType
              name="location"
              formik={formik}
              items={items}
              handleAddressChange={handleAddressChange}
              handleAddressSelect={handleAddressSelect}
              pageFieldName={MapPage.AddressHeaderLabel}
            />

            <Collapse
              address={location}
              ZoomValue={rest.formik.values.ZoomValue}
              Animation={Animation}
              AddressChangeBy={AddressChangeBy}
              lat={updatedLatitude}
              lng={updatedLongitude}
              onZoom={onZoom}
              onMarkerDragEnd={(e) => onMarkerDragEnd(e, setFieldValue)}
            />
          </div>
        ) : null}

        <DescribeTheProblem
          name="describeTheProblem"
          formik={formik}
          errorsDescribeTheProblem={rest.formik.errors.describeTheProblem}
          touchedDescribeTheProblem={rest.formik.touched.describeTheProblem}
          pageFieldName={MapPage.ProblemLabel}
        />

        <p className="smallest">{AdditionalInfoPage.LegalDisclaimerBottom}</p>

        <div className="d-md-flex justify-content-md-between d-sm-block">
          <SeButton onClick={goServiceRequestForm} text="Previous" />
          {!rest.formik.values.requestTypeAddressID ? (
            <SeButton
              text="File Your Report"
              onClick={SubmitForm}
              isLoading={formik.isSubmitting}
              isLoadingText="Submitting Request..."
            />
          ) : (
            <div className="d-md-flex justify-content-md-end d-sm-block">
              <SeButton
                text="Next"
                onClick={goToAdditionalPage}
                isLoading={isValidatingAddress}
              />
            </div>
          )}
        </div>
      </Form>
    </FormContainer>
  );
};
export default connect(provideDetails);
