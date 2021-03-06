import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import {
  GetResponseErrors,
  GetNetWorkErrors,
} from "../utilities/CitysourcedResponseHelpers";
import { Link } from "react-router-dom";
import FormContainer from "./FormContainer";
import { Login } from "../services/authService";
import { IsFormInComplete, SetFieldValues } from "../utilities/FormHelpers";
import SeButton from "./SeButton";
import { GoBack, GoHome, Go, Routes } from "../Routing";
import {
  AlertAtPage,
  GetAlertMessage,
  ResetAlerts,
} from "../utilities/AlertHelpers";

const SignIn = (props, routeProps) => {
  const {
    Tabs,
    SignInPage,
    shouldDisableForm,
    ignoreFormCompletion,
    hasPasswordReset,
  } = props.values;
  const [fieldType, setFieldType] = useState("Password");
  const handlePasswordToggleChange = () => {
    setFieldType(fieldType === "Password" ? "text" : "Password");
  };

  if (IsFormInComplete(props) && !ignoreFormCompletion) {
    GoHome(props);
  }

  const handleLoginFailure = (actions, errors) => {
    actions.setStatus({
      success: errors,
      css: "error",
    });
  };

  const handleLoginSuccess = (actions, results) => {
    const { Id: contactID, NameFirst, NameLast } = results;

    const fields = {
      NameFirst,
      NameLast,
      ContactID: contactID,
    };

    SetFieldValues(props, fields);

    sessionStorage.setItem("UserLoginID", contactID);
    sessionStorage.setItem("NameFirst", NameFirst);
    sessionStorage.setItem("NameLast", NameLast);

    actions.setStatus({
      success: "OK",
      css: "success",
    });
    ResetAlerts(props);
    Go(props, Routes.ProvideDetails);
  };

  const goBack = () => {
    ResetAlerts(props);
    GoBack(props);
  };

  const userLogin = async (values, props, actions) => {
    try {
      const response = await Login(values.Email, values.Password);
      const { Results, Errors } = response.data;
      ResetAlerts(props);
      if (Errors.length > 0) {
        try {
          const errors = GetResponseErrors(response);
          props.setStatus({ incorrectEmail: errors.replace("Sorry! ", "") }); //TODO: this should ultimatley come from a validation file so we dont have to modify text
          SetFieldValues(props, { AlertAtPage: "SignInPage" });
          handleLoginFailure(actions, errors);
          throw new Error(errors);
        } catch (ex) {
          if (ex.response) {
            props.errors.email = ex.response.data;
          }
        }
      } else {
        handleLoginSuccess(actions, Results);
      }
    } catch (ex) {
      if (ex.response) {
        props.errors.email = ex.response.data;
      } else {
        const errors = GetNetWorkErrors(ex.toString());
        const fields = {
          hasPasswordReset: false,
          AlertAtPage: "SignInPage",
        };
        props.setStatus({ networkError: errors });
        SetFieldValues(props, fields);
      }
    }
  };

  const errorMessage = GetAlertMessage(props);
  const alertReturnValue = AlertAtPage("SignInPage", props);
  return (
    <FormContainer
      title={SignInPage.SignInTitle}
      tabNames={Tabs}
      currentTab="ServiceRequestForm"
      shouldDisableForm={shouldDisableForm}
      isPanelRequired={true}
      alert={alertReturnValue || hasPasswordReset ? errorMessage : null}
    >
      <Formik
        initialValues={{
          Email: "",
          Password: "",
        }}
        validationSchema={Yup.object().shape({
          Email: Yup.string()
            .email("Please enter a valid email address.")
            .required("Please enter your email address."),
          Password: Yup.string().required("Please enter your password."),
        })}
        onSubmit={async (values, actions, setSubmitting) => {
          await userLogin(values, props, actions);
          actions.setSubmitting(false);
        }}
      >
        {(props) => {
          const { errors = {}, touched } = props;
          return (
            <Form>
              <div
                className={
                  props.errors.Email && props.touched.Email
                    ? "cs-form-control error"
                    : "cs-form-control"
                }
              >
                <label htmlFor="EmailLabel" className="dg_label">
                  <span className="dg_label-text">{SignInPage.EmailLabel}</span>
                </label>
                <Field type="email" name="Email" />
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={errors.Email}
                    touched={touched.Email}
                  />
                </p>
              </div>
              <div
                className={
                  props.errors.Password && props.touched.Password
                    ? "cs-form-control error"
                    : "cs-form-control"
                }
              >
                <label htmlFor="PasswordLabel" className="dg_label">
                  <span className="dg_label-text">
                    {SignInPage.PasswordLabel}
                  </span>
                </label>
                <Field
                  type={fieldType === "Password" ? "Password" : "text"}
                  name="Password"
                  className={`text-input ${
                    errors.Password && touched.Password ? "error" : ""
                  }`}
                />
                <span
                  onClick={handlePasswordToggleChange}
                  className={`fa fa-fw fa-eye show-password-icon ${
                    fieldType === "text" ? "fa-eye-slash" : ""
                  }`}
                ></span>

                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={errors.Password}
                    touched={touched.Password}
                  />
                </p>
              </div>
              <div className="cs-form-control">
                <p htmlFor="forgetpassword">
                  <Link to="ResetPassword">
                    {SignInPage.ForgotPasswordLabel}
                  </Link>
                </p>
                <p htmlFor="signup">
                  {SignInPage.NoAccountLabel}{" "}
                  <Link to="SignUpForm">{SignInPage.SignUpLinkLabel}</Link>
                </p>
                <div className="d-md-flex justify-content-md-between d-sm-block">
                  <SeButton text="Back" onClick={goBack} />
                  <SeButton
                    text="Sign In and Continue"
                    type="submit"
                    isLoading={props.isSubmitting}
                    isLoadingText="Signing In..."
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default SignIn;
