
import React from "react";
import { Field } from "formik";
const RequestTypeField = props => {
	const { component, name, formikProps, onChange, className, value, } = props;
	const handleChange = changeEvent => {
		const { name, value } = changeEvent.target;
		const localProps = formikProps.formik;

		localProps.setFieldValue(name, value);
		localProps.setFieldValue('requestTypeDescriptionID', '');
		localProps.setFieldValue('requestTypeAddressID', '');
		localProps.setFieldValue('requestTypeCityID', '');
		localProps.setFieldValue('requestTypeZipID', '');

		localProps.setFieldValue('subRequestTypeDescriptionID', '');
		localProps.setFieldValue('subRequestTypeAddressID', '');
		localProps.setFieldValue('subRequestTypeCityID', '');
		localProps.setFieldValue('subRequestTypeZipID', '');

		localProps.setFieldValue('subRequestType', '');
		localProps.setFieldValue('subRequestTypeID', '');
		localProps.setFieldValue('petType', '');
		localProps.setFieldValue('petTypeID', '');
		localProps.setFieldValue('otherAnimalTypes', '');
		localProps.setFieldValue('otherAnimalTypesID', '')
		localProps.setFieldValue('sexType', '');
		localProps.setFieldValue('sexTypeID', '');
		localProps.setFieldValue('animalColorType', '');
		localProps.setFieldValue('animalColorTypeID', '');
		localProps.setFieldValue('animalBreed', '');
		localProps.setFieldValue('animalBreedID', '');
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