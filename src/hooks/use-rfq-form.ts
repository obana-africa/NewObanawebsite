/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";

export const useRfqForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submitRfqForm = async (data: any, formType: string) => {
		setIsSubmitting(true);
		let toastId: string | number | undefined;

		try {
			toastId = toast.loading("Please wait, Submitting your Quote...");

			// Send to CRM for all sourcing form typesf
			const sourcingFormTypes = [
				"production",
				"fabricSourcing",
				"brandLabel",
				"rawMaterial",
			];

			if (sourcingFormTypes.includes(formType)) {
				try {
					// Pass the COMPLETE data object with formType to CRM endpoint
					const crmPayload = {
						...data,
						formType,
					};

					const crmResponse = await fetch("/api/crm/custom-sourcing", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(crmPayload),
					});

					if (crmResponse.ok) {
						// const result = await crmResponse.json();
					} else {
						const errorData = await crmResponse.json();
						console.warn("⚠️ CRM submission failed:", errorData);
					}
				} catch (crmError: any) {
					console.error("⚠️ Failed to send to CRM:", crmError.message);
					// Continue with email submission even if CRM fails
				}
			}

			// Then, send the RFQ form (emails)
			const response = await fetch("/api/rfq-form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...data, formType }),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Failed to submit RFQ form");
			}

			toast.success("Your RFQ has been submitted successfully!", {
				id: toastId,
			});
			return true;
		} catch (error: any) {
			toast.error(
				error.message ||
					"There was an error submitting your RFQ. Please try again.",
				{ id: toastId }
			);
			console.error("RFQ submission error:", error);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return { submitRfqForm, isSubmitting };
};
