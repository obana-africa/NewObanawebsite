import { NextResponse } from "next/server";

export const allowedOrigins = [
	"http://localhost:3000",
	"https://staging.shop.obana.africa",
	"https://shop.obana.africa",
	"https://obana.africa",
];

export function corsHeaders(origin: string | null) {
	const isAllowed = origin && allowedOrigins.includes(origin);

	return {
		"Access-Control-Allow-Origin": isAllowed ? origin : "",
		"Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Credentials": "true",
	};
}

export function corsResponse(data: any, origin: string | null, status = 200) {
	return NextResponse.json(data, {
		status,
		headers: corsHeaders(origin),
	});
}
