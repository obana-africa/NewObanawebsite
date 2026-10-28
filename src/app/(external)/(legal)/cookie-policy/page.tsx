import React from "react";
import type { Metadata } from "next";
import LegalArticle from "@/components/external/components/legal/legal-article";
import { LAST_UPDATED, cookieIntro, cookieSections } from "./data/sections";

export const metadata: Metadata = {
	title: "Cookie Policy | Obana.Africa",
	description:
		"The cookies and browser storage Obana.Africa uses, what each one is for, and how to control them.",
	alternates: { canonical: "/cookie-policy" },
};

const Page = () => {
	return (
		<LegalArticle
			title="Cookie Policy"
			lastUpdated={LAST_UPDATED}
			intro={cookieIntro}
			sections={cookieSections}
		/>
	);
};

export default Page;
