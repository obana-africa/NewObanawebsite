"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import "./globals.css";
import Header from "@/components/external/components/header";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Footer from "@/components/external/components/footer";
import { ModalProvider } from "@/contexts/modal-context";
import { Toaster } from "sonner";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			// refetchOnMount: false,
			// refetchOnWindowFocus: false,

			refetchOnMount: "always",
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: 1,
		},
	},
});

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

const ROUTES_WITHOUT_GLOBAL_HEADER = ["/custom-sourcing"];

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const pathname = usePathname();
	const hideGlobalHeader = ROUTES_WITHOUT_GLOBAL_HEADER.some((r) =>
		pathname?.startsWith(r)
	);

	useEffect(() => {
		Aos.init({
			once: false,
			mirror: true,
			offset: 30,
			duration: 1000,
			delay: 20,
			// easing: "ease-in-sine",
		});
	}, []);

	return (
		<html lang="en">
			<body className={`${bricolage.variable} ${inter.variable}`}>
				<QueryClientProvider client={queryClient}>
					<ModalProvider>
						{!hideGlobalHeader && <Header />}
						<main>{children}</main>
						<Footer />
						<Toaster richColors duration={5000} />
					</ModalProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
