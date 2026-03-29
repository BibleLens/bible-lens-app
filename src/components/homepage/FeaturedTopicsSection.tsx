"use client";

import Image from "next/image";
import Link from "next/link";

const TOPIC_CARDS = [
  {
    slug: "daniel-7-son-of-man",
    title: "Daniel 7: Son of Man",
    category: "Prophetic Vision",
    description: "The one like a son of man coming with the clouds of heaven.",
    image: "/topic-cards/son-of-man.png",
    imageAlt: "Daniel 7 vision",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-2",
    imageClass:
      "opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110",
    gradient: "bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent",
    contentLayout: "justify-end",
    padding: "p-10",
  },
  {
    slug: "revelation-666-beast",
    title: "Revelation: 666 & The Beast",
    category: "Eschatology",
    description:
      "Decoding the imperial cult imagery and Nero as the historical 666.",
    image: "/topic-cards/beast-of-revelation.png",
    imageAlt: "Revelation beast imagery",
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-1",
    imageClass:
      "opacity-40 transition-transform duration-1000 group-hover:scale-105",
    gradient:
      "bg-gradient-to-r from-[#050508] via-transparent to-transparent",
    contentLayout: "justify-center",
    padding: "p-10",
    hasPulsingDot: true,
  },
  {
    slug: "genesis-creation-ancient-cosmology",
    title: "Genesis: Creation & Ancient Cosmology",
    category: "Origins & Context",
    description: null,
    image: "/topic-cards/adam-from-dust.png",
    imageAlt: "Genesis creation",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    imageClass:
      "opacity-50 transition-all duration-700 group-hover:opacity-80",
    gradient: "bg-gradient-to-t from-[#050508]/90 to-transparent",
    contentLayout: "justify-end",
    padding: "p-8",
  },
  {
    slug: "matthew-24-olivet-discourse",
    title: "Matthew 24: The Olivet Discourse",
    category: null,
    description: "From the Old Adam to the Last Adam.",
    image: "/topic-cards/olivet-discourse.jpeg",
    imageAlt: "Matthew 24 discourse",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    imageClass:
      "opacity-50 group-hover:scale-110 transition-transform duration-700",
    gradient: "bg-gradient-to-t from-[#050508]/90 to-transparent",
    contentLayout: "justify-end",
    padding: "p-8",
  },
  {
    slug: "isaiah-suffering-servant",
    title: "Isaiah: The Suffering Servant",
    category: "The Major Prophets",
    description: null,
    image: "/topic-cards/isaiah.jpeg",
    imageAlt: "Isaiah prophet",
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-1",
    imageClass:
      "opacity-40 transition-all duration-1000 group-hover:scale-105",
    gradient:
      "bg-gradient-to-r from-[#050508] via-[#050508]/20 to-transparent",
    contentLayout: "justify-center",
    padding: "p-10",
    hasCta: true,
    ctaText: "Explore Prophecy",
  },
  {
    slug: "ezekiel-gog-magog",
    title: "Ezekiel: Gog & Magog",
    category: "Military Symbolism",
    description: null,
    image: "/topic-cards/gog-of-magog.jpeg",
    imageAlt: "Ezekiel vision",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    imageClass:
      "opacity-50 transition-all duration-700 group-hover:rotate-1",
    gradient: "bg-gradient-to-t from-[#050508]/90 to-transparent",
    contentLayout: "justify-center items-center text-center",
    padding: "p-8",
  },
] as const;

function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  e.currentTarget.style.setProperty("--x", `${x}px`);
  e.currentTarget.style.setProperty("--y", `${y}px`);
  e.currentTarget.style.setProperty("--rx", `${(centerY - y) / 15}deg`);
  e.currentTarget.style.setProperty("--ry", `${(x - centerX) / 15}deg`);
}

function handleMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

export function FeaturedTopicsSection() {
  return (
    <section className="pt-24 pb-24 px-6 max-w-screen-2xl mx-auto">
      {/* Section header */}
      <div className="mb-20">
        <h2
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
        >
          Featured Topics{" "}
          <span
            className="font-light italic text-3xl md:text-5xl block md:inline md:ml-6"
            style={{ color: "var(--homepage-primary)", opacity: 0.4 }}
          >
            Ancient Texts, Fresh Eyes
          </span>
        </h2>
        <div className="h-[2px] w-32 bg-[var(--homepage-primary)]/50" />
      </div>

      {/* Bento grid */}
      <div className="bento-grid">
        {TOPIC_CARDS.map((card) => (
          <Link
            key={card.slug}
            href={`/topics/${card.slug}`}
            className={`${card.colSpan} ${card.rowSpan} glass-card group`}
            style={
              {
                "--x": "50%",
                "--y": "50%",
                "--rx": "0deg",
                "--ry": "0deg",
              } as React.CSSProperties
            }
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-spotlight" />
            <div className="shimmer-layer" />

            {/* Image layer */}
            <div className="absolute inset-0">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                className={`object-cover ${card.imageClass}`}
                sizes={
                  card.colSpan.includes("col-span-8")
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                priority={card.slug === "daniel-7-son-of-man"}
              />
              <div className={`absolute inset-0 ${card.gradient}`} />
            </div>

            {/* Content layer */}
            <div
              className={`relative h-full ${card.padding} flex flex-col ${card.contentLayout} z-10 animate-content`}
            >
              {card.slug === "daniel-7-son-of-man" && (
                <>
                  <p
                    className="micro-label text-[var(--color-cyan-400)] mb-3 cyan-glow-text"
                  >
                    {card.category}
                  </p>
                  <h3
                    className="text-4xl font-bold mb-3"
                    style={{
                      fontFamily: "var(--homepage-font-display)",
                      color: "var(--homepage-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--homepage-font-body)",
                      color: "var(--color-text-muted-warm)",
                    }}
                  >
                    {card.description}
                  </p>
                </>
              )}

              {card.slug === "revelation-666-beast" && (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2 h-2 bg-[var(--homepage-primary)] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                    <p
                      className="micro-label text-[var(--color-cyan-400)]"
                    >
                      {card.category}
                    </p>
                  </div>
                  <h3
                    className="text-4xl font-bold mb-3"
                    style={{
                      fontFamily: "var(--homepage-font-display)",
                      color: "var(--homepage-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-base max-w-lg"
                    style={{
                      fontFamily: "var(--homepage-font-body)",
                      color: "var(--color-text-muted-warm)",
                    }}
                  >
                    {card.description}
                  </p>
                </>
              )}

              {card.slug === "genesis-creation-ancient-cosmology" && (
                <>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--homepage-font-display)",
                      color: "var(--homepage-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="micro-label text-[var(--color-cyan-400)]/60"
                  >
                    {card.category}
                  </p>
                </>
              )}

              {card.slug === "matthew-24-olivet-discourse" && (
                <>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--homepage-font-display)",
                      color: "var(--homepage-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-xs italic opacity-70"
                    style={{
                      fontFamily: "var(--homepage-font-body)",
                      color: "var(--color-text-muted-warm)",
                    }}
                  >
                    {card.description}
                  </p>
                </>
              )}

              {card.slug === "isaiah-suffering-servant" && (
                <>
                  <div className="h-[1px] w-16 bg-[var(--homepage-primary)]/30 mb-4" />
                  <p
                    className="micro-label text-[var(--color-cyan-400)] mb-3"
                  >
                    {card.category}
                  </p>
                  <h3
                    className="text-4xl font-bold mb-6"
                    style={{
                      fontFamily: "var(--homepage-font-display)",
                      color: "var(--homepage-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <span
                    className="px-8 py-3 border border-[var(--homepage-primary)]/30 bg-[var(--homepage-primary)]/5 text-[var(--homepage-primary)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--homepage-primary)] hover:text-[var(--color-obsidian)] transition-all flex items-center gap-3 w-fit"
                    style={{ fontFamily: "var(--homepage-font-body)" }}
                  >
                    {card.ctaText}
                    <span className="material-symbols-outlined text-sm">
                      auto_awesome
                    </span>
                  </span>
                </>
              )}

              {card.slug === "ezekiel-gog-magog" && (
                <>
                  <h3
                    className="text-3xl font-bold mb-3"
                    style={{
                      fontFamily: "var(--homepage-font-display)",
                      color: "var(--homepage-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="micro-label text-[var(--color-cyan-400)]/60"
                  >
                    {card.category}
                  </p>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Ambient glow orbs */}
      <div
        className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#00e5ff]/5 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#00e5ff]/5 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />
    </section>
  );
}
