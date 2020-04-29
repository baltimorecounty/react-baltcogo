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
  const handleChange = changeEvent => {
    const target = changeEvent.nativeEvent.target;
    const index = target.selectedIndex;
    const selectedText = target[index].text;
    const { name } = changeEvent.target;
    const localProps = rest.formik;
    index > 0
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
