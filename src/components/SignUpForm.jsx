import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { SignUp, VerifyAddress, CreateContactAddress } from './authService';
import { Link }  from 'react-router-dom';

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

const CreateAccount = props => {
	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};
	const userCreateAccount = async (values) => {

		console.log('--inside signnup');
		console.log(values);
		try {
			const response = await SignUp(values.NameFirst, values.NameLast, values.Email, values.Password, values.Telephone, values.UniqueId, values.SuppressNotifications);
			var ContactID = response.data.Results.Id;
			var fullAddress = values.Address + ' ' + values.City + ',MD ' + values.ZipCode; 

			try{
				const addressResponse = await VerifyAddress(fullAddress);
				var VerificationId = addressResponse.data.Results.VerificationId;

				if(addressResponse.data.HasErrors === false){
					const contactAddressResponse = await CreateContactAddress(ContactID, VerificationId , "Default");
					props.formik.setFieldValue('addressID', contactAddressResponse.data.Results.Id);
				}
				else{
					const errorsReturned = ErrorCheck(response);
					console.log(errorsReturned);
					props.Field.ErrorMsg = errorsReturned;
				}
			}
			catch(ex){
				if (ex.response && ex.response.status === 400) {
					props.errors.email = ex.response.data
				}
			}

			if(response.data.HasErrors === false){
				const errorsReturned = ErrorCheck(response);
				console.log(errorsReturned);
				props.Field.ErrorMsg = errorsReturned;
			}
			else{
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
		<FormContainer title="Register for an Account">
			<Formik

				initialValues={{
					NameFirst: '',
					NameLast: '',
					Telephone: '',
					Email: '',
					Password: '',
					Address: '',
					City: '',
					ZipCode: ''
				}}

				validationSchema={Yup.object().shape({
					NameFirst: Yup.string().required('Please enter your first name.'),
					NameLast: Yup.string().required('Please enter your last name.'),
					Email: Yup.string().email('Invalid email.').required('Please enter a valid email address.'),
					Address: Yup.string().required('Invalid address.').required('Please enter a valid address.'),
					City: Yup.string().required('Invalid city.').required('Please enter a valid city.'),
					ZipCode: Yup.string().required('Invalid zip code.').required('Please enter a valid zip code.'),
					Password: Yup.string()
						.required('Please enter your password.')
						.max(30, "Maximum 30 characters allowed.")
						.matches(
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
							"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")

				})}
				onSubmit={(values, { setSubmitting }) => {
					//alert(JSON.stringify(values, null, 2));
					userCreateAccount(values);
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
									<label htmlFor="Address"
										className={errors.Address && touched.Address ? "input-feedback" : "text-label"}
									>Street Address</label>
									<Field
										type="text"
										name="Address"
										className={`text-input ${errors.Address && touched.Address ? "error" : ""}`}
									/>
									<div className="input-feedback">
										<ErrorMsg
											errormessage={errors.Address}
											touched={touched.Address} />
									</div>
									<label htmlFor="City"
										className={errors.City && touched.City ? "input-feedback" : "text-label"}
									>City</label>
									<Field
										type="text"
										name="City"
										className={`text-input ${errors.City && touched.City ? "error" : ""}`}
									/>
									<div className="input-feedback">
										<ErrorMsg
											errormessage={errors.City}
											touched={touched.City} />
									</div>
									<div>
										<label htmlFor="ZipCode"
											className={errors.zipCode && touched.ZipCode ? "input-feedback" : "text-label"}
										>ZIP Code</label>
										<Field type='text'
											name="ZipCode"
											className={`text-input ${errors.ZipCode && touched.ZipCode ? "error" : ""}`}
										/>
										<div className="input-feedback">
											<ErrorMsg
												errormessage={errors.ZipCode}
												touched={touched.ZipCode} />
										</div>
									</div>
									<Field
										type="hidden"
										name="addressID"

									/>
								</div>
								<label htmlFor="signup"
								>Already have an account? <Link to="SignInForm" >Sign In</Link> </label><br />
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
export default CreateAccount;


