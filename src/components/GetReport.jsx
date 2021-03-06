import React from "react";
import { Formik, Form, Field } from "formik";
import FormContainer from "./FormContainer";
import { SetFieldValues } from "../utilities/FormHelpers";
import { GetReportByID } from "../services/authService";
import SeButton from "./SeButton";
import Note from "./Note";
import { Go, Routes } from "../Routing";

const GetReport = (props) => {
  const BadID = "BadID";

  const handleChange = (changeEvent) => {
    SetFieldValues(props, { trackingNumber: changeEvent.target.value });
  };

  const userGetReport = async (trackingNumber) => {
    const response = await GetReportByID(trackingNumber);
    Go(props, Routes.ReportStatus, response);
    return response;
  };

  const checkTrackingNumber = () => {
    const { trackingNumber } = props.values;
    var animalVendorComplaint = RegExp(/^(ACCMP)/i);
    var standardVendorComplaint = RegExp(/^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i);
    var standardComplaint = RegExp(/^\d+$/i);

    if (animalVendorComplaint.test(trackingNumber)) {
      buildNote("?&Module=Enforce");
    } else if (standardVendorComplaint.test(trackingNumber)) {
      buildNote("?&Module=Enforcement");
    } else if (standardComplaint.test(trackingNumber)) {
      userGetReport(trackingNumber);
    } else {
      buildNote(BadID);
    }
  };

  let alertMessage = "";

  const buildNote = (urlParameter) => {
    const messageUrlRedirect =
      "<p>The record you’re looking for is available in a different tracking system. Please visit <a href= https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx" +
      urlParameter +
      ">Baltimore County Online Services</a> and enter the tracking number again.</p><p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>";
    const messageBadId =
      "We are having trouble looking up this record. Please call 410-887-2450 to verify your tracking number.";

    urlParameter === BadID
      ? (alertMessage = (
          <Note
            className="status"
            type="error"
            icon="fas fa-exclamation-circle"
            message={messageBadId}
          />
        ))
      : (alertMessage = (
          <Note
            className="status"
            type="error"
            icon="fas fa-exclamation-circle"
            message={messageUrlRedirect}
          />
        ));
  };

  return (
    <FormContainer
      title={""}
      tabNames={"none"}
      currentTab="ServiceRequestForm"
      shouldDisableForm={false}
      isPanelRequired={true}
    >
      <Formik
        onSubmit={async (values, actions, setSubmitting) => {
          checkTrackingNumber();
          actions.setSubmitting(false);
        }}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form>
              <div>
                <div className="callout_gray">
                  <div className="col-md-3">
                    <img
                      width="188"
                      height="54"
                      alt="Baltcogo Issue Reporting System"
                      src="/sebin/w/q/baltcogo.gif"
                      border="0"
                      vspace="0"
                      hspace="0"
                    />
                  </div>
                  <div id="divclear">&nbsp;</div>

                  <p>
                    If you were given a tracking number from an issue you
                    reported on our website, please enter it below to get an
                    update.
                  </p>
                  {alertMessage ? alertMessage : null}
                  <div>
                    <strong>
                      <div className="seform">
                        <div className="SEAFGroupVertical vertical">
                          <div className="SEAFGroupVertical vertical">
                            <div className="SEAFGroupVertical vertical">
                              <div className="SEAFWrapper">
                                <div
                                  className="seText"
                                  style={{ width: "100%" }}
                                >
                                  <span>Fields marked with </span>
                                  <span className="seRequiredMarker">*</span>
                                  <span> are required.</span>
                                </div>
                                <div className="SEAFWrapper">
                                  <div className="SEAFGroupHorizontal horizontal">
                                    <div className="seLabelCell seLabelCellHorizontal">
                                      <div className="seText">
                                        <label htmlFor="TrackingNumber">
                                          Tracking Number
                                          <span className="seRequiredMarker">
                                            *
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="seFieldCell seFieldCellHorizontal">
                                      <Field
                                        type="text"
                                        onChange={handleChange}
                                        name="TrackingNumber"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="SEAFWrapper">
                                <SeButton
                                  text="Track Now"
                                  type="submit"
                                  isLoading={isSubmitting}
                                  className="pull-left"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </strong>
                  </div>
                </div>
                <div className="input-feedback">
                  <label name="ReportResponse"></label>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default GetReport;
