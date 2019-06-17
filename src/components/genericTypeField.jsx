
import React from "react";
import { Field } from "formik";


const GenericTypeField = props => {



	const { component, name, formikProps, onChange, className } = props;

	const handleChange = changeEvent => {

		const { name, value } = changeEvent.target;
		formikProps.formik.setFieldValue(name, value);
		/* 	formikProps.formik.setFieldValue('sexTypeID', '');
            formikProps.formik.setFieldValue('animalColorType', '');
            formikProps.formik.setFieldValue('animalColorTypeID', '');
            formikProps.formik.setFieldValue('animalBreedType', '');
            formikProps.formik.setFieldValue('animalBreedID', '');
    
            formikProps.formik.setFieldValue('otherAnimalTypes', '');
            formikProps.formik.setFieldValue('otherAnimalTypesID', '') */
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
export default GenericTypeField;

