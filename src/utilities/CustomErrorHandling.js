

export function formatPhoneNumber(input, format, formattedPhoneNumber, returnBooleanVal) {
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
		});
		returnedObject["returnBooleanVal"] = true;
		returnedObject["formattedPhoneNumber"] = format;

	}
	else {
		returnedObject["returnBooleanVal"] = false;
	}
	return returnedObject;
}




