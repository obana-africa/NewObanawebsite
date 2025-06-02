import { subscribeToNewsletter } from "@/lib/zoho";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
	"https://www.obana.africa",
	"https://obana.africa",
	"http://localhost:3000",
	"http://localhost:3001",
];

export async function POST(req: NextRequest) {
	const origin = req.headers.get("origin");
	const allowedOrigin = ALLOWED_ORIGINS.includes(origin || "")
		? origin
		: ALLOWED_ORIGINS[0];

	try {
		const { email } = await req.json();

		if (!email) {
			return new NextResponse(
				JSON.stringify({ message: "Email is required" }),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": allowedOrigin || "*",
						Vary: "Origin",
					},
				}
			);
		}

		const result = await subscribeToNewsletter({ email });

		return new NextResponse(JSON.stringify(result), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": allowedOrigin || "*",
				Vary: "Origin",
			},
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({ message: error.message || "Something went wrong" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": allowedOrigin || "*",
					Vary: "Origin",
				},
			}
		);
	}
}

export async function OPTIONS(req: NextRequest) {
	const origin = req.headers.get("origin");
	const allowedOrigin = ALLOWED_ORIGINS.includes(origin || "")
		? origin
		: ALLOWED_ORIGINS[0];

	return new NextResponse(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": allowedOrigin || "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Max-Age": "86400",
		},
	});
}
