import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sui Portugal — Building the Sui ecosystem in Portugal",
  description:
    "Developer workshops, community events, and builder activations for the Portuguese Sui ecosystem.",
  icons: {
    icon: "/images/logo/SuiPortugal_Logo.png",
    apple: "/images/logo/SuiPortugal_Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white">
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
