import React from 'react';
import GenericTypeField from './genericTypeField';
import ErrorMsg from './ErrorMessage';
const SexType = ({
	requestType,
	returnRequestTypes,
	subRequestType,
	checkPetType,
	errorsSexType,
	touchedSexType,
	pageFieldName,
	rest,
	handlePetSexChange,
	animalSex,
	shouldShow
}) => {
	return (
		<React.Fragment>
			{shouldShow && subRequestType !== '' && checkPetType ? (
				<div className={errorsSexType && touchedSexType ? 'cs-form-control error' : 'cs-form-control'}>
					<label htmlFor="sexType">{pageFieldName}</label>
					<GenericTypeField
						component="select"
						name="sexType"
						formikProps={rest}
						onChange={handlePetSexChange}
						className={errorsSexType && touchedSexType ? 'text-select error' : null}
					>
						<option key="default" value="">
							-- Please select a pet sex --
						</option>
						{animalSex.map((petSex) => (
							<option key={petSex.id} value={petSex.name}>
								{petSex.name}
							</option>
						))}
					</GenericTypeField>

					<p role="alert" className="error-message">
						{<ErrorMsg errormessage={errorsSexType} touched={touchedSexType} />}
					</p>
				</div>
			) : null}
		</React.Fragment>
	);
};

export default SexType;
