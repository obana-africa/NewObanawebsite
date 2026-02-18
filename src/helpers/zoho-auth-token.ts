import axios from "axios";

interface ZohoTokenResponse {
	access_token: string;
	expires_in: number;
	error?: string;
}

interface ZohoAuthConfig {
	authUrl: string;
	refreshToken: string;
	clientId: string;
	clientSecret: string;
}

class ZohoTokenManager {
	private accessToken: string | null = null;
	private accessTokenExpiry: number = 0;
	private config: ZohoAuthConfig;
	private tokenType: string;

	constructor(config: ZohoAuthConfig, tokenType: string = "API") {
		this.config = config;
		this.tokenType = tokenType;
	}

	async getAccessToken(retries: number = 3): Promise<string> {
		if (this.accessToken && Date.now() < this.accessTokenExpiry) {
			console.log(`Using cached ${this.tokenType} access token`);
			return this.accessToken;
		}

		let lastError: Error | null = null;

		for (let attempt = 1; attempt <= retries; attempt++) {
			try {
				const response = await axios.post(
					this.config.authUrl,
					new URLSearchParams({
						refresh_token: this.config.refreshToken,
						client_id: this.config.clientId,
						client_secret: this.config.clientSecret,
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
					throw new Error(`Failed to refresh token: ${data.error}`);
				}

				this.accessToken = data.access_token;
				this.accessTokenExpiry = Date.now() + data.expires_in * 1000 - 30000;

				console.log(`New ${this.tokenType} access token generated`);
				return this.accessToken;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				lastError = error;
				console.error(`Attempt ${attempt} failed:`, error.message);
				if (attempt < retries) {
					await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
				}
			}
		}

		throw new Error(
			`All retry attempts failed for ${this.tokenType} token: ${lastError?.message}`
		);
	}
}

const apiTokenManager = new ZohoTokenManager(
	{
		authUrl: process.env.ZOHO_AUTH_URL || "",
		refreshToken: process.env.ZOHO_REFRESH_TOKEN || "",
		clientId: process.env.ZOHO_CLIENT_ID || "",
		clientSecret: process.env.ZOHO_CLIENT_SECRET || "",
	},
	"API"
);

// Mail Token Manager
// const mailTokenManager = new ZohoTokenManager(
// 	{
// 		authUrl: process.env.ZOHO_AUTH_URL || "",
// 		refreshToken: process.env.MAIL_REFRESH_TOKEN || "",
// 		clientId: process.env.ZOHO_MAIL_CLIENT_ID || "",
// 		clientSecret: process.env.ZOHO_MAIL_CLIENT_SECRET || "",
// 	},
// 	"Mail"
// );

// CRM Token Manager
const crmTokenManager = new ZohoTokenManager(
	{
		authUrl: process.env.ZOHO_AUTH_URL || "",
		refreshToken: process.env.ZOHO_CRM_REFRESH_TOKEN || "",
		clientId: process.env.ZOHO_CLIENT_ID || "",
		clientSecret: process.env.ZOHO_CLIENT_SECRET || "",
	},
	"CRM"
);

// Export functions for each token type
export const getAccessToken = () => apiTokenManager.getAccessToken();
export const getMailAccessToken = () => apiTokenManager.getAccessToken();
export const getCrmAccessToken = () => crmTokenManager.getAccessToken();

export async function getCrmAccessTokenLegacy(): Promise<string> {
	try {
		return await getCrmAccessToken();
	} catch (error) {
		const envToken = process.env.ZOHO_CRM_API_TOKEN;
		if (envToken) {
			console.log("Using CRM token from environment variable");
			return envToken;
		}
		throw error;
	}
}
