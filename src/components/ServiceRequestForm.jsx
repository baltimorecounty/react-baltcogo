import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Categories from "./services/categories.json";
class ServiceRequestForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			values: props.initialValues,
			Categories: Categories,
			subCateories: [],
			isSubCategoryHidden: false,
		};

	}

	getSubCategories = (categories, categoryId) => {
		var cats = categories.find(category => category.id === categoryId);
		return cats ? cats.types : [];
	};

	handleServiceRequestChange = changeEvent => {

		const { value } = changeEvent.currentTarget;

		this.setState({ isSubCategoryHidden: true, subCateories: this.getSubCategories(this.state.Categories, parseInt(value)) });

	};
	render() {
		const defaultOption = <option key='default' value='Please Select'>Please Select</option>;
		return (
			<div>
				<h2>How Can We Help?</h2>
				<Formik
					initialValues={{ subRequestType: "" }}
					validate={values => {
						let errors = {};
						if (!values.subRequestType) {
							errors.subRequestType = "Required";
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
					}}
				>
					{({ isSubmitting }) => (

						<Form>
							<label htmlFor="requestType">Request Category</label>
							<br />
							<Field
								component="select"
								id="requestType"
								onChange={this.handleServiceRequestChange}
							>
								<option key='default' value='Please Select'>--Please select a category--</option>;
								{this.state.Categories.map(category => (
									<option value={category.id}>{category.name}</option>
								))}
							</Field>


							<br />
							{this.state.isSubCategoryHidden &&
								<label name="subRequestType" htmlFor="subRequestType">
									Request Sub-Category
								</label>}
							<br />

							{this.state.isSubCategoryHidden &&
								<Field component="select" name="subRequestType" id="subRequestType">
									<option key='default' value='Please Select'>--Please Select a sub-category--</option>;
									{this.state.subCateories.map(category => (
										<option value={category.id}>{category.name}</option>
									))}
								</Field>}
							<br />
							<button

								className="btn btn-warning botton"
								onClick={this.continue}>
								Sign In
    				</button>
							<button
								className="btn btn-warning botton"
								onClick={this.continue}>
								register
    				</button>
							<button

								className="btn btn-warning botton"
								disabled={isSubmitting}
								onClick={this.continue}>
								Next
    				</button>


							{/* 			<button type="submit" disabled={isSubmitting}>
								Submit
							</button> */}
						</Form>
					)}
				</Formik>
			</div>
		);
	}
};
export default ServiceRequestForm;
