import { withFormik } from 'formik';



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
		otherAnimalTypes: ''
	}),

	handleSubmit: values => {
		console.log(values);

	},
}); 
