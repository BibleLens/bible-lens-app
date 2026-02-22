import type { Metadata, Viewport } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biblelens.faith"),
  title: "Bible Lens | Context Over Tradition",
  description: "Ancient wisdom, modern clarity. Explore Scripture through historical context with the Bible Lens app.",
  keywords: ["Bible", "Scripture", "Biblical study", "historical context", "Bible app"],
  authors: [{ name: "Bible Lens" }],
  creator: "Bible Lens",
  publisher: "Bible Lens",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://biblelens.faith",
    siteName: "Bible Lens",
    title: "Bible Lens | Context Over Tradition",
    description: "Ancient wisdom, modern clarity. Explore Scripture through historical context.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bible Lens - Context Over Tradition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Lens | Context Over Tradition",
    description: "Ancient wisdom, modern clarity. Explore Scripture through historical context.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${sourceSans.variable} antialiased bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]`}
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
