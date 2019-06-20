import React from "react";
import { Field, connect } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import { ErrorCheck } from "./CustomErrorHandling";
import { CreateReport } from './authService';

const AdditionalInformation = props => {

	const { errors, touched, handleSubmit, ...rest } = props;
	const { Longitude, Latitude, ContactID, requestTypeID, requestType,
		subRequestTypeID, subRequestType, petTypeID, petType, sexTypeID,
		sexType, animalColorTypeID, animalColorType, otherAnimalTypesID,
		otherAnimalTypes, streeAddressID, streeAddress, cityID, city, 
		zipCodeID, zipCode } = props.formik.values;

	
	const SubmitTheForm = async values => {
		const reportItems = [  
			{  Id: requestTypeID, Value: requestType },
			{  Id: subRequestTypeID, Value: subRequestType},
			{  Id: petTypeID, Value: petType },
			{  Id: sexTypeID, Value: sexType },
			{  Id: animalColorTypeID, Value: animalColorType },
			{  Id: otherAnimalTypesID, Value: otherAnimalTypes	},
			// { Id: describeTheProblemID, Value: describeTheProblem },
			{ Id: streeAddressID, Value: streeAddress },
			{ Id: cityID, Value: city },
			{ Id: zipCodeID, Value: zipCode }
		].filter(item => !!item.Value); 

		var  Selections = {
			AppVersion : "308",
			Location : {  
				X:Longitude,
				Y:Latitude
			},
   			AuthorId: ContactID,
   			IsPrivate: false,
   			Locale:"en",
			ReportItems:reportItems,
   			SuppressWorkflows: false
		};	

		try {
			if(!sessionStorage.getItem('UserLoginID'))
			{
				throw new Error("You are not logged in and cannot submit a request");
			}
			try {
				//const response = await CreateReport(JSON.stringify(Selections, null, 2));
				const response = await CreateReport(Selections);
				if(response.data.ErrorsCount > 0){
					const errorsReturned = ErrorCheck(response);
					console.log(errorsReturned);
					props.Field.ErrorMsg = errorsReturned;
				}
				else{
					props.history.push('/ProviderDetails');
				}	
			}
			catch (ex) {
				if (ex.response && ex.response.status === 400) {
					console.log(ex.message);
				}
			}
		}
		catch (ex) {
			console.log(ex.message);
		}
	}
	const callProviderDetailForm = () => {
		props.history.push("/ProviderDetails");
	}

	
	return (
		<FormContainer title="Additional Information">
			<form onSubmit={handleSubmit}>
				{ (requestType === 'Website Issue') ? 
					<div name="ContactInfo" display="hidden">
						<label htmlFor="NameFirst"
							className={
								rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "input-feedback" : "text-label"}
						>First Name</label>
						<Field
							type="text"
							name="NameFirst"
							className={`text-input ${rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.NameFirst}
								touched={rest.formik.touched.NameFirst} />
						</div>
						<label htmlFor="NameLast"
							className={
								rest.formik.errors.NameLast && rest.formik.touched.NameLast ? "input-feedback" : "text-label"}
						>Last Name</label>
						<Field
							type="text"
							name="NameLast"
							className={`text-input ${rest.formik.errors.NameLast && rest.formik.touched.NameLast ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.NameLast}
								touched={rest.formik.touched.NameLast} />
						</div>
						<label htmlFor="Email"
							className={
								rest.formik.errors.Email && rest.formik.touched.Email ? "input-feedback" : "text-label"}
						>Email</label>
						<Field
							type="text"
							name="Email"
							className={`text-input ${rest.formik.errors.Email && rest.formik.touched.Email ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.Email}
								touched={rest.formik.touched.Email} />
						</div>
						<label htmlFor="Phone"
							className={
								rest.formik.errors.Phone && rest.formik.touched.Phone ? "input-feedback" : "text-label"}
						>Phone</label>
						<Field
							type="text"
							name="Phone"
							className={`text-input ${rest.formik.errors.Phone && rest.formik.touched.Phone ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.Phone}
								touched={rest.formik.touched.Phone} />
						</div>
					</div> :
					<div id="ContactAddress">
						<label htmlFor="streeAddress"
							className={
								rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "input-feedback" : "text-label"}
						>Your Street Address</label>
						<Field
							type="text"
							name="streeAddress"
							className={`text-input ${rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.streeAddress}
								touched={rest.formik.touched.streeAddress} />
						</div>
						<label htmlFor="city"
							className={
								rest.formik.errors.city && rest.formik.touched.city ? "input-feedback" : "text-label"}
						>Your City</label>
						<Field
							type="text"
							name="city"
							className={`text-input ${rest.formik.errors.city && rest.formik.touched.city ? "error" : ""}`}
						/>
						<div className="input-feedback">
							<ErrorMsg
								errormessage={rest.formik.errors.city}
								touched={rest.formik.touched.city} />
						</div>
						<div>
							<label name="zipCode" htmlFor="zipCode"
								className={
									rest.formik.errors.zipCode && rest.formik.touched.zipCode ? "input-feedback" : "text-label"}
							>
						Your ZIP Code
							</label>
							<Field type='text'
								name="zipCode"
								className={`text-input ${rest.formik.errors.zipCode && rest.formik.touched.zipCode ? "error" : ""}`}
							/>
							<div className="input-feedback">
								<ErrorMsg
									errormessage={rest.formik.errors.zipCode}
									touched={rest.formik.touched.zipCode} />
							</div>
						</div>
					</div>
				}
				<button type="button" onClick={callProviderDetailForm}>Previous</button>
				<button type="button" onClick={SubmitTheForm}>
					File Your Report
				</button>
			</form>

		</FormContainer>
	);
}



export default connect(AdditionalInformation);
