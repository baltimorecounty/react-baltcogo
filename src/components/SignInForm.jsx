import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';

const SignIn = props => {
	const [fieldType, setFieldType] = useState('password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'password' ? 'text' : 'password');
	};
	return (
		<FormContainer title="Sign In">
			<Formik
				initialValues={{
					emailAddress: '',
					password: ''
				}}
				validationSchema={Yup.object().shape({
					emailAddress: Yup.string().email('Invalid email').required('Please enter a valid email address.'),
					password: Yup.string().required('Please enter your password.'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched } = props;
						return (
							<Form >
								<label htmlFor="emailAddress"
									className={
										errors.emailAddress && touched.emailAddress ? "input-feedback" : "text-label"}
								>Email Address</label>
								<Field
									type="email"
									name="emailAddress"
									className={`text-input ${errors.emailAddress && touched.emailAddress ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.emailAddress}
										touched={touched.emailAddress} />
								</div>
								<div>
									<label name="password" htmlFor="password"
										className={
											errors.password && touched.password ? "input-feedback" : "text-label"}
									>Password</label>
									<Field
										type={fieldType === 'password' ? 'password' : 'text'}
										name="password"
										className={`text-input ${errors.password && touched.password ? "error" : ""}`}
									/>
									<span onClick={handlePasswordToggleChange}
										className={`fa fa-fw fa-eye field-icon ${fieldType === 'text' ? "fa-eye-slash" : ""}`}></span>

									<div className="input-feedback">
										<ErrorMsg
											errormessage={errors.password}
											touched={touched.password} />
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