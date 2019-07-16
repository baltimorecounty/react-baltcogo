import React from "react";
import ErrorMsg from "./ErrorMessage";
import GenericTypeField from "./genericTypeField";
const AnimalBreedType = ({ requestType, requestType_petAndAnimalIssue, subRequestType, petType, petTypeCat, petTypeDog, errorsAnimalBreedType, touchedAnimalBreedType, pageFieldName, handleAnimalBreedChange, rest, animalSubCategories }) => {

	return (
		<React.Fragment>
			{((requestType === requestType_petAndAnimalIssue && subRequestType !== '')
                && (petType === petTypeCat || petType === petTypeDog)) ?
				<div className={
					errorsAnimalBreedType && touchedAnimalBreedType ? "cs-form-control error" : "cs-form-control"}>
					<label htmlFor="animalBreed">{pageFieldName.map(name => name.PetBreed)}</label>
					<GenericTypeField
						component="select"
						name="animalBreedType"
						formikProps={rest}
						onChange={handleAnimalBreedChange}
						//value={localProps.values.animalBreedType}
						className={errorsAnimalBreedType && touchedAnimalBreedType ? "text-select error" : null}
					>
						<option key='default' value=''>--Please select the primary breed of the animal--</option>
						{animalSubCategories.map(animalBreedType => (
							<option key={animalBreedType.id} value={animalBreedType.name}>{animalBreedType.name}</option>
						))}
					</GenericTypeField>
					<p role='alert' className="error-message">
						{<ErrorMsg
							errormessage={errorsAnimalBreedType}
							touched={touchedAnimalBreedType} />}

					</p>
				</div>
				: null}
		</React.Fragment>
	);
};

export default AnimalBreedType;

