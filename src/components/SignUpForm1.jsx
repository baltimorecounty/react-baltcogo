import React, { useState } from "react";
import { Formik, Form, Field, connect } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { SignUp } from './authService';


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
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = ErrorCheck(response);
				console.log(errorsReturned);
				props.Field.ErrorMsg = errorsReturned;
			}
			else {
				props.history.push('/AdditionalInformationForm');
			}
		}
		catch (ex) {
			if (ex.response && ex.response.status === 400) {
				props.errors.email = ex.response.data
			}
		}
	}

	const { values, isSubmitting, ...rest } = props;
	return (
		<FormContainer title="Register for an Account">
			<Form >
				<label htmlFor="NameFirst"
					className={
						rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "input-feedback" : "text-label"}
				>First Name</label>
				<Field
					type="text"
					name="NameFirst"
					className={`text-input ${rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "error" : ""}`}
				/>
				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.NameFirst}
						touched={rest.formik.touched.NameFirst} />
				</div>
				<label htmlFor="NameLast"
					className={
						rest.formik.errors.NameLast && rest.formik.touched.NameLast ? "input-feedback" : "text-label"}
				>Last Name</label>
				<Field
					type="text"
					name="NameLast"
					className={`text-input ${rest.formik.errors.NameLast && rest.formik.touched.NameLast ? "error" : ""}`}
				/>
				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.NameLast}
						touched={rest.formik.touched.NameLast} />
				</div>
				<label htmlFor="Telephone"
					value={rest.formik.values.Telephone}
					//validate={formatPhoneNumber(values.Telephone)}
					className={
						rest.formik.errors.Telephone && rest.formik.touched.Telephone ? "input-feedback" : "text-label"}
				>Phone</label>
				<Field
					type="text"
					name="Telephone"
					className={`text-input ${rest.formik.errors.Telephone && rest.formik.touched.Telephone ? "error" : ""}`}
				/>
				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.Telephone}
						touched={rest.formik.touched.Telephone} />
				</div>
				<label htmlFor="Email"
					className={
						rest.formik.errors.Email && rest.formik.touched.Email ? "input-feedback" : "text-label"}
				>Email Address</label>
				<Field
					type="email"
					name="Email"
					className={`text-input ${rest.formik.errors.Email && rest.formik.touched.Email ? "error" : ""}`}
				/>
				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.Email}
						touched={rest.formik.touched.Email} />
				</div>
				<div>
					<label name="Password" htmlFor="Password"
						className={
							rest.formik.errors.Password && rest.formik.touched.Password ? "input-feedback" : "text-label"}
					>
                        Password
					</label>
					<Field type={fieldType === 'Password' ? 'Password' : 'text'}
						name="Password"
						value={rest.formik.values.Password}
						className={`text-input ${rest.formik.errors.Password && rest.formik.touched.Password ? "error" : ""}`}
					/>
					<span onClick={handlePasswordToggleChange}
						className={`fa fa-fw fa-eye field-icon ${fieldType === 'text' ? "fa-eye-slash" : ""}`}></span>
					<div className="input-feedback">
						<ErrorMsg
							errormessage={rest.formik.errors.Password}
							touched={rest.formik.touched.Password} />
					</div>
				</div>
				<label htmlFor="signup"
				>Already have an account? <a href="SignInForm" >Sign In</a> </label><br />
				<button type="submit" disabled={isSubmitting}>
                    Sign Up and Continue
				</button>
			</Form>


		</FormContainer >
	);
}

export default connect(CreateAccount);


