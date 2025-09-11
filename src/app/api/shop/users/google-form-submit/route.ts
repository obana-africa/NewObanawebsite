export async function POST(request: Request) {
	try {
		const formData = await request.json();

		console.log(
			"Submitting to Google Form with data:",
			JSON.stringify(formData, null, 2)
		);

		const googleFormUrl =
			"https://docs.google.com/forms/d/e/1FAIpQLSdrwtK3U1sGQYlRkfTek2vQgNIx6DuCfRRm-Ca75oPPqTY9cg/formResponse";

		const submitData = new FormData();
		submitData.append("entry.2005620554", formData.firstName || "");
		submitData.append("entry.179606042", formData.lastName || "");
		submitData.append("entry.1045781291", formData.email || "");
		submitData.append("entry.1166974658", formData.phone || "");
		submitData.append("entry.1065046570", formData.address || "");
		submitData.append("entry.839337160", formData.bvn || "");
		submitData.append("entry.1493895358", formData.tin || "");
		submitData.append("entry.911074560", formData.gender || "");
		submitData.append("entry.1451780676", formData.accountNumber || "");
		submitData.append("entry.1534013404", formData.bankName || "");
		submitData.append("entry.637038261", formData.businessName || "");

		const response = await fetch(googleFormUrl, {
			method: "POST",
			body: submitData,
			headers: {
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			},
		});

		console.log("Google Form response status:", response.status);
		console.log(
			"Google Form response headers:",
			JSON.stringify([...response.headers], null, 2)
		);

		let responseBody = "";
		try {
			responseBody = await response.text();
			console.log(
				"Google Form response body (first 500 chars):",
				responseBody.slice(0, 500)
			);
		} catch (err) {
			console.error("Failed to read response body:", err);
		}

		if (response.status >= 200 && response.status < 400) {
			console.log("Google Form submitted successfully");
			return Response.json({
				success: true,
				message: "Form submitted successfully",
			});
		} else {
			console.error("Google Form submission failed:", {
				status: response.status,
				statusText: response.statusText,
				body: responseBody.slice(0, 500),
			});
			return Response.json(
				{
					success: false,
					message: `Failed to submit to Google Form: ${response.status} ${response.statusText}`,
					details: responseBody
						? responseBody.slice(0, 500)
						: "No response body",
				},
				{ status: response.status || 400 }
			);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Google Form API Error:", error);
		return Response.json(
			{
				success: false,
				message: "Internal server error while submitting to Google Form",
				error:
					process.env.NODE_ENV === "development"
						? error.message
						: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}
