import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import axios from "axios"
import ErrorMsg from "./ErrorMessage";
import { ErrorCheck } from "./CustomErrorHandling";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";
import RequestSubTypeField from "./RequestSubTypeField";
import RequestPetTypeField from "./RequestPetTypeField";
import QueryString from 'query-string';
import GenericTypeField from "./genericTypeField";
import Model from './Modal';
import { jsonFileLocations } from "./config";
import WaterAndSewerIssue from "./waterAndSewerIssue";
import TrashAndRecycle from "./trashAndRecycle";
import { GetContactAddress } from './authService';


const { categoryId } = QueryString.parse(window.location.search);
const contactID = sessionStorage.getItem("UserLoginID");

const getSubCategories = (categories, categoryName) => {
	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.types : [];
};
const getSubCategoriesIncludedDescription = (categories, categoryName) => {
	var subInfo = categories.find(category => category.name.toLowerCase() === categoryName);
	return subInfo ? subInfo : '';
};
const getIncludedDescriptions = (categories, categoryName) => {
	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.description : '';
};
const getIncludedFields = (categories, categoryName) => {
	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.fields : [];
};
const getNote = (subCategories, name) => {
	var type = subCategories.find(subcategoryname => subcategoryname.name.toLowerCase() === name);
	return type ? type.note : [];
};

const getshouldDisableForm = (subCategories, name) => {
	var type = subCategories.find(subcategoryname => subcategoryname.name.toLowerCase() === name);
	return type ? type.shouldDisableForm : [];
};
const getAnimalSubCategories = (AnimalBreeds, animalName) => {
	var animalCats = AnimalBreeds.find(animal => animal.animal.toLowerCase() === animalName);
	return animalCats ? animalCats : [];
};
const getID = (categories, categoryName) => {
	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.id : [];
};

const ServiceRequestForm = (props, errors, touched) => {

	//const requestType_petAndAnimalIssue = 'Pets and Animals Issue'; //Production Value
	const requestType_petAndAnimalIssue = 'Pets and Animals'; //test value
	const petAndAnimalIssueID_OtherAnimalComplaint = 'Other animal complaint';
	const requestType_WebSiteIssue = 'Website Issue';
	const subCategory_OtherWebsiteProblem = 'Other website problem';
	const requestType_TrashRecycleIssue = 'Trash and Recycling Issue';
	const requestType_WaterandSewerIssues = 'Water and Sewer Issues';
	const subCategory_CanOrLidLostDamaged = 'Can or lid lost or damaged';
	const subCategory_PropertyDamangeDuringCollecttion = 'Property damage during collection';
	const subCategory_RecyclingNotCollected = 'Recycling not collected';
	const subCategory_RequestToStartNewCollection = 'Request to start new collection';
	const subCategory_TrashNotCollected = 'Trash not collected';
	const subCategory_YardWasteNotCollected = 'Yard waste not collected';
	const requestType_RoadSidewalkIssue = 'Roads and Sidewalks Issue';
	const subCategory_IcyConditions = 'Icy conditions';
	const subCategory_SewerIssues = 'Sewer issues';
	const subCategory_StormWaterIssues = 'Stormwater issues';
	const subCategory_WaterSupplyIssues = 'Water supply issues';
	const petTypeCat = 'cat';
	const petTypeDog = 'dog';
	const petTypeHorse = 'horse';
	const petType_Others = 'other';
	const [Categories, setData] = useState([]);
	const [PetTypes, setPetTypes] = useState([]);
	const [AnimalBreeds, setAnimalBreeds] = useState([]);
	const [AnimalColors, setAnimalColors] = useState([]);
	const [OtherAnimalTypes, setOtherAnimalTypes] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [notes, setNotes] = useState();
	const [animalSubCategories, setAnimalSubCategories] = useState([]);
	const [animalSex, setAnimalSex] = useState([]);

	try {
		useEffect(() => {
			const fetchData = async () => {
				const result = await axios(
					jsonFileLocations.results,
				);
				const resultPetTypes = await axios(
					jsonFileLocations.resultPetTypes,
				);
				const resultAnimalBreeds = await axios(
					jsonFileLocations.resultAnimalBreeds,
				);
				const resultAnimalColors = await axios(
					jsonFileLocations.resultAnimalColors,
				);
				const resultAnimalTypes = await axios(
					jsonFileLocations.resultAnimalTypes,
				);
				setData(result.data);
				setPetTypes(resultPetTypes.data);
				setAnimalBreeds(resultAnimalBreeds.data);
				setAnimalColors(resultAnimalColors.data);
				setOtherAnimalTypes(resultAnimalTypes.data);
				props.formik.setFieldValue('ContactID', contactID);
			};

			fetchData();
		}, []);
	}
	catch (ex) {

		console.log(ex);
	}

	const handleServiceRequestChange = (changeEvent) => {

		const value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(Categories, value)

		props.formik.setFieldValue('requestTypeID', ID);

		const subCategories = getSubCategories(Categories, value ? value : value);
		setSubCategories(subCategories);

		const description = getIncludedDescriptions(Categories, value ? value : value);
		const fields = getIncludedFields(Categories, value ? value : value);

		props.formik.setFieldValue('requestTypeDescriptionID', description);

		pullServiceRequestFields(fields);
	};

	const pullServiceRequestFields = (fields) => {
		if (fields !== undefined) {
			props.formik.setFieldValue('requestTypeAddressID', fields.streetAddress);
			props.formik.setFieldValue('requestTypeCityID', fields.city);
			props.formik.setFieldValue('requestTypeZipID', fields.zipCode);
		}
	};



	const handleServiceSubRequestChange = (changeEvent) => {

		const value = changeEvent.currentTarget.value.toLowerCase();
		const subInfo = getSubCategoriesIncludedDescription(subCategories, value ? value : value);
		let ID = getID(subCategories, value);
		const isDisabled = getshouldDisableForm(subCategories, value);
		const notes = getNote(subCategories, value);
		setNotes(<div className="alert-information bc_alert" >
			<i className="fa fa-icon fa-2x fa-info-circle"></i>
			<p dangerouslySetInnerHTML={{ __html: notes }}></p>
		</div>);

		props.formik.setFieldValue('subRequestTypeID', ID);
		props.formik.setFieldValue('shouldDisableForm', isDisabled);

		if (subInfo !== undefined) {
			if (subInfo.description !== undefined) {
				props.formik.setFieldValue('subRequestTypeDescriptionID', subInfo.description);
			}
			if (subInfo.streetAddress !== undefined) {
				props.formik.setFieldValue('subRequestTypeAddressID', subInfo.streetAddress);
			}
			if (subInfo.city !== undefined) {
				props.formik.setFieldValue('subRequestTypeCityID', subInfo.city);
			}
			if (subInfo.zipCode !== undefined) {
				props.formik.setFieldValue('subRequestTypeZipID', subInfo.zipCode);
			}
		}
	};

	const handleServicePetChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(PetTypes, value)
		const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex);
		props.formik.setFieldValue('petTypeID', ID);
	};

	const handleAnimalColorChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(AnimalColors, value);
		props.formik.setFieldValue('animalColorTypeID', ID);
	}

	const handleOtherPetTypeChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(OtherAnimalTypes, value);
		props.formik.setFieldValue('otherAnimalTypesID', ID);
	}

	const handlePetSexChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSex, value);
		props.formik.setFieldValue('sexTypeID', ID);
	}

	const handleAnimalBreedChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSubCategories, value);
	}

	const checkPetType = (value) => {
		value = value.toLowerCase();
		var animalCats = AnimalBreeds.find(animal => animal.animal === value);
		if (animalCats !== undefined) {
			return true;
		}
		else {
			return false;
		}
	}

	const buttonShowHideValidation = () => {
		let requestType = rest.formik.values['requestType'].toLowerCase();
		let subRequestType = rest.formik.values['subRequestType'].toLowerCase();

		if (requestType === requestType_WaterandSewerIssues.toLowerCase()
				&& (subRequestType === subCategory_SewerIssues.toLowerCase() ||
				subRequestType === subCategory_StormWaterIssues.toLowerCase() ||
				subRequestType === subCategory_WaterSupplyIssues.toLowerCase()
				)) {
			return false;
		}
		else
		{
			return true;
		}
	}

	const buttonDisableValidation = () => {

		let requestType = rest.formik.values['requestType'].toLowerCase();
		let subRequestType = rest.formik.values['subRequestType'].toLowerCase();

		if (requestType !== ''
			&& subRequestType !== '') {
			if (requestType === requestType_RoadSidewalkIssue.toLowerCase()
				&& subRequestType === subCategory_IcyConditions.toLowerCase()) {
				return true;
			}
			else if ((requestType === requestType_WaterandSewerIssues.toLowerCase())
				&& (subRequestType === subCategory_SewerIssues.toLowerCase() ||
				subRequestType === subCategory_StormWaterIssues.toLowerCase() ||
				subRequestType === subCategory_WaterSupplyIssues.toLowerCase()
				)) {
				return true;
			}
			else if ((requestType === requestType_TrashRecycleIssue.toLowerCase())
				&& (subRequestType === subCategory_CanOrLidLostDamaged.toLowerCase() ||
				subRequestType === subCategory_PropertyDamangeDuringCollecttion.toLowerCase() ||
				subRequestType === subCategory_RecyclingNotCollected.toLowerCase() ||
				subRequestType === subCategory_RequestToStartNewCollection.toLowerCase() ||
				subRequestType === subCategory_TrashNotCollected.toLowerCase() ||
				subRequestType === subCategory_YardWasteNotCollected.toLowerCase()
				)) {
				return true;
			}
			else if (requestType === requestType_petAndAnimalIssue.toLowerCase()
				&& subRequestType !== ''
				&& rest.formik.values['petType'] === '') {
				return true;
			}
			else if (requestType === requestType_petAndAnimalIssue.toLowerCase()
				&& subRequestType !== ''
				&& rest.formik.values['petType'] !== ''
				&& (rest.formik.values['petType'].toLowerCase() === petTypeCat.toLowerCase()
					|| rest.formik.values['petType'].toLowerCase() === petTypeDog.toLowerCase())

				&& rest.formik.values['animalColorType'] === '') {
				console.log('Pett ---Is it here ----');
				return true;
			}
			else if (requestType === requestType_petAndAnimalIssue.toLowerCase()
				&& subRequestType !== ''
				&& (rest.formik.values['petType'] !== ''
					&& (rest.formik.values['petType'].toLowerCase() === petType_Others.toLowerCase()
						&& rest.formik.values['otherAnimalTypes'] === ''))) {
				return true;
			}
			else if (requestType === 'website issue' && rest.formik.values['serviceDescription'].trim() === '') {
				return true;
			}
			else {
				console.log('--it it here---');
				return false;
			}
		}
		else {
			return true;
		}
	}

	const goToNextPage = async() =>{
		try{
			const getAddressResponse = await GetContactAddress(contactID);
			
			if (getAddressResponse.data.HasErrors === true) {
				const errorsReturned = ErrorCheck(getAddressResponse);
				throw new Error(errorsReturned);
			}
			else {
				const addressParts = getAddressResponse.data.Results[0].FormattedAddress.split(',');
				props.formik.setFieldValue('requestTypeAddress', addressParts[0]);
				props.formik.setFieldValue('requestTypeCity', addressParts[1]);
				props.formik.setFieldValue('requestTypeZip', addressParts[3]);
				props.formik.setFieldValue('streetAddress', addressParts[0]);
				props.formik.setFieldValue('city', addressParts[1]);
				props.formik.setFieldValue('zipCode', addressParts[3]);
				props.history.push('/ProvideDetails');
			}
		}
		catch (ex){
		}
	}

	const callSignInForm = () => {
		props.history.push("/SignInForm");
	}

	const callRegisterForm = () => {
		props.history.push("/SignUpForm");
	}

	const { values, isSubmitting, ...rest } = props;

	const loadSelectedItems = (props) => {
		let requestType = props.formik.values['requestType'];

		if (Categories.length > 0 && PetTypes.length > 0
			&& AnimalBreeds.length > 0 && AnimalColors.length > 0 && OtherAnimalTypes.length > 0) {
			if (requestType !== '') {
				if (subCategories.length === 0) {
					const value = requestType.toLowerCase();
					const subCategories = getSubCategories(Categories, value ? value : value);
					setSubCategories(subCategories);
					if (props.formik.values['petType'] !== '') {
						let value = props.formik.values['petType'].toLowerCase();
						const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
						setAnimalSubCategories(subBreeds.breeds);
						setAnimalSex(subBreeds.sex);
					}
				}
			}
		}
	};
	loadSelectedItems(props);
	let disableButton = buttonDisableValidation();
	let displayButton = buttonShowHideValidation();
	const localProps = props.formik;
	return (

		<FormContainer title="How Can We Help?" currentTab = "ServiceRequestForm" shouldDisableForm = {props.formik.values.shouldDisableForm}>
			<Form>
				<div className={
					localProps.errors.requestType && localProps.touched.requestType ? "cs-form-control error" : "cs-form-control"}>
					<label htmlFor="requestType">Request Category</label>
					<RequestTypeField
						component="select"
						name="requestType"
						formikProps={rest}
						onChange={handleServiceRequestChange}
						value={categoryId}
					>
						<option key='default' value=''>--Please select a category--</option>
						{Categories.map(category => (
							<option key={category.id} value={category.name}>{category.name}</option>
						))}
					</RequestTypeField>
					<p role='alert' className="error-message">
						<ErrorMsg
							errormessage={localProps.errors.requestType}
							touched={localProps.touched.requestType} />
					</p>
				</div>
				{
					localProps.values['requestType'] !== '' ?
						<div className={
							localProps.errors.subRequestType && localProps.touched.subRequestType ? "cs-form-control error" : "cs-form-control"}>
							<label name="subRequestType" htmlFor="subRequestType">Request Sub-Category</label>
							<RequestSubTypeField
								component="select"
								name="subRequestType"
								formikProps={rest}
								onChange={handleServiceSubRequestChange}
								value={localProps.values.subRequestType}
							>
								<option key='default' value=''>--Please select a sub-category--</option>
								{subCategories.map(category => (
									<option key={category.id} value={category.name}>{category.name}</option>
								))}

							</RequestSubTypeField>
						
							<p role='alert' className="error-message">
								<ErrorMsg
									errormessage={localProps.errors.subRequestType}
									touched={localProps.touched.subRequestType} />
							</p>
						</div>: null
				}
				{
					<WaterAndSewerIssue
						requestType={props.formik.values['requestType'].toLowerCase()}
						subRequestType={props.formik.values['subRequestType'].toLowerCase()}
						WaterandSewerIssues={requestType_WaterandSewerIssues}
						SewerIssues={subCategory_SewerIssues}
						StormWaterIssues={subCategory_StormWaterIssues}
						WaterSupplyIssues={subCategory_WaterSupplyIssues}
						notes={notes} />
				}
				{	
					<TrashAndRecycle
						requestType={props.formik.values['requestType'].toLowerCase()}
						subRequestType={props.formik.values['subRequestType'].toLowerCase()}
						TrashRecycleIssue={requestType_TrashRecycleIssue.toLowerCase()}
						CanOrLidLostDamaged={subCategory_CanOrLidLostDamaged}
						PropertyDamangeDuringCollecttion={subCategory_PropertyDamangeDuringCollecttion}
						RecyclingNotCollected={subCategory_RecyclingNotCollected}
						RequestToStartNewCollection={subCategory_RequestToStartNewCollection}
						TrashNotCollected={subCategory_TrashNotCollected}
						YardWasteNotCollected={subCategory_YardWasteNotCollected}
						notes={notes}
					/>
				}
				{ /* Roads and Sidewalks Issue -- icy condition*/
					(localProps.values['requestType'].toLowerCase() === requestType_RoadSidewalkIssue.toLowerCase()
						&& localProps.values['subRequestType'].toLowerCase() === subCategory_IcyConditions.toLowerCase()) ? notes : null

				}
				{/* Pets and Animal Issue - Other animal complaint */

					(localProps.values['requestType'].toLowerCase() === requestType_petAndAnimalIssue.toLowerCase()
						&& localProps.values['subRequestType'].toLowerCase() === petAndAnimalIssueID_OtherAnimalComplaint.toLowerCase()) ? notes
						: null
				}
				{/* Website Issue - Other website problem */

					(localProps.values['requestType'].toLowerCase() === requestType_WebSiteIssue.toLowerCase()
						&& localProps.values['subRequestType'].toLowerCase() === subCategory_OtherWebsiteProblem.toLowerCase()) ? notes
						: null
				}
				{
					localProps.values['requestType'] === requestType_petAndAnimalIssue && localProps.values['subRequestType'] !== '' ?
						<div className={
							localProps.errors.petType && localProps.touched.petType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="petType">Pet Type</label>
							<RequestPetTypeField
								component="select"
								name="petType"
								formikProps={rest}
								onChange={handleServicePetChange}
								//value={props.formik.values.name}
								className={localProps.errors.petType && localProps.touched.petType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet type--</option>
								{PetTypes.map(petType => (
									<option key={petType.id} value={petType.name}>{petType.name}</option>
								))}
							</RequestPetTypeField>
							<p role='alert' className="error-message">
								{<ErrorMsg
									errormessage={localProps.errors.petType}
									touched={localProps.touched.petType} />}
							</p>
						</div>
						: null
				}
				{
					(localProps.values['subRequestType'] !== '' && localProps.values['petType'].toLowerCase() === petType_Others) ?
						<div className={
							localProps.errors.otherAnimalTypes && localProps.touched.otherAnimalTypes ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="otherAnimalTypes">Other pet type</label>
							<GenericTypeField
								component="select"
								name="otherAnimalTypes"
								formikProps={rest}
								onChange={handleOtherPetTypeChange}
								//	value={props.formik.values.name}
								className={localProps.errors.otherAnimalTypes && localProps.touched.otherAnimalTypes ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select an "other" pet type--</option>
								{OtherAnimalTypes.map(OtherAnimalType => (
									<option key={OtherAnimalType.id} value={OtherAnimalType.name}>{OtherAnimalType.name}</option>
								))}

							</GenericTypeField>

							<p role='alert' className="error-message">
								{<ErrorMsg
									errormessage={localProps.errors.otherAnimalTypes}
									touched={localProps.touched.otherAnimalTypes} />}
							</p>
						</div>
						: null
				}
				{
					((localProps.values['requestType'] === requestType_petAndAnimalIssue)
						&& localProps.values['subRequestType'] !== '')
						&& checkPetType(localProps.values['petType']) ?
						<div className={
							localProps.errors.sexType && localProps.touched.sexType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="sexType">Pet Sex (optional)</label>
							<GenericTypeField
								component="select"
								name="sexType"
								formikProps={rest}
								onChange={handlePetSexChange}
								//value={props.formik.values.name}
								className={localProps.errors.sexType && localProps.touched.sexType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet sex--</option>
								{animalSex.map(petSex => (
									<option key={petSex.id} value={petSex.name}>{petSex.name}</option>
								))}
							</GenericTypeField>

							<p role='alert' className="error-message">
								{<ErrorMsg
									errormessage={localProps.errors.sexType}
									touched={localProps.touched.sexType} />}
							</p>
						</div>
						: null
				}
				{
					(localProps.values['requestType'] === requestType_petAndAnimalIssue
						&& localProps.values['subRequestType'] !== '')
						&& (localProps.values['petType'].toLowerCase() === petTypeCat || localProps.values['petType'].toLowerCase() === petTypeDog) ?
						<div className={
							localProps.errors.animalColorType && localProps.touched.animalColorType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="animalColorType">Primary Animal Color</label>
							<GenericTypeField
								component="select"
								name="animalColorType"
								formikProps={rest}
								onChange={handleAnimalColorChange}
								//value={props.formik.values.name}
								className={localProps.errors.animalColorType && localProps.touched.animalColorType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary color of the animal--</option>

								{AnimalColors.map(animalColorType => (
									<option key={animalColorType.id} value={animalColorType.name}>{animalColorType.name}</option>
								))}

							</GenericTypeField>
							<p role='alert' className="error-message">
								{<ErrorMsg
									errormessage={localProps.errors.animalColorType}
									touched={localProps.touched.animalColorType} />}
							</p>
						</div>
						: null

				}
				{
					((localProps.values['requestType'] === requestType_petAndAnimalIssue && localProps.values['subRequestType'] !== '')
						&& (localProps.values['petType'].toLowerCase() === petTypeCat || localProps.values['petType'].toLowerCase() === petTypeDog)) ?
						<div className={
							localProps.errors.animalBreedType && localProps.touched.animalBreedType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="animalBreed">Primary Animal Breed(optional)</label>
							<GenericTypeField
								component="select"
								name="animalBreedType"
								formikProps={rest}
								onChange={handleAnimalBreedChange}
								//value={props.formik.values.animalBreedType}
								className={localProps.errors.animalBreedType && localProps.touched.animalBreedType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary breed of the animal--</option>
								{animalSubCategories.map(animalBreedType => (
									<option key={animalBreedType.id} value={animalBreedType.name}>{animalBreedType.name}</option>
								))}
							</GenericTypeField>
							<p role='alert' className="error-message">
								{<ErrorMsg
									errormessage={localProps.errors.animalBreedType}
									touched={localProps.touched.animalBreedType} />}

							</p>
						</div>
						: null
				}
				{(localProps.values['requestType'].toLowerCase() === 'website issue') ?
					<div className={
						localProps.errors.serviceDescription && localProps.touched.serviceDescription ? "cs-form-control error" : "cs-form-control"}>
						<label htmlFor="serviceDescription">Service Request Description</label>
						<Field type='text'
							name="serviceDescription"
							className={localProps.errors.serviceDescription && localProps.touched.serviceDescription ? "text-select error" : null}
						/>

						<p role='alert' className="error-message">
							{<ErrorMsg
								errormessage={localProps.errors.serviceDescription}
								touched={localProps.touched.serviceDescription} />}
						</p>
					</div> : null

				}
				<Field type="hidden" name="requestTypeID" />
				<Field type="hidden" name="requestTypeDescriptionID" />
				<Field type="hidden" name="requestTypeAddressID" />
				<Field type="hidden" name="requestTypeCityID" />
				<Field type="hidden" name="requestTypeZipID" />
				<Field type="hidden" name="subRequestTypeID" />
				<Field type="hidden" name="subRequestTypeDescriptionID" />
				<Field type="hidden" name="subRequestTypeAddressID" />
				<Field type="hidden" name="subRequestTypeCityID" />
				<Field type="hidden" name="subRequestTypeZipID" />
				<Field type="hidden" name="petTypeID" />
				<Field type="hidden" name="animalBreedID" />
				<Field type="hidden" name="sexTypeID" />
				<Field type="hidden" name="animalColorTypeID" />
				<Field type="hidden" name="otherAnimalTypesID" />
				
				{(displayButton === true) ? 
					(contactID === null) ? 
						(<div>
							<input type="button" className="seButton" onClick={callSignInForm} disabled={disableButton} value="Sign In" />
							<input type="button" className="seButton pull-right" onClick={callRegisterForm} disabled={disableButton} value="Register" />
							<Model />
						</div>) : <input type="button" className="seButton pull-right" onClick={goToNextPage} value="Next" /> : "" } 
			</Form>
		</FormContainer>
	);
}

export default connect(ServiceRequestForm);





