import React from "react";
import ErrorMsg from "./ErrorMessage";
import { Select } from "@baltimorecounty/dotgov-components";
const AnimalBreedType = ({
	requestType,
	requestType_petAndAnimalIssue,
	subRequestType,
	petType,
	petTypeCat,
	petTypeDog,
	errorsAnimalBreedType,
	touchedAnimalBreedType,
	pageFieldName,
	handleAnimalBreedChange,
	rest,
	animalSubCategories,
	shouldShow
}) => {
	const handleChange = changeEvent => {
		const localProps = rest.formik;
		const { name, value } = changeEvent.target;
		localProps.setFieldValue(name, value);
		localProps.setFieldTouched(name, true);
		handleAnimalBreedChange(changeEvent);
	};
	return (
		<React.Fragment>
			{shouldShow &&
      subRequestType !== "" &&
      (petType === petTypeCat || petType === petTypeDog) ? (
					<div
						className={
							errorsAnimalBreedType && touchedAnimalBreedType
								? "cs-form-control error"
								: "cs-form-control"
						}
					>
						<Select
							id="animalBreedType"
							name="animalBreedType"
							label={pageFieldName}
							options={animalSubCategories}
							onChange={handleChange}
							{...rest}
						/>
						<p role="alert" className="error-message">
							{
								<ErrorMsg
									errormessage={errorsAnimalBreedType}
									touched={touchedAnimalBreedType}
								/>
							}
						</p>
					</div>
				) : null}
		</React.Fragment>
	);
};

export default AnimalBreedType;
