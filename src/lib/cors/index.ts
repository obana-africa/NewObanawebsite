import { NextRequest } from "next/server";

export function handleCors(req: NextRequest) {
	const origin =
		process.env.NODE_ENV === "production"
			? "https://shop.obana.africa"
			: "https://staging.shop.obana.africa";

	const headers = {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	};

	// If preflight request
	if (req.method === "OPTIONS") {
		return new Response(null, { status: 204, headers });
	}

	return headers;
}
