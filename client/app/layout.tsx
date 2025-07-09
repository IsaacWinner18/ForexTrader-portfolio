import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FX Signals Pro | Premium Forex Trading Signals",
  description:
    "Join our 10,000+ Telegram community getting daily Forex signals with 83% accuracy. Profit smarter, trade with expert guidance and real-time support.",
  openGraph: {
    title: "FX Signals Pro | Premium Forex Trading Signals",
    description:
      "Join our 10,000+ Telegram community getting daily Forex signals with 83% accuracy. Profit smarter, trade with expert guidance and real-time support.",
    url: "https://your-website-url.com/", // Replace with your actual site URL
    siteName: "FX Signals Pro",
    images: [
      {
        url: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1752027330/expertoption_dcze8n.png",
        width: 1200,
        height: 630,
        alt: "FX Signals Pro - Premium Forex Trading Signals",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
