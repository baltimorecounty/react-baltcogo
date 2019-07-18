import React from "react";
import { Formik, Form, Field } from "formik";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import FormContainer from './FormContainer';
import { GetReportByID } from './authService';
import { Go, Routes } from "../Routing";

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
			if (ex.response && ex.response.status === 400) {
				props.Form.Field.email.errors = ex.response.data
			}
		}
	}
	return (
		<FormContainer title="Lookup Report">
			<Formik
				initialValues={{
					ID: ''
				}}
				/* validationSchema={Yup.object().shape({
					ReportID: Yup.number().NumberSchema('Invalid Report ID.').required('Please enter a valid report ID.'),
				})} */

				onSubmit={(values, { setSubmitting }) => {
					//alert(JSON.stringify(values, null, 2));
					userGetReport(values);
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { isSubmitting, errors, touched } = props;
						return (
							<Form >
								<label htmlFor="ReportID"
									className={
										errors.ReportID && touched.ReportID ? "input-feedback" : "text-label"}
								>Report ID</label>
								<Field
									name="ReportID"
									className={`text-input ${errors.ReportID && touched.ReportID ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<label name="ReportResponse"></label>
								</div>
								{/* <div className="input-feedback">
									<ErrorMsg
										errormessage={errors.ReportID}
										touched={touched.ReportID} />
								</div>} */}
								<input className="seButton" type="submit" disabled={isSubmitting} value="Submit Report Request" />

							</Form>
						)
					}
				}
			</Formik>
		</FormContainer>

	);
}

export default GetReport;
