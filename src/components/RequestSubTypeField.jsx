import React from "react";
import { Field } from "formik";

const RequestSubTypeField = props => {
	//console.log('---RequestSubTypeField---');
	const { component, name, formikProps,onChange,  className ,value} = props;
	const handleChange = changeEvent => {
		//console.log('---RequestSubTypeField---handleChange');
		const { name, value } = changeEvent.target;
		formikProps.formik.setFieldValue(name, value);
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
			value={value}
		>
			{props.children}
		</Field>
	);
};

export default RequestSubTypeField;