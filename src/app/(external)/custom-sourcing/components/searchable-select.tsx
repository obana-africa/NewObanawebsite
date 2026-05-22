"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface Option {
	value: string;
	label: string;
}

interface Props {
	value: string;
	options: Option[];
	placeholder: string;
	onChange: (value: string, label?: string) => void;
	disabled?: boolean;
	isLoading?: boolean;
	hasError?: boolean;
}

const SearchableSelect: React.FC<Props> = ({
	value,
	options,
	placeholder,
	onChange,
	disabled,
	isLoading,
	hasError,
}) => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
				setQuery("");
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const selected = options.find((o) => o.value === value);
	const filtered = options.filter((o) =>
		o.label.toLowerCase().includes(query.toLowerCase())
	);

	const hasValue = !!selected;
	const bg = hasValue ? "#FFFFFF" : "#FFF8E7";
	const border = hasError ? "#EF4444" : "#FFDE76";

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				disabled={disabled}
				onClick={() => setOpen((o) => !o)}
				className="w-full px-3 py-2 rounded-lg text-[13px] flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed text-left  hover:cursor-pointer"
				style={{
					border: `1px solid ${border}`,
					background: disabled ? "#F3F4F6" : bg,
				}}
			>
				<span className={selected ? "text-[#1B3B5F]" : "text-gray-500"}>
					{isLoading ? "Loading..." : selected ? selected.label : placeholder}
				</span>
				<ChevronDown className="h-3.5 w-3.5 text-gray-500 flex-shrink-0 ml-1" />
			</button>

			{open && !disabled && (
				<div className="absolute z-50 mt-1 w-full bg-white border border-secondary rounded-lg shadow-lg overflow-hidden">
					<div className="p-2 border-b border-gray-100 flex items-center gap-1.5">
						<Search className="h-3 w-3 text-gray-400" />
						<input
							autoFocus
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search..."
							className="flex-1 outline-none text-xs text-[#1B3B5F]"
						/>
						{query && (
							<button onClick={() => setQuery("")} type="button">
								<X className="h-3 w-3 text-gray-400" />
							</button>
						)}
					</div>
					<div className="max-h-48 overflow-y-auto">
						{filtered.length === 0 ? (
							<p className="p-3 text-xs text-gray-500 text-center">
								No results
							</p>
						) : (
							filtered.map((opt) => (
								<button
									key={opt.value}
									type="button"
									onClick={() => {
										onChange(opt.value, opt.label);
										setOpen(false);
										setQuery("");
									}}
									className={`w-full text-left px-3 py-2 text-sm hover:bg-[#FFDE76]/20  hover:cursor-pointer ${
										opt.value === value ? "bg-[#FFDE76]/20 font-semibold" : ""
									} text-[#1B3B5F]`}
								>
									{opt.label}
								</button>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchableSelect;
