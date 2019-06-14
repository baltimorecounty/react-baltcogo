import React from "react";
import { Field } from "formik";

const RequestTypeField = props => {
	console.log('inside RequestTypeField');
	const { component, name, formikProps, onChange, className } = props;
	const handleChange = changeEvent => {
	
		const { name, value } = changeEvent.target;
		formikProps.formik.setFieldValue(name, value);
		//formikProps.setFieldValue('subRequestType', '');
		//formikProps.setFieldValue('petType', '');
	
		//formikProps.formik.setFieldValue('sexType', '');
		//formikProps.formik.setFieldValue('sexTypeID', '');
	//	formikProps.formik.setFieldValue('animalColorType', '');
	//	formikProps.formik.setFieldValue('animalColorTypeID', '');
	//	formikProps.formik.setFieldValue('animalBreedType', '');
	//	formikProps.formik.setFieldValue('otherAnimalTypes', '');
		onChange(changeEvent);

	
    //"otherAnimalTypes": "chicken",
    //"otherAnimalTypesID": 1010861,
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