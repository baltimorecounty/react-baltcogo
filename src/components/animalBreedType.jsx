import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const AnimalBreedType = ({
  subRequestType,
  petType,
  petTypeCat,
  petTypeDog,
  errorsAnimalBreedType,
  touchedAnimalBreedType,
  pageFieldName,
  handleAnimalBreedChange,
  rest,
  animalSubCategories,
  shouldShow,
}) => {
  const { animalBreedID } = rest.formik.values;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text;

    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");

    localProps.setFieldTouched(name, true);
    handleAnimalBreedChange(changeEvent);
  };

  return (
    <React.Fragment>
      {shouldShow &&
      subRequestType !== "" &&
      (petType === petTypeCat || petType === petTypeDog) ? (
        <div
          className={
            errorsAnimalBreedType && touchedAnimalBreedType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="animalBreedType"
            name="animalBreedType"
            label={pageFieldName}
            options={animalSubCategories}
            onChange={handleChange}
            value={animalBreedID}
            {...rest}
          />
          <p role="alert" className="error-message">
            {
              <ErrorMsg
                errormessage={errorsAnimalBreedType}
                touched={touchedAnimalBreedType}
              />
            }
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AnimalBreedType;
