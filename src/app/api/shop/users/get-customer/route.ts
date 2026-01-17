/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAccessToken } from "@/helpers/zoho-auth-token";

const ZOHO_BASE_URL = process.env.ZOHO_BASE_URL;

async function getZohoCustomerById(contactId: string, accessToken: string) {
	const response = await axios.get(`${ZOHO_BASE_URL}/contacts/${contactId}`, {
		headers: {
			Authorization: `Zoho-oauthtoken ${accessToken}`,
		},
		params: {
			organization_id: process.env.ZOHO_ORG_ID || "",
		},
	});
	return response.data;
}

async function searchZohoCustomerByEmail(email: string, accessToken: string) {
	const response = await axios.get(`${ZOHO_BASE_URL}/contacts`, {
		headers: {
			Authorization: `Zoho-oauthtoken ${accessToken}`,
		},
		params: {
			organization_id: process.env.ZOHO_ORG_ID || "",
			email,
			per_page: 10,
		},
	});

	const contacts = response.data?.contacts || [];
	if (contacts.length === 0) return null;

	return contacts[0];
}

export async function GET(request: NextRequest) {
	try {
		const allow = request.nextUrl.searchParams.get("allow");
		if (allow !== "tajiro") {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const contactId =
			request.nextUrl.searchParams.get("id") ||
			request.nextUrl.searchParams.get("contact_id") ||
			request.nextUrl.searchParams.get("zoho_id");

		if (!contactId) {
			return NextResponse.json(
				{ success: false, message: "Missing required parameter: ?id=" },
				{ status: 400 }
			);
		}

		let accessToken = await getAccessToken();
		let customer: any = null;

		try {
			if (contactId) {
				customer = await getZohoCustomerById(contactId, accessToken);
			}
		} catch (err: any) {
			if (
				err.response?.status === 401 ||
				err.message?.toLowerCase().includes("unauthorized") ||
				err.message?.includes("invalid oauth")
			) {
				console.log("[GET /customer] Retrying with fresh token...");
				accessToken = await getAccessToken();

				if (contactId) {
					customer = await getZohoCustomerById(contactId, accessToken);
				}
			} else {
				throw err;
			}
		}

		if (!customer) {
			return NextResponse.json(
				{ success: false, message: "Customer not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: customer,
		});
	} catch (error: any) {
		console.error("Error fetching Zoho customer:", error);

		const status = error.response?.status || 500;
		const message =
			error.response?.data?.message ||
			error.message ||
			"Failed to retrieve customer from Zoho";

		return NextResponse.json(
			{
				success: false,
				message,
				error: status >= 500 ? "Internal server error" : undefined,
			},
			{ status }
		);
	}
}
