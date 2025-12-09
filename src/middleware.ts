import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// Handle CORS
	const allowedOrigins = [
		"http://localhost:3000",
		"https://staging.shop.obana.africa",
		"https://shop.obana.africa",
	];

	const origin = request.headers.get("origin") ?? "";
	const isAllowedOrigin = allowedOrigins.includes(origin);

	// Handle preflight requests
	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": isAllowedOrigin ? origin : "null",
				"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
				"Access-Control-Max-Age": "86400",
			},
		});
	}

	// Handle actual request
	const response = NextResponse.next();

	if (isAllowedOrigin) {
		response.headers.set("Access-Control-Allow-Origin", origin);
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET,POST,PUT,DELETE,OPTIONS"
		);
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, Accept"
		);
	}

	return response;
}

export const config = {
	matcher: "/api/:path*",
};
