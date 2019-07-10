
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
Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');


const provideDetails = props => {
	const [Latitude, setLatitude] = useState(39.4001526);
	const [Longitude, setLongitude] = useState(-76.6074448);
	const [MarkerLatitude, setMarkerLatitude] = useState(18.5204);
	const [MarkerLongitude, setMarkerLongitude] = useState(73.8567);
	const [Address, setData] = useState([]);
	const [query, setQuery] = useState(encodeURIComponent());

	useEffect(() => {

		const fetchData = async () => {
			//	const encodeAddress = encodeURIComponent('400 wa')
			const mapEndPoint = returnMapEndPoint();
			
			const result = await axios(
				`${mapEndPoint}${query}`,
			);
			if (result.status === 200) {
				setData(result.data);
			}
			else {
				setData([]);
			}

		};
		props.formik.setFieldValue('currentTab', 'ProviderDetail');
		if(props.formik.values.ContactID === null || formIncomplete(props.formik) === true){
			props.history.push('/ServiceRequestForm');
			props.formik.setFieldValue("userNeedsToLoginError", "Please log in to continue");
		}
		fetchData();
	},
	[query]);

	const reverseGeocode = async (latitude, longitude) => {
		const result = await axios(
			`http://bcgis.baltimorecountymd.gov/arcgis/rest/services/Geocoders/CompositeGeocode_CS/GeocodeServer/reverseGeocode?location=${longitude}%2C${latitude}&f=pjson`,
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
		setMarkerLongitude(Longitude);
		// setMarkerLatitude(MarkerLatitude);
		// setMarkerLongitude(MarkerLongitude);
		rest.formik.setFieldValue('Latitude', Latitude);
		rest.formik.setFieldValue('Longitude', Longitude);
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
					setMarkerLongitude(newLng);
					rest.formik.setFieldValue('Latitude', newLat);
					rest.formik.setFieldValue('Longitude', newLng);

				}
				catch (ex) {

					rest.formik.errors.location = 'You must select a location inside Baltimore County.';

				}
			}
		)




		/* 		Geocode.fromLatLng(newLat, newLng).then(
					response => {
						const address = response.results[0].formatted_address;
						rest.formik.setFieldValue('location', address);
						setLongitude(newLat);
						setLatitude(newLng);
					
						setMarkerLatitude(newLat);
						setMarkerLongitude(newLng);
						rest.formik.setFieldValue('Latitude', newLat);
						rest.formik.setFieldValue('Longitude', newLng);
					},
					error => {
						console.error(error);
					}
				);
				console.log('Latitude1 value :' + Latitude1);
				console.log('Longitude1 value :' + Longitude1); */
	};


	const goToAdditionalPage = async (values) => {
		const addressParts = props.formik.values.location.split(',');
		rest.formik.setFieldValue('requestTypeDescription', props.formik.values.describeTheProblem);
		rest.formik.setFieldValue('subRequestTypeAddress', addressParts[0]);
		rest.formik.setFieldValue('subRequestTypeCity', addressParts[1]);
		rest.formik.setFieldValue('subRequestTypeZip', addressParts[2]);
		props.history.push('/AdditionalInformationForm');
	}

	const goServiceRequestForm = async (values) => {
		props.history.push('/ServiceRequestForm');
	}

	const { values, isSubmitting, errors, touched, setFieldValue, ...rest } = props;
	const items = Address.map((item, index) => ({
		id: item.Zip,
		label: `${item.StreetAddress}, ${item.City}, ${item.Zip}`,
	}));

	return (

		<FormContainer title="Provide Details" currentTab="ProvideDetails" shouldDisableForm={props.formik.values.shouldDisableForm}>
			<Form >
				<Field
					type="hidden"
					name="Latitude"

				/>
				<Field
					type="hidden"
					name="Longitude"


				/>
				<label>Add a Location</label>
				<p>
					Tell us where the issue is located. You can enter an address
					or mark the location on the map.
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
							className="address">Enter the closest street address to your service request
						</label>
						<div className="address-input-wrapper">
							<AutoCompletTypeField
								items={items}
								placeholder="123 Amazing St"
								name="location"
								formikProps={rest}
								value={rest.formik.values.location}
								onChange={handleAddressChange}
								onSelect={handleAddressSelect}
							/>
							<i className="fa fa-search address-search-icon" aria-hidden="true"></i>
						</div>
					</div>
					<ErrorMessage name='msg' className='input-feedback' component='div' />
					<div className={`input-feedback ${props.status ? props.status.css : ''}`}>
						{props.status ? props.status.success : ''}
					</div>
					<Collaspe address={rest.formik.values.location}
						lat={Latitude}
						lng={Longitude}

						markerLat={MarkerLatitude} onMarkerDragEnd={e => (onMarkerDragEnd(e, setFieldValue))} />
					<p role='alert' className="error-message">
						<ErrorMsg
							errormessage={rest.formik.errors.location}
							touched={rest.formik.touched.location} />
					</p>
				</div>
				<div className={
					rest.formik.errors.describeTheProblem && rest.formik.touched.describeTheProblem ? "cs-form-control address-search error" : "cs-form-control address-search"}>
					<label htmlFor="describeTheProblem"

					>Describe the Problem</label>
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
					<input type="button" className="seButton pull-right" onClick={goToAdditionalPage} disabled={displayButton} value="Next" />
				</div>
			</Form>
		</FormContainer>
	);
}
export default connect(provideDetails);


