
import React, { useState, } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';

const SignUp = props => {

	const [fieldType, setFieldType] = useState('password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'password' ? 'text' : 'password');
	};


	return (
		<FormContainer title="Register for an Account?">
			<Formik

				initialValues={{
					firstName: '',
					lastName: '',
					emailAddress: '',
					password: '',
					type: fieldType
				}}
				validationSchema={Yup.object().shape({
					firstName: Yup.string().required('First Name is required'),
					lastName: Yup.string().required('Last Name is required'),
					emailAddress: Yup.string().email('Invalid email').required('Email Address is required'),
					password: Yup.string().required('Password is required'),
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
								<label htmlFor="firstName"
									className={
										errors.firstName && touched.firstName ? "input-feedback" : "text-label"}
								>First Name</label>
								<Field
									type="text"
									name="firstName"
									className={`text-input ${errors.firstName && touched.firstName ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.firstName}
										touched={touched.firstName} />
								</div>
								<label htmlFor="lastName"
									className={
										errors.lastName && touched.lastName ? "input-feedback" : "text-label"}
								>Last Name</label>
								<Field
									type="text"
									name="lastName"
									className={`text-input ${errors.lastName && touched.lastName ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.lastName}
										touched={touched.lastName} />
								</div>
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
											errors.Password && touched.Password ? "input-feedback" : "text-label"}
									>
										Password
									</label>
									<Field type={fieldType === 'password' ? 'password' : 'text'}
										name="password"
										value={values.password}
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
								<label htmlFor="signup"
								>Already have an account? SignIn </label><br />
								<button type="submit" disabled={isSubmitting}>
									SIGN UP AND CONTINUE
								</button>
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer>
	);



}



export default SignUp;


