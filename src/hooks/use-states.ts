/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface State {
	name: string;
	isoCode: string;
	countryCode: string;
	latitude: string;
	longitude: string;
}

interface UseStatesReturn {
	states: State[];
	isLoading: boolean;
	error: string | null;
}

const useStates = (countryCode: string | null): UseStatesReturn => {
	const [states, setStates] = useState<State[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStates = async () => {
			if (!countryCode) {
				setStates([]);
				return;
			}

			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					`https://sandbox.terminal.africa/v1/states?country_code=${countryCode}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.NEXT_PUBLIC_TERMINAL_AFRICA_SECRET_KEY}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch states");
				}

				const result = await response.json();

				if (result.status && result.data) {
					setStates(result.data);
				} else {
					throw new Error("Invalid response format");
				}
			} catch (err: any) {
				setError(err.message || "Failed to load states");
				console.error("Error fetching states:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStates();
	}, [countryCode]);

	return { states, isLoading, error };
};

export default useStates;
