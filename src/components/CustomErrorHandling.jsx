export function ErrorCheck(response) {
	var errors = "";

	if (response.data.ErrorsCount > 1) {
		for (let i = 0; response.data.ErrorsCount; i++) {
			errors += response.data.Errors[i].ErrorText + ", ";
		}
	}
	else {
		errors = response.data.Errors[0].ErrorText;
	}
	return errors;
}

export function formatPhoneNumber(input, format, formattedPhoneNumber, returnBooleanVal) {
	let error;
	var returnedObject = {};
	/* if (input) {
		error = 'Required';
	} */

	if (typeof input === 'number') {
		input = input.toString();
	}
	var exp = /\d+/g;
	var numbersOnly = input.match(exp).join('').split('');

	var numberOfXs = format.toString().split('').filter(function (char) {
		return char === 'x';
	}).length;

	var hasOneAsPrefix = numberOfXs + 1 === numbersOnly.length;
	// 1 has been included in the str, but is not in the desired format 

	if (hasOneAsPrefix) {
		numbersOnly.shift();
	}
	if (numberOfXs === numbersOnly.length || hasOneAsPrefix) {
		numbersOnly.forEach(function (number) {
			format = format.replace('x', number);
			formattedPhoneNumber = format;
		});
		returnedObject["returnBooleanVal"] = true;
		returnedObject["formattedPhoneNumber"] = format;

	}
	else {
		returnedObject["returnBooleanVal"] = false;
	}
	return returnedObject;
}




