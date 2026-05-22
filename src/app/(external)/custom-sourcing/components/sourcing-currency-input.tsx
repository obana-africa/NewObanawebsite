"use client";

import React, { useState } from "react";

const CURRENCIES = [
	{ code: "NGN", symbol: "₦", locale: "en-NG" },
	{ code: "USD", symbol: "$", locale: "en-US" },
	{ code: "EUR", symbol: "€", locale: "de-DE" },
	{ code: "GBP", symbol: "£", locale: "en-GB" },
];

interface Props {
	value: { amount: number; currency: string; symbol: string };
	onChange: (v: { amount: number; currency: string; symbol: string }) => void;
	placeholder?: string;
	hasError?: boolean;
}

const SourcingCurrencyInput: React.FC<Props> = ({
	value,
	onChange,
	placeholder = "0.00",
	hasError,
}) => {
	const [focused, setFocused] = useState(false);
	const config =
		CURRENCIES.find((c) => c.code === value.currency) || CURRENCIES[0];

	const formatNumber = (n: number) =>
		n > 0 ? n.toLocaleString(config.locale) : "";

	const [display, setDisplay] = useState(formatNumber(value.amount));

	React.useEffect(() => {
		setDisplay(formatNumber(value.amount));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value.amount, value.currency]);

	const hasValue = display && display.length > 0;
	const bg = hasValue || focused ? "#FFFFFF" : "#FFF8E7";
	const border = hasError ? "#EF4444" : "#FFDE76";

	return (
		<div
			className="flex rounded-lg overflow-hidden"
			style={{ border: `1px solid ${border}`, background: bg }}
		>
			<select
				value={value.currency}
				onChange={(e) => {
					const c = CURRENCIES.find((x) => x.code === e.target.value)!;
					onChange({
						amount: value.amount,
						currency: c.code,
						symbol: c.symbol,
					});
				}}
				className="px-2 text-[12px] font-semibold text-[#1B3B5F] border-r border-[#FFDE76] bg-transparent outline-none"
			>
				{CURRENCIES.map((c) => (
					<option key={c.code} value={c.code}>
						{c.code}
					</option>
				))}
			</select>
			<input
				type="text"
				inputMode="numeric"
				value={display}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onChange={(e) => {
					const raw = e.target.value.replace(/[^\d.]/g, "");
					const num = parseFloat(raw) || 0;
					setDisplay(raw);
					onChange({
						amount: num,
						currency: value.currency,
						symbol: config.symbol,
					});
				}}
				placeholder={placeholder}
				className="flex-1 px-3 py-2 text-[13px] text-[#1B3B5F] bg-transparent outline-none min-w-0"
			/>
		</div>
	);
};

export default SourcingCurrencyInput;
