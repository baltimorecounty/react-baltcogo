import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import { ResetPassword } from './authService';

const PasswordReset = props => {
	const userPasswordReset = async (values) => {

		console.log('--inside signnup');
		console.log(values);
		console.log(values.Email);
		try {
			const response = await ResetPassword(values.Email);
			if(response.data.ErrorsCount > 0){	
				const errorsReturned = ErrorCheck(response);
				console.log(errorsReturned);
				props.Field.ErrorMsg = errorsReturned;
			}
			else{
				props.history.push('/AdditionalInformationForm');
			}	
		}
		catch (ex) {
			if (ex.response && ex.response.StatusCode === 400) {
				props.Form.Field.email.errors = ex.response.data
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

export default PasswordReset;
