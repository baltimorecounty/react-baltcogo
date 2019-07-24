import React, { useState, useEffect } from "react";
import { Form, connect } from "formik";
import axios from "axios"
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
import { URLRouting, SetFieldValues } from '../utilities/FormHelpers';
import { Go, Routes } from "../Routing";
import { GetCategory } from '../utilities/CategoryHelpers';

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
	return type && !!type.shouldDisableForm;
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
	const [activeCategory, setActiveCategory] = useState({});
	const [Categories, setCategories] = useState([]);
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

				setCategories(result.data);
				setPetTypes(resultPetTypes.data);
				setAnimalBreeds(resultAnimalBreeds.data);
				setAnimalColors(resultAnimalColors.data);
				setOtherAnimalTypes(resultAnimalTypes.data);

				const preSelectedTypes = SelectedValue(result.data);

				let requestCategory ='';
				let requestSubCategory = ''

				const selectedType = () =>{
					 requestCategory = (preSelectedTypes) ? preSelectedTypes.nameCategory : requestType;
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
				const fields = {
					Tabs: resultFormFieldNames.data.Tabs,
					RequestPage: resultFormFieldNames.data.RequestPage,
					MapPage: resultFormFieldNames.data.MapPage,
					AdditionalInfoPage: resultFormFieldNames.data.AdditionalInfoPage,
					SignInPage: resultFormFieldNames.data.SignInPage,
					SignUpPage: resultFormFieldNames.data.SignUpPage,
					ResetPasswordPage: resultFormFieldNames.data.ResetPasswordPage,
					ContactID: contactID,
					requestType: selectedType(),
					subRequestType: selectedSubType()
				};

				SetFieldValues(localProps, fields);

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
		let ID = getID(Categories, value);
		const category = GetCategory(Categories, ID);
		setActiveCategory(category);

		const subCategories = getSubCategories(Categories, value);
		setSubCategories(subCategories);

		const description = getIncludedDescriptions(Categories, value);
		const fields = getIncludedFields(Categories, value);
		const requiresLocation = getrequiresLocation(Categories, value);

		const requestFields = {
			requestTypeID: ID,
			requestTypeDescriptionID: description,
			requiresLocation: (requiresLocation === undefined) ? true : requiresLocation
		}

		SetFieldValues(localProps, requestFields);

		if (value === 'website issue')
		{
			const addressFields = {
				Latitude: 39.40037792,
				Longitude: -76.60651907,
				location: '400 WASHINGTON AVE, TOWSON, 21204'
			};
			SetFieldValues(localProps, addressFields);
		}

		pullServiceRequestFields(fields);
	}

	const addSelectedSubValueOptions = (Categories, value)=>{
		const subCategories = Categories.flatMap(x => x.types);
		const subInfo = getSubCategoriesIncludedDescription(subCategories, value);
		let ID = getID(subCategories, value);
		const isDisabled = getshouldDisableForm(subCategories, value);
		const notes = getNote(subCategories, value);
		setNotes(<div className="alert-information bc_alert" >
			<i className="fa fa-icon fa-2x fa-info-circle"></i>
			<p dangerouslySetInnerHTML={{ __html: notes }}></p>
		</div>);

		const requestSubFields = {
			subRequestTypeID: ID,
			shouldDisableForm: isDisabled
		}

		SetFieldValues(localProps, requestSubFields);

		if (subInfo !== undefined) {
			if (subInfo.description !== undefined) {
				SetFieldValues(localProps, {subRequestTypeDescriptionID: subInfo.description});
			}
			if (subInfo.streetAddress !== undefined) {
				SetFieldValues(localProps, {subRequestTypeAddressID: subInfo.streetAddress});
			}
			if (subInfo.city !== undefined) {
				SetFieldValues(localProps, {subRequestTypeCityID: subInfo.city});
			}
			if (subInfo.zipCode !== undefined) {
				SetFieldValues(localProps, {subRequestTypeZipID: subInfo.zipCode});
			}
		}
	}

	const handleServiceRequestChange = (changeEvent) => {
		const value = changeEvent.currentTarget.value.toLowerCase();
		addSelectedValueOptions(Categories, value);
	};

	const handleServiceSubRequestChange = (changeEvent) => {
		const value = changeEvent.currentTarget.value.toLowerCase();
		addSelectedSubValueOptions(Categories, value);
	};

	const pullServiceRequestFields = (fields) => {
		if (fields !== undefined) {
			const addressFields = {
				requestTypeAddressID: fields.streetAddress,
				requestTypeCityID: fields.city,
				requestTypeZipID: fields.zipCode,
				isPanelRequired: true
			};
			SetFieldValues(localProps, addressFields);
		}
		else{
			SetFieldValues(localProps, {isPanelRequired: false});
		}
	};

	const handleServicePetChange = (changeEvent) => {
		let value = changeEvent.currentTarget.value.toLowerCase();
		let ID = getID(PetTypes, value)
		const subBreeds = getAnimalSubCategories(AnimalBreeds, value);
		setAnimalSubCategories(subBreeds.breeds);
		setAnimalSex(subBreeds.sex);
		SetFieldValues(localProps, {petTypeID: ID});
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

				const fields = {
					NameFirst: NameFirst,
					NameLast: NameLast,
					Email: Email,
					Telephone: Phone
				};

				SetFieldValues(localProps, fields);
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

	const logOutUser = () =>{
		sessionStorage.clear();
		SetFieldValues(localProps, {ContactID: ''});
		SetFieldValues(localProps, {ignoreFormCompletion: true});
	}

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

				<PetType
					shouldShow={activeCategory.isAnimal}
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
					shouldShow={activeCategory.isAnimal}
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
					shouldShow={activeCategory.isAnimal}
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
					shouldShow={activeCategory.isAnimal}
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
					shouldShow={activeCategory.isAnimal}
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

				{(displayButton) ?
					(!contactID) ?
						(<div className="cs-form-control">
							<input type="button" className="seButton" onClick={callSignInForm} disabled={disableButton} value="Sign In" />
							<input type="button" className="seButton pull-right" onClick={callRegisterForm} disabled={disableButton} value="Register" />
							<Model />
						</div>) :
						<div className = "cs-form-control">
							<p name="userLoggedIn">{RequestPage.AlreadySignedInLabel} {sessionStorage.getItem("NameFirst")} {sessionStorage.getItem("NameLast")}</p>
							<p name="notCorrectUser"><Link to="SignInForm" onClick={logOutUser}>Not {sessionStorage.getItem("NameFirst")}? Log in to a different account. &nbsp; </Link></p>
							<input type="button" className="seButton pull-right" onClick={goToNextPage} disabled={disableButton} value="Next" />
						</div> : ""}
			</Form>
		</FormContainer>
	);
}

export default connect(ServiceRequestForm);





