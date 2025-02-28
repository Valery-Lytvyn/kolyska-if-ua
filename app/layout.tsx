import type { Metadata } from "next";
import { Noto_Sans, Comfortaa } from "next/font/google";
import { AuthProvider } from "./provider";
import Header from "@/components/header/Header";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import ScrollToTop from "@/components/shared/buttons/ScrollToTop";
import Footer from "@/components/footer/Footer";
import { ToastProvider } from "@/providers/ToastContext";
import StoreProvider from "@/providers/StoreProvider";
import PhoneLinkModal from "@/components/shared/modals/PhoneLinkModal";

const notoSans = Noto_Sans({
  subsets: ["cyrillic"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "kolyska.if.ua - Все для щасливого дитинства",
  description:
    "Інтернет-магазин Kolyska.if.ua пропонує все для комфортного та безпечного дитинства: дитячі візки, колиски, автокрісла, меблі, постільну білизну та багато іншого. Широкий асортимент, якість, зручна доставка та гарантія на всі товари. Зробіть ваше дитинство щасливим разом з нами!",
  keywords: [
    "дитячі візки",
    "колиски",
    "автокрісла",
    "дитячі меблі",
    "постільна білизна",
    "товари для дітей",
    "Івано-Франківськ",
    "колиска",
    "дитячі товари",
    "крісла для годування",
    "покупки для малюків",
    "безпечні дитячі товари",
  ],
  openGraph: {
    title: "kolyska.if.ua - Все для щасливого дитинства",
    description:
      "Інтернет-магазин Kolyska.if.ua пропонує все для комфортного та безпечного дитинства: дитячі візки, колиски, автокрісла, меблі, постільну білизну та багато іншого. Широкий асортимент, якість, зручна доставка та гарантія на всі товари.",
    type: "website",
    url: "https://kolyska.if.ua",
    siteName: "kolyska.if.ua",
    images: [
      {
        url: "https://kolyska.if.ua/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kolyska.if.ua - Все для щасливого дитинства",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kolyska.if.ua - Все для щасливого дитинства",
    description:
      "Інтернет-магазин Kolyska.if.ua пропонує все для комфортного та безпечного дитинства: дитячі візки, колиски, автокрісла, меблі, постільну білизну та багато іншого.",
    images: ["https://kolyska.if.ua/images/twitter-image.jpg"],
  },
  authors: [
    {
      name: "Kolyska.if.ua",
      url: "https://kolyska.if.ua",
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://kolyska.if.ua/site.webmanifest",
  alternates: {
    canonical: "https://kolyska.if.ua",
  },
  metadataBase: new URL("https://kolyska.if.ua"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${notoSans.variable} ${comfortaa.variable} antialiased flex flex-col overflow-x-hidden min-h-screen h-full w-full`}
      >
        <StoreProvider>
          <AuthProvider>
            <ToastProvider>
              <Header />
              <main className="flex-1">
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <PhoneLinkModal />
              </main>
              <Footer />
              <ScrollToTop />
            </ToastProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
