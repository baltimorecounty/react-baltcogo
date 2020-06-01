import React from "react";
import SeButton from "./SeButton";
import { Form, Field, connect } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from "./FormContainer";
import { IsFormInComplete } from "../utilities/FormHelpers";
import { SubmitReport } from "../services/ReportService";
import { GoHome, GoBack } from "../Routing";
import { SetFieldsTouched } from "../utilities/FormikHelpers";

const AdditionalInformation = (props) => {
  const localProps = props.formik.values;
  const { formik = {} } = props;
  const { values, actions, errors, touched, ...rest } = props;
  const {
    isPanelRequired,
    shouldDisableForm,
    Tabs,
    AdditionalInfoPage,
    ContactID,
  } = localProps;

  if (!ContactID || IsFormInComplete(props.formik)) {
    GoHome(props);
  }

  const validateForm = (values) => {
    const { streetAddress, city, zipCode } = values;

    SetFieldsTouched(formik, {
      streetAddress: true,
      city: true,
      zipCode: true,
    });

    return streetAddress && city && zipCode;
  };

  const SubmitTheForm = async (clickEvent) => {
    const isFormValid = validateForm(formik.values);

    formik.setSubmitting(true);

    if (isFormValid) {
      await SubmitReport(clickEvent, props);
    }

    formik.setSubmitting(false);
  };

  const callPreviousForm = () => {
    GoBack(props);
  };
  return (
    <FormContainer
      title={AdditionalInfoPage.AdditionalInfoTitle}
      tabNames={Tabs}
      currentTab="AdditionalInformation"
      shouldDisableForm={shouldDisableForm}
      isPanelRequired={isPanelRequired}
    >
      <Form>
        {localProps.requiresLocation === false ? (
          <div name="ContactInfo">
            <p>{AdditionalInfoPage.DisclaimerLabel}</p>
            <div
              className={
                rest.formik.errors.NameFirst && rest.formik.touched.NameFirst
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label name="NameFirst" htmlFor="NameFirst" className="dg_label">
                <span className="dg_label-text">
                  {AdditionalInfoPage.FirstNameLabel}
                </span>
              </label>
              <Field
                name="NameFirst"
                className={`text-input ${
                  rest.formik.errors.NameFirst && rest.formik.touched.NameFirst
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.NameFirst}
                    touched={rest.formik.touched.NameFirst}
                  />
                </p>
              </div>
            </div>
            <div
              className={
                rest.formik.errors.NameLast && rest.formik.touched.NameLast
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label name="NameLast" htmlFor="NameLast" className="dg_label">
                <span className="dg_label-text">
                  {AdditionalInfoPage.LastNameLabel}
                </span>
              </label>
              <Field
                name="NameLast"
                className={`text-input ${
                  rest.formik.errors.NameLast && rest.formik.touched.NameLast
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.NameLast}
                    touched={rest.formik.touched.NameLast}
                  />
                </p>
              </div>
            </div>
            <div
              className={
                rest.formik.errors.Email && rest.formik.touched.Email
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label name="Email" htmlFor="Email" className="dg_label">
                <span className="dg_label-text">
                  {AdditionalInfoPage.EmailLabel}
                </span>
              </label>
              <Field
                name="Email"
                className={`text-input ${
                  rest.formik.errors.Email && rest.formik.touched.Email
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.Email}
                    touched={rest.formik.touched.Email}
                  />
                </p>
              </div>
            </div>
            <div
              className={
                rest.formik.errors.Telephone && rest.formik.touched.Telephone
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label name="Telephone" htmlFor="Telephone" className="dg_label">
                <span className="dg_label-text">
                  {AdditionalInfoPage.PhoneLabel}
                </span>
              </label>
              <Field
                name="Telephone"
                className={`text-input ${
                  rest.formik.errors.Telephone && rest.formik.touched.Telephone
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.Telephone}
                    touched={rest.formik.touched.Telephone}
                  />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div id="ContactAddress">
            <p>{AdditionalInfoPage.DisclaimerLabel}</p>
            <div
              className={
                rest.formik.errors.streetAddress &&
                rest.formik.touched.streetAddress
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label
                name="streetAddress"
                htmlFor="streetAddress"
                className="dg_label"
              >
                <span className="dg_label-text">
                  {AdditionalInfoPage.StreetLabel}
                </span>
              </label>
              <Field
                name="streetAddress"
                className={`text-input ${
                  rest.formik.errors.streetAddress &&
                  rest.formik.touched.streetAddress
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.streetAddress}
                    touched={rest.formik.touched.streetAddress}
                  />
                </p>
              </div>
            </div>
            <div
              className={
                rest.formik.errors.city && rest.formik.touched.city
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label name="city" htmlFor="city" className="dg_label">
                <span className="dg_label-text">
                  {AdditionalInfoPage.CityLabel}
                </span>
              </label>
              <Field
                label={AdditionalInfoPage.CityLabel}
                name="city"
                className={`text-input ${
                  rest.formik.errors.city && rest.formik.touched.city
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.city}
                    touched={rest.formik.touched.city}
                  />
                </p>
              </div>
            </div>
            <div
              className={
                rest.formik.errors.zipCode && rest.formik.touched.zipCode
                  ? "cs-form-control error"
                  : "cs-form-control"
              }
            >
              <label name="zipCode" htmlFor="zipCode" className="dg_label">
                <span className="dg_label-text">
                  {AdditionalInfoPage.ZipCodeLabel}
                </span>
              </label>
              <Field
                name="zipCode"
                className={`text-input ${
                  rest.formik.errors.zipCode && rest.formik.touched.zipCode
                    ? "error"
                    : ""
                }`}
              />
              <div className="error">
                <p role="alert" className="error-message">
                  <ErrorMsg
                    errormessage={rest.formik.errors.zipCode}
                    touched={rest.formik.touched.zipCode}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="d-md-flex justify-content-md-between d-sm-block">
          <SeButton
            text="Previous"
            onClick={callPreviousForm}
            className="d-sm-block mb-3"
          />
          <SeButton
            text="File Your Report"
            onClick={SubmitTheForm}
            isLoading={formik.isSubmitting}
            isLoadingText="Submitting Request..."
            className="d-sm-block mb-3"
          />
        </div>
      </Form>
    </FormContainer>
  );
};

export default connect(AdditionalInformation);
