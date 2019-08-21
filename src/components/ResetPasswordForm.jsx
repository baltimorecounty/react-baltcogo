import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetResponseErrors, GetNetWorkErrors } from "../utilities/CitysourcedResponseHelpers";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { IsFormInComplete, SetFieldValues } from "../utilities/FormHelpers";
import Alert from './Alert';
import SeButton from "./SeButton";
import { ResetPassword } from '../services/authService';
import { GoBack, Go, Routes, GoHome } from "../Routing";
import { AlertAtPage, getAlertMessage, resetAlerts } from "../utilities/AlertHelpers";
const ResetPasswordForm = (props, routeProps) => {
	const { Tabs, ResetPasswordPage ,hasPasswordReset} = props.values;
	if (IsFormInComplete(props)) {
		GoHome(props);
	}

	const userPasswordReset = async (clickEvent) => {
		const { Email = '' } = props.values || {};
		try {
			const response = await ResetPassword(Email);
			try {
				if (response.data.ErrorsCount > 0) {
					const errorsReturned = GetResponseErrors(response);
					props.Field.ErrorMsg = errorsReturned;
				}
				else {
					signIn();
				}
			}
			catch (ex) {
				console.error(ex.message);
			}
		}
		catch (ex) {
			const errors = GetNetWorkErrors(ex.toString());
			resetAlerts(props);
			props.setStatus({ networkError: errors });
			SetFieldValues(props, { AlertAtPage: 'ResetPasswordPage' });
		}
	}

	const goBack = () => {
		resetAlerts(props);
		GoBack(props);
	};

	const signIn = () => {
		SetFieldValues(props, { hasPasswordReset: true });
		Go(props, Routes.SignIn, props.values.Email);
	};

	const handleChange = changeEvent => {
		SetFieldValues(props, { Email: changeEvent.target.value });
	};
	const errorMessage = getAlertMessage(props);
	const alertReturnValue = AlertAtPage('ResetPasswordPage', props);
	return (
		<FormContainer title={ResetPasswordPage.ResetPasswordTitle}
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={false}
			isPanelRequired={true}
		>
			<Formik
				initialValues={{
					Email: '',

				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.')
				})}
				onSubmit={async (values, actions) => {
					await userPasswordReset(values, actions);
					actions.setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { errors = [], touched } = props;

						return (
							<Form >
								{(alertReturnValue && !(hasPasswordReset)) ?
									errorMessage :
									null}
								{errors.length > 0 && <Alert type="danger">
									{errors}
								</Alert>}
								<div onChange={handleChange}
									className={
										props.errors.Email && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">{ResetPasswordPage.EmailLabel}</label>
									<Field
										type="email"
										name="Email"
									/>
									<ErrorMessage name='msg' className='input-feedback' component='div' />
									<div className={`input-feedback ${props.status ? props.status.css : ''}`}>
										{props.status ? props.status.success : ''}
									</div>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Email}
											touched={touched.Email} />
									</p>
								</div>
								<div className="cs-form-control" >
									<p htmlFor="signup"
									>{ResetPasswordPage.NoAccountLabel} <Link to="SignUpForm" >{ResetPasswordPage.SignUpLinkLabel}</Link></p>
									<p htmlFor="signup"
									>{ResetPasswordPage.RememberPasswordLabel} <Link to="SignInForm" >{ResetPasswordPage.SignInLinkLabel}</Link> </p>
									<SeButton
										text="Back"
										onClick={goBack}
									/>
									<SeButton
										text="Submit Reset Request"
										type="submit"
										isLoading={props.isSubmitting}
										isLoadingText="Submitting Request..."
										className="pull-right"
									/>
								</div>
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer >
	);
}
export default ResetPasswordForm;
