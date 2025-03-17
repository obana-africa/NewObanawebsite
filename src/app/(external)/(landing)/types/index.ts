import { ReactNode } from "react";

export interface FeatureBoxProps {
	icon: ReactNode;
	title: string;
	description: string;
	buttonText?: string;
}

export interface Feature {
	icon: ReactNode;
	title: string;
	description: string;
	buttonText?: string;
}

export interface ServiceSectionProps {
	title?: string;
	subtitle?: string;
	features: Feature[];
	imageSrc?: string;
}

export type StakeholderBoxProps = {
	label: string;
	description: React.ReactNode;
	rightIcon: string;
};

export type StakeholderSectionProps = {
	title: string;
	stakeholders: {
		label: string;
		description: React.ReactNode;
		rightIcon: string;
	}[];
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
