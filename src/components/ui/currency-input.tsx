import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import { useState } from "react";

const CurrencyInput = dynamic(
	() => import("react-currency-input-field").then((mod) => mod.default),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-12 border rounded-md animate-pulse" />
		),
	}
);

type CurrencyOption = {
	code: string;
	locale: string;
	symbol: string;
};

const currencyOptions: CurrencyOption[] = [
	{ code: "NGN", locale: "en-NG", symbol: "₦" },
	{ code: "USD", locale: "en-US", symbol: "$" },
	{ code: "EUR", locale: "de-DE", symbol: "€" },
	{ code: "GBP", locale: "en-GB", symbol: "£" },
	{ code: "JPY", locale: "ja-JP", symbol: "¥" },
	{ code: "CAD", locale: "en-CA", symbol: "$" },
	{ code: "AUD", locale: "en-AU", symbol: "$" },
	{ code: "INR", locale: "en-IN", symbol: "₹" },
];

interface CurrencyValue {
	amount?: number;
	currency?: string;
	symbol?: string;
}

interface CurrencyInputFieldProps {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any;
	defaultValue?: CurrencyValue;
	required?: boolean;
	className?: string;
	label?: string;
	error?: string;
	placeholder?: string;
}

export const CurrencyInputField = ({
	name,
	control,
	label,
	placeholder = "",
	defaultValue = { currency: "", symbol: "" },
	required = false,
	className = "",
	error,
}: CurrencyInputFieldProps) => {
	const [selectedCurrency, setSelectedCurrency] = useState<string>(
		defaultValue?.currency || "NGN"
	);

	const selectedCurrencyConfig =
		currencyOptions.find((opt) => opt.code === selectedCurrency) ||
		currencyOptions[0];

	return (
		<div className={className}>
			<label
				htmlFor={name}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label} {required && <span className="text-error">*</span>}
			</label>
			<div className="flex rounded-md shadow-sm">
				<Controller
					name={name}
					control={control}
					defaultValue={defaultValue}
					rules={{ required }}
					render={({ field }) => (
						<>
							<select
								value={selectedCurrency}
								onChange={(e) => {
									const newCurrency = e.target.value;
									setSelectedCurrency(newCurrency);

									const newCurrencyConfig =
										currencyOptions.find((opt) => opt.code === newCurrency) ||
										currencyOptions[0];

									// Update form value when currency changes
									field.onChange({
										amount: field.value?.amount || 0,
										currency: newCurrency,
										symbol: newCurrencyConfig.symbol,
									});
								}}
								className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-secondary-light bg-gray-50 text-gray-500 focus:ring-primary focus:border-primary"
							>
								{currencyOptions.map((currency) => (
									<option key={currency.code} value={currency.code}>
										{currency.code}
									</option>
								))}
							</select>

							<CurrencyInput
								id={name}
								name={name}
								placeholder={placeholder}
								intlConfig={{
									locale: selectedCurrencyConfig.locale,
									currency: selectedCurrencyConfig.code,
								}}
								decimalsLimit={2}
								onValueChange={(value, name, values) => {
									field.onChange({
										amount: parseFloat(values?.value || "0"),
										currency: selectedCurrency,
										symbol: selectedCurrencyConfig.symbol,
									});
								}}
								value={field.value?.amount}
								className={`flex-1 min-w-0 block w-full p-3 rounded-r-md border border-secondary-light focus:border-primary focus:outline-1 ${
									error ? "border-error" : ""
								}`}
								aria-invalid={!!error}
							/>
						</>
					)}
				/>
			</div>
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};
