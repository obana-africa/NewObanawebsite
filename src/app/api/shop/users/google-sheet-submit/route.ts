import { NextRequest } from "next/server";
import { appendToSheet } from "@/lib/google-sheets";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";
import { handleCors } from "@/lib/cors";

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
	businessRegistrationFile?: string;
	proofOfAddressFile?: string;
	statusReportFile?: string;
	businessRegistrationBase64?: string;
	proofOfAddressBase64?: string;
	statusReportBase64?: string;
	businessRegistrationFileName?: string;
	proofOfAddressFileName?: string;
	statusReportFileName?: string;
	inventoryFinancingType?: string;
	[key: string]: string | string[] | undefined;
}

interface DocumentAttachment {
	fileName: string;
	content: string;
	contentType: string;
}

interface ZohoAttachment {
	storeName: string;
	attachmentPath: string;
	attachmentName: string;
}

interface FinancingPartner {
	name: string;
	email: string;
	displayName: string;
}

// Configuration for financing partners
const FINANCING_PARTNERS: Record<string, FinancingPartner> = {
	salad_africa: {
		name: "Salad Africa",
		email: "koredebusuyicareer@gmail.com",
		displayName: "Salad Africa (50/50 Split Financing)",
	},
	cabon_finance: {
		name: "Cabon Finance",
		email: "olaoluwajohn06@gmail.com",
		displayName: "Cabon Finance (Pay in 3 Months)",
	},
	stellar_bank: {
		name: "Stellar Bank",
		email: "stellar@mailinator.com",
		displayName: "Stellar Bank (Flexible Financing)",
	},
};

function generateFinancingEmailContent(
	data: FormDataType,
	recipient: "obana" | "partner" | "customer",
	attachmentCount: number = 0,
	attachmentNames: string[] = [],
	partnerInfo?: FinancingPartner
): string {
	const fullName = `${data.salutation || ""} ${data.firstName || ""} ${
		data.lastName || ""
	}`.trim();

	const formatDate = (dateString?: string) => {
		if (!dateString) return "Not provided";
		return new Date(dateString).toLocaleDateString();
	};

	const formatArray = (arr: string[] | string | undefined) => {
		if (!arr) return "Not provided";
		if (Array.isArray(arr)) return arr.join(", ");
		return arr;
	};

	// Get financing type display name
	const financingTypeDisplay = data.inventoryFinancingType
		? FINANCING_PARTNERS[data.inventoryFinancingType]?.displayName ||
		  data.inventoryFinancingType
		: "Not specified";

	// Generate attachment list HTML
	const attachmentListHtml =
		attachmentCount > 0
			? `
		<div style="background: #f7fafc; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #4299e1;">
			<h4 style="margin: 0 0 8px 0; color: #2d3748; font-size: 12px;">📎 Attached Documents (${attachmentCount}):</h4>
			<ul style="margin: 0; padding-left: 15px; color: #4a5568; font-size: 11px;">
				${attachmentNames
					.map((name) => `<li style="margin: 3px 0;">${name}</li>`)
					.join("")}
			</ul>
		</div>
	`
			: `
		<div style="background: #fed7d7; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #f56565;">
			<p style="margin: 0; color: #2d3748; font-size: 11px;">
				<strong>⚠️ No Documents Attached:</strong> Please ensure all required documents are properly uploaded.
			</p>
		</div>
	`;

	const baseContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: auto; padding: 0; background-color: #f8fafc;">
      <!-- Header -->
      <div style="background: #2d3748;  padding: 20px 15px; text-align: center;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Logo" style="width: 140px; margin-bottom: 15px; filter: brightness(0) invert(1);"/>
        <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 0.5px;">
          INVENTORY FINANCING REQUEST
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 12px;">
          Application Submission Confirmation
        </p>
      </div>

      <!-- Main Content -->
      <div style="background: white; padding: 25px 20px;">
        
        <!-- Financing Type Section -->
        <div style="background: #e6fffa; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #38b2ac;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748; font-size: 12px;">💼 Selected Financing Option:</h4>
          <p style="margin: 0; color: #2d3748; font-size: 14px; font-weight: 600;">
            ${financingTypeDisplay}
          </p>
        </div>
        
        <!-- Attachment Status Section -->
        ${attachmentListHtml}
        
        <!-- Personal Information Section -->
        <div style="margin-bottom: 25px;">
          <div style="border-left: 4px solid #667eea; padding-left: 15px; margin-bottom: 18px;">
            <h2 style="color: #2d3748; margin: 0; font-size: 14px; font-weight: 600;">
              👤 Personal Information
            </h2>
          </div>
          
          <div style="background: #f7fafc; border-radius: 8px; padding: 18px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; width: 35%; font-size: 11px;">Full Name:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #e2e8f0; font-size: 11px;">
                  ${fullName || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Email Address:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #e2e8f0; font-size: 11px;">
                  ${data.email || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Phone Number:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #e2e8f0; font-size: 11px;">
                  ${data.phone || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Date of Birth:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #e2e8f0; font-size: 11px;">
                  ${formatDate(data.dob)}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Gender:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #e2e8f0; font-size: 11px;">
                  ${data.gender || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Address:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; font-size: 11px;">
                  ${data.address || "Not provided"}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Business Information Section -->
        <div style="margin-bottom: 25px;">
          <div style="border-left: 4px solid #48bb78; padding-left: 15px; margin-bottom: 18px;">
            <h2 style="color: #2d3748; margin: 0; font-size: 14px; font-weight: 600;">
              🏢 Business Information
            </h2>
          </div>
          
          <div style="background: #f0fff4; border-radius: 8px; padding: 18px; border: 1px solid #c6f6d5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; width: 35%; font-size: 11px;">Business Name:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #c6f6d5; font-size: 11px;">
                  ${data.businessName || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Business Type:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #c6f6d5; font-size: 11px;">
                  ${data.businessType || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">TIN:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #c6f6d5; font-size: 11px;">
                  ${data.tin || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Category of Interest:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #c6f6d5; font-size: 11px;">
                  ${formatArray(data.categoryOfInterest)}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Brand of Interest:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; font-size: 11px;">
                  ${formatArray(data.brandOfInterest)}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Banking Information Section -->
        <div style="margin-bottom: 25px;">
          <div style="border-left: 4px solid #ed8936; padding-left: 15px; margin-bottom: 18px;">
            <h2 style="color: #2d3748; margin: 0; font-size: 14px; font-weight: 600;">
              🏦 Banking Information
            </h2>
          </div>
          
          <div style="background: #fffaf0; border-radius: 8px; padding: 18px; border: 1px solid #fbd38d;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; width: 35%; font-size: 11px;">Bank Name:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #fbd38d; font-size: 11px;">
                  ${data.bankName || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">Account Number:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #fbd38d; font-size: 11px;">
                  ${data.accountNumber || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">BVN:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; font-size: 11px;">
                  ${data.bvn || "Not provided"}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Location Information Section -->
        <div style="margin-bottom: 25px;">
          <div style="border-left: 4px solid #9f7aea; padding-left: 15px; margin-bottom: 18px;">
            <h2 style="color: #2d3748; margin: 0; font-size: 14px; font-weight: 600;">
              📍 Location Information
            </h2>
          </div>
          
          <div style="background: #faf5ff; border-radius: 8px; padding: 18px; border: 1px solid #d6bcfa;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; width: 35%; font-size: 11px;">Country:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #d6bcfa; font-size: 11px;">
                  ${data.country || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">State/Province:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; border-bottom: 1px solid #d6bcfa; font-size: 11px;">
                  ${data.state || "Not provided"}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4a5568; font-weight: 500; font-size: 11px;">City:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: 600; font-size: 11px;">
                  ${data.city || "Not provided"}
                </td>
              </tr>
            </table>
          </div>
        </div>`;

	if (recipient === "obana") {
		return `
      ${baseContent}
      
        <!-- Action Required Section -->
        <div style="background: #2d3748;  border-radius: 8px; padding: 18px; margin: 20px 0; color: white; text-align: center;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px;">⚡ Action Required</h3>
          <p style="margin: 0; font-size: 12px; opacity: 0.9;">
            A new inventory financing request has been submitted for <strong>${financingTypeDisplay}</strong>. Please review the attached documents and applicant details to proceed with processing.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #2d3748; padding: 20px 15px; text-align: center;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Logo" style="width: 100px; margin-bottom: 10px; filter: brightness(0) invert(1);"/>
        <p style="color: #cbd5e0; margin: 0; font-size: 10px;">
          This is an automated message from the Obana Inventory Financing System.
        </p>
      </div>
    </div>`;
	} else if (recipient === "partner") {
		return `
      ${baseContent}
      
        <!-- Action Required Section -->
        <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); border-radius: 8px; padding: 18px; margin: 20px 0; color: white; text-align: center;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px;">📋 Review Required</h3>
          <p style="margin: 0; font-size: 12px; opacity: 0.9;">
            A new inventory financing application has been received through Obana for <strong>${financingTypeDisplay}</strong>. Please review the applicant information and attached documents for loan pre-qualification assessment.
          </p>
        </div>

        <!-- Partner Info Section -->
        <div style="background: #e6fffa; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #38b2ac;">
          <p style="margin: 0; color: #2d3748; font-size: 11px;">
            <strong>Partner:</strong> ${
							partnerInfo?.name || "Financing Partner"
						} - This application was specifically submitted for your financing program.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #2d3748; padding: 20px 15px; text-align: center;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Logo" style="width: 100px; margin-bottom: 10px; filter: brightness(0) invert(1);"/>
        <p style="color: #cbd5e0; margin: 0; font-size: 10px;">
          This is an automated message from the Obana Inventory Financing System.
        </p>
      </div>
    </div>`;
	} else {
		return `
      ${baseContent}
      
        <!-- Confirmation Section -->
        <div style="background: #2d3748;  border-radius: 8px; padding: 18px; margin: 20px 0; color: white; text-align: center;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px;">✅ Application Received Successfully</h3>
          <p style="margin: 0; font-size: 12px; opacity: 0.9;">
            Thank you for your inventory financing application with <strong>${financingTypeDisplay}</strong>. We have received all your information and documents. Our team will review your application and get back to you within 2-3 business days.
          </p>
        </div>

        <div style="background: #e6fffa; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #38b2ac;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748; font-size: 12px;">📋 Next Steps:</h4>
          <ul style="margin: 0; padding-left: 15px; color: #4a5568; font-size: 11px;">
            <li style="margin: 5px 0;">Our team will review your submitted documents</li>
            <li style="margin: 5px 0;">We'll verify your business and financial information with ${
							partnerInfo?.name || "your selected financing partner"
						}</li>
            <li style="margin: 5px 0;">You'll receive a pre-qualification decision within 2-3 business days</li>
            <li style="margin: 5px 0;">If approved, we'll contact you with next steps</li>
          </ul>
        </div>

        <div style="background: #fff5f5; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #f56565;">
          <p style="margin: 0; color: #2d3748; font-size: 11px;">
            <strong>⚠️ Important:</strong> Please ensure your phone and email are accessible as we may need to contact you for additional information.
          </p>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <a href="https://shop.obana.africa" style="background: #2d3748;  color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-weight: 600; display: inline-block; margin-right: 8px; font-size: 11px;">
            Continue Shopping
          </a>
          <a href="mailto:contact@obana.africa" style="background: transparent; color: #667eea; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-weight: 600; display: inline-block; border: 2px solid #667eea; font-size: 11px;">
            Contact Support
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #2d3748; padding: 20px 15px; text-align: center;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Logo" style="width: 100px; margin-bottom: 10px; filter: brightness(0) invert(1);"/>
        <div style="margin: 10px 0;">
          <a href="mailto:contact@obana.africa" style="color: #cbd5e0; text-decoration: none; margin: 0 10px; font-size: 11px;">📧 contact@obana.africa</a>
          <a href="tel:+2348096535511" style="color: #cbd5e0; text-decoration: none; margin: 0 10px; font-size: 11px;">📞 +234 809 653 5511</a>
          <a href="https://obana.africa" style="color: #cbd5e0; text-decoration: none; margin: 0 10px; font-size: 11px;">🌐 obana.africa</a>
        </div>
        <p style="color: #a0aec0; margin: 0; font-size: 10px;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    </div>`;
	}
}

async function processImageAttachment(
	fileUrl: string,
	fileName: string
): Promise<DocumentAttachment | null> {
	try {
		if (!fileUrl) {
			return null;
		}

		const response = await fetch(fileUrl);

		if (!response.ok) {
			return null;
		}

		const arrayBuffer = await response.arrayBuffer();
		const base64Content = Buffer.from(arrayBuffer).toString("base64");

		const extension = fileName.toLowerCase().split(".").pop() || "jpg";
		let contentType = "application/octet-stream";

		switch (extension) {
			case "jpg":
			case "jpeg":
				contentType = "image/jpeg";
				break;
			case "png":
				contentType = "image/png";
				break;
			case "pdf":
				contentType = "application/pdf";
				break;
			default:
				console.log(
					`⚠️ Unknown file extension: ${extension}, using default content type`
				);
		}

		return {
			fileName,
			content: base64Content,
			contentType,
		};
	} catch (error) {
		console.error(
			`❌ Error processing image attachment for ${fileName}:`,
			error
		);
		return null;
	}
}

async function processDocumentAttachment(
	base64: string,
	fileName: string
): Promise<DocumentAttachment | null> {
	try {
		if (!base64) {
			return null;
		}

		const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");

		const extension = fileName.toLowerCase().split(".").pop() || "pdf";
		let contentType = "application/octet-stream";

		switch (extension) {
			case "pdf":
				contentType = "application/pdf";
				break;
			case "jpg":
			case "jpeg":
				contentType = "image/jpeg";
				break;
			case "png":
				contentType = "image/png";
				break;
			default:
				console.log(
					`⚠️ Unknown file extension: ${extension}, using default content type`
				);
		}

		let buffer;
		try {
			buffer = Buffer.from(cleanBase64, "base64");
		} catch (validationError) {
			console.error(`❌ Invalid base64 data for ${fileName}:`, validationError);
			return null;
		}

		if (extension === "pdf") {
			const header = buffer.toString("ascii", 0, 4);
			if (!header.startsWith("%PDF")) {
				return null;
			}
		}

		return {
			fileName,
			content: cleanBase64,
			contentType,
		};
	} catch (error) {
		console.error(
			`❌ Error processing document attachment for ${fileName}:`,
			error
		);
		return null;
	}
}

async function uploadAttachmentToZoho(
	accessToken: string,
	accountId: string,
	attachment: DocumentAttachment
): Promise<ZohoAttachment | null> {
	try {
		const uploadUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages/attachments?uploadType=multipart&isInline=false`;
		const buffer = Buffer.from(attachment.content, "base64");
		const formData = new FormData();
		const blob = new Blob([buffer], { type: attachment.contentType });
		formData.append("attach", blob, attachment.fileName);

		const response = await axios.post(uploadUrl, formData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				"Content-Type": "multipart/form-data",
			},
			timeout: 60000,
		});

		if (response.data.status?.code === 200 && response.data.data) {
			const attachmentData = Array.isArray(response.data.data)
				? response.data.data[0]
				: response.data.data;
			const zohoAttachment = {
				storeName: attachmentData?.storeName,
				attachmentPath: attachmentData?.attachmentPath,
				attachmentName: attachment.fileName,
			};

			if (!zohoAttachment.storeName || !zohoAttachment.attachmentPath) {
				return null;
			}

			return zohoAttachment;
		} else {
			return null;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error(
			`❌ Error uploading attachment ${attachment.fileName} to Zoho:`,
			{
				message: error.message,
				response: error.response?.data,
				status: error.response?.status,
				statusText: error.response?.statusText,
			}
		);
		return null;
	}
}

async function uploadAttachments(
	attachments: DocumentAttachment[],
	accessToken: string,
	accountId: string
): Promise<ZohoAttachment[]> {
	const zohoAttachments: ZohoAttachment[] = [];
	for (const attachment of attachments) {
		const zohoAttachment = await uploadAttachmentToZoho(
			accessToken,
			accountId,
			attachment
		);
		if (zohoAttachment) {
			zohoAttachments.push(zohoAttachment);
		}
	}
	return zohoAttachments;
}

export async function POST(request: NextRequest) {
	 const corsHeaders = handleCors(request);
		if (corsHeaders instanceof Response) {
			return corsHeaders; 
		}

	try {
		const formData: FormDataType = await request.json();
		const financingType = formData.inventoryFinancingType;
		if (!financingType || !FINANCING_PARTNERS[financingType]) {
			return Response.json(
				{
					success: false,
					message: "Invalid or missing inventory financing type",
				},
				{ status: 400 }
			);
		}
		const partnerInfo = FINANCING_PARTNERS[financingType];
		const accessToken = await getMailAccessToken();
		if (!accessToken) {
			throw new Error("Failed to retrieve Zoho access token");
		}

		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;
		if (!accountId) {
			throw new Error("ZOHO_MAIL_ACCOUNT_ID environment variable is not set");
		}

		const requiredFields = [
			"firstName",
			"lastName",
			"email",
			"phone",
			"inventoryFinancingType",
		];
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

		const attachments: DocumentAttachment[] = [];

		const documentData = [
			{
				data: formData.businessRegistrationFile,
				name:
					formData.businessRegistrationFileName ||
					"Business_Registration_Certificate.pdf",
				type: "businessRegistration",
			},
			{
				data: formData.proofOfAddressFile,
				name: formData.proofOfAddressFileName || "Proof_of_Address.pdf",
				type: "proofOfAddress",
			},
			{
				data: formData.statusReportFile,
				name: formData.statusReportFileName || "Status_Report.pdf",
				type: "statusReport",
			},
		];

		for (const doc of documentData) {
			if (!doc.data) {
				continue;
			}

			let attachment: DocumentAttachment | null = null;

			// Check if it's a URL (starts with http/https) or base64 data
			if (doc.data.startsWith("http")) {
				attachment = await processImageAttachment(doc.data, doc.name);
			} else {
				attachment = await processDocumentAttachment(doc.data, doc.name);
			}

			if (attachment) {
				attachments.push(attachment);
			}
		}

		// Save to Google Sheets (use one set for info, since same)
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
			formData.inventoryFinancingType || "",
			attachments.length > 0
				? `${attachments.length} documents attached`
				: "No documents",
			// attachments.length > 0
			// 	? `${attachments.length} documents attached: ${attachments
			// 			.map((att) => att.fileName)
			// 			.join(", ")}`
			// 	: "No documents",
		];

		await appendToSheet(sheetData);

		const apiUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages`;
		const attachmentNames = attachments.map((att) => att.fileName);

		async function sendEmailWithAttachments(
			toAddress: string,
			subject: string,
			content: string,
			recipientType: string,
			maxRetries = 3
		) {

			let zohoAttachments: ZohoAttachment[] = [];

			if (attachments.length > 0) {
				if (!accountId) {
					throw new Error(
						"ZOHO_MAIL_ACCOUNT_ID environment variable is not set"
					);
				}
				zohoAttachments = await uploadAttachments(
					attachments,
					accessToken,
					accountId
				);
				await new Promise((resolve) => setTimeout(resolve, 2000));
			}

			const emailData = {
				fromAddress: "'OBANA FINANCING' <ochije.nnani@iconholding.africa>",
				toAddress,
				subject,
				content,
				...(zohoAttachments.length > 0 && {
					attachments: zohoAttachments.map((att) => ({
						storeName: att.storeName,
						attachmentPath: att.attachmentPath,
						attachmentName: att.attachmentName,
					})),
				}),
			};

			for (let attempt = 1; attempt <= maxRetries; attempt++) {
				try {
					const response = await axios.post(apiUrl, emailData, {
						headers: {
							Authorization: `Zoho-oauthtoken ${accessToken}`,
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						timeout: 45000,
					});

					if (response.data.status?.code === 200) {
						return {
							success: true,
							data: response.data,
							attachmentCount: zohoAttachments.length,
						};
					} else {
						throw new Error(
							`Zoho API returned error: ${JSON.stringify(response.data)}`
						);
					}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					if (attempt < maxRetries) {
						const delay = attempt * 3000;
						await new Promise((resolve) => setTimeout(resolve, delay));
					} else {
						return {
							success: false,
							error: error.response?.data || error.message,
							attachmentCount: zohoAttachments.length,
						};
					}
				}
			}

			return {
				success: false,
				error: "Max retries exceeded",
				attachmentCount: 0,
			};
		}

		// Define email recipients and details
		const emailTargets = [
			{
				address: "contact@obana.africa",
				type: "Obana",
				subject: `New Inventory Financing Request from ${formData.firstName} ${formData.lastName} - ${partnerInfo.displayName}`,
				content: generateFinancingEmailContent(
					formData,
					"obana",
					attachments.length,
					attachmentNames,
					partnerInfo
				),
			},
			{
				address: partnerInfo.email,
				type: `Partner (${partnerInfo.name})`,
				subject: `New Inventory Financing Request from ${formData.firstName} ${formData.lastName} - ${partnerInfo.displayName}`,
				content: generateFinancingEmailContent(
					formData,
					"partner",
					attachments.length,
					attachmentNames,
					partnerInfo
				),
			},
			{
				address: formData.email!,
				type: "Customer",
				subject: `Your Inventory Financing Request Confirmation - ${partnerInfo.displayName}`,
				content: generateFinancingEmailContent(
					formData,
					"customer",
					attachments.length,
					attachmentNames,
					partnerInfo
				),
			},
		];

		// Send emails with proper error tracking
		const emailResults: Array<{
			type: string;
			address: string;
			success: boolean;
			error?: string;
			attachmentCount?: number;
		}> = [];

		for (const target of emailTargets) {
			const result = await sendEmailWithAttachments(
				target.address,
				target.subject,
				target.content,
				target.type
			);

			emailResults.push({
				type: target.type,
				address: target.address,
				success: result.success,
				error: result.success ? undefined : result.error,
				attachmentCount: result.attachmentCount,
			});

			// Wait between emails to avoid rate limiting
			if (target !== emailTargets[emailTargets.length - 1]) {
				await new Promise((resolve) => setTimeout(resolve, 5000));
			}
		}

		// Analyze results
		const successfulEmails = emailResults.filter((r) => r.success);
		const failedEmails = emailResults.filter((r) => !r.success);

		// Return comprehensive response
		return Response.json({
			success: true,
			message: `Form submitted successfully. ${successfulEmails.length}/${emailResults.length} emails sent successfully.`,
			data: {
				attachmentsProcessed: attachments.length,
				emailsSent: successfulEmails.length,
				emailsFailed: failedEmails.length,
				successfulEmails: successfulEmails.map((e) => ({
					type: e.type,
					address: e.address,
				})),
				failedEmails: failedEmails.map((e) => ({
					type: e.type,
					address: e.address,
					error: e.error,
				})),
				attachmentNames: attachments.map((att) => att.fileName),
				detailedResults: emailResults,
			},
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return Response.json(
			{
				success: false,
				message: "Failed to submit form",
				error:
					process.env.NODE_ENV === "development"
						? error.message
						: "Internal server error",
			},
			{ status: 500 }
		);
	}
}
