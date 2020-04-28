import React from "react";
import RequestSubTypeField from "./RequestSubTypeField";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const SubCategory = ({ requestType, subRequestType, errorsSubRequestType, touchedSubRequestType, pageFieldName, handleServiceSubRequestChange, rest, subCategories }) => {
	const handleChange = changeEvent => {
	
		var index = changeEvent.nativeEvent.target.selectedIndex;
		var selectedText = changeEvent.nativeEvent.target[index].text;
		// const { name, value } = changeEvent.target;

		// setEvent({ target: { name, value } });
		// setIsValue(true);
		// handleServiceRequestChange(changeEvent);
		// const { name, value } = changeEvent.target;
		// console.log(changeEvent.target);
		const localProps = rest.formik;
	//	formikProps.formik.setFieldValue(name, value);
		localProps.setFieldValue("subRequestType", selectedText);
		localProps.setFieldValue('subRequestTypeDescriptionID', '');
		localProps.setFieldValue('subRequestTypeAddressID', '');
		localProps.setFieldValue('subRequestTypeCityID', '');
		localProps.setFieldValue('subRequestTypeZipID', '');


		localProps.setFieldValue('petType', '');
		localProps.setFieldValue('otherAnimalTypes', '');
		localProps.setFieldValue('sexType', '');
		localProps.setFieldValue('animalColorType', '');
		localProps.setFieldValue('animalBreed', '');
    handleServiceSubRequestChange(changeEvent);
	};
	return (
		<React.Fragment>
			{requestType !== '' ?
				<div className={
					errorsSubRequestType && touchedSubRequestType ? "cs-form-control error" : "cs-form-control"}>
					<Select
				id="subRequestType"
				name="subRequestType"
				label={pageFieldName}
				options={subCategories}
				//onChange={handleServiceRequestChange}
				onChange={handleChange}
				{...rest}
			/>
        
      {/*   
        	<label name="subRequestType" htmlFor="subRequestType">{pageFieldName}</label>
					<RequestSubTypeField
						component="select"
						name="subRequestType"
						formikProps={rest}
						onChange={handleServiceSubRequestChange}
						value={subRequestType}
					>
						<option key='default' value=''>-- Please select a sub-category --</option>
						{subCategories.map(category => (
							<option key={category.id} value={category.name}>{category.name}</option>
						))}

					</RequestSubTypeField> */}

					<p role='alert' className="error-message">
						<ErrorMsg
							errormessage={errorsSubRequestType}
							touched={touchedSubRequestType} />
					</p>
				</div>
				: null
			}

		</React.Fragment>
	);
};

export default SubCategory;
