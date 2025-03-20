import { getAccessToken } from "@/helpers/zoho-auth-token";
import axios from "axios";

interface SubscribeToNewsletterParams {
	email: string;
}

interface ZohoResponse {
	status: string;
	message: string;
	response: {
		message: string;
	};
}

const getCampaignInstance = async () => {
	const ZOHO_CAMPAIGNS_ENDPOINT = process.env.ZOHO_CAMPAIGNS_ENDPOINT;

	if (!ZOHO_CAMPAIGNS_ENDPOINT) {
		throw new Error(
			"ZOHO_CAMPAIGNS_ENDPOINT is not defined in environment variables"
		);
	}

	const token = await getAccessToken();
	console.log("Zoho Token:", token);

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

	const campaignInstance = await getCampaignInstance();

	try {
		const response = await campaignInstance.post("/json/listsubscribe", null, {
			params: {
				resfmt: "JSON",
				listkey: listId,
				contactinfo: JSON.stringify({ "Contact Email": email }),
				source: "Website", 
			},
		});

		const data: ZohoResponse = response.data;
		// console.log("API Response:", data);

		if (data.status === "success") {
			return { success: true, message: data.message };
		} else {
			throw new Error(data.response.message);
		}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("API Error:", error.response?.data || error.message);
		if (error?.status === 401) {
			throw new Error(
				"Authentication failed with Zoho. Please try again later."
			);
		}
		throw new Error(
			error.response?.data?.response?.message || "Something went wrong"
		);
	}
};
