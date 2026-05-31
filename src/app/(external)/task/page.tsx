//  /* eslint-disable @typescript-eslint/no-empty-object-type */

// "use client";

// import { useState } from "react";
// import {
// 	MdEmail,
// 	MdCheckCircle,
// 	MdAdd,
// 	MdClose,
// 	MdArrowForward,
// 	MdCalendarToday,
// 	MdLabel,
// 	MdWork,
// 	MdNotes,
// 	MdLogout,
// 	MdTaskAlt,
// 	MdOutlineInbox,
// 	MdFilterList,
// 	MdSearch,
// 	MdEdit,
// 	MdCheck,
// 	MdKeyboardArrowDown,
// } from "react-icons/md";
// import { RiUserLine, RiTeamLine } from "react-icons/ri";
// import { BiTask } from "react-icons/bi";
// import { IconType } from "react-icons";
// import React from "react";
// import {
// 	useIdentifyUser,
// 	useConfirmUser,
// 	usePublicTasks,
// 	useCreatePublicTask,
// 	useUpdateTaskStatus,
// 	type ConfirmedUser,
// 	type PublicTask,
// } from "@/hooks/use-public-tasks";

// const NAVY = "#1B3B5F";
// const GOLD = "#F9C319";
// const GOLD_LIGHT = "#FFF8DC";

// type Step = "email" | "confirm" | "name" | "list";
// type PriorityValue = "low" | "medium" | "high" | "urgent";
// type StatusValue =
// 	| "pending"
// 	| "in_progress"
// 	| "review"
// 	| "completed"
// 	| "cancelled";
// type PriorityLabel = "Low" | "Medium" | "High" | "Urgent";
// type StatusLabel =
// 	| "Not Started"
// 	| "In Progress"
// 	| "Waiting for input"
// 	| "Completed"
// 	| "Deferred";

// const STAFF_OPTIONS: string[] = [
// 	"Somto",
// 	"Tobi",
// 	"Ola",
// 	"Helen",
// 	"Jessica",
// 	"Uche",
// 	"Peter",
// 	"Mitch",
// 	"Tomiwa",
// 	"Michael",
// 	"Promise",
// 	"Nike",
// 	"Tunmise",
// 	"Joke",
// ];

// const PRIORITY_OPTIONS: {
// 	value: PriorityValue;
// 	label: PriorityLabel;
// 	color: string;
// }[] = [
// 	{ value: "low", label: "Low", color: "#10b981" },
// 	{ value: "medium", label: "Medium", color: "#f59e0b" },
// 	{ value: "high", label: "High", color: "#ef4444" },
// 	{ value: "urgent", label: "Urgent", color: "#a855f7" },
// ];

// const STATUS_OPTIONS: { value: StatusValue; label: StatusLabel }[] = [
// 	{ value: "pending", label: "Not Started" },
// 	{ value: "in_progress", label: "In Progress" },
// 	{ value: "review", label: "Waiting for input" },
// 	{ value: "completed", label: "Completed" },
// 	{ value: "cancelled", label: "Deferred" },
// ];

// const STATUS_DISPLAY_OPTIONS = [
// 	{ label: "Not Started", value: "Not Started" },
// 	{ label: "In Progress", value: "In Progress" },
// 	{ label: "Waiting for input", value: "Waiting for input" },
// 	{ label: "Completed", value: "Completed" },
// 	{ label: "Deferred", value: "Deferred" },
// ];

// const PRIORITY_COLORS: Record<string, string> = {
// 	High: "#ef4444",
// 	Highest: "#a855f7",
// 	Normal: "#f59e0b",
// 	Medium: "#f59e0b",
// 	Low: "#10b981",
// 	Lowest: "#10b981",
// 	Urgent: "#a855f7",
// };

// const STATUS_BADGE_MAP: Record<
// 	string,
// 	{ bg: string; color: string; border: string }
// > = {
// 	Completed: { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" },
// 	"In Progress": { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
// 	Deferred: { bg: "#f4f4f5", color: "#52525b", border: "#e4e4e7" },
// 	"Not Started": { bg: "#FFF8DC", color: "#1B3B5F", border: "#F9C319" },
// 	"Waiting for input": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
// };

// const inputCls =
// 	"w-full px-4 py-3 text-sm border border-transparent rounded-xl " +
// 	"outline-none transition-all duration-200 cursor-text " +
// 	"placeholder:text-[#b0b8c8] text-[#1a1a2e]";

// const inputStyle = { background: "#f5f7fa" };
// const inputFocusStyle = { background: "#ffffff", borderColor: "#1B3B5F" };
// const selectCls = `${inputCls} cursor-pointer`;
// const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aeaeb2' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

// interface LabelProps {
// 	icon?: IconType;
// 	text: string;
// 	required?: boolean;
// }
// const Label = ({ icon: Icon, text, required }: LabelProps) => (
// 	<label
// 		className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold mb-2"
// 		style={{ color: "#6b7a99" }}
// 	>
// 		{Icon && <Icon size={11} />}
// 		{text}
// 		{required && <span style={{ color: "#ef4444" }}>*</span>}
// 	</label>
// );

// interface FocusInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
// const FocusInput = ({ style: extStyle, ...props }: FocusInputProps) => {
// 	const [focused, setFocused] = useState(false);
// 	return (
// 		<input
// 			{...props}
// 			className={inputCls}
// 			style={{ ...(focused ? inputFocusStyle : inputStyle), ...extStyle }}
// 			onFocus={() => setFocused(true)}
// 			onBlur={() => setFocused(false)}
// 		/>
// 	);
// };

// interface FocusSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
// 	extraStyle?: React.CSSProperties;
// }
// const FocusSelect = ({ extraStyle, children, ...props }: FocusSelectProps) => {
// 	const [focused, setFocused] = useState(false);
// 	return (
// 		<select
// 			{...props}
// 			className={`${selectCls} appearance-none`}
// 			style={{
// 				...(focused ? inputFocusStyle : inputStyle),
// 				backgroundImage: chevronBg,
// 				backgroundRepeat: "no-repeat",
// 				backgroundPosition: "right 10px center",
// 				paddingRight: "30px",
// 				...extraStyle,
// 			}}
// 			onFocus={() => setFocused(true)}
// 			onBlur={() => setFocused(false)}
// 		>
// 			{children}
// 		</select>
// 	);
// };

// type FocusTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
// const FocusTextarea = ({ className = "", ...props }: FocusTextareaProps) => {
// 	const [focused, setFocused] = useState(false);
// 	return (
// 		<textarea
// 			{...props}
// 			className={`${inputCls} resize-none leading-relaxed ${className}`}
// 			style={focused ? inputFocusStyle : inputStyle}
// 			onFocus={() => setFocused(true)}
// 			onBlur={() => setFocused(false)}
// 		/>
// 	);
// };

// const StatusBadge = ({ status }: { status: string }) => {
// 	const s = STATUS_BADGE_MAP[status] ?? {
// 		bg: "#f4f4f5",
// 		color: "#52525b",
// 		border: "#e4e4e7",
// 	};
// 	return (
// 		<span
// 			className="text-[10px] px-3 py-1 rounded-full font-semibold flex-shrink-0 whitespace-nowrap"
// 			style={{
// 				background: s.bg,
// 				color: s.color,
// 				border: `1px solid ${s.border}`,
// 			}}
// 		>
// 			{status}
// 		</span>
// 	);
// };

// const PriorityPill = ({ priority }: { priority: string }) => {
// 	const color = PRIORITY_COLORS[priority] ?? "#94a3b8";
// 	return (
// 		<span
// 			className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap"
// 			style={{
// 				background: `${color}14`,
// 				color,
// 				border: `1px solid ${color}30`,
// 			}}
// 		>
// 			<span
// 				className="w-1 h-1 rounded-full flex-shrink-0"
// 				style={{ background: color }}
// 			/>
// 			{priority}
// 		</span>
// 	);
// };

// const PrimaryBtn = ({
// 	children,
// 	disabled,
// 	onClick,
// 	type = "button",
// }: {
// 	children: React.ReactNode;
// 	disabled?: boolean;
// 	onClick?: (e: React.MouseEvent) => void;
// 	type?: "button" | "submit" | "reset";
// }) => (
// 	<button
// 		type={type}
// 		disabled={disabled}
// 		onClick={onClick}
// 		className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
// 		style={{ background: NAVY }}
// 	>
// 		{children}
// 	</button>
// );

// const Card = ({ children }: { children: React.ReactNode }) => (
// 	<div
// 		className="rounded-2xl p-6 sm:p-8"
// 		style={{
// 			background: "#ffffff",
// 			border: "1px solid #e8edf5",
// 			boxShadow: "0 2px 16px rgba(27,59,95,0.06)",
// 		}}
// 	>
// 		{children}
// 	</div>
// );

// const StepHeader = ({
// 	iconBg,
// 	icon: Icon,
// 	iconColor,
// 	title,
// 	sub,
// }: {
// 	iconBg: string;
// 	icon: IconType;
// 	iconColor: string;
// 	title: string;
// 	sub: React.ReactNode;
// }) => (
// 	<div className="flex items-center gap-3 mb-5">
// 		<div
// 			className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
// 			style={{ background: iconBg }}
// 		>
// 			<Icon size={20} color={iconColor} />
// 		</div>
// 		<div>
// 			<h2
// 				className="text-base font-bold"
// 				style={{
// 					color: "#1a1a2e",
// 					fontFamily: "'Bricolage Grotesque', sans-serif",
// 				}}
// 			>
// 				{title}
// 			</h2>
// 			<p className="text-[11px]" style={{ color: "#8896ae" }}>
// 				{sub}
// 			</p>
// 		</div>
// 	</div>
// );

// const Hero = () => (
// 	<div className="w-full py-10 px-5 mt-20" style={{ background: NAVY }}>
// 		<div className="mx-auto" style={{ maxWidth: 560 }}>
// 			<div
// 				className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-[10px] font-semibold tracking-widest uppercase"
// 				style={{
// 					border: `1px solid ${GOLD}`,
// 					color: GOLD,
// 					background: `${GOLD}14`,
// 				}}
// 			>
// 				<span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
// 				Self-Service Tasks
// 			</div>
// 			<h1
// 				className="text-white font-extrabold leading-tight mb-3"
// 				style={{
// 					fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
// 					fontFamily: "'Bricolage Grotesque', sans-serif",
// 					letterSpacing: "-0.02em",
// 				}}
// 			>
// 				Track your tasks with the <span style={{ color: GOLD }}>Obana</span>{" "}
// 				team.
// 			</h1>
// 			<p
// 				className="text-sm leading-relaxed"
// 				style={{ color: "#ffffff99", maxWidth: 420 }}
// 			>
// 				Enter your email to view tasks linked to you, or create a new one. No
// 				login required.
// 			</p>
// 		</div>
// 	</div>
// );

// interface StepEmailProps {
// 	email: string;
// 	setEmail: (v: string) => void;
// 	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// 	loading: boolean;
// 	error?: string | null;
// }
// const StepEmail = ({
// 	email,
// 	setEmail,
// 	onSubmit,
// 	loading,
// 	error,
// }: StepEmailProps) => (
// 	<Card>
// 		<StepHeader
// 			iconBg={GOLD_LIGHT}
// 			icon={MdEmail}
// 			iconColor={NAVY}
// 			title="Let's get started"
// 			sub="Enter your email to find or create your profile."
// 		/>
// 		<form onSubmit={onSubmit} className="space-y-3">
// 			<div>
// 				<Label icon={MdEmail} text="Email address" required />
// 				<FocusInput
// 					type="email"
// 					required
// 					autoFocus
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 					placeholder="you@yourbusiness.com"
// 				/>
// 			</div>
// 			{error && (
// 				<p className="text-xs" style={{ color: "#ef4444" }}>
// 					{error}
// 				</p>
// 			)}
// 			<PrimaryBtn type="submit" disabled={loading || !email.includes("@")}>
// 				{loading ? "Checking..." : "Continue"}
// 				{!loading && <MdArrowForward size={16} />}
// 			</PrimaryBtn>
// 		</form>
// 	</Card>
// );

// interface StepConfirmProps {
// 	email: string;
// 	name: string;
// 	onConfirm: () => void;
// 	onNotMe: () => void;
// 	loading: boolean;
// 	error?: string | null;
// }
// const StepConfirm = ({
// 	email,
// 	name,
// 	onConfirm,
// 	onNotMe,
// 	loading,
// 	error,
// }: StepConfirmProps) => (
// 	<Card>
// 		<StepHeader
// 			iconBg="#ecfdf5"
// 			icon={MdCheckCircle}
// 			iconColor="#059669"
// 			title="Is this you?"
// 			sub={
// 				<>
// 					We found a profile linked to <strong>{email}</strong>.
// 				</>
// 			}
// 		/>
// 		<div
// 			className="rounded-xl p-4 mb-5"
// 			style={{ background: "#f5f7fa", border: "1px solid #e8edf5" }}
// 		>
// 			<p
// 				className="text-[10px] uppercase tracking-widest font-semibold mb-1"
// 				style={{ color: "#8896ae" }}
// 			>
// 				Name on file
// 			</p>
// 			<p className="text-base font-bold" style={{ color: NAVY }}>
// 				{name}
// 			</p>
// 		</div>
// 		{error && (
// 			<p className="text-xs mb-3" style={{ color: "#ef4444" }}>
// 				{error}
// 			</p>
// 		)}
// 		<div className="flex gap-3">
// 			<button
// 				onClick={onNotMe}
// 				className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
// 				style={{
// 					border: "1px solid #e8edf5",
// 					color: "#4a5568",
// 					background: "#ffffff",
// 				}}
// 			>
// 				Not me
// 			</button>
// 			<button
// 				onClick={onConfirm}
// 				disabled={loading}
// 				className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
// 				style={{ background: NAVY }}
// 			>
// 				{loading ? "..." : "Yes, continue"}
// 				{!loading && <MdArrowForward size={15} />}
// 			</button>
// 		</div>
// 	</Card>
// );

// interface StepNameProps {
// 	email: string;
// 	firstName: string;
// 	lastName: string;
// 	setFirst: (v: string) => void;
// 	setLast: (v: string) => void;
// 	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// 	onBack: () => void;
// 	loading: boolean;
// 	error?: string | null;
// }
// const StepName = ({
// 	email,
// 	firstName,
// 	lastName,
// 	setFirst,
// 	setLast,
// 	onSubmit,
// 	onBack,
// 	loading,
// 	error,
// }: StepNameProps) => (
// 	<Card>
// 		<StepHeader
// 			iconBg={GOLD_LIGHT}
// 			icon={RiUserLine}
// 			iconColor={NAVY}
// 			title="Tell us your name"
// 			sub={
// 				<>
// 					Creating a profile for <strong>{email}</strong>
// 				</>
// 			}
// 		/>
// 		<form onSubmit={onSubmit} className="space-y-3">
// 			<div className="grid grid-cols-2 gap-3">
// 				<div>
// 					<Label icon={RiUserLine} text="First name" required />
// 					<FocusInput
// 						type="text"
// 						required
// 						value={firstName}
// 						onChange={(e) => setFirst(e.target.value)}
// 						placeholder="First"
// 					/>
// 				</div>
// 				<div>
// 					<Label icon={RiUserLine} text="Last name" required />
// 					<FocusInput
// 						type="text"
// 						required
// 						value={lastName}
// 						onChange={(e) => setLast(e.target.value)}
// 						placeholder="Last"
// 					/>
// 				</div>
// 			</div>
// 			{error && (
// 				<p className="text-xs" style={{ color: "#ef4444" }}>
// 					{error}
// 				</p>
// 			)}
// 			<PrimaryBtn type="submit" disabled={loading}>
// 				{loading ? "Creating..." : "Continue"}
// 				{!loading && <MdArrowForward size={16} />}
// 			</PrimaryBtn>
// 			<button
// 				type="button"
// 				onClick={onBack}
// 				className="w-full text-xs transition-colors pt-1 cursor-pointer"
// 				style={{ color: "#8896ae" }}
// 			>
// 				Use a different email
// 			</button>
// 		</form>
// 	</Card>
// );

// const TaskCard = ({ task, email }: { task: PublicTask; email: string }) => {
// 	const [editingStatus, setEditingStatus] = useState(false);
// 	const [selectedStatus, setSelectedStatus] = useState(task.Status);
// 	const updateStatus = useUpdateTaskStatus(email);

// 	const staffDisplay = task.Staff_Name || task.Owner?.name || null;

// 	const handleStatusSave = async () => {
// 		if (selectedStatus === task.Status) {
// 			setEditingStatus(false);
// 			return;
// 		}
// 		await updateStatus.mutateAsync({ taskId: task.id, status: selectedStatus });
// 		setEditingStatus(false);
// 	};

// 	return (
// 		<div
// 			className="rounded-2xl p-4 transition-all duration-200"
// 			style={{
// 				background: "#ffffff",
// 				border: "1px solid #e8edf5",
// 				boxShadow: "0 1px 4px rgba(27,59,95,0.04)",
// 			}}
// 		>
// 			<div className="flex items-start justify-between gap-3 mb-2">
// 				<div className="min-w-0 flex-1">
// 					<p
// 						className="text-[9px] uppercase tracking-widest font-semibold mb-1"
// 						style={{ color: "#8896ae" }}
// 					>
// 						Subject
// 					</p>
// 					<h3
// 						className="font-semibold text-sm leading-snug"
// 						style={{ color: NAVY }}
// 					>
// 						{task.Subject}
// 					</h3>
// 				</div>
// 				<StatusBadge status={task.Status} />
// 			</div>

// 			{task.Description && (
// 				<div className="mb-3">
// 					<p
// 						className="text-[9px] uppercase tracking-widest font-semibold mb-1"
// 						style={{ color: "#8896ae" }}
// 					>
// 						Description
// 					</p>
// 					<p className="text-xs leading-relaxed" style={{ color: "#6b7a99" }}>
// 						{task.Description}
// 					</p>
// 				</div>
// 			)}

// 			<div className="pt-3 mt-1" style={{ borderTop: "1px solid #f0f3f8" }}>
// 				<div className="flex flex-wrap items-center justify-between gap-2">
// 					<div className="flex flex-wrap items-center gap-2">
// 						<div className="flex flex-col gap-1">
// 							<p
// 								className="text-[9px] uppercase tracking-widest font-semibold"
// 								style={{ color: "#8896ae" }}
// 							>
// 								Priority
// 							</p>
// 							<PriorityPill priority={task.Priority} />
// 						</div>

// 						{task.Due_Date && (
// 							<div className="flex flex-col gap-1">
// 								<p
// 									className="text-[9px] uppercase tracking-widest font-semibold"
// 									style={{ color: "#8896ae" }}
// 								>
// 									Due Date
// 								</p>
// 								<span
// 									className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg"
// 									style={{
// 										background: "#f5f7fa",
// 										color: NAVY,
// 										border: "1px solid #e8edf5",
// 									}}
// 								>
// 									<MdCalendarToday size={10} />
// 									{task.Due_Date}
// 								</span>
// 							</div>
// 						)}

// 						{staffDisplay && (
// 							<div className="flex flex-col gap-1">
// 								<p
// 									className="text-[9px] uppercase tracking-widest font-semibold"
// 									style={{ color: "#8896ae" }}
// 								>
// 									Assigned
// 								</p>
// 								<span
// 									className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg"
// 									style={{
// 										background: "#f5f7fa",
// 										color: NAVY,
// 										border: "1px solid #e8edf5",
// 									}}
// 								>
// 									<RiUserLine size={10} />
// 									{staffDisplay}
// 								</span>
// 							</div>
// 						)}
// 					</div>

// 					<div className="flex-shrink-0 self-end">
// 						{editingStatus ? (
// 							<div className="flex items-center gap-2">
// 								<div className="relative">
// 									<select
// 										value={selectedStatus}
// 										onChange={(e) => setSelectedStatus(e.target.value)}
// 										className="pl-2 pr-6 py-2 text-[10px] font-semibold rounded-lg border outline-none cursor-pointer appearance-none"
// 										style={{
// 											background: "#f5f7fa",
// 											borderColor: "#1B3B5F",
// 											color: NAVY,
// 											backgroundImage: chevronBg,
// 											backgroundRepeat: "no-repeat",
// 											backgroundPosition: "right 6px center",
// 										}}
// 									>
// 										{STATUS_DISPLAY_OPTIONS.map((o) => (
// 											<option key={o.value} value={o.value}>
// 												{o.label}
// 											</option>
// 										))}
// 									</select>
// 								</div>
// 								<button
// 									onClick={handleStatusSave}
// 									disabled={updateStatus.isPending}
// 									className="flex items-center gap-1 px-2 py-2 rounded-lg text-[10px] font-semibold text-white disabled:opacity-50 cursor-pointer flex-shrink-0"
// 									style={{ background: "#059669" }}
// 								>
// 									<MdCheck size={12} />
// 									{updateStatus.isPending ? "..." : "Save"}
// 								</button>
// 								<button
// 									onClick={() => {
// 										setEditingStatus(false);
// 										setSelectedStatus(task.Status);
// 									}}
// 									className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 cursor-pointer"
// 									style={{ background: "#f0f3f8", color: "#8896ae" }}
// 								>
// 									<MdClose size={12} />
// 								</button>
// 							</div>
// 						) : (
// 							<button
// 								onClick={() => setEditingStatus(true)}
// 								className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[10px] font-semibold transition-all cursor-pointer"
// 								style={{
// 									background: "#f5f7fa",
// 									color: NAVY,
// 									border: "1px solid #e8edf5",
// 								}}
// 							>
// 								<MdEdit size={11} />
// 								Update
// 								<MdKeyboardArrowDown size={12} />
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const TaskCountBadge = ({
// 	label,
// 	count,
// 	color,
// 	bg,
// }: {
// 	label: string;
// 	count: number;
// 	color: string;
// 	bg: string;
// }) => (
// 	<div
// 		className="rounded-xl p-3 flex flex-col gap-1"
// 		style={{ background: bg, border: `1px solid ${color}20` }}
// 	>
// 		<span
// 			className="text-lg font-extrabold"
// 			style={{ color, fontFamily: "'Bricolage Grotesque', sans-serif" }}
// 		>
// 			{count}
// 		</span>
// 		<span
// 			className="text-[8px] md:text-[9px] font-semibold uppercase tracking-widest leading-tight"
// 			style={{ color: `${color}99` }}
// 		>
// 			{label}
// 		</span>
// 	</div>
// );

// interface StepListProps {
// 	user: ConfirmedUser;
// 	tasks: PublicTask[];
// 	loading: boolean;
// 	onNewTask: () => void;
// 	onSignOut: () => void;
// }

// const StepList = ({
// 	user,
// 	tasks,
// 	loading,
// 	onNewTask,
// 	onSignOut,
// }: StepListProps) => {
// 	const [search, setSearch] = useState("");
// 	const [filterStatus, setFilterStatus] = useState("all");
// 	const [filterPriority, setFilterPriority] = useState("all");
// 	const [showFilters, setShowFilters] = useState(false);
// 	const [page, setPage] = useState(1);
// 	const PAGE_SIZE = 5;

// 	const urgentCount = tasks.filter(
// 		(t) => t.Priority === "Highest" || t.Priority === "Urgent"
// 	).length;
// 	const inProgressCount = tasks.filter(
// 		(t) => t.Status === "In Progress"
// 	).length;
// 	const completedCount = tasks.filter((t) => t.Status === "Completed").length;
// 	const pendingCount = tasks.filter((t) => t.Status === "Not Started").length;

// 	const filtered = tasks.filter((t) => {
// 		const matchSearch =
// 			!search ||
// 			t.Subject.toLowerCase().includes(search.toLowerCase()) ||
// 			(t.Description ?? "").toLowerCase().includes(search.toLowerCase());
// 		const matchStatus = filterStatus === "all" || t.Status === filterStatus;
// 		const matchPriority =
// 			filterPriority === "all" || t.Priority === filterPriority;
// 		return matchSearch && matchStatus && matchPriority;
// 	});

// 	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
// 	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
// 	const hasFilters =
// 		filterStatus !== "all" || filterPriority !== "all" || !!search;

// 	const clearFilters = () => {
// 		setSearch("");
// 		setFilterStatus("all");
// 		setFilterPriority("all");
// 		setPage(1);
// 	};

// 	return (
// 		<div className="space-y-4">
// 			<div
// 				className="rounded-2xl px-4 py-3 flex items-center justify-between"
// 				style={{
// 					background: "#ffffff",
// 					border: "1px solid #e8edf5",
// 					boxShadow: "0 2px 16px rgba(27,59,95,0.06)",
// 				}}
// 			>
// 				<div className="flex items-center gap-3 min-w-0">
// 					<div
// 						className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
// 						style={{ background: NAVY, color: GOLD }}
// 					>
// 						{user.name
// 							.split(" ")
// 							.map((n: string) => n[0])
// 							.slice(0, 2)
// 							.join("")
// 							.toUpperCase()}
// 					</div>
// 					<div className="min-w-0">
// 						<p className="text-sm font-bold truncate" style={{ color: NAVY }}>
// 							{user.name}
// 						</p>
// 						<p className="text-[11px] truncate" style={{ color: "#8896ae" }}>
// 							{user.email}
// 						</p>
// 					</div>
// 				</div>
// 				<div className="flex items-center gap-2 flex-shrink-0">
// 					<button
// 						onClick={onNewTask}
// 						className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer"
// 						style={{ background: NAVY }}
// 					>
// 						<MdAdd size={13} />
// 						<span className="hidden sm:inline">New task</span>
// 						<span className="sm:hidden">New</span>
// 					</button>
// 					<button
// 						onClick={onSignOut}
// 						className="flex items-center gap-1 text-[11px] px-1 transition-colors cursor-pointer"
// 						style={{ color: "#8896ae" }}
// 					>
// 						<MdLogout size={12} />
// 						<span className="hidden sm:inline">Out</span>
// 					</button>
// 				</div>
// 			</div>

// 			{loading ? (
// 				<div className="space-y-2">
// 					{[1, 2, 3].map((i) => (
// 						<div
// 							key={i}
// 							className="h-28 rounded-2xl animate-pulse"
// 							style={{ background: "#f0f3f8", border: "1px solid #e8edf5" }}
// 						/>
// 					))}
// 				</div>
// 			) : (
// 				<>
// 					{tasks.length > 0 && (
// 						<div className="grid grid-cols-4 gap-2">
// 							<TaskCountBadge
// 								label="Urgent"
// 								count={urgentCount}
// 								color="#a855f7"
// 								bg="#fdf4ff"
// 							/>
// 							<TaskCountBadge
// 								label="In Progress"
// 								count={inProgressCount}
// 								color="#2563eb"
// 								bg="#eff6ff"
// 							/>
// 							<TaskCountBadge
// 								label="Pending"
// 								count={pendingCount}
// 								color="#d97706"
// 								bg="#fffbeb"
// 							/>
// 							<TaskCountBadge
// 								label="Done"
// 								count={completedCount}
// 								color="#059669"
// 								bg="#ecfdf5"
// 							/>
// 						</div>
// 					)}

// 					<div className="space-y-2">
// 						<div className="flex items-center gap-2">
// 							<div className="flex-1 relative">
// 								<MdSearch
// 									size={15}
// 									className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
// 									style={{ color: "#8896ae" }}
// 								/>
// 								<input
// 									type="text"
// 									value={search}
// 									onChange={(e) => {
// 										setSearch(e.target.value);
// 										setPage(1);
// 									}}
// 									placeholder="Search tasks..."
// 									className="w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-all cursor-text"
// 									style={{
// 										background: "#ffffff",
// 										border: "1px solid #e8edf5",
// 										color: "#1a1a2e",
// 									}}
// 								/>
// 							</div>
// 							<button
// 								onClick={() => setShowFilters((v) => !v)}
// 								className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 cursor-pointer"
// 								style={{
// 									background: showFilters ? NAVY : "#ffffff",
// 									color: showFilters ? "#ffffff" : NAVY,
// 									border: `1px solid ${showFilters ? NAVY : "#e8edf5"}`,
// 								}}
// 							>
// 								<MdFilterList size={14} />
// 								<span className="hidden sm:inline">Filter</span>
// 							</button>
// 						</div>

// 						{showFilters && (
// 							<div
// 								className="rounded-xl p-3 space-y-2"
// 								style={{ background: "#ffffff", border: "1px solid #e8edf5" }}
// 							>
// 								<div className="grid grid-cols-2 gap-2">
// 									<div>
// 										<Label text="Status" />
// 										<select
// 											value={filterStatus}
// 											onChange={(e) => {
// 												setFilterStatus(e.target.value);
// 												setPage(1);
// 											}}
// 											className="w-full px-3 py-2 text-xs rounded-lg outline-none cursor-pointer appearance-none"
// 											style={{
// 												background: "#f5f7fa",
// 												border: "1px solid #e8edf5",
// 												color: NAVY,
// 												backgroundImage: chevronBg,
// 												backgroundRepeat: "no-repeat",
// 												backgroundPosition: "right 8px center",
// 												paddingRight: "26px",
// 											}}
// 										>
// 											<option value="all">All statuses</option>
// 											{STATUS_DISPLAY_OPTIONS.map((o) => (
// 												<option key={o.value} value={o.value}>
// 													{o.label}
// 												</option>
// 											))}
// 										</select>
// 									</div>
// 									<div>
// 										<Label text="Priority" />
// 										<select
// 											value={filterPriority}
// 											onChange={(e) => {
// 												setFilterPriority(e.target.value);
// 												setPage(1);
// 											}}
// 											className="w-full px-3 py-2 text-xs rounded-lg outline-none cursor-pointer appearance-none"
// 											style={{
// 												background: "#f5f7fa",
// 												border: "1px solid #e8edf5",
// 												color: NAVY,
// 												backgroundImage: chevronBg,
// 												backgroundRepeat: "no-repeat",
// 												backgroundPosition: "right 8px center",
// 												paddingRight: "26px",
// 											}}
// 										>
// 											<option value="all">All priorities</option>
// 											{["Highest", "High", "Normal", "Low", "Lowest"].map(
// 												(p) => (
// 													<option key={p} value={p}>
// 														{p}
// 													</option>
// 												)
// 											)}
// 										</select>
// 									</div>
// 								</div>
// 								{hasFilters && (
// 									<button
// 										onClick={clearFilters}
// 										className="text-xs font-semibold cursor-pointer"
// 										style={{ color: "#ef4444" }}
// 									>
// 										Clear filters
// 									</button>
// 								)}
// 							</div>
// 						)}
// 					</div>

// 					<div className="flex items-center justify-between px-1">
// 						<h3
// 							className="text-sm font-bold"
// 							style={{
// 								color: NAVY,
// 								fontFamily: "'Bricolage Grotesque', sans-serif",
// 							}}
// 						>
// 							Your tasks
// 						</h3>
// 						<span
// 							className="text-[10px] uppercase tracking-widest font-semibold"
// 							style={{ color: "#8896ae" }}
// 						>
// 							{filtered.length} of {tasks.length}
// 						</span>
// 					</div>

// 					{filtered.length === 0 ? (
// 						<div
// 							className="rounded-2xl p-10 text-center"
// 							style={{ background: "#ffffff", border: "1px solid #e8edf5" }}
// 						>
// 							<div
// 								className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
// 								style={{ background: GOLD_LIGHT }}
// 							>
// 								<MdOutlineInbox size={22} color={NAVY} />
// 							</div>
// 							{tasks.length === 0 ? (
// 								<>
// 									<p className="text-sm font-bold mb-1" style={{ color: NAVY }}>
// 										No tasks yet
// 									</p>
// 									<p className="text-xs mb-5" style={{ color: "#8896ae" }}>
// 										Create your first task and our team will pick it up.
// 									</p>
// 									<button
// 										onClick={onNewTask}
// 										className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer"
// 										style={{ background: NAVY }}
// 									>
// 										<MdAdd size={13} /> Create a task
// 									</button>
// 								</>
// 							) : (
// 								<>
// 									<p className="text-sm font-bold mb-1" style={{ color: NAVY }}>
// 										No matches
// 									</p>
// 									<p className="text-xs mb-4" style={{ color: "#8896ae" }}>
// 										Try adjusting your filters or search.
// 									</p>
// 									<button
// 										onClick={clearFilters}
// 										className="text-xs font-semibold cursor-pointer"
// 										style={{ color: NAVY }}
// 									>
// 										Clear filters
// 									</button>
// 								</>
// 							)}
// 						</div>
// 					) : (
// 						<>
// 							<div className="space-y-3">
// 								{paginated.map((t) => (
// 									<TaskCard key={t.id} task={t} email={user.email} />
// 								))}
// 							</div>

// 							{totalPages > 1 && (
// 								<div className="flex items-center justify-between pt-2">
// 									<button
// 										onClick={() => setPage((p) => Math.max(1, p - 1))}
// 										disabled={page === 1}
// 										className="px-3 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer"
// 										style={{
// 											background: "#ffffff",
// 											border: "1px solid #e8edf5",
// 											color: NAVY,
// 										}}
// 									>
// 										← Prev
// 									</button>
// 									<div className="flex items-center gap-1">
// 										{Array.from({ length: totalPages }, (_, i) => i + 1).map(
// 											(p) => (
// 												<button
// 													key={p}
// 													onClick={() => setPage(p)}
// 													className="w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer"
// 													style={{
// 														background: page === p ? NAVY : "#f5f7fa",
// 														color: page === p ? "#ffffff" : "#8896ae",
// 														border: `1px solid ${page === p ? NAVY : "#e8edf5"}`,
// 													}}
// 												>
// 													{p}
// 												</button>
// 											)
// 										)}
// 									</div>
// 									<button
// 										onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
// 										disabled={page === totalPages}
// 										className="px-3 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer"
// 										style={{
// 											background: "#ffffff",
// 											border: "1px solid #e8edf5",
// 											color: NAVY,
// 										}}
// 									>
// 										Next →
// 									</button>
// 								</div>
// 							)}
// 						</>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// interface CreateTaskModalProps {
// 	user: ConfirmedUser;
// 	onClose: () => void;
// 	onCreated: () => void;
// }
// const CreateTaskModal = ({
// 	user,
// 	onClose,
// 	onCreated,
// }: CreateTaskModalProps) => {
// 	const [subject, setSubject] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [priority, setPriority] = useState<PriorityValue>("medium");
// 	const [status, setStatus] = useState<StatusValue>("pending");
// 	const [dueDate, setDueDate] = useState("");
// 	const [staffName, setStaffName] = useState(STAFF_OPTIONS[0]);
// 	const [errorMsg, setErrorMsg] = useState<string | null>(null);
// 	const createTask = useCreatePublicTask();
// 	const priorityColor =
// 		PRIORITY_OPTIONS.find((p) => p.value === priority)?.color ?? "#f59e0b";

// 	const onSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!subject.trim() || !dueDate || !staffName) return;
// 		setErrorMsg(null);
// 		try {
// 			await createTask.mutateAsync({
// 				email: user.email,
// 				contact_id: user.contact_id,
// 				subject: subject.trim(),
// 				description: description.trim() || undefined,
// 				priority,
// 				status,
// 				dueDate,
// 				staffName,
// 			});
// 			onCreated();
// 		} catch (err: unknown) {
// 			setErrorMsg(
// 				(err as { message?: string })?.message ??
// 					"Failed to create task. Please try again."
// 			);
// 		}
// 	};

// 	return (
// 		<div
// 			className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
// 			style={{ background: "rgba(15,28,46,0.55)", backdropFilter: "blur(4px)" }}
// 		>
// 			<div
// 				className="w-full flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl"
// 				style={{
// 					background: "#ffffff",
// 					boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
// 					maxWidth: 480,
// 					maxHeight: "92vh",
// 				}}
// 			>
// 				<div
// 					className="flex items-center justify-between px-5 py-4 flex-shrink-0"
// 					style={{ borderBottom: "1px solid #e8edf5", background: "#fafbfc" }}
// 				>
// 					<div className="flex items-center gap-3">
// 						<div
// 							className="w-8 h-8 rounded-lg flex items-center justify-center"
// 							style={{ background: GOLD_LIGHT }}
// 						>
// 							<BiTask size={15} color={NAVY} />
// 						</div>
// 						<div>
// 							<h2
// 								className="text-sm font-bold"
// 								style={{
// 									color: NAVY,
// 									fontFamily: "'Bricolage Grotesque', sans-serif",
// 								}}
// 							>
// 								Create new task
// 							</h2>
// 							<p className="text-[10px]" style={{ color: "#8896ae" }}>
// 								Linked to {user.name}
// 							</p>
// 						</div>
// 					</div>
// 					<button
// 						onClick={onClose}
// 						className="p-1 rounded-lg transition-colors cursor-pointer"
// 						style={{ color: "#8896ae" }}
// 					>
// 						<MdClose size={16} />
// 					</button>
// 				</div>

// 				<form
// 					onSubmit={onSubmit}
// 					className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
// 				>
// 					<div>
// 						<Label icon={MdWork} text="Subject" required />
// 						<FocusInput
// 							type="text"
// 							required
// 							autoFocus
// 							value={subject}
// 							onChange={(e) => setSubject(e.target.value)}
// 							placeholder="What needs to be done?"
// 						/>
// 					</div>

// 					<div>
// 						<Label icon={MdNotes} text="Description" required />
// 						<FocusTextarea
// 							required
// 							rows={3}
// 							value={description}
// 							onChange={(e) => setDescription(e.target.value)}
// 							placeholder="Add context, links, or requirements..."
// 						/>
// 					</div>

// 					<div className="grid grid-cols-2 gap-3">
// 						<div>
// 							<Label icon={RiTeamLine} text="Assign to" required />
// 							<FocusSelect
// 								required
// 								value={staffName}
// 								onChange={(e) => setStaffName(e.target.value)}
// 							>
// 								{STAFF_OPTIONS.map((s) => (
// 									<option key={s} value={s}>
// 										{s}
// 									</option>
// 								))}
// 							</FocusSelect>
// 						</div>
// 						<div>
// 							<Label icon={MdCalendarToday} text="Due date" required />
// 							<FocusInput
// 								type="date"
// 								required
// 								value={dueDate}
// 								onChange={(e) => setDueDate(e.target.value)}
// 							/>
// 						</div>
// 					</div>

// 					<div className="grid grid-cols-2 gap-3">
// 						<div>
// 							<Label icon={MdLabel} text="Priority" required />
// 							<FocusSelect
// 								required
// 								value={priority}
// 								onChange={(e) => setPriority(e.target.value as PriorityValue)}
// 								extraStyle={{ color: priorityColor, fontWeight: 600 }}
// 							>
// 								{PRIORITY_OPTIONS.map((o) => (
// 									<option key={o.value} value={o.value}>
// 										{o.label}
// 									</option>
// 								))}
// 							</FocusSelect>
// 						</div>
// 						<div>
// 							<Label icon={MdTaskAlt} text="Status" required />
// 							<FocusSelect
// 								required
// 								value={status}
// 								onChange={(e) => setStatus(e.target.value as StatusValue)}
// 							>
// 								{STATUS_OPTIONS.map((o) => (
// 									<option key={o.value} value={o.value}>
// 										{o.label}
// 									</option>
// 								))}
// 							</FocusSelect>
// 						</div>
// 					</div>

// 					{errorMsg && (
// 						<p className="text-xs" style={{ color: "#ef4444" }}>
// 							{errorMsg}
// 						</p>
// 					)}
// 				</form>

// 				<div
// 					className="flex items-center justify-end gap-3 px-5 py-4 flex-shrink-0"
// 					style={{ borderTop: "1px solid #e8edf5", background: "#fafbfc" }}
// 				>
// 					<button
// 						onClick={onClose}
// 						className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
// 						style={{
// 							border: "1px solid #e8edf5",
// 							background: "#ffffff",
// 							color: "#4a5568",
// 						}}
// 					>
// 						Cancel
// 					</button>
// 					<button
// 						onClick={onSubmit}
// 						disabled={
// 							createTask.isPending || !subject.trim() || !dueDate || !staffName
// 						}
// 						className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
// 						style={{ background: NAVY }}
// 					>
// 						{createTask.isPending ? "Creating..." : "Create task"}
// 						{!createTask.isPending && <MdArrowForward size={15} />}
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default function TasksPage() {
// 	const [step, setStep] = useState<Step>("email");
// 	const [email, setEmail] = useState("");
// 	const [firstName, setFirstName] = useState("");
// 	const [lastName, setLastName] = useState("");
// 	const [identifiedName, setIdentifiedName] = useState<string | null>(null);
// 	const [user, setUser] = useState<ConfirmedUser | null>(null);
// 	const [showCreate, setShowCreate] = useState(false);
// 	const [stepError, setStepError] = useState<string | null>(null);

// 	const identify = useIdentifyUser();
// 	const confirm = useConfirmUser();
// 	const { data: tasksData, isLoading: tasksLoading } = usePublicTasks(
// 		step === "list" ? email : null
// 	);

// 	const handleIdentify = async (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		if (!email.includes("@")) return;
// 		setStepError(null);
// 		try {
// 			const result = await identify.mutateAsync(email.toLowerCase().trim());
// 			if (result.found) {
// 				setIdentifiedName(result.name || null);
// 				setStep("confirm");
// 			} else setStep("name");
// 		} catch (err: unknown) {
// 			setStepError(
// 				(err as { message?: string })?.message ??
// 					"Something went wrong. Please try again."
// 			);
// 		}
// 	};

// 	const handleConfirmExisting = async () => {
// 		setStepError(null);
// 		try {
// 			const result = await confirm.mutateAsync({
// 				email: email.toLowerCase().trim(),
// 			});
// 			setUser(result);
// 			setStep("list");
// 		} catch (err: unknown) {
// 			setStepError(
// 				(err as { message?: string })?.message ??
// 					"Couldn't confirm your profile. Try again."
// 			);
// 		}
// 	};

// 	const handleSubmitNewName = async (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		if (!firstName.trim() && !lastName.trim()) return;
// 		setStepError(null);
// 		try {
// 			const result = await confirm.mutateAsync({
// 				email: email.toLowerCase().trim(),
// 				firstName: firstName.trim() || undefined,
// 				lastName: lastName.trim() || undefined,
// 			});
// 			setUser(result);
// 			setStep("list");
// 		} catch (err: unknown) {
// 			setStepError(
// 				(err as { message?: string })?.message ??
// 					"Couldn't create your profile. Try again."
// 			);
// 		}
// 	};

// 	const reset = () => {
// 		setStep("email");
// 		setEmail("");
// 		setFirstName("");
// 		setLastName("");
// 		setIdentifiedName(null);
// 		setUser(null);
// 		setShowCreate(false);
// 		setStepError(null);
// 	};

// 	return (
// 		<div
// 			// className="min-h-screen"
// 			style={{
// 				background: "#f5f7fa",
// 				fontFamily: "'Bricolage Grotesque', Inter, sans-serif",
// 			}}
// 		>
// 			<Hero />
// 			<div className="px-4 py-8 sm:py-12 flex justify-center">
// 				<div className="w-full" style={{ maxWidth: 560 }}>
// 					{step === "email" && (
// 						<StepEmail
// 							email={email}
// 							setEmail={setEmail}
// 							onSubmit={handleIdentify}
// 							loading={identify.isPending}
// 							error={stepError}
// 						/>
// 					)}
// 					{step === "confirm" && identifiedName && (
// 						<StepConfirm
// 							email={email}
// 							name={identifiedName}
// 							onConfirm={handleConfirmExisting}
// 							onNotMe={() => {
// 								setIdentifiedName(null);
// 								setStepError(null);
// 								setStep("name");
// 							}}
// 							loading={confirm.isPending}
// 							error={stepError}
// 						/>
// 					)}
// 					{step === "name" && (
// 						<StepName
// 							email={email}
// 							firstName={firstName}
// 							lastName={lastName}
// 							setFirst={setFirstName}
// 							setLast={setLastName}
// 							onSubmit={handleSubmitNewName}
// 							onBack={reset}
// 							loading={confirm.isPending}
// 							error={stepError}
// 						/>
// 					)}
// 					{step === "list" && user && (
// 						<StepList
// 							user={user}
// 							tasks={tasksData?.tasks ?? []}
// 							loading={tasksLoading}
// 							onNewTask={() => setShowCreate(true)}
// 							onSignOut={reset}
// 						/>
// 					)}
// 				</div>
// 			</div>
// 			{showCreate && user && (
// 				<CreateTaskModal
// 					user={user}
// 					onClose={() => setShowCreate(false)}
// 					onCreated={() => setShowCreate(false)}
// 				/>
// 			)}
// 		</div>
// 	);
// }

"use client";

import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
	memo,
} from "react";
import { createPortal } from "react-dom";
import {
	MdEmail,
	MdCheckCircle,
	MdAdd,
	MdClose,
	MdArrowForward,
	MdCalendarToday,
	MdLabel,
	MdWork,
	MdNotes,
	MdLogout,
	MdTaskAlt,
	MdOutlineInbox,
	MdFilterList,
	MdSearch,
	MdEdit,
	MdCheck,
	MdKeyboardArrowDown,
} from "react-icons/md";
import { RiUserLine, RiTeamLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { IconType } from "react-icons";
import {
	useIdentifyUser,
	useConfirmUser,
	usePublicTasks,
	useCreatePublicTask,
	useUpdateTaskStatus,
	type ConfirmedUser,
	type PublicTask,
} from "@/hooks/use-public-tasks";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

const NAVY       = "#1B3B5F";
const GOLD       = "#F9C319";
const GOLD_LIGHT = "#FFF8DC";

type Step          = "email" | "confirm" | "name" | "list";
type PriorityValue = "low" | "medium" | "high" | "urgent";
type StatusValue   = "pending" | "in_progress" | "review" | "completed" | "cancelled";

const EMPTY_TASKS: PublicTask[] = [];  // stable reference

const STAFF_OPTIONS = [
	"Somto", "Tobi", "Ola", "Helen", "Jessica", "Uche", "Peter",
	"Mitch", "Tomiwa", "Michael", "Promise", "Nike", "Tunmise", "Joke",
];

const PRIORITY_OPTIONS = [
	{ value: "low"    as const, label: "Low",     color: "#10b981" },
	{ value: "medium" as const, label: "Medium",  color: "#f59e0b" },
	{ value: "high"   as const, label: "High",    color: "#ef4444" },
	{ value: "urgent" as const, label: "Urgent",  color: "#a855f7" },
];

const STATUS_OPTIONS = [
	{ value: "pending"     as const, label: "Not Started" },
	{ value: "in_progress" as const, label: "In Progress" },
	{ value: "review"      as const, label: "Waiting for input" },
	{ value: "completed"   as const, label: "Completed" },
	{ value: "cancelled"   as const, label: "Deferred" },
];

const STATUS_DISPLAY_OPTIONS = [
	{ label: "Not Started",       value: "Not Started" },
	{ label: "In Progress",       value: "In Progress" },
	{ label: "Waiting for input", value: "Waiting for input" },
	{ label: "Completed",         value: "Completed" },
	{ label: "Deferred",          value: "Deferred" },
];

const FILTER_PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

const PRIORITY_COLORS: Record<string, string> = {
	Urgent: "#a855f7",
	High:   "#ef4444",
	Medium: "#f59e0b",
	Low:    "#10b981",
	// Legacy fallbacks for data from older sources
	Highest: "#a855f7",
	Normal:  "#f59e0b",
	Lowest:  "#10b981",
};

const STATUS_BADGE_MAP: Record<string, { bg: string; color: string; border: string }> = {
	"Completed":         { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" },
	"In Progress":       { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
	"Deferred":          { bg: "#f4f4f5", color: "#52525b", border: "#e4e4e7" },
	"Not Started":       { bg: "#FFF8DC", color: "#1B3B5F", border: "#F9C319" },
	"Waiting for input": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
};

/* Stable style objects — defined once at module scope so iOS doesn't
   see new style identity on every render (key cause of focus loss). */
const INPUT_STYLE_BLUR    = { background: "#f5f7fa", borderColor: "transparent" } as const;
const INPUT_STYLE_FOCUS   = { background: "#ffffff", borderColor: NAVY }           as const;

const CHEVRON_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aeaeb2' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

const INPUT_CLS  = "w-full px-4 py-3 text-sm border rounded-xl outline-none transition-colors duration-150 placeholder:text-[#b0b8c8] text-[#1a1a2e]";
const SELECT_CLS = `${INPUT_CLS} appearance-none`;

/* ─────────────────────────────────────────────────────────────
   PRIMITIVES — memoized to prevent iOS focus loss
   ───────────────────────────────────────────────────────────── */

interface LabelProps {
	icon?:     IconType;
	text:      string;
	required?: boolean;
}
const Label = memo(function Label({ icon: Icon, text, required }: LabelProps) {
	return (
		<label
			className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold mb-2"
			style={{ color: "#6b7a99" }}
		>
			{Icon && <Icon size={11} />}
			{text}
			{required && <span style={{ color: "#ef4444" }}>*</span>}
		</label>
	);
});

type FocusInputProps = React.InputHTMLAttributes<HTMLInputElement>;
const FocusInput = memo(function FocusInput({ style, ...props }: FocusInputProps) {
	const [focused, setFocused] = useState(false);
	const merged = useMemo(
		() => ({ ...(focused ? INPUT_STYLE_FOCUS : INPUT_STYLE_BLUR), ...style }),
		[focused, style]
	);
	return (
		<input
			{...props}
			className={INPUT_CLS}
			style={merged}
			onFocus={(e) => { setFocused(true);  props.onFocus?.(e); }}
			onBlur={(e)  => { setFocused(false); props.onBlur?.(e);  }}
		/>
	);
});

interface FocusSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	extraStyle?: React.CSSProperties;
}
const FocusSelect = memo(function FocusSelect({
	extraStyle, children, style, ...props
}: FocusSelectProps) {
	const [focused, setFocused] = useState(false);
	const merged = useMemo(
		() => ({
			...(focused ? INPUT_STYLE_FOCUS : INPUT_STYLE_BLUR),
			backgroundImage:    CHEVRON_BG,
			backgroundRepeat:   "no-repeat" as const,
			backgroundPosition: "right 10px center" as const,
			paddingRight:       "30px" as const,
			...extraStyle,
			...style,
		}),
		[focused, extraStyle, style]
	);
	return (
		<select
			{...props}
			className={SELECT_CLS}
			style={merged}
			onFocus={(e) => { setFocused(true);  props.onFocus?.(e); }}
			onBlur={(e)  => { setFocused(false); props.onBlur?.(e);  }}
		>
			{children}
		</select>
	);
});

type FocusTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const FocusTextarea = memo(function FocusTextarea({
	className = "", style, ...props
}: FocusTextareaProps) {
	const [focused, setFocused] = useState(false);
	const merged = useMemo(
		() => ({ ...(focused ? INPUT_STYLE_FOCUS : INPUT_STYLE_BLUR), ...style }),
		[focused, style]
	);
	return (
		<textarea
			{...props}
			className={`${INPUT_CLS} resize-none leading-relaxed ${className}`}
			style={merged}
			onFocus={(e) => { setFocused(true);  props.onFocus?.(e); }}
			onBlur={(e)  => { setFocused(false); props.onBlur?.(e);  }}
		/>
	);
});

/* ─────────────────────────────────────────────────────────────
   BADGES
   ───────────────────────────────────────────────────────────── */

const StatusBadge = memo(function StatusBadge({ status }: { status: string }) {
	const s = STATUS_BADGE_MAP[status] ?? {
		bg: "#f4f4f5", color: "#52525b", border: "#e4e4e7",
	};
	return (
		<span
			className="text-[10px] px-3 py-1 rounded-full font-semibold flex-shrink-0 whitespace-nowrap"
			style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
		>
			{status}
		</span>
	);
});

const PriorityPill = memo(function PriorityPill({ priority }: { priority: string }) {
	const color = PRIORITY_COLORS[priority] ?? "#94a3b8";
	return (
		<span
			className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap"
			style={{ background: `${color}14`, color, border: `1px solid ${color}30` }}
		>
			<span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
			{priority}
		</span>
	);
});

/* ─────────────────────────────────────────────────────────────
   BUTTONS & LAYOUT HELPERS
   ───────────────────────────────────────────────────────────── */

interface PrimaryBtnProps {
	children:  React.ReactNode;
	disabled?: boolean;
	onClick?:  (e: React.MouseEvent) => void;
	type?:     "button" | "submit" | "reset";
}
const PrimaryBtn = memo(function PrimaryBtn({
	children, disabled, onClick, type = "button",
}: PrimaryBtnProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 disabled:opacity-50"
			style={{ background: NAVY }}
		>
			{children}
		</button>
	);
});

const Card = memo(function Card({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="rounded-2xl p-6 sm:p-8"
			style={{
				background: "#ffffff",
				border:     "1px solid #e8edf5",
				boxShadow:  "0 2px 16px rgba(27,59,95,0.06)",
			}}
		>
			{children}
		</div>
	);
});

interface StepHeaderProps {
	iconBg:    string;
	icon:      IconType;
	iconColor: string;
	title:     string;
	sub:       React.ReactNode;
}
const StepHeader = memo(function StepHeader({
	iconBg, icon: Icon, iconColor, title, sub,
}: StepHeaderProps) {
	return (
		<div className="flex items-center gap-3 mb-5">
			<div
				className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
				style={{ background: iconBg }}
			>
				<Icon size={20} color={iconColor} />
			</div>
			<div>
				<h2
					className="text-base font-bold"
					style={{ color: "#1a1a2e", fontFamily: "'Bricolage Grotesque', sans-serif" }}
				>
					{title}
				</h2>
				<p className="text-[11px]" style={{ color: "#8896ae" }}>
					{sub}
				</p>
			</div>
		</div>
	);
});

const Hero = memo(function Hero() {
	return (
		<div className="w-full py-10 px-5 mt-20" style={{ background: NAVY }}>
			<div className="mx-auto" style={{ maxWidth: 560 }}>
				<div
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-[10px] font-semibold tracking-widest uppercase"
					style={{ border: `1px solid ${GOLD}`, color: GOLD, background: `${GOLD}14` }}
				>
					<span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
					Self-Service Tasks
				</div>
				<h1
					className="text-white font-extrabold leading-tight mb-3"
					style={{
						fontSize:      "clamp(1.6rem, 4vw, 2.2rem)",
						fontFamily:    "'Bricolage Grotesque', sans-serif",
						letterSpacing: "-0.02em",
					}}
				>
					Track your tasks with the <span style={{ color: GOLD }}>Obana</span> team.
				</h1>
				<p
					className="text-sm leading-relaxed"
					style={{ color: "#ffffff99", maxWidth: 420 }}
				>
					Enter your email to view tasks linked to you, or create a new one. No login required.
				</p>
			</div>
		</div>
	);
});

/* ─────────────────────────────────────────────────────────────
   STEP COMPONENTS
   ───────────────────────────────────────────────────────────── */

interface StepEmailProps {
	email:    string;
	setEmail: (v: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	loading:  boolean;
	error?:   string | null;
}
const StepEmail = memo(function StepEmail({
	email, setEmail, onSubmit, loading, error,
}: StepEmailProps) {
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
		[setEmail]
	);
	return (
		<Card>
			<StepHeader
				iconBg={GOLD_LIGHT}
				icon={MdEmail}
				iconColor={NAVY}
				title="Let's get started"
				sub="Enter your email to find or create your profile."
			/>
			<form onSubmit={onSubmit} className="space-y-3">
				<div>
					<Label text="Email address" required />
					<FocusInput
						type="email"
						required
						value={email}
						onChange={onChange}
						placeholder="you@yourbusiness.com"
						autoComplete="email"
						inputMode="email"
					/>
				</div>
				{error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
				<PrimaryBtn type="submit" disabled={loading || !email.includes("@")}>
					{loading ? "Checking..." : "Continue"}
					{!loading && <MdArrowForward size={16} />}
				</PrimaryBtn>
			</form>
		</Card>
	);
});

interface StepConfirmProps {
	email:     string;
	name:      string;
	onConfirm: () => void;
	onNotMe:   () => void;
	loading:   boolean;
	error?:    string | null;
}
const StepConfirm = memo(function StepConfirm({
	email, name, onConfirm, onNotMe, loading, error,
}: StepConfirmProps) {
	return (
		<Card>
			<StepHeader
				iconBg="#ecfdf5"
				icon={MdCheckCircle}
				iconColor="#059669"
				title="Is this you?"
				sub={<>We found a profile linked to <strong>{email}</strong>.</>}
			/>
			<div
				className="rounded-xl p-4 mb-5"
				style={{ background: "#f5f7fa", border: "1px solid #e8edf5" }}
			>
				<p
					className="text-[10px] uppercase tracking-widest font-semibold mb-1"
					style={{ color: "#8896ae" }}
				>
					Name on file
				</p>
				<p className="text-base font-bold" style={{ color: NAVY }}>{name}</p>
			</div>
			{error && <p className="text-xs mb-3" style={{ color: "#ef4444" }}>{error}</p>}
			<div className="flex gap-3">
				<button
					type="button"
					onClick={onNotMe}
					className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors"
					style={{ border: "1px solid #e8edf5", color: "#4a5568", background: "#ffffff" }}
				>
					Not me
				</button>
				<button
					type="button"
					onClick={onConfirm}
					disabled={loading}
					className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
					style={{ background: NAVY }}
				>
					{loading ? "..." : "Yes, continue"}
					{!loading && <MdArrowForward size={15} />}
				</button>
			</div>
		</Card>
	);
});

interface StepNameProps {
	email:     string;
	firstName: string;
	lastName:  string;
	setFirst:  (v: string) => void;
	setLast:   (v: string) => void;
	onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void;
	onBack:    () => void;
	loading:   boolean;
	error?:    string | null;
}
const StepName = memo(function StepName({
	email, firstName, lastName, setFirst, setLast,
	onSubmit, onBack, loading, error,
}: StepNameProps) {
	const onFirst = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value),
		[setFirst]
	);
	const onLast = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setLast(e.target.value),
		[setLast]
	);
	return (
		<Card>
			<StepHeader
				iconBg={GOLD_LIGHT}
				icon={RiUserLine}
				iconColor={NAVY}
				title="Tell us your name"
				sub={<>Creating a profile for <strong>{email}</strong></>}
			/>
			<form onSubmit={onSubmit} className="space-y-3">
				<div className="grid grid-cols-2 gap-3">
					<div>
						<Label text="First name" required />
						<FocusInput
							type="text" required
							value={firstName}
							onChange={onFirst}
							placeholder="First"
							autoComplete="given-name"
						/>
					</div>
					<div>
						<Label text="Last name" required />
						<FocusInput
							type="text" required
							value={lastName}
							onChange={onLast}
							placeholder="Last"
							autoComplete="family-name"
						/>
					</div>
				</div>
				{error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
				<PrimaryBtn type="submit" disabled={loading}>
					{loading ? "Creating..." : "Continue"}
					{!loading && <MdArrowForward size={16} />}
				</PrimaryBtn>
				<button
					type="button"
					onClick={onBack}
					className="w-full text-xs transition-colors pt-1"
					style={{ color: "#8896ae" }}
				>
					Use a different email
				</button>
			</form>
		</Card>
	);
});

/* ─────────────────────────────────────────────────────────────
   TASK CARD
   ───────────────────────────────────────────────────────────── */

interface TaskCardProps {
	task:  PublicTask;
	email: string;
}
const TaskCard = memo(function TaskCard({ task, email }: TaskCardProps) {
	const [editingStatus,  setEditingStatus]  = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(task.Status);
	const updateStatus = useUpdateTaskStatus(email);

	// Sync local state when parent task changes (fixes stale state issue)
	useEffect(() => {
		if (!editingStatus) setSelectedStatus(task.Status);
	}, [task.Status, editingStatus]);

	const staffDisplay = task.Staff_Name || task.Owner?.name || null;

	const handleStatusSave = useCallback(async () => {
		if (selectedStatus === task.Status) {
			setEditingStatus(false);
			return;
		}
		try {
			await updateStatus.mutateAsync({ taskId: task.id, status: selectedStatus });
			setEditingStatus(false);
		} catch {
			// Mutation surfaces its own error state — user can retry
		}
	}, [selectedStatus, task.Status, task.id, updateStatus]);

	const handleCancel = useCallback(() => {
		setEditingStatus(false);
		setSelectedStatus(task.Status);
	}, [task.Status]);

	return (
		<div
			className="rounded-2xl p-4 transition-shadow duration-200"
			style={{
				background: "#ffffff",
				border:     "1px solid #e8edf5",
				boxShadow:  "0 1px 4px rgba(27,59,95,0.04)",
			}}
		>
			<div className="flex items-start justify-between gap-3 mb-2">
				<div className="min-w-0 flex-1">
					<p
						className="text-[9px] uppercase tracking-widest font-semibold mb-1"
						style={{ color: "#8896ae" }}
					>
						Subject
					</p>
					<h3 className="font-semibold text-sm leading-snug" style={{ color: NAVY }}>
						{task.Subject}
					</h3>
				</div>
				<StatusBadge status={task.Status} />
			</div>

			{task.Description && (
				<div className="mb-3">
					<p
						className="text-[9px] uppercase tracking-widest font-semibold mb-1"
						style={{ color: "#8896ae" }}
					>
						Description
					</p>
					<p className="text-xs leading-relaxed" style={{ color: "#6b7a99" }}>
						{task.Description}
					</p>
				</div>
			)}

			<div className="pt-3 mt-1" style={{ borderTop: "1px solid #f0f3f8" }}>
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div className="flex flex-wrap items-center gap-2">
						<div className="flex flex-col gap-1">
							<p
								className="text-[9px] uppercase tracking-widest font-semibold"
								style={{ color: "#8896ae" }}
							>
								Priority
							</p>
							<PriorityPill priority={task.Priority} />
						</div>

						{task.Due_Date && (
							<div className="flex flex-col gap-1">
								<p
									className="text-[9px] uppercase tracking-widest font-semibold"
									style={{ color: "#8896ae" }}
								>
									Due Date
								</p>
								<span
									className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg"
									style={{ background: "#f5f7fa", color: NAVY, border: "1px solid #e8edf5" }}
								>
									<MdCalendarToday size={10} />
									{task.Due_Date}
								</span>
							</div>
						)}

						{staffDisplay && (
							<div className="flex flex-col gap-1">
								<p
									className="text-[9px] uppercase tracking-widest font-semibold"
									style={{ color: "#8896ae" }}
								>
									Assigned
								</p>
								<span
									className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg"
									style={{ background: "#f5f7fa", color: NAVY, border: "1px solid #e8edf5" }}
								>
									<RiUserLine size={10} />
									{staffDisplay}
								</span>
							</div>
						)}
					</div>

					<div className="flex-shrink-0 self-end">
						{editingStatus ? (
							<div className="flex items-center gap-2">
								<select
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
									className="pl-2 pr-6 py-2 text-[10px] font-semibold rounded-lg border outline-none appearance-none"
									style={{
										background:         "#f5f7fa",
										borderColor:        NAVY,
										color:              NAVY,
										backgroundImage:    CHEVRON_BG,
										backgroundRepeat:   "no-repeat",
										backgroundPosition: "right 6px center",
									}}
									aria-label="Select status"
								>
									{STATUS_DISPLAY_OPTIONS.map((o) => (
										<option key={o.value} value={o.value}>{o.label}</option>
									))}
								</select>
								<button
									type="button"
									onClick={handleStatusSave}
									disabled={updateStatus.isPending}
									className="flex items-center gap-1 px-2 py-2 rounded-lg text-[10px] font-semibold text-white disabled:opacity-50 flex-shrink-0"
									style={{ background: "#059669" }}
								>
									<MdCheck size={12} />
									{updateStatus.isPending ? "..." : "Save"}
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
									style={{ background: "#f0f3f8", color: "#8896ae" }}
									aria-label="Cancel status edit"
								>
									<MdClose size={12} />
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => setEditingStatus(true)}
								className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[10px] font-semibold transition-colors"
								style={{ background: "#f5f7fa", color: NAVY, border: "1px solid #e8edf5" }}
							>
								<MdEdit size={11} />
								Update
								<MdKeyboardArrowDown size={12} />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

/* ─────────────────────────────────────────────────────────────
   STAT BADGE
   ───────────────────────────────────────────────────────────── */

interface TaskCountBadgeProps {
	label: string;
	count: number;
	color: string;
	bg:    string;
}
const TaskCountBadge = memo(function TaskCountBadge({
	label, count, color, bg,
}: TaskCountBadgeProps) {
	return (
		<div className="rounded-xl p-3 flex flex-col gap-1" style={{ background: bg, border: `1px solid ${color}20` }}>
			<span
				className="text-lg font-extrabold"
				style={{ color, fontFamily: "'Bricolage Grotesque', sans-serif" }}
			>
				{count}
			</span>
			<span
				className="text-[8px] md:text-[9px] font-semibold uppercase tracking-widest leading-tight"
				style={{ color: `${color}99` }}
			>
				{label}
			</span>
		</div>
	);
});

/* ─────────────────────────────────────────────────────────────
   LIST STEP
   ───────────────────────────────────────────────────────────── */

interface StepListProps {
	user:      ConfirmedUser;
	tasks:     PublicTask[];
	loading:   boolean;
	onNewTask: () => void;
	onSignOut: () => void;
}
const PAGE_SIZE = 5;

const StepList = memo(function StepList({
	user, tasks, loading, onNewTask, onSignOut,
}: StepListProps) {
	const [search,         setSearch]         = useState("");
	const [filterStatus,   setFilterStatus]   = useState("all");
	const [filterPriority, setFilterPriority] = useState("all");
	const [showFilters,    setShowFilters]    = useState(false);
	const [page,           setPage]           = useState(1);

	/* Single-pass stats — faster than 4 .filter() calls */
	const stats = useMemo(() => {
		const r = { urgent: 0, inProgress: 0, completed: 0, pending: 0 };
		for (const t of tasks) {
			if (t.Priority === "Urgent" || t.Priority === "Highest") r.urgent++;
			if (t.Status   === "In Progress")                        r.inProgress++;
			if (t.Status   === "Completed")                          r.completed++;
			if (t.Status   === "Not Started")                        r.pending++;
		}
		return r;
	}, [tasks]);

	const filtered = useMemo(() => {
		const term = search.toLowerCase();
		return tasks.filter((t) => {
			const matchSearch =
				!term ||
				t.Subject.toLowerCase().includes(term) ||
				(t.Description ?? "").toLowerCase().includes(term);
			const matchStatus   = filterStatus   === "all" || t.Status   === filterStatus;
			const matchPriority = filterPriority === "all" || t.Priority === filterPriority;
			return matchSearch && matchStatus && matchPriority;
		});
	}, [tasks, search, filterStatus, filterPriority]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	const hasFilters = filterStatus !== "all" || filterPriority !== "all" || !!search;

	// Ensure page doesn't exceed available pages after filtering
	useEffect(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);

	const clearFilters = useCallback(() => {
		setSearch("");
		setFilterStatus("all");
		setFilterPriority("all");
		setPage(1);
	}, []);

	const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setPage(1);
	}, []);

	const initials = useMemo(
		() => user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase(),
		[user.name]
	);

	return (
		<div className="space-y-4">
			{/* User header */}
			<div
				className="rounded-2xl px-4 py-3 flex items-center justify-between"
				style={{
					background: "#ffffff",
					border:     "1px solid #e8edf5",
					boxShadow:  "0 2px 16px rgba(27,59,95,0.06)",
				}}
			>
				<div className="flex items-center gap-3 min-w-0">
					<div
						className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
						style={{ background: NAVY, color: GOLD }}
					>
						{initials}
					</div>
					<div className="min-w-0">
						<p className="text-sm font-bold truncate" style={{ color: NAVY }}>{user.name}</p>
						<p className="text-[11px] truncate" style={{ color: "#8896ae" }}>{user.email}</p>
					</div>
				</div>
				<div className="flex items-center gap-2 flex-shrink-0">
					<button
						type="button"
						onClick={onNewTask}
						className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-opacity"
						style={{ background: NAVY }}
					>
						<MdAdd size={13} />
						<span className="hidden sm:inline">New task</span>
						<span className="sm:hidden">New</span>
					</button>
					<button
						type="button"
						onClick={onSignOut}
						className="flex items-center gap-1 text-[11px] px-1 transition-colors"
						style={{ color: "#8896ae" }}
						aria-label="Sign out"
					>
						<MdLogout size={12} />
						<span className="hidden sm:inline">Out</span>
					</button>
				</div>
			</div>

			{loading ? (
				<div className="space-y-2">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="h-28 rounded-2xl animate-pulse"
							style={{ background: "#f0f3f8", border: "1px solid #e8edf5" }}
						/>
					))}
				</div>
			) : (
				<>
					{tasks.length > 0 && (
						<div className="grid grid-cols-4 gap-2">
							<TaskCountBadge label="Urgent"      count={stats.urgent}     color="#a855f7" bg="#fdf4ff" />
							<TaskCountBadge label="In Progress" count={stats.inProgress} color="#2563eb" bg="#eff6ff" />
							<TaskCountBadge label="Pending"     count={stats.pending}    color="#d97706" bg="#fffbeb" />
							<TaskCountBadge label="Done"        count={stats.completed}  color="#059669" bg="#ecfdf5" />
						</div>
					)}

					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<div className="flex-1 relative">
								<MdSearch
									size={15}
									className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
									style={{ color: "#8896ae" }}
								/>
								<input
									type="text"
									value={search}
									onChange={onSearchChange}
									placeholder="Search tasks..."
									className="w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-colors"
									style={{ background: "#ffffff", border: "1px solid #e8edf5", color: "#1a1a2e" }}
									aria-label="Search tasks"
								/>
							</div>
							<button
								type="button"
								onClick={() => setShowFilters((v) => !v)}
								className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex-shrink-0"
								style={{
									background: showFilters ? NAVY : "#ffffff",
									color:      showFilters ? "#ffffff" : NAVY,
									border:     `1px solid ${showFilters ? NAVY : "#e8edf5"}`,
								}}
								aria-expanded={showFilters}
								aria-controls="filter-panel"
							>
								<MdFilterList size={14} />
								<span className="hidden sm:inline">Filter</span>
							</button>
						</div>

						{showFilters && (
							<div
								id="filter-panel"
								className="rounded-xl p-3 space-y-2"
								style={{ background: "#ffffff", border: "1px solid #e8edf5" }}
							>
								<div className="grid grid-cols-2 gap-2">
									<div>
										<Label text="Status" />
										<select
											value={filterStatus}
											onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
											className="w-full px-3 py-2 text-xs rounded-lg outline-none appearance-none"
											style={{
												background:         "#f5f7fa",
												border:             "1px solid #e8edf5",
												color:              NAVY,
												backgroundImage:    CHEVRON_BG,
												backgroundRepeat:   "no-repeat",
												backgroundPosition: "right 8px center",
												paddingRight:       "26px",
											}}
										>
											<option value="all">All statuses</option>
											{STATUS_DISPLAY_OPTIONS.map((o) => (
												<option key={o.value} value={o.value}>{o.label}</option>
											))}
										</select>
									</div>
									<div>
										<Label text="Priority" />
										<select
											value={filterPriority}
											onChange={(e) => { setFilterPriority(e.target.value); setPage(1); }}
											className="w-full px-3 py-2 text-xs rounded-lg outline-none appearance-none"
											style={{
												background:         "#f5f7fa",
												border:             "1px solid #e8edf5",
												color:              NAVY,
												backgroundImage:    CHEVRON_BG,
												backgroundRepeat:   "no-repeat",
												backgroundPosition: "right 8px center",
												paddingRight:       "26px",
											}}
										>
											<option value="all">All priorities</option>
											{FILTER_PRIORITY_OPTIONS.map((p) => (
												<option key={p} value={p}>{p}</option>
											))}
										</select>
									</div>
								</div>
								{hasFilters && (
									<button
										type="button"
										onClick={clearFilters}
										className="text-xs font-semibold"
										style={{ color: "#ef4444" }}
									>
										Clear filters
									</button>
								)}
							</div>
						)}
					</div>

					<div className="flex items-center justify-between px-1">
						<h3
							className="text-sm font-bold"
							style={{ color: NAVY, fontFamily: "'Bricolage Grotesque', sans-serif" }}
						>
							Your tasks
						</h3>
						<span
							className="text-[10px] uppercase tracking-widest font-semibold"
							style={{ color: "#8896ae" }}
						>
							{filtered.length} of {tasks.length}
						</span>
					</div>

					{filtered.length === 0 ? (
						<div className="rounded-2xl p-10 text-center" style={{ background: "#ffffff", border: "1px solid #e8edf5" }}>
							<div
								className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
								style={{ background: GOLD_LIGHT }}
							>
								<MdOutlineInbox size={22} color={NAVY} />
							</div>
							{tasks.length === 0 ? (
								<>
									<p className="text-sm font-bold mb-1" style={{ color: NAVY }}>No tasks yet</p>
									<p className="text-xs mb-5" style={{ color: "#8896ae" }}>
										Create your first task and our team will pick it up.
									</p>
									<button
										type="button"
										onClick={onNewTask}
										className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white"
										style={{ background: NAVY }}
									>
										<MdAdd size={13} /> Create a task
									</button>
								</>
							) : (
								<>
									<p className="text-sm font-bold mb-1" style={{ color: NAVY }}>No matches</p>
									<p className="text-xs mb-4" style={{ color: "#8896ae" }}>
										Try adjusting your filters or search.
									</p>
									<button
										type="button"
										onClick={clearFilters}
										className="text-xs font-semibold"
										style={{ color: NAVY }}
									>
										Clear filters
									</button>
								</>
							)}
						</div>
					) : (
						<>
							<div className="space-y-3">
								{paginated.map((t) => (
									<TaskCard key={t.id} task={t} email={user.email} />
								))}
							</div>

							{totalPages > 1 && (
								<div className="flex items-center justify-between pt-2">
									<button
										type="button"
										onClick={() => setPage((p) => Math.max(1, p - 1))}
										disabled={page === 1}
										className="px-3 py-2 rounded-xl text-xs font-semibold disabled:opacity-40"
										style={{ background: "#ffffff", border: "1px solid #e8edf5", color: NAVY }}
									>
										← Prev
									</button>
									<div className="flex items-center gap-1">
										{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
											<button
												key={p}
												type="button"
												onClick={() => setPage(p)}
												className="w-7 h-7 rounded-lg text-xs font-bold"
												style={{
													background: page === p ? NAVY : "#f5f7fa",
													color:      page === p ? "#ffffff" : "#8896ae",
													border:     `1px solid ${page === p ? NAVY : "#e8edf5"}`,
												}}
												aria-current={page === p ? "page" : undefined}
											>
												{p}
											</button>
										))}
									</div>
									<button
										type="button"
										onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
										disabled={page === totalPages}
										className="px-3 py-2 rounded-xl text-xs font-semibold disabled:opacity-40"
										style={{ background: "#ffffff", border: "1px solid #e8edf5", color: NAVY }}
									>
										Next →
									</button>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
});

/* ─────────────────────────────────────────────────────────────
   CREATE TASK MODAL — portal + a11y + iOS scroll lock
   ───────────────────────────────────────────────────────────── */

interface CreateTaskModalProps {
	user:      ConfirmedUser;
	onClose:   () => void;
	onCreated: () => void;
}

const CreateTaskModal = memo(function CreateTaskModal({
	user, onClose, onCreated,
}: CreateTaskModalProps) {
	const [subject,     setSubject]     = useState("");
	const [description, setDescription] = useState("");
	const [priority,    setPriority]    = useState<PriorityValue>("medium");
	const [status,      setStatus]      = useState<StatusValue>("pending");
	const [dueDate,     setDueDate]     = useState("");
	const [staffName,   setStaffName]   = useState("");           // empty default
	const [errorMsg,    setErrorMsg]    = useState<string | null>(null);
	const [mounted,     setMounted]     = useState(false);

	const dialogRef = useRef<HTMLDivElement>(null);
	const prevFocusRef = useRef<HTMLElement | null>(null);
	const createTask = useCreatePublicTask();

	const priorityColor = useMemo(
		() => PRIORITY_OPTIONS.find((p) => p.value === priority)?.color ?? "#f59e0b",
		[priority]
	);

	const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

	const isValid = subject.trim() && description.trim() && dueDate && staffName;

	useEffect(() => { setMounted(true); }, []);

	/* Body scroll lock — iOS-safe (saves & restores scroll position) */
	useEffect(() => {
		const scrollY = window.scrollY;
		const orig = {
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
			document.body.style.overflow = orig.overflow;
			document.body.style.position = orig.position;
			document.body.style.top      = orig.top;
			document.body.style.width    = orig.width;
			window.scrollTo(0, scrollY);
		};
	}, []);

	/* Focus management */
	useEffect(() => {
		prevFocusRef.current = document.activeElement as HTMLElement | null;
		const t = setTimeout(() => dialogRef.current?.focus(), 0);
		return () => {
			clearTimeout(t);
			prevFocusRef.current?.focus?.();
		};
	}, []);

	/* Escape-to-close + focus trap */
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && !createTask.isPending) {
				e.preventDefault();
				onClose();
			}
			if (e.key === "Tab" && dialogRef.current) {
				const els = dialogRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				if (els.length === 0) return;
				const first = els[0];
				const last  = els[els.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault(); last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault(); first.focus();
				}
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose, createTask.isPending]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!isValid) return;
			setErrorMsg(null);
			try {
				await createTask.mutateAsync({
					email:       user.email,
					contact_id:  user.contact_id,
					subject:     subject.trim(),
					description: description.trim() || undefined,
					priority,
					status,
					dueDate,
					staffName,
				});
				onCreated();
			} catch (err: unknown) {
				setErrorMsg(
					(err as { message?: string })?.message
					?? "Failed to create task. Please try again."
				);
			}
		},
		[isValid, createTask, user, subject, description, priority, status, dueDate, staffName, onCreated]
	);

	const onBackdrop = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget && !createTask.isPending) onClose();
		},
		[onClose, createTask.isPending]
	);

	if (!mounted) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
			style={{ background: "rgba(15,28,46,0.55)", backdropFilter: "blur(4px)" }}
			onClick={onBackdrop}
			role="presentation"
		>
			<div
				ref={dialogRef}
				tabIndex={-1}
				role="dialog"
				aria-modal="true"
				aria-labelledby="create-task-title"
				className="w-full flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl outline-none"
				style={{
					background: "#ffffff",
					boxShadow:  "0 24px 64px rgba(0,0,0,0.18)",
					maxWidth:   480,
					maxHeight:  "92vh",
				}}
			>
				<div
					className="flex items-center justify-between px-5 py-4 flex-shrink-0"
					style={{ borderBottom: "1px solid #e8edf5", background: "#fafbfc" }}
				>
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: GOLD_LIGHT }}>
							<BiTask size={15} color={NAVY} />
						</div>
						<div>
							<h2
								id="create-task-title"
								className="text-sm font-bold"
								style={{ color: NAVY, fontFamily: "'Bricolage Grotesque', sans-serif" }}
							>
								Create new task
							</h2>
							<p className="text-[10px]" style={{ color: "#8896ae" }}>Linked to {user.name}</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						disabled={createTask.isPending}
						className="p-1 rounded-lg transition-colors disabled:opacity-40"
						style={{ color: "#8896ae" }}
						aria-label="Close dialog"
					>
						<MdClose size={16} />
					</button>
				</div>

				<form
					id="create-task-form"
					onSubmit={handleSubmit}
					className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
				>
					<div>
						<Label icon={MdWork} text="Subject" required />
						<FocusInput
							type="text"
							required
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							placeholder="What needs to be done?"
						/>
					</div>

					<div>
						<Label icon={MdNotes} text="Description" required />
						<FocusTextarea
							required
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add context, links, or requirements..."
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<Label icon={RiTeamLine} text="Assign to" required />
							<FocusSelect
								required
								value={staffName}
								onChange={(e) => setStaffName(e.target.value)}
							>
								<option value="" disabled>Select staff</option>
								{STAFF_OPTIONS.map((s) => (
									<option key={s} value={s}>{s}</option>
								))}
							</FocusSelect>
						</div>
						<div>
							<Label icon={MdCalendarToday} text="Due date" required />
							<FocusInput
								type="date"
								required
								min={minDate}
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<Label icon={MdLabel} text="Priority" required />
							<FocusSelect
								required
								value={priority}
								onChange={(e) => setPriority(e.target.value as PriorityValue)}
								extraStyle={{ color: priorityColor, fontWeight: 600 }}
							>
								{PRIORITY_OPTIONS.map((o) => (
									<option key={o.value} value={o.value}>{o.label}</option>
								))}
							</FocusSelect>
						</div>
						<div>
							<Label icon={MdTaskAlt} text="Status" required />
							<FocusSelect
								required
								value={status}
								onChange={(e) => setStatus(e.target.value as StatusValue)}
							>
								{STATUS_OPTIONS.map((o) => (
									<option key={o.value} value={o.value}>{o.label}</option>
								))}
							</FocusSelect>
						</div>
					</div>

					{errorMsg && <p className="text-xs" style={{ color: "#ef4444" }}>{errorMsg}</p>}
				</form>

				<div
					className="flex items-center justify-end gap-3 px-5 py-4 flex-shrink-0"
					style={{ borderTop: "1px solid #e8edf5", background: "#fafbfc" }}
				>
					<button
						type="button"
						onClick={onClose}
						disabled={createTask.isPending}
						className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40"
						style={{ border: "1px solid #e8edf5", background: "#ffffff", color: "#4a5568" }}
					>
						Cancel
					</button>
					<button
						type="submit"
						form="create-task-form"
						disabled={createTask.isPending || !isValid}
						className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
						style={{ background: NAVY }}
					>
						{createTask.isPending ? "Creating..." : "Create task"}
						{!createTask.isPending && <MdArrowForward size={15} />}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
});

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function TasksPage() {
	const [step,           setStep]           = useState<Step>("email");
	const [email,          setEmail]          = useState("");
	const [firstName,      setFirstName]      = useState("");
	const [lastName,       setLastName]       = useState("");
	const [identifiedName, setIdentifiedName] = useState<string | null>(null);
	const [user,           setUser]           = useState<ConfirmedUser | null>(null);
	const [showCreate,     setShowCreate]     = useState(false);
	const [stepError,      setStepError]      = useState<string | null>(null);

	const identify = useIdentifyUser();
	const confirm  = useConfirmUser();

	/* Normalize email once for downstream consumers */
	const normalizedEmail = useMemo(() => email.toLowerCase().trim(), [email]);

	const { data: tasksData, isLoading: tasksLoading } = usePublicTasks(
		step === "list" ? normalizedEmail : null
	);

	const handleIdentify = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!normalizedEmail.includes("@")) return;
			setStepError(null);
			try {
				const result = await identify.mutateAsync(normalizedEmail);
				if (result.found) {
					setIdentifiedName(result.name || null);
					setStep("confirm");
				} else {
					setStep("name");
				}
			} catch (err: unknown) {
				setStepError(
					(err as { message?: string })?.message
					?? "Something went wrong. Please try again."
				);
			}
		},
		[identify, normalizedEmail]
	);

	const handleConfirmExisting = useCallback(async () => {
		setStepError(null);
		try {
			const result = await confirm.mutateAsync({ email: normalizedEmail });
			setUser(result);
			setStep("list");
		} catch (err: unknown) {
			setStepError(
				(err as { message?: string })?.message
				?? "Couldn't confirm your profile. Try again."
			);
		}
	}, [confirm, normalizedEmail]);

	const handleSubmitNewName = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const f = firstName.trim();
			const l = lastName.trim();
			if (!f && !l) return;
			setStepError(null);
			try {
				const result = await confirm.mutateAsync({
					email:     normalizedEmail,
					firstName: f || undefined,
					lastName:  l || undefined,
				});
				setUser(result);
				setStep("list");
			} catch (err: unknown) {
				setStepError(
					(err as { message?: string })?.message
					?? "Couldn't create your profile. Try again."
				);
			}
		},
		[confirm, normalizedEmail, firstName, lastName]
	);

	const handleNotMe = useCallback(() => {
		setIdentifiedName(null);
		setStepError(null);
		setStep("name");
	}, []);

	const reset = useCallback(() => {
		setStep("email");
		setEmail("");
		setFirstName("");
		setLastName("");
		setIdentifiedName(null);
		setUser(null);
		setShowCreate(false);
		setStepError(null);
	}, []);

	return (
		<div
			style={{
				background: "#f5f7fa",
				fontFamily: "'Bricolage Grotesque', Inter, sans-serif",
			}}
		>
			<Hero />
			<div className="px-4 py-8 sm:py-12 flex justify-center">
				<div className="w-full" style={{ maxWidth: 560 }}>
					{step === "email" && (
						<StepEmail
							email={email}
							setEmail={setEmail}
							onSubmit={handleIdentify}
							loading={identify.isPending}
							error={stepError}
						/>
					)}
					{step === "confirm" && identifiedName && (
						<StepConfirm
							email={normalizedEmail}
							name={identifiedName}
							onConfirm={handleConfirmExisting}
							onNotMe={handleNotMe}
							loading={confirm.isPending}
							error={stepError}
						/>
					)}
					{step === "name" && (
						<StepName
							email={normalizedEmail}
							firstName={firstName}
							lastName={lastName}
							setFirst={setFirstName}
							setLast={setLastName}
							onSubmit={handleSubmitNewName}
							onBack={reset}
							loading={confirm.isPending}
							error={stepError}
						/>
					)}
					{step === "list" && user && (
						<StepList
							user={user}
							tasks={tasksData?.tasks ?? EMPTY_TASKS}
							loading={tasksLoading}
							onNewTask={() => setShowCreate(true)}
							onSignOut={reset}
						/>
					)}
				</div>
			</div>
			{showCreate && user && (
				<CreateTaskModal
					user={user}
					onClose={() => setShowCreate(false)}
					onCreated={() => setShowCreate(false)}
				/>
			)}
		</div>
	);
}