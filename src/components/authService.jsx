import http from "./httpService";
import { endPoints } from "./config.js";

const environment = window.location.href;
var urlParts = environment.replace('http://','').replace('https://','').split(/[/?#]/);
var domain =  urlParts[0];

var endpointLogin = endPoints.apiLoginUrl;
var endpointSignUp = endPoints.apiSignInUrl;
var endpointResetPassword = endPoints.apiPasswordResetUrl;
var endpointReport = endPoints.apiReportUrl;
 
if (domain === "dev.baltimorecountymd.gov"){
	endpointLogin = endPoints.apiTestLoginUrl
	endpointSignUp = endPoints.apiTestSignInUrl
 	endpointResetPassword = endPoints.apiTestPasswordResetUrl
	endpointReport = endPoints.apiTestReportUrl
}else if(domain === "baltimorecountymd.gov"){
	endpointLogin = endPoints.apiProdLoginUrl
	endpointSignUp = endPoints.apiProdSignInUrl
 	endpointResetPassword = endPoints.apiProdPasswordResetUrl
	endpointReport = endPoints.apiProdReportUrl
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
	return fetch(endpointReport, {
		method: 'POST',
		mode: 'CORS',
		body: JSON.stringify(data), 
	}).then(res => {
		return res;
	}).catch(err => err);
}

export function GetReportByID(ID) {
	return http.get(endpointReport + ID);
}
