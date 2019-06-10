
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';

/*function formatPhoneNumber(value, format) {
	let error;
	console.log('--test--');

	console.log('value:' + value);
	if (!value) {

		error = 'Required';
	}
	else {
		error = 'Required too';
				if (typeof value === 'number') {
					value = value.toString();
				}
				var exp = /\d+/g;
				var numbersOnly = value.match(exp).join('').split('');
				var numberOfXs = format.split('').filter(function (char) {
					return char === 'x';
				}).length;
				var hasOneAsPrefix = numberOfXs + 1 === numbersOnly.length;
				// 1 has been included in the str, but is not in the desired format
				if (hasOneAsPrefix) {
					numbersOnly.shift();
				}
				if (numberOfXs === numbersOnly.length || hasOneAsPrefix) {
					numbersOnly.forEach(function (number) {
						format = format.replace('x', number);
					});
				}
				else {
					console.error("Incorrect Format. Double Check your values.");
					return null;
				} 
	}
	return error;

}
var _formatters = {
	phoneNumber: formatPhoneNumber
};
function format(key, val, strFormat) {

	return _formatters[key](val, strFormat);

};*/

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
									value={values.Telephone}
									//validate={formatPhoneNumber(values.Telephone)}
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


