import React from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";

const PhoneInputLib = dynamic(
	() => import("react-phone-input-2").then((mod) => mod.default),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-12 border border-accent focus:border-primary focus:outline-1 rounded-md animate-pulse" />
		),
	}
);

interface PhoneInputProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any;
	name: string;
	label: string;
	error?: string;
	required?: boolean;
	placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
	control,
	name,
	label,
	error,
	required = false,
	placeholder,
}) => {
	return (
		<div>
			<label
				htmlFor={name}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label} {required && <span className="text-error">*</span>}
			</label>
			<Controller
				name={name}
				control={control}
				defaultValue=""
				render={({ field }) => (
					<PhoneInputLib
						country={"ng"}
						value={field.value || ""}
						onChange={(phone) => field.onChange(phone)}
						onBlur={field.onBlur}
						inputStyle={{
							width: "100%",
							height: "48px",
							fontSize: "16px",
							backgroundColor: "transparent",
							borderColor: error ? "#EF4444" : "#D1D5DB",
						}}
						containerStyle={{
							width: "100%",
						}}
						inputProps={{
							name: field.name,
							id: field.name,
							placeholder: placeholder || "Enter phone number",
						}}
					/>
				)}
			/>
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default PhoneInput;
