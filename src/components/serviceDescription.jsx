import React from "react";
import { Field } from "formik";

import ErrorMsg from "./ErrorMessage";
const ServiceDescription = ({
  requestType,
  errorsServiceDescription,
  touchedServiceDescription,
  pageFieldName,
}) => {
  return (
    <React.Fragment>
      {requestType === "website issue" ? (
        <div
          className={
            errorsServiceDescription && touchedServiceDescription
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <label htmlFor="serviceDescription">{pageFieldName}</label>
          <Field
            component="textarea"
            placeholder="Maximum 2,000 characters."
            name="serviceDescription"
            className={
              errorsServiceDescription && touchedServiceDescription
                ? "text-select error"
                : null
            }
          />

          <p role="alert" className="error-message">
            {
              <ErrorMsg
                errormessage={errorsServiceDescription}
                touched={touchedServiceDescription}
              />
            }
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ServiceDescription;
