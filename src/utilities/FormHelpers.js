import { returnRequestTypes } from "../utilities//returnEnvironmentItems"
import _ from 'lodash';

export const IsFormInComplete = (props) => {

	let requestType = props.values['requestType'].toLowerCase();
	let subRequestType = props.values['subRequestType'].toLowerCase();

	if (requestType !== ""
		&& subRequestType !== "") {
		if (requestType === returnRequestTypes("requestType_petAndAnimalIssue").toLowerCase()
			&& subRequestType !== ""
			&& props.values['petType'] === "") {
			return true;
		}
		else if (requestType === returnRequestTypes("requestType_petAndAnimalIssue").toLowerCase()
			&& subRequestType !== ""
			&& props.values['petType'] !== ""
			&& (props.values['petType'].toLowerCase() === returnRequestTypes("petTypeCat").toLowerCase()
				|| props.values['petType'].toLowerCase() === returnRequestTypes("petTypeDog").toLowerCase())
			&& props.values['animalColorType'] === "") {
			return true;
		}
		else if (requestType === returnRequestTypes("requestType_petAndAnimalIssue").toLowerCase()
			&& subRequestType !== ""
			&& (props.values['petType'] !== ""
				&& (props.values['petType'].toLowerCase() === returnRequestTypes("petType_Others").toLowerCase()
					&& props.values['otherAnimalTypes'] === ""))) {
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

export const URLRouting = (categories, categoryId) =>{
	if(categories.length > 0 && categoryId){

		let nameSubCat = '';
		let idSubCat = '';
		let nameCat = '';
		let idCat = '';

		const getSelectedSubCategory = categories.find(items => (items.types.find(type => type.id === categoryId)));

		if (getSelectedSubCategory){
			nameCat = getSelectedSubCategory.name;
			idCat = getSelectedSubCategory.id;
			nameSubCat = getSelectedSubCategory.types.find(type => type.id === categoryId).name;
			idSubCat = getSelectedSubCategory.types.find(type => type.id === categoryId).id;
		}
		else
		{
			const getSelectedCategory = _.filter(categories, { id: categoryId });
			nameCat = (getSelectedCategory.length > 0) ? getSelectedCategory[0].name : '' ;
			idCat =  (getSelectedCategory.length > 0) ? getSelectedCategory[0].id : '' ;
		}

		const Selections = {
			"nameCategory":  nameCat ,
			"idCategory": idCat ,
			"nameSubCategory": nameSubCat ,
			"idSubCategory": idSubCat
		}

		return Selections
	}
	else{
		return null;
	}
}

export const SetFieldValues = (props, fields) => {
	Object.entries(fields).forEach(field => {
	  props.setFieldValue(field[0], field[1]);
	});
};


export default IsFormInComplete