import React from "react";

import RequestTypeField from "./RequestTypeField";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const options =[{id:1,name:'Blue'},{id:2,name:'Red'},{id:3,name:'Yellow'},{id:4,name:'Gray'}];
const RequestCategory = ({
  requestType,
  errorsRequestType,
  touchedRequestType,
  pageFieldName,
  handleServiceRequestChange,
  rest,
  Categories,
}) => {
  return (
    <React.Fragment>
      <div
        className={
          errorsRequestType && touchedRequestType
            ? "cs-form-control error"
            : "cs-form-control"
        }
      >
    
        <label htmlFor="requestType">{pageFieldName}</label>
   {/*      <RequestTypeField
          component="select"
          name="requestType"
          formikProps={rest}
          onChange={handleServiceRequestChange}
          value={requestType}
        > */}
        <Select
  id="select-items"
  label="-- Please select a category --"
  options={Categories}

/> 
    {/*       <option key="default" value="">
            -- Please select a category --
          </option>
          {Categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}  */}
   
        {/* </RequestTypeField> */}
        <p role="alert" className="error-message">
          <ErrorMsg
            errormessage={errorsRequestType}
            touched={touchedRequestType}
          />
        </p>
      </div>
    </React.Fragment>
  );
};

export default RequestCategory;
