import React from 'react'
import _ from 'lodash';

const tabList = [
	{description: 'Choose a Report Type', key: 'ServiceRequestForm', value: 0},
	{description: 'Enter a Location', key: 'ProviderDetails', value: 1},
	{description: 'Proivde Your Contact Information', key: 'AdditionalInformation', value: 2},
	{description: '', key: 'Blank', value: 3},

];

const selectTab = (currentTab)  => {
	const selectTabValue = _.filter(tabList, { key: currentTab })
	return selectTabValue;
};

const FormContainer = props => {
	const selectTabValue = selectTab(props.currentTab);

	return (
		<div className="bc-citysourced-reporter">
			<ol className="bc-citysourced-reporter-steps">
				{ tabList.map((tab,index) => {
					return(
						<li 
							key={index}
							className = { (tab.value <= ((selectTabValue[0].value === 2) ?  3 : selectTabValue[0].value) ?  'highlight' : '') }>
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