import { NextResponse } from "next/server";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";

interface SenderInfo {
	name: string;
	email: string;
	phone: string;
	address: string;
}

interface ReceiverInfo {
	name: string;
	email: string;
	phone: string;
	address: string;
}

interface ShipmentData {
	shipmentRoute?: string;
	pickUp: string;
	destination: string;
	productCategory: string;
	productType: string;
	productWeight: string;
	dimension?: string;
	shipmentImage?: string;
	shipmentImageUrl?: string | null;
	formType: string;
	sender?: SenderInfo;
	receiver?: ReceiverInfo;
}

const formatFormType = (formType: string) => {
	switch (formType) {
		case "domestic":
			return "Within Nigeria Shipment";
		case "import":
			return "Import Shipment";
		case "export":
			return "Export Shipment";
		default:
			return formType.charAt(0).toUpperCase() + formType.slice(1);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateEmailContent(data: any, isAdmin: boolean): string {
	const shipmentData: ShipmentData = {
		shipmentRoute: data.shipmentRoute,
		pickUp: data.pickUp,
		destination: data.destination,
		productCategory: data.productCategory,
		productType: data.productType,
		productWeight: data.productWeight,
		dimension: data.dimension,
		shipmentImageUrl: data.shipmentImageUrl || data.shipmentImage,
		formType: data.formType,
		sender: data.sender,
		receiver: data.receiver,
	};

	const { logisticsPartner, contactInfo } = data;

	return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
                     alt="Obana Logo" style="width: 150px; margin-bottom: 20px;"/>
                <h2 style="color: #1a365d; margin: 0;">New ${formatFormType(
									shipmentData.formType
								)} Request</h2>
            </div>

            <!-- Contact Information -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #1a365d; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                    Contact Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 140px;">Full Name:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													contactInfo.fullName
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Email:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													contactInfo.email
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													contactInfo.phoneNumber
												}</td>
                    </tr>
                </table>
            </div>

            ${
							shipmentData.formType === "domestic" &&
							shipmentData.sender &&
							shipmentData.receiver
								? `
            <!-- Sender Information -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #1a365d; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                    Sender Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 140px;">Name:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.sender.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Email:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.sender.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.sender.phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Address:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.sender.address}</td>
                    </tr>
                </table>
            </div>

            <!-- Receiver Information -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #1a365d; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                    Receiver Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 140px;">Name:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.receiver.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Email:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.receiver.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.receiver.phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Address:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.receiver.address}</td>
                    </tr>
                </table>
            </div>
            `
								: ""
						}

            <!-- Shipment Details -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #1a365d; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                    Shipment Details
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    ${
											shipmentData.formType !== "domestic" &&
											shipmentData.shipmentRoute
												? `
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 140px;">Shipment Route:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.shipmentRoute}</td>
                    </tr>
                    `
												: ""
										}
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Pick Up Location:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													shipmentData.pickUp
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Destination:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													shipmentData.destination
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Product Category:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													shipmentData.productCategory
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Product Type:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													shipmentData.productType
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Weight:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													shipmentData.productWeight
												}kg</td>
                    </tr>
                    ${
											shipmentData.dimension
												? `
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Dimensions:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${shipmentData.dimension}</td>
                    </tr>
                    `
												: ""
										}
                </table>
                ${
									shipmentData.shipmentImageUrl
										? `
                <div style="margin-top: 15px;">
                    <p style="color: #64748b; margin-bottom: 8px;">Shipment Image:</p>
                    <img src="${shipmentData.shipmentImageUrl}" alt="Shipment" style="max-width: 300px; border-radius: 4px;"/>
                </div>
                `
										: ""
								}
            </div>

            <!-- Logistics Partner Details -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #1a365d; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                    Selected Logistics Partner
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 140px;">Partner Name:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													logisticsPartner.name
												}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Price:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">₦${logisticsPartner.price.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Delivery Time:</td>
                        <td style="padding: 8px 0; color: #1a365d; font-weight: 500;">${
													logisticsPartner.estimatedDelivery
												}</td>
                    </tr>
                </table>
            </div>

            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
             <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
                     alt="Obana Logo" style="width: 150px; margin-bottom: 20px;"/>
                     ${
												isAdmin
													? `
                       <p>This email was sent from your website Logistics ${formatFormType(
													shipmentData.formType
												)} form Request.</p>
                `
													: ` <div style="margin-bottom: 20px;">
                               <p>Our team will review your ${formatFormType(
																	shipmentData.formType
																)} request and get back to you shortly.</p>
                              </div>
                          <p>Thank you for choosing Obana Logistics.</p>
                     <p>
                        <a href="mailto:contact@obana.africa" style="color: #777; text-decoration: none;">📧 contact@obana.africa</a> | 
                        <a href="tel:+2348096535511" style="color: #777; text-decoration: none;">📞 +234 809 653 5511</a> | 
                        <a href="https://obana.africa" style="color: #777; text-decoration: none;">🌐 obana.africa</a>
                    </p>
                    <p style="margin-top: 10px;">This is an automated message. Please do not reply directly to this email.</p>
                `
											}
           </div>
        </div>
    `;
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
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
