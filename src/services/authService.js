import http from "./httpService";
import { returnConfigItems } from "../utilities//returnEnvironmentItems"

const apiReportUrl = returnConfigItems("endPoints","apiReportUrl");
const apiContactUrl = returnConfigItems("endPoints","apiContactUrl");

export function Login(email, password) {
	const endpointLogin = returnConfigItems("endPoints","apiLoginUrl");
	return http.post(endpointLogin, { email, password });
}
export function SignUp(NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) {
	const endpointSignUp = returnConfigItems("endPoints","apiSignInUrl");
	return http.post(endpointSignUp, { 
		NameFirst, 
		NameLast, 
		Email, 
		Password, 
		Telephone, 
		UniqueId, 
		SuppressNotifications });
}
export function ResetPassword(Email) {
	const endpointResetPassword = returnConfigItems("endPoints","apiPasswordResetUrl");
	return http.post(endpointResetPassword, { Email });
}
export const  CreateReport = (data) => {
	 return http.post(apiReportUrl, data );
}
export const  GetReportByID = (ReportID) => {
	return http.get(apiReportUrl + ReportID);
}
export const GetReportByLatLong = (X, Y) => {
	return http.get(apiReportUrl + X + Y);
}
export const  GetReportByLatLongRadius = (X, Y, Radius) => {
	return http.get(apiReportUrl + X + Y + Radius);
}
export function VerifyAddress(address) {
	const endpointVerifyAddress = returnConfigItems("endPoints","apiVerifyAddressUrl");
	return http.get(endpointVerifyAddress + "/" + address);
}
export const GetContactAddress = (id) =>{
	return http.get(apiContactUrl + id + "/addresses");
}
export const GetContactDetails = (id) => {
	return http.get(apiContactUrl + id);
}
export const CreateContactAddress = (id, VerificationId, Name) => {
	return http.post(apiContactUrl + id + "/addresses", { VerificationId, Name });
}
