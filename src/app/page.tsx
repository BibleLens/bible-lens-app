import type { Metadata } from "next";
import { HomepageLayout } from "@/components/homepage/HomepageLayout";
import { NavBar } from "@/components/homepage/NavBar";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturedTopicsSection } from "@/components/homepage/FeaturedTopicsSection";
import { ValuePropsSection } from "@/components/homepage/ValuePropsSection";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Bible Lens | Context Over Tradition",
  description:
    "Read Scripture through the lens of history and archaeology. Historically-grounded commentary on Genesis, Matthew, Revelation, and more — written in plain language for curious minds.",
  openGraph: {
    title: "Bible Lens | Context Over Tradition",
    description:
      "Ancient wisdom, modern clarity. Explore Scripture through historical context and archaeology.",
    type: "website",
    url: "https://biblelens.faith",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bible Lens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Lens | Context Over Tradition",
    description: "Ancient wisdom, modern clarity. Explore Scripture through historical context.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <HomepageLayout>
      <NavBar />
      <HeroSection />
      <FeaturedTopicsSection />
      <ValuePropsSection />
      <section className="px-6 pb-24 max-w-screen-2xl mx-auto">
        <EmailCapture
          headline="Read along with us"
          subtext="Fresh commentary on ancient texts, delivered when it drops. One email, no clutter — just new perspectives on Scripture."
        />
      </section>
    </HomepageLayout>
  );
}
