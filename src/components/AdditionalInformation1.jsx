import React from "react";
import { Field, connect } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';


const AdditionalInformation = props => {

	const { errors, touched, handleSubmit, ...rest } = props;

	console.log(props.formik.values);
	const SubmitTheForm = () => {

		console.log('--inside SubmitTheForm---');
		console.log(props.formik.values);
	}
	const callProviderDetailForm = () => {
		console.log('---callregisterForm---');
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
					Submit
				</button>
			</form>

		</FormContainer>
	);
}



export default connect(AdditionalInformation);
