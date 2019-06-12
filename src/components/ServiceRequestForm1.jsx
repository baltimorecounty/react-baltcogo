import React, { useState, useEffect } from "react";
import { Formik, Form, Field, connect } from "formik";
import axios from "axios"
import * as Yup from "yup";
import ErrorMsg from "./ErrorMessage";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";
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
			console.log('animal breed:' + resultAnimalBreeds.data);
			console.log(resultAnimalBreeds.data);
		};

		fetchData();
	}, []);


	const handleServiceRequestChange = (changeEvent) => {
	
		const { value } = changeEvent.currentTarget;

		const subCategories = getSubCategories(Categories, parseInt(value));
		setSubCategories(subCategories);
	};
	const handleServicePetChange = (changeEvent) => {
	
		const { value } = changeEvent.currentTarget;
		const subBreeds = getAnimalSubCategories(AnimalBreeds, parseInt(value));
		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex)

	};

	const getAnimalSex = (animalId) => {
	
		var animalCats = AnimalBreeds.find(animal => animal.id === parseInt(animalId));
		if (animalCats !== undefined) {
			//setAnimalSex(animalCats.sex);
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
							<Field component="select"
								name="subRequestType"
								className={`text-select ${rest.formik.errors.subRequestType && rest.formik.touched.subRequestType ? "error" : ""}`}
							>
								<option key='default' value=''>--Please Select a sub-category--</option>
								{subCategories.map(category => (
									<option key={category.id} value={category.id}>{category.name}</option>
								))}
							</Field>
							<div className="input-feedback">
								<ErrorMsg
									errormessage={rest.formik.errors.subRequestType}
									touched={rest.formik.touched.subRequestType} />
							</div>
						</div>
						: null
				}

				{ /* Can or lid lost or damaged*/
					rest.formik.values['subRequestType'] === '1011083' ?
						<div>
							The County will only replace damaged cans or lids with evidence of hauler negligence. After submitting your report, please email any evidence to solidwaste@baltimorecountymd.gov and reference your request ID number.
						</div>
						: null
				}
				{ /* icy condition*/
					rest.formik.values['subRequestType'] === '1011069' ?
						<div>
							Due to the safety risk posed by ice in the roadway, we cannot take your report online.
							Please call the Department of Public Works immediately at 410-887-0000 to ensure we obtain the necessary information to address the issue as soon as possible.
						</div>
						: null
				}
				{
					rest.formik.values['subRequestType'] === '1010186' ?
						<div>

							The Police Department is responsible for investigating all animal cruelty incidents. If you witness a person inflicting harm on an animal, call 911 immediately.
							To report animal cruelty when immediate police intervention is not required, call the police non-emergency line at 410-887-2222. Please don't use this form to report animal cruelty.
						</div>
						: null
				}
				{
					rest.formik.values['requestType'] === '1010169' && rest.formik.values['subRequestType'] !== '' ?
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

					(rest.formik.values['petType'] === '1010191' && rest.formik.values['subRequestType'] !== '') ?
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
					((rest.formik.values['requestType'] === '1010169') && rest.formik.values['subRequestType'] === '1010175')
						&& getAnimalSex(rest.formik.values['petType']) ?
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

					(rest.formik.values['requestType'] === '1010169' && rest.formik.values['subRequestType'] === '1010175')
						&& (rest.formik.values['petType'] === '1010188' || rest.formik.values['petType'] === '1010189') ?
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
					((rest.formik.values['requestType'] === '1010169' && rest.formik.values['subRequestType'] === '1010175') &&
						animalSubCategories !== undefined) && (rest.formik.values['petType'] === '1010188' || rest.formik.values['petType'] === '1010189') ?
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

				<button type="button"   onClick={callSignInForm}>
					Sign In 
				</button>
				<button type="button" onClick={callRegisterForm}>Register</button>
				<Model />
			</Form>


		</FormContainer>

	);


}

export default connect(ServiceRequestForm);

