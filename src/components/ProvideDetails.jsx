
import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";

import FormContainer from './FormContainer';
import Geocode from "react-geocode";
import Collaspe from './Collaspe'
import axios from "axios"
import _ from 'lodash';
import { IsFormInComplete } from "../utilities/FormHelpers";
import { returnMapEndPoint } from "../utilities//returnEnvironmentItems"
import { VerifyAddress } from '../services/authService';
import ButtonDisplay from "./buttonDisplay";
import IssueType from './IssueType';
import DescribeTheProblem from './describeTheProblem';
import { SubmitReport } from "../services/ReportService";
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import SeButton from './SeButton';
import { GoHome, Go, Routes } from "../Routing";

Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');


const provideDetails = props => {
	const { MapPage, location, ContactID,
		describeTheProblem, Tabs, requiresLocation, shouldDisableForm, isPanelRequired, Latitude, Longitude } = props.formik.values;

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [updatedLatitude, setLatitude] = useState(Latitude);
	const [updatedLongitude, setLongitude] = useState(Longitude);
	const [MarkerLatitude, setMarkerLatitude] = useState(18.5204);
	const [Address, setData] = useState([]);
	const [query, setQuery] = useState(encodeURIComponent());

	useEffect(() => {

		const fetchData = async () => {
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
		if (!ContactID || IsFormInComplete(props.formik)) {
			GoHome(props);
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
		return (location === "" || describeTheProblem === '') ? true : false;
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
		setQuery(val);

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

			const errorsReturned = GetResponseErrors(addressResponse);
			rest.formik.setFieldValue('ShowErrorMsg', 1);
			rest.formik.errors.location = errorsReturned;
		}
		else {
			const addressParts = location.split(',');
			rest.formik.setFieldValue('requestTypeDescription', describeTheProblem);
			rest.formik.setFieldValue('subRequestTypeAddress', addressParts[0]);
			rest.formik.setFieldValue('subRequestTypeCity', addressParts[1]);
			rest.formik.setFieldValue('subRequestTypeZip', (addressParts.length === 3) ? addressParts[2] : addressParts[3]);
			Go(props, Routes.AdditionalInformation);
		}
	}

	const goServiceRequestForm = (values) => {
		GoHome(props);
	};

	const { values, errors, actions, touched, handleSubmit, setFieldValue, ...rest } = props;
	const items = Address.map((item, index) => ({
		id: item.Latitude + item.Longitude,
		label: `${item.StreetAddress.toUpperCase()}, ${item.City.toUpperCase()}, ${item.Zip}`,
	}));

	const SubmitForm = async (clickEvent) => {
		setIsSubmitting(true);
		await SubmitReport(clickEvent, props);
		setIsSubmitting(false);
	};

	return (

		<FormContainer title={MapPage.DetailsTitle}
			tabNames={Tabs}
			currentTab="ProvideDetails"
			shouldDisableForm={shouldDisableForm}
			isPanelRequired={isPanelRequired}
		>
			<Form>
				<Field type="hidden" name="Latitude" />
				<Field type="hidden" name="Longitude" />
				<Field type="hidden" name="ShowErrorMsg" />
				{(requiresLocation) ?
					<div className={
						rest.formik.errors.location && rest.formik.touched.location ? "cs-form-control address-search error" : "cs-form-control address-search"}>
						<label>{MapPage.DetailsMainLabel}</label>
						<p>
							{MapPage.DetailsMainLabelExplanation}
						</p>
						<IssueType
							rest={rest}
							items={items}
							handleAddressChange={handleAddressChange}
							handleAddressSelect={handleAddressSelect}
							pageFieldName={MapPage.AddressHeaderLabel} />

						<Collaspe address={rest.formik.values.location}
							ZoomValue={rest.formik.values.ZoomValue}
							lat={updatedLatitude}
							lng={updatedLongitude}
							onZoom={onZoom}
							markerLat={MarkerLatitude}
							onMarkerDragEnd={e => (onMarkerDragEnd(e, setFieldValue))} />

					</div> :
					null}
				<DescribeTheProblem
					errorsDescribeTheProblem={rest.formik.errors.describeTheProblem}
					touchedDescribeTheProblem={rest.formik.touched.describeTheProblem}
					pageFieldName={MapPage.ProblemLabel} />

				<div className="cs-form-control" >
					<ButtonDisplay
						onClick={goServiceRequestForm}
						buttonName="Previous"
						cssClass="seButton" />
					{(!rest.formik.values.requestTypeAddressID) ?
						<SeButton
							text="File Your Report"
							onClick={SubmitForm}
							isDisabled={displayButton}
							isLoading={isSubmitting}
							isLoadingText="Submitting Request..."
							className="pull-right"
						/>
						:
						<ButtonDisplay
							onClick={goToAdditionalPage}
							disabled={displayButton}
							buttonName="Next"
							cssClass="seButton pull-right" />}
				</div>
			</Form>
		</FormContainer>
	);
}
export default connect(provideDetails);


