"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useNewsletter = () => {
	const mutation = useMutation({
		mutationFn: async (email: string) => {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to subscribe");
			}

			return response.json();
		},
		onMutate: () => {
			toast.loading("Subscribing...", {
				id: "newsletter-subscription",
			});
		},
		onSuccess: (data) => {
			toast.dismiss("newsletter-subscription");
			toast.success(data.message && "Thank you for subscribing!");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.dismiss("newsletter-subscription");
			toast.error(
				error.message && "Failed to subscribe. Please use a correct email."
			);
		},
	});

	return {
		subscribe: mutation.mutate,
		isLoading: mutation.isPending,
		error: mutation.error,
	};
};

export default useNewsletter;
