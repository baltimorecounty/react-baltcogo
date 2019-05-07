import React, { Component } from 'react';
import { Formik } from "formik";


const ContactForm = ({
	handleSubmit,
	handleChange,
	handleBlur,
	values,
	errors,
}) => (
	<form onSubmit={handleSubmit}>
		<input
			type="text"
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.name}
			name="name"
		/>
		{errors.name && <div>{errors.name}</div>}
		<button type="submit">Submit</button>
	</form>
);
//export default ContactForm;