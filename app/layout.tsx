import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const SITE_URL = "https://datakurator.com";
const TITLE = "Data Kurator | Enterprise Data, Simplified.";
const DESCRIPTION =
  "We help organizations accelerate AI adoption by building MVPs, PoCs, production-grade AI systems, and scalable data pipelines that drive measurable business value.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "enterprise AI",
    "data engineering",
    "MLOps",
    "generative AI",
    "LLM",
    "data pipeline",
    "AI consulting",
  ],
  authors: [{ name: "Data Kurator", url: SITE_URL }],
  creator: "Data Kurator",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Data Kurator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Data Kurator — Enterprise Data, Simplified.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}