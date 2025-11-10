import { NextResponse } from "next/server";
import axios from "axios";
import { getMailAccessToken } from "@/helpers/zoho-auth-token";
import { LogisticsFormData } from "./types";
import { formatFormType } from "./helpers";
import { generateEmailContent } from "./templates";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { formType, ...data } = body;

		let processedData: LogisticsFormData;

		if (formType === "domestic") {
			const { selectedRate, ...flatData } = data;

			processedData = {
				contactInfo: {
					fullName: `${flatData.senderFirstName || ""} ${
						flatData.senderLastName || ""
					}`.trim(),
					email: flatData.senderEmail || "",
					phoneNumber: flatData.senderPhone || "",
				},
				formType: "domestic",
				shipmentRoute: "Domestic Shipment",
				pickUp: `${flatData.senderAddress || ""}, ${
					flatData.senderCity || ""
				}, ${flatData.senderState || ""}, ${
					flatData.senderCountry || ""
				}`.trim(),
				destination: `${flatData.receiverAddress || ""}, ${
					flatData.receiverCity || ""
				}, ${flatData.receiverState || ""}, ${
					flatData.receiverCountry || ""
				}`.trim(),
				productCategory: "Domestic Parcel",
				productType: flatData.itemName || "",
				productWeight: flatData.itemWeight || "",
				dimension: "",
				shipmentImageUrl: "",
				sender: {
					name: `${flatData.senderFirstName || ""} ${
						flatData.senderLastName || ""
					}`.trim(),
					email: flatData.senderEmail || "",
					phone: flatData.senderPhone || "",
					address: `${flatData.senderAddress || ""}, ${
						flatData.senderCity || ""
					}, ${flatData.senderState || ""}, ${
						flatData.senderCountry || ""
					}`.trim(),
				},
				receiver: {
					name: `${flatData.receiverFirstName || ""} ${
						flatData.receiverLastName || ""
					}`.trim(),
					email: flatData.receiverEmail || "",
					phone: flatData.receiverPhone || "",
					address: `${flatData.receiverAddress || ""}, ${
						flatData.receiverCity || ""
					}, ${flatData.receiverState || ""}, ${
						flatData.receiverCountry || ""
					}`.trim(),
				},
				logisticsPartner: selectedRate
					? {
							name: selectedRate.carrier_name || "Selected Partner",
							price: selectedRate.amount || 0,
							estimatedDelivery: selectedRate.delivery_time || "Estimated Time",
					  }
					: {
							name: "TBD",
							price: 0,
							estimatedDelivery: "TBD",
					  },
			};
		} else {
			processedData = body as LogisticsFormData;
		}

		const formTypeStr = formatFormType(processedData.formType);

		const accessToken = await getMailAccessToken();
		const accountId = process.env.ZOHO_MAIL_ACCOUNT_ID;

		const adminEmailContent = generateEmailContent(processedData, true);

		const adminEmailData = {
			fromAddress: "'OBANA LOGISTICS' <ochije.nnani@iconholding.africa>",
			toAddress: process.env.RFL_MAIL_TO_ADDRESS,
			subject: `New ${formTypeStr} Request from ${processedData.contactInfo.fullName}`,
			content: adminEmailContent,
		};

		const apiUrl = `https://mail.zoho.com/api/accounts/${accountId}/messages`;

		await axios.post(apiUrl, adminEmailData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		// Sender (Customer) Email
		const customerBaseContent = generateEmailContent(processedData, false);
		const customerEmailContent = customerBaseContent.replace(
			`New ${formTypeStr} Request`,
			`Your ${formTypeStr} Request Confirmation`
		);

		const customerEmailData = {
			fromAddress: "'OBANA LOGISTICS' <ochije.nnani@iconholding.africa>",
			toAddress: processedData.contactInfo.email,
			subject: `Your ${formTypeStr} Request Confirmation`,
			content: customerEmailContent,
		};

		await axios.post(apiUrl, customerEmailData, {
			headers: {
				Authorization: `Zoho-oauthtoken ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (
			processedData.formType === "domestic" &&
			processedData.receiver?.email
		) {
			const receiverProcessedData = {
				...processedData,
				contactInfo: {
					fullName: processedData.receiver.name,
					email: processedData.receiver.email,
					phoneNumber: processedData.receiver.phone,
				},
			};

			const receiverBaseContent = generateEmailContent(
				receiverProcessedData,
				false
			);
			const receiverEmailContent = receiverBaseContent
				.replace(
					`New ${formTypeStr} Request`,
					`Incoming ${formTypeStr} Notification`
				)
				.replace(
					`Our team will review your ${formTypeStr} request and get back to you shortly.`,
					`A shipment has been booked and is on its way to you from ${processedData.sender?.name}. Our team will keep you updated on the status.`
				);

			const receiverEmailData = {
				fromAddress: "'OBANA LOGISTICS' <ochije.nnani@iconholding.africa>",
				toAddress: processedData.receiver.email,
				subject: `Incoming ${formTypeStr} from ${processedData.sender?.name}`,
				content: receiverEmailContent,
			};

			await axios.post(apiUrl, receiverEmailData, {
				headers: {
					Authorization: `Zoho-oauthtoken ${accessToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
		}

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
