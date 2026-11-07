import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./root-layout-client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-phone-input-2/lib/style.css";

export const metadata: Metadata = {
	title: "Sub-Saharan Africa's Fashion & Beauty B2B Marketplace",
	description: "Sub-Saharan Africa's Fashion & Beauty B2B Marketplace",
	icons: {
		icon: "/favicon.png?v=1",
	},
};

const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-bricolage",
});

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${bricolage.variable} ${inter.variable}`}>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	);
}
