import http from "./httpService";
import { apiLoginUrl, apiSignInUrl, apiPasswordResetUrl, apiCreateReportUrl } from "./config.json";
const apiEndpointLogin = apiLoginUrl + "/login";
const apiEndpointSignUp = apiSignInUrl + "/SignUp";
const apiEndpointPasswordReset = apiPasswordResetUrl + "/Password";
const apiEndpointCreateReport = apiCreateReportUrl + "/CreateReport";
//const proxyurl = "https://cors-anywhere.herokuapp.com/";  // thhis does not work 
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
export function PasswordReset(password) {

	return http.post( apiEndpointPasswordReset, { password });
}

export function CreateReport() {
	//TODO: use end point
}
