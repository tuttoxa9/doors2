import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import StructuredData from "../components/StructuredData";
import SEOHead from "../components/SEOHead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAESTRO - Шкафы на заказ в Минске | Изготовление мебели по индивидуальным размерам | Гарантия качества",
  description: "⭐ Доставляем шкафы по всей Беларуси более 10 лет. Мебель от производителя. Гарантия, 3D дизайн. Гардеробные, детские шкафы. От 290 BYN. ☎️ +375291565232",
  keywords: "шкафы на заказ Минск, мебель на заказ Беларусь, изготовление шкафов Минск, шкафы по индивидуальным размерам, гардеробные на заказ, детские шкафы Минск, встроенные шкафы, мебель по размерам, MAESTRO мебель, шкафы недорого Минск, качественные шкафы, мебельная мастерская Минск, заказать шкаф в Минске, шкафы производство Беларусь, мебель на заказ цены",
  authors: [{ name: "MAESTRO" }],
  creator: "MAESTRO",
  publisher: "MAESTRO",
  alternates: {
    canonical: "https://maestroworks.ru",
    types: {
      'application/rss+xml': [
        { url: '/api/rss', title: 'MAESTRO RSS Feed' }
      ]
    }
  },
  openGraph: {
    title: "MAESTRO - Шкафы на заказ в Минске | Мебель по индивидуальным размерам",
    description: "⭐ Доставляем шкафы по всей Беларуси более 10 лет. Мебель от производителя. Гарантия, 3D дизайн. От 290 BYN. ☎️ +375291565232",
    url: "https://maestroworks.ru",
    siteName: "MAESTRO - Мебель на заказ",
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: "https://maestroworks.ru/showroom.webp",
        width: 1200,
        height: 630,
        alt: "MAESTRO - Мебельная мастерская в Минске. Шкафы на заказ по индивидуальным размерам",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAESTRO - Шкафы на заказ в Минске | От 290 BYN",
    description: "⭐ Доставляем шкафы по всей Беларуси более 10 лет. Мебель от производителя. Гарантия, 3D дизайн",
    images: ["https://maestroworks.ru/showroom.webp"],
    site: "@maestro_by",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'geo.region': 'BY-HM',
    'geo.placename': 'Минск',
    'geo.position': '53.9045;27.5615',
    'ICBM': '53.9045, 27.5615',
    'business:contact_data:locality': 'Минск',
    'business:contact_data:country_name': 'Беларусь',
    'business:contact_data:phone_number': '+375 (29) 123-45-67',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="MAESTRO RSS Feed" href="/api/rss" />
        <link rel="canonical" href="https://maestroworks.ru" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=+375291565232" />
        <meta property="business:contact_data:street_address" content="ул. Судмалиса, 13" />
        <meta property="business:contact_data:locality" content="Минск" />
        <meta property="business:contact_data:region" content="Минская область" />
        <meta property="business:contact_data:postal_code" content="220000" />
        <meta property="business:contact_data:country_name" content="Беларусь" />
        <SEOHead />
        <StructuredData />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
