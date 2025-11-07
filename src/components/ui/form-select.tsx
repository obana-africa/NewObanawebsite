import React, { useState, useRef, useEffect } from "react";
import { Search, XCircle, ChevronUp, ChevronDown } from "lucide-react";
import { Tooltip } from "./form-tooltip";

interface Option {
	value: string;
	label: string;
}

interface FormSelectProps {
	id?: string;
	label?: string;
	options: Option[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
	error?: string;
	required?: boolean;
	multiple?: boolean;
	disabled?: boolean;
	searchable?: boolean;
	tooltip?: string;
	onChange?: (value: string | string[] | React.ChangeEvent<HTMLSelectElement>) => void;
	onRemove?: (value: string) => void;
	clearErrors?: (name?: string) => void;
	placeholder?: string;
	isLoading?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
	id,
	label,
	options,
	register,
	error,
	required = false,
	multiple = false,
	disabled = false,
	searchable = false,
	tooltip,
	onChange,
	onRemove,
	clearErrors,
	placeholder = "Select an option",
	isLoading = false,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
		"bottom"
	);
	// Initialize selectedValue as empty string for single-select, empty array for multi-select
	const [selectedValue, setSelectedValue] = useState<string | string[]>(
		multiple ? [] : register.value || ""
	);
	const selectRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (register.value !== undefined) {
			setSelectedValue(multiple ? register.value || [] : register.value || "");
		}
	}, [register.value, multiple]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const calculateDropdownPosition = () => {
		if (selectRef.current) {
			const rect = selectRef.current.getBoundingClientRect();
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;
			const dropdownHeight = 200;

			if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
				setDropdownPosition("top");
			} else {
				setDropdownPosition("bottom");
			}
		}
	};

	const handleSelectClick = () => {
		if (!disabled && !isLoading) {
			calculateDropdownPosition();
			setIsOpen(!isOpen);
			if (isOpen && searchable && inputRef.current) {
				inputRef.current.focus();
			}
		}
	};

	const handleOptionSelect = (option: Option) => {
		let newValue: string | string[];

		if (multiple) {
			newValue = Array.isArray(selectedValue)
				? selectedValue.includes(option.value)
					? selectedValue.filter((v) => v !== option.value)
					: [...selectedValue, option.value]
				: [option.value];
		} else {
			newValue = option.value;
			setIsOpen(false);
			setSearchTerm("");
		}

		setSelectedValue(newValue);
		
		// Call register's onChange
		register.onChange({
			target: {
				value: newValue,
				name: register.name,
			},
		});
		
		// Call custom onChange if provided
		if (onChange) {
			// Create a synthetic event for consistency
			const syntheticEvent = {
				target: {
					value: newValue,
					name: register.name,
					type: 'select',
				},
			} as unknown as React.ChangeEvent<HTMLSelectElement>;
			onChange(syntheticEvent);
		}
		
		if (clearErrors) clearErrors(register.name);
	};

	const getDisplayValue = () => {
		if (isLoading) {
			return "Loading...";
		}
		
		if (multiple && Array.isArray(selectedValue) && selectedValue.length > 0) {
			return selectedValue.length === 1
				? options.find((opt) => opt.value === selectedValue[0])?.label ||
						`${selectedValue.length} selected`
				: `${selectedValue.length} selected`;
		}
		if (!multiple && typeof selectedValue === "string" && selectedValue) {
			return (
				options.find((opt) => opt.value === selectedValue)?.label || placeholder
			);
		}
		return placeholder;
	};

	// Handle direct select element change (for form compliance)
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = multiple 
			? Array.from(e.target.selectedOptions, option => option.value)
			: e.target.value;
		
		setSelectedValue(value);
		register.onChange(e);
		
		if (onChange) {
			onChange(e);
		}
	};

	return (
		<div className="relative" ref={selectRef}>
			<div className="flex items-center gap-1 mb-2">
				{label && (
					<label htmlFor={id} className="text-sm font-semibold">
						{label} {required && <span className="text-error">*</span>}
					</label>
				)}
				{tooltip && <Tooltip content={tooltip} />}
			</div>

			<div
				className={`w-full p-3 border rounded-md cursor-pointer flex items-center justify-between ${
					error
						? "border-error"
						: disabled || isLoading
						? "bg-secondary-light cursor-not-allowed text-secondary-dark"
						: "border-secondary-light focus:border-primary focus:outline-1"
				}`}
				onClick={handleSelectClick}
			>
				<span className={isLoading ? "text-gray-500" : ""}>
					{getDisplayValue()}
				</span>
				{!(disabled || isLoading) && (
					<span className="text-gray-400">
						{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</span>
				)}
				{isLoading && (
					<span className="text-gray-400 animate-pulse">Loading...</span>
				)}
			</div>

			{isOpen && !disabled && !isLoading && (
				<div
					className={`absolute z-10 w-full ${
						dropdownPosition === "bottom" ? "mt-1" : "bottom-full mb-1"
					} bg-white border border-secondary-light rounded-md shadow-lg`}
				>
					{searchable && (
						<div className="p-2 border-b">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									ref={inputRef}
									type="text"
									placeholder="Search..."
									className="w-full pl-10 pr-4 py-2 border border-secondary-light rounded-md focus:outline-none"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</div>
					)}
					<div className="max-h-40 overflow-y-auto">
						{isLoading ? (
							<div className="px-4 py-2 text-secondary-dark text-center">
								Loading options...
							</div>
						) : filteredOptions.length > 0 ? (
							filteredOptions.map((option) => (
								<div
									key={option.value}
									className={`px-4 py-2 hover:bg-primary-light cursor-pointer text-sm flex items-center ${
										multiple
											? Array.isArray(selectedValue) &&
											  selectedValue.includes(option.value)
												? "bg-primary/50"
												: ""
											: selectedValue === option.value
											? "bg-primary/10"
											: ""
									}`}
									onClick={() => handleOptionSelect(option)}
								>
									{multiple && (
										<input
											type="checkbox"
											checked={
												Array.isArray(selectedValue) &&
												selectedValue.includes(option.value)
											}
											readOnly
											className="mr-2"
										/>
									)}
									{option.label}
								</div>
							))
						) : (
							<div className="px-4 py-2 text-secondary-dark text-center">
								No options found
							</div>
						)}
					</div>
				</div>
			)}

			{multiple && Array.isArray(selectedValue) && selectedValue.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{selectedValue.map((value) => (
						<div
							key={value}
							className="flex items-center bg-secondary-light px-2 py-1 rounded text-sm"
						>
							{options.find((opt) => opt.value === value)?.label || value}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									const newValue = selectedValue.filter((v) => v !== value);
									setSelectedValue(newValue);
									
									// Create synthetic event for form handling
									const syntheticEvent = {
										target: {
											value: newValue,
											name: register.name,
											type: 'select',
										},
									} as unknown as React.ChangeEvent<HTMLSelectElement>;
									
									register.onChange(syntheticEvent);
									
									if (onChange) {
										onChange(syntheticEvent);
									}
									onRemove?.(value);
									if (clearErrors) clearErrors(register.name);
								}}
								className="text-error/80 hover:text-error ml-1"
							>
								<XCircle size={16} />
							</button>
						</div>
					))}
				</div>
			)}

			{/* Hidden native select for form compliance */}
			<select
				id={id}
				{...register}
				className="hidden"
				multiple={multiple}
				value={multiple ? selectedValue : selectedValue || ""}
				onChange={handleSelectChange}
				disabled={disabled || isLoading}
			>
				<option value="">{isLoading ? "Loading..." : "Select"}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormSelect;