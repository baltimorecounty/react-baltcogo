import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import axios from "axios"
import ErrorMsg from "./ErrorMessage";
import { GetErrorsDetails, formatPhoneNumber } from "../utilities/CustomErrorHandling";
import FormContainer from './FormContainer';
import RequestTypeField from "./RequestTypeField";
import RequestSubTypeField from "./RequestSubTypeField";
import RequestPetTypeField from "./RequestPetTypeField";
import QueryString from 'query-string';
import GenericTypeField from "./genericTypeField";
import Model from './Modal';
import { Link } from 'react-router-dom';
import WaterAndSewerIssue from "./waterAndSewerIssue";
import TrashAndRecycle from "./trashAndRecycle";
import { GetContactDetails } from './authService';
import RoadsAndSidewalks from "./roadsAndSidewalks";
import { formIncomplete } from "./checkFormCompletion";
import { returnJsonFileLocations, returnRequestTypes } from "./returnEnvironmentItems";
import PetType from "./petType";

const { categoryId } = QueryString.parse(window.location.search);

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
const getrequiresLocation = (categories, name) => {
	var category = categories.find(category => category.name.toLowerCase() === name);
	return category ? category.requiresLocation : true;
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
	const localProps = props.formik;
	const pageFieldName = localProps.values.RequestPage
	const [Categories, setData] = useState([]);
	const [PetTypes, setPetTypes] = useState([]);
	const [AnimalBreeds, setAnimalBreeds] = useState([]);
	const [AnimalColors, setAnimalColors] = useState([]);
	const [OtherAnimalTypes, setOtherAnimalTypes] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [notes, setNotes] = useState();
	const [animalSubCategories, setAnimalSubCategories] = useState([]);
	const [animalSex, setAnimalSex] = useState([]);
	const { ContactID } = localProps.values;
	const contactID =  (ContactID === "") ? sessionStorage.getItem("UserLoginID") : ContactID;
	//

	try {
		useEffect(() => {
			const fetchData = async () => {
				const result = await axios(
					returnJsonFileLocations("results"),
				);
				const resultPetTypes = await axios(
					returnJsonFileLocations("resultPetTypes"),
				);
				const resultAnimalBreeds = await axios(
					returnJsonFileLocations("resultAnimalBreeds"),
				);
				const resultAnimalColors = await axios(
					returnJsonFileLocations("resultAnimalColors"),
				);
				const resultAnimalTypes = await axios(
					returnJsonFileLocations("resultAnimalTypes"),
				);
				const resultFormFieldNames = await axios(
					returnJsonFileLocations("resultFormFieldNames"),
				);

				setData(result.data);
				setPetTypes(resultPetTypes.data);
				setAnimalBreeds(resultAnimalBreeds.data);
				setAnimalColors(resultAnimalColors.data);
				setOtherAnimalTypes(resultAnimalTypes.data);

				localProps.setFieldValue('Tabs', resultFormFieldNames.data.Tabs);
				localProps.setFieldValue('RequestPage', resultFormFieldNames.data.RequestPage);
				localProps.setFieldValue('MapPage', resultFormFieldNames.data.MapPage);
				localProps.setFieldValue('AdditionalInfoPage', resultFormFieldNames.data.AdditionalInfoPage);
				localProps.setFieldValue('SignInPage', resultFormFieldNames.data.SignInPage);
				localProps.setFieldValue('SignUpPage', resultFormFieldNames.data.SignUpPage);
				localProps.setFieldValue('ResetPasswordPage', resultFormFieldNames.data.ResetPasswordPage);

				localProps.setFieldValue('ContactID', contactID);


				if (contactID) {

					getContactDetails();
				}
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

		localProps.setFieldValue('requestTypeID', ID);

		const subCategories = getSubCategories(Categories, value ? value : value);
		setSubCategories(subCategories);

		const description = getIncludedDescriptions(Categories, value ? value : value);
		const fields = getIncludedFields(Categories, value ? value : value);

		const requiresLocation = getrequiresLocation(Categories, value ? value : value);
		localProps.setFieldValue('requestTypeDescriptionID', description);
		localProps.setFieldValue('requiresLocation', (requiresLocation === undefined) ? true : requiresLocation);

		pullServiceRequestFields(fields);
	};

	const pullServiceRequestFields = (fields) => {
		if (fields !== undefined) {
			localProps.setFieldValue('requestTypeAddressID', fields.streetAddress);
			localProps.setFieldValue('requestTypeCityID', fields.city);
			localProps.setFieldValue('requestTypeZipID', fields.zipCode);
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

		localProps.setFieldValue('subRequestTypeID', ID);
		localProps.setFieldValue('shouldDisableForm', (isDisabled === undefined) ? false : isDisabled);


		if (subInfo !== undefined) {
			if (subInfo.description !== undefined) {
				localProps.setFieldValue('subRequestTypeDescriptionID', subInfo.description);
			}
			if (subInfo.streetAddress !== undefined) {
				localProps.setFieldValue('subRequestTypeAddressID', subInfo.streetAddress);
			}
			if (subInfo.city !== undefined) {
				localProps.setFieldValue('subRequestTypeCityID', subInfo.city);
			}
			if (subInfo.zipCode !== undefined) {
				localProps.setFieldValue('subRequestTypeZipID', subInfo.zipCode);
			}
		}
	};

	const handleServicePetChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(PetTypes, value)
		const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex);
		localProps.setFieldValue('petTypeID', ID);
	};

	const handleAnimalColorChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(AnimalColors, value);
		localProps.setFieldValue('animalColorTypeID', ID);
	}

	const handleOtherPetTypeChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(OtherAnimalTypes, value);
		localProps.setFieldValue('otherAnimalTypesID', ID);
	}

	const handlePetSexChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSex, value);
		localProps.setFieldValue('sexTypeID', ID);
	}

	const handleAnimalBreedChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(animalSubCategories, value);
		localProps.setFieldValue('animalBreedID', ID);
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
		let subRequestType = rest.formik.values['subRequestType'].toLowerCase();

		if (subRequestType === returnRequestTypes("subCategory_SewerIssues").toLowerCase() ||
			subRequestType === returnRequestTypes("subCategory_StormWaterIssues").toLowerCase() ||
			subRequestType === returnRequestTypes("subCategory_WaterSupplyIssues").toLowerCase() ||
			subRequestType === returnRequestTypes("subCategory_IcyConditions").toLowerCase()
		) {
			return false;
		}
		else {
			return true;
		}
	}

	const buttonDisableValidation = () => {

		return formIncomplete(props.formik);
	}

	const getContactDetails = async () => {
		try {
			const getResponse = await GetContactDetails(contactID);

			if (getResponse.data.HasErrors) {
				const errorsReturned = GetErrorsDetails(getResponse);
				throw new Error(errorsReturned);
			}
			else {
				const NameFirst = getResponse.data.Results.NameFirst;
				const NameLast = getResponse.data.Results.NameLast;
				const Email = getResponse.data.Results.Email;
				const Phone = getResponse.data.Results.Telephone;

				localProps.setFieldValue('NameFirst', NameFirst);
				localProps.setFieldValue('NameLast', NameLast);
				localProps.setFieldValue('Email', Email);
				localProps.setFieldValue('Telephone', Phone);
			}
		}
		catch (ex) {
			
		}

	}
	const goToNextPage = () => {

		if(localProps.values.requiresLocation){
			props.history.push('/ProvideDetails');
		}
		else{
			props.history.push('/AdditionalInformationForm');
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
		let requestType = localProps.values['requestType'];

		if (Categories.length > 0 && PetTypes.length > 0
			&& AnimalBreeds.length > 0 && AnimalColors.length > 0 && OtherAnimalTypes.length > 0) {
			if (requestType !== '') {
				if (subCategories.length === 0) {
					const value = requestType.toLowerCase();
					const subCategories = getSubCategories(Categories, value ? value : value);
					setSubCategories(subCategories);
					if (localProps.values['petType'] !== '') {
						let value = localProps.values['petType'].toLowerCase();
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

	return (

		<FormContainer title={pageFieldName.map(name => name.RequestTitle)} tabNames={localProps.values.Tabs} currentTab="ServiceRequestForm" shouldDisableForm={localProps.values.shouldDisableForm} requiresLocation={localProps.values.requiresLocation}>
			<Form>
				<div className={
					localProps.errors.requestType && localProps.touched.requestType ? "cs-form-control error" : "cs-form-control"}>
					<label htmlFor="requestType">{pageFieldName.map(name => name.CategoryLabel)}</label>
					<RequestTypeField
						component="select"
						name="requestType"
						formikProps={rest}
						onChange={handleServiceRequestChange}
						value={localProps.values.requestType}
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
							<label name="subRequestType" htmlFor="subRequestType">{pageFieldName.map(name => name.SubCategoryLabel)}</label>
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
						</div> : null
				}
				{
					<WaterAndSewerIssue
						requestType={localProps.values['requestType'].toLowerCase()}
						subRequestType={localProps.values['subRequestType'].toLowerCase()}
						WaterandSewerIssues={returnRequestTypes("requestType_WaterandSewerIssues")}
						SewerIssues={returnRequestTypes("subCategory_SewerIssues")}
						StormWaterIssues={returnRequestTypes("subCategory_StormWaterIssues")}
						WaterSupplyIssues={returnRequestTypes("subCategory_WaterSupplyIssues")}
						notes={notes} />
				}
				{
					<RoadsAndSidewalks
						requestType={localProps.values['requestType'].toLowerCase()}
						subRequestType={localProps.values['subRequestType'].toLowerCase()}
						RoadsAndSidewalks={returnRequestTypes("requestType_RoadsAndSidewalks")}
						IcyConditions={returnRequestTypes("subCategory_IcyConditions")}
						notes={notes} />
				}
				{
					<TrashAndRecycle
						requestType={localProps.values['requestType'].toLowerCase()}
						subRequestType={localProps.values['subRequestType'].toLowerCase()}
						TrashRecycleIssue={(returnRequestTypes("requestType_TrashRecycleIssue")).toLowerCase()}
						CanOrLidLostDamaged={returnRequestTypes("subCategory_CanOrLidLostDamaged")}
						PropertyDamangeDuringCollection={returnRequestTypes("subCategory_PropertyDamangeDuringCollection")}
						RecyclingNotCollected={returnRequestTypes("subCategory_RecyclingNotCollected")}
						RequestToStartNewCollection={returnRequestTypes("subCategory_RequestToStartNewCollection")}
						TrashNotCollected={returnRequestTypes("subCategory_TrashNotCollected")}
						YardWasteNotCollected={returnRequestTypes("subCategory_YardWasteNotCollected")}
						notes={notes}
					/>
				}
				{/* Pets and Animal Issue - Other animal complaint */

					(localProps.values['requestType'].toLowerCase() === (returnRequestTypes("requestType_petAndAnimalIssue")).toLowerCase()
						&& localProps.values['subRequestType'].toLowerCase() === (returnRequestTypes("petAndAnimalIssueID_OtherAnimalComplaint")).toLowerCase()) ? notes
						: null
				}
				{/* Website Issue - Other website problem */

					(localProps.values['requestType'].toLowerCase() === (returnRequestTypes("requestType_WebSiteIssue")).toLowerCase()
						&& localProps.values['subRequestType'].toLowerCase() === (returnRequestTypes("subCategory_OtherWebsiteProblem")).toLowerCase()) ? notes
						: null
				}
				<PetType
					requestType={localProps.values['requestType']}
					requestType_petAndAnimalIssue={returnRequestTypes("requestType_petAndAnimalIssue")}
					subRequestType={localProps.values['subRequestType']}
					errorsPetType={localProps.errors.petType}
					touchedPetType={localProps.touched.petType}
					pageFieldName={pageFieldName}
					handleServicePetChange={handleServicePetChange}
					rest={rest}
					PetTypes={PetTypes} />

				{
					(localProps.values['subRequestType'] !== '' && localProps.values['petType'] === returnRequestTypes("petType_Others")) ?
						<div className={
							localProps.errors.otherAnimalTypes && localProps.touched.otherAnimalTypes ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="otherAnimalTypes">{pageFieldName.map(name => name.PetTypeOther)}</label>
							<GenericTypeField
								component="select"
								name="otherAnimalTypes"
								formikProps={rest}
								onChange={handleOtherPetTypeChange}
								//	value={localProps.values.name}
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
					(localProps.values['requestType'] === returnRequestTypes("requestType_petAndAnimalIssue") && localProps.values['subRequestType'] !== '') && checkPetType(localProps.values['petType']) ?
						<div className={
							localProps.errors.sexType && localProps.touched.sexType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="sexType">{pageFieldName.map(name => name.PetSex)}</label>
							<GenericTypeField
								component="select"
								name="sexType"
								formikProps={rest}
								onChange={handlePetSexChange}
								//value={localProps.values.name}
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
					(localProps.values['requestType'] === returnRequestTypes("requestType_petAndAnimalIssue")
						&& localProps.values['subRequestType'] !== ''
						&& (localProps.values['petType'] === returnRequestTypes("petTypeCat") || localProps.values['petType'] === returnRequestTypes("petTypeDog"))) ?
						<div className={
							localProps.errors.animalColorType && localProps.touched.animalColorType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="animalColorType">{pageFieldName.map(name => name.PetColor)}</label>
							<GenericTypeField
								component="select"
								name="animalColorType"
								formikProps={rest}
								onChange={handleAnimalColorChange}
								//value={localProps.values.name}
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
					((localProps.values['requestType'] === returnRequestTypes("requestType_petAndAnimalIssue") && localProps.values['subRequestType'] !== '')
						&& (localProps.values['petType'] === returnRequestTypes("petTypeCat") || localProps.values['petType'] === returnRequestTypes("petTypeDog"))) ?
						<div className={
							localProps.errors.animalBreedType && localProps.touched.animalBreedType ? "cs-form-control error" : "cs-form-control"}>
							<label htmlFor="animalBreed">{pageFieldName.map(name => name.PetBreed)}</label>
							<GenericTypeField
								component="select"
								name="animalBreedType"
								formikProps={rest}
								onChange={handleAnimalBreedChange}
								//value={localProps.values.animalBreedType}
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
						<label htmlFor="serviceDescription">{pageFieldName.map(name => name.Description)}</label>
						<Field
							component="textarea"
							placeholder="Maximum 2,000 characters."
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
				<Field type="hidden" name="shouldDisableForm" />

				{(displayButton) ?
					(contactID === null) ?
						(<div className="cs-form-control">
							<input type="button" className="seButton" onClick={callSignInForm} disabled={disableButton} value="Sign In" />
							<input type="button" className="seButton pull-right" onClick={callRegisterForm} disabled={disableButton} value="Register" />
							<Model />
						</div>) :
						<div className = "cs-form-control">
							<p name="userLoggedIn">{pageFieldName.map(name => name.AlreadySignedInLabel)} {sessionStorage.getItem("NameFirst")} {sessionStorage.getItem("NameLast")}</p>
							<p name="notCorrectUser"><Link to="SignInForm">Not {sessionStorage.getItem("NameFirst")}? Log in to a different account. &nbsp; </Link></p>
							<input type="button" className="seButton pull-right" onClick={goToNextPage} disabled={disableButton} value="Next" />
						</div> : ""}
			</Form>
		</FormContainer>
	);
}

export default connect(ServiceRequestForm);





