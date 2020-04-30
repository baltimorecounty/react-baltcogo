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
  const otherAnimalTypes  =rest.formik.values.otherAnimalTypes;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, value } = changeEvent.target;
    localProps.setFieldValue(name, value);
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
            value={otherAnimalTypes}
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
