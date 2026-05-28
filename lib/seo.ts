import type { Metadata } from "next";
import { RADIO_STREAM } from "./stream";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://quran-radio-cairo.vercel.app";

export const SITE_URL = siteUrl;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "إذاعة القرآن الكريم من القاهرة بث مباشر",
    template: "%s | إذاعة القرآن الكريم من القاهرة",
  },
  description:
    "استمع إلى بث مباشر لإذاعة القرآن الكريم من القاهرة — تلاوات قرآنية على مدار الساعة. Quran Radio Egypt live stream from Cairo.",
  keywords: [
    "إذاعة القرآن الكريم من القاهرة",
    "بث مباشر قرآن كريم",
    "Quran Radio Egypt",
    "Quran Kareem Radio Cairo",
    "راديو القرآن الكريم",
    "إذاعة قرآن كريم مباشر",
  ],
  authors: [{ name: RADIO_STREAM.name }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: RADIO_STREAM.name,
    title: "إذاعة القرآن الكريم من القاهرة بث مباشر",
    description:
      "بث مباشر لإذاعة القرآن الكريم من القاهرة — استمع الآن إلى تلاوات القرآن الكريم.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: RADIO_STREAM.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quran Radio Egypt Live | إذاعة القرآن الكريم من القاهرة",
    description:
      "بث مباشر لإذاعة القرآن الكريم من القاهرة — Quran Kareem Radio Cairo.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function radioStationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    name: RADIO_STREAM.name,
    alternateName: ["Quran Radio Egypt", "Quran Kareem Radio Cairo"],
    description:
      "بث مباشر لإذاعة القرآن الكريم من القاهرة — تلاوات قرآنية على مدار الساعة.",
    url: siteUrl,
    inLanguage: "ar",
    broadcastDisplayName: RADIO_STREAM.name,
    genre: "Religious",
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "إذاعة القرآن الكريم من القاهرة",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: RADIO_STREAM.name,
    url: siteUrl,
    inLanguage: "ar",
    potentialAction: {
      "@type": "ListenAction",
      target: siteUrl,
    },
  };
}
