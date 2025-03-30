import React from "react";

interface Option {
	value: string;
	label: string;
}

interface FormSelectProps {
	id: string;
	label: string;
	options: Option[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
	error?: string;
	required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
	id,
	label,
	options,
	register,
	error,
	required = false,
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<select
				id={id}
				{...register}
				className={`w-full p-3 border rounded-md ${
					error
						? "border-error"
						: "border-accent focus:border-primary focus:outline-1"
				}`}
			>
				<option value="">Select</option>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="p-6"
					>
						{option.label}
					</option>
				))}
			</select>
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormSelect;
