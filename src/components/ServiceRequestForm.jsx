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


const getSubCategories = (categories, categoryId) => {
	var category = categories.find(category => category.id === categoryId);
	return category ? category.types : [];
};
const getAnimalSubCategories = (AnimalBreeds, animalId) => {
	//console.log('--inside getAnimalSubCategories--');

	var animalCats = AnimalBreeds.find(animal => animal.id === animalId);
	return animalCats ? animalCats : [];

};


const ServiceRequestForm = props => {
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
		console.log('++++++++++++++handleServiceRequestChange+++++++++++++');
		const { value } = changeEvent.currentTarget;
		console.log('RequestChange value:' + value);
		const subCategories = getSubCategories(Categories, parseInt(value));
		setSubCategories(subCategories);
	};
	const handleServicePetChange = (changeEvent) => {
		console.log('===============handleServicePetChange===============');
		const { value } = changeEvent.currentTarget;
		console.log('pet value:' + value);
		const subBreeds = getAnimalSubCategories(AnimalBreeds, parseInt(value));
		setAnimalSubCategories(subBreeds.breeds);
		console.log(subBreeds.sex);
		setAnimalSex(subBreeds.sex)

	};

	const getAnimalSex = (animalId) => {
		console.log('getAnimalSex');
		var animalCats = AnimalBreeds.find(animal => animal.id === parseInt(animalId));
		if (animalCats !== undefined) {
			setAnimalSex(animalCats.sex);
			return true;
		}
		else {
			return false;
		}


	}
	const callRegisterForm = () => {
		console.log('---callregisterForm---');
		props.history.push("/SignUpForm");
	}

	const callSignInForm = () => {
		console.log('---callregisterForm---');
		props.history.push("/SignInForm");
	}

	return (


		<FormContainer title="How Can We Help?">
			<Formik
				initialValues={{
					requestType: '',
					subRequestType: '',
					petType: '',
					animalBreed: '',
					sexType: '',
					animalColorType: '',
					otherAnimalTypes: ''
				}}
				validationSchema={Yup.object().shape({
					requestType: Yup.string().required('Request Category is required'),
					subRequestType: Yup.string().required('Sub Category is required'),
					petType: Yup.string().required('Pet Type is required'),
					animalColorType: Yup.string().required('Primary Animal Color is required'),
				})}

				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					//handleSubmitTest();
					setSubmitting(false);
				}}
			>
				{
					(props) => {
						const { values, isSubmitting, errors, touched, ...rest } = props;
						console.log('requestType:' + values['requestType']); //1010188
						//	console.log('subRequestType:' + values['subRequestType']); //1010188
						//	console.log('petType:' + values['petType']); //1010188
						return (

							<Form >
								<label htmlFor="requestType"
									className={
										errors.requestType && touched.requestType ? "input-feedback" : "text-label"}
								>Request Category</label>
								<RequestTypeField
									component="select"
									name="requestType"
									formikProps={rest}
									onChange={handleServiceRequestChange}
									className={`text-select ${errors.requestType && touched.requestType ? "error" : ""}`}
								>
									<option key='default' value=''>--Please select a category--</option>
									{Categories.map(category => (
										<option key={category.id} value={category.id}>{category.name}</option>
									))}
								</RequestTypeField>
								<div className="input-feedback">
									<ErrorMsg
										errormessage={errors.requestType}
										touched={touched.requestType} />
								</div>
								{
									values['requestType'] !== '' ?
										<div>
											<label name="subRequestType" htmlFor="subRequestType"
												className={
													errors.subRequestType && touched.subRequestType ? "input-feedback" : "text-label"}
											>
												Request Sub-Category
											</label>
											<Field component="select"
												name="subRequestType"
												className={`text-select ${errors.subRequestType && touched.subRequestType ? "error" : ""}`}
											>
												<option key='default' value=''>--Please Select a sub-category--</option>;
												{subCategories.map(category => (
													<option key={category.id} value={category.id}>{category.name}</option>
												))}
											</Field>
											<div className="input-feedback">
												<ErrorMsg
													errormessage={errors.subRequestType}
													touched={touched.subRequestType} />
											</div>
										</div>
										: null
								}

								{ /* Can or lid lost or damaged*/
									values['subRequestType'] === '1011083' ?
										<div>
											The County will only replace damaged cans or lids with evidence of hauler negligence. After submitting your report, please email any evidence to solidwaste@baltimorecountymd.gov and reference your request ID number.
										</div>
										: null
								}
								{ /* icy condition*/
									values['subRequestType'] === '1011069' ?
										<div>
											Due to the safety risk posed by ice in the roadway, we cannot take your report online.
											Please call the Department of Public Works immediately at 410-887-0000 to ensure we obtain the necessary information to address the issue as soon as possible.
										</div>
										: null
								}
								{
									values['subRequestType'] === '1010186' ?
										<div>

											The Police Department is responsible for investigating all animal cruelty incidents. If you witness a person inflicting harm on an animal, call 911 immediately.
											To report animal cruelty when immediate police intervention is not required, call the police non-emergency line at 410-887-2222. Please don't use this form to report animal cruelty.
										</div>
										: null
								}
								{
									values['requestType'] === '1010169' && values['subRequestType'] !== '' ?
										<div>
											<label htmlFor="petType" name="petType"
												className={
													errors.petType && touched.petType ? "input-feedback" : "text-label"}
											>Pet Type</label>
											<RequestPetTypeField
												component="select"
												name="petType"
												formikProps={rest}
												onChange={handleServicePetChange}
												className={errors.petType && touched.petType ? "text-select error" : null}
											>
												<option key='default' value=''>--Please select a pet type--</option>
												{PetTypes.map(petType => (
													<option key={petType.id} value={petType.id}>{petType.name}</option>
												))}
											</RequestPetTypeField>
											<div className="input-feedback">
												{<ErrorMsg
													errormessage={errors.petType}
													touched={touched.petType} />}
											</div>
										</div>
										: null
								}
								{

									(values['petType'] === '1010191' && values['subRequestType'] !== '') ?
										<div>
											<label htmlFor="otherAnimalTypes"
												className={
													errors.otherAnimalTypes && touched.otherAnimalTypes ? "input-feedback" : "text-label"}
											>Other pet type
											</label>
											<Field
												component="select"
												name="otherAnimalTypes"
												className={errors.otherAnimalTypes && touched.otherAnimalTypes ? "text-select error" : null}
											>
												<option key='default' value=''>--Please select an "other" pet type--</option>
												{OtherAnimalTypes.map(OtherAnimalType => (
													<option key={OtherAnimalType.id} value={OtherAnimalType.id}>{OtherAnimalType.name}</option>
												))}

											</Field>

											<div className="input-feedback">
												{<ErrorMsg
													errormessage={errors.otherAnimalTypes}
													touched={touched.otherAnimalTypes} />}
											</div>
										</div>
										: null
								}
								{
									((values['requestType'] === '1010169') && values['subRequestType'] === '1010175') && getAnimalSex(values['petType']) ?
										<div>
											<label htmlFor="sexType"
												className={
													errors.sexType && touched.sexType ? "input-feedback" : "text-label"}
											>Pet Sex (optional)
											</label>
											<Field
												component="select"
												name="sexType"
												className={errors.sexType && touched.sexType ? "text-select error" : null}
											>
												<option key='default' value=''>--Please select a pet sex--</option>
												{animalSex.map(petSex => (
													<option key={petSex.id} value={petSex.id}>{petSex.name}</option>
												))}

											</Field>

											<div className="input-feedback">
												{<ErrorMsg
													errormessage={errors.sexType}
													touched={touched.sexType} />}
											</div>
										</div>
										: null
								}

								{

									(values['requestType'] === '1010169' && values['subRequestType'] === '1010175')
										&& (values['petType'] === '1010188' || values['petType'] === '1010189') ?
										<div>
											<label htmlFor="animalColorType"
												className={
													errors.animalColorType && touched.animalColorType ? "input-feedback" : "text-label"}
											>Primary Animal Color
											</label>

											<Field
												component="select"
												name="animalColorType"
												className={errors.animalColorType && touched.animalColorType ? "text-select error" : null}
											>
												<option key='default' value=''>--Please select the primary color of the animal--</option>

												{AnimalColors.map(animalColorType => (
													<option key={animalColorType.id} value={animalColorType.id}>{animalColorType.name}</option>
												))}

											</Field>
											<div className="input-feedback">
												{<ErrorMsg
													errormessage={errors.animalColorType}
													touched={touched.animalColorType} />}
											</div>
										</div>
										: null

								}

								<br />
								{
									((values['requestType'] === '1010169' && values['subRequestType'] === '1010175') &&
										animalSubCategories !== undefined) && (values['petType'] === '1010188' || values['petType'] === '1010189') ?
										<div>
											<label htmlFor="animalBreed"
												className={
													errors.animalBreed && touched.animalBreed ? "input-feedback" : "text-label"}
											>Primary Animal Breed(optional)
											</label>
											<Field
												component="select"
												name="animalBreed"
												className={errors.animalBreed && touched.animalBreed ? "text-select error" : null}
											>
												<option key='default' value=''>--Please select the primary breed of the animal--</option>
												{animalSubCategories.map(animalBreed => (
													<option key={animalBreed.id} value={animalBreed.id}>{animalBreed.name}</option>
												))}
											</Field>
											<div className="input-feedback">
												{<ErrorMsg
													errormessage={errors.animalBreed}
													touched={touched.animalBreed} />}

											</div>
										</div>
										: null
								}
								<button type="button" onClick={callSignInForm}>Sign In</button>
								<button type="button" onClick={callRegisterForm}>Register</button>
							</Form>

						)
					}
				}
			</Formik>
		</FormContainer>

	);


}

export default connect(ServiceRequestForm);

