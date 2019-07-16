import React from "react";
import GenericTypeField from "./genericTypeField";
import ErrorMsg from "./ErrorMessage";
const OtherAnimalTypes = ({ subRequestType, petType, returnRequestTypes, errorsOtherAnimalTypes, touchedOtherAnimalTypes, pageFieldName, rest, handleOtherPetTypeChange, OtherAnimalTypes }) => {

	return (
		<React.Fragment>
			{(subRequestType !== '' && petType === returnRequestTypes) ?
				<div className={
					errorsOtherAnimalTypes && touchedOtherAnimalTypes ? "cs-form-control error" : "cs-form-control"}>
					<label htmlFor="otherAnimalTypes">{pageFieldName.map(name => name.PetTypeOther)}</label>
					<GenericTypeField
						component="select"
						name="otherAnimalTypes"
						formikProps={rest}
						onChange={handleOtherPetTypeChange}
						className={errorsOtherAnimalTypes && touchedOtherAnimalTypes ? "text-select error" : null}
					>
						<option key='default' value=''>--Please select an "other" pet type--</option>
						{OtherAnimalTypes.map(OtherAnimalType => (
							<option key={OtherAnimalType.id} value={OtherAnimalType.name}>{OtherAnimalType.name}</option>
						))}

					</GenericTypeField>

					<p role='alert' className="error-message">
						{<ErrorMsg
							errormessage={errorsOtherAnimalTypes}
							touched={touchedOtherAnimalTypes} />}
					</p>
				</div>
				: null
			}

		</React.Fragment>
	);
};

export default OtherAnimalTypes;

