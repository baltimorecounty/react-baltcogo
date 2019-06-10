import http from "./httpService";
import { apiLoginUrl, apiSignInUrl, apiPasswordResetUrl, apiCreateReportUrl } from "./config.json";
const apiEndpointLogin = apiLoginUrl + "/login";
const apiEndpointSignUp = apiSignInUrl + "/SignUp";
const apiEndpointPasswordReset = apiPasswordResetUrl + "/PasswordReset";
const apiEndpointCreateReport = apiCreateReportUrl + "/CreateReport";

export function login(email, password) {
	return http.post(apiEndpointLogin, { email, password });

}
export function SignUp(NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) {
	return http.post(apiEndpointSignUp, { NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications });

	// TODO : use end point 
}
export function PasswordReset() {

	//TODO:use end point
}

export function CreateReport() {
	//TODO: use end point
}
