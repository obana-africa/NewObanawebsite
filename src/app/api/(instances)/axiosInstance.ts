import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
const unAuthenticatedApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,

});
const termApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_TERMINAL_AFRICA_BASE_URL,

});


export { termApi };
export { unAuthenticatedApi };
export default api;