import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { SignUp, VerifyAddress, CreateContactAddress } from './authService';
import { Link } from 'react-router-dom';
import { formIncomplete } from "./checkFormCompletion";


const CreateAccount = (props, routeProps) => {
	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	const userCreateAccount = async (values, actions, props) => {


		try {
			var fullAddress = values.Address + ' ' + values.City + ',MD ' + values.ZipCode;

			const addressResponse = await VerifyAddress(fullAddress);
			var VerificationId = "";

			if (addressResponse.data.HasErrors === true) {
				const errorsReturned = ErrorCheck(addressResponse);
				//	console.log(errorsReturned);
				actions.setStatus({
					success1: errorsReturned,
					css: 'address'
				})
				//props.Field.ErrorMsg = errorsReturned;
				throw new Error(errorsReturned);

			}
			else {
				VerificationId = addressResponse.data.Results.VerificationID;
				props.setFieldValue('VerificationId', VerificationId);
				props.setFieldValue('fullAddress', fullAddress);
			}
			try {
				const response = await SignUp(values.NameFirst, values.NameLast, values.Email, values.Password, values.Telephone, values.UniqueId, values.SuppressNotifications);
				var ContactID = "";

				if (response.data.HasErrors === true) {
					const errorsReturned = ErrorCheck(response);
					//console.log(errorsReturned);
					actions.setStatus({
						success2: errorsReturned,
						css: 'email'
					})
					//props.Field.ErrorMsg = errorsReturned;
					throw new Error(errorsReturned);
				}
				else {
					ContactID = response.data.Results.Id;
					props.setFieldValue('ContactID', ContactID);
					sessionStorage.setItem('UserLoginID', ContactID)
				}
				try {
					const contactAddressResponse = await CreateContactAddress(ContactID, VerificationId, "Default");

					if (contactAddressResponse.data.HasErrors === true) {
						const errorsReturned = ErrorCheck(contactAddressResponse);
						//console.log(errorsReturned);
						//props.Field.ErrorMsg = errorsReturned;
						throw new Error(errorsReturned);
					}
					else {

						props.setFieldValue('requestTypeAddress', values.Address);
						props.setFieldValue('requestTypeCity', values.City);
						props.setFieldValue('requestTypeZip', values.ZipCode);

						props.setFieldValue('streetAddress', values.Address);
						props.setFieldValue('city', values.City);
						props.setFieldValue('zipCode', values.ZipCode);

						if(formIncomplete(props) === true){
							props.history.push('/ServiceRequestForm');
							props.setFieldValue("userNeedsToLoginError", "Please log in to continue");
						}
						else{
							props.history.push('/ProvideDetails');
						}
					}
				}
				catch (ex) {
					console.log(ex.message);
				}
			}
			catch (ex) {
				console.log(ex.message);
			}
		}
		catch (ex) {
			console.log(ex.message);
		}
	}


	return (
		<FormContainer title="Register for an Account" currentTab="ServiceRequestForm" shouldDisableForm={props.values.shouldDisableForm}>
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
					Email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
					Address: Yup.string().required('Please enter your address.'),
					City: Yup.string().required('Please enter your city.'),
					ZipCode: Yup.string().matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, {
						message: 'Please enter your five-digit ZIP code.',
						excludeEmptyString: true
					}).required('Please enter your zip code.'),
					Password: Yup.string()
						.required('Please enter your password.')
						.max(30, "Maximum 30 characters allowed.")
						.matches(
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
							"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")

				})}
				onSubmit={async (values, actions, setSubmitting) => {
					//const returnval = window.formatPhoneNumber(values.Telephone);
					//console.log('----------returnval--------');
					//console.log(returnval);
					//	console.log('----------------------');
					await userCreateAccount(values, actions, props);

					actions.setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched } = props;

						return (
							<Form >
								<div className={
									errors.NameFirst && touched.NameFirst ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="NameFirst">First Name</label>
									<Field
										type="text"
										name="NameFirst"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.NameFirst}
											touched={touched.NameFirst} />
									</p>
								</div>
								<div className={
									props.errors.NameLast && props.touched.NameLast ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="NameLast">Last Name</label>
									<Field
										type="text"
										name="NameLast"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.NameLast}
											touched={touched.NameLast} />
									</p>
								</div>
								<div className={
									props.errors.Telephone && props.touched.Telephone ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Telephone"
										value={values.Telephone}
									//validate={formatPhoneNumber(values.Telephone)}
									>Phone</label>
									<Field
										type="text"
										name="Telephone"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Telephone}
											touched={touched.Telephone} />
									</p>
								</div>
								<div className={
									props.errors.Email && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">Email Address</label>
									<Field
										type="email"
										name="Email"
									/>
									<p role='alert' className="error-message">
										{props.status ? props.status.success2 : ''}
									</p>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Email}
											touched={touched.Email} />
									</p>
								</div>
								<div className={
									props.errors.Password && props.touched.Password ? "cs-form-control error" : "cs-form-control"}>
									<label name="Password" htmlFor="Password">Password</label>
									<Field type={fieldType === 'Password' ? 'Password' : 'text'}
										name="Password"
										value={values.Password}
									/>
									<span onClick={handlePasswordToggleChange}
										className={`fa fa-fw fa-eye field-icon ${fieldType === 'text' ? "fa-eye-slash" : ""}`}></span>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Password}
											touched={touched.Password} />
									</p>
								</div>
								<div className={
									props.errors.Address && props.touched.Address ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Address">Street Address</label>
									<Field
										type="text"
										name="Address"
									/>
									<div className={`input-feedback ${props.status ? props.status.css : ''}`}>
										{props.status ? props.status.success1 : ''}
									</div>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Address}
											touched={touched.Address} />
									</p>
								</div>
								<div className={
									props.errors.City && props.touched.City ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="City">City</label>
									<Field
										type="text"
										name="City"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.City}
											touched={touched.City} />
									</p>
								</div>
								<div className={
									props.errors.ZipCode && props.touched.ZipCode ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="ZipCode">ZIP Code</label>
									<Field type='text'
										name="ZipCode"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.ZipCode}
											touched={touched.ZipCode} />
									</p>
								</div>
								<Field
									type="hidden"
									name="addressID"
								/>
								<div className="cs-form-control" >
									<label htmlFor="signup"
									>Already have an account? <Link to="SignInForm" >Sign In</Link> </label><br />
									<input className="seButton" type="submit" disabled={isSubmitting} value="Sign Up and Continue" />
								</div>

							</Form>
						)
					}
				}
			</Formik>
		</FormContainer >
	);
}
export default CreateAccount;


