import React from "react";
import type { Metadata } from "next";
import LegalArticle from "@/components/external/components/legal/legal-article";
import { LAST_UPDATED, privacyIntro, privacySections } from "./data/sections";

export const metadata: Metadata = {
	title: "Privacy Policy | Obana.Africa",
	description:
		"How Obana.Africa collects, uses, shares and protects your personal data, and the rights you have over it.",
	alternates: { canonical: "/privacy-policy" },
};

const Page = () => {
	return (
		<LegalArticle
			title="Privacy Policy"
			lastUpdated={LAST_UPDATED}
			intro={privacyIntro}
			sections={privacySections}
		/>
	);
};

export default Page;
