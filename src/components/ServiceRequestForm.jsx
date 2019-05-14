import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios"
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";

const getSubCategories = (categories, categoryId) => {
	var category = categories.find(category => category.id === categoryId);
	return category ? category.types : [];
};

const ServiceRequestForm = props => {
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


		<FormContainer title="How Can We Help?">
			<Formik
				initialValues={{
					requestType: '',
					subRequestType: '',
				}}
				validationSchema={Yup.object().shape({
					requestType: Yup.string().required('Request Category is required'),
					subRequestType: Yup.string().required('Sub Category is required'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched, ...rest } = props;
						return (

							<Form >
								<label htmlFor="requestType"
									className={
										errors.requestType && touched.requestType ? "input-feedback" : "text-label"}

								>Request Category</label>
								<RequestTypeField
									component="select"
									name="requestType"
									formikProps={rest}
									onChange={handleServiceRequestChange}
								>
									<option key='default' value=''>--Please select a category--</option>
									{Categories.map(category => (
										<option key={category.id} value={category.id}>{category.name}</option>
									))}
								</RequestTypeField>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.requestType}
										touched={touched.requestType} />
								</div>


								{
									values['requestType'] !== '' ?
										<div>
											<label name="subRequestType" htmlFor="subRequestType"
												className={
													errors.subRequestType && touched.subRequestType ? "input-feedback" : "text-label"}
											>
												Request Sub-Category
											</label>
											<Field component="select"
												name="subRequestType"
												className={`text-select ${errors.subRequestType && touched.subRequestType ? "error" : ""}`}
											>
												<option key='default' value=''>--Please Select a sub-category--</option>;
												{subCategories.map(category => (
													<option key={category.id} value={category.id}>{category.name}</option>
												))}
											</Field>
											<div className="input-feedback">
												<ErrorMsg
													errormessage={errors.subRequestType}
													touched={touched.subRequestType} />
											</div>
										</div>
										: null
								}

								<button type="submit" disabled={isSubmitting}>
									Submit
								</button>
							</Form>

						)
					}
				}
			</Formik>
		</FormContainer>

	);


}

export default ServiceRequestForm;
