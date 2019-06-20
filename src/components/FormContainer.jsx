import React from 'react'


const FormContainer = props => {
	return (
		<fieldset className="container Container-bg">
			<legend>{props.title}</legend>{props.children}
		</fieldset>
	)
};

export default FormContainer