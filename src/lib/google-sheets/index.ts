import { google } from "googleapis";
import { JWT } from "google-auth-library";

export async function appendToSheet(values: any[]) {
	try {
		const auth = new JWT({
			email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
			key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		const sheets = google.sheets({ version: "v4", auth });

		const result = await sheets.spreadsheets.values.append({
			spreadsheetId: process.env.GOOGLE_SHEET_ID,
			range: "'Inventory Financing'!A1",
			valueInputOption: "USER_ENTERED",
			insertDataOption: "INSERT_ROWS",
			requestBody: {
				values: [values],
			},
		});

		return result.data;
	} catch (error) {
		console.error("Error in appendToSheet:", error);
		throw new Error(`Failed to append to sheet: ${error}`);
	}
}
