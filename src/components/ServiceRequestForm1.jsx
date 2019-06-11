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
		props.history.push("/SignInForm");
	}
	const { values, isSubmitting, ...rest } = props;

	console.log(errors);
	return (


		<FormContainer title="How Can We Help?">

			return (

			<Form>
				<label htmlFor="requestType"
					className={
						typeof errors.requestType && touched.requestType ? "input-feedback" : "text-label"}
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
				<Field
					type="email"
					name="Email"

				/>
				<button type="submit" disabled={isSubmitting}>
					Submit
				</button>
				<button type="button" onClick={callRegisterForm}>Register</button>
			</Form>

			)
        }
    }

		</FormContainer>

	);


}

export default connect(ServiceRequestForm);

