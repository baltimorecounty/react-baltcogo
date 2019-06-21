
import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import Geocode from "react-geocode";
import Collaspe from './Collaspe'
import axios from "axios"
import Autocomplete from 'react-autocomplete';
import _ from 'lodash';
import AutoCompletTypeField from './AutocompleteTypeField';
Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');


const providerDetails = props => {
	const [Latitude, setLatitude] = useState(39.4001526);
	const [Longitude, setLongitude] = useState(-76.6074448);
	const [MarkerLatitude, setMarkerLatitude] = useState(18.5204);
	const [MarkerLongitude, setMarkerLongitude] = useState(73.8567);
	const [Address, setData] = useState([]);
	const [query, setQuery] = useState(encodeURIComponent());
	useEffect(() => {

		const fetchData = async () => {
			//	const encodeAddress = encodeURIComponent('400 wa')
			const result = await axios(
				`https://testservices.baltimorecountymd.gov/api/gis/addressLookup/${query}`,
			);
			if (result.status === 200) {
				setData(result.data);
			}
			else {
				setData([]);
			}
		};
		fetchData();
	}, [query]);



	const handleAddressChange = (e) => {
		console.log('--inside handleAddressChange---');
		//setFieldValue('location', e.target.value);
		setQuery(e.target.value);

		let searchQuery = _.split(e.target.value, ',', 1);
		if (searchQuery.length > 0) {
			let filtered = Address.filter(m => m.StreetAddress.toLowerCase().indexOf(searchQuery.toString().toLowerCase()) > -1);
			filtered.map(item => (splitAddress(item.Latitude, item.Longitude)
			));
		}
	};


	const handleAddressSelect = (val) => {
		//setFieldValue("location", val)
		console.log('--handleAddressSelect---');
		console.log(rest.formik.values.location);
		console.log(val);
		let searchQuery = _.split(val, ',', 1);
		if (searchQuery.length > 0) {
			let filtered = Address.filter(m => m.StreetAddress.toLowerCase().indexOf(searchQuery.toString().toLowerCase()) > -1);
			filtered.map(item => (splitAddress(item.Latitude, item.Longitude)
			));
		}

	};

	const splitAddress = (Latitude, Longitude) => {
		console.log('splitAddress');
		setLatitude(Latitude);
		setLongitude(Longitude);
		setMarkerLatitude(MarkerLatitude);
		setMarkerLongitude(MarkerLongitude);
		rest.formik.setFieldValue('Latitude', Latitude);
		rest.formik.setFieldValue('Longitude', Longitude);
	};
	const onMarkerDragEnd = (event, setFieldValue) => {

		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();
		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address;
				rest.formik.setFieldValue('location', address);
				setLatitude(newLat);
				setLongitude(newLng);
				setMarkerLatitude(newLat);
				setMarkerLongitude(newLng);
				rest.formik.setFieldValue('Latitude', newLat);
				rest.formik.setFieldValue('Longitude', newLat);
			},
			error => {
				console.error(error);
			}
		);
	};

	const goToAdditionalPage = async (values) => {
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

		<FormContainer title="Provider Details">

			<Form >
				<label htmlFor="location"
					className={
						rest.formik.errors.location && rest.formik.touched.location ? "input-feedback" : "text-label"}
				>Add a Location</label>
				<div className="inner-render">

					<AutoCompletTypeField
						items={items}
						name="location"
						formikProps={rest}
						value={rest.formik.values.location}
						onChange={handleAddressChange}
						onSelect={handleAddressSelect}
					/>

				</div>
				<Collaspe address={rest.formik.values.location} lat={Latitude} lng={Longitude} markerLat={MarkerLatitude} onMarkerDragEnd={e => (onMarkerDragEnd(e, setFieldValue))} />


				<br /><br />
				<br /><br />

				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.location}
						touched={rest.formik.touched.location} />
				</div>

				<label htmlFor="describeTheProblem"
					className={
						rest.formik.errors.describeTheProblem && rest.formik.touched.describeTheProblem ? "input-feedback" : "text-label"}
				>Describe the Problem</label>

				<Field
					type="text"
					name="describeTheProblem"
					className={`text-input ${rest.formik.errors.describeTheProblem && rest.formik.touched.describeTheProblem ? "error" : ""}`}
				/>
				<Field
					type="hidden"
					name="Latitude"

				/>
				<Field
					type="hidden"
					name="Longitude"

				/>
				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.describeTheProblem}
						touched={rest.formik.touched.describeTheProblem} />
				</div>
				<input type="button" className="seButton" onClick={goServiceRequestForm} value="Previous" />
				<input type="button" className="seButton" onClick={goToAdditionalPage} value="Next" />

			</Form>

		</FormContainer>
	);


}
export default connect(providerDetails);


