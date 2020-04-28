import React from "react";
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
	const handleChange = changeEvent => {
		const localProps = rest.formik;
		const target = changeEvent.nativeEvent.target;
		const index = target.selectedIndex;
		const { name } = changeEvent.target;
		const selectedText = target[index].text;

		index > 0
			? localProps.setFieldValue(name, selectedText)
			: localProps.setFieldValue(name, "");
		localProps.setFieldTouched(name, true);
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
			<div
				className={
					errorsRequestType && touchedRequestType
						? "cs-form-control error"
						: "cs-form-control"
				}
			>
				<Select
					id="requestType"
					label={pageFieldName}
					name="requestType"
					options={Categories}
					onChange={handleChange}
					{...rest}
				/>
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
