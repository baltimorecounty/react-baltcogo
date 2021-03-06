import React from "react";
import classNames from "classnames";
import FieldError from "./FieldError";
import { GetErrorDetails } from "../utilities/FormikHelpers";
import { Field } from "formik";

const DescribeTheProblem = ({ name, formik, pageFieldName }) => {
  const { values = {} } = formik;
  const { isTouched, hasError, message: errorMessage } = GetErrorDetails(
    name,
    formik
  );
  const shouldDisplayValidation = isTouched && hasError;
  const containerCssClasses = classNames("cs-form-control", "address-search", {
    error: shouldDisplayValidation,
  });
  const fieldCssClasses = classNames("text-input", {
    error: shouldDisplayValidation,
  });
  const handleChange = (changeEvent) => {
    formik.setFieldValue(name, changeEvent.target.value);
  };

  return (
    <React.Fragment>
      <div className={containerCssClasses}>
        <label htmlFor={name} className="dg_label">
          {pageFieldName}
        </label>
        <Field
          component="textarea"
          placeholder="Maximum 2,000 characters."
          name={name}
          className={fieldCssClasses}
          value={values[name]}
          maxLength="2000"
          onChange={handleChange}
        />
        {shouldDisplayValidation && (
          <FieldError className="error-message">{errorMessage}</FieldError>
        )}
      </div>
    </React.Fragment>
  );
};

export default DescribeTheProblem;
