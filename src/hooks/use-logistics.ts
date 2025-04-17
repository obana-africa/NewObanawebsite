import { useState } from "react";
import { toast } from "sonner";

export const useLogistics = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const submitLogisticsForm = async (data: any, formType: string) => {
		setIsSubmitting(true);
		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(
				"Please wait, Submitting your Logistics Request..."
			);

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
