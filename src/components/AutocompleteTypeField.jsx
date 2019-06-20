
import React from "react";
import Autocomplete from 'react-autocomplete';
import _ from 'lodash';
const AutoCompletTypeField = props => {
	const { items, name, formikProps, onChange, onSelect, value } = props;

	const handleChange = changeEvent => {
		console.log('--inside handleChange---')
		const { value } = changeEvent.target;
		formikProps.formik.setFieldValue('location', value);
		console.log('Name:' + name + -'Value:' + value);
		onChange(changeEvent);
	
	};
	const handleSelect = val => {
		console.log('--inside handleSelect---')
	
		formikProps.formik.setFieldValue('location', val);
		console.log('Name:' + name + -'Value:' + val);

		onSelect(handleSelect);
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