import http from "./httpService";
import { endPoints } from "./config.js";

const environment = window.location.href;
var urlParts = environment.replace('http://','').replace('https://','').split(/[/?#]/);
var domain =  urlParts[0];

var endpointLogin = endPoints.apiLoginUrl;
var endpointSignUp = endPoints.apiSignInUrl;
var endpointResetPassword = endPoints.apiPasswordResetUrl;
var endpointReport = endPoints.apiReportUrl;
var endpointContacts = endPoints.apiContactUrl;
var endpointVerifyAddress = endPoints.apiVerifyAddressUrl
 
if (domain === "dev.baltimorecountymd.gov"){
	endpointLogin = endPoints.apiTestLoginUrl
	endpointSignUp = endPoints.apiTestSignInUrl
 	endpointResetPassword = endPoints.apiTestPasswordResetUrl
	endpointReport = endPoints.apiTestReportUrl
	endpointContacts = endPoints.apiTestContactUrl
	endpointVerifyAddress = endPoints.apiTestVerifyAddressUrl
}else if(domain === "baltimorecountymd.gov"){
	endpointLogin = endPoints.apiProdLoginUrl
	endpointSignUp = endPoints.apiProdSignInUrl
 	endpointResetPassword = endPoints.apiProdPasswordResetUrl
	endpointReport = endPoints.apiProdReportUrl
	endpointContacts = endPoints.apiProdContactUrl
	endpointVerifyAddress = endPoints.apiProdVerifyAddressUrl
};

export function Login(email, password) {
	return http.post(endpointLogin, { email, password });

}
export function SignUp(NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) {
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

	return http.post(endpointResetPassword, { Email });
}

export function CreateReport(data) {

	return http.post(endpointReport, { data });
}

export function GetReportByID(ReportID) {
	return http.get(endpointReport + ReportID);
}

export function GetReportByLatLong(X, Y) {
	return http.get(endpointReport + X + Y);
}

export function GetReportByLatLongRadius(X, Y, Radius) {
	return http.get(endpointReport + X + Y + Radius);
}

export function VerifyAddress(address) {
	return http.get(endpointVerifyAddress + "/" + address);
}

export function GetContactAddress(id) {
	return http.get(endpointContacts + id + "addresses");
}

export function CreateContactAddress(id, VerificationId, Name) {

	const response = http.post(endpointContacts + id + "/", { VerificationId, Name });
	return response;
}
