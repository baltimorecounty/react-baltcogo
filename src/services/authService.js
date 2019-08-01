import http from "./httpService";
import { returnConfigItems } from "../utilities//returnEnvironmentItems"

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
	const endpointReport = returnConfigItems("endPoints","apiReportUrl");
	return http.post(endpointReport, data );
}

export function GetReportByID(ReportID) {
	const endpointReport =returnConfigItems("endPoints","apiReportUrl");
	return http.get(endpointReport + ReportID);
}

export function GetReportByLatLong(X, Y) {
	const endpointReport = returnConfigItems("endPoints","apiReportUrl");
	return http.get(endpointReport + X + Y);
}

export function GetReportByLatLongRadius(X, Y, Radius) {
	const endpointReport = returnConfigItems("endPoints","apiReportUrl");
	return http.get(endpointReport + X + Y + Radius);
}

export function VerifyAddress(address) {
	const endpointVerifyAddress = returnConfigItems("endPoints","apiVerifyAddressUrl");
	return http.get(endpointVerifyAddress + "/" + address);
}

export function GetContactAddress(id) {
	const endpointContacts = returnConfigItems("endPoints","apiContactUrl");
	return http.get(endpointContacts + id + "/addresses");
}

export function GetContactDetails(id) {
	const endpointContacts = returnConfigItems("endPoints","apiContactUrl");
	return http.get(endpointContacts + id);
}

export function CreateContactAddress(id, VerificationId, Name) {
	const endpointContacts =returnConfigItems("endPoints","apiContactUrl");
	const response = http.post(endpointContacts + id + "/addresses", { VerificationId, Name });
	return response;
}
