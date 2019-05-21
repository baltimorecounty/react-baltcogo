import React from 'react'


const FormContainer = props => {
	return (
		<div className="container Container-bg">
			<h3>{props.title}</h3>{props.children}
		</div>
	)
};

export default FormContainer