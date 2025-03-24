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

let accessToken: string | null = null;
let accessTokenExpiry: number = Date.now();
// console.log("accessTokenExpiry token:", accessTokenExpiry);



export async function getAccessToken(retries = 3) {
	if (accessToken && Date.now() < accessTokenExpiry) {
		console.log("Using cached access token:", accessToken);
		return accessToken;
	}

	let lastError: Error | null = null;

	for (let i = 0; i < retries; i++) {
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
			// console.log("Zoho Token Response:", data);

			if (response.status !== 200) {
				throw new Error(`Failed to refresh Zoho access token: ${data.error}`);
			}

			accessToken = data.access_token;
			accessTokenExpiry = Date.now() + data.expires_in * 1000;

			console.log("New access token generated:", accessToken);
			return accessToken;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			lastError = error;
			console.error(`Attempt ${i + 1} failed:`, error.message);
			if (i < retries - 1) {
				// Wait for 2 seconds before retrying (exponential backoff can also be used)
				await new Promise((resolve) => setTimeout(resolve, 2000));
			}
		}
	}

	console.error("All retry attempts failed:", lastError?.message);
	throw new Error(`Error refreshing Zoho access token: ${lastError?.message}`);
}