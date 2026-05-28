import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import { Footer } from "@/components/Footer";
import { GoogleAnalyticsProvider } from "@/components/GoogleAnalyticsProvider";
import { Header } from "@/components/Header";
import {
  defaultMetadata,
  radioStationJsonLd,
  webSiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [radioStationJsonLd(), webSiteJsonLd()];

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${amiri.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#06100c] font-sans text-emerald-50 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalyticsProvider />
      </body>
    </html>
  );
}
