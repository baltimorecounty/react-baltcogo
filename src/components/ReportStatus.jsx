import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { GetReportByID } from '../services/authService';
import SeButton from "./SeButton";
import Note from './Note';
import { GoBack, GoHome, Go, Routes } from "../Routing";

// import DisplayFormikState from './helper';
const ReportStatus = (props, routeProps) => {
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

	return (
		<Formik
			initialValues={{
				ID: ''
			}}

			onSubmit={(values, { setSubmitting }) => {
				//checkCode(values.ReportID)
				//userGetReport(values);
				//setSubmitting(false);
			}}
		>
			{
				(props) => {
					const { isSubmitting, errors, touched } = props;
					return (
						<Form >
							
Work in progress!!
						</Form>
					)
				}
			}
		</Formik>

	);
}
	

export default ReportStatus;
