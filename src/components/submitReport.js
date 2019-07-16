import { CreateReport, VerifyAddress } from './authService';
import { GetErrorsDetails } from "../utilities/CustomErrorHandling";

export const returnModel = (props, streetAddress, city, zipCode) => {
	const { Longitude, Latitude, ContactID, requestTypeID, requestType,
		subRequestTypeID, subRequestType, petTypeID, petType, sexTypeID,
		sexType, animalColorTypeID, animalColorType, otherAnimalTypesID,
		otherAnimalTypes, requestTypeDescription, requestTypeDescriptionID,
		requestTypeAddressID, requestTypeCityID, requestTypeZipID, subRequestTypeDescription,
		subRequestTypeDescriptionID, subRequestTypeAddress, subRequestTypeAddressID,
		subRequestTypeCity, subRequestTypeCityID, subRequestTypeZip,
		subRequestTypeZipID } = props.formik.values;
        
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
		{ Id: requestTypeAddressID, Value: streetAddress },
		{ Id: requestTypeCityID, Value: city },
		{ Id: requestTypeZipID, Value: zipCode },
		{ Id: subRequestTypeDescriptionID, Value: subRequestTypeDescription },
		{ Id: subRequestTypeAddressID, Value: subRequestTypeAddress },
		{ Id: subRequestTypeCityID, Value: subRequestTypeCity },
		{ Id: subRequestTypeZipID, Value: subRequestTypeZip }
	].filter(item => !!item.Id);

	var itemsToSubmit = {
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
    
	return itemsToSubmit;
};


export const submitReport = async (actions, props ) => {

	const streetAddress = props.formik.values.streetAddress;
	const city = props.formik.values.city;
	const zipCode = props.formik.values.zipCode;
	const itemsToSubmit = returnModel(props, streetAddress, city, zipCode)
	
	try {
		var fullAddress = streetAddress + ' ' + city + ',MD ' + zipCode;
		if(streetAddress){
			const addressResponse = await VerifyAddress(fullAddress);
			if (addressResponse.data.HasErrors) {
				const errorsReturned = GetErrorsDetails(addressResponse);
				actions.setStatus({
					success1: errorsReturned,
					css: 'address'
				})
				throw new Error(errorsReturned);}}
		else {
			try {
				const response = await CreateReport(itemsToSubmit);
				if (response.data.ErrorsCount > 0) {
					const errorsReturned = GetErrorsDetails(response);
					console.log(errorsReturned);
					props.Field.ErrorMsg = errorsReturned;
				}
				props.history.push('/SubmitResponsePage');
			}
			catch (ex) {
				if (ex.response && ex.response.status === 400) {
					console.log(ex.message);}
			}
		}
	}
	catch (ex) {
		console.log(ex.message);
	}
}


export default submitReport;