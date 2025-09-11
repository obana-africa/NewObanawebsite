import { NextRequest } from "next/server";
import { appendToSheet } from "@/lib/google-sheets";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";

interface FormDataType {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	address?: string;
	bvn?: string;
	tin?: string;
	gender?: string;
	accountNumber?: string;
	bankName?: string;
	businessName?: string;
	salutation?: string;
	dob?: string;
	businessType?: string;
	country?: string;
	state?: string;
	city?: string;
	categoryOfInterest?: string[] | string;
	brandOfInterest?: string[] | string;
	[key: string]: string | string[] | undefined;
}

function generateFinancingEmailContent(
	data: FormDataType,
	recipient: "obana" | "salad" | "customer"
): string {
	const fullName = `${data.salutation || ""} ${data.firstName || ""} ${
		data.lastName || ""
	}`.trim();

	const baseContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Logo" style="width: 150px; margin-bottom: 20px;"/>
        <h2 style="color: #1a365d; margin: 0;">Inventory Financing Request</h2>
      </div>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #1a365d; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          Applicant Information
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 140px;">Full Name:</td>
            <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Email:</td>
            <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
							data.email || ""
						}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Phone:</td>
            <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
							data.phone || ""
						}</td>
          </tr>
          ${
						data.businessName
							? `
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Business Name:</td>
            <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${data.businessName}</td>
          </tr>
          `
							: ""
					}
          ${
						data.businessType
							? `
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Business Type:</td>
            <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${data.businessType}</td>
          </tr>
          `
							: ""
					}
        </table>
      </div>

      <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Logo" style="width: 150px; margin-bottom: 20px;"/>
  `;

	if (recipient === "obana") {
		return `
      ${baseContent}
      <p>A new inventory financing request has been submitted. Please review the details and continue processing the application.</p>
      <p>Encourage the applicant to continue shopping at <a href="https://shop.obana.africa" style="color: #1a365d;">shop.obana.africa</a>.</p>
      <p style="margin-top: 10px;">This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>`;
	} else if (recipient === "salad") {
		return `
      ${baseContent}
      <p>A new inventory financing request has been received. Please review the details and proceed with the necessary actions.</p>
      <p>Encourage the applicant to continue shopping while the request is being processed.</p>
      <p style="margin-top: 10px;">This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>`;
	} else {
		return `
      ${baseContent}
      <p>Thank you for your inventory financing request. We have received your application, and it is currently under review. We will get back to you as soon as possible with further updates.</p>
      <p>In the meantime, feel free to continue shopping at <a href="https://shop.obana.africa" style="color: #1a365d;">shop.obana.africa</a> while we process your request.</p>
      <p>
        <a href="mailto:contact@obana.africa" style="color: #777; text-decoration: none;">📧 contact@obana.africa</a> | 
        <a href="tel:+2348096535511" style="color: #777; text-decoration: none;">📞 +234 809 653 5511</a> | 
        <a href="https://obana.africa" style="color: #777; text-decoration: none;">🌐 obana.africa</a>
      </p>
      <p style="margin-top: 10px;">This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>`;
	}
}

export async function POST(request: NextRequest) {
	try {
		const formData: FormDataType = await request.json();

		const accessToken = await getMailAccessToken();
		if (!accessToken) {
			throw new Error("Failed to retrieve Zoho access token");
		}

		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;
		if (!accountId) {
			throw new Error("ZOHO_MAIL_ACCOUNT_ID environment variable is not set");
		}

		// Validate required fields
		const requiredFields = ["firstName", "lastName", "email", "phone"];
		const missingFields = requiredFields.filter((field) => !formData[field]);

		if (missingFields.length > 0) {
			return Response.json(
				{
					success: false,
					message: `Missing required fields: ${missingFields.join(", ")}`,
				},
				{ status: 400 }
			);
		}

		const timestamp = new Date().toISOString();
		const sheetData = [
			timestamp,
			formData.firstName || "",
			formData.lastName || "",
			formData.email || "",
			formData.phone || "",
			formData.address || "",
			formData.bvn || "",
			formData.tin || "",
			formData.gender || "",
			formData.accountNumber || "",
			formData.bankName || "",
			formData.businessName || "",
			formData.salutation || "",
			formData.dob || "",
			formData.businessType || "",
			formData.country || "",
			formData.state || "",
			formData.city || "",
			Array.isArray(formData.categoryOfInterest)
				? formData.categoryOfInterest.join(", ")
				: formData.categoryOfInterest || "",
			Array.isArray(formData.brandOfInterest)
				? formData.brandOfInterest.join(", ")
				: formData.brandOfInterest || "",
		];

		// Append to Google Sheet with retry logic
		let result;
		let attempt = 0;
		const maxAttempts = 3;

		while (attempt < maxAttempts) {
			try {
				result = await appendToSheet(sheetData);
				break;
			} catch (error) {
				attempt++;
				console.error(`Attempt ${attempt} failed:`, error);

				if (attempt === maxAttempts) {
					throw error;
				}

				// Wait before retrying (exponential backoff)
				await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
			}
		}

		const apiUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages`;

		const obanaEmailData = {
			fromAddress: "'OBANA FINANCING' <ochije.nnani@iconholding.africa>",
			toAddress: "olaoluwajohn06@gmail.com",
			subject: `New Inventory Financing Request from ${formData.firstName} ${formData.lastName}`,
			content: generateFinancingEmailContent(formData, "obana"),
		};

		const saladEmailData = {
			fromAddress: "'OBANA FINANCING' <ochije.nnani@iconholding.africa>",
			toAddress: "olaoluwajohn06@gmail.com",
			subject: `New Inventory Financing Request from ${formData.firstName} ${formData.lastName}`,
			content: generateFinancingEmailContent(formData, "salad"),
		};

		const customerEmailData = {
			fromAddress: "'OBANA FINANCING' <ochije.nnani@iconholding.africa>",
			toAddress: formData.email,
			subject: "Your Inventory Financing Request Confirmation",
			content: generateFinancingEmailContent(formData, "customer"),
		};

		await Promise.all([
			axios
				.post(apiUrl, obanaEmailData, {
					headers: {
						Authorization: `Zoho-oauthtoken ${accessToken}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.catch((error) => {
					console.error(
						"Failed to send Obana email:",
						error.response?.data || error.message
					);
					throw new Error("Failed to send Obana email");
				}),
			axios
				.post(apiUrl, saladEmailData, {
					headers: {
						Authorization: `Zoho-oauthtoken ${accessToken}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.catch((error) => {
					console.error(
						"Failed to send Salad email:",
						error.response?.data || error.message
					);
					throw new Error("Failed to send Salad email");
				}),
			axios
				.post(apiUrl, customerEmailData, {
					headers: {
						Authorization: `Zoho-oauthtoken ${accessToken}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.catch((error) => {
					console.error(
						"Failed to send Customer email:",
						error.response?.data || error.message
					);
					throw new Error("Failed to send Customer email");
				}),
		]);

		return Response.json({
			success: true,
			message: "Form submitted successfully to Google Sheet and emails sent",
			data: {
				spreadsheetId: result?.spreadsheetId,
				tableRange: result?.tableRange,
				updates: result?.updates,
			},
		});
	} catch (error: any) {
		console.error("Error in form submission or email sending:", error);

		let errorMessage = "Something went wrong";
		if (error.message?.includes("Unable to parse range")) {
			errorMessage = "Sheet configuration error";
		} else if (error.message?.includes("The caller does not have permission")) {
			errorMessage = "Permission error - check sheet sharing settings";
		} else if (error.message?.includes("Requested entity was not found")) {
			errorMessage = "Sheet not found - check sheet ID";
		} else if (error.message?.includes("Zoho")) {
			errorMessage = "Failed to send emails - check Zoho API configuration";
		} else if (process.env.NODE_ENV === "development") {
			errorMessage = error.message;
		}

		return Response.json(
			{
				success: false,
				message: "Failed to submit to Google Sheet or send emails",
				error: errorMessage,
				details:
					process.env.NODE_ENV === "development"
						? {
								stack: error.stack,
								name: error.name,
						  }
						: undefined,
			},
			{ status: 500 }
		);
	}
}
