import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const SubCategory = ({
  requestType,
  errorsSubRequestType,
  touchedSubRequestType,
  pageFieldName,
  handleServiceSubRequestChange,
  rest,
  subCategories
}) => {
  const { subRequestTypeID } = rest.formik.values;
  const handleChange = changeEvent => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text.toLowerCase();
   // console.log('subRequestTypeID:' + subRequestTypeID);
    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");
    localProps.setFieldTouched(name, true);
    localProps.setFieldValue("subRequestTypeDescriptionID", "");
    localProps.setFieldValue("subRequestTypeAddressID", "");
    localProps.setFieldValue("subRequestTypeCityID", "");
    localProps.setFieldValue("subRequestTypeZipID", "");
    localProps.setFieldValue("petType", "");
    localProps.setFieldValue("otherAnimalTypes", "");
    localProps.setFieldValue("sexType", "");
    localProps.setFieldValue("animalColorType", "");
    localProps.setFieldValue("animalBreed", "");
    handleServiceSubRequestChange(changeEvent);
  };
  return (
    <React.Fragment>
      {requestType !== "" ? (
        <div
          className={
            errorsSubRequestType && touchedSubRequestType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="subRequestType"
            name="subRequestType"
            label={pageFieldName}
            options={subCategories}
            onChange={handleChange}
            value={subRequestTypeID}
            {...rest}
          />
          <p role="alert" className="error-message">
            <ErrorMsg
              errormessage={errorsSubRequestType}
              touched={touchedSubRequestType}
            />
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SubCategory;
