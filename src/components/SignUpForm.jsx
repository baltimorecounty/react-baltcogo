import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetErrorsDetails } from "../utilities/CustomErrorHandling";
import FormContainer from './FormContainer';
import { SignUp } from './authService';
import { Link } from 'react-router-dom';
import { formIncomplete } from "./checkFormCompletion";
import { IsPhoneNumberValid } from '@baltimorecounty/validation';
import SeButton from "./SeButton";

const CreateAccount = (props, routeProps) => {
	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	if(formIncomplete(props)){
		props.history.push('/ServiceRequestForm');
	}

	const userCreateAccount = async (values, actions, props) => {
		try {
			const response = await SignUp(values.NameFirst, values.NameLast, values.Email, values.Password, values.Telephone, values.UniqueId, values.SuppressNotifications);
			var ContactID = "";

			if (response.data.HasErrors) {
				const errorsReturned = GetErrorsDetails(response);
				actions.setStatus({
					success2: errorsReturned,
					css: 'email'
				})
				throw new Error(errorsReturned);
			}
			else {
				ContactID = response.data.Results.Id;
				const NameFirst = response.data.Results.NameFirst;
				const NameLast = response.data.Results.NameLast

				props.setFieldValue('ContactID', ContactID);
				props.setFieldValue('NameFirst', NameFirst);
				props.setFieldValue('NameLast', NameLast);

				sessionStorage.setItem('UserLoginID', ContactID)
				sessionStorage.setItem('NameFirst', NameFirst);
				sessionStorage.setItem('NameLast', NameLast);

				props.history.push('/ProvideDetails');
			}
		}
		catch (ex) {
			console.log(ex.message);
		}
	}
	Yup.addMethod(Yup.string, "Telephone", function (value) {
		return this.test(
			"Telephone",
			"Please enter your phone number in the following format: 410-555-1212.",
			IsPhoneNumberValid
		);
	});

	return (
		<FormContainer title="Register for an Account" tabNames = {props.values.Tabs} currentTab="ServiceRequestForm" shouldDisableForm={props.values.shouldDisableForm} requiresLocation= {props.values.requiresLocation}>
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
					Telephone: Yup.string().required('Please enter your phone number in the following format: 410-555-1212.').Telephone(),

					Password: Yup.string()
						.required('Please enter your password.')
						.max(30, "Maximum 30 characters allowed.")
						.matches(
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
							"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")

				})}
				onSubmit={async (values, actions, setSubmitting) => {
					await userCreateAccount(values, actions, props);
					actions.setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched} = props;

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

									>Phone</label>
									<Field
										type="text"
										name="Telephone"
										value={values.Telephone}

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

								<div className="cs-form-control" >
									<p htmlFor="signup">Already have an account? <Link to="SignInForm" >Sign In</Link></p>
									<SeButton
										text="Sign Up and Continue"
										type="submit"
										isLoading={isSubmitting}
										isLoadingText="Signing Up..."
										className="pull-right"
									/>
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


