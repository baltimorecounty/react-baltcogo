import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import axios from "axios"
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";
import RequestSubTypeField from "./RequestSubTypeField";
import RequestPetTypeField from "./RequestPetTypeField";
//import PetTypes from "./pettypes.json";
//import AnimalBreeds from "./animalbreeds.json";
//import AnimalColors from "./animalcolors.json"
import Model from './Model'

const getSubCategories = (categories, categoryId) => {
	var category = categories.find(category => category.id === categoryId);
	return category ? category.types : [];
};
const getAnimalSubCategories = (AnimalBreeds, animalId) => {
	//console.log('--inside getAnimalSubCategories--');

	var animalCats = AnimalBreeds.find(animal => animal.id === animalId);
	return animalCats ? animalCats : [];

};

const ServiceRequestForm = (props, errors, touched) => {
	const requestType_petAndAnimalIssueID = '1010169';
	const requestType_WebSiteIssue = '1011097';
	const requestType_RoadSidewalkIssue = '1011065';
	const requestType_TrashRecycleIssue = '1011080';
	const requestType_WaterandSewerIssues = 'D000001';


	const subCategory_OtherWebsiteProblem = '1011103';

	const subCategory_CanOrLidLostDamaged = '1011083';
	const subCategory_PropertyDamangeDuringCollecttion = '1011084';
	const subCategory_RecyclingNotCollected = '1011085';
	const subCategory_RequestToStartNewCollection = '1011086';
	const subCategory_TrashNotCollected = '1011087';
	const subCategory_YardWasteNotCollected = '1011088';
	const subCategory_IcyConditions = '1011069';

	const subCategory_SewerIssues = 'D000002';
	const subCategory_StormWaterIssues = 'D000004';
	const subCategory_WaterSupplyIssues = 'D000005';

	const petAndAnimalIssueID_OtherAnimalComplaint = '1010186';
	const petTypeCat = '1010188';
	const petTypeDog = '1010189';
	const petType_Others = '1010191';
	const [Categories, setData] = useState([]);
	const [PetTypes, setPetTypes] = useState([]);
	const [AnimalBreeds, setAnimalBreeds] = useState([]);
	const [AnimalColors, setAnimalColors] = useState([]);
	const [OtherAnimalTypes, setOtherAnimalTypes] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
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


		const { value } = changeEvent.currentTarget;

		const subCategories = getSubCategories(Categories, parseInt(value) ? parseInt(value) : value);
		setSubCategories(subCategories);
	};
	const handleServicePetChange = (changeEvent) => {

		const { value } = changeEvent.currentTarget;
		const subBreeds = getAnimalSubCategories(AnimalBreeds, parseInt(value));
		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex)

	};

	const checkPetType = (animalId) => {

		var animalCats = AnimalBreeds.find(animal => animal.id === parseInt(animalId));
		if (animalCats !== undefined) {
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

	console.log('requestType:' + rest.formik.values.requestType);
	console.log('subrequestType:' + rest.formik.values.subRequestType);
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
				>
					<option key='default' value=''>--Please select a category--</option>
					{Categories.map(category => (
						<option key={category.id} value={category.id}>{category.name}</option>
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
							>
								<option key='default' value=''>--Please select a sub-category--</option>
								{subCategories.map(category => (
									<option key={category.id} value={category.id}>{category.name}</option>
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

					(rest.formik.values['requestType'] === requestType_WaterandSewerIssues
						&& rest.formik.values['subRequestType'] === subCategory_SewerIssues) ?
						<div>
							<p>
								Issues such as missing manhole covers, sewer backups, overflows or odors require immediate attention, and therefore cannot be reported online.
						
							</p>
							<p>
								Please call the Department of Public Works at 410-887-7415 to ensure we obtain the necessary information to address the issue as soon as possible.
							</p>

						</div>
						: null
				}

				{ /* water and Sewer Issues --- Sewer Issues */

					(rest.formik.values['requestType'] === requestType_WaterandSewerIssues
						&& rest.formik.values['subRequestType'] === subCategory_StormWaterIssues) ?
						<div>
						<p>
						Stormwater issues such as sinkholes and missing or damaged storm grates require immediate attention due to the risk of harm to persons or property, and therefore cannot be reported online.
						
							</p>
							<p>
							Please call the Department of Public Works at 410-887-7415 to ensure we obtain the necessary information to address the issue as soon as possible.
							</p>
						</div>
						: null
				}

				{ /* water and Sewer Issues --- Sewer Issues*/

					(rest.formik.values['requestType'] === requestType_WaterandSewerIssues
						&& rest.formik.values['subRequestType'] === subCategory_WaterSupplyIssues) ?
						<div>
							<p>

								Baltimore City (not Baltimore County) owns, maintains and repairs all water mains and hydrants. However, service requests for broken water mains, leaking hydrants and drinking water concerns can be reported directly to Baltimore County by calling 410-887-7415 anytime.
								
							</p>

						</div>
						: null
				}


				{ /* Can or lid lost or damaged*/

					(rest.formik.values['requestType'] === requestType_TrashRecycleIssue
						&& rest.formik.values['subRequestType'] === subCategory_CanOrLidLostDamaged) ?
						<div>
							The County will only replace damaged cans or lids with evidence of hauler negligence. After submitting your report, please email any evidence to  <a href="mailto:solidwaste@baltimorecountymd.gov">solidwaste@baltimorecountymd.gov</a> and reference your request ID number.
						</div>
						: null
				}

				{ /* Property damage during collection */

					(rest.formik.values['requestType'] === requestType_TrashRecycleIssue
						&& rest.formik.values['subRequestType'] === subCategory_PropertyDamangeDuringCollecttion) ?
						<div>
							If your property was damaged, please also file a police report. Email the police report number along with any photos or videos to <a href="mailto:solidwaste@baltimorecountymd.gov">solidwaste@baltimorecountymd.gov</a> and reference your request ID number.
						</div>
						: null
				}


				{ /* Recycling not collected */

					(rest.formik.values['requestType'] === requestType_TrashRecycleIssue
						&& rest.formik.values['subRequestType'] === subCategory_RecyclingNotCollected) ?
						<div>

							Please review the reasons why your recycling may not have been collected before submitting a report.
						</div>
						: null
				}

				{ /* Request to start new collection */

					(rest.formik.values['requestType'] === requestType_TrashRecycleIssue
						&& rest.formik.values['subRequestType'] === subCategory_RequestToStartNewCollection) ?
						<div>
							Your address may already have collection service. Please check for an existing collection schedule and learn how to properly set out your materials before requesting new service.
						</div>
						: null
				}

				{ /* Trash not collected */

					(rest.formik.values['requestType'] === requestType_TrashRecycleIssue
						&& rest.formik.values['subRequestType'] === subCategory_TrashNotCollected) ?
						<div>

							Please review the reasons why your trash may not have been collected before submitting a report
						</div>
						: null
				}
				{ /* Yard waste not collected*/

					(rest.formik.values['requestType'] === requestType_TrashRecycleIssue
						&& rest.formik.values['subRequestType'] === subCategory_YardWasteNotCollected) ?
						<div>

							Please review the reasons why your yard waste may not have been collected before submitting a report.
						</div>
						: null
				}



				{/* 	
			
			
				{ /* Roads and Sidewalks Issue -- icy condition*/
					(rest.formik.values['requestType'] === requestType_RoadSidewalkIssue
						&& rest.formik.values['subRequestType'] === subCategory_IcyConditions) ?
						<div>
							Due to the safety risk posed by ice in the roadway, we cannot take your report online.
							Please call the Department of Public Works immediately at 410-887-0000 to ensure we obtain the necessary information to address the issue as soon as possible.
						</div>
						: null
				}
				{/* Pets and Anial Issue - Other animal complaint */

					(rest.formik.values['requestType'] === requestType_petAndAnimalIssueID
						&& rest.formik.values['subRequestType'] === petAndAnimalIssueID_OtherAnimalComplaint) ?
						<div>
							<p>
								The Police Department is responsible for investigating all animal cruelty incidents.
								<b>If you witness a person inflicting harm on an animal, call 911 immediately.</b>
							</p>
							<p>
								To report animal cruelty when immediate police intervention is not required, call the police non-emergency line at 410-887-2222. Please don't use this form to report animal cruelty.
							</p>
						</div>
						: null
				}
				{/* Website Issue - Other website problem */

					(rest.formik.values['requestType'] === requestType_WebSiteIssue
						&& rest.formik.values['subRequestType'] === subCategory_OtherWebsiteProblem) ?
						<div>
							<p>
								In the description below, please include the URL of the page where you encountered the problem.
							</p>
						</div>
						: null
				}
				{
					rest.formik.values['requestType'] === requestType_petAndAnimalIssueID && rest.formik.values['subRequestType'] !== '' ?
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
								className={rest.formik.errors.petType && rest.formik.touched.petType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet type--</option>
								{PetTypes.map(petType => (
									<option key={petType.id} value={petType.id}>{petType.name}</option>
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

					(rest.formik.values['subRequestType'] !== '') && rest.formik.values['petType'] === petType_Others ?
						<div>
							<label htmlFor="otherAnimalTypes"
								className={
									rest.formik.errors.otherAnimalTypes && rest.formik.touched.otherAnimalTypes ? "input-feedback" : "text-label"}
							>Other pet type
							</label>
							<Field
								component="select"
								name="otherAnimalTypes"
								className={rest.formik.errors.otherAnimalTypes && rest.formik.touched.otherAnimalTypes ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select an "other" pet type--</option>
								{OtherAnimalTypes.map(OtherAnimalType => (
									<option key={OtherAnimalType.id} value={OtherAnimalType.id}>{OtherAnimalType.name}</option>
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
					((rest.formik.values['requestType'] === requestType_petAndAnimalIssueID)
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
								className={rest.formik.errors.sexType && rest.formik.touched.sexType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select a pet sex--</option>
								{animalSex.map(petSex => (
									<option key={petSex.id} value={petSex.id}>{petSex.name}</option>
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

					(rest.formik.values['requestType'] === requestType_petAndAnimalIssueID
						&& rest.formik.values['subRequestType'] !== '')
						&& (rest.formik.values['petType'] === petTypeCat || rest.formik.values['petType'] === petTypeDog) ?
						<div>
							<label htmlFor="animalColorType"
								className={
									rest.formik.errors.animalColorType && rest.formik.touched.animalColorType ? "input-feedback" : "text-label"}
							>Primary Animal Color
							</label>

							<Field
								component="select"
								name="animalColorType"
								className={rest.formik.errors.animalColorType && rest.formik.touched.animalColorType ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary color of the animal--</option>

								{AnimalColors.map(animalColorType => (
									<option key={animalColorType.id} value={animalColorType.id}>{animalColorType.name}</option>
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
					(rest.formik.values['requestType'] === requestType_petAndAnimalIssueID && rest.formik.values['subRequestType'] !== '')
						&& (rest.formik.values['petType'] === petTypeCat || rest.formik.values['petType'] === petTypeDog) ?
						<div>
							<label htmlFor="animalBreed"
								className={
									rest.formik.errors.animalBreed && rest.formik.touched.animalBreed ? "input-feedback" : "text-label"}
							>Primary Animal Breed(optional)
							</label>
							<Field
								component="select"
								name="animalBreed"
								className={rest.formik.errors.animalBreed && rest.formik.touched.animalBreed ? "text-select error" : null}
							>
								<option key='default' value=''>--Please select the primary breed of the animal--</option>
								{animalSubCategories.map(animalBreed => (
									<option key={animalBreed.id} value={animalBreed.id}>{animalBreed.name}</option>
								))}
							</Field>
							<div className="input-feedback">
								{<ErrorMsg
									errormessage={rest.formik.errors.animalBreed}
									touched={rest.formik.touched.animalBreed} />}

							</div>
						</div>
						: null

				}

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

