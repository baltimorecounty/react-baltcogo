import React from 'react'

const tabList = [
	{description: 'Choose a Report Type', key: 0},
	{description: 'Enter a Location', key: 1},
	{description: 'Proivde Your Contact Information', key: 2},
	{description: '', key: 3},

];

const selectTab = props => {
	var classStyle = 'highlight'
	
	if (this.constructor.name === 'ProviderDetails'){
		classStyle = 'highlight';
	}
	else{
		classStyle = '';
	}

	return classStyle

};

const FormContainer = props => {
	return (
		<div className="bc-citysourced-reporter">
			<ol className="bc-citysourced-reporter-steps">
				{ tabList.map((tab,index) => {
					return(
						<li 
							key={index}
							className = { selectTab }>
							{tab.description}
						</li>
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