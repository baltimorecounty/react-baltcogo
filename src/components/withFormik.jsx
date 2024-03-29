import { withFormik } from "formik";
import * as Yup from "yup";
import IssueType from "./IssueType";

export default withFormik({
  //displayName: 'WizardForm',
  enableReinitialize: true,
  mapPropsToValues: () => ({
    ContactID: "",
    fullAddress: "",
    VerificationId: "",
    requestTypeDescriptionID: "",
    requestTypeAddressID: "",
    requestTypeCityID: "",
    requestTypeZipID: "",
    requestTypeID: "",
    requestTypeParentID: "",
    requestType: "",
    requestTypeParent: "",
    subRequestTypeID: "",
    subRequestType: "",
    subRequestTypeDescription: "",
    subRequestTypeDescriptionID: "",
    subRequestTypeAddressID: "",
    subRequestTypeCityID: "",
    subRequestTypeZipID: "",
    subRequestTypeAddress: "",
    subRequestTypeCity: "",
    subRequestTypeZip: "",
    anonLogin: "",
    transhRecycleIssueType: "",
    trashRecycleIssueTypeID: "",
    serviceDescription: "",
    petType: "",
    petTypeID: "",
    animalBreedType: "",
    animalBreedID: "",
    sexType: "",
    sexTypeID: "",
    animalColorType: "",
    animalColorTypeID: "",
    otherAnimalTypes: "",
    otherAnimalTypesID: "",
    trackingNumber: "",
    Email: "",
    Password: "",
    NameFirst: "",
    NameLast: "",
    Telephone: "",
    location: "",
    describeTheProblem: "",
    MapDefaults: [""],
    Latitude: "",
    Longitude: "",
    ShowErrorMsg: "",
    contactID: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    shouldDisableForm: false,
    requiresLocation: true,
    isPanelRequired: true,
    ignoreFormCompletion: false,
    hasPasswordReset: false,
    Tabs: [""],
    RequestPage: [""],
    MapPage: [""],
    AdditionalInfoPage: [""],
    SignUpPage: [""],
    SignInPage: [""],
    ResetPasswordPage: [""],
    ZoomValue: "",
    AlertAtPage: "",
  }),

  validationSchema: () =>
    Yup.object().shape({
      requestType: Yup.string().required("Please select a request category."),
      subRequestType: Yup.string().required("Please select a sub-category."),
      transhRecycleIssueType: Yup.string().required(
        "Please select an issue type."
      ),
      petType: Yup.string().required("Please select a pet type."),
      animalColorType: Yup.string().required(
        "Primary Animal Color is required"
      ),
      serviceDescription: Yup.string().required(
        "Service Description is required"
      ),
      location: Yup.string().required(
        "You must select a location inside Baltimore County."
      ),
      describeTheProblem: Yup.string().required(
        "Please enter a description for your report."
      ),
      streetAddress: Yup.string().required("Please enter your street address."),
      city: Yup.string().required("Please enter your city."),
      zipCode: Yup.string().required("Please enter your ZIP code."),
    }),
});
