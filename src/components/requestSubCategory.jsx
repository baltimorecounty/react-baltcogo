import React from "react";
import RequestSubTypeField from "./RequestSubTypeField";
import ErrorMsg from "./ErrorMessage";
const SubCategory = ({
  requestType,
  subRequestType,
  errorsSubRequestType,
  touchedSubRequestType,
  pageFieldName,
  handleServiceSubRequestChange,
  rest,
  subCategories,
}) => {
  return (
    <React.Fragment>
      {requestType !== "" ? (
        <div
          className={
            errorsSubRequestType && touchedSubRequestType
              ? "cs-form-control error"
              : "cs-form-control"
          }
        >
          <label name="subRequestType" htmlFor="subRequestType">
            {pageFieldName}
          </label>
          <RequestSubTypeField
            component="select"
            name="subRequestType"
            formikProps={rest}
            onChange={handleServiceSubRequestChange}
            value={subRequestType}
          >
            <option key="default" value="">
              -- Please select a sub-category --
            </option>
            {subCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </RequestSubTypeField>

          <p role="alert" className="error-message">
            <ErrorMsg
              errormessage={errorsSubRequestType}
              touched={touchedSubRequestType}
            />
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SubCategory;
