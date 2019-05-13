import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Categories from "./services/categories.json";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';

const getSubCategories = (categories, categoryId) => {
	var category = categories.find(category => category.id === categoryId);
	return category ? category.types : [];
};

const ServiceRequestForm = props => {

	const [categories] = useState(Categories);
	const [subCategories, setSubCategories] = useState([]);

	const handleServiceRequestChange = (changeEvent, setFieldValue) => {
		const { value } = changeEvent.currentTarget;
		const subCategories = getSubCategories(categories, parseInt(value));
		setFieldValue(changeEvent.currentTarget.name, changeEvent.currentTarget.value)
		setFieldValue('subRequestType', '')
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
						const { values, isSubmitting, errors, touched } = props;

						return (

							<Form >
								<label htmlFor="requestType"
									className={
										errors.requestType && touched.requestType ? "input-feedback" : "text-label"}

								>Request Category</label>

								<Field
									component="select"
									name="requestType"
									onChange={e => { handleServiceRequestChange(e, props.setFieldValue) }}
									className={errors.requestType && touched.requestType ? "text-select error" : "text-select"}
								>
									<option key='default' value=''>--Please select a category--</option>
									{Categories.map(category => (
										<option key={category.id} value={category.id}>{category.name}</option>
									))}
								</Field>

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
												className={
													errors.subRequestType && touched.subRequestType ? "text-select error" : "text-select"}

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

								<h6>Why do I need this </h6>
								{/* 				  TODO: This feature will be enable in future
                <a href="/test">{link(more info to follow )}</a>  */}
							</Form>

						)
					}
				}
			</Formik>
		</FormContainer>

	);


}

export default ServiceRequestForm;
