// pages/api/shop/users/signup.ts (or app/api/shop/users/signup/route.ts for App Router)

// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method !== "POST") {
// 		return res.status(405).json({ message: "Method not allowed" });
// 	}

// 	try {
// 		const registrationData = req.body;

// 		// Forward the registration to your existing Obana API
// 		const response = await axios.post(
// 			`${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
// 			registrationData,
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);

// 		// Return the response from your Obana API
// 		res.status(200).json(response.data);
// 	} catch (error: any) {
// 		console.error("Registration error:", error);

// 		// Handle axios error response
// 		if (error.response) {
// 			res.status(error.response.status).json({
// 				message: error.response.data?.message || "Registration failed",
// 				error: error.response.data,
// 			});
// 		} else {
// 			res.status(500).json({
// 				message: "Internal server error during registration",
// 				error: error.message,
// 			});
// 		}
// 	}
// }


// app/api/shop/users/signup/route.ts
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
