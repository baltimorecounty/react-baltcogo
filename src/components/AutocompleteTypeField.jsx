
import React from "react";
import Autocomplete from 'react-autocomplete';
import _ from 'lodash';
const AutoCompletTypeField = props => {
	const { items, formikProps, onChange, onSelect, value, placeholder } = props;

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
			name="address"
			getItemValue={item => item.label}
			id="address"
			items={items}
			placeholder="123 Amazing St"
			renderItem={(item, isHighlighted) => (
				<div key={_.uniqueId()}
					id="address"
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