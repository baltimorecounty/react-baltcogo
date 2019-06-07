
import React from "react";
import { Field } from "formik";
const RequestTypeField = props => {
	const { component, name, formikProps, onChange, className } = props;
	const handleChange = changeEvent => {
		const { name, value } = changeEvent.target;
		formikProps.setFieldValue(name, value);
		formikProps.setFieldValue('subRequestType', '');
		onChange(changeEvent);
	};
	return (
		<Field component={component}
			name={name}
			onChange={handleChange}
			className={className}
		>
			{props.children}
		</Field>
	);
};

export default RequestTypeField;