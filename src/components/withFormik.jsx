import { withFormik } from 'formik';
import * as Yup from 'yup';


export default withFormik({
	//displayName: 'WizardForm',
	enableReinitialize: true,
	mapPropsToValues: () => ({
		ContactID: '',
		fullAddress: '',
		VerificationId: '',
		requestTypeDescription: '',
		requestTypeDescriptionID: '',
		requestTypeAddressID: '',
		requestTypeCityID: '',
		requestTypeZipID: '',	
		requestTypeAddress: '',
		requestTypeCity: '',
		requestTypeZip: '',
		requestTypeID: '',
		requestType: '',
		subRequestTypeID: '',
		subRequestType: '',
		subRequestTypeDescription: '',
		subRequestTypeDescriptionID: '',
		subRequestTypeAddressID: '',
		subRequestTypeCityID: '',
		subRequestTypeZipID: '',
		subRequestTypeAddress: '',
		subRequestTypeCity: '',
		subRequestTypeZip: '',
		serviceDescription: '',
		petType: '',
		petTypeID: '',
		animalBreedType: '',
		animalBreedID: '',
		sexType: '',
		sexTypeID: '',
		animalColorType: '',
		animalColorTypeID: '',
		otherAnimalTypes: '',
		otherAnimalTypesID: '',
		Email: '',
		Password: '',
		NameFirst: '',
		NameLast: '',
		Telephone: '',
		location: '',
		describeTheProblem: '',
		Latitude: '',
		Longitude: '',
		contactID: '',
		streetAddress: '',
		city: '',
		zipCode: '',
		shouldDisableForm: false
		// Latitude: 39.4001526,
		// Longitude: -76.6074448,
		//MarkerLatitude: 18.5204,
		//MarkerLongitude: 73.8567

	}),
	validationSchema: () =>

		Yup.object().shape({
			requestType: Yup.string().required('Please select a request category.'),
			subRequestType: Yup.string().required('Please select a request category.'),
			petType: Yup.string().required('Please select a pet color.'),
			animalColorType: Yup.string().required('Primary Animal Color is required'),
			serviceDescription: Yup.string().required('Service Description is required'),

			location: Yup.string().required('You must select a location inside Baltimore County.'),
			describeTheProblem: Yup.string().required('Please enter a description for your report.'),
		}),



	handleSubmit: values => {
		console.log(values);

	},

	/* 	handleSubmit: (values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}, 1000);
		},
	 */

}); 
