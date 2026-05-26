/* eslint-disable @typescript-eslint/no-explicit-any */ 
"use client";

import React, { useMemo } from "react";
import useCountries from "@/hooks/use-countries";
import useStates from "@/hooks/use-states";
import useCities from "@/hooks/use-cities";
import SearchableSelect from "./searchable-select";

interface Value {
	country: string; 
	countryName: string;
	state: string; 
	stateName: string;
	city: string;
}

interface Props {
	value: Value;
	onChange: (v: Value) => void;
	errors?: Partial<Record<keyof Value, string>>;
}

const LocationSelectors: React.FC<Props> = ({ value, onChange, errors }) => {
	const { countries, isLoading: countriesLoading } = useCountries();
	const { states, isLoading: statesLoading } = useStates(value.country || "NG");
	const { cities, isLoading: citiesLoading } = useCities(
		value.country || "NG",
		value.state
	);

	const countryOpts = useMemo(
		() =>
			countries.map((c: any) => ({
				value: c.isoCode,
				label: `${c.flag} ${c.name}`,
			})),
		[countries]
	);
	const stateOpts = useMemo(
		() => states.map((s: any) => ({ value: s.isoCode, label: s.name })),
		[states]
	);
	const cityOpts = useMemo(
		() => cities.map((c: any) => ({ value: c.name, label: c.name })),
		[cities]
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
			<SearchableSelect
				placeholder="Country"
				value={value.country}
				options={countryOpts}
				isLoading={countriesLoading}
				hasError={!!errors?.country}
				onChange={(v, label) => {
					const country = countries.find((c: any) => c.isoCode === v);
					onChange({
						country: v,
						countryName: country?.name || label || "",
						state: "",
						stateName: "",
						city: "",
					});
				}}
			/>
			<SearchableSelect
				placeholder="State"
				value={value.state}
				options={stateOpts}
				isLoading={statesLoading}
				disabled={!value.country}
				hasError={!!errors?.state}
				onChange={(v, label) => {
					const st = states.find((s: any) => s.isoCode === v);
					onChange({
						...value,
						state: v,
						stateName: st?.name || label || "",
						city: "",
					});
				}}
			/>
			<SearchableSelect
				placeholder="City"
				value={value.city}
				options={cityOpts}
				isLoading={citiesLoading}
				disabled={!value.state}
				hasError={!!errors?.city}
				onChange={(v) => onChange({ ...value, city: v })}
			/>
		</div>
	);
};

export default LocationSelectors;
