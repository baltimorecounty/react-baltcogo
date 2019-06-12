import React, { useState } from "react";
import { Formik, Form, Field, connect } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { Login } from './authService';


const SignIn = (props, errors, touched) => {

	const [fieldType, setFieldType] = useState('Password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'Password' ? 'text' : 'Password');
	};

	const userLogin = async () => {

		console.log('--inside signnup');
		const { Email, Password } = props.formik.values;

		try {
			const response = await Login(Email, Password);
			//props.history.push('/ProviderDetails');
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = ErrorCheck(response);
				console.log(errorsReturned);
				Field.email.errormessage = errorsReturned;
			}
			else {
				props.history.push('/ProviderDetails');
			}
		}
		catch (ex) {
			if (ex.response && ex.response.status === 400) {
				props.formik.errors.email = ex.response.data
			}
		}

	}
	const { isSubmitting, ...rest } = props;
	console.log('render in SignInForm1');
	return (
		<FormContainer title="Sign In">
			<Form >
				<label htmlFor="Email"
					className={rest.formik.errors.Email && rest.formik.touched.Email ? "input-feedback" : "text-label"}
				>Email Address
				</label>
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
					<label name="Password" htmlFor="password"
						className={
							rest.formik.errors.Password && rest.formik.touched.Password ? "input-feedback" : "text-label"}
					>Password</label>
					<Field
						type={fieldType === 'Password' ? 'Password' : 'text'}
						name="Password"
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
				<label htmlFor="forgetpassword"> <a href="ResetPassword" >Forgot password?</a></label><br />
				<label htmlFor="signup"
				>Don't have an account? <a href="SignUpForm" >Sign up</a></label><br />

				<button type="button" onClick={userLogin}>Sign In and Continue</button>
				{/* <button type="submit" disabled={isSubmitting}>
					Sign In and Continue
				</button> */}
			</Form>

		</FormContainer>

	);
}

export default connect(SignIn);
