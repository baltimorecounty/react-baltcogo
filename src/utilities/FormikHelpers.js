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

export { GetErrorDetails };
