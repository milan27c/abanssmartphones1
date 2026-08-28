import type { Metadata, Viewport } from "next";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://smartphones.abans.lk"),
  title: {
    default: "Abans Smartphones — Sri Lanka's Multi-Brand Phone Store",
    template: "%s | Abans Smartphones",
  },
  description:
    "Compare smartphones from Apple, Redmi, OPPO, Motorola, realme and more. Authorized dealer pricing, Abans warranty and island-wide delivery across Sri Lanka.",
  openGraph: {
    type: "website",
    siteName: "Abans Smartphones",
    locale: "en_LK",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#791F7E",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-pill focus:bg-primary-600 focus:px-5 focus:py-3 focus:text-body-sm focus:text-white"
        >
          Skip To Content
        </a>

        <AnnouncementBar />
        <Navbar />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
