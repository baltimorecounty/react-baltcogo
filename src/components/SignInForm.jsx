import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { Login } from './authService';
// import DisplayFormikState from './helper';
const SignIn = (props, routeProps) => {


	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};


	const userLogin = async (values, props, actions) => {


		try {
			const response = await Login(values.Email, values.Password);
			const contactID = response.data.Results.Id;

			if (response.data.ErrorsCount > 0) {
				const errorsReturned = ErrorCheck(response);

				actions.setStatus({
					success: errorsReturned,
					css: 'error'
				})
				throw new Error(errorsReturned);
			}
			else {
				sessionStorage.setItem('UserLoginID', contactID);
				props.setFieldValue('ContactID', contactID);
				actions.setStatus({
					success: 'OK',
					css: 'success'
				})
				props.history.push('/ProviderDetails');
			}
		}
		catch (ex) {
			if (ex.response && ex.response.status === 400) {
				props.errors.email = ex.response.data
			}
		}

	}



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
				})}
				onSubmit={async (values, actions, setSubmitting) => {

					await userLogin(values, props, actions);
					actions.setSubmitting(false);

				}}
			>
				{
					(props) => {
						const { errors, touched } = props;

						return (
							<Form >
								<label htmlFor="Email"
									className={
										errors.Email && touched.Email ? "input-feedback" : "text-label"}
								>Email Address</label>
								<Field
									type="email"
									name="Email"
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
								<input class="seButton" type="submit" disabled={props.isSubmitting} value="Sign In and Continue" />


								{/* <DisplayFormikState {...props} /> */}


							</Form>

						)
					}
				}
			</Formik>
		</FormContainer >

	);
}

export default SignIn;
