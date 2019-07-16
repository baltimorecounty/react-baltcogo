import { HasResponseErrors } from './CitysourcedResponseHelpers';

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
