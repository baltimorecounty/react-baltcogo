
import React from "react";
import { Field } from "formik";
const RequestTypeField = props => {
	const { component, name, formikProps, onChange, className, value } = props;
	const handleChange = changeEvent => {

		const { name, value } = changeEvent.target;
		formikProps.formik.setFieldValue(name, value);
		formikProps.formik.setFieldValue('subRequestType', '');
		formikProps.formik.setFieldValue('subRequestTypeID', '');
		formikProps.formik.setFieldValue('petType', '');
		formikProps.formik.setFieldValue('petTypeID', '');
		formikProps.formik.setFieldValue('otherAnimalTypes', '');
		formikProps.formik.setFieldValue('otherAnimalTypesID', '')
		formikProps.formik.setFieldValue('sexType', '');
		formikProps.formik.setFieldValue('sexTypeID', '');
		formikProps.formik.setFieldValue('animalColorType', '');
		formikProps.formik.setFieldValue('animalColorTypeID', '');
		formikProps.formik.setFieldValue('animalBreed', '');
		formikProps.formik.setFieldValue('animalBreedID', '');
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

export default RequestTypeField;