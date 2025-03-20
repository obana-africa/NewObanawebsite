import axios from "axios";

const ZOHO_AUTH_URL = process.env.ZOHO_AUTH_URL || "";

const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;

interface ZohoTokenResponse {
	access_token: string;
	expires_in: number;
	error?: string;
}

let accessTokenExpiry = Date.now();

export async function getAccessToken() {
	const accessToken = process.env.ZOHO_API_TOKEN;

	if (accessToken && Date.now() < accessTokenExpiry) {
		return accessToken;
	}

	try {
		const response = await axios.post(
			ZOHO_AUTH_URL,
			new URLSearchParams({
				refresh_token: ZOHO_REFRESH_TOKEN || "",
				client_id: ZOHO_CLIENT_ID || "",
				client_secret: ZOHO_CLIENT_SECRET || "",
				grant_type: "refresh_token",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		const data = response.data as ZohoTokenResponse;

		if (response.status !== 200) {
			throw new Error(`Failed to refresh Zoho access token: ${data.error}`);
		}

		process.env.ZOHO_API_TOKEN = data.access_token;
		accessTokenExpiry = Date.now() + data.expires_in * 1000;

		return data.access_token;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(`Error refreshing Zoho access token: ${error.message}`);
	}
}
