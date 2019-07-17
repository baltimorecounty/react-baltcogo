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

const GetResponseErrors = (response) => {
	const {
		Errors = []
	} = response.data;

	return Errors.map(error => error.ErrorText).join(', ');
};

export {
	GetResponseErrors,
	HasResponseErrors
};