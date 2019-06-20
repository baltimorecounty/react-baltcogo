import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import axios from "axios"
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";
import RequestSubTypeField from "./RequestSubTypeField";
import RequestPetTypeField from "./RequestPetTypeField";
import QueryString from 'query-string';
import GenericTypeField from "./genericTypeField";
//import PetTypes from "./pettypes.json";
//import AnimalBreeds from "./animalbreeds.json";
//import AnimalColors from "./animalcolors.json"
import Model from './Modal'
import { jsonFileLocations } from "./config"

const { categoryId } = QueryString.parse(window.location.search);
const contactID = sessionStorage.getItem("UserLoginID");

const getSubCategories = (categories, categoryName) => {
	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.types : [];
};
const getNote = (subCategories, name) => {
	var type = subCategories.find(subcategoryname => subcategoryname.name.toLowerCase() === name);
	return type ? type.note : [];
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

	const requestType_petAndAnimalIssue = 'Pets and Animals Issue';
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
	};
	const handleServiceSubRequestChange = (changeEvent) => {

		const value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(subCategories, value)
		const notes = getNote(subCategories, value);
		setNotes(<div><p>{notes}</p></div>);

		props.formik.setFieldValue('subRequestTypeID', ID);

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
		//props.formik.setFieldValue('animalColorType', value);
	}

	const handleOtherPetTypeChange = (changeEvent) => {

		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(OtherAnimalTypes, value);
		props.formik.setFieldValue('otherAnimalTypesID', ID);
		//props.formik.setFieldValue('otherAnimalTypes', value);
	}
	const handlePetSexChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSex, value);
		props.formik.setFieldValue('sexTypeID', ID);
		//props.formik.setFieldValue('sexType', value);
	}



	const handleAnimalBreedChange = (changeEvent) => {

		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSubCategories, value);

		props.formik.setFieldValue('animalBreedID', ID);
		//props.formik.setFieldValue('animalBreed', value);
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


		if (props.formik.values.requestType !== '' && props.formik.values.subRequestType !== '') {
			if (props.formik.values.requestType.toLowerCase() === requestType_RoadSidewalkIssue.toLowerCase()
				&& props.formik.values.subRequestType.toLowerCase() === subCategory_IcyConditions.toLowerCase()) {
				return true;
			}

			else if ((rest.formik.values['requestType'].toLowerCase() === requestType_WaterandSewerIssues.toLowerCase())
				&& (rest.formik.values['subRequestType'].toLowerCase() === subCategory_SewerIssues.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_StormWaterIssues.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_WaterSupplyIssues.toLowerCase()
				)) {
				return true;
			}
			else if ((rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase())
				&& (rest.formik.values['subRequestType'].toLowerCase() === subCategory_CanOrLidLostDamaged.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_PropertyDamangeDuringCollecttion.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_RecyclingNotCollected.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_RequestToStartNewCollection.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_TrashNotCollected.toLowerCase() ||
					rest.formik.values['subRequestType'].toLowerCase() === subCategory_YardWasteNotCollected.toLowerCase()
				)) {

				return true;
			}


			else if (rest.formik.values['requestType'].toLowerCase() === requestType_petAndAnimalIssue.toLowerCase()
				&& rest.formik.values['subRequestType'] !== ''
				&& rest.formik.values['petType'] !== ''
				&& (rest.formik.values['petType'].toLowerCase() !== petTypeHorse.toLowerCase()
					&& rest.formik.values['petType'].toLowerCase() !== petType_Others.toLowerCase())

				&& rest.formik.values['animalColorType'] === '') {

				return true;
			}
			else if (rest.formik.values['requestType'].toLowerCase() === requestType_petAndAnimalIssue.toLowerCase()
				&& rest.formik.values['subRequestType'] !== ''
				&& (rest.formik.values['petType'] !== ''
					&& (rest.formik.values['petType'].toLowerCase() === petType_Others.toLowerCase()
						&& rest.formik.values['otherAnimalTypes'] === ''))) {

				return true;
			}
			else if (rest.formik.values['requestType'].toLowerCase() === 'website issue' && rest.formik.values['serviceDescription'].trim() === '') {
				return true;
			}
			else {

				return false;
			}


		}
		else {

			return true;
		}


	}
	const callSignInForm = () => {
		if (contactID == null) {
			props.history.push("/SignInForm");
		}
		else {
			props.history.push('/ProviderDetails');
		}
	}
	const callRegisterForm = () => {

		props.history.push("/SignUpForm");
	}
	const goToNextPage = () => {
		props.history.push('/ProviderDetails');
	}
	const { values, isSubmitting, ...rest } = props;

	const routURLID = () => {
		var urlParts = window.location.href.split('categoryId=');
		return urlParts[1];
	}


	let displayButton = buttonShowHideValidation(props);

	return (


		<FormContainer title="How Can We Help?">

			<Form>
				<label htmlFor="requestType"
					className={
						rest.formik.errors.requestType && rest.formik.touched.requestType ? "error-message" : "text-label"}
				>Request Category</label>

				<RequestTypeField
					component="select"
					name="requestType"
					formikProps={rest}
					onChange={handleServiceRequestChange}
					onLoad={routURLID}
					value={categoryId}
				//value={props.formik.values.requestType}
				//hello 
				>
					<option key='default' value=''>--Please select a category--</option>
					{Categories.map(category => (
						<option key={category.id} value={category.name}>{category.name}</option>
					))}
				</RequestTypeField>
				<p role='alert' className="error-message">
					<ErrorMsg
						errormessage={rest.formik.errors.requestType}
						touched={rest.formik.touched.requestType} />
				</p>
				{
					rest.formik.values['requestType'] !== '' ?
						<div>
							<label name="subRequestType" htmlFor="subRequestType"
								className={
									rest.formik.errors.subRequestType && rest.formik.touched.subRequestType ? "input-feedback" : "text-label"}
							>
								Request Sub-Category
							</label>
							<RequestSubTypeField
								component="select"
								name="subRequestType"
								formikProps={rest}
								onChange={handleServiceSubRequestChange}
								value={props.formik.values.subRequestType}
							>
								<option key='default' value=''>--Please select a sub-category--</option>
								{subCategories.map(category => (
									<option key={category.id} value={category.name}>{category.name}</option>
								))}

							</RequestSubTypeField>
							<div className="input-feedback">
								<ErrorMsg
									errormessage={rest.formik.errors.subRequestType}
									touched={rest.formik.touched.subRequestType} />
							</div>
						</div>
						: null
				}
				{

					/* water and Sewer Issues --- Sewer Issues */
					/* water and Sewer Issues --- Sewer Issues */
					/* water and Sewer Issues --- Sewer Issues*/

					(rest.formik.values['requestType'].toLowerCase() === requestType_WaterandSewerIssues.toLowerCase())
						&& (rest.formik.values['subRequestType'].toLowerCase() === subCategory_SewerIssues.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_StormWaterIssues.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_WaterSupplyIssues.toLowerCase()
						) ? notes : null
				}


				{
					/* Can or lid lost or damaged*/
					/* Property damage during collection */
					/* Recycling not collected */
					/* Request to start new collection */
					/* Trash not collected */
					/* Yard waste not collected*/

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase())
						&& (rest.formik.values['subRequestType'].toLowerCase() === subCategory_CanOrLidLostDamaged.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_PropertyDamangeDuringCollecttion.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_RecyclingNotCollected.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_RequestToStartNewCollection.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_TrashNotCollected.toLowerCase() ||
							rest.formik.values['subRequestType'].toLowerCase() === subCategory_YardWasteNotCollected.toLowerCase()
						) ? notes : null

				}




				{ /* Roads and Sidewalks Issue -- icy condition*/
					(rest.formik.values['requestType'].toLowerCase() === requestType_RoadSidewalkIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_IcyConditions.toLowerCase()) ? notes : null

				}
				{/* Pets and Animal Issue - Other animal complaint */

					(rest.formik.values['requestType'].toLowerCase() === requestType_petAndAnimalIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === petAndAnimalIssueID_OtherAnimalComplaint.toLowerCase()) ? notes
						: null
				}
				{/* Website Issue - Other website problem */

					(rest.formik.values['requestType'].toLowerCase() === requestType_WebSiteIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_OtherWebsiteProblem.toLowerCase()) ? notes
						: null
				}
				{
					rest.formik.values['requestType'] === requestType_petAndAnimalIssue && rest.formik.values['subRequestType'] !== '' ?
						<div>
							<label htmlFor="petType"
								className={
									rest.formik.errors.petType && rest.formik.touched.petType ? "input-feedback" : "text-label"}
							>Pet Type</label>
							<RequestPetTypeField
								component="select"
								name="petType"
								formikProps={rest}
								onChange={handleServicePetChange}
								//value={props.formik.values.name}
								className={rest.formik.errors.petType && rest.formik.touched.petType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet type--</option>
								{PetTypes.map(petType => (
									<option key={petType.id} value={petType.name}>{petType.name}</option>
								))}
							</RequestPetTypeField>
							<div className="input-feedback">
								{<ErrorMsg
									errormessage={rest.formik.errors.petType}
									touched={rest.formik.touched.petType} />}
							</div>
						</div>
						: null
				}
				{

					(rest.formik.values['subRequestType'] !== '' && rest.formik.values['petType'].toLowerCase() === petType_Others) ?
						<div>
							<label htmlFor="otherAnimalTypes"
								className={
									rest.formik.errors.otherAnimalTypes && rest.formik.touched.otherAnimalTypes ? "input-feedback" : "text-label"}
							>Other pet type
							</label>
							<GenericTypeField
								component="select"
								name="otherAnimalTypes"
								formikProps={rest}
								onChange={handleOtherPetTypeChange}
								//	value={props.formik.values.name}
								className={rest.formik.errors.otherAnimalTypes && rest.formik.touched.otherAnimalTypes ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select an "other" pet type--</option>
								{OtherAnimalTypes.map(OtherAnimalType => (
									<option key={OtherAnimalType.id} value={OtherAnimalType.name}>{OtherAnimalType.name}</option>
								))}

							</GenericTypeField>

							<div className="input-feedback">
								{<ErrorMsg
									errormessage={rest.formik.errors.otherAnimalTypes}
									touched={rest.formik.touched.otherAnimalTypes} />}
							</div>
						</div>
						: null
				}
				{
					((rest.formik.values['requestType'] === requestType_petAndAnimalIssue)
						&& rest.formik.values['subRequestType'] !== '')
						&& checkPetType(rest.formik.values['petType']) ?
						<div>
							<label htmlFor="sexType"
								className={
									rest.formik.errors.sexType && rest.formik.touched.sexType ? "input-feedback" : "text-label"}
							>Pet Sex (optional)
							</label>
							<GenericTypeField
								component="select"
								name="sexType"
								formikProps={rest}
								onChange={handlePetSexChange}
								//value={props.formik.values.name}
								className={rest.formik.errors.sexType && rest.formik.touched.sexType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet sex--</option>
								{animalSex.map(petSex => (
									<option key={petSex.id} value={petSex.name}>{petSex.name}</option>
								))}
							</GenericTypeField>

							<div className="input-feedback">
								{<ErrorMsg
									errormessage={rest.formik.errors.sexType}
									touched={rest.formik.touched.sexType} />}
							</div>
						</div>
						: null
				}

				{

					(rest.formik.values['requestType'] === requestType_petAndAnimalIssue
						&& rest.formik.values['subRequestType'] !== '')
						&& (rest.formik.values['petType'].toLowerCase() === petTypeCat || rest.formik.values['petType'].toLowerCase() === petTypeDog) ?
						<div>
							<label htmlFor="animalColorType"
								className={
									rest.formik.errors.animalColorType && rest.formik.touched.animalColorType ? "input-feedback" : "text-label"}
							>Primary Animal Color
							</label>

							<GenericTypeField
								component="select"
								name="animalColorType"
								formikProps={rest}
								onChange={handleAnimalColorChange}
								//value={props.formik.values.name}
								className={rest.formik.errors.animalColorType && rest.formik.touched.animalColorType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary color of the animal--</option>

								{AnimalColors.map(animalColorType => (
									<option key={animalColorType.id} value={animalColorType.name}>{animalColorType.name}</option>
								))}

							</GenericTypeField>
							<div className="input-feedback">
								{<ErrorMsg
									errormessage={rest.formik.errors.animalColorType}
									touched={rest.formik.touched.animalColorType} />}
							</div>
						</div>
						: null

				}

				<br />
				{
					((rest.formik.values['requestType'] === requestType_petAndAnimalIssue && rest.formik.values['subRequestType'] !== '')
						&& (rest.formik.values['petType'].toLowerCase() === petTypeCat || rest.formik.values['petType'].toLowerCase() === petTypeDog)) ?
						<div>
							<label htmlFor="animalBreed"
								className={
									rest.formik.errors.animalBreed && rest.formik.touched.animalBreed ? "input-feedback" : "text-label"}
							>Primary Animal Breed(optional)
							</label>
							<Field
								component="select"
								name="animalBreedType"
								onChange={handleAnimalBreedChange}
								value={props.formik.values.name}
								className={rest.formik.errors.animalBreedType && rest.formik.touched.animalBreedType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary breed of the animal--</option>
								{animalSubCategories.map(animalBreedType => (
									<option key={animalBreedType.id} value={animalBreedType.name}>{animalBreedType.name}</option>
								))}
							</Field>
							<div className="input-feedback">
								{<ErrorMsg
									errormessage={rest.formik.errors.animalBreedType}
									touched={rest.formik.touched.animalBreedType} />}

							</div>
						</div>
						: null

				}

				{(rest.formik.values['requestType'].toLowerCase() === 'website issue') ?
					<div>
						<label htmlFor="serviceDescription"
							className={
								rest.formik.errors.serviceDescription && rest.formik.touched.serviceDescription ? "input-feedback" : "text-label"}
						>Service Request Description
						</label>
						<Field type='text'
							name="serviceDescription"
							className={rest.formik.errors.serviceDescription && rest.formik.touched.serviceDescription ? "text-select error" : null}
						/>

						<div className="input-feedback">
							{<ErrorMsg
								errormessage={rest.formik.errors.serviceDescription}
								touched={rest.formik.touched.serviceDescription} />}
						</div>
					</div> : null

				}



				<Field type="hidden" name="requestTypeID" />
				<Field type="hidden" name="subRequestTypeID" />
				<Field type="hidden" name="petTypeID" />
				<Field type="hidden" name="animalBreedID" />
				<Field type="hidden" name="sexTypeID" />
				<Field type="hidden" name="animalColorTypeID" />
				<Field type="hidden" name="otherAnimalTypesID" />
				<Field type="hidden" name="descriptionID" />
				<Field type="hidden" name="streeAddressID" />
				<Field type="hidden" name="cityID" />
				<Field type="hidden" name="zipCodeID" />

				{(contactID === null) ?
					<div>
						<input type="button" class="seButton" onClick={callSignInForm} disabled={displayButton} value="Sign In" />

						<input type="button" class="seButton" onClick={callRegisterForm} disabled={displayButton} value="Register" />
						<Model />

					</div> : <input type="button" class="seButton" disabled={displayButton} onClick={goToNextPage} value="Next" />
				}

			</Form>


		</FormContainer>

	);


}

export default connect(ServiceRequestForm);





