import React from "react";
import type { Metadata } from "next";
import LegalArticle from "@/components/external/components/legal/legal-article";
import { LAST_UPDATED, ndpaIntro, ndpaSections } from "./data/sections";

export const metadata: Metadata = {
	title: "NDPA Compliance | Obana.Africa",
	description:
		"Obana.Africa is NDPC-registered as a data controller of major importance. See our certificate and how we meet the Nigeria Data Protection Act 2023.",
	alternates: { canonical: "/ndpa" },
};

const Page = () => {
	return (
		<LegalArticle
			title="NDPA Compliance"
			lastUpdated={LAST_UPDATED}
			intro={ndpaIntro}
			sections={ndpaSections}
		/>
	);
};

export default Page;
