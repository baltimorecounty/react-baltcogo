import React from "react";
import { Formik, Form, Field } from "formik";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { GetReportByID } from '../services/authService';
import { Go, Routes } from "../Routing";
import Note from './Note';

const GetReport = props => {


	const userGetReport = async (values) => {
		try {
			const response = await GetReportByID(values.ReportID);
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = GetResponseErrors(response);
				props.Field.ErrorMsg = errorsReturned;
			}
			else {
				Go(props, Routes.AdditionalInformation);
			}
		}
		catch (ex) {
			if (ex.response) {
				props.Form.Field.email.errors = ex.response.data
			}
		}
	}
	
	const trackingCodeTests = [{
		type: 'accelaAnimal',
		pattern: /^(ACCMP)/i,
		action: function action() {
			$('#citizen-access-info').find('a').attr('href', 'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforce');
			$('#citizen-access-info').fadeIn(250);
		}
	}, {
		type: 'accelaCode',
		pattern: /^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i,
		action: function action() {
			$('#citizen-access-info').find('a').attr('href', 'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforcement');
			$('#citizen-access-info').fadeIn(250);
		}
	}, {
		type: 'baltcogo',
		pattern: /^\d+$/i,
		action: function action(trackingNumber) {
			window.location = '/iwant/status.html?reportId=' + trackingNumber;
		}
	}, {
		type: 'fastrack',
		pattern: /^ex\d+$/i,
		action: function action(trackingNumber, $form) {
			submitToFasTrack($form);
		}
	}];
	
	const submitToFasTrack = function submitToFasTrack($form) {
		var appServer = 'https://egov.baltimorecountymd.gov/ECMS/';
		var dataString = $form.serialize();
	
		$.ajax({
			url: appServer + 'Intake/Login',
			data: dataString,
			type: 'GET',
			dataType: 'jsonp',
			async: false
		})
			.done(function done(data) {
				formatJsonpResult(data);
			})
			.fail(function fail(error) {
				console.error(error);
			});
	};
	
	const formatJsonpResult = (jsonpResult) => {
		var errorCounter = 0;
	
		if (jsonpResult.ResponseStatus === 1) {
			var url = 'getstatus.html?correspondenceId=' + jsonpResult.ResponseError;
			//$(window.location).attr('href', url);
		} else {
			var errorMsg = '';
			if (errorCounter === 0) {
				errorMsg = <Note icon='Nothing' className='bc_alert alert-warning'>The information you have entered is incorrect. Please verify that the tracking number and email address you have entered are correct.</Note>;
				errorCounter += 1;
			} else {
				errorMsg = <Note icon='Nothing' className='bc_alert alert-warning'>The information you have entered is incorrect. Please call 410-887-2450 to verify your tracking number.</Note>;
				alert(errorMsg);
			}
		}
	};

	return (
		<Formik
			initialValues={{
				ID: ''
			}}

			onSubmit={(values, { setSubmitting }) => {
				userGetReport(values);
				setSubmitting(false);
			}}
		>
			{
				(props) => {
					const { isSubmitting, errors, touched } = props;
					return (
						<Form >
							<legend>Follow Up on an Issue</legend>
							<div class="callout_gray">
								<div class="col-md-3">
									<img width="188" height="54" alt="FasTrack Constituent Issue Tracking System" src="/sebin/q/b/fastrack.gif" border="0" vspace="0" hspace="0"/>
								
								</div>
								<div class="col-md-3">
									<img width="188" height="54" alt="Baltcogo Issue Reporting System" src="/sebin/w/q/baltcogo.gif" border="0" vspace="0" hspace="0"/>
								
								</div>						
								<div>
									<p>If you were given a tracking number from an issue you reported on our website, please enter it below to get an update.</p>
									<strong>
										<div>
									
											<label htmlFor="ReportID"
												className={
													errors.ReportID && touched.ReportID ? "input-feedback" : "text-label"}
											>Tracking Number</label>
											<span class="seRequiredMarker">*</span>
											<Field
												name="ReportID"
												className={`text-input ${errors.ReportID && touched.ReportID ? "error" : ""}`}
											/>
										</div>
								
										<div>
											<label htmlFor="Email"
												className={
													errors.ReportID && touched.ReportID ? "input-feedback" : "text-label"}
											>Email Address</label>
											<span class="seRequiredMarker">*</span>
											<Field
												name="ReportID"
												className={`text-input ${errors.Email && touched.Email ? "error" : ""}`}
											/>
										</div>
									</strong>
								</div>
							</div>
							<div className="input-feedback">
								<label name="ReportResponse"></label>
							</div>
							
							<input className="seButton" type="submit" disabled={isSubmitting} value="Track Now" />

						</Form>
					)
				}
			}
		</Formik>

	);
}

export default GetReport;
