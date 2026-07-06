import type { Metadata, Viewport } from "next";
import { Newsreader, Manrope, Source_Sans_3, Noto_Sans_Samaritan, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { MotionProvider } from "@/components/MotionProvider";
import { FocusResetOnNav } from "@/components/FocusResetOnNav";
import { SiteNav } from "@/components/SiteNav";
import { MobileTabBar } from "@/components/MobileTabBar";
import { NavigationLoader } from "@/components/NavigationLoader";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
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

// Site-wide entity graph for AI search engines and rich results.
// The Organization.description carries the doctrinal boundary deliberately:
// what Bible Lens IS (strict, historically grounded, independent) and what it
// is NOT (a mainstream Christian-creator ministry) — so an engine that lifts the
// entity also lifts the distinction. `sameAs` wires the YouTube channel and
// Pinterest profile so engines can reconcile the entity across surfaces.
const SITE_URL = "https://biblelens.faith";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Bible Lens",
      url: SITE_URL,
      slogan: "Context Over Tradition",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/bible-lens-logo-no-tagline.svg`,
      },
      description:
        "Bible Lens is an independent project publishing historically grounded Bible commentary — reading each passage through the lens of the ancient Near Eastern world to recover what it meant to its original audience before later tradition reshaped it. It holds a strict scriptural standard: readings are argued from the primary text and its historical-cultural context, not from creedal tradition or denominational consensus, and it names where the historical reading parts from popular Christian teaching. It is not affiliated with, and does not speak for, mainstream Christian-creator ministries.",
      sameAs: [
        "https://www.youtube.com/@BibleLens-i5f",
        "https://www.pinterest.com/biblelensfaith/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Bible Lens",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body
        className={[
          newsreader.variable,
          manrope.variable,
          sourceSans.variable,
          notoSansSamaritan.variable,
          spaceGrotesk.variable,
          "antialiased",
          "bg-[var(--color-bg-primary)]",
          "text-[var(--color-text-primary)]",
          "pb-[calc(60px+env(safe-area-inset-bottom))]",
          "md:pb-0",
        ].join(" ")}
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        <ThemeProvider>
          <NavigationLoader />
          <MotionProvider>
            <FocusResetOnNav />
            {/* Focus sentinel: programmatically focusable div with no href.
                FocusResetOnNav focuses this after client-side navigation to reset
                the keyboard starting point to the top of the page. Using a plain
                div instead of the skip-link <a> avoids triggering browser hash
                navigation when .focus() is called on an anchor element. */}
            <div id="focus-sentinel" tabIndex={-1} aria-hidden="true" style={{ outline: "none" }} />
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
            <SiteNav />
            {children}
            <HomepageFooter />
            <MobileTabBar />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
