import React, { useEffect, useState } from "react";

import RequestTypeField from "./RequestTypeField";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";

const RequestCategory = ({
	requestType,
	errorsRequestType,
	touchedRequestType,
	pageFieldName,
	handleServiceRequestChange,
	rest,
	Categories
}) => {

	// const [event, setEvent] = useState({
	// 	target: { name: "", value: "0"}
	// });
	// const [isValue, setIsValue] = useState(false);
	// useEffect(() => {

	// 	if (isValue === true) {
	// 		console.log("-inside useEffect--:");
	// 		// console.log(event);
	// 		console.log("event.target.name:" + event.target.name);
	// 		console.log("event.target.value:" + event.target.value);
	// 		const localProps = rest.formik;
	// 		const { name, value } = event.target;
		
	// 	}

	// 	//	 localProps.setFieldValue(event.target.name, event.target.value);
	// }, [event]);

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
	
		localProps.setFieldValue("requestType", selectedText);
		localProps.setFieldValue("requestTypeDescriptionID", "");
		localProps.setFieldValue("requestTypeAddressID", "");
		localProps.setFieldValue("requestTypeCityID", "");
		localProps.setFieldValue("requestTypeZipID", "");

		localProps.setFieldValue("subRequestTypeDescriptionID", "");
		localProps.setFieldValue("subRequestTypeAddressID", "");
		localProps.setFieldValue("subRequestTypeCityID", "");
		localProps.setFieldValue("subRequestTypeZipID", "");

		localProps.setFieldValue("subRequestType", "");
		localProps.setFieldValue("subRequestTypeID", "");
		localProps.setFieldValue("petType", "");
		localProps.setFieldValue("petTypeID", "");
		localProps.setFieldValue("otherAnimalTypes", "");
		localProps.setFieldValue("otherAnimalTypesID", "");
		localProps.setFieldValue("sexType", "");
		localProps.setFieldValue("sexTypeID", "");
		localProps.setFieldValue("animalColorType", "");
		localProps.setFieldValue("animalColorTypeID", "");
		localProps.setFieldValue("animalBreed", "");
		localProps.setFieldValue("animalBreedID", "");
		 	handleServiceRequestChange(changeEvent);
	};
	return (
		<React.Fragment>
			<Select
				id="requestType"
				name="requestType"
				label={pageFieldName}
				options={Categories}
				//onChange={handleServiceRequestChange}
				onChange={handleChange}
				{...rest}
			/>
			<div
				className={
					errorsRequestType && touchedRequestType
						? "cs-form-control error"
						: "cs-form-control"
				}
			>
				{/*  		<label htmlFor="requestType">{pageFieldName}</label>
				<RequestTypeField
					component="select"
					name="requestType"
					formikProps={rest}
					onChange={handleServiceRequestChange}
					value={requestType}
				>
					<option key="default" value="">
            -- Please select a category --
					</option>
					{Categories.map(category => (
						<option key={category.id} value={category.name}>
							{category.name}
						</option>
					))}
				</RequestTypeField>  */}
				<p role="alert" className="error-message">
					<ErrorMsg
						errormessage={errorsRequestType}
						touched={touchedRequestType}
					/>
				</p>
			</div>
		</React.Fragment>
	);
};

export default RequestCategory;
