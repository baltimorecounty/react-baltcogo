import React from 'react'

const tabList = [
	{description: 'Choose a Report Type'},
	{description: 'Enter a Location'},
	{description: 'Proivde Your Contact Information'},

];

const FormContainer = props => {
	return (
		<div class="bc-citysourced-reporter">
			<ol class="bc-citysourced-reporter-steps">
				{ tabList.map(tab => {
					return(
						<li key={tab.key}>{tab.description}</li>
					)
				})}	
			</ol>
			<fieldset className="container Container-bg">
				<legend>{props.title}</legend>{props.children}
			</fieldset>
		</div>
	)
};

export default FormContainer