import React from "react";
import Alert from './Alert';
import AutoCompleteTypeField from './AutocompleteTypeField';

const IssueType = ({ name, formik = {}, items, handleAddressChange, handleAddressSelect,  pageFieldName }) => {
	const { errors = {}, status = {}, values = {} } = formik;
	const error = errors[name];
	const statusMessage = status[name];
	const errorMessage = error || statusMessage;

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
						value={values.location}
						onChange={handleAddressChange}
						onSelect={handleAddressSelect}
					/>
					<i className="fa fa-search address-search-icon" aria-hidden="true"></i>
				</div>
			</div>
			{errorMessage && <Alert>
				{errorMessage}
			</Alert>}

		</React.Fragment>
	);
};

export default IssueType;
