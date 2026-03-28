import type { Metadata, Viewport } from "next";
import { Newsreader, Manrope, Source_Sans_3, Noto_Sans_Samaritan } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { MotionProvider } from "@/components/MotionProvider";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSamaritan = Noto_Sans_Samaritan({
  variable: "--font-noto-samaritan",
  subsets: ["samaritan"],
  weight: "400",
  display: "swap",
  preload: false,
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={[
          newsreader.variable,
          manrope.variable,
          sourceSans.variable,
          notoSansSamaritan.variable,
          "antialiased",
          "bg-[var(--color-bg-primary)]",
          "text-[var(--color-text-primary)]",
        ].join(" ")}
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:no-underline"
              style={{
                background: "var(--color-bg-elevated)",
                color: "var(--color-text-primary)",
                border: "2px solid var(--color-cyan-400)",
              }}
            >
              Skip to main content
            </a>
            <ServiceWorkerRegistration />
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
