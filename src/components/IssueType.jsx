import React from "react";

import { ErrorMessage } from "formik";
import AutoCompletTypeField from './AutocompleteTypeField';
const IssueType = ({ rest, items, handleAddressChange, handleAddressSelect,  pageFieldName }) => {

	return (
		<React.Fragment>

			<div>
				<label>Issue type</label>
				<div>
					<p className="smallest">{rest.formik.values.requestType} > {rest.formik.values.subRequestType}</p>
				</div>
			</div>
			<div className="address-search-wrapper">
				<label htmlFor="location"
					className="address">{pageFieldName.map(name => name.AddressHeaderLabel)}
				</label>
				<div className="address-input-wrapper">
					<AutoCompletTypeField
						items={items}
						//name="location"
						formikProps={rest}
						value={rest.formik.values.location}
						onChange={handleAddressChange}
						onSelect={handleAddressSelect}
					/>
					<i className="fa fa-search address-search-icon" aria-hidden="true"></i>
				</div>
			</div>
			<ErrorMessage name='msg' className='input-feedback' component='div' />
			<div className={rest.formik.values.ShowErrorMsg === 1 ? "cs-form-control error" : "cs-form-control"}>
				{rest.formik.values.ShowErrorMsg === 1 ? rest.formik.errors.location : ''}
			</div>

		</React.Fragment>
	);
};

export default IssueType;
