"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Aos.init({
      once: false,
      mirror: true,
      offset: 30,
      duration: 1000,
      delay: 20,
    });
  }, []);

  // ✅ ADD WATI WIDGET HERE
  useEffect(() => {
    const url = "https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?57932";
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = url;

    const options = {
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#00e785",
        ctaText: "Chat with us",
        borderRadius: "25",
        marginLeft: "0",
        marginRight: "20",
        marginBottom: "20",
        ctaIconWATI: false,
        position: "left",
      },
      brandSetting: {
        brandName: "Wati",
        brandSubTitle: "undefined",
        brandImg: "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
        welcomeText: "Hi there!\nHow can I help you?",
        messageText: "Hello, %0A I have a question about {{page_link}}",
        backgroundColor: "#00e785",
        ctaText: "Chat with us",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "2348072257364",
      },
    };

    s.onload = () => {
      // @ts-ignore
      CreateWhatsappChatWidget(options);
    };

    document.body.appendChild(s);

    return () => document.body.removeChild(s);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="0q3frl5copj66sc5lk2b8ekficn0wg"
        />
      </head>

      <body className={`${bricolage.variable} ${inter.variable}`}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster richColors duration={5000} />
          </ModalProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
