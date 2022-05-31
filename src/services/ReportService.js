import { CreateReport } from "../services/authService";
import {
  GetResponseErrors,
  HasResponseErrors,
} from "../utilities/CitysourcedResponseHelpers";
import { Go, Routes } from "../Routing";

export const returnModel = (props, streetAddress, city, zipCode) => {
  const {
    Longitude,
    Latitude,
    ContactID,
    requestTypeID,
    requestTypeParentID,
    requestType,
    requestTypeParent,
    subRequestTypeID,
    subRequestType,
    petTypeID,
    petType,
    sexTypeID,
    sexType,
    animalColorTypeID,
    animalColorType,
    animalBreedType,
    animalBreedID,
    otherAnimalTypesID,
    otherAnimalTypes,
    describeTheProblem,
    requestTypeDescriptionID,
    requestTypeAddressID,
    requestTypeCityID,
    requestTypeZipID,
  } = props.formik.values;

  const reportItems = [
    requestTypeParentID === "NoIDNeeded" || requestTypeID === "NoIDNeeded" //These parent types are no longer needed and have to pass a null value.
      ? { Id: "", Value: "" }
      : requestTypeParentID
      ? { Id: requestTypeParentID, Value: requestTypeParent }
      : { Id: requestTypeID, Value: requestType },
    { Id: subRequestTypeID, Value: subRequestType },
    { Id: petTypeID, Value: petType },
    { Id: sexTypeID, Value: sexType },
    { Id: animalColorTypeID, Value: animalColorType },
    { Id: animalBreedID, Value: animalBreedType },
    { Id: otherAnimalTypesID, Value: otherAnimalTypes },
    { Id: requestTypeDescriptionID, Value: describeTheProblem },
    { Id: requestTypeAddressID, Value: streetAddress },
    { Id: requestTypeCityID, Value: city },
    { Id: requestTypeZipID, Value: zipCode },
  ].filter((item) => !!item.Id);

  console.log(reportItems);

  var itemsToSubmit = {
    AppVersion: "308",
    Location: {
      X: Longitude,
      Y: Latitude,
    },
    AuthorId: ContactID,
    IsPrivate: false,
    Locale: "en",
    ReportItems: reportItems,
    SuppressWorkflows: false,
  };

  return itemsToSubmit;
};

export const SubmitReport = async (actions, props) => {
  const streetAddress = props.formik.values.streetAddress;
  const city = props.formik.values.city;
  const zipCode = props.formik.values.zipCode;
  const itemsToSubmit = returnModel(props, streetAddress, city, zipCode);

  let response = null;
  try {
    response = await CreateReport(itemsToSubmit);
    if (HasResponseErrors(response)) {
      const errorsReturned = GetResponseErrors(response);
      props.formik.setStatus({ responseError: errorsReturned });
    }

    props.formik.setStatus({ responseError: null });
  } catch (ex) {
    console.error(ex.message);
  }

  Go(props, Routes.SubmitForm, response);
};

export default SubmitReport;
