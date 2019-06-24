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
		otherAnimalTypes, requestTypeDescription, requestTypeDescriptionID,
		requestTypeAddress, requestTypeAddressID, requestTypeCity,
		requestTypeCityID, requestTypeZip, requestTypeZipID, subRequestTypeDescription,
		subRequestTypeDescriptionID, subRequestTypeAddress, subRequestTypeAddressID,
		subRequestTypeCity, subRequestTypeCityID, subRequestTypeZip,
		subRequestTypeZipID } = props.formik.values;
	
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
				else {
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
				<p>
					We require some basic contact information in order to
                    process your request. You'll receive status updates by
                    email, but we'll only call you if we need more information.
				</p>
				{(requestType === 'Website Issue') ?
					<div name="ContactInfo" display="hidden">
						<label htmlFor="NameFirst"
							className={
								rest.formik.errors.NameFirst && rest.formik.touched.NameFirst ? "error-message" : "text-label"}
						>First Name</label>
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
						>Last Name</label>
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
						>Email</label>
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
						<label htmlFor="Phone"
							className={
								rest.formik.errors.Phone && rest.formik.touched.Phone ? "error-message" : "text-label"}
						>Phone</label>
						<Field
							type="text"
							name="Phone"
							className={`text-input ${rest.formik.errors.Phone && rest.formik.touched.Phone ? "error" : ""}`}
						/>
						<div className="error">
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={rest.formik.errors.Phone}
									touched={rest.formik.touched.Phone} />
							</p>
						</div>
					</div> :
					<div id="ContactAddress">
						<label htmlFor="streetAddress"
							className={
								rest.formik.errors.streeAddress && rest.formik.touched.streeAddress ? "error-message" : "text-label"}
						>Your Street Address</label>
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
						>Your City</label>
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
								Your ZIP Code
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
					</div>
					
				}
				<p className="smallest">
                    Please do not include personal information, including, but
                    not limited to Social Security Numbers, driver’s license
                    numbers, financial account numbers, individual taxpayer
                    identification numbers, passport numbers, state
                    identification card numbers, health information, medical
                    history, condition, treatment, or diagnosis, health
                    insurance policies, certificate numbers, or health insurance
                    subscriber identification numbers, biometric data, and/or
                    user name or email address in combination with a password or
                    security question and answer.
				</p>
				<br />
				<input type="button" className="seButton" onClick={callProviderDetailForm} value="Previous" />
				<input type="button" className="seButton pull-right" onClick={SubmitTheForm} value="File Your Report" />

			</form>

		</FormContainer>
	);
}



export default connect(AdditionalInformation);
