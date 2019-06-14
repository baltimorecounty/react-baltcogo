
import React from "react";
import { Field } from "formik";
const RequestTypeField = props => {
	const { component, name, formikProps, onChange, className } = props;
	const handleChange = changeEvent => {
	

		const { name, value } = changeEvent.target;
		formikProps.formik.setFieldValue(name, value);

		formikProps.formik.setFieldValue('subRequestType', '');
		formikProps.formik.setFieldValue('petType', '');
		formikProps.formik.setFieldValue('otherAnimalTypes', '');
		formikProps.formik.setFieldValue('sexType', '');
		formikProps.formik.setFieldValue('animalColorType', '');
		formikProps.formik.setFieldValue('animalBreed', '');
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