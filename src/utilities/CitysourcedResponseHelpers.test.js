import { GetResponseErrors, HasResponseErrors } from './CitysourcedResponseHelpers';

describe('HasData', () => {
	it('should return true if the response is empty', () => {
		// Arrange
		const response = null;

		// Act
		var actual = HasResponseErrors(response);

		// Assert
		expect(true).toBe(actual);
	});

	it('should return true if the response is valid and is a failure', () => {
		// Arrange
		const response = {
			data: {
				ErrorsCount: 1
			}
		};

		// Act
		var actual = HasResponseErrors(response);

		// Assert
		expect(true).toBe(actual);
	});

	it('should return false if the response is valid and is a success', () => {
		// Arrange
		const response = {
			data: {
				ErrorsCount: 0
			}
		};

		// Act
		var actual = HasResponseErrors(response);

		// Assert
		expect(false).toBe(actual);
	});
});

describe('GetResponseErrors', () => {
	it('should return an empty string when the response contains no errors', () => {
		// Arrange
		var response = buildErrorsResponse([]);

		// Act
		var actualErrors = GetResponseErrors(response);

		// Assert
		expect('').toBe(actualErrors);
	});

	it('should return an a single error', () => {
		// Arrange
		var response = buildErrorsResponse([ 'Unable to login' ]);

		// Act
		var actualErrors = GetResponseErrors(response);

		// Assert
		expect('Unable to login').toBe(actualErrors);
	});

	it('should return multiple errors separated by a comma', () => {
		// Arrange
		var response = buildErrorsResponse([ 'Unable to login', 'System is down' ]);

		// Act
		var actualErrors = GetResponseErrors(response);

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
