const getResponseData = (response) => {
	const {
		data = {}
	} = response || {};
	return data;
};

const HasResponseErrors = (response) => {
	const {
		ErrorsCount
	} = getResponseData(response);
	const hasInvalidResponse = ErrorsCount !== 0 && !ErrorsCount
	return hasInvalidResponse || ErrorsCount > 0;
};
const GetNetWorkErrors = (errorMessage) => {
	const errors = errorMessage.split(':');
	console.log('errors:' + errors);
	return errors !== undefined ? `We're having trouble connecting to the server. Please try again in a few minutes.` : null;
};

const GetResponseErrors = (response) => {
	const {
		Errors = []
	} = response.data;

	return Errors.map(error => error.ErrorText).join(', ');
};

export {
	GetResponseErrors,
	HasResponseErrors,
	GetNetWorkErrors
};