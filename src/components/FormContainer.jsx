import React from 'react'
import _ from 'lodash';

const selectTab = (currentTab, tabList)  => {
	const selectTabValue = _.filter(tabList, { key: currentTab })
	return selectTabValue;
};

const FormContainer = props => {
	
	const tabList = [
		{description: props.tabNames.map(name => name.Tab1), id: 0,  key: 'ServiceRequestForm', shouldDisableForm: false, isAccela: true},
		{description: props.tabNames.map(name => name.Tab2), id: 1, key: 'ProvideDetails', shouldDisableForm: props.shouldDisableForm, isAccela: true},
		{description: props.tabNames.map(name => name.Tab3), id: 2, key: 'AdditionalInformation', shouldDisableForm: props.shouldDisableForm, isAccela: props.isAccela},
		{description: props.tabNames.map(name => name.Tab4), id: 3, key: 'Blank', shouldDisableForm: false, isAccela: true},
	].filter(item => item.shouldDisableForm === false)
		.filter(item => item.isAccela);

	const selectTabValue = selectTab(props.currentTab, tabList);

	const selectClassName = (tab) =>{
		if (props.shouldDisableForm){
			return 'highlight';
		}
		else if (!props.isAccela){
			return (tab.id <= ((selectTabValue[0].id === 1) ?  3 : selectTabValue[0].id) ?  'highlight' : '');
		}
		else{
			return (tab.id <= ((selectTabValue[0].id === 2) ?  3 : selectTabValue[0].id) ?  'highlight' : '');
		}
	}

	return (
		<div className="bc-citysourced-reporter">
			<ol className="bc-citysourced-reporter-steps">
				{ tabList.map((tab,id) => {
					return (
						<li
							key={id}
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