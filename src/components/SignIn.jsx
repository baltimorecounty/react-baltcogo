import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';

const SignIn = props => {
	const [Categories, setData] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				'//dev.baltimorecountymd.gov/sebin/q/m/categories.json',
			);
			setData(result.data);
		};

		fetchData();
	}, []);

	const handleServiceRequestChange = (changeEvent, setFieldValue) => {
		const { value } = changeEvent.currentTarget;
		const subCategories = getSubCategories(Categories, parseInt(value));
		setSubCategories(subCategories);
	};



	return (


		<FormContainer title="Sign In">
			<Formik
				initialValues={{
					emailAddress: '',
					password: '',
				}}
				validationSchema={Yup.object().shape({
					emailAddress: Yup.string().email('Invalid email').required('Email Address is required'),
					password: Yup.string().required('Password is required'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched, handleChange } = props;
						return (

							<Form >
								<label htmlFor="emailAddress"
									className={
										errors.emailAddress && touched.emailAddress ? "input-feedback" : "text-label"}

								>Email Address</label>
								<Field
									type="email"
									name="emailAddress"
									onChange={handleChange}
									className={`text-input ${errors.emailAddress && touched.emailAddress ? "error" : ""}`}
								/>

								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.emailAddress}
										touched={touched.emailAddress} />
								</div>


								{

									<div>
										<label name="password" htmlFor="password"
											className={
												errors.Password && touched.Password ? "input-feedback" : "text-label"}
										>
											Password
										</label>
										<Field type="password"
											name="password"
											onChange={handleChange}
											className={`text-input ${errors.password && touched.password ? "error" : ""}`}
										/>

										<div className="input-feedback">
											<ErrorMsg
												errormessage={errors.password}
												touched={touched.password} />
										</div>
									</div>

								}
								<label htmlFor="forgetpassword">Forgot password</label><br />
								<label htmlFor="signup"
								>Don't have an account? Sign up</label><br />
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
