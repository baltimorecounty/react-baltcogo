import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const SexType = ({
  subRequestType,
  checkPetType,
  errorsSexType,
  touchedSexType,
  pageFieldName,
  rest,
  handlePetSexChange,
  animalSex,
  shouldShow,
}) => {
  const { sexTypeID } = rest.formik.values;
  const handleChange = (changeEvent) => {
    const localProps = rest.formik;
    const { name, options, selectedIndex } = changeEvent.target;
    const selectedText = options[selectedIndex].text;

    selectedIndex > 0
      ? localProps.setFieldValue(name, selectedText)
      : localProps.setFieldValue(name, "");

    localProps.setFieldTouched(name, true);
    handlePetSexChange(changeEvent);
  };
  return (
    <React.Fragment>
      {shouldShow && subRequestType !== "" && checkPetType ? (
        <div
          className={
            errorsSexType && touchedSexType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <Select
            id="sexType"
            name="sexType"
            label={pageFieldName}
            options={animalSex}
            onChange={handleChange}
            value={sexTypeID}
            {...rest}
          />
          <p role="alert" className="error-message">
            {<ErrorMsg errormessage={errorsSexType} touched={touchedSexType} />}
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SexType;
