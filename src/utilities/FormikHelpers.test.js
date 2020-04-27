import { GetErrorDetails } from "./FormikHelpers";

describe("GetErrorDetails", () => {
  it("should return hasError equal to false, when no error exists", () => {
    // Arrange
    const formikBag = {
      errors: {
        test1: "Test is Required",
      },
      touched: {
        test: true,
        test1: true,
      },
    };

    // Act
    const actualError = GetErrorDetails("test", formikBag);

    // Assert
    expect(actualError).toEqual({
      isTouched: true,
      hasError: false,
      message: null,
    });
  });

  it("should return an error when an error is active", () => {
    // Arrange
    const formikBag = {
      errors: {
        test: "Test is Required",
      },
      touched: {
        test: true,
      },
    };

    // Act
    const actualError = GetErrorDetails("test", formikBag);

    // Assert
    expect(actualError).toEqual({
      isTouched: true,
      hasError: true,
      message: "Test is Required",
    });
  });

  it("should return an error when it's set a a status", () => {
    // Arrange
    const formikBag = {
      status: {
        test: "Test is Required",
      },
      touched: {
        test: true,
      },
    };

    // Act
    const actualError = GetErrorDetails("test", formikBag);

    // Assert
    expect(actualError).toEqual({
      isTouched: true,
      hasError: true,
      message: "Test is Required",
    });
  });
});
