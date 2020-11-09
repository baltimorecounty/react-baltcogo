import React from "react";
import FormContainer from "./FormContainer";
import { Formik, Form } from "formik";
import { HasResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { Alert } from "@baltimorecounty/dotgov-components";
import SeButton from "./SeButton";
import { GoHome } from "../Routing";

const successBodyContent = (
  <Alert className="status" type="success" icon="far fa-check">
    <p>
      Thank you for submitting your report. You will receive an email in a few
      minutes with your tracking number and additional information.
    </p>
    <p>
      You can track your status online at any time by entering your tracking
      number at{" "}
      <a href="/followup" title="Track your issue status online.">
        www.baltimorecountymd.gov/followup
      </a>
      .
    </p>
  </Alert>
);

const failureBodyContent = (
  <Alert className="status" type="error" icon="fas fa-exclamation-circle">
    <p>
      We're sorry, we encountered a problem processing your submission. We are
      working to resolve this issue as quickly as possible.
    </p>
  </Alert>
);

const getAlertInfo = (title, bodyContent, controls) => ({
  title,
  bodyContent,
  controls,
});

const SubmitResponse = (props) => {
  const { Tabs, shouldDisableForm, isPanelRequired } = props.values;
  const { state: response = {} } = props.history.location || {};
  const isFormSubmissionSuccessful = !HasResponseErrors(response);
  const resetForm = () => {
    props.resetForm();
    GoHome(props);
  };
  const returnHome = () => {
    resetForm();
  };
  const logout = () => {
    sessionStorage.clear();
    resetForm();
  };
  const HomeButton = (
    <React.Fragment>
      <SeButton type="button" onClick={returnHome} text="Create New Report" />
    </React.Fragment>
  );
  const LogoutButton = (
    <React.Fragment>
      <SeButton type="submit" onClick={logout} text="Logout" />
    </React.Fragment>
  );
  const alertInfo = isFormSubmissionSuccessful
    ? getAlertInfo("Your Submission Has Been Received", successBodyContent, [
        HomeButton,
        LogoutButton,
      ])
    : getAlertInfo("Your Report Was Not Submitted", failureBodyContent, [
        HomeButton,
      ]);

  return (
    <FormContainer
      title="Report Status"
      tabNames={Tabs}
      currentTab="ServiceRequestForm"
      shouldDisableForm={shouldDisableForm}
      isPanelRequired={isPanelRequired}
    >
      <Formik>
        {() => {
          const { title, bodyContent, controls } = alertInfo;
          return (
            <React.Fragment>
              <div className="clearfix" />{" "}
              {/** Hack to ensure alert displays properly*/}
              <Form>
                <div style={{ marginBottom: "20px" }}>
                  <h2>{title}</h2>
                  {bodyContent}
                </div>

                <div className="d-flex justify-content-between">
                  {controls.map((control) => control)}
                </div>
              </Form>
            </React.Fragment>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default SubmitResponse;
