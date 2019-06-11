import { withFormik } from 'formik';
import * as Yup from 'yup';


export default withFormik({
	displayName: 'WizardForm',
	enableReinitialize: true,
	mapPropsToValues: () => ({
		requestType: '',
		subRequestType: '',
		petType: '',
		animalBreed: '',
		sexType: '',
		animalColorType: '',
		otherAnimalTypes: '',
		Email: '',
		Password: '',
		NameFirst: '',
		NameLast: '',
		Telephone: '',
		streeAddress: '',
		city: '',
		zipCode: '',
		location: 'Baltimore County Courts Building',
		describeTheProblem: '',
		Latitude: '',
		Longitude: '',
		// Latitude: 39.4001526,
		// Longitude: -76.6074448,
		//MarkerLatitude: 18.5204,
		//MarkerLongitude: 73.8567

	}),
	validationSchema: () =>

		Yup.object().shape({
			requestType: Yup.string().required('Request Category is required'),
			subRequestType: Yup.string().required('Sub Category is required'),
			petType: Yup.string().required('Pet Type is required'),
			animalColorType: Yup.string().required('Primary Animal Color is required'),
			NameFirst: Yup.string().required('Please enter your first name.'),
			NameLast: Yup.string().required('Please enter your last name.'),
			streeAddress: Yup.string().required('Please enter your street address.'),
			city: Yup.string().required('Please enter your city.'),
			zipCode: Yup.string().matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, {
				message: 'Need valid five-digit ZIP code.',
				excludeEmptyString: true
			}).required('Please enter your five-digit ZIP code.'),

			location: Yup.string().required('Add a Location is required'),
			describeTheProblem: Yup.string().required('Describe the problem is required'),
			Email: Yup.string().email('Invalid email address.').required('Please enter a valid email address.'),
			//Password: Yup.string()
			//	.required('Please enter your password.')
			//	.max(30, "Maximum 30 characters allowed.")
			//	.matches(
			//		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8}/,
			//		"Your password must be 8 to 30 characters and contain at least one uppercase letter, one lowercase letter and one number.")
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
