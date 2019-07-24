import { withFormik } from 'formik';
import * as Yup from 'yup';


export default withFormik({
	//displayName: 'WizardForm',
	enableReinitialize: true,
	mapPropsToValues: () => ({
		ContactID: '',
		fullAddress: '',
		VerificationId: '',
		requestTypeDescriptionID: '',
		requestTypeAddressID: '',
		requestTypeCityID: '',
		requestTypeZipID: '',
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
		Latitude: 39.4001526,
		Longitude: -76.6074448,
		ShowErrorMsg: '',
		contactID: '',
		streetAddress: '',
		city: '',
		zipCode: '',
		shouldDisableForm: false,
		requiresLocation: true,
		isPanelRequired: true,
		ignoreFormCompletion: false,
		Tabs: [''],
		RequestPage: [''],
		MapPage: [''],
		AdditionalInfoPage: [''],
		SignUpPage: [''],
		SignInPage: [''],
		ResetPasswordPage: [''],
		ZoomValue: ''
	}),

	validationSchema: () =>
		Yup.object().shape({
			requestType: Yup.string().required('Please select a request category.'),
			subRequestType: Yup.string().required('Please select a sub-category.'),
			petType: Yup.string().required('Please select a pet color.'),
			animalColorType: Yup.string().required('Primary Animal Color is required'),
			serviceDescription: Yup.string().required('Service Description is required'),
			location: Yup.string().required('You must select a location inside Baltimore County.'),
			describeTheProblem: Yup.string().required('Please enter a description for your report.'),
		}),
}); 
