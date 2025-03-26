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
