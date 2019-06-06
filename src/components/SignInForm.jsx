import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import {login} from './authService';

const SignIn = props => {
	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	const signup= async(values)=>{

		console.log('--inside signnup');
		console.log(values);
		await login(values.Email, values.Password);
	}
	return (
		<FormContainer title="Sign In">
			<Formik
				initialValues={{
					Email: '',
					Password: ''
				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Invalid email address.').required('Please enter a valid email address.'),
					//Password: Yup.string()
					//	.required('Please enter your password.')
					//	.max(30, "Maximum 30 characters allowed.")
					//	.matches(
					//		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
					//		"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					signup(values);
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { isSubmitting, errors, touched } = props;
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
								<label htmlFor="forgetpassword">Forgot password?</label><br />
								<label htmlFor="signup"
								>Don't have an account? Sign up</label><br />
								<button type="submit" disabled={isSubmitting}>
									Sign In and Continue
								</button>
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer>

	);
}

export default SignIn;
