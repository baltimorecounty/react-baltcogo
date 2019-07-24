import React from 'react';
import RequestPetTypeField from './RequestPetTypeField';
import ErrorMsg from './ErrorMessage';
const PetType = ({
	requestType,
	requestType_petAndAnimalIssue,
	subRequestType,
	errorsPetType,
	touchedPetType,
	pageFieldName,
	handleServicePetChange,
	rest,
	PetTypes,
	shouldShow
}) => {
	return (
		<React.Fragment>
			{shouldShow && subRequestType !== '' ? (
				<div className={errorsPetType && touchedPetType ? 'cs-form-control error' : 'cs-form-control'}>
					<label htmlFor="petType">{pageFieldName}</label>
					<RequestPetTypeField
						component="select"
						name="petType"
						formikProps={rest}
						onChange={handleServicePetChange}
						className={errorsPetType && touchedPetType ? 'text-select error' : null}
					>
						<option key="default" value="">
							-- Please select a pet type --
						</option>
						{PetTypes.map((petType) => (
							<option key={petType.id} value={petType.name}>
								{petType.name}
							</option>
						))}
					</RequestPetTypeField>
					<p role="alert" className="error-message">
						{<ErrorMsg errormessage={errorsPetType} touched={touchedPetType} />}
					</p>
				</div>
			) : null}
		</React.Fragment>
	);
};

export default PetType;
