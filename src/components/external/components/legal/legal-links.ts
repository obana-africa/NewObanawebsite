export interface LegalLink {
	title: string;
	href: string;
}

/** Documents listed in the legal sidebar, in display order. */
export const legalLinks: LegalLink[] = [
	{ title: "Privacy Policy", href: "/privacy-policy" },
	{ title: "NDPA", href: "/ndpa" },
	{ title: "GDPR", href: "/gdpr" },
	{ title: "Cookies", href: "/cookie-policy" },
	{ title: "Terms & Conditions", href: "/terms" },
];
