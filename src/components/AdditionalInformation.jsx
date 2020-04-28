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
              <label htmlFor="NameFirst">
                {AdditionalInfoPage.FirstNameLabel}
              </label>
              <Field
                type="text"
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
              <label htmlFor="NameLast">
                {AdditionalInfoPage.LastNameLabel}
              </label>
              <Field
                type="text"
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
              <label htmlFor="Email">{AdditionalInfoPage.EmailLabel}</label>
              <Field
                type="text"
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
              <label htmlFor="Telephone">{AdditionalInfoPage.PhoneLabel}</label>
              <Field
                type="text"
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
              <label htmlFor="streetAddress">
                {AdditionalInfoPage.StreetLabel}
              </label>
              <Field
                type="text"
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
              <label htmlFor="city">{AdditionalInfoPage.CityLabel}</label>
              <Field
                type="text"
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
              <label name="zipCode" htmlFor="zipCode">
                {AdditionalInfoPage.ZipCodeLabel}
              </label>
              <Field
                type="text"
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
        <div className="cs-form-control">
          <SeButton text="Previous" onClick={callPreviousForm} />
          <SeButton
            text="File Your Report"
            onClick={SubmitTheForm}
            isLoading={formik.isSubmitting}
            isLoadingText="Submitting Request..."
            className="seButton pull-right"
          />
        </div>
      </Form>
    </FormContainer>
  );
};

export default connect(AdditionalInformation);
