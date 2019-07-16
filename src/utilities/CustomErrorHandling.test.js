import { GetErrorsDetails } from './CustomErrorHandling';

describe('GetErrorsDetails', () => {
	it('should return an empty string when the response contains no errors', () => {
		// Arrange
		var response = buildErrorsResponse([]);

		// Act
		var actualErrors = GetErrorsDetails(response);

		// Assert
		expect('').toBe(actualErrors);
	});

	it('should return an a single error', () => {
		// Arrange
		var response = buildErrorsResponse(['Unable to login']);

		// Act
		var actualErrors = GetErrorsDetails(response);

		// Assert
		expect('Unable to login').toBe(actualErrors);
	});

	it('should return multiple errors separated by a comma', () => {
		// Arrange
		var response = buildErrorsResponse(['Unable to login', 'System is down']);

		// Act
		var actualErrors = GetErrorsDetails(response);

		// Assert
		expect('Unable to login, System is down').toBe(actualErrors);
	});
});

const buildErrorsResponse = (errors) => ({
	data: {
		Errors: errors.map((error) => ({
			ErrorText: error
		}))
	}
});
