import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIRD WATCH",
  description: "Bird Watching App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="BIRD WATCH" />
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_UMAMI_ANALYTICS_URL && (
            <script
              async
              defer
              src={process.env.NEXT_PUBLIC_UMAMI_ANALYTICS_URL}
              data-website-id={
                process.env.NEXT_PUBLIC_UMAMI_ANALYTICS_WEBSITE_ID
              }
            ></script>
          )}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
