import Link from "next/link";
import { READING_PATHS } from "@/lib/commentary-index";
import { pageMetadata } from "@/lib/page-metadata";
import { studyUrl } from "@/lib/explorer/state";
import { KINGDOM_EPISODES, KINGDOM_CHANNEL_URL } from "@/data/kingdom-series";
import "./start-here.css";

export const metadata = pageMetadata({
  title: "The Kingdom of God: start here | Bible Lens",
  description: "Begin with Jesus’ message of God’s Kingdom. Explore the Bible Lens video series, read the key passages and follow the hope of resurrection and a world restored.",
  path: "/start-here",
});

const readings = [
  { title: "The message Jesus brought", text: "Jesus called the Kingdom good news. He announced its arrival and invited people to respond with faith and a changed life.", links: [{ label: "Luke 4:43", href: "/bible/luke/4" }, { label: "Mark 1:14–15", href: "/bible/mark/1" }] },
  { title: "A prayer for the earth", text: "Jesus taught his followers to pray to the Father for his Kingdom to come and his will to be done here on earth. That hope gives our everyday lives a direction.", links: [{ label: "Matthew 6:9–10, 33", href: "/bible/matthew/6" }, { label: "Matthew 5:5", href: "/bible/matthew/5" }] },
  { title: "A risen King. A continuing mission.", text: "After God raised him from the dead, Jesus spoke to his disciples about the Kingdom. He commissioned them to be his witnesses and to make disciples, teaching what he had commanded.", links: [{ label: "Acts 1:3–8", href: "/bible/acts/1" }, { label: "Matthew 28:18–20", href: "/bible/matthew/28" }] },
  { title: "A hope that reaches beyond death", text: "Paul connects our resurrection hope to Jesus’ resurrection. Christ’s reign leads toward the defeat of the last enemy, death, and the day when God is all in all.", links: [{ label: "1 Corinthians 15:20–28", href: "/bible/1corinthians/15" }, { label: "Revelation 21:1–4", href: "/bible/revelation/21" }] },
];

export default function StartHere() {
  return (
    <main id="main-content" className="discovery-home collection-page kingdom-page">
      <header className="kingdom-intro">
        <span className="site-eyebrow">Welcome to Bible Lens · Start here</span>
        <h1>The Kingdom<br /><em>of God.</em></h1>
        <p>It was the good news Jesus brought. It’s the hope he taught us to pray for. And it’s where our journey begins.</p>
        <nav className="kingdom-jump-links" aria-label="Your Kingdom journey">
          <Link className="site-button primary" href="#kingdom-series">Explore the video series ↓</Link>
          <Link className="site-text-link" href="#kingdom-passages">Begin with the passages ↓</Link>
        </nav>
      </header>
      <figure className="kingdom-prayer">
        <blockquote>“Your kingdom come, Your will be done, on earth as it is in heaven.”</blockquote>
        <figcaption><Link href="/bible/matthew/6">Jesus’ prayer · Matthew 6:10</Link><span>Berean Standard Bible</span></figcaption>
      </figure>
      <section className="kingdom-meaning" aria-labelledby="kingdom-meaning-heading">
        <div><span className="site-eyebrow">What are we looking forward to?</span><h2 id="kingdom-meaning-heading">God’s good rule.<br /><em>A world restored.</em></h2></div>
        <div>
          <p>At its heart, the Kingdom is God’s rule, exercised through his appointed King, Jesus the Messiah. In Jesus’ ministry, people saw what that rule meant: healing, forgiveness, freedom and a call to love God and our neighbours.</p>
          <p>We believe Jesus reigns now and will return to establish his Millennial reign on earth. We look forward to the resurrection of the dead and the prospect of lasting life in a world being restored under his care.</p>
          <p>The Bible’s horizon reaches further still: death itself defeated, creation made new and God dwelling with his people. Christians differ on how parts of that future unfold. Here, we’ll show you the passages and explain how we read them.</p>
          <Link className="site-text-link" href="/about">More about what we believe →</Link>
        </div>
      </section>
      <section id="kingdom-series" className="kingdom-series" aria-labelledby="kingdom-series-heading">
        <div className="section-heading"><div><span className="site-eyebrow">The Kingdom video series</span><h2 id="kingdom-series-heading">One message.<br /><em>Three questions to follow.</em></h2></div><p>Begin with the big picture. Follow the signs of the Kingdom, then look closely at one of Jesus’ most discussed sayings.</p></div>
        <div className="kingdom-episodes">
          {KINGDOM_EPISODES.map((episode, index) => (
            <article className="kingdom-episode" key={episode.id}>
              <div className="episode-top"><span>PART {String(index + 1).padStart(2, "0")}</span><span>{episode.duration}</span></div>
              <h3>{episode.title}</h3><p>{episode.description}</p>
              {episode.published ? <a className="site-button primary" href={`https://www.youtube.com/watch?v=${episode.videoId}`} target="_blank" rel="noopener noreferrer">Watch part {index + 1} on YouTube ↗</a> : <p className="episode-release">Scheduled for <time dateTime={episode.releaseDate}>{episode.releaseLabel}</time></p>}
              <Link className="site-text-link" href={episode.readingHref}>{episode.published ? "Read alongside" : "Read ahead"}: {episode.readingLabel} →</Link>
            </article>
          ))}
        </div>
        <p className="kingdom-series-note">New episodes are scheduled for 13, 20 and 27 September. Follow the readings now, or join us on the channel. <a href={KINGDOM_CHANNEL_URL} target="_blank" rel="noopener noreferrer">Visit Bible Lens on YouTube ↗</a></p>
      </section>
      <section id="kingdom-passages" className="kingdom-readings" aria-labelledby="kingdom-passages-heading">
        <div className="section-heading"><div><span className="site-eyebrow">Read it for yourself</span><h2 id="kingdom-passages-heading">Four places to begin.</h2></div><p>Follow these in order, or start with the question that draws you in. Each link opens the whole chapter so you can read the context.</p></div>
        <div className="kingdom-reading-list">{readings.map((reading, i) => <article key={reading.title}><span className="reading-number">0{i + 1}</span><div><h3>{reading.title}</h3><p>{reading.text}</p><nav aria-label={`Passages for ${reading.title}`}>{reading.links.map(link => <Link className="site-text-link" key={link.href} href={link.href}>{link.label} →</Link>)}</nav></div></article>)}</div>
      </section>
      <section className="kingdom-further" aria-labelledby="kingdom-further-heading">
        <span className="site-eyebrow">Put the story in its setting</span><h2 id="kingdom-further-heading">Keep following the connections.</h2>
        <div className="path-cards">
          <Link className="path-card" href="/topics/daniel-7-son-of-man"><span>Prophecy & kingship</span><h3>The Son of Man in Daniel 7</h3><p>Explore the vision of one who receives authority and a Kingdom that will not pass away.</p><strong>Read the study →</strong></Link>
          <Link className="path-card" href="/explore/temples"><span>Three short films</span><h3>The Temples</h3><p>Visit Solomon’s Temple, Herod’s Temple and Ezekiel’s vision. Compare the reconstructions with their biblical sources.</p><strong>Watch and explore →</strong></Link>
          <Link className="path-card" href={studyUrl()}><span>A connected study</span><h3>The birth of Jesus</h3><p>Follow the people, places and questions surrounding the birth of God’s appointed King.</p><strong>Open the Explorer →</strong></Link>
        </div>
        <nav className="kingdom-library-links" aria-label="Explore the wider library"><Link href="/explore/tabernacle">The Tabernacle →</Link><Link href="/timelines">Bible timelines →</Link><Link href="/books">Read the Bible →</Link><Link href="/topics">Browse all topics →</Link></nav>
      </section>
      <details className="kingdom-more-paths"><summary>More guided reading paths</summary><p>Choose a theme and follow it through related chapters in the commentary library.</p><div className="kingdom-path-list">{READING_PATHS.map(path => <Link key={path.id} href={`/bible/${path.steps[0].bookId}/${path.steps[0].chapter}`}><span>{path.id === "john-unitarian-lens-arc" ? "Jesus and his Father" : path.title}</span><small>{path.steps.length} chapters →</small></Link>)}</div></details>
    </main>
  );
}
