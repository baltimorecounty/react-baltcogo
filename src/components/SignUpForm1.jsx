import React, { useState } from "react";
import { Form, Field, connect } from "formik";
import * as Yup from "yup";import ErrorMsg from "./ErrorMessage";

import FormContainer from './FormContainer';
import { SignUp } from './authService';
import { Link } from 'react-router-dom';

const CreateAccount = props => {
	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	const userCreateAccount = async () => {
		const { NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications } = props.formik.values;
		props.history.push('/ProviderDetails');
		/* 	try {
				const response = await SignUp(NameFirst,NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications);
				if (response.data.ErrorsCount > 0) {
					const errorsReturned = ErrorCheck(response);
					console.log(errorsReturned);
					props.formik.errors.ErrorMsg = errorsReturned;
				}
				else {
					props.history.push('/ProviderDetails');
				}
			}
			catch (ex) {
				if (ex.response && ex.response.status === 400) {
					props.formik.errors.email = ex.response.data
				}
			} */
	}

	const { isSubmitting, ...rest } = props;
	//console.log(props);
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
				<div id="ContactAddress">
					<label htmlFor="streeAddress"
						className={
							rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "input-feedback" : "text-label"}
					>Your Street Address</label>
					<Field
						type="text"
						name="streeAddress"
						className={`text-input ${rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "error" : ""}`}
					/>
					<div className="input-feedback">
						<ErrorMsg
							errormessage={rest.formik.errors.streeAddress}
							touched={rest.formik.touched.streeAddress} />
					</div>
					<label htmlFor="city"
						className={
							rest.formik.errors.city && rest.formik.touched.city ? "input-feedback" : "text-label"}
					>Your City</label>
					<Field
						type="text"
						name="city"
						className={`text-input ${rest.formik.errors.city && rest.formik.touched.city ? "error" : ""}`}
					/>
					<div className="input-feedback">
						<ErrorMsg
							errormessage={rest.formik.errors.city}
							touched={rest.formik.touched.city} />
					</div>
					<div>
						<label name="zipCode" htmlFor="zipCode"
							className={
								rest.formik.errors.zipCode && rest.formik.touched.zipCode ? "input-feedback" : "text-label"}
						>
						Your ZIP Code
						</label>
						<Field type='text'
							name="zipCode"
							className={`text-input ${rest.formik.errors.zipCode && rest.formik.touched.zipCode ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.zipCode}
								touched={rest.formik.touched.zipCode} />
						</div>
					</div>
				</div>
				<label htmlFor="signup"
				>Already have an account? <Link to="SignInForm" >Sign In</Link> </label><br />
				<button type="button" onClick={userCreateAccount}>
					Sign Up and Continue
				</button>
				{/* <button type="submit" disabled={isSubmitting}>
                    Sign Up and Continue
				</button> */}
			</Form>
		</FormContainer>
	);
}
export default connect(CreateAccount);


