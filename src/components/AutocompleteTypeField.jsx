
import React from "react";
import Autocomplete from 'react-autocomplete';
import _ from 'lodash';
const AutoCompletTypeField = props => {
	const { items, name, formikProps, onChange, onSelect, value } = props;

	const handleChange = changeEvent => {
		const { value } = changeEvent.target;
		formikProps.formik.setFieldValue('location', value);
		onChange(changeEvent);
	
	};
	const handleSelect = val => {
		formikProps.formik.setFieldValue('location', val);
		onSelect(val);
	};
	return (

		<Autocomplete
			name="location"
			getItemValue={item => item.label}
			id="location"
			items={items}
			renderItem={(item, isHighlighted) => (
				<div key={_.uniqueId()}
					id="location"
					style={{ background: isHighlighted ? "lightgray" : "white" }}
				>
					{item.label}
					
				</div>
			)}
			value={value}
			onChange={handleChange}
			onSelect={handleSelect}

			className={`text-input ${formikProps.formik.errors.location && formikProps.formik.touched.location ? "error" : ""}`}
		>
			{props.children}
		</Autocomplete>
	);
};

export default AutoCompletTypeField;