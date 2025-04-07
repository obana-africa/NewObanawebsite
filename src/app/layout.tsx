import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./root-layout-client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-phone-input-2/lib/style.css";

export const metadata: Metadata = {
	title: "Obana - Enabling SMEs Scale",
	description: "Obana | Sub-Sahara Africa's Sourcing Marketplace Platform.",
	icons: {
		icon: "/favicon.png?v=1",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <RootLayoutClient>{children}</RootLayoutClient>;
}
