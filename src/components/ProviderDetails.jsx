
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

		<FormContainer title="Add a Location">

			<Form >
				<p>
					Tell us where the issue is located. You can enter an address
					or mark the location on the map.
				</p>
				<div class="cs-form-control address-search">
					<label htmlFor="location"
						className={
							rest.formik.errors.location && rest.formik.touched.location ? "error-message" : "text-label"}
					>Enter the closest street address to your service
				request </label>
					

					<AutoCompletTypeField

						items={items}
						name="location"
						formikProps={rest}
						value={rest.formik.values.location}
						onChange={handleAddressChange}
						onSelect={handleAddressSelect}
					/>
					<i class="fa fa-search address-search-icon" aria-hidden="true"></i>

					{/* 		<Autocomplete
						getItemValue={item => item.label}
						id="location"
						items={items}
						renderItem={(item, isHighlighted) => (
							<div key={_.uniqueId()}
								id="location"
								style={{ background: isHighlighted ? "lightgray" : "white" }}
							>
								{item.label}
							</div>
						)}
						value={rest.formik.values.location}
						onChange={e => handleAddressChange(e, rest.formik.setFieldValue)}
						onSelect={val => handleAddressSelect(val, rest.formik.setFieldValue)}

						className={`text-input ${rest.formik.errors.location && rest.formik.touched.location ? "error" : ""}`}
					/> */}
				</div>
				
				<Collaspe address={rest.formik.values.location} lat={Latitude} lng={Longitude} markerLat={MarkerLatitude} onMarkerDragEnd={e => (onMarkerDragEnd(e, setFieldValue))} />


				<br /><br />
				<br /><br />

				<div className="error">
					<p role='alert' className="error-message">
						<ErrorMsg
							errormessage={rest.formik.errors.location}
							touched={rest.formik.touched.location} />
					</p>
				</div>

				<label htmlFor="describeTheProblem"
					className={
						rest.formik.errors.describeTheProblem && rest.formik.touched.describeTheProblem ? "error-message" : "text-label"}
				>Describe the Problem</label>

				<Field
					component="textarea"
					maxlength = "2000"
					rows="5"
					placeholder ="Maximum 2,000 characters."
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
				<div className="error">
					<p role='alert' className="error-message">
						<ErrorMsg
							errormessage={rest.formik.errors.describeTheProblem}
							touched={rest.formik.touched.describeTheProblem} />
					</p>
				</div>
				<br />
				<input type="button" class="seButton" onClick={goServiceRequestForm} value="Previous" />
				<input type="button" class="seButton pull-right" onClick={goToAdditionalPage} value="Next" />

			</Form>

		</FormContainer>
	);


}
export default connect(providerDetails);


