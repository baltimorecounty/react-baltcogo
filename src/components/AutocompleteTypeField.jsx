import React from 'react';
import Autocomplete from 'react-autocomplete';

const AutoCompleteTypeField = (props) => {
	const { items, formikProps, onChange, onSelect, value } = props;

	const handleChange = (changeEvent) => {
		const { value } = changeEvent.target;
		formikProps.formik.setFieldValue('location', value);
		onChange(changeEvent);
	};
	const handleSelect = (val) => {
		formikProps.formik.setFieldValue('location', val);
		onSelect(val);
	};

	return (
		<Autocomplete
			name="location"
			getItemValue={(item) => item.label}
			id="location-autocomplete-input"
			items={items}
			renderItem={(item, isHighlighted) => (
				<div key={item.id} className={isHighlighted ? "is-highlighted" : ""}>
					{item.label}
				</div>
			)}
			value={value}
			onChange={handleChange}
			onSelect={handleSelect}
			className={`text-input ${formikProps.formik.errors.location && formikProps.formik.touched.location
				? 'error'
				: ''}`}
		>
			{props.children}
		</Autocomplete>
	);
};

export default AutoCompleteTypeField;
