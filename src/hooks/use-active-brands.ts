import { useState, useEffect } from "react";

interface BrandOption {
	value: string;
	label: string;
}

const useBrandOptions = () => {
	const [brands, setBrands] = useState<BrandOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await fetch(
					"https://tajiri-backend-qamx.onrender.com/requests/zoho/get-formated-brand?status=active",
					{
						mode: "cors", 
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch brands");
				}

				const data = await response.json();

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const brandOptions = data.data.brands.map((brand: any) => ({
					value: brand.name,
					label: brand.name,
				}));
				// console.log('Brands',brandOptions)

				setBrands(brandOptions);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching brands:", err);
				setError("Failed to load brands");
				setLoading(false);
			}
		};

		fetchBrands();
	}, []);

	return { brands, loading, error };
};

export default useBrandOptions;
