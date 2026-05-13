import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const country = searchParams.get("country");
		const featureClass = searchParams.get("featureClass");
		const maxRows = searchParams.get("maxRows");
		const username = searchParams.get("username");

		const response = await fetch(
			`https://secure.geonames.org/searchJSON?country=${country}&featureClass=${featureClass}&maxRows=${maxRows}&username=${username}`
		);

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Geonames API error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from Geonames" },
			{ status: 500 }
		);
	}
}


// https://secure.geonames.org/searchJSON?country=NG&featureClass=P&maxRows=1000&username=simple001

