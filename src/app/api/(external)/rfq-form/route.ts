import { NextResponse } from "next/server";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";

interface BaseFormData {
	name: string;
	email: string;
	phone: string;
	formType: string;
	comment?: string;
	sampleProduct?: string;
	sampleProductUrl?: string;
}

interface ProductionFormData extends BaseFormData {
	productType: string;
	itemDescription: string;
	brandToSource?: string;
	moq?: string;
	sizeRange: string;
	targetPrice?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	style?: string;
}

interface LabelFormData extends BaseFormData {
	labelType: string;
	materialType: string;
	size: string;
	moq?: string;
	targetPrice?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	designRequirement?: string;
}

const formatPrice = (price?: {
	amount: number;
	currency: string;
	symbol: string;
}) => {
	if (!price) return { currency: "", amount: "" };
	return {
		currency: price.currency,
		amount: `${price.symbol}${price.amount.toLocaleString()}`,
	};
};

const formatFormType = (formType: string) => {
	switch (formType) {
		case "production":
			return "Production";
		case "brandLabel":
			return "Brand Label";
		default:
			return formType;
	}
};

type FormData = ProductionFormData | LabelFormData;

function isProductionForm(data: FormData): data is ProductionFormData {
	return data.formType === "production";
}

function isLabelForm(data: FormData): data is LabelFormData {
	return data.formType === "brandLabel";
}

function generateProductDetailsSection(data: FormData): string {
	const priceInfo = data.targetPrice ? formatPrice(data.targetPrice) : null;
	// console.log("Price Info:", priceInfo);
	if (isProductionForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Product Details</h3>
        ${
					data.brandToSource
						? `<p><strong>Brand to Source:</strong> ${data.brandToSource}</p>`
						: ""
				}
        <p><strong>Product Type:</strong> ${data.productType}</p>
        <p><strong>Item Description:</strong> ${data.itemDescription}</p>
        ${data.style ? `<p><strong>Style:</strong> ${data.style}</p>` : ""}
        <p><strong>Size Range:</strong> ${data.sizeRange}</p>
        ${
					data.moq
						? `<p><strong>Minimum Order Quantity (MOQ):</strong> ${data.moq}</p>`
						: ""
				}
       ${
					priceInfo
						? `
              <p><strong>Target Price Currency:</strong> ${priceInfo.currency}</p>
              <p><strong>Target Price:</strong> ${priceInfo.amount}</p>
            `
						: ""
				}
    `;
	} else if (isLabelForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Label Details</h3>
        <p><strong>Label Type:</strong> ${data.labelType}</p>
        <p><strong>Material Type:</strong> ${data.materialType}</p>
        <p><strong>Size:</strong> ${data.size}</p>
        ${
					data.moq
						? `<p><strong>Minimum Order Quantity (MOQ):</strong> ${data.moq}</p>`
						: ""
				}
        ${
					priceInfo
						? `
              <p><strong>Target Price Currency:</strong> ${priceInfo.currency}</p>
              <p><strong>Target Price:</strong> ${priceInfo.amount}</p>
            `
						: ""
				}
    `;
	}
	return "";
}

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
			content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
                 alt="Obana Office Logo" style="width: 100px;"/>
            <h2 style="color: #333; margin-top: 10px;">New ${formatFormType(
							body.formType
						)} RFQ Submission</h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Customer Information</h3>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Request Type:</strong> ${body.formType}</p>
          </div>
          
          ${productDetailsSection}
          
          ${
						body.sampleProductUrl || body.sampleProduct
							? `
            <div style="margin-top: 15px;">
              <h4 style="color: #555; margin-bottom: 5px;">Sample Product:</h4>
              <img src="${
								body.sampleProductUrl || body.sampleProduct
							}" alt="Sample Product" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"/>
            </div>
          `
							: ""
					}
          
      
          </div>
          
          ${
						body.comment
							? `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Additional Comments</h3>
              <p>${body.comment}</p>
            </div>
          `
							: ""
					}
          
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
            <p>This email was sent from your website RFQ form.</p>
          </div>
        </div>
      `,
		};

		const customerEmailData = {
			fromAddress: "'OBANA' <ochije.nnani@iconholding.africa>",
			toAddress: body.email,
			subject: `Thank you for your ${formatFormType(
				body.formType
			)} RFQ submission`,
			content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.obana.africa/_next/static/media/obana-logo.77c735d1.svg" 
                 alt="Obana Office Logo" style="width: 100px;"/>
            <h2 style="color: #333; margin-top: 10px;">Thank you for your ${formatFormType(
							body.formType
						)} RFQ submission!</h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Dear ${body.name},</p>
            <p>We've received your ${
							body.formType
						} request and our team will review it shortly.</p>
          </div>
          
          <div style="margin-bottom: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px;">
            <h3 style="color: #555; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Your RFQ Summary</h3>
            
            <div style="margin-bottom: 10px;">
              <p><strong>Request Type:</strong> ${body.formType}</p>
            </div>
            
            ${productDetailsSection}
            
            ${
							body.sampleProductUrl || body.sampleProduct
								? `
              <div style="margin-top: 15px;">
                <h4 style="color: #555; margin-bottom: 5px;">Sample Product:</h4>
                <img src="${
									body.sampleProductUrl || body.sampleProduct
								}" alt="Your Sample Product" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"/>
              </div>
            `
								: ""
						}
            
         
            
            ${
							body.comment
								? `
              <div>
                <h4 style="color: #555; margin-bottom: 5px;">Additional Comments</h4>
                <p>${body.comment}</p>
              </div>
            `
								: ""
						}
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Our team will review your ${
							body.formType
						} request and get back to you shortly.</p>
          </div>
          
           <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
            <p>obana.africa</p>
            <p>
                <a href="mailto:contact@obana.africa" style="color: #777; text-decoration: none;">📧 contact@obana.africa</a> | 
                <a href="tel:+2348096535511" style="color: #777; text-decoration: none;">📞 +234 809 653 5511</a> | 
                <a href="https://obana.africa" style="color: #777; text-decoration: none;">🌐 obana.africa</a>
            </p>
            <p style="margin-top: 10px;">This is an automated message. Please do not reply directly to this email.</p>
           </div>
        </div>
      `,
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
