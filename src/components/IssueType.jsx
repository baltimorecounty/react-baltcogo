import React from "react";
import { GetErrorDetails } from '../utilities/FormikHelpers';
import Alert from './Alert';
import AutoCompleteTypeField from './AutocompleteTypeField';

const IssueType = ({ name, formik = {}, items, handleAddressChange, handleAddressSelect,  pageFieldName }) => {
	const { values = {} } = formik;
	const {
		isTouched,
		hasError,
		message: errorMessage
	} = GetErrorDetails(name, formik);

	return (
		<React.Fragment>
			<div>
				<label>Issue type</label>
				<div>
					<p className="smallest">{values.requestType} > {values.subRequestType}</p>
				</div>
			</div>
			<div className="address-search-wrapper">
				<label htmlFor="location"
					className="address">{pageFieldName}
				</label>
				<div className="address-input-wrapper">
					<AutoCompleteTypeField
						items={items}
						formik={formik}
						name={name}
						value={values.location}
						onChange={handleAddressChange}
						onSelect={handleAddressSelect}
					/>
					<i className="fa fa-search address-search-icon" aria-hidden="true"></i>
				</div>
			</div>
			{isTouched && hasError && <Alert className="error-message">
				{errorMessage}
			</Alert>}

		</React.Fragment>
	);
};

export default IssueType;
