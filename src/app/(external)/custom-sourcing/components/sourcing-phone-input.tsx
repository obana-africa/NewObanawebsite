"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const PhoneInputLib = dynamic(
	() => import("react-phone-input-2").then((m) => m.default),
	{
		ssr: false,
		loading: () => (
			<div className="h-9 rounded-lg animate-pulse bg-[#FFF8E7]" />
		),
	}
);

interface Props {
	value: string;
	onChange: (v: string) => void;
	hasError?: boolean;
	placeholder?: string;
}

const SourcingPhoneInput: React.FC<Props> = ({
	value,
	onChange,
	hasError,
	placeholder,
}) => {
	const [focused, setFocused] = useState(false);
	const hasValue = value && value.length > 0;
	const bg = hasValue || focused ? "#FFFFFF" : "#FFF8E7";
	const border = hasError ? "#EF4444" : "#FFDE76";

	return (
		<PhoneInputLib
			country={"ng"}
			value={value}
			onChange={(v) => onChange(v)}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			inputStyle={{
				width: "100%",
				height: "38px",
				fontSize: "13px",
				backgroundColor: bg,
				border: `1px solid ${border}`,
				borderRadius: "8px",
				color: "#1B3B5F",
			}}
			buttonStyle={{
				border: `1px solid ${border}`,
				borderRight: "none",
				background: bg,
				borderTopLeftRadius: "8px",
				borderBottomLeftRadius: "8px",
			}}
			containerStyle={{ width: "100%" }}
			inputProps={{ placeholder: placeholder || "+234 *** *** ****" }}
		/>
	);
};

export default SourcingPhoneInput;
