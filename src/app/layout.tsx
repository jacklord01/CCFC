import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Castlebar Celtic FC",
  description: "Official Website of Castlebar Celtic FC. View latest fixtures, results, merchandise, and club news.",
  keywords: ["Castlebar Celtic", "Football Club", "CCFC", "Mayo Football", "Soccer"],
};

import { getClubSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getClubSettings();

  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FXJWNN4TVV"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FXJWNN4TVV', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <Navbar settings={settings} />
        <main style={{ minHeight: "80vh" }}>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
