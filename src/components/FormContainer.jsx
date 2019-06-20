import React from 'react'

const tabList = [
	{description: 'Choose a Report Type', key: 0},
	{description: 'Enter a Location', key: 1},
	{description: 'Proivde Your Contact Information', key: 2},
	{description: '', key: 3},

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