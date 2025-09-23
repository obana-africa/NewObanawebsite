import { NextRequest } from "next/server";

export function handleCors(req: NextRequest) {
	const allowedOrigins = [
		"http://localhost:3000", 
		"https://staging.shop.obana.africa", 
		"https://shop.obana.africa", 
	];

	const origin = req.headers.get("origin") || "";

	const isAllowedOrigin = allowedOrigins.includes(origin);

	const headers = {
		"Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0], 
		"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Max-Age": "86400", 
	};

	if (req.method === "OPTIONS") {
		return new Response(null, { status: 204, headers });
	}

	return headers;
}
