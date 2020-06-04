import React from "react";
import ErrorMsg from "./ErrorMessage";

import { Select } from "@baltimorecounty/dotgov-components";
const AnimalColorType = ({
  subRequestType,
  petType,
  petTypeCat,
  petTypeDog,
  errorsAnimalColorType,
  touchedAnimalColorType,
  pageFieldName,
  handleAnimalColorChange,
  rest,
  AnimalColors,
  shouldShow,
}) => {
  const { animalColorTypeID } = rest.formik.values;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text;

    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");

    localProps.setFieldTouched(name, true);
    handleAnimalColorChange(changeEvent);
  };
  return (
    <React.Fragment>
      {shouldShow &&
      subRequestType !== "" &&
      (petType === petTypeCat || petType === petTypeDog) ? (
        <div
          className={
            errorsAnimalColorType && touchedAnimalColorType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="animalColorType"
            name="animalColorType"
            label={pageFieldName}
            options={AnimalColors}
            onChange={handleChange}
            value={animalColorTypeID}
            {...rest}
          />
          <p role="alert" className="error-message">
            {
              <ErrorMsg
                errormessage={errorsAnimalColorType}
                touched={touchedAnimalColorType}
              />
            }
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AnimalColorType;
