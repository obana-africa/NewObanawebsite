import { ReactNode } from "react";

export interface FeatureBoxProps {
	icon?: ReactNode;
	title: string;
	description: string;
	buttonText?: string;
	href?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
}

export interface Feature {
	icon?: ReactNode;
	title: string;
	description: string;
	buttonText?: string;
	href?: string;
	imageSrc: string;
}
export interface Benefit {
	title: string;
	description: string;
}

export interface ServiceSectionProps {
	title?: string;
	subtitle?: string;
	features: Feature[];
	imageSrc?: string;
}
export interface CoreValuesProps {
	title?: string;
	subtitle?: string;
	coreValues?: Feature[];
	inventoryBenefits?: Benefit[];
	imageSrc?: string;
}

export type StakeholderBoxProps = {
	title: string;
	description: React.ReactNode;
	imageSrc?: string;

};

export type StakeholderSectionProps = {
	title: string;
	stakeholders: StakeholderBoxProps;
	globeImage: string;
};

export type TestimonialsProps = {
	title: string;
	// stakeholders: {
	// 	label: string;
	// 	description: React.ReactNode;
	// 	rightIcon: string;
	// }[];
	// globeImage: string;
};

export interface ImageBoxProps {
	number: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	image: any;
	imageAlt: string;
	title: string;
	description: string;
	className?: string;
}
