import { useState } from "react";
import { toast } from "sonner";

export const useRfqForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const submitRfqForm = async (data: any, formType: string) => {
		setIsSubmitting(true);
		let toastId: string | number | undefined;

		try {
			toastId = toast.loading("Please wait, Submitting your Quote...");

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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
