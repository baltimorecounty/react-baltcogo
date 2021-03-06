import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const OtherAnimalTypes = ({
  petType,
  returnRequestTypes,
  errorsOtherAnimalTypes,
  touchedOtherAnimalTypes,
  pageFieldName,
  rest,
  handleOtherPetTypeChange,
  OtherAnimalTypes,
  shouldShow,
}) => {
  const { otherAnimalTypesID } = rest.formik.values;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text;

    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");

    localProps.setFieldTouched(name, true);
    handleOtherPetTypeChange(changeEvent);
  };

  return (
    <React.Fragment>
      {shouldShow && petType === returnRequestTypes ? (
        <div
          className={
            errorsOtherAnimalTypes && touchedOtherAnimalTypes
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="otherAnimalTypes"
            name="otherAnimalTypes"
            label={pageFieldName}
            options={OtherAnimalTypes}
            onChange={handleChange}
            value={otherAnimalTypesID}
            {...rest}
          />
          <p role="alert" className="error-message">
            {
              <ErrorMsg
                errormessage={errorsOtherAnimalTypes}
                touched={touchedOtherAnimalTypes}
              />
            }
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default OtherAnimalTypes;
