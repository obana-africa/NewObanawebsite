import { NextResponse } from "next/server";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";
import { FormData } from "./types";
import { formatFormType } from "./helpers";
import { 
  generateProductDetailsSection, 
  generateAdminEmailTemplate, 
  generateCustomerEmailTemplate 
} from "./templates";

export async function POST(request: Request) {
	try {
		const body: FormData = await request.json();

		const accessToken = await getMailAccessToken();
		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;

		const productDetailsSection = generateProductDetailsSection(body);
		// console.log("Product Details Section:", productDetailsSection);

		const adminEmailData = {
			fromAddress: "'OBANA RFQ FORM' <ochije.nnani@iconholding.africa>",
			toAddress: process.env.RFQ_MAIL_TO_ADDRESS,
			subject: `New ${formatFormType(body.formType)} RFQ Submission from ${
				body.name
			}`,
			content: generateAdminEmailTemplate(body, productDetailsSection),
		};

		const customerEmailData = {
			fromAddress: "'OBANA' <ochije.nnani@iconholding.africa>",
			toAddress: body.email,
			subject: `Thank you for your ${formatFormType(
				body.formType
			)} RFQ submission`,
			content: generateCustomerEmailTemplate(body, productDetailsSection),
		};
		
		// console.log("Admin Email Data:", adminEmailData);
		// console.log("Customer Email Data:", customerEmailData);
		const apiUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages`;

		await axios.post(apiUrl, adminEmailData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		await axios.post(apiUrl, customerEmailData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		return NextResponse.json({ success: true });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Error processing RFQ form:", error);
		return NextResponse.json(
			{ message: error.response?.data?.message || "Error sending RFQ emails" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
