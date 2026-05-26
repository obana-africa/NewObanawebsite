/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
// import { handleCompleteLogout } from '@/utils/auth';
import { jwtDecode } from "jwt-decode";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
const unAuthenticatedApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
let refreshingPromise: any = null;

type FailedRequest = {
	resolve: (value: string | null) => void;
	reject: (reason?: any) => void;
};

const processQueue = (
	error: Error | null,
	token: string | null = null
): void => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

api.interceptors.request.use(async (req) => {
	if (refreshingPromise) {
		await refreshingPromise;
	}
	const accessToken = Cookies.get("token");
	const claims = accessToken ? jwtDecode(accessToken as string) : {};

	const expiration = claims?.exp ? new Date(claims?.exp * 1000) : new Date();
	const now = new Date();
	now.setSeconds(now.getSeconds() - 10);

	if (now > expiration) {
		if (!refreshingPromise) {
			refreshingPromise = getRefreshedToken();
		}
		await refreshingPromise();

		refreshingPromise = null;
	}

	if (
		accessToken &&
		accessToken !== "null" &&
		accessToken !== "undefined" &&
		req.headers
	) {
		req.headers["Authorization"] = `Bearer ${accessToken}`;
	}
	return req;
});

api.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const originalRequest = error.config;

		if (
			(error?.response?.status === 401 || error?.response?.status === 403) &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] = `Bearer ${token}`;
						return api(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const refreshToken = Cookies.get("refresh_token");
			if (!refreshToken && originalRequest._retry) {
				toast.error("Session expired. Please login again.");
				originalRequest._retry = false;
				// return handleCompleteLogout();
			}
			try {
				const response = await getRefreshedToken();
				const { access_token } = response;
				api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
				processQueue(null, access_token);
				return api(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as unknown as Error, null);
				throw refreshError;
			} finally {
				isRefreshing = false;
			}
		}

		throw error?.response?.data ?? error?.message;
	}
);

export const getRefreshedToken = async () => {
	const refreshToken = Cookies.get("refresh_token");
	if (refreshToken) {
		try {
			const response = await unAuthenticatedApi.post("/users/token", {
				refresh_token: refreshToken,
			});
			const { access_token, refresh_token } = response.data;
			Cookies.set("token", access_token, { path: "/" });
			if (refresh_token) {
				Cookies.set("refresh_token", refresh_token, { path: "/" });
			}
			api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
			return response.data;
		} catch (error: any) {
			if (error?.message === "Access Denied") {
				processQueue(error, null);
				toast.error("Session expired. Please login again.");
				// handleCompleteLogout();
			} else {
				toast.error(
					error?.message?.message ||
						error?.message ||
						"Unable to refresh session"
				);
			}
			return null;
		}
	}
};

api.interceptors.request.use(async (req) => {
	const authorization = req.headers["Authorization"];

	if (
		authorization === undefined ||
		authorization === "Bearer null" ||
		authorization === "Bearer undefined" ||
		"null"
	) {
		const token = Cookies.get("token");
		req.headers["Authorization"] = `Bearer ${token}`;
	}

	return req;
});
unAuthenticatedApi.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		throw error?.response?.data ?? error?.message;
	}
);

export { unAuthenticatedApi };
export default api;

export const publicApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

publicApi.interceptors.response.use(
	(response) => response.data,
	(error) => {
		throw error?.response?.data ?? error?.message;
	}
);
