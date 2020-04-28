import React from "react";
import { GetErrorDetails } from "../utilities/FormikHelpers";
import PageValidation from "./PageValidation";
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
        <label>Issue type</label>
        <div>
          <p className="smallest">
            {values.requestType} > {values.subRequestType}
          </p>
        </div>
      </div>

      <div className={addressSearchCssClasses}>
        <label htmlFor="location" className="address">
          {pageFieldName}
        </label>
        <div className="address-input-wrapper">
          <AutoCompleteTypeField
            items={items}
            formik={formik}
            name={name}
            value={values.location}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
          />
          <i
            className="fa fa-search address-search-icon"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      {isTouched && hasError && (
        <PageValidation className="error-message">
          {errorMessage}
        </PageValidation>
      )}
    </React.Fragment>
  );
};

export default IssueType;
