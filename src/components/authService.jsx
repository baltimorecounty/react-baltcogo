import http from "./httpService";
import { apiLoginUrl, apiSignInUrl, apiPasswordResetUrl, apiCreateReportUrl } from "./config.json";

export function Login(email, password) {
	return http.post(apiLoginUrl, { email, password });

}
export function SignUp(NameFirst, NameLast, Email, Password, Telephone, UniqueId, SuppressNotifications) {
	return http.post(apiSignInUrl, { 
		NameFirst, 
		NameLast, 
		Email, 
		Password, 
		Telephone, 
		UniqueId, 
		SuppressNotifications });
}
export function ResetPassword(Email) {

	return http.post(apiPasswordResetUrl, { Email });
}

export function CreateReport() {
	//TODO: use end point
}
