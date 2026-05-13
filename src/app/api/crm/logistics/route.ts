/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getCrmAccessToken } from "@/helpers/zoho-auth-token";

const ZOHO_BASE_URL =
	process.env.ZOHO_CRM_BASE_URL || "https://www.zohoapis.com/crm/v2";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { formType } = body;

		// Handle different payload structures
		let contactInfo, sender, receiver, restData;

		if (formType === "domestic") {
			// Domestic form sends flat fields - transform them
			contactInfo = {
				fullName: `${body.senderFirstName || ""} ${
					body.senderLastName || ""
				}`.trim(),
				email: body.senderEmail || "",
				phoneNumber: body.senderPhone || "",
			};

			sender = {
				name: `${body.senderFirstName || ""} ${
					body.senderLastName || ""
				}`.trim(),
				email: body.senderEmail || "",
				phone: body.senderPhone || "",
				address: `${body.senderAddress || ""}, ${body.senderCity || ""}, ${
					body.senderState || ""
				}, ${body.senderCountry || ""}`.trim(),
			};

			receiver = {
				name: `${body.receiverFirstName || ""} ${
					body.receiverLastName || ""
				}`.trim(),
				email: body.receiverEmail || "",
				phone: body.receiverPhone || "",
				address: `${body.receiverAddress || ""}, ${body.receiverCity || ""}, ${
					body.receiverState || ""
				}, ${body.receiverCountry || ""}`.trim(),
			};

			restData = {
				itemName: body.itemName,
				itemDescription: body.itemDescription,
				productWeight: body.itemWeight,
				senderZipCode: body.senderZip,
				receiverZipCode: body.receiverZip,
				itemValue: body.itemValue,
				itemCurrency: body.itemCurrency || "NGN",
				senderCity: body.senderCity,
				senderState: body.senderState,
				senderCountry: body.senderCountry,
				receiverCity: body.receiverCity,
				receiverState: body.receiverState,
				receiverCountry: body.receiverCountry,
			};
		} else {
			// Import/Export forms send nested structure
			contactInfo = body.contactInfo;
			sender = body.sender;
			receiver = body.receiver;
			restData = body;
		}

		// Validate required fields
		if (!contactInfo?.email || !contactInfo?.fullName) {
			return NextResponse.json(
				{ error: "Missing required fields: email, fullName" },
				{ status: 400 }
			);
		}

		// Validate environment variables
		if (!ZOHO_BASE_URL) {
			console.error("❌ ZOHO_CRM_BASE_URL is not set");
			return NextResponse.json(
				{ error: "Server configuration error: ZOHO_CRM_BASE_URL not set" },
				{ status: 500 }
			);
		}

		// Get Zoho access token
		const accessToken = await getCrmAccessToken();

		if (!accessToken) {
			console.error("❌ Failed to get CRM access token");
			return NextResponse.json(
				{ error: "Failed to authenticate with Zoho CRM" },
				{ status: 500 }
			);
		}

		// Owner object
		const ownerObject = {
			id: "6049617000000442001",
			name: "OCHIJE NNANI",
			email: "ochije.nnani@iconholding.africa",
		};

		// Determine shipment type based on formType
		const getShipmentType = (type: string): string => {
			switch (type) {
				case "domestic":
					return "Within Nigeria";
				case "import":
					return "Import";
				case "export":
					return "Export";
				default:
					return "Within Nigeria";
			}
		};

		// Build record data for Zoho CRM
		const recordData: any = {
			Owner: ownerObject,
			Name: contactInfo.fullName,
			Shipment_Type: getShipmentType(formType),
			First_Name1:
				sender?.name?.split(" ")[0] || contactInfo.fullName.split(" ")[0],
			Last_Name1:
				sender?.name?.split(" ").slice(1).join(" ") ||
				contactInfo.fullName.split(" ").slice(1).join(" ") ||
				".",
			Email: sender?.email || contactInfo.email,
			Phone1: sender?.phone || contactInfo.phoneNumber,
			Address1: sender?.address || "",
			State_Province1: restData.senderState || "",
			Country1: restData.senderCountry || "Nigeria",
			City1: restData.senderCity || "",
			ZIP_Postal_Code1: restData.senderZipCode || restData.senderZip || "",
			First_Name: receiver?.name?.split(" ")[0] || "",
			Last_Name: receiver?.name?.split(" ").slice(1).join(" ") || ".",
			Phone: receiver?.phone || "",
			Email1: receiver?.email || "",
			Address: receiver?.address || "",
			State_Province: restData.receiverState || "",
			ZIP_Postal_Code: restData.receiverZipCode || restData.receiverZip || "",
			Country: restData.receiverCountry || "Nigeria",
			City: restData.receiverCity || "",
			Item_Name: restData.itemName || restData.productType || "",
			Item_Description:
				restData.itemDescription || restData.productCategory || "",
			Weight_kg: String(
				Number(
					parseFloat(restData.productWeight || restData.itemWeight || "0") || 0
				).toFixed(2)
			),
			Item_Amount: String(
				Number(
					parseFloat(
						restData.itemValue || restData.logisticsPartner?.price || "0"
					) || 0
				).toFixed(2)
			),
			Currency1: restData.itemCurrency || "NGN",
		};

		// Search for existing record by email
		const searchUrl = `${ZOHO_BASE_URL}/Shipping_Request`;

		const searchResponse = await axios.get(searchUrl, {
			headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
			params: {
				criteria: `(Email:equals:${contactInfo.email})`,
				fields: "*",
			},
			timeout: 15000,
		});

		const existingRecords = searchResponse.data.data || [];

		let response;
		let action;

		if (existingRecords.length > 0) {
			// Update existing record
			const recordId = existingRecords[0].id;

			response = await axios.put(
				`${ZOHO_BASE_URL}/Shipping_Request/${recordId}`,
				{ data: [recordData] },
				{
					headers: {
						Authorization: `Zoho-oauthtoken ${accessToken}`,
						"Content-Type": "application/json",
					},
					timeout: 15000,
				}
			);
			action = "updated";
		} else {
			// Create new record
			response = await axios.post(
				`${ZOHO_BASE_URL}/Shipping_Request`,
				{ data: [recordData] },
				{
					headers: {
						Authorization: `Zoho-oauthtoken ${accessToken}`,
						"Content-Type": "application/json",
					},
					timeout: 15000,
				}
			);
			action = "created";
		}

		return NextResponse.json({
			success: true,
			action,
			data: response.data.data[0],
			message: `Logistics record ${action} successfully`,
		});
	} catch (error: any) {
		console.error(
			"❌ Error creating/updating Logistics record:",
			error.response?.data || error.message
		);

		return NextResponse.json(
			{
				success: false,
				error: "Failed to create Logistics record",
				message: error.response?.data?.message || error.message,
				details: error.response?.data || null,
			},
			{ status: 500 }
		);
	}
}

// Optional: GET endpoint to retrieve logistics records
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");
	const recordId = searchParams.get("id");

	try {
		const accessToken = await getCrmAccessToken();

		if (recordId) {
			// Get specific record by ID
			const response = await axios.get(
				`${ZOHO_BASE_URL}/Shipping_Request/${recordId}`,
				{
					headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
				}
			);

			return NextResponse.json({
				success: true,
				data: response.data.data[0],
			});
		}

		if (email) {
			// Search by email
			const response = await axios.get(`${ZOHO_BASE_URL}/Shipping_Request`, {
				headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
				params: {
					criteria: `(Email:equals:${email})`,
				},
			});

			return NextResponse.json({
				success: true,
				data: response.data.data || [],
			});
		}

		// Get all records (with pagination)
		const perPage = searchParams.get("per_page") || "200";
		const page = searchParams.get("page") || "1";

		const response = await axios.get(`${ZOHO_BASE_URL}/Shipping_Request`, {
			headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
			params: {
				per_page: perPage,
				page: page,
			},
		});

		return NextResponse.json({
			success: true,
			data: response.data.data || [],
			info: response.data.info || {},
		});
	} catch (error: any) {
		console.error(
			"❌ Error fetching Logistics records:",
			error.response?.data || error.message
		);

		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch Logistics records",
				message: error.response?.data?.message || error.message,
			},
			{ status: 500 }
		);
	}
}
