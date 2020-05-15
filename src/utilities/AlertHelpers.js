import React from "react";
import Note from "../components/Note";
import { SetFieldValues } from "../utilities/FormHelpers";
export const GetAlertMessage = (props) => {
  const { hasPasswordReset } = props.values;
  if (hasPasswordReset) {
    return (
      <Note
        className="status"
        type="success"
        icon="far fa-check"
        message={props.values.SignInPage.ResetPasswordAlert.replace(
          "{email address}",
          props.history.location.state
        )}
      />
    );
  }

  const { incorrectEmail, networkError } = props.status || {};
  const message = incorrectEmail || networkError || null;
  return (
    <Note
      className="status"
      type="error"
      icon="fas fa-exclamation-circle"
      message={message}
    />
  );
};

export const ResetAlerts = (props) => {
  const hasPasswordReset = props.values.hasPasswordReset;
  props.setStatus("");
  SetFieldValues(props, { AlertAtPage: "" });
  if (hasPasswordReset) {
    SetFieldValues(props, { hasPasswordReset: false });
  }
};

export const AlertAtPage = (pageIn, props) => {
  const alertPage = props.values.AlertAtPage;
  return !(alertPage === "" || alertPage !== pageIn);
};
