import React from 'react'
import _ from 'lodash';

const selectTab = (currentTab, tabList)  => {
	const selectTabValue = _.filter(tabList, { key: currentTab })
	return selectTabValue;
};

const FormContainer = props => {

	const tabList = [
		{description: 'Choose a Report Type', key: 'ServiceRequestForm', value: 0, shouldDisableForm: false},
		{description: 'Enter a Location', key: 'ProvideDetails', value: 1, shouldDisableForm: props.shouldDisableForm},
		{description: 'Proivde Your Contact Information', key: 'AdditionalInformation', value: 2, shouldDisableForm: props.shouldDisableForm},
		{description: '', key: 'Blank', value: 3, shouldDisableForm: false},
	].filter(item => item.shouldDisableForm === false);

	const selectClassName = (tab) =>{
		if (props.shouldDisableForm === true){
			return 'highlight';
		}
		else{
			return (tab.value <= ((selectTabValue[0].value === 2) ?  3 : selectTabValue[0].value) ?  'highlight' : '');
		}
	}

	const selectTabValue = selectTab(props.currentTab, tabList);

	return (
		<div className="bc-citysourced-reporter">
			<ol className="bc-citysourced-reporter-steps">
				{ tabList.map((tab,index) => {
					return (
						<li 
							key={index}
							className = { selectClassName(tab) }>
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