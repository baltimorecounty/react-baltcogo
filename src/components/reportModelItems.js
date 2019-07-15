export const returnModel = (props, streetAddress) => {
	const { Longitude, Latitude, ContactID, requestTypeID, requestType,
		subRequestTypeID, subRequestType, petTypeID, petType, sexTypeID,
		sexType, animalColorTypeID, animalColorType, otherAnimalTypesID,
		otherAnimalTypes, requestTypeDescription, requestTypeDescriptionID,
		requestTypeAddressID, requestTypeCityID, requestTypeZipID, subRequestTypeDescription,
		subRequestTypeDescriptionID, subRequestTypeAddress, subRequestTypeAddressID,
		subRequestTypeCity, subRequestTypeCityID, subRequestTypeZip,
		subRequestTypeZipID } = props;
        
	const reportItems = [
		{ Id: requestTypeID, Value: requestType },
		{ Id: subRequestTypeID, Value: subRequestType },
		{ Id: petTypeID, Value: petType },
		{ Id: sexTypeID, Value: sexType },
		{ Id: animalColorTypeID, Value: animalColorType },
		{ Id: otherAnimalTypesID, Value: otherAnimalTypes },
		{ Id: requestTypeDescriptionID, Value: requestTypeDescription },
		{ Id: requestTypeAddressID, requestTypeAddressID },
		{ Id: requestTypeCityID, Value: requestTypeCityID },
		{ Id: requestTypeZipID, requestTypeZipID },
		{ Id: requestTypeAddressID, Value: localProps.streetAddress },
		{ Id: requestTypeCityID, Value: localProps.city },
		{ Id: requestTypeZipID, Value: localProps.zipCode },
		{ Id: subRequestTypeDescriptionID, Value: subRequestTypeDescription },
		{ Id: subRequestTypeAddressID, Value: subRequestTypeAddress },
		{ Id: subRequestTypeCityID, Value: subRequestTypeCity },
		{ Id: subRequestTypeZipID, Value: subRequestTypeZip }
	].filter(item => !!item.Id);

	var Selections = {
		AppVersion: "308",
		Location: {
			X: Longitude,
			Y: Latitude
		},
		AuthorId: ContactID,
		IsPrivate: false,
		Locale: "en",
		ReportItems: reportItems,
		SuppressWorkflows: false
	};

};


export default returnModel;