import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { ResetPassword } from './authService';

const PasswordReset = props => {

	const userPasswordReset = async (values) => {


		try {
			const response = await ResetPassword(values.Email);
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = ErrorCheck(response);
				console.log(errorsReturned);
				props.Field.ErrorMsg = errorsReturned;
			}
			else {
				props.history.push('/ServiceRequestForm');
			}
		}
		catch (ex) {
			if (ex.response && ex.response.status === 400) {
				props.Form.Field.email.errors = ex.response.data
			}
		}
	}
	return (
		<FormContainer title="Reset Password" currentTab = "ServiceRequestForm" shouldDisableForm = {false}>
			<Formik
				initialValues={{
					Email: ''
				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					//alert(JSON.stringify(values, null, 2));
					userPasswordReset(values);
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { isSubmitting, errors, touched } = props;
						return (
							<Form >
								<div className={
									props.errors.Email && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">Email Address</label>
									<Field
										type="email"
										name="Email"
									/>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Email}
											touched={touched.Email} />
									</p>
								</div>
								<div className = "cs-form-control" >
									<label htmlFor="signup"
									>Don't have an account? <Link to="SignUpForm" >Sign up</Link></label><br />
									<label htmlFor="signup"
									>Remember your password? <Link to="SignInForm" >Sign In</Link> </label><br />
									<input className="seButton" type="submit" disabled={isSubmitting} value="Submit Reset Request" />
								</div>
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer>

	);
}

export default PasswordReset;
