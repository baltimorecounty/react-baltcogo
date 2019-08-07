import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { Login } from '../services/authService';
import { IsFormInComplete } from "../utilities/FormHelpers";
import SeButton from "./SeButton";
import Note from './Note';
import { GoBack, GoHome, Go, Routes } from "../Routing";

// import DisplayFormikState from './helper';
const ReportStatus = (props, routeProps) => {
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
