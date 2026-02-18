/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAccessToken } from "@/helpers/zoho-auth-token";

const ZOHO_BASE_URL = process.env.ZOHO_BASE_URL;

interface CustomerPayload {
	id?: string;
	email: string;
	password?: string;
	phone?: string;
	attributes: {
		first_name?: string;
		last_name?: string;
		contact_type?: string;
		customer_sub_type?: string;
		billing_address?: string;
		billing_city?: { label: string; value: string } | string;
		billing_state?: string;
		billing_country?: string;
		address?: string;
		city?: { label: string; value: string } | string;
		state?: string;
		country?: string;
		language_code?: string;
		account_types?: string;
		category?: string;
		referral_source?: string;
		lead?: string;
		operational_mode?: string;
		category_of_interest?: Array<{ label: string }>;
		brand_of_interest?: Array<{ label: string }>;
		businessName?: string;
		salutation?: string;
		currency?: string;
		terms?: boolean;
		dob?: string;
		[key: string]: any;
	};
}

interface ZohoCustomerData {
	contact_name: string;
	company_name?: string;
	contact_type: string;
	first_name?: string;
	last_name?: string;
	email: string;
	phone?: string;
	mobile?: string;
	salutation?: string;
	customer_sub_type?: string;
	language_code?: string;
	currency_id?: string;
	currency_code?: string;
	payment_terms?: number;
	payment_terms_label?: string;
	payment_terms_id?: string;
	credit_limit?: number;
	billing_address?: {
		attention?: string;
		address?: string;
		street2?: string;
		city?: string;
		state?: string;
		zip?: string;
		country?: string;
		phone?: string;
	};
	shipping_address?: {
		attention?: string;
		address?: string;
		street2?: string;
		city?: string;
		state?: string;
		zip?: string;
		country?: string;
		phone?: string;
	};
	contact_persons?: Array<{
		first_name: string;
		last_name: string;
		mobile?: string;
		phone?: string;
		email: string;
		salutation?: string;
		is_primary_contact?: boolean;
		communication_preference?: {
			is_email_enabled?: boolean;
			is_whatsapp_enabled?: boolean;
		};
	}>;
	custom_fields?: Array<{
		api_name: string;
		value: any;
	}>;
	tags?: string[];
	documents?: any[];
	[key: string]: any;
}

function extractValue(field: any): string {
	if (!field) return "";
	if (typeof field === "string") return field;
	if (field.value) return field.value;
	if (field.label) return field.label;
	return "";
}

// Helper function to extract labels from array of objects
function extractLabels(arr: Array<{ label: string }> | undefined): string {
	if (!arr || !Array.isArray(arr)) return "";
	return arr.map((item) => item.label).join(", ");
}

// Helper function to extract values from array for multiselect fields
function extractValues(arr: Array<{ label: string }> | undefined): string[] {
	if (!arr || !Array.isArray(arr)) return [];
	return arr.map((item) => item.label);
}

const VALID_CATEGORIES = new Set(["Women", "Kids", "Beauty", "Men"]);

// Map your custom fields to Zoho API names
const CUSTOM_FIELD_MAPPING: { [key: string]: string } = {
	customer_sub_type: "customer_sub_type",
	language_code: "language_code",
	account_types: "cf_user_type",
	// category: "cf_category",
	referral_source: "cf_referral_source",
	lead: "cf_lead",
	operational_mode: "cf_operational_mode",
	category_of_interest: "cf_product_category",
	brand_of_interest: "cf_brand_of_interest",
	businessName: "company_name",
	currency: "currency_code",
	// dob: "date_of_birth",
	bank_name: "cf_bank_name",
	account_number: "cf_account_number",
	account_name: "cf_account_name",
	salesperson: "cf_salesperson",
	customer_address: "cf_contact_person",
	status: "cf_status",
};

// Format data for Zoho API
function formatZohoCustomerData(payload: CustomerPayload): ZohoCustomerData {
	const { email, phone, attributes } = payload;

	// Build contact name
	const firstName = attributes.first_name || "";
	const lastName = attributes.last_name || "";
	const businessName = attributes.businessName || "";
	const contactName =
		businessName || `${firstName} ${lastName}`.trim() || email;

	const zohoData: ZohoCustomerData = {
		contact_name: contactName,
		contact_type: attributes.contact_type || "customer",
		email: email,
		phone: phone || "",
		mobile: phone || "",
		company_name: businessName,
		first_name: firstName,
		last_name: lastName,
		salutation: attributes.salutation || "",
		customer_sub_type: attributes.customer_sub_type || "individual",
		language_code: attributes.language_code || "en",
		// currency_id: "6536807000000000097",
		currency_code: attributes.currency || "USD",
		payment_terms: 0,
		payment_terms_label: "Due on Receipt",
		// payment_terms_id: "6536807000000783007",
		credit_limit: 0,
		tags: [],
		documents: [],
	};

	// Billing address
	if (
		attributes.billing_address ||
		attributes.billing_city ||
		attributes.billing_state ||
		attributes.billing_country
	) {
		zohoData.billing_address = {
			attention: "",
			address: attributes.billing_address || "",
			city: extractValue(attributes.billing_city),
			state: attributes.billing_state || "",
			country: attributes.billing_country || "",
			zip: "",
		};
	}

	// Shipping address
	if (
		attributes.address ||
		attributes.city ||
		attributes.state ||
		attributes.country
	) {
		zohoData.shipping_address = {
			attention: "",
			address: attributes.address || "",
			city: extractValue(attributes.city),
			state: attributes.state || "",
			country: attributes.country || "",
			zip: "",
		};
	}

	// Contact persons
	if (firstName || lastName || email || phone) {
		zohoData.contact_persons = [
			{
				first_name: firstName,
				last_name: lastName,
				mobile: phone || "",
				phone: phone || "",
				email: email,
				salutation: attributes.salutation || "Mr.",
				is_primary_contact: true,
				communication_preference: {
					is_email_enabled: true,
					is_whatsapp_enabled: true,
				},
			},
		];
	}

	// Prepare custom fields
	const customFields: Array<{ api_name: string; value: any }> = [];

	// Add custom fields based on the mapping
	Object.entries(CUSTOM_FIELD_MAPPING).forEach(([key, apiName]) => {
		if (
			attributes[key] !== undefined &&
			attributes[key] !== null &&
			attributes[key] !== ""
		) {
			let value = attributes[key];

			// Handle special cases
			if (key === "category_of_interest") {
				const categoryValues = extractValues(attributes.category_of_interest);
				const validCategories = categoryValues.filter((cat) =>
					VALID_CATEGORIES.has(cat)
				);

				if (validCategories.length > 0) {
					value = validCategories;
				} else {
					// If no valid categories, don't send this field
					return;
				}
			} else if (key === "brand_of_interest") {
				value = extractLabels(attributes.brand_of_interest);
			} else if (key === "account_types") {
				value = attributes[key] === "individual" ? "B2B" : "B2B";
			} else if (
				key === "customer_sub_type" ||
				key === "language_code" ||
				key === "businessName" ||
				key === "currency"
			) {
				return;
			}

			// For other fields, use the extracted value
			if (typeof value === "object" && !Array.isArray(value)) {
				value = extractValue(value);
			}

			customFields.push({ api_name: apiName, value });
		}
	});

	// Add any additional custom fields that might be in attributes but not in mapping
	Object.entries(attributes).forEach(([key, value]) => {
		if (
			CUSTOM_FIELD_MAPPING[key] ||
			[
				"first_name",
				"last_name",
				"contact_type",
				"customer_sub_type",
				"billing_address",
				"billing_city",
				"billing_state",
				"billing_country",
				"address",
				"city",
				"state",
				"country",
				"language_code",
				"account_types",
				"category",
				"referral_source",
				"lead",
				"operational_mode",
				"category_of_interest",
				"brand_of_interest",
				"businessName",
				"salutation",
				"currency",
				"terms",
				"dob",
			].includes(key)
		) {
			return;
		}

		// Check if it's a custom field by pattern (starts with cf_)
		if (key.startsWith("cf_")) {
			customFields.push({ api_name: key, value });
		} else {
			const apiName = `cf_${key}`;
			customFields.push({ api_name: apiName, value });
		}
	});

	// Only add custom_fields if there are any
	if (customFields.length > 0) {
		zohoData.custom_fields = customFields;
	}

	return zohoData;
}

// Create customer in Zoho
async function createZohoCustomer(
	payload: CustomerPayload,
	accessToken: string
): Promise<any> {
	const zohoCustomerData = formatZohoCustomerData(payload);

	try {
		const response = await axios.post(
			`${ZOHO_BASE_URL}/contacts`,
			zohoCustomerData,
			{
				headers: {
					Authorization: `Zoho-oauthtoken ${accessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					organization_id: process.env.ZOHO_ORG_ID || "",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		console.error(
			"Error creating customer:",
			error.response?.data || error.message
		);
		if (error.response) {
			throw new Error(
				`Zoho API Error: ${
					error.response.data.message || JSON.stringify(error.response.data)
				}`
			);
		} else if (error.request) {
			throw new Error("No response from Zoho API.");
		} else {
			throw new Error(error.message);
		}
	}
}

// Update customer in Zoho

// Update customer in Zoho - with create fallback
async function updateZohoCustomer(
	contactId: string,
	payload: CustomerPayload,
	accessToken: string
): Promise<any> {
	const zohoCustomerData = formatZohoCustomerData(payload);

	try {
		const response = await axios.put(
			`${ZOHO_BASE_URL}/contacts/${contactId}`,
			zohoCustomerData,
			{
				headers: {
					Authorization: `Zoho-oauthtoken ${accessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					organization_id: process.env.ZOHO_ORG_ID || "",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		console.error(
			"Error updating customer:",
			error.response?.data || error.message
		);

		// Check if the error is because contact doesn't exist
		if (
			error.response?.data?.code === 1002 ||
			error.message?.includes("Contact does not exist") ||
			error.response?.status === 404
		) {
			try {
				return await createZohoCustomer(payload, accessToken);
			} catch (createError: any) {
				throw new Error(
					`Failed to create new customer after update failed: ${
						createError.message || JSON.stringify(createError.response?.data)
					}`
				);
			}
		}

		if (error.response) {
			throw new Error(
				`Zoho API Error: ${
					error.response.data.message || JSON.stringify(error.response.data)
				}`
			);
		} else if (error.request) {
			throw new Error("No response from Zoho API.");
		} else {
			throw new Error(error.message);
		}
	}
}

export async function POST(request: NextRequest) {
	try {
		const allow = request.nextUrl.searchParams.get("allow");

		if (allow !== "tajiro") {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body: CustomerPayload = await request.json();

		// Validate required fields
		if (!body.email || !body.attributes) {
			return NextResponse.json(
				{
					success: false,
					message: "Missing required fields: email and attributes are required",
				},
				{ status: 400 }
			);
		}

		let accessToken = await getAccessToken();
		let result;

		try {
			result = await createZohoCustomer(body, accessToken);
		} catch (error: any) {
			if (
				error.message.includes("401") ||
				error.message.includes("Unauthorized")
			) {
				accessToken = await getAccessToken();
				result = await createZohoCustomer(body, accessToken);
			} else {
				throw error;
			}
		}

		return NextResponse.json({
			success: true,
			message: "Customer created successfully",
			data: result,
		});
	} catch (error: any) {
		console.error("Error creating customer:", error.message);
		return NextResponse.json(
			{
				success: false,
				message: error.message || "Failed to create customer",
				error: error.toString(),
			},
			{ status: 500 }
		);
	}
}

// PUT - Update existing customer
export async function PUT(request: NextRequest) {
	try {
		const allow = request.nextUrl.searchParams.get("allow");

		if (allow !== "tajiro") {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body: CustomerPayload = await request.json();

		// Validate required fields
		if (!body.id) {
			return NextResponse.json(
				{
					success: false,
					message: "Missing required field: id (customer ID)",
				},
				{ status: 400 }
			);
		}

		if (!body.email || !body.attributes) {
			return NextResponse.json(
				{
					success: false,
					message: "Missing required fields: email and attributes",
				},
				{ status: 400 }
			);
		}

		let accessToken = await getAccessToken();
		let result;

		try {
			result = await updateZohoCustomer(body.id, body, accessToken);
		} catch (error: any) {
			// Retry with fresh token if unauthorized
			if (
				error.message.includes("401") ||
				error.message.includes("Unauthorized")
			) {
				accessToken = await getAccessToken();
				result = await updateZohoCustomer(body.id, body, accessToken);
			} else {
				throw error;
			}
		}

		return NextResponse.json({
			success: true,
			message: "Customer updated successfully",
			data: result,
		});
	} catch (error: any) {
		console.error("Error updating customer:", error.message);
		return NextResponse.json(
			{
				success: false,
				message: error.message || "Failed to update customer",
				error: error.toString(),
			},
			{ status: 500 }
		);
	}
}

// PATCH - Partial update of customer
export async function PATCH(request: NextRequest) {
	try {
		const allow = request.nextUrl.searchParams.get("allow");

		if (allow !== "tajiro") {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body: CustomerPayload = await request.json();

		if (!body.id) {
			return NextResponse.json(
				{
					success: false,
					message: "Missing required field: id (customer ID)",
				},
				{ status: 400 }
			);
		}

		let accessToken = await getAccessToken();
		let result;

		try {
			result = await updateZohoCustomer(body.id, body, accessToken);
		} catch (error: any) {
			if (
				error.message.includes("401") ||
				error.message.includes("Unauthorized")
			) {
				accessToken = await getAccessToken();
				result = await updateZohoCustomer(body.id, body, accessToken);
			} else {
				throw error;
			}
		}

		return NextResponse.json({
			success: true,
			message: "Customer updated successfully",
			data: result,
		});
	} catch (error: any) {
		console.error("Error updating customer:", error.message);
		return NextResponse.json(
			{
				success: false,
				message: error.message || "Failed to update customer",
				error: error.toString(),
			},
			{ status: 500 }
		);
	}
}
