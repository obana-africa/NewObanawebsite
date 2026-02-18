/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";

export const useLogistics = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submitLogisticsForm = async (data: any, formType: string) => {
		setIsSubmitting(true);
		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(
				"Please wait, Submitting your Logistics Request..."
			);

			try {
				const crmPayload = {
					...data,
					formType,
				};

				const crmResponse = await fetch("/api/crm/logistics", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(crmPayload),
				});

				if (crmResponse.ok) {
					const result = await crmResponse.json();
					console.log("✅ CRM submission successful:", result);
				} else {
					const errorData = await crmResponse.json();
					console.warn("⚠️ CRM submission failed:", errorData);
					// Continue with email submission even if CRM fails
				}
			} catch (crmError: any) {
				console.error("⚠️ Failed to send to CRM:", crmError.message);
				// Continue with email submission even if CRM fails
			}

			// Then, send the logistics form (emails)
			const response = await fetch("/api/logistics-form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...data, formType }),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Failed to submit logistics form");
			}

			toast.success("Your logistics request has been submitted successfully!", {
				id: toastId,
			});
			return true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(
				error.message ||
					"There was an error submitting your request. Please try again.",
				{ id: toastId }
			);
			console.error("Logistics submission error:", error);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return { submitLogisticsForm, isSubmitting };
};
