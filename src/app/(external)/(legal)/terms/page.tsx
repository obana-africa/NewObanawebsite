import React from "react";
import type { Metadata } from "next";
import LegalArticle from "@/components/external/components/legal/legal-article";
import { LAST_UPDATED, termsIntro, termsSections } from "./data/sections";

export const metadata: Metadata = {
	title: "Terms & Conditions | Obana.Africa",
	description:
		"The terms that govern your use of Obana.Africa and the sourcing, production and logistics services you request through it.",
	alternates: { canonical: "/terms" },
};

const Page = () => {
	return (
		<LegalArticle
			title="Terms & Conditions"
			lastUpdated={LAST_UPDATED}
			intro={termsIntro}
			sections={termsSections}
		/>
	);
};

export default Page;
