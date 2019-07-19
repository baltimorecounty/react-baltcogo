import React from "react";
import Alert from './Alert';
import { Field } from "formik";

const DescribeTheProblem = ({ name, formik, pageFieldName }) => {
	const { errors = {}, status = {}, values = {} } = formik;
	const error = errors[name];
	const statusMessage = status[name];
	const errorMessage = error || statusMessage;
	return (
		<React.Fragment>
			<div className={
				errorMessage ? "cs-form-control address-search error" : "cs-form-control address-search"}>
				<label htmlFor={name}

				>{pageFieldName}</label>
				<Field
					component="textarea"
					placeholder="Maximum 2,000 characters."
					name={name}
					className={`text-input ${errorMessage ? "error" : ""}`}
					value={values[name]}
				/>
				{errorMessage && <Alert>
					{errorMessage}
				</Alert>}
			</div>


		</React.Fragment>
	);
};

export default DescribeTheProblem;