import http from "./httpService";
import { apiUrl } from "./config.json";
const apiEndpoint = apiUrl + "/login";
const proxyurl ="https://cors-anywhere.herokuapp.com/";  // thhis does not work 
export function login(email, password) {

	return http.post(proxyurl + apiEndpoint, { email, password });
}
