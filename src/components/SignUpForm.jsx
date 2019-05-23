
import React, { useState } from "react";
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
		<FormContainer title="Register for an Account">
			{/* /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, */}
			<Formik

				initialValues={{
					firstName: '',
					lastName: '',
					phoneNumber: '',
					emailAddress: '',
					password: '',
					type: fieldType,


				}}
				validationSchema={Yup.object().shape({
					firstName: Yup.string().required('Please enter your first name.'),
					lastName: Yup.string().required('Please enter your last name.'),
					phoneNumber: Yup.string()
						.required('Please enter your phone number.')
						.matches(
							/^[0-9]{3}-[0-9]{3}-[0-9]{4}/,
							"Please enter your phone number in the correct format (e.g. 410-555-1212)."),
					emailAddress: Yup.string().email('Invalid email.').required('Please enter a valid email address.'),
					password: Yup.string()
						.required('Please enter your password.')
						.max(30, "Maximum 30 characters allowed.")
						.matches(
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8}/,
							"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")

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
								<label htmlFor="phoneNumber"
									className={
										errors.phoneNumber && touched.phoneNumber ? "input-feedback" : "text-label"}
								>Phone</label>
								<Field
									type="text"
									name="phoneNumber"
									className={`text-input ${errors.phoneNumber && touched.phoneNumber ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.phoneNumber}
										touched={touched.phoneNumber} />
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
									Sign Up and Continue
								</button>
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer >
	);



}



export default SignUp;


