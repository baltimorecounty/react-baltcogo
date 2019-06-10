import http from "./httpService";
import { apiLoginUrl, apiSignInUrl, apiPasswordResetUrl, apiCreateReportUrl } from "./config.json";
const apiEndpointLogin = apiLoginUrl + "/login";
const apiEndpointSignUp = apiSignInUrl + "/SignUp";
const apiEndpointPasswordReset = apiPasswordResetUrl + "/password/";
const apiEndpointCreateReport = apiCreateReportUrl + "/CreateReport";

export function Login(email, password) {
	return http.post( apiEndpointLogin, { email, password });

}
export function SignUp(NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) {
	return http.post(apiEndpointSignUp, { 
		NameFirst, 
		NameLast, 
		Email, 
		Password, 
		Telephone, 
		UniqueId, 
		SuppressNotifications });
}
export function PasswordReset(email) {

	return http.post( apiEndpointPasswordReset, { email });
}

export function CreateReport() {
	//TODO: use end point
}
