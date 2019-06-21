import React from "react";
import { Field } from "formik";

const RequestTypeField = props => {
	const { component, name, formikProps, onChange, className } = props;
	const handleChange = changeEvent => {
		const localProps = formikProps.formik;
		const { name, value } = changeEvent.target;
		localProps.setFieldValue(name, value);
		localProps.setFieldValue('sexType', '');
		localProps.setFieldValue('sexTypeID', '');
		localProps.setFieldValue('animalColorType', '');
		localProps.setFieldValue('animalColorTypeID', '');
		localProps.setFieldValue('animalBreedType', '');
		localProps.setFieldValue('animalBreedID', '');

		localProps.setFieldValue('otherAnimalTypes', '');
		localProps.setFieldValue('otherAnimalTypesID', '');
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