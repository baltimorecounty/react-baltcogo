import React, { useState, useEffect } from "react";
import { Form, Field, connect } from "formik";
import axios from "axios"
import Note from './Note';
import { GetResponseErrors } from "../utilities/CitysourcedResponseHelpers";
import FormContainer from './FormContainer';
import QueryString from 'query-string';
import Model from './Modal';
import { Link } from 'react-router-dom';
import { GetContactDetails } from '../services/authService';
import { IsFormInComplete } from "../utilities/FormHelpers";
import { returnJsonFileLocations, returnRequestTypes } from "../utilities//returnEnvironmentItems";
import PetType from "./petType";
import RequestCategory from "./requestCategory";
import RequestSubCategory from "./requestSubCategory";
import OtherAnimalsTypes from "./otherAnimalTypes";
import SexType from './sexType';
import AnimalColorType from './animalColorType';
import AnimalBreedType from './animalBreedType';
import { URLRouting } from '../utilities/FormHelpers';
import { Go, Routes } from "../Routing";

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
	const [Categories, setData] = useState([]);
	const [PetTypes, setPetTypes] = useState([]);
	const [AnimalBreeds, setAnimalBreeds] = useState([]);
	const [AnimalColors, setAnimalColors] = useState([]);
	const [OtherAnimalTypes, setOtherAnimalTypes] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [notes, setNotes] = useState();
	const [animalSubCategories, setAnimalSubCategories] = useState([]);
	const [animalSex, setAnimalSex] = useState([]);

	const { ContactID, RequestPage, Tabs, shouldDisableForm,
		isPanelRequired, requestType, subRequestType, petType } = localProps.values;

	const contactID =  (ContactID === "") ? sessionStorage.getItem("UserLoginID") : ContactID;

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
				localProps.setFieldValue('Categories', result.data);
				setPetTypes(resultPetTypes.data);
				setAnimalBreeds(resultAnimalBreeds.data);
				setAnimalColors(resultAnimalColors.data);
				setOtherAnimalTypes(resultAnimalTypes.data);

				const preSelectedTypes = SelectedValue(result.data);

				let requestCategory ='';
				let requestSubCategory = ''

				const selectedType = () =>{
					 requestCategory = (preSelectedTypes) ? preSelectedTypes.nameCategory : requestType ;
					if(requestCategory){
						addSelectedValueOptions(result.data, requestCategory.toLowerCase());
					}
					return requestCategory;
				} 

				const selectedSubType = () =>{
					 requestSubCategory = (preSelectedTypes) ? preSelectedTypes.nameSubCategory : subRequestType ;
					if(requestSubCategory){
						addSelectedSubValueOptions(result.data, requestSubCategory.toLowerCase())
					}
					return requestSubCategory;
				} 
			
				localProps.setFieldValue('Tabs', resultFormFieldNames.data.Tabs);
				localProps.setFieldValue('RequestPage', resultFormFieldNames.data.RequestPage);
				localProps.setFieldValue('MapPage', resultFormFieldNames.data.MapPage);
				localProps.setFieldValue('AdditionalInfoPage', resultFormFieldNames.data.AdditionalInfoPage);
				localProps.setFieldValue('SignInPage', resultFormFieldNames.data.SignInPage);
				localProps.setFieldValue('SignUpPage', resultFormFieldNames.data.SignUpPage);
				localProps.setFieldValue('ResetPasswordPage', resultFormFieldNames.data.ResetPasswordPage);
				localProps.setFieldValue('requestType', selectedType());
				localProps.setFieldValue('subRequestType', selectedSubType());
				localProps.setFieldValue('ContactID', contactID);

				if (contactID) {
					getContactDetails();
				}
			};

			fetchData();
		}, []);
	}
	catch (ex) {
		console.error('service request form data', ex);
	}
	const SelectedValue = (Categories) =>{
		return URLRouting(Categories, parseInt(categoryId));
	}

	const addSelectedValueOptions = (Categories, value)=>{
		const subCategories = getSubCategories(Categories, value);
		setSubCategories(subCategories);
		let ID = getID(Categories, value)
		localProps.setFieldValue('requestTypeID', ID);
		const description = getIncludedDescriptions(Categories, value);
		const fields = getIncludedFields(Categories, value);
		const requiresLocation = getrequiresLocation(Categories, value);

		localProps.setFieldValue('requestTypeDescriptionID', description);
		localProps.setFieldValue('requiresLocation', (requiresLocation === undefined) ? true : requiresLocation);

		if (value === 'website issue')
		{
			localProps.setFieldValue('Latitude', 39.40037792)
			localProps.setFieldValue('Longitude', -76.60651907)
			localProps.setFieldValue('location', '400 WASHINGTON AVE, TOWSON, 21204')
		}
		//addSelectedSubValueOptions(Categories, value);
		pullServiceRequestFields(fields);
	}

	const addSelectedSubValueOptions = (Categories, value, subValue)=>{

		const subCategories = getSubCategories(Categories, value);
		setSubCategories(subCategories);

		const subInfo = getSubCategoriesIncludedDescription(subCategories, value);
		let ID = getID(subCategories, value);
		const isDisabled = getshouldDisableForm(subCategories, value);

		const notes = isDisabled ? <Note>{getNote(subCategories, value)}</Note> : null;
		setNotes(notes);

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
	}
	const handleServiceRequestChange = (changeEvent) => {
		const value = changeEvent.currentTarget.value.toLowerCase();
		addSelectedValueOptions(Categories, value);
	};

	const pullServiceRequestFields = (fields) => {
		if (fields !== undefined) {
			localProps.setFieldValue('requestTypeAddressID', fields.streetAddress);
			localProps.setFieldValue('requestTypeCityID', fields.city);
			localProps.setFieldValue('requestTypeZipID', fields.zipCode);
			localProps.setFieldValue('isPanelRequired', true);
		}
		else{
			localProps.setFieldValue('isPanelRequired', false);
		}
	};

	const handleServiceSubRequestChange = (changeEvent) => {
		const value = changeEvent.currentTarget.value.toLowerCase();
		addSelectedSubValueOptions(Categories, value);
	};

	const handleServicePetChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(PetTypes, value)
		const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex);
		localProps.setFieldValue('petTypeID', ID);
	};

	const handleFieldChange = (changeEvent, lookupItems, propertyName) => {
		const value = changeEvent.currentTarget.value.toLowerCase();
		const id = getID(lookupItems, value);
		localProps.setFieldValue(propertyName, id);
	};

	const handleAnimalColorChange = (changeEvent) => {
		handleFieldChange(changeEvent, AnimalColors, 'animalColorTypeID');
	};

	const handleOtherPetTypeChange = (changeEvent) => {
		handleFieldChange(changeEvent, OtherAnimalTypes, 'otherAnimalTypesID');
	};

	const handlePetSexChange = (changeEvent) => {
		handleFieldChange(changeEvent, animalSex, 'sexTypeID');
	};

	const handleAnimalBreedChange = (changeEvent) => {
		handleFieldChange(changeEvent, animalSubCategories, 'animalBreedID');
	};

	const checkPetType = (value) => {
		value = value.toLowerCase();
		var animalCats = AnimalBreeds.find(animal => animal.animal === value);
		if (animalCats !== undefined) {
			return true;
		}
		else {
			return false;
		}
	};

	const buttonShowHideValidation = () => {
		return !localProps.values.shouldDisableForm;
	}

	const buttonDisableValidation = () => {

		return IsFormInComplete(props.formik);
	}

	const getContactDetails = async () => {
		try {
			const getResponse = await GetContactDetails(contactID);

			if (getResponse.data.HasErrors) {
				const errorsReturned = GetResponseErrors(getResponse);
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
		Go(props, Routes.ProvideDetails);
	};

	const callSignInForm = () => {
		Go(props, Routes.SignIn);
	};

	const callRegisterForm = () => {
		Go(props, Routes.SignUp);
	};

	const { values, isSubmitting, ...rest } = props;

	const loadSelectedItems = (props) => {
		let requestType = localProps.values['requestType'];

		if (Categories.length > 0 && PetTypes.length > 0
			&& AnimalBreeds.length > 0 && AnimalColors.length > 0 && OtherAnimalTypes.length > 0) {
			if (requestType) {
				if (subCategories.length === 0) {
					const value = requestType.toLowerCase();
					const subCategories = getSubCategories(Categories, value ? value : value);
					setSubCategories(subCategories);
					if (petType) {
						let value = petType.toLowerCase();
						const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
						setAnimalSubCategories(subBreeds.breeds);
						setAnimalSex(subBreeds.sex);
					}
				}
			}
		}
	};

	let disableButton = buttonDisableValidation();
	let displayButton = buttonShowHideValidation();
	loadSelectedItems(props);

	return (

		<FormContainer title={RequestPage.RequestTitle}
			tabNames={Tabs} currentTab="ServiceRequestForm"
			shouldDisableForm={shouldDisableForm}
			isPanelRequired={isPanelRequired}
		>
			<Form>

				<RequestCategory
					requestType={requestType}
					errorsRequestType={localProps.errors.requestType}
					touchedRequestType={localProps.touched.requestType}
					pageFieldName={RequestPage.CategoryLabel}
					handleServiceRequestChange={handleServiceRequestChange}
					rest={rest}
					Categories={Categories} />

				<RequestSubCategory
					requestType={requestType}
					subRequestType={subRequestType }
					errorsSubRequestType={localProps.errors.subRequestType}
					touchedSubRequestType={localProps.touched.subRequestType}
					pageFieldName={RequestPage.SubCategoryLabel}
					handleServiceSubRequestChange={handleServiceSubRequestChange}
					rest={rest}
					subCategories={subCategories} />


				{localProps.values.shouldDisableForm && notes}

				{/* Pets and Animal Issue - Other animal complaint */

					(requestType.toLowerCase() === (returnRequestTypes("requestType_petAndAnimalIssue")).toLowerCase()
						&& subRequestType.toLowerCase() === (returnRequestTypes("petAndAnimalIssueID_OtherAnimalComplaint")).toLowerCase()) ? notes
						: null
				}
				{/* Website Issue - Other website problem */

					(requestType.toLowerCase() === (returnRequestTypes("requestType_WebSiteIssue")).toLowerCase()
						&& subRequestType.toLowerCase() === (returnRequestTypes("subCategory_OtherWebsiteProblem")).toLowerCase()) ? notes
						: null
				}
				<PetType
					requestType={requestType}
					requestType_petAndAnimalIssue={returnRequestTypes("requestType_petAndAnimalIssue")}
					subRequestType={subRequestType}
					errorsPetType={localProps.errors.petType}
					touchedPetType={localProps.touched.petType}
					pageFieldName={RequestPage.PetType}
					handleServicePetChange={handleServicePetChange}
					rest={rest}
					PetTypes={PetTypes} />

				<OtherAnimalsTypes
					subRequestType={subRequestType}
					petType={petType}
					returnRequestTypes={returnRequestTypes("petType_Others")}
					errorsOtherAnimalTypes={localProps.errors.otherAnimalTypes}
					touchedOtherAnimalTypes={localProps.touched.otherAnimalTypes}
					pageFieldName={RequestPage.PetTypeOther}
					rest={rest}
					handleOtherPetTypeChange={handleOtherPetTypeChange}
					OtherAnimalTypes={OtherAnimalTypes} />

				<SexType
					requestType={requestType}
					returnRequestTypes={returnRequestTypes("requestType_petAndAnimalIssue")}
					subRequestType={subRequestType}
					checkPetType={checkPetType(petType)}
					errorsSexType={localProps.errors.sexType}
					touchedSexType={localProps.touched.sexType}
					pageFieldName={RequestPage.PetSex}
					rest={rest}
					handlePetSexChange={handlePetSexChange}
					animalSex={animalSex}
				/>
				<AnimalColorType
					requestType={requestType}
					requestType_petAndAnimalIssue={returnRequestTypes("requestType_petAndAnimalIssue")}
					subRequestType={subRequestType}
					petType={petType}
					petTypeCat={returnRequestTypes("petTypeCat")}
					petTypeDog={returnRequestTypes("petTypeDog")}
					errorsAnimalColorType={localProps.errors.animalColorType}
					touchedAnimalColorType={localProps.touched.animalColorType}
					pageFieldName={RequestPage.PetColor}
					handleAnimalColorChange={handleAnimalColorChange}
					rest={rest}
					AnimalColors={AnimalColors} />

				<AnimalBreedType
					requestType={requestType}
					requestType_petAndAnimalIssue={returnRequestTypes("requestType_petAndAnimalIssue")}
					subRequestType={subRequestType}
					petType={petType}
					petTypeCat={returnRequestTypes("petTypeCat")}
					petTypeDog={returnRequestTypes("petTypeDog")}
					errorsAnimalBreedType={localProps.errors.animalBreedType}
					touchedAnimalBreedType={localProps.touched.animalBreedType}
					pageFieldName={RequestPage.PetBreed}
					handleAnimalBreedChange={handleAnimalBreedChange}
					rest={rest}
					animalSubCategories={animalSubCategories} />

				{/* <Field type="hidden" name="requestTypeID" />
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
				<Field type="hidden" name="shouldDisableForm" /> */}

				{(displayButton) ?
					(!contactID) ?
						(<div className="cs-form-control">
							<input type="button" className="seButton" onClick={callSignInForm} disabled={disableButton} value="Sign In" />
							<input type="button" className="seButton pull-right" onClick={callRegisterForm} disabled={disableButton} value="Register" />
							<Model />
						</div>) :
						<div className = "cs-form-control">
							<p name="userLoggedIn">{RequestPage.AlreadySignedInLabel} {sessionStorage.getItem("NameFirst")} {sessionStorage.getItem("NameLast")}</p>
							<p name="notCorrectUser"><Link to="SignInForm">Not {sessionStorage.getItem("NameFirst")}? Log in to a different account. &nbsp; </Link></p>
							<input type="button" className="seButton pull-right" onClick={goToNextPage} disabled={disableButton} value="Next" />
						</div> : ""}
			</Form>
		</FormContainer>
	);
}

export default connect(ServiceRequestForm);





