import React from 'react';
import ErrorMsg from './ErrorMessage';
import GenericTypeField from './genericTypeField';
const AnimalColorType = ({
	subRequestType,
	petType,
	petTypeCat,
	petTypeDog,
	errorsAnimalColorType,
	touchedAnimalColorType,
	pageFieldName,
	handleAnimalColorChange,
	rest,
	AnimalColors,
	shouldShow
}) => {
	return (
		<React.Fragment>
			{shouldShow && subRequestType !== '' && (petType === petTypeCat || petType === petTypeDog) ? (
				<div
					className={
						errorsAnimalColorType && touchedAnimalColorType ? 'cs-form-control error' : 'cs-form-control'
					}
				>
					<label htmlFor="animalColorType">{pageFieldName}</label>
					<GenericTypeField
						component="select"
						name="animalColorType"
						formikProps={rest}
						onChange={handleAnimalColorChange}
						//value={localProps.values.name}
						className={errorsAnimalColorType && touchedAnimalColorType ? 'text-select error' : null}
					>
						<option key="default" value="">
							-- Please select the primary color of the animal --
						</option>

						{AnimalColors.map((animalColorType) => (
							<option key={animalColorType.id} value={animalColorType.name}>
								{animalColorType.name}
							</option>
						))}
					</GenericTypeField>
					<p role="alert" className="error-message">
						{<ErrorMsg errormessage={errorsAnimalColorType} touched={touchedAnimalColorType} />}
					</p>
				</div>
			) : null}
		</React.Fragment>
	);
};

export default AnimalColorType;
