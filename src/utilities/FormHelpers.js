export const IsFormInComplete = (props, category) => {
  const { isAnimal: isAnimalCategory } = category || {};
  const {
    otherAnimalTypes,
    animalColorType,
    petType,
    requestType,
    subRequestType,
  } = props.values || {};

  if (!requestType || !subRequestType) {
    return true;
  }

  if (isAnimalCategory) {
    if (!petType) {
      return true;
    }

    const isCatOrDog =
      petType.toLowerCase() === "cat" || petType.toLowerCase() === "dog";

    if (isCatOrDog && !animalColorType) {
      return true;
    }

    const isOtherPetType = petType.toLowerCase() === "other";

    if (isOtherPetType && !otherAnimalTypes) {
      return true;
    }
  }

  return false;
};

export const URLRouting = (categories, categoryId) => {

  if (categories.length > 0 && categoryId) {
    let nameSubCat = "";
    let idSubCat = "";
    let nameCat = "";
    let idCat = "";
    
    const getSelectedCategory = categories.find(
      (items) => items.id.toString() === categoryId
    );

    if(getSelectedCategory){
      nameCat = getSelectedCategory ? getSelectedCategory.name : "";
      idCat = getSelectedCategory ? getSelectedCategory.id : "";
    }
    else {
      const getSelectedSubCategory = categories.find((items) =>
      items.types.find((type) => type.id.toString() === categoryId) 
    );
      nameCat = getSelectedSubCategory.name;
      idCat = getSelectedSubCategory.id;
      nameSubCat = getSelectedSubCategory.types.find(
        (type) => type.id.toString() === categoryId
      ).name;
      idSubCat = getSelectedSubCategory.types.find(
        (type) => type.id.toString() === categoryId
      ).id;
    } 
      
    
    

    const Selections = {
      nameCategory: nameCat,
      idCategory: idCat,
      nameSubCategory: nameSubCat,
      idSubCategory: idSubCat,
    };

    return Selections;
  } else {
    return null;
  }
};

export const SetFieldValues = (props, fields) => {
  Object.entries(fields).forEach((field) => {
    props.setFieldValue(field[0], field[1]);
  });
};

export default IsFormInComplete;
