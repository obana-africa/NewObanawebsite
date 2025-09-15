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
	businessRegistrationFile?: string;
	proofOfAddressFile?: string;
	statusReportFile?: string;
	businessRegistrationBase64?: string;
	proofOfAddressBase64?: string;
	statusReportBase64?: string;
	businessRegistrationFileName?: string;
	proofOfAddressFileName?: string;
	statusReportFileName?: string;
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

function generateFinancingEmailContent(
	data: FormDataType,
	recipient: "obana" | "salad" | "customer",
	attachmentCount: number = 0,
	attachmentNames: string[] = []
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
            A new inventory financing request has been submitted. Please review the attached documents and applicant details to proceed with processing.
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
	} else if (recipient === "salad") {
		return `
      ${baseContent}
      
        <!-- Action Required Section -->
        <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); border-radius: 8px; padding: 18px; margin: 20px 0; color: white; text-align: center;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px;">📋 Review Required</h3>
          <p style="margin: 0; font-size: 12px; opacity: 0.9;">
            A new inventory financing application has been received. Please review the applicant information and attached documents for loan pre-qualification assessment.
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
            Thank you for your inventory financing application. We have received all your information and documents. Our team will review your application and get back to you within 2-3 business days.
          </p>
        </div>

        <div style="background: #e6fffa; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #38b2ac;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748; font-size: 12px;">📋 Next Steps:</h4>
          <ul style="margin: 0; padding-left: 15px; color: #4a5568; font-size: 11px;">
            <li style="margin: 5px 0;">Our team will review your submitted documents</li>
            <li style="margin: 5px 0;">We'll verify your business and financial information</li>
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
			console.log(`❌ No file URL provided for ${fileName}`);
			return null;
		}

		const response = await fetch(fileUrl);

		if (!response.ok) {
			console.error(
				`❌ Failed to fetch file from ${fileUrl}: ${response.status} ${response.statusText}`
			);
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
	console.log(`🔄 PROCESSING DOCUMENT ATTACHMENT:`, {
		fileName,
		base64Length: base64?.length,
	});

	try {
		if (!base64) {
			console.log(`❌ No base64 data provided for ${fileName}`);
			return null;
		}

		const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");
		console.log(`🧹 Cleaned base64 data, length: ${cleanBase64.length}`);

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

		// Validate base64 content
		let buffer;
		try {
			buffer = Buffer.from(cleanBase64, "base64");
			console.log(`✅ Valid base64 data, buffer size: ${buffer.length} bytes`);
		} catch (validationError) {
			console.error(`❌ Invalid base64 data for ${fileName}:`, validationError);
			return null;
		}

		// Basic file integrity check (e.g., for PDFs, check for %PDF header)
		if (extension === "pdf") {
			const header = buffer.toString("ascii", 0, 4);
			if (!header.startsWith("%PDF")) {
				console.error(
					`❌ Invalid PDF file for ${fileName}: Missing %PDF header`
				);
				return null;
			}
		}

		console.log(`✅ Successfully processed document attachment:`, {
			fileName,
			contentType,
			contentLength: cleanBase64.length,
			estimatedSizeKB: Math.round((cleanBase64.length * 3) / 4 / 1024),
		});

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
	console.log(`🔄 UPLOADING TO ZOHO:`, {
		fileName: attachment.fileName,
		contentType: attachment.contentType,
		contentLength: attachment.content.length,
		accountId,
	});

	try {
		const uploadUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages/attachments?uploadType=multipart&isInline=false`;
		const buffer = Buffer.from(attachment.content, "base64");
		const formData = new FormData();
		const blob = new Blob([buffer], { type: attachment.contentType });
		formData.append("attach", blob, attachment.fileName);

		console.log(`📤 Uploading to Zoho URL: ${uploadUrl}`);
		console.log(`📤 File details:`, {
			originalName: attachment.fileName,
			blobSize: buffer.length,
			contentType: attachment.contentType,
		});

		const response = await axios.post(uploadUrl, formData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				"Content-Type": "multipart/form-data",
			},
			timeout: 60000,
		});

		console.log(`📥 Zoho upload response for ${attachment.fileName}:`, {
			status: response.status,
			statusText: response.statusText,
			data: JSON.stringify(response.data, null, 2), // Log full response
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
				console.error(
					`❌ Missing storeName or attachmentPath for ${attachment.fileName}`
				);
				return null;
			}

			console.log(`✅ Successfully uploaded to Zoho:`, zohoAttachment);
			return zohoAttachment;
		} else {
			console.error(
				`❌ Failed to upload attachment ${attachment.fileName}. Response:`,
				{
					status: response.data.status,
					data: response.data,
				}
			);
			return null;
		}
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
		console.log(`\n🔄 Uploading ${attachment.fileName} to Zoho...`);
		const zohoAttachment = await uploadAttachmentToZoho(
			accessToken,
			accountId,
			attachment
		);
		if (zohoAttachment) {
			zohoAttachments.push(zohoAttachment);
			console.log(`✅ Successfully uploaded ${attachment.fileName} to Zoho`);
		} else {
			console.log(`❌ Failed to upload ${attachment.fileName} to Zoho`);
		}
	}
	return zohoAttachments;
}

export async function POST(request: NextRequest) {
	try {
		const formData: FormDataType = await request.json();

		console.log(`🚀 FORM SUBMISSION STARTED`);
		console.log(`📝 Received form data:`, {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			phone: formData.phone,
			hasBusinessRegFile: !!formData.businessRegistrationFile,
			hasProofOfAddressFile: !!formData.proofOfAddressFile,
			hasStatusReportFile: !!formData.statusReportFile,
			businessRegFileName: formData.businessRegistrationFileName,
			proofOfAddressFileName: formData.proofOfAddressFileName,
			statusReportFileName: formData.statusReportFileName,
		});

		// Get Zoho access token
		console.log(`🔐 Getting Zoho access token...`);
		const accessToken = await getMailAccessToken();
		if (!accessToken) {
			console.error(`❌ Failed to retrieve Zoho access token`);
			throw new Error("Failed to retrieve Zoho access token");
		}
		console.log(`✅ Successfully obtained Zoho access token`);

		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;
		if (!accountId) {
			console.error(`❌ ZOHO_MAIL_ACCOUNT_ID environment variable is not set`);
			throw new Error("ZOHO_MAIL_ACCOUNT_ID environment variable is not set");
		}
		console.log(`✅ Zoho Account ID: ${accountId}`);

		// Validate required fields
		const requiredFields = ["firstName", "lastName", "email", "phone"];
		const missingFields = requiredFields.filter((field) => !formData[field]);
		if (missingFields.length > 0) {
			console.error(`❌ Missing required fields: ${missingFields.join(", ")}`);
			return Response.json(
				{
					success: false,
					message: `Missing required fields: ${missingFields.join(", ")}`,
				},
				{ status: 400 }
			);
		}
		console.log(`✅ All required fields present`);

		// Process attachments
		console.log(`\n🔄 STARTING ATTACHMENT PROCESSING...`);
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

		console.log(
			`📋 Document data to process:`,
			documentData.map((doc) => ({
				type: doc.type,
				name: doc.name,
				hasData: !!doc.data,
				dataType: doc.data
					? doc.data.startsWith("http")
						? "URL"
						: "base64"
					: "none",
				dataLength: doc.data?.length || 0,
			}))
		);

		for (const doc of documentData) {
			if (!doc.data) {
				console.log(`⏭️ Skipping ${doc.type} - no data provided`);
				continue;
			}

			console.log(`\n🔄 Processing ${doc.type}...`);
			let attachment: DocumentAttachment | null = null;

			// Check if it's a URL (starts with http/https) or base64 data
			if (doc.data.startsWith("http")) {
				console.log(`📡 Processing as URL: ${doc.data.substring(0, 50)}...`);
				attachment = await processImageAttachment(doc.data, doc.name);
			} else {
				console.log(`📄 Processing as base64 data, length: ${doc.data.length}`);
				attachment = await processDocumentAttachment(doc.data, doc.name);
			}

			if (attachment) {
				attachments.push(attachment);
				console.log(
					`✅ Successfully processed ${doc.type}: ${attachment.fileName}`
				);
			} else {
				console.log(`❌ Failed to process ${doc.type}`);
			}
		}

		console.log(`\n📊 ATTACHMENT PROCESSING SUMMARY:`, {
			totalProcessed: attachments.length,
			attachmentNames: attachments.map((att) => att.fileName),
			attachmentSizes: attachments.map((att) => ({
				name: att.fileName,
				contentType: att.contentType,
				sizeKB: Math.round((att.content.length * 3) / 4 / 1024),
			})),
		});

		// Upload separate sets of attachments for each email to avoid deletion issue
		console.log(`\n🔄 UPLOADING ATTACHMENTS FOR OBANA EMAIL...`);
		const zohoAttachmentsObana = await uploadAttachments(
			attachments,
			accessToken,
			accountId
		);

		console.log(`\n🔄 UPLOADING ATTACHMENTS FOR SALAD EMAIL...`);
		const zohoAttachmentsSalad = await uploadAttachments(
			attachments,
			accessToken,
			accountId
		);

		console.log(`\n🔄 UPLOADING ATTACHMENTS FOR CUSTOMER EMAIL...`);
		const zohoAttachmentsCustomer = await uploadAttachments(
			attachments,
			accessToken,
			accountId
		);

		console.log(`\n📊 ZOHO UPLOAD SUMMARY FOR OBANA:`, {
			totalUploaded: zohoAttachmentsObana.length,
			uploadedFiles: zohoAttachmentsObana.map((att) => ({
				name: att.attachmentName,
				storeName: att.storeName,
				path: att.attachmentPath,
			})),
		});

		console.log(`\n📊 ZOHO UPLOAD SUMMARY FOR SALAD:`, {
			totalUploaded: zohoAttachmentsSalad.length,
			uploadedFiles: zohoAttachmentsSalad.map((att) => ({
				name: att.attachmentName,
				storeName: att.storeName,
				path: att.attachmentPath,
			})),
		});

		console.log(`\n📊 ZOHO UPLOAD SUMMARY FOR CUSTOMER:`, {
			totalUploaded: zohoAttachmentsCustomer.length,
			uploadedFiles: zohoAttachmentsCustomer.map((att) => ({
				name: att.attachmentName,
				storeName: att.storeName,
				path: att.attachmentPath,
			})),
		});

		// Save to Google Sheets (use one set for info, since same)
		console.log(`\n📊 SAVING TO GOOGLE SHEETS...`);
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
			attachments.length > 0
				? `${attachments.length} documents attached: ${attachments
						.map((att) => att.fileName)
						.join(", ")}`
				: "No documents",
		];

		console.log(`📝 Sheet data prepared:`, {
			rowLength: sheetData.length,
			attachmentInfo: sheetData[sheetData.length - 1],
		});

		let result;
		let attempt = 0;
		const maxAttempts = 3;

		while (attempt < maxAttempts) {
			try {
				console.log(
					`📊 Attempting to save to Google Sheets (attempt ${
						attempt + 1
					}/${maxAttempts})...`
				);
				result = await appendToSheet(sheetData);
				console.log(`✅ Google Sheet append result:`, result);
				break;
			} catch (error) {
				attempt++;
				console.error(`❌ Google Sheets attempt ${attempt} failed:`, error);
				if (attempt === maxAttempts) {
					throw error;
				}
				await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
			}
		}

		// Prepare email data
		console.log(`\n📧 PREPARING EMAIL DATA...`);
		const apiUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages`;

		const createEmailData = (
			toAddress: string,
			subject: string,
			content: string,
			zohoAttachments: ZohoAttachment[]
		) => {
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

			console.log(`📧 Email data created for ${toAddress}:`, {
				toAddress: emailData.toAddress,
				subject: emailData.subject,
				hasAttachments: !!emailData.attachments,
				attachmentCount: emailData.attachments?.length || 0,
				attachmentNames:
					emailData.attachments?.map((att) => att.attachmentName) || [],
			});

			return emailData;
		};

		const attachmentNames = attachments.map((att) => att.fileName); // Use original names for email content

		const obanaEmailData = createEmailData(
			"ola11@mailinator.com",
			`New Inventory Financing Request from ${formData.firstName} ${formData.lastName}`,
			generateFinancingEmailContent(
				formData,
				"obana",
				zohoAttachmentsObana.length,
				attachmentNames
			),
			zohoAttachmentsObana
		);

		const saladEmailData = createEmailData(
			"olaoluwajohn06@gmail.com",
			`New Inventory Financing Request from ${formData.firstName} ${formData.lastName}`,
			generateFinancingEmailContent(
				formData,
				"salad",
				zohoAttachmentsSalad.length,
				attachmentNames
			),
			zohoAttachmentsSalad
		);

		const customerEmailData = createEmailData(
			formData.email!,
			"Your Inventory Financing Request Confirmation",
			generateFinancingEmailContent(
				formData,
				"customer",
				zohoAttachmentsCustomer.length,
				attachmentNames
			),
			zohoAttachmentsCustomer
		);

		// Send emails
		console.log(`\n📤 SENDING EMAILS...`);
		async function sendEmail(
			emailData: any,
			recipientType: string,
			retries = 3,
			delay = 2000
		) {
			console.log(`📤 Sending email to ${recipientType}...`);
			console.log(`📧 Email payload:`, {
				toAddress: emailData.toAddress,
				subject: emailData.subject,
				hasContent: !!emailData.content,
				contentLength: emailData.content?.length || 0,
				hasAttachments: !!emailData.attachments,
				attachmentCount: emailData.attachments?.length || 0,
				attachments:
					emailData.attachments?.map((att: any) => ({
						name: att.attachmentName,
						storeName: att.storeName,
						path: att.attachmentPath,
					})) || [],
			});

			for (let attempt = 1; attempt <= retries; attempt++) {
				try {
					console.log(
						`📤 Attempt ${attempt}/${retries} for ${recipientType} email...`
					);
					const response = await axios.post(apiUrl, emailData, {
						headers: {
							Authorization: `Zoho-oauthtoken ${accessToken}`,
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						timeout: 30000,
					});

					console.log(`✅ ${recipientType} email sent successfully:`, {
						status: response.status,
						messageId: response.data?.data?.messageId,
					});
					return response.data;
				} catch (error: any) {
					console.error(
						`❌ Failed attempt ${attempt}/${retries} for ${recipientType} email:`,
						{
							message: error.message,
							status: error.response?.status,
							statusText: error.response?.statusText,
							data: error.response?.data,
						}
					);

					if (attempt < retries) {
						console.log(`⏳ Waiting ${delay}ms before retrying...`);
						await new Promise((resolve) => setTimeout(resolve, delay));
						continue;
					}

					throw new Error(
						`Failed to send ${recipientType} email after ${retries} attempts: ${JSON.stringify(
							error.response?.data || error.message
						)}`
					);
				}
			}
		}

		await new Promise((resolve) => setTimeout(resolve, 5000));

		await sendEmail(obanaEmailData, "Obana", 3, 2000);

		await sendEmail(saladEmailData, "Salad", 3, 2000);

		await sendEmail(customerEmailData, "Customer", 3, 2000);

		console.log(`\n🎉 PROCESS COMPLETED SUCCESSFULLY!`);
		console.log(`📊 FINAL SUMMARY:`, {
			attachmentsProcessed: attachments.length,
			attachmentsUploadedObana: zohoAttachmentsObana.length,
			attachmentsUploadedSalad: zohoAttachmentsSalad.length,
			attachmentsUploadedCustomer: zohoAttachmentsCustomer.length,
			emailsSent: 3,
			sheetUpdated: !!result,
			attachmentDetails: zohoAttachmentsObana.map((att) => ({
				name: att.attachmentName,
				storeName: att.storeName,
				path: att.attachmentPath,
			})),
		});

		return Response.json({
			success: true,
			message:
				"Form submitted successfully to Google Sheet and emails sent with attachments",
			data: {
				spreadsheetId: result?.spreadsheetId,
				tableRange: result?.tableRange,
				updates: result?.updates,
				attachmentsProcessed: attachments.length,
				attachmentsUploaded: zohoAttachmentsObana.length, // Since all same
				attachmentNames: attachments.map((att) => att.fileName),
				zohoAttachments: zohoAttachmentsObana, // Example
				emailsSent: 3,
			},
		});
	} catch (error: any) {
		console.error(`💥 ERROR IN FORM SUBMISSION:`, {
			message: error.message,
			stack: error.stack,
			name: error.name,
		});

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
