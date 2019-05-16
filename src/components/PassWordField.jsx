import React, { useState } from "react";
import { Field } from "formik";

const PassWordTypeField = props => {
	const { component, name, formikProps, onChange } = props;
	const [fieldType, setFieldType] = useState('password');
	const handlePasswordToggleChange = () => {
		setFieldType(fieldType === 'password' ? 'text' : 'password');
	};
	return (
		<Field Component={component} name={name} onChange={handlePasswordToggleChange}>
			{props.children}
		</Field>

	)
};
export default PassWordTypeField;