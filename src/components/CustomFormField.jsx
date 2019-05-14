import React from "react";
import { Field } from "formik";

const CustomFormField = props => {
	const { component, name,  formikProps, onChange } = props;
	const handleChange = changeEvent => {
		const { name, value } = changeEvent.target;
		formikProps.setFieldValue(name, value);
		formikProps.setFieldValue('subRequestType', '');
		onChange(changeEvent);
	};
	return (
		<Field component={component} name={name}  onChange={handleChange}>
			{props.children}
		</Field>
	);
};

export default CustomFormField;