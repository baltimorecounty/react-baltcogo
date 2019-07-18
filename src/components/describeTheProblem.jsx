import React from "react";
import { Field } from "formik";

import ErrorMsg from "./ErrorMessage";
const DescribeTheProblem = ({ errorsDescribeTheProblem, touchedDescribeTheProblem, pageFieldName }) => {

	return (
		<React.Fragment>
			<div className={
				errorsDescribeTheProblem && touchedDescribeTheProblem ? "cs-form-control address-search error" : "cs-form-control address-search"}>
				<label htmlFor="describeTheProblem"

				>{pageFieldName}</label>
				<Field
					component="textarea"
					placeholder="Maximum 2,000 characters."
					name="describeTheProblem"
					className={`text-input ${errorsDescribeTheProblem && touchedDescribeTheProblem ? "error" : ""}`}
				/>

				<p role='alert' className="error-message">
					<ErrorMsg
						errormessage={errorsDescribeTheProblem}
						touched={touchedDescribeTheProblem} />
				</p>
			</div>


		</React.Fragment>
	);
};

export default DescribeTheProblem;