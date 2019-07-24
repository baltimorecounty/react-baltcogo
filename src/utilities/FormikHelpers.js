const GetErrorDetails = (name, formikBag) => {
	const { errors = {}, status = {}, touched = {} } = formikBag;
	const error = errors[name];
	const isTouched = touched[name];
	const statusMessage = status[name];
	const message = error || statusMessage || null;

	return {
		isTouched,
		hasError: !!message,
		message
	};
};

/**
 *
 * @param {object} props - formik bag
* @param {object} fields - An object thats key specified the field name, \
 * and value to set, based on the formik set function name
 * @param {string} setFuncName - name of the formik set function you want to use
 * Ex: setFieldValue, setFieldTouched
 */
const setFields = (props, fields, setFuncName) => {
	Object.entries(fields).forEach(([key, value]) => {
		props[setFuncName](key, value);
	  });
};

/**
 * Sets multiple fields touched flag
 * @param {*} props - formik bag
 * @param {object} fields - An object thats key specified the field name, \
 * and value is whether or not the field is touched
 */
const SetFieldsTouched = (props, fields) => {
	setFields(props, fields, 'setFieldTouched');
};

export { GetErrorDetails, SetFieldsTouched };
