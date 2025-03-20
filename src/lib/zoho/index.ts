import { getAccessToken } from "@/helpers/zoho-auth-token";
import axios from "axios";

interface SubscribeToNewsletterParams {
	email: string;
}

interface ZohoResponse {
	response: {
		status: string;
		message: string;
	};
}

// Create a function to get a configured axios instance
const getCampaignInstance = async () => {
	const ZOHO_CAMPAIGNS_ENDPOINT = process.env.ZOHO_CAMPAIGNS_ENDPOINT;

	if (!ZOHO_CAMPAIGNS_ENDPOINT) {
		throw new Error(
			"ZOHO_CAMPAIGNS_ENDPOINT is not defined in environment variables"
		);
	}

	const token = await getAccessToken();

	return axios.create({
		baseURL: ZOHO_CAMPAIGNS_ENDPOINT,
		headers: {
			Authorization: `Zoho-oauthtoken ${token}`,
		},
	});
};

export const subscribeToNewsletter = async ({
	email,
}: SubscribeToNewsletterParams) => {
	if (!email) {
		throw new Error("Email is required");
	}

	const listId = process.env.ZOHO_CAMPAIGNS_LIST_KEY;

	if (!listId) {
		throw new Error(
			"ZOHO_CAMPAIGNS_LIST_KEY is not defined in environment variables"
		);
	}

	// Get a fresh instance for each request
	const campaignInstance = await getCampaignInstance();

	try {
		const response = await campaignInstance.post("/json/listsubscribe", {
			resfmt: "JSON",
			listkey: listId,
			contactinfo: { "Contact Email": email },
		});

		const data: ZohoResponse = response.data;

		if (data.response.status === "success") {
			return { success: true, message: data.response.message };
		} else {
			throw new Error(data.response.message);
		}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response?.status === 401) {
			throw new Error(
				"Authentication failed with Zoho. Please try again later."
			);
		}
		throw error;
	}
};
