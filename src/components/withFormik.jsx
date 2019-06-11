import { withFormik } from 'formik';
import * as Yup from 'yup';


export default withFormik({
	displayName: 'WizardForm',
	enableReinitialize: true,
	mapPropsToValues: () => ({
		Email: '',
		requestType: '',
		subRequestType: '',
		petType: '',
		animalBreed: '',
		sexType: '',
		animalColorType: '',
		otherAnimalTypes: ''
	}),
	validationSchema: () =>

		Yup.object().shape({
			requestType: Yup.string().required('Request Category is required'),
			subRequestType: Yup.string().required('Sub Category is required'),
			petType: Yup.string().required('Pet Type is required'),
			animalColorType: Yup.string().required('Primary Animal Color is required'),
		}),



	handleSubmit: values => {
		console.log(values);

	 },
}); 
