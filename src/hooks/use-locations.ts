import { unAuthenticatedApi } from "@/app/api/(instances)/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetCountries = () => {
	const fetchCountries = async () => {
		try {
			const response = await unAuthenticatedApi.get(
				`/requests/terminalAfrica/get-countries`
			);
			return (
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				response?.data?.data?.data?.map((country: any) => ({
					label: country.name,
					value: country.isoCode,
				})) || []
			);
		} catch (error) {
			console.log("Error from countries", error);
			return [];
		}
	};

	return useQuery({
		queryKey: ["countries"],
		queryFn: fetchCountries,
		staleTime: Infinity,
	});
};

export const useGetStatesByCountryId = (countryId: string) => {
	const fetchStates = async () => {
		try {
			const params = {
				country_code: countryId,
			};
			const query = new URLSearchParams(params);
			const response = await unAuthenticatedApi.get(
				`/requests/terminalAfrica/get-states?${query}`
			);
			return (
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				response?.data?.data?.data?.map((state: any) => ({
					label: state.name,
					value: state.isoCode,
				})) || []
			);
		} catch (error) {
			console.log("Error from states", error);
			return [];
		}
	};

	return useQuery({
		queryKey: ["states", countryId],
		queryFn: fetchStates,
		staleTime: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
		enabled: Boolean(countryId),
	});
};

export const useGetCitiesByStateId = (
	stateCode: string,
	countryCode: string
) => {
	const fetchCities = async () => {
		try {
			const params = {
				country_code: countryCode,
				state_code: stateCode,
			};
			const query = new URLSearchParams(params);
			const response = await unAuthenticatedApi.get(
				`/requests/terminalAfrica/get-cities?${query}`
			);
			return (
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				response?.data?.data?.data?.map((city: any) => ({
					label: city.name,
					value: city.name,
				})) || []
			);
		} catch (error) {
			console.log("Error from cities", error);
			return [];
		}
	};

	return useQuery({
		queryKey: ["cities", stateCode, countryCode],
		queryFn: fetchCities,
		staleTime: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
		enabled: Boolean(countryCode && stateCode),
	});
};
