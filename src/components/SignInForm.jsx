import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetErrorsDetails } from "../utilities/CustomErrorHandling";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { Login, GetContactAddress } from './authService';
import { formIncomplete } from "./checkFormCompletion";
import Alert from './Alert';

// import DisplayFormikState from './helper';
const SignIn = (props, routeProps) => {

	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	if (formIncomplete(props)) {
		props.history.push('/ServiceRequestForm');
	}

	const handleLoginFailure = (actions, response) => {
		const errorsReturned = GetErrorsDetails(response);

		actions.setStatus({
			success: errorsReturned,
			css: 'error'
		})
		throw new Error(errorsReturned);
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

	const userLogin = async (values, props, actions) => {
		try {
			const response = await Login(values.Email, values.Password);
			const  {
				Results,
				Errors
			} = response.data;

			if (Errors.length > 0) {
				handleLoginFailure(actions, response);
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
		<FormContainer title="Sign In" tabNames = {props.values.Tabs} currentTab="ServiceRequestForm" shouldDisableForm={props.values.shouldDisableForm} requiresLocation= {props.values.requiresLocation}>
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
									<label htmlFor="Email">Email Address</label>
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
									<label name="Password" htmlFor="password">Password</label>
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
									<p htmlFor="forgetpassword"> <Link to="ResetPassword" >Forgot password?</Link></p>
									<p htmlFor="signup"
									>Don't have an account? <Link to="SignUpForm" >Sign up</Link></p>

									<input className="seButton" type="submit" disabled={props.isSubmitting} value="Sign In and Continue" />
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
