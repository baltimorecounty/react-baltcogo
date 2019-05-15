import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';


const AdditionalInformation = props => {


	return (
		<FormContainer title="Additional Information">
			<Formik
				initialValues={{
					streeAddress: '',
					city: '',
					zipCode: ''

				}}

				validationSchema={Yup.object().shape({
					streeAddress: Yup.string().required('Your Street Address is required'),
					city: Yup.string().required('Your City is required'),
					zipCode: Yup.string().matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, {
						message: 'Need valid five digit ',
						excludeEmptyString: true
					}).required('Your Zip Code is required')
				})}
				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, errors, touched } = props;
						return (
							<Form >
								<label htmlFor="streeAddress"
									className={
										errors.streeAddress && touched.streeAddress ? "input-feedback" : "text-label"}
								>Your Street Address</label>
								<Field
									type="text"
									name="streeAddress"
									className={`text-input ${errors.streeAddress && touched.streeAddress ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.streeAddress}
										touched={touched.streeAddress} />
								</div>
								<label htmlFor="city"
									className={
										errors.city && touched.city ? "input-feedback" : "text-label"}
								>Your City</label>
								<Field
									type="text"
									name="city"
									className={`text-input ${errors.city && touched.city ? "error" : ""}`}
								/>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.city}
										touched={touched.city} />
								</div>
								<div>
									<label name="zipCode" htmlFor="zipCode"
										className={
											errors.zipCode && touched.zipCode ? "input-feedback" : "text-label"}
									>
                                        Your ZIP Code
									</label>
									<Field type='text'
										name="zipCode"
										className={`text-input ${errors.zipCode && touched.zipCode ? "error" : ""}`}
									/>
									<div className="input-feedback">
										<ErrorMsg
											errormessage={errors.zipCode}
											touched={touched.zipCode} />
									</div>
								</div>

							</Form>
						)
					}
				}

			</Formik>
		</FormContainer>
	);



}



export default AdditionalInformation;
