import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { Login } from './authService';
import DisplayFormikState from './helper';
const SignIn = (props, routeProps) => {


	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	const userLogin = async (values, props) => {

		console.log('--inside signnup');
		console.log(values);
		console.log(props);
		//return ('testing---');
		try {
			const response = await Login(values.Email, values.Password);
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = ErrorCheck(response);
				console.log(errorsReturned);
				props.errors.Email = errorsReturned;
				props.setFieldValue('Email', '');
				return ({ Email: "where is it ?????" });

			}
			else {
				props.history.push('/ProviderDetails');
			}
		}
		catch (ex) {
			if (ex.response && ex.response.status === 400) {
				props.errors.email = ex.response.data
			}
		}

	}


	console.log('+++++++++++++++++++++');
	console.log(routeProps);
	console.log(props);
	console.log('+++++++++++++++++++++');
	return (
		<FormContainer title="Sign In">
			<Formik
				initialValues={{
					Email: '',
					Password: '',

				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Invalid email address.').required('Please enter a valid email address.'),
					Password: Yup.string()
						.required('Please enter your password.')
					//	.max(30, "Maximum 30 characters allowed.")
					//	.matches(
					//		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
					//		"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")
				})}
				onSubmit={async (values, actions, setSubmitting) => {
					const response = await Login(values.Email, values.Password);
					actions.setSubmitting(false);
					if (response.data.ErrorsCount > 0) {
						const errorsReturned = ErrorCheck(response);
					console.log(response);
					console.log(actions);
					localStorage.setItem('UserLoginID', response.data.Results.Id);
					if (response.status === 200) {
						actions.setStatus({
							success: errorsReturned,
							css: 'error'
						})
						actions.setSubmitting(false);

					}
					else if (response.status === 200) {
						props.setFieldValue('ID', 1);
						actions.setStatus({
							success: 'OK',
							css: 'success'
						})
						actions.setSubmitting(false);
						props.history.push('/ProviderDetails');
					}
				}
				}
			>
				{
					(props) => {
						const { errors, touched } = props;
						console.log('props.isSubmitting');
						console.log(props.isSubmitting);
						return (
							<Form >
								<label htmlFor="Email"
									className={
										errors.Email && touched.Email ? "input-feedback" : "text-label"}
								>Email Address</label>
								<Field
									type="email"
									name="Email"
									//onChange={handleEmailChange}
									className={`text-input ${errors.Email && touched.Email ? "error" : ""}`}
								/>

								<ErrorMessage name='msg' className='input-feedback' component='div' />
								<div className={`input-feedback ${props.status ? props.status.css : ''}`}>
									{props.status ? props.status.success : ''}
								</div>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.Email}
										touched={touched.Email} />
								</div>
								<div>
									<label name="Password" htmlFor="password"
										className={
											errors.Password && touched.Password ? "input-feedback" : "text-label"}
									>Password</label>
									<Field
										type={fieldType === 'Password' ? 'Password' : 'text'}
										name="Password"
										className={`text-input ${errors.Password && touched.Password ? "error" : ""}`}
									/>
									<span onClick={handlePasswordToggleChange}
										className={`fa fa-fw fa-eye field-icon ${fieldType === 'text' ? "fa-eye-slash" : ""}`}></span>

									<div className="input-feedback">
										<ErrorMsg
											errormessage={errors.Password}
											touched={touched.Password} />
									</div>
								</div>
								<label htmlFor="forgetpassword"> <Link to="ResetPassword" >Forgot password?</Link></label><br />
								<label htmlFor="signup"
								>Don't have an account? <Link to="SignUpForm" >Sign up</Link></label><br />
								<button type="submit" disabled={props.isSubmitting}>
									Sign In and Continue
								</button>
								<DisplayFormikState {...props} />


							</Form>

						)
					}
				}
			</Formik>
		</FormContainer>

	);
}

export default SignIn;
