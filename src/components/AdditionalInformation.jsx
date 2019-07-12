import React from "react";
import { Field, connect } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import { ErrorCheck } from "./CustomErrorHandling";
import { CreateReport } from './authService';
import { formIncomplete } from "./checkFormCompletion";

const AdditionalInformation = props => {
	const localProps = props.formik.values;
	const pageFieldName = props.formik.values.AdditionalInfoPage
	const { errors, touched, handleSubmit, ...rest } = props;
	const { Longitude, Latitude, ContactID, requestTypeID, requestType,
		subRequestTypeID, subRequestType, petTypeID, petType, sexTypeID,
		sexType, animalColorTypeID, animalColorType, otherAnimalTypesID,
		otherAnimalTypes, requestTypeDescription, requestTypeDescriptionID,
		requestTypeAddress, requestTypeAddressID, requestTypeCity,
		requestTypeCityID, requestTypeZip, requestTypeZipID, subRequestTypeDescription,
		subRequestTypeDescriptionID, subRequestTypeAddress, subRequestTypeAddressID,
		subRequestTypeCity, subRequestTypeCityID, subRequestTypeZip,
		subRequestTypeZipID } = props.formik.values;

	if(props.formik.values.ContactID === null || formIncomplete(props.formik) === true){
		props.history.push('/ServiceRequestForm');
		props.formik.setFieldValue("userNeedsToLoginError", "Please log in to continue");
	}

	const SubmitTheForm = async values => {
		const reportItems = [
			{ Id: requestTypeID, Value: requestType },
			{ Id: subRequestTypeID, Value: subRequestType },
			{ Id: petTypeID, Value: petType },
			{ Id: sexTypeID, Value: sexType },
			{ Id: animalColorTypeID, Value: animalColorType },
			{ Id: otherAnimalTypesID, Value: otherAnimalTypes },
			{ Id: requestTypeDescriptionID, Value: requestTypeDescription },
			{ Id: requestTypeAddressID, Value: requestTypeAddress },
			{ Id: requestTypeCityID, Value: requestTypeCity },
			{ Id: requestTypeZipID, Value: requestTypeZip },
			{ Id: subRequestTypeDescriptionID, Value: subRequestTypeDescription },
			{ Id: subRequestTypeAddressID, Value: subRequestTypeAddress },
			{ Id: subRequestTypeCityID, Value: subRequestTypeCity },
			{ Id: subRequestTypeZipID, Value: subRequestTypeZip }
		].filter(item => !!item.Id);

		var Selections = {
			AppVersion: "308",
			Location: {
				X: Longitude,
				Y: Latitude
			},
			AuthorId: ContactID,
			IsPrivate: false,
			Locale: "en",
			ReportItems: reportItems,
			SuppressWorkflows: false
		};

		try {
			if (!sessionStorage.getItem('UserLoginID')) {
				throw new Error("You are not logged in and cannot submit a request");
			}
			try {
				const response = await CreateReport(Selections);
				if (response.data.ErrorsCount > 0) {
					const errorsReturned = ErrorCheck(response);
					console.log(errorsReturned);
					props.Field.ErrorMsg = errorsReturned;
				}
				props.history.push('/SubmitResponsePage');
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
	const callPreviousForm = () => {
		if(localProps.requiresLocation === false){
			props.history.push("/ServiceRequestForm");
		}
		else{
			props.history.push("/ProvideDetails");
		}
	}

	return (
		<FormContainer title={pageFieldName.map(name => name.AdditionalInfoTitle)} tabNames = {localProps.Tabs} currentTab = "AdditionalInformation" shouldDisableForm = {localProps.shouldDisableForm} requiresLocation = {localProps.requiresLocation}>
			<form onSubmit={handleSubmit}>
				{(localProps.requiresLocation === false) ?
					<div name="ContactInfo">
						<p>
							{pageFieldName.map(name => name.DisclaimerLabel)}
						</p>
						<label htmlFor="NameFirst"
							className={
								rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "error-message" : "text-label"}
						>{pageFieldName.map(name => name.FirstNameLabel)}</label>
						<Field
							type="text"
							name="NameFirst"
							className={`text-input ${rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.NameFirst}
									touched={rest.formik.touched.NameFirst} />
							</p>
						</div>
						<label htmlFor="NameLast"
							className={
								rest.formik.errors.NameLast && rest.formik.touched.NameLast ? "error-message" : "text-label"}
						>{pageFieldName.map(name => name.LastNameLabel)}</label>
						<Field
							type="text"
							name="NameLast"
							className={`text-input ${rest.formik.errors.NameLast && rest.formik.touched.NameLast ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.NameLast}
									touched={rest.formik.touched.NameLast} />
							</p>
						</div>
						<label htmlFor="Email"
							className={
								rest.formik.errors.Email && rest.formik.touched.Email ? "error-message" : "text-label"}
						>{pageFieldName.map(name => name.EmailLabel)}</label>
						<Field
							type="text"
							name="Email"
							className={`text-input ${rest.formik.errors.Email && rest.formik.touched.Email ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.Email}
									touched={rest.formik.touched.Email} />
							</p>
						</div>
						<label htmlFor="Telephone"
							className={
								rest.formik.errors.Telephone && rest.formik.touched.Telephone ? "error-message" : "text-label"}
						>{pageFieldName.map(name => name.PhoneLabel)}</label>
						<Field
							type="text"
							name="Telephone"
							className={`text-input ${rest.formik.errors.Telephone && rest.formik.touched.Telephone ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.Telephone}
									touched={rest.formik.touched.Telephone} />
							</p>
						</div>
					</div>
					:
					<div id="ContactAddress">
						<p>
							{pageFieldName.map(name => name.DisclaimerLabel)}
						</p>
						<label htmlFor="streetAddress"
							className={
								rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "error-message" : "text-label"}
						>{pageFieldName.map(name => name.StreetLabel)}</label>
						<Field
							type="text"
							name="streetAddress"
							className={`text-input ${rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.streeAddress}
									touched={rest.formik.touched.streeAddress} />
							</p>
						</div>
						<label htmlFor="city"
							className={
								rest.formik.errors.city && rest.formik.touched.city ? "error-message" : "text-label"}
						>{pageFieldName.map(name => name.CityLabel)}</label>
						<Field
							type="text"
							name="city"
							className={`text-input ${rest.formik.errors.city && rest.formik.touched.city ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.city}
									touched={rest.formik.touched.city} />
							</p>
						</div>
						<div>
							<label name="zipCode" htmlFor="zipCode"
								className={
									rest.formik.errors.zipCode && rest.formik.touched.zipCode ? "error-message" : "text-label"}
							>
								{pageFieldName.map(name => name.ZipcodeLabel)}
							</label>
							<Field type='text'
								name="zipCode"
								className={`text-input ${rest.formik.errors.zipCode && rest.formik.touched.zipCode ? "error" : ""}`}
							/>
							<div className="error">
								<p role='alert' className="error-message">
									<ErrorMsg
										errormessage={rest.formik.errors.zipCode}
										touched={rest.formik.touched.zipCode} />
								</p>
							</div>
						</div>
						<p className="smallest">
							{pageFieldName.map(name => name.LegalDisclamierBottom)}
						</p>
					</div>}
				<div className = "cs-form-control" >
					<input type="button" className="seButton" onClick={callPreviousForm} value="Previous" />
					<input type="button" className="seButton pull-right" onClick={SubmitTheForm} value="File Your Report" />
				</div>
			</form>
		</FormContainer>
	);
}

export default connect(AdditionalInformation);
