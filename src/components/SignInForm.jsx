import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { Login } from './authService';
import { formIncomplete } from "./checkFormCompletion";
import Alert from './Alert';
import SeButton from "./SeButton";

// import DisplayFormikState from './helper';
const SignIn = (props, routeProps) => {

	const {Tabs, SignInPage, shouldDisableForm} = props.values;

	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	if (formIncomplete(props)) {
		props.history.push('/ServiceRequestForm');
	}

	const handleLoginFailure = (actions, errors) => {
		actions.setStatus({
			success: errors,
			css: 'error'
		});
	};

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

		props.history.push('/ProvideDetails');
	};

	const goBack = () =>{
		props.history.push('/ServiceRequestForm');
	}

	const userLogin = async (values, props, actions) => {
		try {
			const response = await Login(values.Email, values.Password);
			const  {
				Results,
				Errors
			} = response.data;

			if (Errors.length > 0) {
				const errors = GetResponseErrors(response);
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

	return (
		<FormContainer title={SignInPage.map(name => name.SignInTitle)} 
			tabNames = {Tabs} 
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
						const { errors = [], touched } = props;

						return (
							<Form >
								{errors.length > 0 && <Alert type="danger">
									{errors}
								</Alert>}
								<div className={
									props.errors.Email && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">{SignInPage.map(name => name.EmailLabel)}</label>
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
								<div className={
									props.errors.Password && props.touched.Password ? "cs-form-control error" : "cs-form-control"}>
									<label name="Password" htmlFor="password">{SignInPage.map(name => name.PasswordLabel)}</label>
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
									<p htmlFor="forgetpassword"> <Link to="ResetPassword" >{SignInPage.map(name => name.ForgotPasswordLabel)}</Link></p>
									<p htmlFor="signup"
									>{SignInPage.map(name => name.NoAccountLabel)} <Link to="SignUpForm" >{SignInPage.map(name => name.SignUpLinkLabel)}</Link></p>
									<SeButton
										text="Back"
										type="button"
										className = "seButton"
										onClick = {goBack}
									/>
									<SeButton
										text="Sign In and Continue"
										type="submit"
										isLoading={props.isSubmitting}
										isLoadingText="Signing In..."
										className = "seButton pull-right"
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

export default SignIn;
