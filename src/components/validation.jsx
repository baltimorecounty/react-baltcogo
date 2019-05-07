//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

const validation = Yup.object().shape({
	firstName: Yup.string()
		.matches(alpha, { message: "Enter Valid Name", excludeEmptyString: true })
		.required()
		.max(35),
	lastName: Yup.string()
		.matches(alpha, { message: "Enter Valid Name", excludeEmptyString: true })
		.required()
		.max(35),
	address: Yup.string()
		.required(),
	city: Yup.string()
		.matches(alpha, { message: "Enter Valid Name", excludeEmptyString: true })
		.required(),
	occupation: Yup.string()
		.test('county', 'cannot be empty', value => value !== 'Please Select')
		.required('required'),
});
export default validation;
