import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';

const SignIn = props => {


	return (


		<FormContainer title="Sign In">
			<Formik
				initialValues={{
					emailAddress: '',
					password: '',
				}}
				validationSchema={Yup.object().shape({
					emailAddress: Yup.string().required('Emal Address is required'),
					password: Yup.string().required('Password is required'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched} = props;
						return (

							<Form >
								<label htmlFor="emailAddress"
									className={
										errors.emailAddress && touched.emailAddress ? "input-feedback" : "text-label"}

								>Email Address</label>
								<Field
									type="email"
									name="emailAddress"
								/>

								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.emailAddress}
										touched={touched.emailAddress} />
								</div>


								{
									values['requestType'] !== '' ?
										<div>
											<label name="Password" htmlFor="Password"
												className={
													errors.Password && touched.Password ? "input-feedback" : "text-label"}
											>
												Password
											</label>
											<Field type="Password"
												name="Password"
												className={`text-select ${errors.subRequestType && touched.subRequestType ? "error" : ""}`}
											>
					
											</Field>
											<div className="input-feedback">
												<ErrorMsg
													errormessage={errors.Password}
													touched={touched.Password} />
											</div>
										</div>
										: null
								}

								<button type="submit" disabled={isSubmitting}>
									SIGN IN AND CONTINUTE
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
