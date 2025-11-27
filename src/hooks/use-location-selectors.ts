import { useState, useEffect } from "react";
import useCountries from "@/hooks/use-countries";
import useStates from "@/hooks/use-states";
import useCities from "@/hooks/use-cities";

export const useLocationSelectors = (
	watchSenderCountry: string,
	watchSenderState: string,
	watchReceiverCountry: string,
	watchReceiverState: string
) => {
	const [senderCountry, setSenderCountry] = useState<string>("NG");
	const [senderState, setSenderState] = useState<string>("");
	const [senderStateName, setSenderStateName] = useState<string>("");

	const [receiverCountry, setReceiverCountry] = useState<string>("NG");
	const [receiverState, setReceiverState] = useState<string>("");
	const [receiverStateName, setReceiverStateName] = useState<string>("");

	const { countries: allCountries, isLoading: countriesLoading } =
		useCountries();
	const { states: senderStates, isLoading: senderStatesLoading } =
		useStates(senderCountry);
	const { cities: senderCities, isLoading: senderCitiesLoading } = useCities(
		senderCountry,
		senderState
	);
	const { states: receiverStates, isLoading: receiverStatesLoading } =
		useStates(receiverCountry);
	const { cities: receiverCities, isLoading: receiverCitiesLoading } =
		useCities(receiverCountry, receiverState);

	useEffect(() => {
		if (watchSenderCountry) setSenderCountry(watchSenderCountry);
	}, [watchSenderCountry]);

	useEffect(() => {
		if (watchSenderState) {
			setSenderState(watchSenderState);
			const selectedState = senderStates.find(
				(state) => state.isoCode === watchSenderState
			);
			if (selectedState) {
				setSenderStateName(selectedState.name);
			}
		}
	}, [watchSenderState, senderStates]);

	useEffect(() => {
		if (watchReceiverCountry) setReceiverCountry(watchReceiverCountry);
	}, [watchReceiverCountry]);

	useEffect(() => {
		if (watchReceiverState) {
			setReceiverState(watchReceiverState);
			const selectedState = receiverStates.find(
				(state) => state.isoCode === watchReceiverState
			);
			if (selectedState) {
				setReceiverStateName(selectedState.name);
			}
		}
	}, [watchReceiverState, receiverStates]);

	const countryOptions = allCountries.map((country) => ({
		value: country.isoCode,
		label: `${country.flag} ${country.name}`,
	}));

	const senderStateOptions = senderStates.map((state) => ({
		value: state.isoCode,
		label: state.name,
	}));

	const senderCityOptions = senderCities.map((city) => ({
		value: city.name,
		label: city.name,
	}));

	const receiverStateOptions = receiverStates.map((state) => ({
		value: state.isoCode,
		label: state.name,
	}));

	const receiverCityOptions = receiverCities.map((city) => ({
		value: city.name,
		label: city.name,
	}));

	return {
		senderStateName,
		setSenderStateName,
		receiverStateName,
		setReceiverStateName,
		allCountries,
		countriesLoading,
		senderStates,
		senderStatesLoading,
		senderCities,
		senderCitiesLoading,
		receiverStates,
		receiverStatesLoading,
		receiverCities,
		receiverCitiesLoading,
		countryOptions,
		senderStateOptions,
		senderCityOptions,
		receiverStateOptions,
		receiverCityOptions,
	};
};
