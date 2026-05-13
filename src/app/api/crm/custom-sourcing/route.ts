/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getCrmAccessToken } from "@/helpers/zoho-auth-token";

const ZOHO_BASE_URL =
	process.env.ZOHO_CRM_BASE_URL || "https://www.zohoapis.com/crm/v2";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { name, email, phone, formType } = body;

		if (!email || !name) {
			return NextResponse.json(
				{ error: "Missing required fields: email, name" },
				{ status: 400 }
			);
		}

		if (!ZOHO_BASE_URL) {
			console.error("❌ ZOHO_CRM_BASE_URL is not set");
			return NextResponse.json(
				{ error: "Server configuration error: ZOHO_CRM_BASE_URL not set" },
				{ status: 500 }
			);
		}

		const accessToken = await getCrmAccessToken();

		if (!accessToken) {
			console.error("❌ Failed to get CRM access token");
			return NextResponse.json(
				{ error: "Failed to authenticate with Zoho CRM" },
				{ status: 500 }
			);
		}

		const ownerObject = {
			id: "6049617000000442001",
			name: "OCHIJE NNANI",
			email: "ochije.nnani@iconholding.africa",
		};

		const formatPrice = (price: any): string | null => {
			if (!price) return null;
			if (typeof price === "object" && price.amount) {
				return price.amount.toString();
			}
			return price.toString();
		};

		const recordData: any = {
			Owner: ownerObject,
			Name: name,
			Name1: name,
			Customer_Email: email,
			Phone_Number: phone,
		};

		// Map fields based on form type
		if (formType === "production") {
			recordData.What_brand_do_you_want_to_source = body.brandToSource || null;
			recordData.Type_of_Product = body.productType || null;
			recordData.What_style_do_you_want = body.style || null;
			recordData.Suggested_Size_Range = body.sizeRange || null;
			recordData.MOQ_Minimum_order_input = body.moq || null;
			recordData.What_is_your_target_sourcing_price_point = formatPrice(
				body.targetPrice
			);
			recordData.Item_Description = body.itemDescription || null;
			recordData.Extra_Comment = body.comment || null;

			if (body.sampleProductUrl) {
				recordData.Upload_a_sample_product_if_you_have = body.sampleProductUrl;
			}
		} else if (formType === "fabric") {
			recordData.Type_of_Product = "Fabric";
			recordData.What_brand_do_you_want_to_source = body.preferredBrand || null;
			recordData.Item_Description = `${body.fabricCategory || ""} - ${
				body.fabricDescription || ""
			}`.trim();
			recordData.Suggested_Size_Range = body.sizeRange || null;
			recordData.MOQ_Minimum_order_input = body.moq || null;
			recordData.What_is_your_target_sourcing_price_point = formatPrice(
				body.targetPrice
			);
			recordData.Extra_Comment = [
				body.intendedUsage?.length
					? `Intended Usage: ${body.intendedUsage.join(", ")}`
					: "",
				body.additionalComments || "",
			]
				.filter(Boolean)
				.join(" | ");

			if (body.sampleProductUrl) {
				recordData.Upload_a_sample_product_if_you_have = body.sampleProductUrl;
			}
		} else if (formType === "label") {
			recordData.Type_of_Product = `Label - ${body.labelType || ""}`;
			recordData.Item_Description = `Material: ${
				body.materialType || ""
			}, Size: ${body.size || ""}`;
			recordData.MOQ_Minimum_order_input = body.moq || null;
			recordData.What_is_your_target_sourcing_price_point = formatPrice(
				body.targetPrice
			);
			recordData.Extra_Comment = body.comment || null;

			if (body.sampleProductUrl) {
				recordData.Upload_a_sample_product_if_you_have = body.sampleProductUrl;
			}
		} else if (formType === "raw_material") {
			recordData.Type_of_Product = `Raw Material - ${
				body.rawMaterialType || ""
			}`;
			recordData.What_brand_do_you_want_to_source = body.preferredBrand || null;
			recordData.Item_Description = body.materialDescription || null;
			recordData.Suggested_Size_Range = body.sizeSpecRange || null;
			recordData.MOQ_Minimum_order_input = body.moq || null;
			recordData.What_is_your_target_sourcing_price_point = formatPrice(
				body.targetPrice
			);
			recordData.Extra_Comment = [
				body.applicationUse?.length
					? `Application: ${body.applicationUse.join(", ")}`
					: "",
				body.additionalComments || "",
			]
				.filter(Boolean)
				.join(" | ");

			if (body.sampleProductUrl) {
				recordData.Upload_a_sample_product_if_you_have = body.sampleProductUrl;
			}
		}

		const searchUrl = `${ZOHO_BASE_URL}/Custom_Sourcing_Quote`;

		const searchResponse = await axios.get(searchUrl, {
			headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
			params: {
				criteria: `(Customer_Email:equals:${email})`,
				fields: "*",
			},
			timeout: 15000,
		});

		const existingRecords = searchResponse.data.data || [];

		let response;
		let action;

		if (existingRecords.length > 0) {
			const recordId = existingRecords[0].id;

			response = await axios.put(
				`${ZOHO_BASE_URL}/Custom_Sourcing_Quote/${recordId}`,
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
			response = await axios.post(
				`${ZOHO_BASE_URL}/Custom_Sourcing_Quote`,
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
			message: `Custom Sourcing record ${action} successfully`,
		});
	} catch (error: any) {
		console.error(
			"❌ Error creating/updating Custom Sourcing record:",
			error.response?.data || error.message
		);

		return NextResponse.json(
			{
				success: false,
				error: "Failed to create Custom Sourcing record",
				message: error.response?.data?.message || error.message,
				details: error.response?.data || null,
			},
			{ status: 500 }
		);
	}
}

// Optional: GET endpoint to retrieve custom sourcing records
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");
	const recordId = searchParams.get("id");

	try {
		const accessToken = await getCrmAccessToken();

		if (recordId) {
			const response = await axios.get(
				`${ZOHO_BASE_URL}/Custom_Sourcing_Quote/${recordId}`,
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
			const response = await axios.get(
				`${ZOHO_BASE_URL}/Custom_Sourcing_Quote`,
				{
					headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
					params: {
						criteria: `(Customer_Email:equals:${email})`,
					},
				}
			);

			return NextResponse.json({
				success: true,
				data: response.data.data || [],
			});
		}

		// Get all records (with pagination)
		const perPage = searchParams.get("per_page") || "200";
		const page = searchParams.get("page") || "1";

		const response = await axios.get(`${ZOHO_BASE_URL}/Custom_Sourcing_Quote`, {
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
			"❌ Error fetching Custom Sourcing records:",
			error.response?.data || error.message
		);

		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch Custom Sourcing records",
				message: error.response?.data?.message || error.message,
			},
			{ status: 500 }
		);
	}
}
