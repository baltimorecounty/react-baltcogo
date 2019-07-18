import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { IsFormInComplete } from "../utilities/FormHelpers";
import Alert from './Alert';
import SeButton from "./SeButton";
import { ResetPassword } from '../services/authService';
import { GoBack, Go, Routes, GoHome } from "../Routing";


const ResetPasswordForm = (props, routeProps) => {

	if (IsFormInComplete(props)) {
		GoHome(props);
	}

	const {Tabs, ResetPasswordPage} = props.values;

	const userPasswordReset = async (values, props, actions) => {
		const { Email = '' } = values || {};
		try {
			const response = await ResetPassword(Email);
			if (response.data.ErrorsCount > 0) {
				const errorsReturned = GetResponseErrors(response);
				props.Field.ErrorMsg = errorsReturned;
			}
			else {
				signIn();
			}
		}
		catch (ex) {
			console.error(ex.message);
		}
	}

	const goBack = () =>{
		GoBack(props);
	};

	const signIn = () =>{
		Go(props, Routes.SignIn);
	};

	return (
		<FormContainer  title={ResetPasswordPage.map(name => name.ResetPasswordTitle)}
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
									<label htmlFor="Email">{ResetPasswordPage.map(name => name.EmailLabel)}</label>
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
									>{ResetPasswordPage.map(name => name.NoAccountLabel)} <Link to="SignUpForm" >{ResetPasswordPage.map(name => name.SignUpLinkLabel)}</Link></p>
									<p htmlFor="signup"
									>{ResetPasswordPage.map(name => name.RememberPasswordLabel)} <Link to="SignInForm" >{ResetPasswordPage.map(name => name.SignInLinkLabel)}</Link> </p>
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
