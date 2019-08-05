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
	const { Tabs, SignInPage, shouldDisableForm, ignoreFormCompletion, hasPasswordReset } = props.values;
	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	if (IsFormInComplete(props) && !ignoreFormCompletion) {
		GoHome(props);
	}

	const getAlertMessage = () => {
		let message = '';
		if (hasPasswordReset) {
			message = <Note className='bc_alert alert-success'>{SignInPage.ResetPasswordAlert.replace('{email address}', userEmail)}</Note>
		}
		else if (props.status) {
			message = <Note icon='Nothing' className='bc_alert alert-warning'>{props.status.incorrectEmail ? props.status.incorrectEmail : null}</Note>
		}
		return message;
	}

	const handleLoginFailure = (actions, errors) => {
		actions.setStatus({
			success: errors,
			css: 'error'
		});
	};

	const resetAlerts = () => {
		props.setStatus('');
		props.setFieldValue('hasPasswordReset', false);
	}
	const handleLoginSuccess = (actions, results) => {
		const {
			Id: contactID,
			NameFirst,
			NameLast
		} = results;

		props.setFieldValue('NameFirst', NameFirst);
		props.setFieldValue('NameLast', NameLast);
		props.setFieldValue('ContactID', contactID);

		sessionStorage.setItem('UserLoginID', contactID)
		sessionStorage.setItem('NameFirst', NameFirst);
		sessionStorage.setItem('NameLast', NameLast);

		actions.setStatus({
			success: 'OK',
			css: 'success'
		});
		resetAlerts();
		Go(props, Routes.ProvideDetails);
	};

	const goBack = () => {
		resetAlerts();
		GoBack(props);
	}

	const userLogin = async (values, props, actions) => {
		try {
			const response = await Login(values.Email, values.Password);
			const {
				Results,
				Errors
			} = response.data;
			resetAlerts();
			if (Errors.length > 0) {
				const errors = GetResponseErrors(response);
				props.setStatus({ incorrectEmail: errors.replace('Sorry! ', '') }); //TODO: this should ultimatley come from a validation file so we dont have to modify text
				handleLoginFailure(actions, errors);
				throw new Error(errors);
			}
			else {
				handleLoginSuccess(actions, Results);
			}
		}
		catch (ex) {
			if (ex.response) {
				props.errors.email = ex.response.data
			}
		}
	}

	const userEmail = props.history.location.state;
	const errorMessage = getAlertMessage();

	return (
		<FormContainer title={SignInPage.SignInTitle}
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			isPanelRequired={true}
		>
			<Formik
				initialValues={{
					Email: '',
					Password: '',

				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
					Password: Yup.string()
						.required('Please enter your password.')
				})}
				onSubmit={async (values, actions, setSubmitting) => {

					await userLogin(values, props, actions);
					actions.setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { errors = {}, touched } = props;
						return (
							<Form >
								{(errorMessage) ?
									errorMessage :
									null}
								<div className={
									props.errors.Email && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">{SignInPage.EmailLabel}</label>
									<Field
										type="email"
										name="Email"
									/>
									{/* <ErrorMessage name='msg' className='input-feedback' component='div' />
									<div className={`input-feedback ${props.status ? props.status.css : ''}`}>
										{props.status ? props.status.success : ''}
									</div> */}
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Email}
											touched={touched.Email} />
									</p>
								</div>
								<div className={
									props.errors.Password && props.touched.Password ? "cs-form-control error" : "cs-form-control"}>
									<label name="Password" htmlFor="password">{SignInPage.PasswordLabel}</label>
									<Field
										type={fieldType === 'Password' ? 'Password' : 'text'}
										name="Password"
										className={`text-input ${errors.Password && touched.Password ? "error" : ""}`}
									/>
									<span onClick={handlePasswordToggleChange}
										className={`fa fa-fw fa-eye field-icon ${fieldType === 'text' ? "fa-eye-slash" : ""}`}></span>

									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Password}
											touched={touched.Password} />
									</p>
								</div>
								<div className="cs-form-control" >
									<p htmlFor="forgetpassword"> <Link to="ResetPassword" >{SignInPage.ForgotPasswordLabel}</Link></p>
									<p htmlFor="signup"
									>{SignInPage.NoAccountLabel} <Link to="SignUpForm" >{SignInPage.SignUpLinkLabel}</Link></p>
									<SeButton
										text="Back"
										type="button"
										className="seButton"
										onClick={goBack}
									/>
									<SeButton
										text="Sign In and Continue"
										type="submit"
										isLoading={props.isSubmitting}
										isLoadingText="Signing In..."
										className="seButton pull-right"
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

export default ReportStatus;
