import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { PasswordReset } from './authService';

const SignIn = props => {
	const userLogin = async (values) => {

		console.log('--inside signnup');
		console.log(values);
		try {
			const response = await PasswordReset(values.Email);
			if(response.data.ErrorsCount > 0){
				console.log(ErrorCheck(response));
			}
			else{
				props.history.push('/AdditionalInformationForm');
			}	
		}
		catch (ex) {
			if (ex.response && ex.response.StatusCode === 400) {
				props.errors.email = ex.response.data
			}
		}

	}
	return (
		<FormContainer title="Reset Password">
			<Formik
				initialValues={{
					Email: ''
				}}
				validationSchema={Yup.object().shape({
					Email: Yup.string().email('Invalid email address.').required('Please enter a valid email address.'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					userLogin(values);
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { isSubmitting, errors, touched } = props;
						return (
							<Form >
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
								<button type="submit" disabled={isSubmitting}>
									Submit Reset Request
								</button>
							</Form>
						)
					}
				}
			</Formik>
		</FormContainer>

	);
}

export default SignIn;
