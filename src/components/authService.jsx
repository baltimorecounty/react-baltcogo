import http from "./httpService";
import { returnAPIEndPoint } from "./returnEnvironmentItems"

export function Login(email, password) {
	const endpointLogin = returnAPIEndPoint("apiLoginUrl");
	return http.post(endpointLogin, { email, password });
}
export function SignUp(NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) {
	const endpointSignUp = returnAPIEndPoint("apiSignInUrl");
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
	const endpointResetPassword = returnAPIEndPoint("apiPasswordResetUrl");
	return http.post(endpointResetPassword, { Email });
}
export function CreateReport(data) {
	const endpointReport = returnAPIEndPoint("apiReportUrl");
	return http.post(endpointReport, data );
}

export function GetReportByID(ReportID) {
	const endpointReport = returnAPIEndPoint("apiReportUrl");
	return http.get(endpointReport + ReportID);
}

export function GetReportByLatLong(X, Y) {
	const endpointReport = returnAPIEndPoint("apiReportUrl");
	return http.get(endpointReport + X + Y);
}

export function GetReportByLatLongRadius(X, Y, Radius) {
	const endpointReport = returnAPIEndPoint("apiReportUrl");
	return http.get(endpointReport + X + Y + Radius);
}

export function VerifyAddress(address) {
	const endpointVerifyAddress = returnAPIEndPoint("apiVerifyAddressUrl");
	return http.get(endpointVerifyAddress + "/" + address);
}

export function GetContactAddress(id) {
	const endpointContacts = returnAPIEndPoint("apiContactUrl");
	return http.get(endpointContacts + id + "/addresses");
}

export function GetContactDetails(id) {
	const endpointContacts = returnAPIEndPoint("apiContactUrl");
	return http.get(endpointContacts + id);
}

export function CreateContactAddress(id, VerificationId, Name) {
	const endpointContacts = returnAPIEndPoint("apiContactUrl");
	const response = http.post(endpointContacts + id + "/addresses", { VerificationId, Name });
	return response;
}
