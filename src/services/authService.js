import http from "./httpService";
import { returnConfigItems } from "../utilities//returnEnvironmentItems"

const reportItems = returnConfigItems("endPoints","apiReportUrl");
const contactItems = returnConfigItems("endPoints","apiContactUrl");

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
export function CreateReport(data) {
	return http.post(reportItems, data );
}
export function GetReportByID(ReportID) {
	return http.get(reportItems + ReportID);
}
export function GetReportByLatLong(X, Y) {

	return http.get(reportItems + X + Y);
}
export function GetReportByLatLongRadius(X, Y, Radius) {
	return http.get(reportItems + X + Y + Radius);
}
export function VerifyAddress(address) {
	const endpointVerifyAddress = returnConfigItems("endPoints","apiVerifyAddressUrl");
	return http.get(endpointVerifyAddress + "/" + address);
}
export function GetContactAddress(id) {
	return http.get(contactItems + id + "/addresses");
}
export function GetContactDetails(id) {
	return http.get(contactItems + id);
}
export function CreateContactAddress(id, VerificationId, Name) {
	const response = http.post(contactItems + id + "/addresses", { VerificationId, Name });
	return response;
}
