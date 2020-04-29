import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const PetType = ({
  subRequestType,
  errorsPetType,
  touchedPetType,
  pageFieldName,
  handleServicePetChange,
  rest,
  PetTypes,
  shouldShow,
}) => {
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text;

    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");
    localProps.setFieldTouched(name, true);
    localProps.setFieldValue("sexType", "");
    localProps.setFieldValue("sexTypeID", "");
    localProps.setFieldValue("animalColorType", "");
    localProps.setFieldValue("animalColorTypeID", "");
    localProps.setFieldValue("animalBreedType", "");
    localProps.setFieldValue("animalBreedID", "");
    localProps.setFieldValue("otherAnimalTypes", "");
    localProps.setFieldValue("otherAnimalTypesID", "");
    handleServicePetChange(changeEvent);
  };

  return (
    <React.Fragment>
      {shouldShow && subRequestType !== "" ? (
        <div
          className={
            errorsPetType && touchedPetType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="petType"
            name="petType"
            label={pageFieldName}
            options={PetTypes}
            onChange={handleChange}
            {...rest}
          />
          <p role="alert" className="error-message">
            {<ErrorMsg errormessage={errorsPetType} touched={touchedPetType} />}
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PetType;
