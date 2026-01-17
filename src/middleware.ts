import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const allowedOrigins = [
		"http://localhost:3000",
		"https://staging.shop.obana.africa",
		"https://shop.obana.africa",
		"https://obana.africa",
	];

	const origin = request.headers.get("origin") ?? "";
	const isAllowedOrigin = allowedOrigins.includes(origin);

	// Handle preflight requests
	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": isAllowedOrigin
					? origin
					: allowedOrigins[0],
				"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
				"Access-Control-Max-Age": "86400",
				"Access-Control-Allow-Credentials": "true",
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
		response.headers.set("Access-Control-Allow-Credentials", "true");
	}

	return response;
}

export const config = {
	matcher: "/api/:path*",
};
