import http from "./httpService";
import { apiLoginUrl } from "./config.json";
const apiEndpoint = apiLoginUrl + "/login";
export function login(email, password) {

	return http.post(apiEndpoint, { email, password });
}
