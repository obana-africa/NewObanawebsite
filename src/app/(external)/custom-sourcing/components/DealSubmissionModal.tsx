// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useMemo, useRef } from "react";
// import {
// 	X,
// 	Upload,
// 	ArrowRight,
// 	Trash2,
// 	ArrowLeft,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
// 	useSubmitCustomSourcing,
// } from "@/hooks/use-sourcing";
// import type { SourcingCategory, SelectedCategoryItem } from "@/types";
// import { uploadToCloudinary } from "@/utils/upload";
// import SourcingPhoneInput from "./sourcing-phone-input";
// import LocationSelectors from "./location-selectors";
// import CategoryChecklist from "./category-checklist";
// import Button from "@/components/ui/button";

// interface Props {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	initialCategory?: SourcingCategory | null;
// }

// const TIMELINES = [
// 	"ASAP (Within 1 week)",
// 	"2-4 weeks",
// 	"1-3 months",
// 	"3+ months",
// ];
// const FINANCING_OPTIONS = [
// 	"Working capital needs",
// 	"Order Now, Pay Small Small (ONPSS)",
// 	"No financing needed",
// ];

// const DealSubmissionModal: React.FC<Props> = ({
// 	isOpen,
// 	onClose,
// 	initialCategory,
// }) => {
// 	const fileInputRef = useRef<HTMLInputElement>(null);
// 	const { mutateAsync, isPending } = useSubmitCustomSourcing();

// 	const [step, setStep] = useState<"form" | "preview">("form");

// 	const [form, setForm] = useState({
// 		business_name: "",
// 		contact_name: "",
// 		phone: "",
// 		email: "",
// 		timeline: "",
// 		financing_interest: "",
// 		additional_details: "",
// 	});

// 	const [location, setLocation] = useState({
// 		country: "NG",
// 		countryName: "Nigeria",
// 		state: "",
// 		stateName: "",
// 		city: "",
// 	});

// 	const [currency, setCurrency] = useState({
// 		amount: 0,
// 		currency: "NGN",
// 		symbol: "₦",
// 	});

// 	const [selected, setSelected] = useState<SelectedCategoryItem[]>(
// 		initialCategory
// 			? [
// 					{
// 						id: initialCategory.id,
// 						name: initialCategory.name,
// 						slug: initialCategory.slug,
// 						section: initialCategory.section,
// 						min_budget: Number(initialCategory.min_budget) || 0,
// 						max_budget: Number(initialCategory.max_budget) || 0,
// 						budget_amount: 0,
// 						images: [],
// 					},
// 				]
// 			: []
// 	);

// 	const [showTimeline, setShowTimeline] = useState(false);
// 	const [showFinancing, setShowFinancing] = useState(false);
// 	const [attachments, setAttachments] = useState<
// 		{ name: string; url: string }[]
// 	>([]);

// 	React.useEffect(() => {
// 		if (initialCategory && !selected.find((c) => c.id === initialCategory.id)) {
// 			setSelected((prev) => [
// 				...prev,
// 				{
// 					id: initialCategory.id,
// 					name: initialCategory.name,
// 					slug: initialCategory.slug,
// 					section: initialCategory.section,
// 					min_budget: Number(initialCategory.min_budget) || 0,
// 					max_budget: Number(initialCategory.max_budget) || 0,
// 					budget_amount: 0,
// 					images: [],
// 				},
// 			]);
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [initialCategory]);

// 	const totalBudget = useMemo(
// 		() => selected.reduce((sum, c) => sum + (Number(c.budget_amount) || 0), 0),
// 		[selected]
// 	);

// 	const updateField = (k: keyof typeof form, v: string) =>
// 		setForm((p) => ({ ...p, [k]: v }));

// 	const updateCategoryBudget = (id: number, amount: number) =>
// 		setSelected((prev) =>
// 			prev.map((c) => (c.id === id ? { ...c, budget_amount: amount } : c))
// 		);

// 	const handleGeneralAttachmentUpload = async (
// 		e: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const files = e.target.files;
// 		if (!files) return;
// 		const valid = Array.from(files).filter((f) => {
// 			if (f.size > 2 * 1024 * 1024) {
// 				toast.error(`${f.name} exceeds 2MB`);
// 				return false;
// 			}
// 			if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type)) {
// 				toast.error(`${f.name} must be JPEG/JPG/PNG`);
// 				return false;
// 			}
// 			return true;
// 		});
// 		if (valid.length === 0) return;

// 		toast.loading("Uploading...", { id: "general-upload" });
// 		try {
// 			const urls = await Promise.all(valid.map((f) => uploadToCloudinary(f)));
// 			setAttachments((prev) => [
// 				...prev,
// 				...urls.map((url, i) => ({ name: valid[i].name, url })),
// 			]);
// 			toast.success("Uploaded", { id: "general-upload" });
// 		} catch {
// 			toast.error("Upload failed", { id: "general-upload" });
// 		}
// 		e.target.value = "";
// 	};

// 	const validate = (): string | null => {
// 		if (!form.business_name.trim()) return "Business name is required";
// 		if (!form.contact_name.trim()) return "Your name is required";
// 		if (!form.phone || form.phone.length < 8)
// 			return "Valid phone number required";
// 		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
// 			return "Valid email required";
// 		if (!location.country || !location.state || !location.city)
// 			return "Country, state and city are required";
// 		if (selected.length === 0) return "Select at least one category";

// 		for (const c of selected) {
// 			if (!c.budget_amount || c.budget_amount <= 0)
// 				return `Enter a budget for ${c.name}`;
// 			if (
// 				c.max_budget > 0 &&
// 				(c.budget_amount < c.min_budget || c.budget_amount > c.max_budget)
// 			)
// 				return `Budget for ${c.name} must be between ${c.min_budget.toLocaleString()} and ${c.max_budget.toLocaleString()}`;
// 		}
// 		return null;
// 	};

// 	const goToPreview = () => {
// 		const err = validate();
// 		if (err) {
// 			toast.error(err);
// 			return;
// 		}
// 		setStep("preview");
// 	};

// 	const handleSubmit = async () => {
// 		try {
// 			const business_location = [
// 				location.city,
// 				location.stateName,
// 				location.countryName,
// 			]
// 				.filter(Boolean)
// 				.join(", ");

// 			const res = await mutateAsync({
// 				business_name: form.business_name,
// 				contact_name: form.contact_name,
// 				phone: form.phone,
// 				email: form.email,
// 				business_country: location.countryName,
// 				business_state: location.stateName,
// 				business_city: location.city,
// 				business_location,
// 				categories: selected.map((c) => ({
// 					id: c.id,
// 					name: c.name,
// 					slug: c.slug,
// 					section: c.section,
// 					budget_amount: c.budget_amount,
// 					images: c.images,
// 				})),
// 				estimated_budget: `${currency.symbol}${totalBudget.toLocaleString()}`,
// 				budget_total: totalBudget,
// 				currency: currency.currency,
// 				currency_symbol: currency.symbol,
// 				timeline: form.timeline,
// 				financing_interest: form.financing_interest,
// 				additional_details: form.additional_details,
// 				attachments: attachments.map((a) => a.url),
// 			});

// 			toast.success(res.message || "Deal submitted successfully!");
// 			onClose();
// 			setStep("form");
// 			setForm({
// 				business_name: "",
// 				contact_name: "",
// 				phone: "",
// 				email: "",
// 				timeline: "",
// 				financing_interest: "",
// 				additional_details: "",
// 			});
// 			setLocation({
// 				country: "NG",
// 				countryName: "Nigeria",
// 				state: "",
// 				stateName: "",
// 				city: "",
// 			});
// 			setSelected([]);
// 			setAttachments([]);
// 			setCurrency({ amount: 0, currency: "NGN", symbol: "₦" });
// 		} catch (err: any) {
// 			toast.error(err?.response?.data?.message || "Submission failed.");
// 		}
// 	};

// 	if (!isOpen) return null;

// 	return (
// 		<div
// 			className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
// 			onClick={onClose}
// 		>
// 			<div
// 				className="bg-white w-full sm:w-[700px] sm:max-w-[700px] sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[94vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
// 				onClick={(e) => e.stopPropagation()}
// 			>
// 				<div className="flex items-center gap-3 px-5 py-4 border-b border-secondary flex-shrink-0">
// 					{step === "preview" && (
// 						<button
// 							onClick={() => setStep("form")}
// 							className="p-1.5 hover:bg-gray-100 rounded-lg flex-shrink-0 -ml-1"
// 						>
// 							<ArrowLeft className="h-4 w-4 text-gray-500" />
// 						</button>
// 					)}
// 					<div className="flex-1 min-w-0">
// 						<h2 className="text-base sm:text-lg font-bold text-[#1B3B5F]">
// 							{step === "form" ? "New Deal Submission" : "Review Your Deal"}
// 						</h2>
// 						<p className="text-[11px] text-gray-400 mt-0.5">
// 							{step === "form"
// 								? "All fields marked * are required."
// 								: "Check if all informations are correct"}
// 						</p>
// 					</div>
// 					<button
// 						onClick={onClose}
// 						className="p-1.5 hover:bg-gray-100 rounded-lg flex-shrink-0"
// 					>
// 						<X className="h-4 w-4 text-gray-500" />
// 					</button>
// 				</div>

// 				<div className="flex-1 overflow-y-auto px-5 py-4">
// 					{step === "form" ? (
// 						<FormStep
// 							form={form}
// 							updateField={updateField}
// 							location={location}
// 							setLocation={setLocation}
// 							selected={selected}
// 							setSelected={setSelected}
// 							updateCategoryBudget={updateCategoryBudget}
// 							currency={currency}
// 							setCurrency={setCurrency}
// 							totalBudget={totalBudget}
// 							showTimeline={showTimeline}
// 							setShowTimeline={setShowTimeline}
// 							showFinancing={showFinancing}
// 							setShowFinancing={setShowFinancing}
// 							attachments={attachments}
// 							setAttachments={setAttachments}
// 							fileInputRef={fileInputRef}
// 							handleGeneralAttachmentUpload={handleGeneralAttachmentUpload}
// 						/>
// 					) : (
// 						<PreviewStep
// 							form={form}
// 							location={location}
// 							selected={selected}
// 							currency={currency}
// 							totalBudget={totalBudget}
// 							attachments={attachments}
// 						/>
// 					)}
// 				</div>

// 				{/* Footer */}
// 				<div className="px-5 py-4 border-t border-gray-100 flex-shrink-0 space-y-2">
// 					{step === "form" ? (
// 						<Button
// 							onClick={goToPreview}
// 							variant="primary"
// 							animation="ripple"
// 							className="border border-primary flex items-center justify-center font-bold w-full hover:!bg-[#FFDE76]"
// 						>
// 							Submit Sourcing Request
// 						</Button>
// 					) : (
// 						<button
// 							onClick={handleSubmit}
// 							disabled={isPending}
// 							className="w-full py-3 bg-[#1B3B5F] text-white font-semibold rounded-xl hover:bg-[#1B3B5F]/90 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
// 						>
// 							{isPending ? "Submitting..." : "Confirm Request"}
// 							{!isPending && <ArrowRight className="h-4 w-4" />}
// 						</button>
// 					)}
// 					<p className="text-[10px] text-center text-gray-400">
// 						By submitting, you agree to be contacted by our sourcing team. No
// 						commitment required.
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const FormStep: React.FC<any> = ({
// 	form,
// 	updateField,
// 	location,
// 	setLocation,
// 	selected,
// 	setSelected,
// 	updateCategoryBudget,
// 	currency,
// 	setCurrency,
// 	totalBudget,
// 	showTimeline,
// 	setShowTimeline,
// 	showFinancing,
// 	setShowFinancing,
// 	attachments,
// 	setAttachments,
// 	fileInputRef,
// 	handleGeneralAttachmentUpload,
// }) => {
// 	return (
// 		<div className="space-y-4">
// 			<div className="grid grid-cols-2 gap-3">
// 				<Field label="Business Name" required>
// 					<SourcingInput
// 						value={form.business_name}
// 						onChange={(v: string) => updateField("business_name", v)}
// 						placeholder="e.g Toyin's Apparel"
// 					/>
// 				</Field>
// 				<Field label="Your Name" required>
// 					<SourcingInput
// 						value={form.contact_name}
// 						onChange={(v: string) => updateField("contact_name", v)}
// 						placeholder="First & Last name"
// 					/>
// 				</Field>
// 			</div>

// 			<div className="grid grid-cols-2 gap-3">
// 				<Field label="Phone Number" required>
// 					<SourcingPhoneInput
// 						value={form.phone}
// 						onChange={(v) => updateField("phone", v)}
// 					/>
// 				</Field>
// 				<Field label="Email Address" required>
// 					<SourcingInput
// 						type="email"
// 						value={form.email}
// 						onChange={(v: string) => updateField("email", v)}
// 						placeholder="[email protected]"
// 					/>
// 				</Field>
// 			</div>

// 			<Field label="Business Location" required>
// 				<LocationSelectors value={location} onChange={setLocation} />
// 			</Field>

// 			<div className="border-t border-secondary" />

// 			<Field label="Selected Categories" required>
// 				<CategoryChecklist selected={selected} onChange={setSelected} />
// 			</Field>

// 			{selected.length > 0 && (
// 				<Field label="Estimated Budget" required>
// 					<div className="space-y-2">
// 						<div className="flex items-center justify-between mb-1">
// 							<span className="text-[10px] text-primary">
// 								Set a budget per category
// 							</span>
// 							<div className="w-[120px]">
// 								<CurrencyOnlySelector value={currency} onChange={setCurrency} />
// 							</div>
// 						</div>
// 						<div
// 							className="rounded-xl overflow-hidden divide-y"
// 							style={{
// 								background: "#FFF8E7",
// 								border: "1px solid #E8EEF4",
// 								// divideColor: "#EDF2F7",
// 							}}
// 						>
// 							{selected.map((c: SelectedCategoryItem) => {
// 								const out =
// 									c.max_budget > 0 &&
// 									c.budget_amount > 0 &&
// 									(c.budget_amount < c.min_budget ||
// 										c.budget_amount > c.max_budget);
// 								return (
// 									<div
// 										key={c.id}
// 										className="flex items-center px-3 py-2 gap-2"
// 										style={{ borderBottom: "1px solid #EDF2F7" }}
// 									>
// 										<span className="text-[12px] text-[#1B3B5F] flex-1 truncate">
// 											{c.name}
// 										</span>
// 										<div className="w-[140px]">
// 											<BudgetInput
// 												value={c.budget_amount}
// 												symbol={currency.symbol}
// 												hasError={out}
// 												onChange={(amt) => updateCategoryBudget(c.id, amt)}
// 											/>
// 										</div>
// 									</div>
// 								);
// 							})}
// 							<div className="flex items-center px-3 py-2 bg-white/50">
// 								<span className="text-[11px] font-bold text-[#1B3B5F] flex-1">
// 									Total estimated budget
// 								</span>
// 								<span className="text-[12px] font-extrabold text-[#1B3B5F]">
// 									{currency.symbol}
// 									{totalBudget.toLocaleString()}
// 								</span>
// 							</div>
// 						</div>

// 						{selected.some(
// 							(c: SelectedCategoryItem) =>
// 								c.max_budget > 0 &&
// 								c.budget_amount > 0 &&
// 								(c.budget_amount < c.min_budget ||
// 									c.budget_amount > c.max_budget)
// 						) && (
// 							<p className="text-[10px] text-red-500">
// 								One or more budgets are outside the allowed range.
// 							</p>
// 						)}
// 					</div>
// 				</Field>
// 			)}

// 			<div className="grid grid-cols-2 gap-3">
// 				<Field label="Interested in Financing">
// 					<Dropdown
// 						value={form.financing_interest}
// 						placeholder="Working capital needs"
// 						isOpen={showFinancing}
// 						onToggle={() => setShowFinancing(!showFinancing)}
// 						onSelect={(v) => {
// 							updateField("financing_interest", v);
// 							setShowFinancing(false);
// 						}}
// 						options={FINANCING_OPTIONS}
// 					/>
// 				</Field>
// 				<Field label="When do you need it?">
// 					<Dropdown
// 						value={form.timeline}
// 						placeholder="Timeline"
// 						isOpen={showTimeline}
// 						onToggle={() => setShowTimeline(!showTimeline)}
// 						onSelect={(v) => {
// 							updateField("timeline", v);
// 							setShowTimeline(false);
// 						}}
// 						options={TIMELINES}
// 					/>
// 				</Field>
// 			</div>

// 			<Field label="Additional Details">
// 				<SourcingTextarea
// 					value={form.additional_details}
// 					onChange={(v: string) => updateField("additional_details", v)}
// 					placeholder="Describe specific products, quantities, brands or any other requirements..."
// 				/>
// 			</Field>

// 			<div
// 				className="border-2 border-dashed rounded-xl p-4 text-center"
// 				style={{ borderColor: "#D9E2EC" }}
// 			>
// 				<Upload className="h-5 w-5 mx-auto text-gray-400 mb-1.5" />
// 				<p className="text-xs font-medium text-gray-600">Upload file</p>
// 				<p className="text-[10px] text-gray-400 mb-2">
// 					JPEG, JPG and PNG up to 2MB
// 				</p>
// 				<button
// 					type="button"
// 					onClick={() => fileInputRef.current?.click()}
// 					className="px-3 py-1 text-[11px] bg-white rounded-md text-[#1B3B5F] font-medium hover:bg-gray-50"
// 					style={{ border: "1px solid #D9E2EC" }}
// 				>
// 					Select file
// 				</button>
// 				<input
// 					ref={fileInputRef}
// 					type="file"
// 					multiple
// 					accept="image/jpeg,image/jpg,image/png"
// 					className="hidden"
// 					onChange={handleGeneralAttachmentUpload}
// 				/>
// 				{attachments.length > 0 && (
// 					<div className="mt-3 space-y-1.5 text-left">
// 						{attachments.map((a: any, i: number) => (
// 							<div
// 								key={i}
// 								className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-[11px]"
// 								style={{ border: "1px solid #EDF2F7" }}
// 							>
// 								<span className="text-gray-600 truncate flex-1">{a.name}</span>
// 								<button
// 									onClick={() =>
// 										setAttachments((prev: any[]) =>
// 											prev.filter((_, idx) => idx !== i)
// 										)
// 									}
// 									className="text-red-400 ml-2"
// 								>
// 									<Trash2 className="h-3 w-3" />
// 								</button>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// // ─────────────────────────────────────────────
// // PREVIEW STEP — styled like the reference image
// // ─────────────────────────────────────────────
// const PreviewStep: React.FC<any> = ({
// 	form,
// 	location,
// 	selected,
// 	currency,
// 	totalBudget,
// 	attachments,
// }) => {
// 	// collect all images
// 	const allImages: { url: string; label: string }[] = [];
// 	selected.forEach((c: SelectedCategoryItem) => {
// 		c.images.forEach((url: string) => allImages.push({ url, label: c.name }));
// 	});
// 	attachments.forEach((a: any) =>
// 		allImages.push({ url: a.url, label: "Attachment" })
// 	);

// 	// Max 3 images visible, rest as "+N"
// 	const MAX_VISIBLE = 3;
// 	const visibleImages = allImages.slice(0, MAX_VISIBLE);
// 	const extraCount = allImages.length - MAX_VISIBLE;

// 	const categoryNames = selected
// 		.map((c: SelectedCategoryItem) => c.name)
// 		.join(", ");

// 	const rows: { label: string; value: string }[] = [
// 		{ label: "Your Name", value: form.contact_name },
// 		{ label: "Business Name", value: form.business_name },
// 		{ label: "Phone Number", value: form.phone },
// 		{ label: "Email", value: form.email },
// 		{
// 			label: "Business Location",
// 			value: [location.city, location.stateName].filter(Boolean).join(", "),
// 		},
// 		{ label: "Categories", value: categoryNames },
// 		{
// 			label: "Estimated Budget",
// 			value: `${currency.symbol}${totalBudget.toLocaleString()}.000`,
// 		},
// 		...(form.financing_interest
// 			? [{ label: "Interested in Financing", value: form.financing_interest }]
// 			: []),
// 		...(form.timeline ? [{ label: "Timeline", value: form.timeline }] : []),
// 	];

// 	return (
// 		<div className="space-y-4">
// 			{/* Details card */}
// 			<div
// 				className="rounded-2xl overflow-hidden"
// 				style={{ background: "#FFFDF5", border: "1px solid #E8EEF4" }}
// 			>
// 				{rows.map((row, i) => (
// 					<div
// 						key={row.label}
// 						className="flex items-start gap-4 px-4 py-3"
// 						style={{
// 							borderBottom: i < rows.length - 1 ? "1px solid #EDF2F7" : "none",
// 						}}
// 					>
// 						<span
// 							className="text-[11px] text-gray-400 flex-shrink-0"
// 							style={{ minWidth: 120 }}
// 						>
// 							{row.label}
// 						</span>
// 						<span className="text-[12px] font-semibold text-[#1B3B5F] text-right flex-1 break-words">
// 							{row.value || "—"}
// 						</span>
// 					</div>
// 				))}
// 			</div>

// 			{/* Images grid */}
// 			{allImages.length > 0 && (
// 				<div className="grid grid-cols-3 gap-2">
// 					{visibleImages.map((img, i) => {
// 						const isLast = i === visibleImages.length - 1;
// 						const showOverlay = isLast && extraCount > 0;
// 						return (
// 							<div
// 								key={i}
// 								className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
// 								style={{ border: "1px solid #E8EEF4" }}
// 							>
// 								{/* eslint-disable-next-line @next/next/no-img-element */}
// 								<img
// 									src={img.url}
// 									alt={img.label}
// 									className="w-full h-full object-cover"
// 								/>
// 								{showOverlay && (
// 									<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// 										<span className="text-white text-base font-bold">
// 											+{extraCount}
// 										</span>
// 									</div>
// 								)}
// 							</div>
// 						);
// 					})}
// 				</div>
// 			)}

// 			{/* Info notice */}
// 			<div
// 				className="flex items-center gap-2 px-3 py-2 rounded-lg"
// 				style={{ background: "#EBF0F8", border: "1px solid #D0DCEA" }}
// 			>
// 				<svg
// 					width="14"
// 					height="14"
// 					viewBox="0 0 14 14"
// 					fill="none"
// 					className="flex-shrink-0"
// 				>
// 					<circle cx="7" cy="7" r="6.5" stroke="#1B3B5F" strokeOpacity="0.4" />
// 					<path
// 						d="M7 6V10"
// 						stroke="#1B3B5F"
// 						strokeWidth="1.2"
// 						strokeLinecap="round"
// 					/>
// 					<circle cx="7" cy="4.5" r="0.6" fill="#1B3B5F" />
// 				</svg>
// 				<p className="text-[11px] text-[#1B3B5F]/70">
// 					Your review will be processed instantly
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// // ─────────────────────────────────────────────
// // SHARED HELPERS
// // ─────────────────────────────────────────────
// const Field: React.FC<{
// 	label: string;
// 	required?: boolean;
// 	children: React.ReactNode;
// }> = ({ label, required, children }) => (
// 	<div>
// 		<label className="block text-[11px] font-medium text-[#1B3B5F] mb-1">
// 			{label} {required && <span className="text-red-500">*</span>}
// 		</label>
// 		{children}
// 	</div>
// );

// const SourcingInput: React.FC<{
// 	value: string;
// 	onChange: (v: string) => void;
// 	placeholder?: string;
// 	type?: string;
// }> = ({ value, onChange, placeholder, type = "text" }) => {
// 	const [focused, setFocused] = useState(false);
// 	const hasValue = value.length > 0;
// 	const bg = hasValue || focused ? "#FFFFFF" : "#FAFBFC";
// 	return (
// 		<input
// 			type={type}
// 			value={value}
// 			onChange={(e) => onChange(e.target.value)}
// 			onFocus={() => setFocused(true)}
// 			onBlur={() => setFocused(false)}
// 			placeholder={placeholder}
// 			className="w-full px-3 py-2 rounded-lg text-[13px] text-[#1B3B5F] outline-none transition-colors placeholder:text-gray-400"
// 			style={{
// 				background: bg,
// 				border: `1px solid ${focused ? "#A0B4CB" : "#D9E2EC"}`,
// 			}}
// 		/>
// 	);
// };

// const SourcingTextarea: React.FC<{
// 	value: string;
// 	onChange: (v: string) => void;
// 	placeholder?: string;
// }> = ({ value, onChange, placeholder }) => {
// 	const [focused, setFocused] = useState(false);
// 	const bg = value.length > 0 || focused ? "#FFFFFF" : "#FAFBFC";
// 	return (
// 		<textarea
// 			value={value}
// 			onChange={(e) => onChange(e.target.value)}
// 			onFocus={() => setFocused(true)}
// 			onBlur={() => setFocused(false)}
// 			placeholder={placeholder}
// 			rows={3}
// 			className="w-full px-3 py-2 rounded-lg text-[13px] text-[#1B3B5F] outline-none resize-none placeholder:text-gray-400"
// 			style={{
// 				background: bg,
// 				border: `1px solid ${focused ? "#A0B4CB" : "#D9E2EC"}`,
// 			}}
// 		/>
// 	);
// };

// const Dropdown: React.FC<{
// 	value: string;
// 	placeholder: string;
// 	isOpen: boolean;
// 	onToggle: () => void;
// 	onSelect: (v: string) => void;
// 	options: string[];
// }> = ({ value, placeholder, isOpen, onToggle, onSelect, options }) => {
// 	const hasValue = !!value;
// 	const bg = hasValue ? "#FFFFFF" : "#FAFBFC";
// 	return (
// 		<div className="relative">
// 			<button
// 				type="button"
// 				onClick={onToggle}
// 				className="w-full px-3 py-2 rounded-lg text-[13px] flex items-center justify-between text-left"
// 				style={{
// 					background: bg,
// 					border: `1px solid ${isOpen ? "#A0B4CB" : "#D9E2EC"}`,
// 				}}
// 			>
// 				<span className={value ? "text-[#1B3B5F]" : "text-gray-400"}>
// 					{value || placeholder}
// 				</span>
// 				{/* Slim chevron */}
// 				<svg
// 					width="12"
// 					height="12"
// 					viewBox="0 0 12 12"
// 					fill="none"
// 					className="text-gray-400 transition-transform flex-shrink-0"
// 					style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
// 				>
// 					<path
// 						d="M2.5 4.5L6 8L9.5 4.5"
// 						stroke="currentColor"
// 						strokeWidth="1.5"
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 					/>
// 				</svg>
// 			</button>
// 			{isOpen && (
// 				<div
// 					className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg max-h-52 overflow-y-auto"
// 					style={{ border: "1px solid #D9E2EC" }}
// 				>
// 					{options.map((opt) => (
// 						<button
// 							key={opt}
// 							type="button"
// 							onClick={() => onSelect(opt)}
// 							className="w-full text-left px-3 py-2 text-xs text-[#1B3B5F] hover:bg-blue-50/60 transition-colors first:rounded-t-xl last:rounded-b-xl"
// 						>
// 							{opt}
// 						</button>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const CurrencyOnlySelector: React.FC<{
// 	value: { amount: number; currency: string; symbol: string };
// 	onChange: (v: { amount: number; currency: string; symbol: string }) => void;
// }> = ({ value, onChange }) => {
// 	const opts = [
// 		{ code: "NGN", symbol: "₦" },
// 		{ code: "USD", symbol: "$" },
// 		{ code: "EUR", symbol: "€" },
// 		{ code: "GBP", symbol: "£" },
// 	];
// 	return (
// 		<select
// 			value={value.currency}
// 			onChange={(e) => {
// 				const o = opts.find((x) => x.code === e.target.value)!;
// 				onChange({ ...value, currency: o.code, symbol: o.symbol });
// 			}}
// 			className="w-full px-2 py-1.5 text-[11px] font-semibold text-[#1B3B5F] rounded-lg outline-none"
// 			style={{ border: "1px solid #D9E2EC", background: "#FAFBFC" }}
// 		>
// 			{opts.map((o) => (
// 				<option key={o.code} value={o.code}>
// 					{o.symbol} {o.code}
// 				</option>
// 			))}
// 		</select>
// 	);
// };

// const BudgetInput: React.FC<{
// 	value: number;
// 	symbol: string;
// 	onChange: (v: number) => void;
// 	hasError?: boolean;
// }> = ({ value, symbol, onChange, hasError }) => {
// 	const [focused, setFocused] = useState(false);
// 	const [display, setDisplay] = useState(
// 		value > 0 ? value.toLocaleString() : ""
// 	);

// 	React.useEffect(() => {
// 		setDisplay(value > 0 ? value.toLocaleString() : "");
// 	}, [value]);

// 	const hasValue = display.length > 0;
// 	const bg = hasValue || focused ? "#FFFFFF" : "#FAFBFC";
// 	const border = hasError ? "#EF4444" : focused ? "#A0B4CB" : "#D9E2EC";

// 	return (
// 		<div
// 			className="flex items-center rounded-lg px-2 py-1.5"
// 			style={{ border: `1px solid ${border}`, background: bg }}
// 		>
// 			<span className="text-[11px] text-gray-400 mr-1">{symbol}</span>
// 			<input
// 				type="text"
// 				inputMode="numeric"
// 				value={display}
// 				onFocus={() => setFocused(true)}
// 				onBlur={() => setFocused(false)}
// 				onChange={(e) => {
// 					const raw = e.target.value.replace(/[^\d.]/g, "");
// 					const num = parseFloat(raw) || 0;
// 					setDisplay(raw);
// 					onChange(num);
// 				}}
// 				placeholder="0"
// 				className="flex-1 text-[12px] text-right text-[#1B3B5F] bg-transparent outline-none min-w-0"
// 			/>
// 		</div>
// 	);
// };

// export default DealSubmissionModal;

"use client";

import React, {
	useState,
	useMemo,
	useRef,
	useEffect,
	useCallback,
	memo,
} from "react";
import { createPortal } from "react-dom";
import {
	X,
	Upload,
	ArrowRight,
	Trash2,
	ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useSubmitCustomSourcing } from "@/hooks/use-sourcing";
import type { SourcingCategory, SelectedCategoryItem } from "@/types";
import { uploadToCloudinary } from "@/utils/upload";
import SourcingPhoneInput from "./sourcing-phone-input";
import LocationSelectors from "./location-selectors";
import CategoryChecklist from "./category-checklist";
import Button from "@/components/ui/button";

/* ────────────────────────────────────────────────────────────────
   TYPES
   ──────────────────────────────────────────────────────────────── */

interface Props {
	isOpen: boolean;
	onClose: () => void;
	initialCategory?: SourcingCategory | null;
}

interface FormState {
	business_name:      string;
	contact_name:       string;
	phone:              string;
	email:              string;
	timeline:           string;
	financing_interest: string;
	additional_details: string;
}

interface LocationState {
	country:     string;
	countryName: string;
	state:       string;
	stateName:   string;
	city:        string;
}

interface CurrencyState {
	currency: string;
	symbol:   string;
}

interface Attachment {
	name: string;
	url:  string;
}

interface ApiError {
	response?: { data?: { message?: string } };
	message?:  string;
}

/* ────────────────────────────────────────────────────────────────
   CONSTANTS
   ──────────────────────────────────────────────────────────────── */

const TIMELINES = [
	"ASAP (Within 1 week)",
	"2-4 weeks",
	"1-3 months",
	"3+ months",
];

const FINANCING_OPTIONS = [
	"Working capital needs",
	"Order Now, Pay Small Small (ONPSS)",
	"No financing needed",
];

const CURRENCY_OPTIONS: CurrencyState[] = [
	{ currency: "NGN", symbol: "₦" },
	{ currency: "USD", symbol: "$" },
	{ currency: "EUR", symbol: "€" },
	{ currency: "GBP", symbol: "£" },
];

const INITIAL_FORM: FormState = {
	business_name:      "",
	contact_name:       "",
	phone:              "",
	email:              "",
	timeline:           "",
	financing_interest: "",
	additional_details: "",
};

const INITIAL_LOCATION: LocationState = {
	country:     "NG",
	countryName: "Nigeria",
	state:       "",
	stateName:   "",
	city:        "",
};

const INITIAL_CURRENCY: CurrencyState = { currency: "NGN", symbol: "₦" };

const MAX_FILE_SIZE   = 2 * 1024 * 1024;   // 2 MB
const ALLOWED_TYPES   = ["image/jpeg", "image/jpg", "image/png"];
const PHONE_REGEX     = /^\+?\d{10,15}$/;
const EMAIL_REGEX     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ────────────────────────────────────────────────────────────────
   MAIN MODAL
   ──────────────────────────────────────────────────────────────── */

const DealSubmissionModal: React.FC<Props> = ({
	isOpen,
	onClose,
	initialCategory,
}) => {
	const fileInputRef     = useRef<HTMLInputElement>(null);
	const modalRef         = useRef<HTMLDivElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);
	const { mutateAsync, isPending } = useSubmitCustomSourcing();

	const [step,          setStep]          = useState<"form" | "preview">("form");
	const [form,          setForm]          = useState<FormState>(INITIAL_FORM);
	const [location,      setLocation]      = useState<LocationState>(INITIAL_LOCATION);
	const [currency,      setCurrency]      = useState<CurrencyState>(INITIAL_CURRENCY);
	const [selected,      setSelected]      = useState<SelectedCategoryItem[]>([]);
	const [attachments,   setAttachments]   = useState<Attachment[]>([]);
	const [showTimeline,  setShowTimeline]  = useState(false);
	const [showFinancing, setShowFinancing] = useState(false);
	const [mounted,       setMounted]       = useState(false);

	/* ── Portal mount guard (SSR-safe) ─────────────────────────── */
	useEffect(() => {
		setMounted(true);
	}, []);

	/* ── Reset form state ──────────────────────────────────────── */
	const resetState = useCallback(() => {
		setStep("form");
		setForm(INITIAL_FORM);
		setLocation(INITIAL_LOCATION);
		setCurrency(INITIAL_CURRENCY);
		setSelected([]);
		setAttachments([]);
		setShowTimeline(false);
		setShowFinancing(false);
	}, []);

	/* ── Seed selected categories when modal opens ─────────────── */
	useEffect(() => {
		if (!isOpen || !initialCategory) return;
		setSelected((prev) =>
			prev.find((c) => c.id === initialCategory.id)
				? prev
				: [
						...prev,
						{
							id:            initialCategory.id,
							name:          initialCategory.name,
							slug:          initialCategory.slug,
							section:       initialCategory.section,
							min_budget:    Number(initialCategory.min_budget) || 0,
							max_budget:    Number(initialCategory.max_budget) || 0,
							budget_amount: 0,
							images:        [],
						},
					]
		);
	}, [isOpen, initialCategory]);

	/* ── Body scroll lock (iOS-safe) ───────────────────────────── */
	useEffect(() => {
		if (!isOpen) return;
		const scrollY = window.scrollY;
		const original = {
			overflow: document.body.style.overflow,
			position: document.body.style.position,
			top:      document.body.style.top,
			width:    document.body.style.width,
		};
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top      = `-${scrollY}px`;
		document.body.style.width    = "100%";
		return () => {
			document.body.style.overflow = original.overflow;
			document.body.style.position = original.position;
			document.body.style.top      = original.top;
			document.body.style.width    = original.width;
			window.scrollTo(0, scrollY);
		};
	}, [isOpen]);

	/* ── Focus management: save previous, focus modal, restore ─── */
	useEffect(() => {
		if (!isOpen) return;
		previousFocusRef.current = document.activeElement as HTMLElement | null;
		// Defer focus so portal mounts first
		const t = setTimeout(() => modalRef.current?.focus(), 0);
		return () => {
			clearTimeout(t);
			previousFocusRef.current?.focus?.();
		};
	}, [isOpen]);

	/* ── Escape-to-close + basic focus trap ────────────────────── */
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && !isPending) {
				e.preventDefault();
				handleClose();
			}
			if (e.key === "Tab" && modalRef.current) {
				const focusables = modalRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				if (focusables.length === 0) return;
				const first = focusables[0];
				const last  = focusables[focusables.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, isPending]);

	/* ── Derived values ────────────────────────────────────────── */
	const totalBudget = selected.reduce(
		(sum, c) => sum + (Number(c.budget_amount) || 0),
		0
	);

	/* ── Memoized callbacks ────────────────────────────────────── */
	const updateField = useCallback(
		(k: keyof FormState, v: string) =>
			setForm((p) => ({ ...p, [k]: v })),
		[]
	);

	const updateCategoryBudget = useCallback(
		(id: number, amount: number) =>
			setSelected((prev) =>
				prev.map((c) => (c.id === id ? { ...c, budget_amount: amount } : c))
			),
		[]
	);

	const removeAttachment = useCallback(
		(index: number) =>
			setAttachments((prev) => prev.filter((_, i) => i !== index)),
		[]
	);

	const handleClose = useCallback(() => {
		if (isPending) return;
		onClose();
		// Defer reset until close animation could play (none here, but safe)
		setTimeout(resetState, 0);
	}, [isPending, onClose, resetState]);

	const handleBackdropClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) handleClose();
		},
		[handleClose]
	);

	/* ── File upload ───────────────────────────────────────────── */
	const handleGeneralAttachmentUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (!files || files.length === 0) return;

			const valid = Array.from(files).filter((f) => {
				if (f.size > MAX_FILE_SIZE) {
					toast.error(`${f.name} exceeds 2MB`);
					return false;
				}
				if (!ALLOWED_TYPES.includes(f.type)) {
					toast.error(`${f.name} must be JPEG/JPG/PNG`);
					return false;
				}
				return true;
			});

			// Always clear the input, regardless of outcome
			e.target.value = "";
			if (valid.length === 0) return;

			const toastId = `upload-${Date.now()}`;
			toast.loading("Uploading...", { id: toastId });
			try {
				const urls = await Promise.all(valid.map((f) => uploadToCloudinary(f)));
				setAttachments((prev) => [
					...prev,
					...urls.map((url, i) => ({ name: valid[i].name, url })),
				]);
				toast.success("Uploaded", { id: toastId });
			} catch {
				toast.error("Upload failed", { id: toastId });
			}
		},
		[]
	);

	/* ── Validation ────────────────────────────────────────────── */
	const validate = useCallback((): string | null => {
		if (!form.business_name.trim())          return "Business name is required";
		if (!form.contact_name.trim())           return "Your name is required";
		if (!PHONE_REGEX.test(form.phone))       return "Valid phone number required";
		if (!EMAIL_REGEX.test(form.email))       return "Valid email required";
		if (!location.country || !location.state || !location.city)
			return "Country, state and city are required";
		if (selected.length === 0)               return "Select at least one category";

		for (const c of selected) {
			if (!c.budget_amount || c.budget_amount <= 0)
				return `Enter a budget for ${c.name}`;
			if (
				c.max_budget > 0 &&
				(c.budget_amount < c.min_budget || c.budget_amount > c.max_budget)
			)
				return `Budget for ${c.name} must be between ${c.min_budget.toLocaleString()} and ${c.max_budget.toLocaleString()}`;
		}
		return null;
	}, [form, location, selected]);

	const goToPreview = useCallback(() => {
		const err = validate();
		if (err) {
			toast.error(err);
			return;
		}
		setStep("preview");
	}, [validate]);

	const handleSubmit = useCallback(async () => {
		try {
			const business_location = [
				location.city,
				location.stateName,
				location.countryName,
			]
				.filter(Boolean)
				.join(", ");

			const res = await mutateAsync({
				business_name:      form.business_name,
				contact_name:       form.contact_name,
				phone:              form.phone,
				email:              form.email,
				business_country:   location.countryName,
				business_state:     location.stateName,
				business_city:      location.city,
				business_location,
				categories: selected.map((c) => ({
					id:            c.id,
					name:          c.name,
					slug:          c.slug,
					section:       c.section,
					budget_amount: c.budget_amount,
					images:        c.images,
				})),
				estimated_budget:   `${currency.symbol}${totalBudget.toLocaleString()}`,
				budget_total:       totalBudget,
				currency:           currency.currency,
				currency_symbol:    currency.symbol,
				timeline:           form.timeline,
				financing_interest: form.financing_interest,
				additional_details: form.additional_details,
				attachments:        attachments.map((a) => a.url),
			});

			toast.success(res.message || "Deal submitted successfully!");
			onClose();
			resetState();
		} catch (err: unknown) {
			const e = err as ApiError;
			toast.error(e?.response?.data?.message || e?.message || "Submission failed.");
		}
	}, [
		mutateAsync, form, location, selected, currency,
		totalBudget, attachments, onClose, resetState,
	]);

	if (!isOpen || !mounted) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
			onClick={handleBackdropClick}
			role="presentation"
		>
			<div
				ref={modalRef}
				tabIndex={-1}
				role="dialog"
				aria-modal="true"
				aria-labelledby="deal-modal-title"
				aria-describedby="deal-modal-desc"
				className="bg-white w-full sm:w-[700px] sm:max-w-[700px] sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[94vh] sm:max-h-[90vh] overflow-hidden flex flex-col outline-none"
			>
				{/* ── Header ───────────────────────────────────────── */}
				<div className="flex items-center gap-3 px-5 py-4 border-b border-secondary flex-shrink-0">
					{step === "preview" && (
						<button
							type="button"
							onClick={() => setStep("form")}
							className="p-1.5 hover:bg-gray-100 rounded-lg flex-shrink-0 -ml-1"
							aria-label="Back to form"
						>
							<ArrowLeft className="h-4 w-4 text-gray-500" />
						</button>
					)}
					<div className="flex-1 min-w-0">
						<h2
							id="deal-modal-title"
							className="text-base sm:text-lg font-bold text-[#1B3B5F]"
						>
							{step === "form" ? "New Deal Submission" : "Review Your Deal"}
						</h2>
						<p
							id="deal-modal-desc"
							className="text-[11px] text-gray-400 mt-0.5"
						>
							{step === "form"
								? "All fields marked * are required."
								: "Check if all information is correct"}
						</p>
					</div>
					<button
						type="button"
						onClick={handleClose}
						disabled={isPending}
						className="p-1.5 hover:bg-gray-100 rounded-lg flex-shrink-0 disabled:opacity-40"
						aria-label="Close dialog"
					>
						<X className="h-4 w-4 text-gray-500" />
					</button>
				</div>

				{/* ── Body ─────────────────────────────────────────── */}
				<div className="flex-1 overflow-y-auto px-5 py-4">
					{step === "form" ? (
						<FormStep
							form={form}
							updateField={updateField}
							location={location}
							setLocation={setLocation}
							selected={selected}
							setSelected={setSelected}
							updateCategoryBudget={updateCategoryBudget}
							currency={currency}
							setCurrency={setCurrency}
							totalBudget={totalBudget}
							showTimeline={showTimeline}
							setShowTimeline={setShowTimeline}
							showFinancing={showFinancing}
							setShowFinancing={setShowFinancing}
							attachments={attachments}
							removeAttachment={removeAttachment}
							fileInputRef={fileInputRef}
							handleGeneralAttachmentUpload={handleGeneralAttachmentUpload}
						/>
					) : (
						<PreviewStep
							form={form}
							location={location}
							selected={selected}
							currency={currency}
							totalBudget={totalBudget}
							attachments={attachments}
						/>
					)}
				</div>

				{/* ── Footer ───────────────────────────────────────── */}
				<div className="px-5 py-4 border-t border-gray-100 flex-shrink-0 space-y-2">
					{step === "form" ? (
						<Button
							onClick={goToPreview}
							variant="primary"
							animation="ripple"
							className="border border-primary flex items-center justify-center font-bold w-full hover:!bg-[#FFDE76]"
						>
							Submit Sourcing Request
						</Button>
					) : (
						<button
							type="button"
							onClick={handleSubmit}
							disabled={isPending}
							className="w-full py-3 bg-[#1B3B5F] text-white font-semibold rounded-xl hover:bg-[#1B3B5F]/90 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
						>
							{isPending ? "Submitting..." : "Confirm Request"}
							{!isPending && <ArrowRight className="h-4 w-4" />}
						</button>
					)}
					<p className="text-[10px] text-center text-gray-400">
						By submitting, you agree to be contacted by our sourcing team. No
						commitment required.
					</p>
				</div>
			</div>
		</div>,
		document.body
	);
};

/* ────────────────────────────────────────────────────────────────
   FORM STEP
   ──────────────────────────────────────────────────────────────── */

interface FormStepProps {
	form:                  FormState;
	updateField:           (k: keyof FormState, v: string) => void;
	location:              LocationState;
	setLocation:           React.Dispatch<React.SetStateAction<LocationState>>;
	selected:              SelectedCategoryItem[];
	setSelected:           React.Dispatch<React.SetStateAction<SelectedCategoryItem[]>>;
	updateCategoryBudget:  (id: number, amount: number) => void;
	currency:              CurrencyState;
	setCurrency:           React.Dispatch<React.SetStateAction<CurrencyState>>;
	totalBudget:           number;
	showTimeline:          boolean;
	setShowTimeline:       React.Dispatch<React.SetStateAction<boolean>>;
	showFinancing:         boolean;
	setShowFinancing:      React.Dispatch<React.SetStateAction<boolean>>;
	attachments:           Attachment[];
	removeAttachment:      (index: number) => void;
	fileInputRef:          React.RefObject<HTMLInputElement | null>;
	handleGeneralAttachmentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormStep: React.FC<FormStepProps> = memo(function FormStep({
	form,
	updateField,
	location,
	setLocation,
	selected,
	setSelected,
	updateCategoryBudget,
	currency,
	setCurrency,
	totalBudget,
	showTimeline,
	setShowTimeline,
	showFinancing,
	setShowFinancing,
	attachments,
	removeAttachment,
	fileInputRef,
	handleGeneralAttachmentUpload,
}) {
	const hasBudgetError = useMemo(
		() =>
			selected.some(
				(c) =>
					c.max_budget > 0 &&
					c.budget_amount > 0 &&
					(c.budget_amount < c.min_budget || c.budget_amount > c.max_budget)
			),
		[selected]
	);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<Field label="Business Name" required>
					<SourcingInput
						value={form.business_name}
						onChange={(v) => updateField("business_name", v)}
						placeholder="e.g Toyin's Apparel"
					/>
				</Field>
				<Field label="Your Name" required>
					<SourcingInput
						value={form.contact_name}
						onChange={(v) => updateField("contact_name", v)}
						placeholder="First & Last name"
					/>
				</Field>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<Field label="Phone Number" required>
					<SourcingPhoneInput
						value={form.phone}
						onChange={(v) => updateField("phone", v)}
					/>
				</Field>
				<Field label="Email Address" required>
					<SourcingInput
						type="email"
						value={form.email}
						onChange={(v) => updateField("email", v)}
						placeholder="you@example.com"
					/>
				</Field>
			</div>

			<Field label="Business Location" required>
				<LocationSelectors value={location} onChange={setLocation} />
			</Field>

			<div className="border-t border-secondary" />

			<Field label="Selected Categories" required>
				<CategoryChecklist selected={selected} onChange={setSelected} />
			</Field>

			{selected.length > 0 && (
				<Field label="Estimated Budget" required>
					<div className="space-y-2">
						<div className="flex items-center justify-between mb-1">
							<span className="text-[10px] text-primary">
								Set a budget per category
							</span>
							<div className="w-[120px]">
								<CurrencyOnlySelector value={currency} onChange={setCurrency} />
							</div>
						</div>
						<div
							className="rounded-xl overflow-hidden"
							style={{
								background: "#FFF8E7",
								border:     "1px solid #E8EEF4",
							}}
						>
							{selected.map((c) => {
								const out =
									c.max_budget > 0 &&
									c.budget_amount > 0 &&
									(c.budget_amount < c.min_budget ||
										c.budget_amount > c.max_budget);
								return (
									<div
										key={c.id}
										className="flex items-center px-3 py-2 gap-2"
										style={{ borderBottom: "1px solid #EDF2F7" }}
									>
										<span className="text-[12px] text-[#1B3B5F] flex-1 truncate">
											{c.name}
										</span>
										<div className="w-[140px]">
											<BudgetInput
												value={c.budget_amount}
												symbol={currency.symbol}
												hasError={out}
												onChange={(amt) => updateCategoryBudget(c.id, amt)}
											/>
										</div>
									</div>
								);
							})}
							<div className="flex items-center px-3 py-2 bg-white/50">
								<span className="text-[11px] font-bold text-[#1B3B5F] flex-1">
									Total estimated budget
								</span>
								<span className="text-[12px] font-extrabold text-[#1B3B5F]">
									{currency.symbol}
									{totalBudget.toLocaleString()}
								</span>
							</div>
						</div>

						{hasBudgetError && (
							<p className="text-[10px] text-red-500">
								One or more budgets are outside the allowed range.
							</p>
						)}
					</div>
				</Field>
			)}

			<div className="grid grid-cols-2 gap-3">
				<Field label="Interested in Financing">
					<Dropdown
						value={form.financing_interest}
						placeholder="Working capital needs"
						isOpen={showFinancing}
						onToggle={() => setShowFinancing(!showFinancing)}
						onSelect={(v) => {
							updateField("financing_interest", v);
							setShowFinancing(false);
						}}
						options={FINANCING_OPTIONS}
					/>
				</Field>
				<Field label="When do you need it?">
					<Dropdown
						value={form.timeline}
						placeholder="Timeline"
						isOpen={showTimeline}
						onToggle={() => setShowTimeline(!showTimeline)}
						onSelect={(v) => {
							updateField("timeline", v);
							setShowTimeline(false);
						}}
						options={TIMELINES}
					/>
				</Field>
			</div>

			<Field label="Additional Details">
				<SourcingTextarea
					value={form.additional_details}
					onChange={(v) => updateField("additional_details", v)}
					placeholder="Describe specific products, quantities, brands or any other requirements..."
				/>
			</Field>

			<div
				className="border-2 border-dashed rounded-xl p-4 text-center"
				style={{ borderColor: "#D9E2EC" }}
			>
				<Upload className="h-5 w-5 mx-auto text-gray-400 mb-1.5" />
				<p className="text-xs font-medium text-gray-600">Upload file</p>
				<p className="text-[10px] text-gray-400 mb-2">
					JPEG, JPG and PNG up to 2MB
				</p>
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					className="px-3 py-1 text-[11px] bg-white rounded-md text-[#1B3B5F] font-medium hover:bg-gray-50"
					style={{ border: "1px solid #D9E2EC" }}
				>
					Select file
				</button>
				<input
					ref={fileInputRef}
					type="file"
					multiple
					accept="image/jpeg,image/jpg,image/png"
					className="hidden"
					onChange={handleGeneralAttachmentUpload}
				/>
				{attachments.length > 0 && (
					<div className="mt-3 space-y-1.5 text-left">
						{attachments.map((a, i) => (
							<div
								key={`${a.url}-${i}`}
								className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-[11px]"
								style={{ border: "1px solid #EDF2F7" }}
							>
								<span className="text-gray-600 truncate flex-1">{a.name}</span>
								<button
									type="button"
									onClick={() => removeAttachment(i)}
									className="text-red-400 ml-2"
									aria-label={`Remove ${a.name}`}
								>
									<Trash2 className="h-3 w-3" />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
});

/* ────────────────────────────────────────────────────────────────
   PREVIEW STEP
   ──────────────────────────────────────────────────────────────── */

interface PreviewStepProps {
	form:        FormState;
	location:    LocationState;
	selected:    SelectedCategoryItem[];
	currency:    CurrencyState;
	totalBudget: number;
	attachments: Attachment[];
}

const PreviewStep: React.FC<PreviewStepProps> = memo(function PreviewStep({
	form,
	location,
	selected,
	currency,
	totalBudget,
	attachments,
}) {
	const allImages = useMemo(() => {
		const list: { url: string; label: string }[] = [];
		selected.forEach((c) =>
			c.images.forEach((url) => list.push({ url, label: c.name }))
		);
		attachments.forEach((a) =>
			list.push({ url: a.url, label: "Attachment" })
		);
		return list;
	}, [selected, attachments]);

	const MAX_VISIBLE   = 3;
	const visibleImages = allImages.slice(0, MAX_VISIBLE);
	const extraCount    = Math.max(allImages.length - MAX_VISIBLE, 0);
	const categoryNames = selected.map((c) => c.name).join(", ");

	const rows: { label: string; value: string }[] = [
		{ label: "Your Name",         value: form.contact_name },
		{ label: "Business Name",     value: form.business_name },
		{ label: "Phone Number",      value: form.phone },
		{ label: "Email",             value: form.email },
		{
			label: "Business Location",
			value: [location.city, location.stateName].filter(Boolean).join(", "),
		},
		{ label: "Categories",        value: categoryNames },
		{
			label: "Estimated Budget",
			value: `${currency.symbol}${totalBudget.toLocaleString()}`,
		},
		...(form.financing_interest
			? [{ label: "Interested in Financing", value: form.financing_interest }]
			: []),
		...(form.timeline
			? [{ label: "Timeline", value: form.timeline }]
			: []),
		...(form.additional_details
			? [{ label: "Additional Details", value: form.additional_details }]
			: []),
	];

	return (
		<div className="space-y-4">
			{/* Details card */}
			<div
				className="rounded-2xl overflow-hidden"
				style={{ background: "#FFFDF5", border: "1px solid #E8EEF4" }}
			>
				{rows.map((row, i) => (
					<div
						key={row.label}
						className="flex items-start gap-4 px-4 py-3"
						style={{
							borderBottom: i < rows.length - 1 ? "1px solid #EDF2F7" : "none",
						}}
					>
						<span
							className="text-[11px] text-gray-400 flex-shrink-0"
							style={{ minWidth: 120 }}
						>
							{row.label}
						</span>
						<span className="text-[12px] font-semibold text-[#1B3B5F] text-right flex-1 break-words">
							{row.value || "—"}
						</span>
					</div>
				))}
			</div>

			{/* Images grid */}
			{allImages.length > 0 && (
				<div className="grid grid-cols-3 gap-2">
					{visibleImages.map((img, i) => {
						const isLast      = i === visibleImages.length - 1;
						const showOverlay = isLast && extraCount > 0;
						return (
							<div
								key={`${img.url}-${i}`}
								className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
								style={{ border: "1px solid #E8EEF4" }}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={img.url}
									alt={img.label}
									className="w-full h-full object-cover"
								/>
								{showOverlay && (
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
										<span className="text-white text-base font-bold">
											+{extraCount}
										</span>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}

			{/* Info notice */}
			<div
				className="flex items-center gap-2 px-3 py-2 rounded-lg"
				style={{ background: "#EBF0F8", border: "1px solid #D0DCEA" }}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					className="flex-shrink-0"
					aria-hidden="true"
				>
					<circle cx="7" cy="7" r="6.5" stroke="#1B3B5F" strokeOpacity="0.4" />
					<path d="M7 6V10" stroke="#1B3B5F" strokeWidth="1.2" strokeLinecap="round" />
					<circle cx="7" cy="4.5" r="0.6" fill="#1B3B5F" />
				</svg>
				<p className="text-[11px] text-[#1B3B5F]/70">
					Your request will be processed shortly.
				</p>
			</div>
		</div>
	);
});

/* ────────────────────────────────────────────────────────────────
   SHARED INPUTS (memoized — prevents iOS focus loss)
   ──────────────────────────────────────────────────────────────── */

const Field = memo(function Field({
	label,
	required,
	children,
}: {
	label:     string;
	required?: boolean;
	children:  React.ReactNode;
}) {
	return (
		<div>
			<label className="block text-[11px] font-medium text-[#1B3B5F] mb-1">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			{children}
		</div>
	);
});

const SourcingInput = memo(function SourcingInput({
	value,
	onChange,
	placeholder,
	type = "text",
}: {
	value:        string;
	onChange:     (v: string) => void;
	placeholder?: string;
	type?:        string;
}) {
	const [focused, setFocused] = useState(false);
	const hasValue = value.length > 0;
	const bg       = hasValue || focused ? "#FFFFFF" : "#FAFBFC";
	return (
		<input
			type={type}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			placeholder={placeholder}
			className="w-full px-3 py-2 rounded-lg text-[13px] text-[#1B3B5F] outline-none transition-colors placeholder:text-gray-400"
			style={{
				background: bg,
				border:     `1px solid ${focused ? "#A0B4CB" : "#D9E2EC"}`,
			}}
		/>
	);
});

const SourcingTextarea = memo(function SourcingTextarea({
	value,
	onChange,
	placeholder,
}: {
	value:        string;
	onChange:     (v: string) => void;
	placeholder?: string;
}) {
	const [focused, setFocused] = useState(false);
	const bg = value.length > 0 || focused ? "#FFFFFF" : "#FAFBFC";
	return (
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			placeholder={placeholder}
			rows={3}
			className="w-full px-3 py-2 rounded-lg text-[13px] text-[#1B3B5F] outline-none resize-none placeholder:text-gray-400"
			style={{
				background: bg,
				border:     `1px solid ${focused ? "#A0B4CB" : "#D9E2EC"}`,
			}}
		/>
	);
});

const Dropdown = memo(function Dropdown({
	value,
	placeholder,
	isOpen,
	onToggle,
	onSelect,
	options,
}: {
	value:       string;
	placeholder: string;
	isOpen:      boolean;
	onToggle:    () => void;
	onSelect:    (v: string) => void;
	options:     string[];
}) {
	const hasValue = !!value;
	const bg       = hasValue ? "#FFFFFF" : "#FAFBFC";
	return (
		<div className="relative">
			<button
				type="button"
				onClick={onToggle}
				className="w-full px-3 py-2 rounded-lg text-[13px] flex items-center justify-between text-left"
				style={{
					background: bg,
					border:     `1px solid ${isOpen ? "#A0B4CB" : "#D9E2EC"}`,
				}}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className={value ? "text-[#1B3B5F]" : "text-gray-400"}>
					{value || placeholder}
				</span>
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					className="text-gray-400 transition-transform flex-shrink-0"
					style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
					aria-hidden="true"
				>
					<path
						d="M2.5 4.5L6 8L9.5 4.5"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			{isOpen && (
				<ul
					role="listbox"
					className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg max-h-52 overflow-y-auto"
					style={{ border: "1px solid #D9E2EC" }}
				>
					{options.map((opt) => (
						<li key={opt} role="option" aria-selected={opt === value}>
							<button
								type="button"
								onClick={() => onSelect(opt)}
								className="w-full text-left px-3 py-2 text-xs text-[#1B3B5F] hover:bg-blue-50/60 transition-colors first:rounded-t-xl last:rounded-b-xl"
							>
								{opt}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
});

const CurrencyOnlySelector = memo(function CurrencyOnlySelector({
	value,
	onChange,
}: {
	value:    CurrencyState;
	onChange: (v: CurrencyState) => void;
}) {
	return (
		<select
			value={value.currency}
			onChange={(e) => {
				const o = CURRENCY_OPTIONS.find((x) => x.currency === e.target.value);
				if (o) onChange(o);
			}}
			className="w-full px-2 py-1.5 text-[11px] font-semibold text-[#1B3B5F] rounded-lg outline-none"
			style={{ border: "1px solid #D9E2EC", background: "#FAFBFC" }}
			aria-label="Select currency"
		>
			{CURRENCY_OPTIONS.map((o) => (
				<option key={o.currency} value={o.currency}>
					{o.symbol} {o.currency}
				</option>
			))}
		</select>
	);
});

const BudgetInput = memo(function BudgetInput({
	value,
	symbol,
	onChange,
	hasError,
}: {
	value:     number;
	symbol:    string;
	onChange:  (v: number) => void;
	hasError?: boolean;
}) {
	const [focused, setFocused] = useState(false);
	const [display, setDisplay] = useState(
		value > 0 ? value.toLocaleString() : ""
	);

	/* Only sync from prop when NOT focused — prevents iOS cursor jump */
	useEffect(() => {
		if (focused) return;
		setDisplay(value > 0 ? value.toLocaleString() : "");
	}, [value, focused]);

	const hasValue = display.length > 0;
	const bg       = hasValue || focused ? "#FFFFFF" : "#FAFBFC";
	const border   = hasError ? "#EF4444" : focused ? "#A0B4CB" : "#D9E2EC";

	return (
		<div
			className="flex items-center rounded-lg px-2 py-1.5"
			style={{ border: `1px solid ${border}`, background: bg }}
		>
			<span className="text-[11px] text-gray-400 mr-1">{symbol}</span>
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
					onChange(num);
				}}
				placeholder="0"
				className="flex-1 text-[12px] text-right text-[#1B3B5F] bg-transparent outline-none min-w-0"
				aria-invalid={hasError}
			/>
		</div>
	);
});

export default DealSubmissionModal;