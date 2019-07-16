
import React, { useState, useEffect } from "react";
import { Form, Field, connect, ErrorMessage } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import Geocode from "react-geocode";
import Collaspe from './Collaspe'
import axios from "axios"
import _ from 'lodash';
import AutoCompletTypeField from './AutocompleteTypeField';
import { formIncomplete } from "./checkFormCompletion";
import { returnMapEndPoint } from "./returnEnvironmentItems"
import { VerifyAddress } from './authService';
import ButtonDisplay from "./buttonDisplay";
import submitReport from "./submitReport";
import { GetErrorsDetails } from "../utilities/CustomErrorHandling";
import SeButton from './SeButton';

Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');


const provideDetails = props => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [Latitude, setLatitude] = useState(39.4001526);
	const [Longitude, setLongitude] = useState(-76.6074448);
	const [MarkerLatitude, setMarkerLatitude] = useState(18.5204);
	//const [MarkerLongitude, setMarkerLongitude] = useState(73.8567);
	const [Address, setData] = useState([]);
	const [query, setQuery] = useState(encodeURIComponent());
	const pageFieldName = props.formik.values.MapPage;
	const localProps = props.formik.values;

	useEffect(() => {

		const fetchData = async () => {
			//	const encodeAddress = encodeURIComponent('400 wa')
			const mapEndPoint = returnMapEndPoint('mapGISEndPoint');
			if (query !== 'undefined' && query.length > 0) {
				const result = await axios(
					`${mapEndPoint}${query}`,
				);
				if (result.status === 200) {
					setData(result.data);
				}
				else {
					setData([]);
				}
			}
		};

		props.formik.setFieldValue('currentTab', 'ProviderDetail');
		if (!props.formik.values.ContactID || formIncomplete(props.formik)) {
			props.history.push('/ServiceRequestForm');
		}
		fetchData();
	},
	[query]);

	const reverseGeocode = async (latitude, longitude) => {
		const mapReverseEndPoint = returnMapEndPoint("mapReverseGISEndPoint");
		const result = await axios(
			`${mapReverseEndPoint}${longitude}%2C${latitude}&f=pjson`,
		);
		return result;

	}

	const buttonShowHideValidation = () => {
		var searchQuery = props.formik.values.location;
		var description = props.formik.values.describeTheProblem;

		if (searchQuery === "" || description === '') {
			return true;
		}
		else {
			return false;
		}
	};

	let displayButton = buttonShowHideValidation();

	const handleAddressChange = (e) => {
		setQuery(e.target.value);

		let searchQuery = _.split(e.target.value, ',', 1);
		if (searchQuery.length > 0) {
			let filtered = Address.filter(m => m.StreetAddress.toLowerCase().indexOf(searchQuery.toString().toLowerCase()) > -1);
			filtered.map(item => (splitAddress(item.Latitude, item.Longitude)
			));
		}
	};

	const handleAddressSelect = (val) => {
		let searchQuery = _.split(val, ',', 1);
		if (searchQuery.length > 0) {
			let filtered = Address.filter(m => m.StreetAddress.toLowerCase().indexOf(searchQuery.toString().toLowerCase()) > -1);
			filtered.map(item => (splitAddress(item.Latitude, item.Longitude)
			));
		}
	};

	const splitAddress = (Latitude, Longitude) => {

		setLatitude(Latitude);
		setLongitude(Longitude);
		setMarkerLatitude(Latitude);
		//	setMarkerLongitude(Longitude);
		// setMarkerLatitude(MarkerLatitude);
		// setMarkerLongitude(MarkerLongitude);
		rest.formik.setFieldValue('Latitude', Latitude);
		rest.formik.setFieldValue('Longitude', Longitude);
	};

	const onZoom = (val) => {
		rest.formik.setFieldValue('ZoomValue', val);
	};

	const onMarkerDragEnd = async (event, setFieldValue) => {

		let newLat = event.latLng.lat();
		let newLng = event.latLng.lng();


		await reverseGeocode(newLat, newLng).then(

			response => {

				try {
					const address = response.data.address.Match_addr;
					rest.formik.setFieldValue('location', address);

					setLongitude(newLng);
					setLatitude(newLat);
					setMarkerLatitude(newLat);
					//	setMarkerLongitude(newLng);
					rest.formik.setFieldValue('Latitude', newLat);
					rest.formik.setFieldValue('Longitude', newLng);
					rest.formik.setFieldValue('ShowErrorMsg', 0);

				}
				catch (ex) {

					rest.formik.setFieldValue('location', '');
					rest.formik.setFieldValue('ShowErrorMsg', 1);

					rest.formik.errors.location = 'You must select a location inside Baltimore County.';


				}
			}
		)

	};

	const goToAdditionalPage = async (values) => {

		let fullAddress = rest.formik.values.location;
		const addressResponse = await VerifyAddress(fullAddress);
		if (addressResponse.data.HasErrors) {

			const errorsReturned = GetErrorsDetails(addressResponse);
			rest.formik.setFieldValue('ShowErrorMsg', 1);
			rest.formik.errors.location = errorsReturned;
		}
		else {
			const addressParts = props.formik.values.location.split(',');
			rest.formik.setFieldValue('requestTypeDescription', props.formik.values.describeTheProblem);
			rest.formik.setFieldValue('subRequestTypeAddress', addressParts[0]);
			rest.formik.setFieldValue('subRequestTypeCity', addressParts[1]);
			rest.formik.setFieldValue('subRequestTypeZip', addressParts[2]);
			props.history.push('/AdditionalInformationForm');
		}
	}

	const goServiceRequestForm = (values) => {
		props.history.push('/ServiceRequestForm');
	}

	const { values, errors, actions, touched, handleSubmit, setFieldValue, ...rest } = props;
	const items = Address.map((item, index) => ({
		id: item.Zip,
		label: `${item.StreetAddress.toUpperCase()}, ${item.City.toUpperCase()}, ${item.Zip}`,
	}));

	const SubmitForm = async (clickEvent) => {
		setIsSubmitting(true);
		await submitReport(clickEvent, props);
		setIsSubmitting(false);
	};

	return (

		<FormContainer title={pageFieldName.map(name => name.DetailsTitle)} tabNames={localProps.Tabs} currentTab="ProvideDetails" shouldDisableForm={localProps.shouldDisableForm} requiresLocation={localProps.requiresLocation}>
			<Form>
				<Field
					type="hidden"
					name="Latitude"

				/>
				<Field
					type="hidden"
					name="Longitude"


				/>
				<Field
					type="hidden"
					name="ShowErrorMsg"

				/>
				<label>Add a Location</label>
				<p>
					{pageFieldName.map(name => name.DetailsMainLabelExplaination)}
				</p>
				<div className={
					rest.formik.errors.location && rest.formik.touched.location ? "cs-form-control address-search error" : "cs-form-control address-search"}>
					<div>
						<label>Issue type</label>
						<div>
							<p className="smallest">{rest.formik.values.requestType} > {rest.formik.values.subRequestType}</p>
						</div>
					</div>
					<div className="address-search-wrapper">
						<label htmlFor="location"
							className="address">{pageFieldName.map(name => name.AddressHeaderLabel)}
						</label>
						<div className="address-input-wrapper">
							<AutoCompletTypeField
								items={items}
								//name="location"
								formikProps={rest}
								value={rest.formik.values.location}
								onChange={handleAddressChange}
								onSelect={handleAddressSelect}
							/>
							<i className="fa fa-search address-search-icon" aria-hidden="true"></i>
						</div>
					</div>
					<ErrorMessage name='msg' className='input-feedback' component='div' />
					<div className={rest.formik.values.ShowErrorMsg === 1 ? "cs-form-control error" : "cs-form-control"}>
						{rest.formik.values.ShowErrorMsg === 1 ? rest.formik.errors.location : ''}
					</div>
					<Collaspe address={rest.formik.values.location}
						ZoomValue={rest.formik.values.ZoomValue}
						lat={Latitude}
						lng={Longitude}
						onZoom={onZoom}
						markerLat={MarkerLatitude} onMarkerDragEnd={e => (onMarkerDragEnd(e, setFieldValue))} />
					<p role='alert' className="error-message">

						{/* <ErrorMsg
							errormessage={rest.formik.errors.location}
							touched={rest.formik.touched.location} /> */}
					</p>
				</div>
				<div className={
					rest.formik.errors.describeTheProblem && rest.formik.touched.describeTheProblem ? "cs-form-control address-search error" : "cs-form-control address-search"}>
					<label htmlFor="describeTheProblem"

					>{pageFieldName.map(name => name.ProblemLabel)}</label>
					<Field
						component="textarea"
						placeholder="Maximum 2,000 characters."
						name="describeTheProblem"
						className={`text-input ${rest.formik.errors.describeTheProblem && rest.formik.touched.describeTheProblem ? "error" : ""}`}
					/>

					<p role='alert' className="error-message">
						<ErrorMsg
							errormessage={rest.formik.errors.describeTheProblem}
							touched={rest.formik.touched.describeTheProblem} />
					</p>
				</div>
				<div className="cs-form-control" >
					<input type="button" className="seButton" onClick={goServiceRequestForm} value="Previous" />
					{(!rest.formik.values.requestTypeAddressID) ?
						<SeButton
							text="File Your Report"
							onClick={SubmitForm}
							isDisabled={displayButton}
							isLoading={isSubmitting}
							isLoadingText="Submitting Request..."
							isInline
							className="pull-right"
						/>
						:
						<ButtonDisplay
							onClick={goToAdditionalPage}
							disabled={displayButton}
							buttonName ="Next" />}
				</div>
			</Form>
		</FormContainer>
	);
}
export default connect(provideDetails);


