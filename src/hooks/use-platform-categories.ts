import { useQuery } from "@tanstack/react-query";

interface CategoryOption {
	value: string;
	label: string;
}

interface PlatformCategory {
	name?: string;
}

const fetchPlatformCategories = async (): Promise<CategoryOption[]> => {
	const response = await fetch("/api/shop/categories", {
		headers: { Accept: "application/json" },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}

	const data = await response.json();
	const categories: PlatformCategory[] =
		data?.categories ?? data?.data?.categories ?? [];

	const names = new Set<string>();
	categories.forEach((category) => {
		const name = category?.name?.trim();
		if (name) names.add(name);
	});

	return Array.from(names)
		.sort((a, b) => a.localeCompare(b))
		.map((name) => ({ value: name, label: name }));
};

const usePlatformCategories = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["platform-categories"],
		queryFn: fetchPlatformCategories,
		staleTime: 1000 * 60 * 30,
	});

	return {
		categories: data ?? [],
		loading: isLoading,
		error: isError ? "Failed to load categories" : null,
	};
};

export default usePlatformCategories;
