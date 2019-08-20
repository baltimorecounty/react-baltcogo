import http from "./httpService";
import { returnConfigItems } from "../utilities//returnEnvironmentItems"

const apiReportUrl = returnConfigItems("endPoints","apiReportUrl");
const apiContactUrl = returnConfigItems("endPoints","apiContactUrl");
const apiResetPassword = returnConfigItems("endPoints","apiPasswordResetUrl");
const apiVerifyAddress = returnConfigItems("endPoints","apiVerifyAddressUrl");
const apiLogin = returnConfigItems("endPoints","apiLoginUrl");
const apiSignUp = returnConfigItems("endPoints","apiSignInUrl");

export const Login = (email, password) => http.post(apiLogin, { email, password });

export const SignUp = (NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) => http.post(apiSignUp, { NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications });

export const ResetPassword = (Email) => http.post(apiResetPassword, { Email });

export const  CreateReport = (data) =>  http.post(apiReportUrl, data );

export const  GetReportByID = (ReportID) => http.get(apiReportUrl + ReportID);

export const  GetReportComments = (ReportID) => http.get(apiReportUrl + ReportID + '/comments');

export const GetReportByLatLong = (X, Y) => http.get(apiReportUrl + X + Y);

export const  GetReportByLatLongRadius = (X, Y, Radius) =>  http.get(apiReportUrl + X + Y + Radius);

export const VerifyAddress = (address) => http.get(apiVerifyAddress + "/" + address);

export const GetContactAddress = (id) =>http.get(apiContactUrl + id + "/addresses");

export const GetContactDetails = (id) => http.get(apiContactUrl + id);

export const CreateContactAddress = (id, VerificationId, Name) => http.post(apiContactUrl + id + "/addresses", { VerificationId, Name });

