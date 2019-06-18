import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import axios from "axios"
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";
import RequestSubTypeField from "./RequestSubTypeField";
import RequestPetTypeField from "./RequestPetTypeField";
import QueryString from 'query-string';

import _ from 'lodash'
//import PetTypes from "./pettypes.json";
//import AnimalBreeds from "./animalbreeds.json";
//import AnimalColors from "./animalcolors.json"
import Model from './Model'

const {categoryId} = QueryString.parse(window.location.href);

const getSubCategories1 = (categories, categoryId) => {
	var category = categories.find(category => category.id === categoryId);
	return category ? category.types : [];
};
const getSubCategories = (categories, categoryName) => {
	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.types : [];
};
const getNote = (subCategories, name) => {
	var type = subCategories.find(subcategoryname => subcategoryname.name.toLowerCase() === name);
	return type ? type.note : [];
};
const getAnimalSubCategories = (AnimalBreeds, animalName) => {
	//console.log('--inside getAnimalSubCategories--');

	var animalCats = AnimalBreeds.find(animal => animal.animal.toLowerCase() === animalName);
	return animalCats ? animalCats : [];

};
const getID = (categories, categoryName) => {


	var category = categories.find(category => category.name.toLowerCase() === categoryName);
	return category ? category.id : [];
};

// const getSubTypeID = (categories, categoryName) => {
// 	var category = categories.find(category => category.name=== categoryName);
// 	return category ? category.id : [];
// };


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
	const petType_Others = 'other';
	const [Categories, setData] = useState([]);
	const [CategoryName, setCategoryName] = useState();
	const [PetTypes, setPetTypes] = useState([]);
	const [AnimalBreeds, setAnimalBreeds] = useState([]);
	const [AnimalColors, setAnimalColors] = useState([]);
	const [OtherAnimalTypes, setOtherAnimalTypes] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [notes, setNotes] = useState();
	//const [breeds] = useState(AnimalBreeds);
	const [animalSubCategories, setAnimalSubCategories] = useState([]);
	const [animalSex, setAnimalSex] = useState([]);


	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				'//dev.baltimorecountymd.gov/sebin/q/m/categories.json',
			);
			const resultPetTypes = await axios(
				'//dev.baltimorecountymd.gov/sebin/m/a/pet-types.json',
			);
			const resultAnimalBreeds = await axios(
				'//dev.baltimorecountymd.gov/sebin/y/a/animal-breeds.json',
			);
			const resultAnimalColors = await axios(
				'//dev.baltimorecountymd.gov/sebin/u/u/animal-colors.json',
			);
			const resultAnimalTypes = await axios(
				'//dev.baltimorecountymd.gov/sebin/a/e/animal-types.json',
			);
			setData(result.data);
			setPetTypes(resultPetTypes.data);
			setAnimalBreeds(resultAnimalBreeds.data);
			setAnimalColors(resultAnimalColors.data);
			setOtherAnimalTypes(resultAnimalTypes.data);

		};

		fetchData();
	}, []);


	const handleServiceRequestChange = (changeEvent) => {


		const value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(Categories, value)

		props.formik.setFieldValue('requestTypeID', ID);
		const subCategories = getSubCategories(Categories, value ? value : value);
		//const subCategories = getSubCategories(Categories, parseInt(categoryID) ? parseInt(categoryID) : categoryID);
		setSubCategories(subCategories);
	};
	const handleServiceSubRequestChange = (changeEvent) => {

		const value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(subCategories, value)
		const notes = getNote(subCategories, value);
		console.log('-----------notes------------')
		console.log(notes);
		console.log('-----------notes------------')
		setNotes(<div><p>{notes}</p></div>);

		props.formik.setFieldValue('subRequestTypeID', ID);

	};
	const handleServicePetChange = (changeEvent) => {

		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(PetTypes, value)


		const subBreeds = getAnimalSubCategories(AnimalBreeds, value);

		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex);
		console.log('=========subBreeds=============')
		console.log(subBreeds);
		console.log('--------------end --subBreeds--------------');
		//	props.formik.setFieldValue('petTypeID', ID);

		//props.formik.setFieldValue('sexType', '');
		//	props.formik.setFieldValue('sexTypeID', '');
	};
	const handleAnimalColorChange = (changeEvent) => {

		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(AnimalColors, value);
		props.formik.setFieldValue('animalColorTypeID', ID);
		props.formik.setFieldValue('animalColorType', value);
	}

	const handleOtherPetTypeChange = (changeEvent) => {

		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(OtherAnimalTypes, value);
		props.formik.setFieldValue('otherAnimalTypesID', ID);
		props.formik.setFieldValue('otherAnimalTypes', value);
	}
	const handlePetSexChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSex, value);
		//	props.formik.setFieldValue('sexTypeID', ID);
		props.formik.setFieldValue('sexType', value);
	}



	const handleAnimalBreedChange = (changeEvent) => {

		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSubCategories, value);

		props.formik.setFieldValue('animalBreedID', ID);
		props.formik.setFieldValue('animalBreed', value);
	}

	const checkPetType = (value) => {
		value = value.toLowerCase();

		var animalCats = AnimalBreeds.find(animal => animal.animal === value);
		//	console.log(animalCats);
		if (animalCats !== undefined) {
			//let ID =	getID(animalSex, value) 
			//console.log('ID:' + ID);
			//props.formik.setFieldValue('sexTypeID', ID); 
			return true;
		}
		else {
			return false;
		}


	}
	const callSignInForm = () => {

		props.history.push("/SignInForm");
	}
	const callRegisterForm = () => {

		props.history.push("/SignUpForm");
	}
	const { values, isSubmitting, ...rest } = props;

	const routURLID = () => {
		var urlParts =  window.location.href.split('categoryId=');
		return urlParts[1];
	}

	//console.log('************************************************');
	//console.log('requestType:' + rest.formik.values.requestType);
	console.log('sexType:' + rest.formik.values.sexType);
	//console.log('************************************************');
	return (


		<FormContainer title="How Can We Help?">

			<Form>
				<label htmlFor="requestType"
					className={
						rest.formik.errors.requestType && rest.formik.touched.requestType ? "input-feedback" : "text-label"}
				>Request Category</label>

				<RequestTypeField
					component="select"
					name="requestType"
					formikProps={rest}
					onChange={handleServiceRequestChange}
					onLoad={routURLID}
					value ={categoryId}
				>
					<option key='default' value=''>--Please select a category--</option>
					{Categories.map(category => (
						<option key={category.id} value={category.name}>{category.name}</option>
					))}
				</RequestTypeField>
				<div className="input-feedback">
					<ErrorMsg
						errormessage={rest.formik.errors.requestType}
						touched={rest.formik.touched.requestType} />
				</div>
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


				{ /* water and Sewer Issues --- Sewer Issues */
					(rest.formik.values['requestType'].toLowerCase() === requestType_WaterandSewerIssues.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_SewerIssues.toLowerCase()) ? notes : null
				}
				{ /* water and Sewer Issues --- Sewer Issues */
					(rest.formik.values['requestType'].toLowerCase() === requestType_WaterandSewerIssues.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_StormWaterIssues.toLowerCase()) ? notes : null
				}

				{ /* water and Sewer Issues --- Sewer Issues*/
					(rest.formik.values['requestType'].toLowerCase() === requestType_WaterandSewerIssues.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_WaterSupplyIssues.toLowerCase()) ? notes : null
				}


				{ /* Can or lid lost or damaged*/

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_CanOrLidLostDamaged.toLowerCase()) ? notes : null
				}

				{ /* Property damage during collection */

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_PropertyDamangeDuringCollecttion.toLowerCase()) ? notes
						: null
				}


				{ /* Recycling not collected */

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_RecyclingNotCollected.toLowerCase()) ? notes
						: null
				}

				{ /* Request to start new collection */

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_RequestToStartNewCollection.toLowerCase()) ? notes
						: null
				}

				{ /* Trash not collected */

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_TrashNotCollected.toLowerCase()) ? notes
						: null
				}
				{ /* Yard waste not collected*/

					(rest.formik.values['requestType'].toLowerCase() === requestType_TrashRecycleIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_YardWasteNotCollected.toLowerCase()) ? notes
						: null
				}



				{ /* Roads and Sidewalks Issue -- icy condition*/
					(rest.formik.values['requestType'].toLowerCase() === requestType_RoadSidewalkIssue.toLowerCase()
						&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_IcyConditions.toLowerCase()) ? notes
						: null
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
								value={props.formik.values.name}
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
							<Field
								component="select"
								name="otherAnimalTypes"
								onChange={handleOtherPetTypeChange}
								value={props.formik.values.name}
								className={rest.formik.errors.otherAnimalTypes && rest.formik.touched.otherAnimalTypes ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select an "other" pet type--</option>
								{OtherAnimalTypes.map(OtherAnimalType => (
									<option key={OtherAnimalType.id} value={OtherAnimalType.name}>{OtherAnimalType.name}</option>
								))}

							</Field>

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
							<Field
								component="select"
								name="sexType"
								onChange={handlePetSexChange}
								value={props.formik.values.name}
								className={rest.formik.errors.sexType && rest.formik.touched.sexType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet sex--</option>
								{animalSex.map(petSex => (
									<option key={petSex.id} value={petSex.name}>{petSex.name}</option>
								))}

							</Field>

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

							<Field
								component="select"
								name="animalColorType"
								onChange={handleAnimalColorChange}
								value={props.formik.values.name}
								className={rest.formik.errors.animalColorType && rest.formik.touched.animalColorType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary color of the animal--</option>

								{AnimalColors.map(animalColorType => (
									<option key={animalColorType.id} value={animalColorType.name}>{animalColorType.name}</option>
								))}

							</Field>
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



				<button type="button" onClick={callSignInForm}>
					Sign In
				</button>
				<button type="button" onClick={callRegisterForm}>Register</button>
				<Model />
			</Form>


		</FormContainer>

	);


}

export default connect(ServiceRequestForm);





/* 	(rest.formik.values['requestType'].toLowerCase() === requestType_WaterandSewerIssues.toLowerCase()
		&& rest.formik.values['subRequestType'].toLowerCase() === subCategory_SewerIssues.toLowerCase()) ?
		<div>
			<p>
				Issues such as missing manhole covers, sewer backups, overflows or odors require immediate attention, and therefore cannot be reported online.
		
			</p>
			<p>
				Please call the Department of Public Works at 410-887-7415 to ensure we obtain the necessary information to address the issue as soon as possible.
			</p>

		</div>
		: null
 */
