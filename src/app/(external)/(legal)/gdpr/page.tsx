import React from "react";
import type { Metadata } from "next";
import LegalArticle from "@/components/external/components/legal/legal-article";
import { LAST_UPDATED, gdprIntro, gdprSections } from "./data/sections";

export const metadata: Metadata = {
	title: "GDPR | Obana.Africa",
	description:
		"How Obana.Africa meets the EU and UK GDPR — legal bases, data subject rights, international transfers and breach notification.",
	alternates: { canonical: "/gdpr" },
};

const Page = () => {
	return (
		<LegalArticle
			title="GDPR"
			lastUpdated={LAST_UPDATED}
			intro={gdprIntro}
			sections={gdprSections}
		/>
	);
};

export default Page;
