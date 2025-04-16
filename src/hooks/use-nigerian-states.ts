import { useQuery } from "@tanstack/react-query";

const fetchNigerianStates = async () => {
	const response = await fetch(
		"http://api.geonames.org/searchJSON?country=NG&featureClass=P&maxRows=1000&username=simple001"
	);

	if (!response.ok) {
		throw new Error("Failed to fetch states");
	}

	const data = await response.json();
	const stateMap = new Map<string, string>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data.geonames.forEach((city: any) => {
		if (city.adminName1 && !stateMap.has(city.adminName1)) {
			stateMap.set(city.adminName1, city.adminName1);
		}
	});

	return Array.from(stateMap.entries()).map(([stateName]) => ({
		value: stateName.toLowerCase().replace(/\s+/g, "-"),
		label: stateName,
	}));
};

const useNigerianStates = () => {
	return useQuery({
		queryKey: ["nigerian-states"],
		queryFn: fetchNigerianStates,
		staleTime: 1000 * 60 * 60 * 5,
		placeholderData: [],
	});
};

export default useNigerianStates;
