import type { Metadata } from "next";
import { RADIO_STREAM } from "./stream";

const DEFAULT_SITE_URL = "https://quranmasr.com";

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit && !explicit.includes("localhost")) {
    return normalizeSiteUrl(explicit);
  }

  const netlifyUrl = process.env.URL?.trim();
  if (netlifyUrl && !netlifyUrl.includes("localhost")) {
    return normalizeSiteUrl(netlifyUrl);
  }

  // Stable production hostname — VERCEL_URL is per-deployment and bad for SEO.
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) {
    return normalizeSiteUrl(vercelProductionUrl);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return normalizeSiteUrl(vercelUrl);
  }

  if (explicit) {
    return normalizeSiteUrl(explicit);
  }

  return DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = RADIO_STREAM.name;
export const SITE_NAME_EN = RADIO_STREAM.nameEn;

export const DEFAULT_KEYWORDS = [
  "إذاعة القرآن الكريم من القاهرة",
  "بث مباشر قرآن كريم",
  "راديو القرآن الكريم",
  "إذاعة قرآن كريم مباشر",
  "استماع القرآن الكريم مباشر",
  "Quran Radio Egypt",
  "Quran Kareem Radio Cairo",
  "Quran live stream Cairo",
  "listen to Quran radio Egypt",
  "radio quran cairo live",
] as const;

export const DEFAULT_DESCRIPTION =
  "استمع إلى بث مباشر لإذاعة القرآن الكريم من القاهرة على مدار الساعة. تلاوات قرآنية عالية الجودة من مصر — Quran Radio Egypt live stream from Cairo.";

export const FAQ_ITEMS = [
  {
    question: "كيف أستمع إلى إذاعة القرآن الكريم من القاهرة مباشرة؟",
    answer:
      "افتح الموقع واضغط زر التشغيل في مشغّل البث. لا حاجة لتسجيل حساب — البث يعمل مباشرة من المتصفح على الهاتف أو الكمبيوتر.",
  },
  {
    question: "هل بث القرآن الكريم من القاهرة مجاني؟",
    answer:
      "نعم، الاستماع إلى البث المباشر مجاني بالكامل عبر هذا الموقع.",
  },
  {
    question: "هل يعمل راديو القرآن الكريم على الهاتف؟",
    answer:
      "نعم، الموقع متوافق مع الهواتف والأجهزة اللوحية ويعمل عبر متصفح الجوال دون تطبيق.",
  },
  {
    question: "ما هي إذاعة القرآن الكريم من القاهرة؟",
    answer:
      "إذاعة القرآن الكريم من القاهرة هي محطة راديو مصرية تبث تلاوات القرآن الكريم على مدار الساعة. يوفّر هذا الموقع واجهة بسيطة للاستماع إلى البث المباشر من أي مكان.",
  },
] as const;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const RADIO_ID = `${SITE_URL}/#radiostation`;
const BROADCAST_ID = `${SITE_URL}/#broadcast`;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function sharedOpenGraph(
  title: string,
  description: string,
  url: string,
): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "ar_EG",
    url,
    siteName: SITE_NAME,
    title,
    description,
    images: [
      {
        url: absoluteUrl("/og-image.svg"),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  };
}

function sharedTwitter(
  title: string,
  description: string,
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/og-image.svg")],
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
      languages: {
        "ar-EG": url,
      },
    },
    openGraph: sharedOpenGraph(fullTitle, description, url),
    twitter: sharedTwitter(fullTitle, description),
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "إذاعة القرآن الكريم من القاهرة بث مباشر",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Religion & Spirituality",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ar-EG": SITE_URL,
    },
  },
  openGraph: sharedOpenGraph(
    "إذاعة القرآن الكريم من القاهرة بث مباشر",
    DEFAULT_DESCRIPTION,
    SITE_URL,
  ),
  twitter: sharedTwitter(
    "Quran Radio Egypt Live | إذاعة القرآن الكريم من القاهرة",
    DEFAULT_DESCRIPTION,
  ),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  other: {
    "geo.region": "EG-C",
    "geo.placename": "Cairo",
  },
};

export function globalJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: [SITE_NAME_EN, "Quran Kareem Radio Cairo", "Quran Radio Egypt"],
        url: SITE_URL,
        logo: absoluteUrl("/og-image.svg"),
        image: absoluteUrl("/og-image.svg"),
        areaServed: {
          "@type": "Country",
          name: "Egypt",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [SITE_NAME_EN],
        description: DEFAULT_DESCRIPTION,
        inLanguage: "ar-EG",
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "ListenAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: SITE_URL,
            actionPlatform: [
              "https://schema.org/DesktopWebPlatform",
              "https://schema.org/MobileWebPlatform",
            ],
          },
        },
      },
      {
        "@type": "RadioStation",
        "@id": RADIO_ID,
        name: SITE_NAME,
        alternateName: [SITE_NAME_EN, "Quran Kareem Radio Cairo"],
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        image: absoluteUrl("/og-image.svg"),
        inLanguage: "ar-EG",
        broadcastDisplayName: SITE_NAME,
        genre: "Religious",
        broadcastFrequency: "Continuous",
        parentOrganization: { "@id": ORG_ID },
        areaServed: [
          { "@type": "Country", name: "Egypt" },
          { "@type": "AdministrativeArea", name: "Cairo" },
        ],
        mainEntityOfPage: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BroadcastService",
        "@id": BROADCAST_ID,
        name: SITE_NAME,
        broadcastDisplayName: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        inLanguage: "ar-EG",
        broadcastTimezone: "Africa/Cairo",
        areaServed: { "@type": "Country", name: "Egypt" },
        provider: { "@id": ORG_ID },
        broadcastChannel: {
          "@type": "BroadcastChannel",
          broadcastChannelId: SITE_URL,
          inBroadcastLineup: { "@id": RADIO_ID },
          broadcastServiceTier: "Free",
        },
      },
      {
        "@type": "AudioObject",
        "@id": `${SITE_URL}/#livestream`,
        name: `${SITE_NAME} — بث مباشر`,
        description: "بث مباشر لتلاوات القرآن الكريم من القاهرة.",
        contentUrl: RADIO_STREAM.streamUrl,
        encodingFormat: "audio/mpeg",
        inLanguage: "ar-EG",
        isAccessibleForFree: true,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function homePageJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "إذاعة القرآن الكريم من القاهرة بث مباشر",
        description: DEFAULT_DESCRIPTION,
        inLanguage: "ar-EG",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": RADIO_ID },
        primaryImageOfPage: absoluteUrl("/og-image.svg"),
        breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: SITE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}