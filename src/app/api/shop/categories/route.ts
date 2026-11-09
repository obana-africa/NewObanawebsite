import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/requests/zoho/get-formated-cat`,
			{
				params: { status: "active" },
				headers: {
					Accept: "application/json",
				},
			}
		);

		return NextResponse.json(response.data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Categories fetch error:", error);

		if (error.response) {
			return NextResponse.json(
				{
					message: error.response.data?.message || "Failed to fetch categories",
					error: error.response.data,
				},
				{ status: error.response.status }
			);
		} else {
			return NextResponse.json(
				{
					message: "Internal server error while fetching categories",
					error: error.message,
				},
				{ status: 500 }
			);
		}
	}
}
