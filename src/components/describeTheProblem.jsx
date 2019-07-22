import React from "react";
import Alert from './Alert';
import { GetErrorDetails } from '../utilities/FormikHelpers';
import { Field } from "formik";

const DescribeTheProblem = ({ name, formik, pageFieldName }) => {
	const { values = {} } = formik;
	const {
		isTouched,
		hasError,
		message: errorMessage
	} = GetErrorDetails(name, formik);

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
					maxLength="2000"
				/>
				{isTouched && hasError && <Alert>
					{errorMessage}
				</Alert>}
			</div>
		</React.Fragment>
	);
};

export default DescribeTheProblem;