import React from "react";
import { Field, connect } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import { ErrorCheck } from "./CustomErrorHandling";
import { CreateReport } from './authService';

const AdditionalInformation = props => {

	const { errors, touched, handleSubmit, ...rest } = props;

	console.log(props.formik.values);
	const SubmitTheForm = async values => {
		const Selections = {
			AppVersion : 308,
			Location : {  
				X:props.formik.values.Longitude,
				Y:props.formik.values.Latitude
			},
   			AuthorId: "{{CONTACT_ID}}",
   			IsPrivate: false,
   			Locale:"en",
			ReportItems:[  
				{  
					Id: props.formik.values.requestType.split(',')[0].toString(),
					Value: props.formik.values.requestType.split(',')[1].toString()
				},
				{  
					Id: props.formik.values.subRequestType.split(',')[0].toString(),
					Value: props.formik.values.subRequestType.split(',')[0].toString()
				},
				{  
					Id: props.formik.values.petType.split(',')[0].toString(),
					Value: props.formik.values.petType.split(',')[0].toString()
				},
				{  
					Id: props.formik.values.sexType.split(',')[0].toString(),
					Value: props.formik.values.sexType.split(',')[0].toString()
				},
				{  
					Id: props.formik.values.animalColorType.split(',')[0].toString(),
					Value: props.formik.values.animalColorType.split(',')[0].toString()
				},
				{  
					Id: props.formik.values.otherAnimalTypes.split(',')[0].toString(),
					Value: props.formik.values.otherAnimalTypes.split(',')[0].toString()
				}
			],
   			SuppressWorkflows: false
		};	
		console.log('--inside signnup');
		console.log(values);
		try {
			alert(JSON.stringify(Selections, null, 2));
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
				props.errors.email = ex.response.data
			}
		}
	}
	const callProviderDetailForm = () => {
		props.history.push("/ProviderDetails");
	}

	
	return (
		<FormContainer title="Additional Information">
			<form onSubmit={handleSubmit}>
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
				<button type="button" onClick={callProviderDetailForm}>Previous</button>
				<button type="button" onClick={SubmitTheForm}>
					File Your Report
				</button>
			</form>

		</FormContainer>
	);
}



export default connect(AdditionalInformation);
