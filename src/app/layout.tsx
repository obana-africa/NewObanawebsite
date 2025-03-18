import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/external/components/header";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Footer from "@/components/external/components/footer";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ModalProvider } from "@/contexts/modal-context";

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

export const metadata: Metadata = {
	title: "Obana - Enabling SMEs Scale",
	description: "Obana | Sub-Sahara Africa's Sourcing Marketplace Platform.",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${bricolage.variable} ${inter.variable}`}>
				<ModalProvider>
					<Header />
					<main>{children}</main>
					<Footer />
				</ModalProvider>
			</body>
		</html>
	);
}
