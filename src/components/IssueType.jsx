import React from "react";
import { GetErrorDetails } from "../utilities/FormikHelpers";
import FieldError from "./FieldError";
import AutoCompleteTypeField from "./AutocompleteTypeField";
import classNames from "classnames";

const IssueType = ({
  name,
  formik = {},
  items,
  handleAddressChange,
  handleAddressSelect,
  pageFieldName,
}) => {
  const { values = {} } = formik;
  const { isTouched, hasError, message: errorMessage } = GetErrorDetails(
    name,
    formik
  );

  const addressSearchCssClasses = classNames("address-search-wrapper", {
    error: hasError && isTouched,
  });

  return (
    <React.Fragment>
      <div>
        <label className="dg_label">Issue type</label>
        <div>
          <p className="smallest">
            {values.requestType} > {values.subRequestType}
          </p>
        </div>
      </div>

      <div className={addressSearchCssClasses}>
        <label htmlFor="location" className="address dg_label">
          <span className="dg_label-text">{pageFieldName}</span>
        </label>
        <div className="address-input-wrapper">
          <AutoCompleteTypeField
            items={items}
            pageFieldName={pageFieldName}
            formik={formik}
            name={name}
            value={values.location}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
          />
          <i
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              marginRight: "10px",
            }}
            className="fa fa-search address-search-icon"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      {isTouched && hasError && (
        <FieldError className="error-message">{errorMessage}</FieldError>
      )}
    </React.Fragment>
  );
};

export default IssueType;
