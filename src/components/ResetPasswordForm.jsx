import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetErrorsDetails } from "../utilities/CustomErrorHandling";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { formIncomplete } from "./checkFormCompletion";
import Alert from './Alert';
import SeButton from "./SeButton";
import { ResetPassword } from './authService';


const ResetPasswordForm = (props, routeProps) => {

	if (formIncomplete(props)) {
		props.history.push('/ServiceRequestForm');
	}

	const {Tabs} = props.values;

	const userPasswordReset = async (values, props, actions) => {
		const { Email = '' } = values || {};
		try {
			const response = await ResetPassword(Email);
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = GetErrorsDetails(response);
				props.Field.ErrorMsg = errorsReturned;
			}
			else {
				props.values.setFieldValue('Email', Email);
				props.history.push('/SignInForm');
			}
		}
		catch (ex) {
			console.log(ex.message);
		}
	}

	const goBack = () =>{
		props.history.push('/ServiceRequestForm');
	}

	return (
		<FormContainer  title="Reset Password"
			tabNames = {Tabs}
			currentTab = "ServiceRequestForm"
			shouldDisableForm = {false}
			isPanelRequired={true}
		>
			<Formik
				initialValues={{
					Email: '',

				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.')
				})}
				onSubmit={async (values, actions) => {
					actions.setSubmitting(true);
					await userPasswordReset(values, actions);
					actions.setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { errors = [], touched } = props;

						return (
							<Form >
								{errors.length > 0 && <Alert type="danger">
									{errors}
								</Alert>}
								<div className={
									props.errors.Email && props.touched.Email ? "cs-form-control error" : "cs-form-control"}>
									<label htmlFor="Email">Email Address</label>
									<Field
										type="email"
										name="Email"
									/>
									<ErrorMessage name='msg' className='input-feedback' component='div' />
									<div className={`input-feedback ${props.status ? props.status.css : ''}`}>
										{props.status ? props.status.success : ''}
									</div>
									<p role='alert' className="error-message">
										<ErrorMsg
											errormessage={errors.Email}
											touched={touched.Email} />
									</p>
								</div>
								<div className = "cs-form-control" >
									<p htmlFor="signup"
									>Don't have an account? <Link to="SignUpForm" >Sign up</Link></p>
									<p htmlFor="signup"
									>Remember your password? <Link to="SignInForm" >Sign In</Link> </p>
									<SeButton
										text="Back"
										type="button"
										onClick = {goBack}
									/>
									<SeButton
										text="Submit Reset Request"
										type="submit"
										isLoading={props.isSubmitting}
										className = "pull-right"
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
export default ResetPasswordForm;
