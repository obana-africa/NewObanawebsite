import { NextResponse } from "next/server";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const recaptchaResponse = body.recaptcha;
		const secretKey = process.env.RECAPTCHA_SECRET_KEY;

		const recaptchaVerify = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`,
			{ method: "POST" }
		);
		const recaptchaData = await recaptchaVerify.json();

		if (!recaptchaData.success) {
			return NextResponse.json(
				{ message: "reCAPTCHA verification failed" },
				{ status: 400 }
			);
		}

		const { firstName, lastName, email, phone, message } = body;

		const accessToken = await getMailAccessToken();
		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;

		const emailData = {
			fromAddress:
				"'OBANA LANDING PAGE CONTACT FORM' <ochije.nnani@iconholding.africa>",
			toAddress: process.env.ZOHO_MAIL_TO_ADDRESS,
			subject: `New Contact Form Submission from ${firstName} ${lastName}`,
			content: `
        <div style="font-family: Arial, sans-serif; text-align: center; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
      <img src="https://www.obana.africa/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobana.africa.6c072a90.png&w=1920&q=75" alt="Obana Office Logo" style="width: 100px; margin-bottom: 20px;" />
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
            ${message}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
		};

		const apiUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages`;

		await axios.post(apiUrl, emailData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		return NextResponse.json({ success: true });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Error processing contact form:", error);
		return NextResponse.json(
			{ message: error.response?.data?.message || "Error sending email" },
			{ status: 500 }
		);
	}
}

// Optionally add other HTTP methods if needed
export async function GET() {
	return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
