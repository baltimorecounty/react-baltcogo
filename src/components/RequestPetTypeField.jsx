import React from "react";
import { Field } from "formik";

const RequestTypeField = props => {
	console.log('inside RequestTypeField');
	const { component, name, formikProps, onChange, className } = props;
	const handleChange = changeEvent => {
<<<<<<< HEAD
		console.log('==========handleChange=====inside====RequestTypeField===');
=======
		console.log('==========handleChange============');
>>>>>>> addtabs
		const { name, value } = changeEvent.target;
		formikProps.formik.setFieldValue(name, value);
		//formikProps.setFieldValue('subRequestType', '');
		//formikProps.setFieldValue('petType', '');
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