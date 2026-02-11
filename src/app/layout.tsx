import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "../config/site";
import { FloatingCallButton } from "../components/FloatingCallButton";
import { getBrandFromHost } from "@/lib/brand";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get("host");
  const brand = getBrandFromHost(host);

  const isPublink = host?.includes("publink-teamplates");

  const title = brand.defaultTitle;
  const description = brand.defaultDescription;

  return {
    title,
    description,
    icons: {
      icon: brand.faviconPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: brand.siteName,
      images: [
        // Keep Lucas OG image for all, so we don't break existing links
        {
          url: site.og.image || "/og",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [site.og.image || "/og"],
    },
    metadataBase: isPublink
      ? new URL("https://publink-teamplates.vercel.app")
      : new URL("https://lucas-leplaquiste-55q4.vercel.app"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingCallButton />
      </body>
    </html>
  );
}

