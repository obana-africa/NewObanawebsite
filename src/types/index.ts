import { emailSchema } from "@/schemas";
import { z } from "zod";

export type EmailFormData = z.infer<typeof emailSchema>;

export interface ListItemProps {
	children: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
	iconClassName?: string;
	contentClassName?: string;
	aosAnimation?: string;
	aosDuration?: string;
	aosDelay?: string | ((index: number) => string);
	customIcon?: React.ReactNode;
	nestedList?: NormalListProps;
}

export interface ListItem {
	text: string | React.ReactNode;
	className?: string;
	iconClassName?: string;
	contentClassName?: string;
	customIcon?: React.ReactNode;
	aosAnimation?: string;
	aosDuration?: string;
	aosDelay?: string | ((index: number) => string);
	children?: NormalListProps;
}

export interface NormalListProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items: any[];
	listType?: "ul" | "ol";
	listClassName?: string;
	itemClassName?: string;
	iconClassName?: string;
	contentClassName?: string;
	bulletColor?: string;
	bulletSize?: string;
	bulletStyle?: "circle" | "disc" | "square" | "none" | "custom";
	customIcon?: React.ReactNode;
	aosAnimation?: string;
	aosDuration?: string;
	aosDelay?: string | ((index: number) => string);
	aosDelayIncrement?: number;
	hideBullets?: boolean;
}

export interface SourcingCategory {
	id: number;
	name: string;
	slug: string;
	section: string;
	section_color: string | null;
	image_url: string | null;
	description: string | null;
	min_budget: number;
	max_budget: number;
	currency: string;
	sort_order: number;
	is_active: boolean;
}

export interface SourcingSection {
	section: string;
	section_color: string;
	items: SourcingCategory[];
}

export interface SelectedCategoryItem {
	id: number;
	name: string;
	slug: string;
	section: string;
	min_budget: number;
	max_budget: number;
	budget_amount: number;
	images: string[];
}

export interface CustomSourcingPayload {
	business_name: string;
	contact_name: string;
	phone: string;
	email: string;
	business_country?: string;
	business_state?: string;
	business_city?: string;
	business_location?: string;
	categories: Array<{
		id: number;
		name: string;
		slug: string;
		section: string;
		budget_amount: number;
		images: string[];
	}>;
	estimated_budget?: string;
	budget_total: number;
	currency: string;
	currency_symbol?: string;
	timeline?: string;
	financing_interest?: string;
	additional_details?: string;
	attachments?: string[];
}
