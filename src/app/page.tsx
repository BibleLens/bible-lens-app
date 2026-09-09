import Link from "next/link";
import Image from "next/image";
import { EmailCapture } from "@/components/EmailCapture";
import { HomepageLayout } from "@/components/homepage/HomepageLayout";
import { NavBar } from "@/components/homepage/NavBar";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturedTopicsSection } from "@/components/homepage/FeaturedTopicsSection";
import { TimelineSpotlightSection } from "@/components/homepage/TimelineSpotlightSection";
import { pageMetadata } from "@/lib/page-metadata";
import { studyUrl } from "@/lib/explorer/state";
import "./homepage.css";

export const metadata = pageMetadata({
  title: "Bible Lens | The good news of God’s Kingdom",
  description: "Discover Jesus’ message of God’s Kingdom. Begin a journey through Scripture, the Kingdom video series, Temple films and connected Bible studies.",
  path: "/",
});

export default function Home() {
  return (
    <HomepageLayout>
      <NavBar />
      <main id="main-content">
        <HeroSection />
        <section className="home-kingdom home-section" aria-labelledby="kingdom-heading">
          <div>
            <span className="home-eyebrow">Jesus’ message. Our starting point.</span>
            <h2 id="kingdom-heading">Good news<br />for <em>the earth.</em></h2>
          </div>
          <div>
            <p>Jesus announced the good news of God’s Kingdom. He taught us to pray for God’s will to be done on earth. What does that mean for our world, and for us?</p>
            <p>Start with that question. Follow the passages, explore the Kingdom video series and discover the hope that connects the story.</p>
            <Link className="home-link" href="/start-here">Discover the Kingdom <span aria-hidden="true">→</span></Link>
          </div>
        </section>
        <FeaturedTopicsSection />
        <TimelineSpotlightSection />
        <section className="home-section home-discover" aria-labelledby="discover-heading">
          <span className="home-eyebrow">Keep exploring</span>
          <h2 id="discover-heading">Step into <em>the story.</em></h2>
          <p className="home-section-intro">See the places, follow the people and return to the text with fresh questions.</p>
          <div className="home-resource-grid">
            <Link className="home-film-card" href="/explore/temples">
              <Image src="/temples/solomon/poster-v1.jpg" alt="A reconstruction of Solomon’s Temple" width={1280} height={720} sizes="(max-width: 760px) 90vw, 55vw" />
              <div>
                <span className="home-eyebrow">Three short narrated films</span>
                <h3>The Temples</h3>
                <p>Solomon. Herod. Ezekiel’s vision. Explore their distinct settings, with passages and source notes close by.</p>
                <strong>Watch the Temple films <span aria-hidden="true">→</span></strong>
              </div>
            </Link>
            <div className="home-resource-list">
              <Link href="/explore/tabernacle"><span className="home-eyebrow">Interactive study</span><h3>The Tabernacle</h3><p>Explore the sanctuary and its furnishings, with the biblical descriptions alongside.</p><strong>Enter the study →</strong></Link>
              <Link href={studyUrl()}><span className="home-eyebrow">People, places & evidence</span><h3>The birth of Jesus</h3><p>Follow Matthew and Luke through a connected reading, map and historical investigation.</p><strong>Open the Explorer →</strong></Link>
            </div>
          </div>
        </section>
        <section className="home-section home-about">
          <div><span className="home-eyebrow">Welcome to Bible Lens</span><h2>We’re glad<br /><em>you’re here.</em></h2></div>
          <div><p>We’re Christians exploring Scripture, its history and the hope it holds. We share what we believe, show how we reached it and leave room for you to weigh the evidence.</p><Link className="home-link" href="/about">Get to know Bible Lens →</Link></div>
        </section>
        <div className="home-section home-newsletter"><EmailCapture headline="Stay with the journey" subtext="Get updates when new videos and studies are ready to explore." /></div>
      </main>
    </HomepageLayout>
  );
}
