import React from "react";

import RequestTypeField from "./RequestTypeField";
import ErrorMsg from "./ErrorMessage";
const RequestCategory = ({  requestType,errorsRequestType, touchedRequestType, pageFieldName, handleServiceRequestChange, rest, Categories }) => {

	return (
		<React.Fragment>
			<div className={
				errorsRequestType && touchedRequestType ? "cs-form-control error" : "cs-form-control"}>
				<label htmlFor="requestType">{pageFieldName.map(name => name.CategoryLabel)}</label>
				<RequestTypeField
					component="select"
					name="requestType"
					formikProps={rest}
					onChange={handleServiceRequestChange}
					value={requestType}
				>
					<option key='default' value=''>--Please select a category--</option>
					{Categories.map(category => (
						<option key={category.id} value={category.name}>{category.name}</option>
					))}
				</RequestTypeField>
				<p role='alert' className="error-message">
					<ErrorMsg
						errormessage={errorsRequestType}
						touched={touchedRequestType} />
				</p>
			</div>


		</React.Fragment>
	);
};

export default RequestCategory;
