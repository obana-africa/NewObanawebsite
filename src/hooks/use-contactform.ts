import { useState } from "react";
import { toast } from "sonner";

export const useContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const submitForm = async (data: any) => {
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact-form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Failed to submit form");
			}

			toast.success("Your message has been sent successfully!");
			return true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(
				error.message ||
					"There was an error submitting the form. Please try again."
			);
			console.error("Form submission error:", error);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return { submitForm, isSubmitting };
};
