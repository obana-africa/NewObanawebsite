import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
	try {
		const registrationData = await request.json();

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
			registrationData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return NextResponse.json(response.data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Registration error:", error);

		if (error.response) {
			return NextResponse.json(
				{
					message: error.response.data?.message || "Registration failed",
					error: error.response.data,
				},
				{ status: error.response.status }
			);
		} else {
			return NextResponse.json(
				{
					message: "Internal server error during registration",
					error: error.message,
				},
				{ status: 500 }
			);
		}
	}
}

// app/api/salad-africa/prequalify/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(request: NextRequest) {
// 	try {
// 		const prequalifyData = await request.json();

// 		const response = await axios.post(
// 			process.env.SALAD_AFRICA_API_URL ||
// 				"https://api.saladafrica.com/prequalify",
// 			prequalifyData,
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${process.env.SALAD_AFRICA_API_KEY}`,
// 				},
// 			}
// 		);

// 		return NextResponse.json(response.data);
// 	} catch (error: any) {
// 		console.error("Salad Africa prequalification error:", error);

// 		if (error.response) {
// 			return NextResponse.json(
// 				{
// 					message: error.response.data?.message || "Prequalification failed",
// 					error: error.response.data,
// 				},
// 				{ status: error.response.status }
// 			);
// 		} else {
// 			return NextResponse.json(
// 				{
// 					message: "Internal server error during prequalification",
// 					error: error.message,
// 				},
// 				{ status: 500 }
// 			);
// 		}
// 	}
// }
