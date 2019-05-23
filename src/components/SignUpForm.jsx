
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';


const SignUp = props => {

	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};


	return (
		<FormContainer title="Register for an Account">
			<Formik

				initialValues={{
					NameFirst: '',
					NameLast: '',
					Telephone: '',
					Email: '',
					Password: '',
					type: fieldType,


				}}
				validationSchema={Yup.object().shape({
					NameFirst: Yup.string().required('Please enter your first name.'),
					NameLast: Yup.string().required('Please enter your last name.'),
					Telephone: Yup.string()
						.required('Please enter your phone number.')
						.matches(
							/^[0-9]{3}-[0-9]{3}-[0-9]{4}/,
							"Please enter your phone number in the correct format (e.g. 410-555-1212)."),
					Email: Yup.string().email('Invalid email.').required('Please enter a valid email address.'),
					Password: Yup.string()
						.required('Please enter your password.')
						.max(30, "Maximum 30 characters allowed.")
						.matches(
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
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
								<label htmlFor="NameFirst"
									className={
										errors.NameFirst && touched.NameFirst ? "input-feedback" : "text-label"}
								>First Name</label>
								<Field
									type="text"
									name="NameFirst"
									className={`text-input ${errors.NameFirst && touched.NameFirst ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.NameFirst}
										touched={touched.NameFirst} />
								</div>
								<label htmlFor="NameLast"
									className={
										errors.NameLast && touched.NameLast ? "input-feedback" : "text-label"}
								>Last Name</label>
								<Field
									type="text"
									name="NameLast"
									className={`text-input ${errors.NameLast && touched.NameLast ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.NameLast}
										touched={touched.NameLast} />
								</div>
								<label htmlFor="Telephone"
									className={
										errors.Telephone && touched.Telephone ? "input-feedback" : "text-label"}
								>Phone</label>
								<Field
									type="text"
									name="Telephone"
									className={`text-input ${errors.Telephone && touched.Telephone ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.Telephone}
										touched={touched.Telephone} />
								</div>
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
									<label name="Password" htmlFor="Password"
										className={
											errors.Password && touched.Password ? "input-feedback" : "text-label"}
									>
										Password
									</label>
									<Field type={fieldType === 'Password' ? 'Password' : 'text'}
										name="Password"
										value={values.Password}
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


