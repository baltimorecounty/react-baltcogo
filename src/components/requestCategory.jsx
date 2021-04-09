import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";

const RequestCategory = ({
  errorsRequestType,
  touchedRequestType,
  pageFieldName = "",
  handleServiceRequestChange,
  rest,
  Categories,
}) => {
  const { requestTypeID } = rest.formik.values;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text.toLowerCase();

    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");
    localProps.setFieldTouched(name, true);
    localProps.setFieldValue("requestTypeDescriptionID", "");
    localProps.setFieldValue("requestTypeAddressID", "");
    localProps.setFieldValue("requestTypeCityID", "");
    localProps.setFieldValue("requestTypeZipID", "");
    localProps.setFieldValue("subRequestTypeDescriptionID", "");
    localProps.setFieldValue("subRequestTypeAddressID", "");
    localProps.setFieldValue("subRequestTypeCityID", "");
    localProps.setFieldValue("subRequestTypeZipID", "");
    localProps.setFieldValue("subRequestType", "");
    localProps.setFieldValue("subRequestTypeID", "");
    localProps.setFieldValue("trashRecycleIssueTypeID", "");
    localProps.setFieldValue("subRequestTypeCityID", "");
    localProps.setFieldValue("petType", "");
    localProps.setFieldValue("petTypeID", "");
    localProps.setFieldValue("otherAnimalTypes", "");
    localProps.setFieldValue("otherAnimalTypesID", "");
    localProps.setFieldValue("sexType", "");
    localProps.setFieldValue("sexTypeID", "");
    localProps.setFieldValue("animalColorType", "");
    localProps.setFieldValue("animalColorTypeID", "");
    localProps.setFieldValue("animalBreed", "");
    localProps.setFieldValue("animalBreedID", "");
    handleServiceRequestChange(changeEvent);
  };

  return (
    <React.Fragment>
      <div
        className={
          errorsRequestType && touchedRequestType
            ? "cs-form-control error"
            : "cs-form-control"
        }
      >
        <Select
          id="requestType"
          label={pageFieldName}
          name="requestType"
          options={Categories}
          onChange={handleChange}
          value={requestTypeID}
          {...rest}
        />
        <p role="alert" className="error-message">
          <ErrorMsg
            errormessage={errorsRequestType}
            touched={touchedRequestType}
          />
        </p>
      </div>
    </React.Fragment>
  );
};

export default RequestCategory;
