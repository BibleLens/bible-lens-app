import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";

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
  return <HomeClient />;
}
