import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetResponseErrors, GetNetWorkErrors } from "../utilities/CitysourcedResponseHelpers";
import FormContainer from './FormContainer';
import { SignUp } from '../services/authService';
import { Link } from 'react-router-dom';
import { IsFormInComplete, SetFieldValues } from "../utilities/FormHelpers";
import { IsPhoneNumberValid } from '@baltimorecounty/validation';
import SeButton from "./SeButton";
import { GoHome, Go, Routes } from "../Routing";
import { getAlertMessage, resetAlerts, AlertAtPage } from "../utilities/AlertHelper";

const CreateAccount = (props, routeProps) => {

	const { Tabs, SignUpPage, shouldDisableForm, hasPasswordReset } = props.values;

	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	if (IsFormInComplete(props)) {
		GoHome(props);
	}

	const goBack = () => {
		resetAlerts(props);
		GoHome(props);
	}

	let extendedError = '';

	const userCreateAccount = async (values, actions, props) => {
		try {

			const response = await SignUp(values.NameFirst, values.NameLast, values.Email, values.Password, values.Telephone, values.UniqueId, values.SuppressNotifications);
			var ContactID = "";

			if (response.data.HasErrors) {
				const errorsReturned = GetResponseErrors(response);
				try {
					const error = errorsReturned === "Sorry! The email address submitted is already taken."
						? <p>The email address you entered is already registered in this system. <Link to="SignInForm">Log in to your account</Link> or <Link to="ResetPassword">reset your password</Link>.</p>
						: errorsReturned;
					extendedError = error;
					throw new Error(errorsReturned);
				}
				catch (ex) {
					console.error(ex.message);
				}
			}
			else {
				ContactID = response.data.Results.Id;
				const NameFirst = response.data.Results.NameFirst;
				const NameLast = response.data.Results.NameLast

				const fields = {
					NameFirst,
					NameLast,
					ContactID,
				};

				SetFieldValues(props, fields);
				sessionStorage.setItem('UserLoginID', ContactID)
				sessionStorage.setItem('NameFirst', NameFirst);
				sessionStorage.setItem('NameLast', NameLast);
				Go(props, Routes.ProvideDetails);
			}
		}
		catch (ex) {
			if (ex.message) {
				const errors = GetNetWorkErrors(ex.toString());
				props.setStatus({ networkError: errors });
				SetFieldValues(props, { AlertAtPage: 'SignUpPage' });
			}
		}
	}
	Yup.addMethod(Yup.string, "Telephone", function (value) {
		return this.test(
			"Telephone",
			"Please enter your phone number in the following format: 410-555-1212.",
			IsPhoneNumberValid
		);
	});
	const errorMessage = getAlertMessage(props);
	const alertReturnValue = AlertAtPage('SignUpPage', props);
	return (
		<FormContainer title={SignUpPage.SignUpTitle}
			tabNames={Tabs}
			currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			isPanelRequired={true}
		>
			<Formik

				initialValues={{
					NameFirst: '',
					NameLast: '',
					Telephone: '',
					Email: '',
					Password: ''
				}}

				validationSchema={Yup.object().shape({
					NameFirst: Yup.string().required('Please enter your first name.'),
					NameLast: Yup.string().required('Please enter your last name.'),
					Email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
					Telephone: Yup.string().required('Please enter your phone number in the following format: 410-555-1212.').Telephone(),
					Password: Yup.string()
						.required('Please enter your password.')
						.max(30, "Maximum 30 characters allowed.")
						.matches(
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
							"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")
				})}
				onSubmit={async (values, actions, setSubmitting) => {
					await userCreateAccount(values, actions, props);
					actions.setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched } = props;

						return (
							<Form >
								{(errorMessage && alertReturnValue) ?
									errorMessage :
									null}
								<div className={
									errors.NameFirst && touched.NameFirst ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="NameFirst">{SignUpPage.FirstNameLabel}  </label>
									<Field
										type="text"
										name="NameFirst"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.NameFirst}
											touched={touched.NameFirst} />
									</p>
								</div>
								<div className={
									props.errors.NameLast && props.touched.NameLast ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="NameLast">{SignUpPage.LastNameLabel}  </label>
									<Field
										type="text"
										name="NameLast"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.NameLast}
											touched={touched.NameLast} />
									</p>
								</div>
								<div className={
									props.errors.Telephone && props.touched.Telephone ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Telephone">{SignUpPage.PhoneLabel}</label>
									<Field
										type="text"
										name="Telephone"
										value={values.Telephone}

									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Telephone}
											touched={touched.Telephone} />
									</p>
								</div>
								<div className={
									(extendedError || props.errors.Email) && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">{SignUpPage.EmailLabel}</label>
									<Field
										type="email"
										name="Email"
									/>
									<p role='alert' className="error-message">
										{extendedError}
									</p>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Email}
											touched={touched.Email} />
									</p>
								</div>
								<div className={
									props.errors.Password && props.touched.Password ? "cs-form-control error" : "cs-form-control"}>
									<label name="Password" htmlFor="Password">{SignUpPage.PasswordLabel}</label>
									<Field type={fieldType === 'Password' ? 'Password' : 'text'}
										name="Password"
										value={values.Password}
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
									<p htmlFor="signup">{SignUpPage.HaveAccountLabel} <Link to="SignInForm" >{SignUpPage.SignInLinkLabel}</Link></p>
									<SeButton
										text="Back"
										className="seButton"
										onClick={goBack}
									/>
									<SeButton
										text="Sign Up and Continue"
										type="submit"
										isLoading={isSubmitting}
										isLoadingText="Signing Up..."
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
export default CreateAccount;


