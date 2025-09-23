import { NextRequest } from "next/server";

export function handleCors(req: NextRequest) {

	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	};

	// If preflight request
	if (req.method === "OPTIONS") {
		return new Response(null, { status: 204, headers });
	}

	return headers;
}
