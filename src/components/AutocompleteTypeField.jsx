import React from 'react';
import Autocomplete from 'react-autocomplete';
import '../css/Autocomplete.css';

const AutoCompleteTypeField = (props) => {
	const { name, items, formik, onChange, onSelect, value } = props;

	const handleChange = (changeEvent) => {
		const { value } = changeEvent.target;
		formik.setFieldValue(name, value);
		formik.setFieldTouched(name, true);
		onChange(changeEvent);
	};

	const handleSelect = (val) => {
		formik.setFieldValue(name, val);
		onSelect(val);
	};

	return (
		<Autocomplete
			name="location"
			getItemValue={(item) => item.label}
			id="location-autocomplete-input"
			items={items}
			placeholder="123 Amazing St"
			renderInput={(props) => <input className="autocomplete-input" {...props} />}
			renderItem={(item, isHighlighted) => (
				<div key={item.id} className={`autocomplete-option ${isHighlighted ? "is-highlighted" : ""}`}>
					{item.label}
				</div>
			)}
			renderMenu={(items, value, style) => <div className="autocomplete-results" style={{ ...style }} children={items} />}
			value={value}
			onChange={handleChange}
			onSelect={handleSelect}
			className={`text-input ${formik.errors.location && formik.touched.location
				? 'error'
				: ''}`}
			wrapperStyle={{}}
		>
			{props.children}
		</Autocomplete>
	);
};

export default AutoCompleteTypeField;
