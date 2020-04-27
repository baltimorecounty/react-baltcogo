import React from "react";

const ErrorMessage = ({ errormessage, touched }) => {
  return (
    <React.Fragment>
      {touched && errormessage !== undefined ? errormessage : null}
    </React.Fragment>
  );
};

export default ErrorMessage;
