import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { Login } from './authService';
import DisplayFormikState from './helper';
const SignIn = () => (
	<div>
		<FormContainer title="Sign In">
			<Formik
				initialValues={{
					Email: '',
					Password: ''
				}}
				validate={values => {
					let errors = {}
					if (!values.Email) {
						errors.Email = 'Please enter a valid email address'
					} else if (!values.Password) {
						errors.Password = 'Password required'
					}
					return errors
				}}
				onSubmit={async (values, actions) => {
					actions.setStatus({
						success: 'Sending email...',
						css: 'sending'
					})
					actions.setSubmitting(false)
					const response = await Login(values.Email, values.Password);
					console.log(response);
					if (response.status === 200) {
						actions.setStatus({
							success: 'Something went wrong, email not sent !',
							css: 'error'
							//success: 'Email sent !',
							//css: 'success'
						})
					} else {
						actions.setStatus({
							success: 'Something went wrong, email not sent !',
							css: 'error'
						})
					}
				}}

				render={props => (
					<Form>
						<label htmlFor="Email">Email Address</label>
						<Field type="email" name="Email" />
						<ErrorMessage name='Email' className='field-validation' component='div' />
						<label name="Password" htmlFor="password">Password</label>
						<Field type={'text'} name="Password" />
						<ErrorMessage name='Password' className='field-validation' component='div' />


						<ErrorMessage name='msg' className='field-validation' component='div' />
						<div className={`form-sending ${props.status ? props.status.css : ''}`}>
							{props.status ? props.status.success : ''}
						</div>
						<label htmlFor="forgetpassword"> <Link to="ResetPassword" >Forgot password?</Link></label><br />
						<label htmlFor="signup">Don't have an account? <Link to="SignUpForm" >Sign up</Link></label><br />
						<button type="submit" disabled={props.isSubmitting}> Sign In and Continue</button>
						<DisplayFormikState {...props} />
					</Form>

				)}

			/>
		</FormContainer>
	</div>

);

export default SignIn;
