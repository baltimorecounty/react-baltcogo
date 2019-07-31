
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
import IssueType from './IssueType';
import DescribeTheProblem from './describeTheProblem';
import { SubmitReport } from "../services/ReportService";
import { HasResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import SeButton from './SeButton';
import { GoHome, Go, Routes } from "../Routing";
import Note from "./Note";
import { GetSubCategory } from '../utilities/CategoryHelpers';

Geocode.setApiKey('AIzaSyAqazsw3wPSSxOFVmij32C_LIhBSuyUNi8');

const provideDetails = props => {
	const { formik = {} } = props;
	const {
		MapPage,
		location,
		ContactID,
		describeTheProblem,
		Tabs,
		requiresLocation,
		shouldDisableForm,
		isPanelRequired,
		Latitude,
		Longitude,
		AdditionalInfoPage
	} = formik.values;
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

		formik.setFieldValue('currentTab', 'ProviderDetail');
		if (!ContactID || IsFormInComplete(formik)) {
			GoHome(props);
		}

		fetchData();
	},
	[query]);

	const { Categories = [] } = formik.values;
	const subCategoryId = formik.values.subRequestTypeID;
	const subCategory = GetSubCategory(Categories, subCategoryId);


	const reverseGeocode = async (latitude, longitude) => {
		const mapReverseEndPoint = returnMapEndPoint("mapReverseGISEndPoint");
		const result = await axios(
			`${mapReverseEndPoint}${longitude}%2C${latitude}&f=pjson`,
		);
		return result;

	};

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
				}
				catch (ex) {
					rest.formik.setFieldValue('location', '');
					rest.formik.setFieldTouched('location', true);
					rest.formik.errors.location = 'You must select a location inside Baltimore County.';
				}
			}
		)

	};

	const goToAdditionalPage = async () => {
		const isDetailsFormValid = await validateDetails(formik.values);

		if (isDetailsFormValid) {
			const addressParts = location.split(',');
			rest.formik.setFieldValue('describeTheProblem', describeTheProblem);
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

	/**
	 * Determine if the given address is a valid Baltimore County address.
	 * Handles Errors in addition to returning whether or not the address is valid.
	 * TODO: // https://github.com/baltimorecounty/react-baltcogo/issues/80
	 *
	 * @param {string} address - address to validate
	 * @param {function} errorFunc - function to handle errors
	 * @param {string} errorMessage - string that displays a meaningful message to the user
	 * @returns {bool} returns true if address is valid.
	 */
	const verifyAddress = async (address, addressProperty = 'location') => {
		formik.setFieldTouched(addressProperty, true); // Hack since we aren't using default validation and submit

		if (!address) {
			return false;
		}

		try {
			const addressResponse = await VerifyAddress(address);
			if (HasResponseErrors(addressResponse)) {
				formik.setStatus({ [addressProperty]: "Please enter a valid Baltimore County address." });
				return false;
			}
			return true;
		}
		catch (ex) {
			formik.setStatus({ [addressProperty]: 'Something went wrong please try again in a few moments.' });
		}
		return false;
	};

	// TODO: This should be moved to a Yup.js schema and handled accordingly.
	// https://github.com/baltimorecounty/react-baltcogo/issues/80
	const verifyProblemComment = (problem) => {
		const fieldName = 'describeTheProblem';
		formik.setFieldTouched(fieldName, true); // Hack since we aren't using default validation and submit
		if (!problem) {
			return false;
		}

		return true;
	};

	/**
	 * Validates the provide details panel's form
	 * TODO: This should be moved to a Yup.js schema and handled accordingly.
	 * https://github.com/baltimorecounty/react-baltcogo/issues/80
	 *
	 * @param {array} values - formik form values
	 * @returns {bool} - true if the provide details form is valid
	 */
	const validateDetails = async (values) => {
		var isValidProblem = verifyProblemComment(values.describeTheProblem);
		var isValidAddress = await verifyAddress(values.location);
		return isValidAddress && isValidProblem;
	};

	const SubmitForm = async (clickEvent) => {
		formik.setSubmitting(true);
		const isDetailsFormValid = await validateDetails(formik.values);

		if (isDetailsFormValid) {
			await SubmitReport(clickEvent, props);
		}
		formik.setSubmitting(false);
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
						formik.errors.location && formik.touched.location ? "cs-form-control address-search error" : "cs-form-control address-search"}>
						<label>{MapPage.DetailsMainLabel}</label>
						<p>
							{MapPage.DetailsMainLabelExplanation}
						</p>
						<IssueType
							name="location"
							formik={formik}
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
				{subCategory && !subCategory.shouldDisableForm && subCategory.note && <Note>{subCategory.note}</Note>}
				<DescribeTheProblem
					name="describeTheProblem"
					formik={formik}
					errorsDescribeTheProblem={rest.formik.errors.describeTheProblem}
					touchedDescribeTheProblem={rest.formik.touched.describeTheProblem}
					pageFieldName={MapPage.ProblemLabel} />

				<p className="smallest">
					{AdditionalInfoPage.LegalDisclaimerBottom}
				</p>

				<div className="cs-form-control" >
					<SeButton
						onClick={goServiceRequestForm}
						text="Previous"
					/>
					{(!rest.formik.values.requestTypeAddressID) ?
						<SeButton
							text="File Your Report"
							onClick={SubmitForm}
							isLoading={formik.isSubmitting}
							isLoadingText="Submitting Request..."
							className="pull-right"
						/>
						:
						<SeButton
							text="Next"
							onClick={goToAdditionalPage}
							className="pull-right"
						/>}
				</div>
			</Form>
		</FormContainer>
	);
}
export default connect(provideDetails);


