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
  title: "KOLYSKA-IF-UA",
  description: "KOLYSKA-IF-UA",
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
