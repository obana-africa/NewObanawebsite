import { NextResponse } from "next/server";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";
import { LogisticsFormData } from "./types";
import { formatFormType } from "./helpers";
import { generateEmailContent } from "./templates";

export async function POST(request: Request) {
	try {
		const body: LogisticsFormData = await request.json();
		const accessToken = await getMailAccessToken();
		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;

		const adminEmailContent = generateEmailContent(body, true);
		const customerEmailContent = generateEmailContent(body, false);

		const adminEmailData = {
			fromAddress: "'OBANA LOGISTICS' <ochije.nnani@iconholding.africa>",
			toAddress: process.env.RFL_MAIL_TO_ADDRESS,
			subject: `New ${formatFormType(body.formType)} Request from ${
				body.contactInfo.fullName
			}`,
			content: adminEmailContent,
		};

		const customerEmailData = {
			fromAddress: "'OBANA LOGISTICS' <ochije.nnani@iconholding.africa>",
			toAddress: body.contactInfo.email,
			subject: `Your ${formatFormType(body.formType)} Request Confirmation`,
			content: customerEmailContent.replace(
				`New ${formatFormType(body.formType)} Request`,
				`Your ${formatFormType(body.formType)} Request Confirmation`
			),
		};

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
		console.error("Error processing logistics form:", error);
		return NextResponse.json(
			{
				message:
					error.response?.data?.message || "Error sending logistics emails",
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
