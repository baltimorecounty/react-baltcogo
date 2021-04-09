import React, { useState, useEffect } from "react";
import { Form, connect } from "formik";
import axios from "axios";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import FormContainer from "./FormContainer";
import Modal from "./Modal";
import Note from "./Note";
import { Link } from "react-router-dom";
import { GetContactDetails } from "../services/authService";
import { IsFormInComplete } from "../utilities/FormHelpers";
import { returnConfigItems } from "../utilities//returnEnvironmentItems";
import PetType from "./petType";
import TrashRecycleType from "./TrashRecycleIssues";
import RequestCategory from "./requestCategory";
import RequestSubCategory from "./requestSubCategory";
import OtherAnimalsTypes from "./otherAnimalTypes";
import SexType from "./sexType";
import AnimalColorType from "./animalColorType";
import AnimalBreedType from "./animalBreedType";
import { URLRouting, SetFieldValues } from "../utilities/FormHelpers";
import { Go, Routes } from "../Routing";
import SeButton from "./SeButton";
import { GetCategory, GetSubCategory } from "../utilities/CategoryHelpers";

const getUrlVars = () => {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .replace("#/", "")
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0].toLowerCase()] = hash[1];
  }
  return vars;
};
const getUrlVar = name => {
  const searchParms = getUrlVars();
  return searchParms[name];
};

const categoryId = getUrlVar("categoryid");

const getSubCategories = (categories, categoryName) => {
  var category = categories.find(
    category => category.name.toLowerCase() === categoryName
  );
  return category ? category.types : [];
};
const getSubCategoriesIncludedDescription = (categories, categoryName) => {
  var subInfo = categories.find(
    category => category.name.toLowerCase() === categoryName
  );
  return subInfo ? subInfo : "";
};
const getIncludedDescriptions = (categories, categoryName) => {
  var category = categories.find(
    category => category.name.toLowerCase() === categoryName
  );
  return category ? category.description : "";
};
const getIncludedFields = (categories, categoryName) => {
  var category = categories.find(
    category => category.name.toLowerCase() === categoryName
  );
  return category ? category.fields : [];
};
const getshouldDisableForm = (subCategories, name) => {
  var type = subCategories.find(
    subcategoryname => subcategoryname.name.toLowerCase() === name
  );

  return type && !!type.shouldDisableForm;
};
const getrequiresLocation = (categories, name) => {
  var category = categories.find(
    category => category.name.toLowerCase() === name
  );
  return category ? category.requiresLocation : true;
};
const getAnimalSubCategories = (AnimalBreeds, animalName) => {
  var animalCats = AnimalBreeds.find(
    animal => animal.animal.toLowerCase() === animalName
  );
  return animalCats ? animalCats : [];
};

const getTrashRecycleIssues = (issues, issueName) => {
  var trashRecycle = issues.find(
    issue => issue.name.toLowerCase() === issueName
  );
  return trashRecycle ? trashRecycle : [];
};
const getID = (categories, categoryName) => {
  var category = categories.find(
    category => category.name.toLowerCase() === categoryName
  );
  return category ? category.id : [];
};

const ServiceRequestForm = (props, errors, touched) => {
  const localProps = props.formik;
  const [activeCategory, setActiveCategory] = useState({});
  const [activeSubCategory, setActiveSubCategory] = useState({});
  const [Categories, setCategories] = useState([]);
  const [PetTypes, setPetTypes] = useState([]);
  const [AnimalBreeds, setAnimalBreeds] = useState([]);
  const [AnimalColors, setAnimalColors] = useState([]);
  const [OtherAnimalTypes, setOtherAnimalTypes] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [notes, setNotes] = useState();
  const [animalSubCategories, setAnimalSubCategories] = useState([]);
  const [animalSex, setAnimalSex] = useState([]);
  const [trashRecycleType, setTrashRecycleType] = useState([]);
  const [selectedTrashRecycleType, setSelectedTrashRecycleType] = useState([]);


  const {
    ContactID,
    RequestPage,
    Tabs,
    shouldDisableForm,
    MapDefaults,
    isPanelRequired,
    requestType,
    subRequestType,
    petType
  } = localProps.values;

  const contactID =
    ContactID === "" ? sessionStorage.getItem("UserLoginID") : ContactID;

  try {
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          returnConfigItems("jsonFileLocations", "results")
        );
        const resultPetTypes = await axios(
          returnConfigItems("jsonFileLocations", "resultPetTypes")
        );
        const resultAnimalBreeds = await axios(
          returnConfigItems("jsonFileLocations", "resultAnimalBreeds")
        );
        const resultAnimalColors = await axios(
          returnConfigItems("jsonFileLocations", "resultAnimalColors")
        );
        const resultAnimalTypes = await axios(
          returnConfigItems("jsonFileLocations", "resultAnimalTypes")
        );
        const resultFormFieldNames = await axios(
          returnConfigItems("jsonFileLocations", "resultFormFieldNames")
        );

        const resultTrashRecycleType = await axios(
          returnConfigItems("jsonFileLocations", "resultTrashRecycleType")
        );
        setCategories(result.data);
        setPetTypes(resultPetTypes.data);
        setAnimalBreeds(resultAnimalBreeds.data);
        setAnimalColors(resultAnimalColors.data);
        setOtherAnimalTypes(resultAnimalTypes.data);

        setTrashRecycleType(resultTrashRecycleType.data);

        const preSelectedTypes = SelectedValue(result.data);

        let requestCategory = "";
        let requestSubCategory = "";

        const selectedType = () => {
          requestCategory = preSelectedTypes
            ? preSelectedTypes.nameCategory
            : requestType;
          if (requestCategory) {
            addSelectedValueOptions(result.data, requestCategory.toLowerCase());
          }
          return requestCategory;
        };

        const selectedSubType = () => {
          requestSubCategory = preSelectedTypes
            ? preSelectedTypes.nameSubCategory
            : subRequestType;
          if (requestSubCategory) {
            addSelectedSubValueOptions(
              result.data,
              requestSubCategory.toLowerCase()
            );

            const subIssues = getTrashRecycleIssues(
              resultTrashRecycleType.data,
              requestSubCategory
            );
            setSelectedTrashRecycleType(subIssues.types);
          }
          return requestSubCategory;
        };
        const fields = {
          Categories: result.data,
          Tabs: resultFormFieldNames.data.Tabs,
          RequestPage: resultFormFieldNames.data.RequestPage,
          MapDefaults: resultFormFieldNames.data.MapDefaults,
          MapPage: resultFormFieldNames.data.MapPage,
          AdditionalInfoPage: resultFormFieldNames.data.AdditionalInfoPage,
          SignInPage: resultFormFieldNames.data.SignInPage,
          SignUpPage: resultFormFieldNames.data.SignUpPage,
          ResetPasswordPage: resultFormFieldNames.data.ResetPasswordPage,
          ContactID: contactID,
          requestType: selectedType(),
          subRequestType: selectedSubType()
        };

        SetFieldValues(localProps, fields);

        if (contactID) {
          getContactDetails();
        }
      };

      fetchData();
    }, []);
  } catch (ex) {
    console.error("service request form data", ex);
  }

  const SelectedValue = Categories => {
    return URLRouting(Categories, categoryId);
  };

  const addSelectedValueOptions = (Categories, value) => {
    let ID = getID(Categories, value);
    const category = GetCategory(Categories, ID);
    setActiveCategory(category);

    const subCategories = getSubCategories(Categories, value);
    setSubCategories(subCategories);

    const description = getIncludedDescriptions(Categories, value);
    const fields = getIncludedFields(Categories, value);
    const requiresLocation = getrequiresLocation(Categories, value);

    const requestFields = {
      requestTypeID: ID,
      requestTypeDescriptionID: description,
      requiresLocation: requiresLocation === undefined ? true : requiresLocation
    };

    SetFieldValues(localProps, requestFields);

    if (value === "website issue") {
      const addressFields = {
        Latitude: MapDefaults.Latitude,
        Longitude: MapDefaults.Longitude,
        location: MapDefaults.Location
      };
      SetFieldValues(localProps, addressFields);
    }

    pullServiceRequestFields(fields);
  };

  const addSelectedSubValueOptions = (Categories, value) => {
    const subCategories = Categories.flatMap(x => x.types);
    const subInfo = getSubCategoriesIncludedDescription(subCategories, value);
    let ID = getID(subCategories, value);
    const subCategory = GetSubCategory(Categories, ID);
    setActiveSubCategory(subCategory);
    const isDisabled = getshouldDisableForm(subCategories, value);

    const notes = subCategory ? subCategory.note : null;
    setNotes(
      <Note
        className="status"
        type="information"
        icon="far fa-info-circle"
        message={notes}
      />
    );

    const requestSubFields = {
      subRequestTypeID: ID,
      shouldDisableForm: isDisabled
    };

    SetFieldValues(localProps, requestSubFields);

    if (subInfo !== undefined) {
      const parentRequestTypeID =
        subInfo.parentId !== undefined ? subInfo.parentId : "";
      SetFieldValues(localProps, { requestTypeParentID: parentRequestTypeID });

      const parentRequestTypeName =
        subInfo.parentName !== undefined ? subInfo.parentName : "";
      SetFieldValues(localProps, { requestTypeParent: parentRequestTypeName });

      if (subInfo.description !== undefined) {
        SetFieldValues(localProps, {
          requestTypeDescriptionID: subInfo.description
        });
      }
      if (subInfo.streetAddress !== undefined) {
        SetFieldValues(localProps, {
          requestTypeAddressID: subInfo.streetAddress
        });
      }
      if (subInfo.city !== undefined) {
        SetFieldValues(localProps, { requestTypeCityID: subInfo.city });
      }
      if (subInfo.zipCode !== undefined) {
        SetFieldValues(localProps, { requestTypeZipID: subInfo.zipCode });
      }
    }
  };

  const handleServiceRequestChange = changeEvent => {
    const { options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text.toLowerCase();
    addSelectedValueOptions(Categories, selectedText);
  };

  const handleServiceSubRequestChange = changeEvent => {
    const trashRecycleArray = [
      "trash pickup issue",
      "recycling pickup issue",
      "yard waste pickup issue",
      "trash hauler issue",
      "other issues & requests"
    ];
    const { options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text.toLowerCase();
    if (trashRecycleArray.indexOf(selectedText) >= 0) {
      let ID = getID(trashRecycleType, selectedText);
      const subIssues = getTrashRecycleIssues(trashRecycleType, selectedText);
      setSelectedTrashRecycleType(subIssues.types);
      SetFieldValues(localProps, { TrashRecycleIssueID: ID });
    }
    addSelectedSubValueOptions(Categories, selectedText);
  };

  const pullServiceRequestFields = fields => {
    if (fields !== undefined) {
      const addressFields = {
        requestTypeAddressID: fields.streetAddress,
        requestTypeCityID: fields.city,
        requestTypeZipID: fields.zipCode,
        isPanelRequired: true
      };
      SetFieldValues(localProps, addressFields);
    } else {
      SetFieldValues(localProps, { isPanelRequired: false });
    }
  };

  const handleServicePetChange = changeEvent => {
    const { options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text.toLowerCase();
    let ID = getID(PetTypes, selectedText);
    const subBreeds = getAnimalSubCategories(AnimalBreeds, selectedText);
    setAnimalSubCategories(subBreeds.breeds);
    setAnimalSex(subBreeds.sex);
    SetFieldValues(localProps, { petTypeID: ID });
  };

  const handleServiceTrashRecycleIssueChange = changeEvent => {
    const { options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text.toLowerCase();
    let ID = getID(selectedTrashRecycleType, selectedText);
    SetFieldValues(localProps, { trashRecycleIssueTypeID: ID });
  };

  const handleFieldChange = (changeEvent, propertyName) => {
    const value = changeEvent.currentTarget.value.toLowerCase();
    SetFieldValues(localProps, { [propertyName]: value });
  };

  const handleAnimalColorChange = changeEvent => {
    handleFieldChange(changeEvent, "animalColorTypeID");
  };

  const handleOtherPetTypeChange = changeEvent => {
    handleFieldChange(changeEvent, "otherAnimalTypesID");
  };

  const handlePetSexChange = changeEvent => {
    handleFieldChange(changeEvent, "sexTypeID");
  };

  const handleAnimalBreedChange = changeEvent => {
    handleFieldChange(changeEvent, "animalBreedID");
  };

  const checkPetType = value => {
    value = value.toLowerCase();
    var animalCats = AnimalBreeds.find(animal => animal.animal === value);
    if (animalCats !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const buttonShowHideValidation = () => {
    return !localProps.values.shouldDisableForm;
  };

  const buttonDisableValidation = () => {
    return IsFormInComplete(props.formik, activeCategory);
  };

  const getContactDetails = async () => {
    try {
      const getResponse = await GetContactDetails(contactID);

      if (getResponse.data.HasErrors) {
        const errorsReturned = GetResponseErrors(getResponse);
        throw new Error(errorsReturned);
      } else {
        const NameFirst = getResponse.data.Results.NameFirst;
        const NameLast = getResponse.data.Results.NameLast;
        const Email = getResponse.data.Results.Email;
        const Phone = getResponse.data.Results.Telephone;

        const fields = {
          NameFirst: NameFirst,
          NameLast: NameLast,
          Email: Email,
          Telephone: Phone
        };

        SetFieldValues(localProps, fields);
      }
    } catch (ex) {}
  };
  const goToNextPage = () => {
    Go(props, Routes.ProvideDetails);
  };

  const callSignInForm = () => {
    Go(props, Routes.SignIn);
  };

  const callRegisterForm = () => {
    Go(props, Routes.SignUp);
  };

  const logOutUser = () => {
    sessionStorage.clear();
    SetFieldValues(localProps, { ContactID: "" });
    SetFieldValues(localProps, { ignoreFormCompletion: true });
  };

  const { values, isSubmitting, ...rest } = props;

  const loadSelectedItems = props => {
    let requestType = localProps.values["requestType"];

    if (
      Categories.length > 0 &&
      PetTypes.length > 0 &&
      AnimalBreeds.length > 0 &&
      AnimalColors.length > 0 &&
      OtherAnimalTypes.length > 0
    ) {
  
      if (requestType) {
        if (subCategories.length === 0) {
          const value = requestType.toLowerCase();
          const subCategories = getSubCategories(Categories, value);
          setSubCategories(subCategories);
          if (petType) {
            let value = petType.toLowerCase();
            const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
            setAnimalSubCategories(subBreeds.breeds);
            setAnimalSex(subBreeds.sex);
          }
        }
      }
    }
  };

  let disableButton = buttonDisableValidation();
  let displayButton = buttonShowHideValidation();
  loadSelectedItems(props);

  const isAnimalCategory = activeCategory ? activeCategory.isAnimal : false;
  const isTrashRecycleIssueCategory = activeCategory
    ? activeCategory.isTrashRecyclingIssue
    : false;

  const petAndAnimalIssue = returnConfigItems(
    "formTypes",
    "requestType_petAndAnimalIssue"
  );
  const petTypeCat = returnConfigItems("formTypes", "petTypeCat");
  const petTypeDog = returnConfigItems("formTypes", "petTypeDog");

  return (
    <FormContainer
      title={RequestPage.RequestTitle}
      tabNames={Tabs}
      currentTab="ServiceRequestForm"
      shouldDisableForm={shouldDisableForm}
      isPanelRequired={isPanelRequired}
    >
      <Form>
        <RequestCategory
          errorsRequestType={localProps.errors.requestType}
          touchedRequestType={localProps.touched.requestType}
          pageFieldName={RequestPage.CategoryLabel}
          handleServiceRequestChange={handleServiceRequestChange}
          rest={rest}
          Categories={Categories}
        />

        <RequestSubCategory
          requestType={requestType}
          errorsSubRequestType={localProps.errors.subRequestType}
          touchedSubRequestType={localProps.touched.subRequestType}
          pageFieldName={RequestPage.SubCategoryLabel}
          handleServiceSubRequestChange={handleServiceSubRequestChange}
          rest={rest}
          subCategories={subCategories}
        />

        {activeSubCategory && activeSubCategory.warning && (
          <Note>{activeSubCategory.warning}</Note>
        )}
        <TrashRecycleType
          shouldShow={isTrashRecycleIssueCategory}
          requestType={requestType}
          subRequestType={subRequestType}
          errorsTrashRecycleIssueType={localProps.errors.transhRecycleIssueType}
          touchedTrashRecycleIssueType={
            localProps.touched.transhRecycleIssueType
          }
          pageFieldName={RequestPage.TrashRecycleIssuesLabel}
          handleServiceTrashRecycleIssueChange={
            handleServiceTrashRecycleIssueChange
          }
          rest={rest}
          selectedTrashRecycleType={selectedTrashRecycleType}
        />

        {localProps.values.shouldDisableForm && notes}
        {!localProps.values.shouldDisableForm && (
          <PetType
            shouldShow={isAnimalCategory}
            requestType={requestType}
            requestType_petAndAnimalIssue={petAndAnimalIssue}
            subRequestType={subRequestType}
            errorsPetType={localProps.errors.petType}
            touchedPetType={localProps.touched.petType}
            pageFieldName={RequestPage.PetType}
            handleServicePetChange={handleServicePetChange}
            rest={rest}
            PetTypes={PetTypes}
          />
        )}
        <OtherAnimalsTypes
          shouldShow={isAnimalCategory}
          subRequestType={subRequestType}
          petType={petType}
          returnRequestTypes={returnConfigItems("formTypes", "petType_Others")}
          errorsOtherAnimalTypes={localProps.errors.otherAnimalTypes}
          touchedOtherAnimalTypes={localProps.touched.otherAnimalTypes}
          pageFieldName={RequestPage.PetTypeOther}
          rest={rest}
          handleOtherPetTypeChange={handleOtherPetTypeChange}
          OtherAnimalTypes={OtherAnimalTypes}
        />

        <SexType
          shouldShow={isAnimalCategory}
          subRequestType={subRequestType}
          checkPetType={checkPetType(petType)}
          errorsSexType={localProps.errors.sexType}
          touchedSexType={localProps.touched.sexType}
          pageFieldName={RequestPage.PetSex}
          rest={rest}
          handlePetSexChange={handlePetSexChange}
          animalSex={animalSex}
        />
        <AnimalColorType
          shouldShow={isAnimalCategory}
          requestType={requestType}
          requestType_petAndAnimalIssue={petAndAnimalIssue}
          subRequestType={subRequestType}
          petType={petType}
          petTypeCat={petTypeCat}
          petTypeDog={petTypeDog}
          errorsAnimalColorType={localProps.errors.animalColorType}
          touchedAnimalColorType={localProps.touched.animalColorType}
          pageFieldName={RequestPage.PetColor}
          handleAnimalColorChange={handleAnimalColorChange}
          rest={rest}
          AnimalColors={AnimalColors}
        />

        <AnimalBreedType
          shouldShow={isAnimalCategory}
          requestType={requestType}
          requestType_petAndAnimalIssue={petAndAnimalIssue}
          subRequestType={subRequestType}
          petType={petType}
          petTypeCat={petTypeCat}
          petTypeDog={petTypeDog}
          errorsAnimalBreedType={localProps.errors.animalBreedType}
          touchedAnimalBreedType={localProps.touched.animalBreedType}
          pageFieldName={RequestPage.PetBreed}
          handleAnimalBreedChange={handleAnimalBreedChange}
          rest={rest}
          animalSubCategories={animalSubCategories}
        />

        {displayButton ? (
          !contactID ? (
            <div className="d-md-flex justify-content-md-between d-sm-block">
              <SeButton
                text="Sign In"
                isDisabled={disableButton}
                onClick={callSignInForm}
              />
              <Modal className="d-sm-block" />
              <SeButton
                text="Register"
                isDisabled={disableButton}
                onClick={callRegisterForm}
              />
            </div>
          ) : (
            <div className="cs-form-control">
              <p name="userLoggedIn">
                {RequestPage.AlreadySignedInLabel}{" "}
                {sessionStorage.getItem("NameFirst")}{" "}
                {sessionStorage.getItem("NameLast")}
              </p>
              <p name="notCorrectUser">
                <Link to="SignInForm" onClick={logOutUser}>
                  Not {sessionStorage.getItem("NameFirst")}? Log in to a
                  different account. &nbsp;{" "}
                </Link>
              </p>
              <div className="d-md-flex justify-content-md-end d-sm-block">
                <SeButton
                  text="Next"
                  isDisabled={disableButton}
                  onClick={goToNextPage}
                />
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </Form>
    </FormContainer>
  );
};

export default connect(ServiceRequestForm);
