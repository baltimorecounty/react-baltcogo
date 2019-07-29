import { CreateReport } from '../services/authService';
import { GetResponseErrors, HasResponseErrors } from '../utilities/CitysourcedResponseHelpers';
import { Go, Routes } from '../Routing';


export const returnModel = (props, streetAddress, city, zipCode) => {
	const {
		Longitude,
		Latitude,
		ContactID,
		requestTypeID,
		requestType,
		subRequestTypeID,
		subRequestType,
		petTypeID,
		petType,
		sexTypeID,
		sexType,
		animalColorTypeID,
		animalColorType,
		otherAnimalTypesID,
		otherAnimalTypes,
		describeTheProblem,
		requestTypeDescriptionID,
		requestTypeAddressID,
		requestTypeCityID,
		requestTypeZipID,
		subRequestTypeDescriptionID,
		subRequestTypeAddress,
		subRequestTypeAddressID,
		subRequestTypeCity,
		subRequestTypeCityID,
		subRequestTypeZip,
		subRequestTypeZipID
	} = props.formik.values;

	const reportItems = [
		{ Id: requestTypeID, Value: requestType },
		{ Id: subRequestTypeID, Value: subRequestType },
		{ Id: petTypeID, Value: petType },
		{ Id: sexTypeID, Value: sexType },
		{ Id: animalColorTypeID, Value: animalColorType },
		{ Id: otherAnimalTypesID, Value: otherAnimalTypes },
		{ Id: requestTypeDescriptionID, Value: describeTheProblem },
		{ Id: requestTypeAddressID, Value: streetAddress },
		{ Id: requestTypeCityID, Value: city },
		{ Id: requestTypeZipID, Value: zipCode },
		{ Id: subRequestTypeDescriptionID, Value: describeTheProblem},
		{ Id: subRequestTypeAddressID, Value: subRequestTypeAddress },
		{ Id: subRequestTypeCityID, Value: subRequestTypeCity },
		{ Id: subRequestTypeZipID, Value: subRequestTypeZip }
	].filter((item) => !!item.Id);

	var itemsToSubmit = {
		AppVersion: '308',
		Location: {
			X: Longitude,
			Y: Latitude
		},
		AuthorId: ContactID,
		IsPrivate: false,
		Locale: 'en',
		ReportItems: reportItems,
		SuppressWorkflows: false
	};

	return itemsToSubmit;
};

export const SubmitReport = async (actions, props) => {
	const streetAddress = props.formik.values.streetAddress;
	const city = props.formik.values.city;
	const zipCode = props.formik.values.zipCode;
	const itemsToSubmit = returnModel(props, streetAddress, city, zipCode);

	let response = null;
	try {
		response = await CreateReport(itemsToSubmit);
		if (HasResponseErrors(response)) {
			const errorsReturned = GetResponseErrors(response);
			props.formik.setStatus({ responseError: errorsReturned});
		}

		props.formik.setStatus({ responseError: null});
	} catch (ex) {
		console.error(ex.message);
	}

	Go(props, Routes.SubmitForm, response);
};

export default SubmitReport;
