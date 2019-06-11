import React from "react";
import { Field } from "formik";

const RequestTypeField = props => {
	console.log('inside RequestTypeField');
	const { component, name, formikProps, onChange, className } = props;
	const handleChange = changeEvent => {
		console.log('==========handleChange============');
		const { name, value } = changeEvent.target;
		formikProps.setFieldValue(name, value);
		//formikProps.setFieldValue('subRequestType', '');
		//formikProps.setFieldValue('petType', '');
		formikProps.setFieldValue('otherAnimalTypes', '');
		formikProps.setFieldValue('sexType', '');
		formikProps.setFieldValue('animalColorType', '');
		formikProps.setFieldValue('animalBreed', '');
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