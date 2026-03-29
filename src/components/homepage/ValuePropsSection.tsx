"use client";

const VALUE_PROPS = [
  {
    icon: "history_edu",
    title: "Grounded in History",
    body: "Every insight is backed by archaeology, ancient languages, and historical context — not modern assumptions read back into ancient texts.",
  },
  {
    icon: "chat",
    title: "Written for Everyone",
    body: "No seminary degree required. Complex ideas explained in plain language, like a knowledgeable friend sharing what they've discovered.",
  },
  {
    icon: "travel_explore",
    title: "Honest Discovery",
    body: "No agenda, no denomination to defend. Just honest exploration of what the original audience would have understood.",
  },
] as const;

function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
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

function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

export function ValuePropsSection() {
  return (
    <section className="pt-24 pb-24 px-6 max-w-screen-2xl mx-auto">
      {/* Section header */}
      <div className="mb-20">
        <h2
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
        >
          Why Bible Lens?{" "}
          <span
            className="font-light italic text-3xl md:text-5xl block md:inline md:ml-6"
            style={{ color: "var(--homepage-primary)", opacity: 0.4 }}
          >
            Ancient wisdom, modern clarity
          </span>
        </h2>
        <div className="h-[2px] w-32 bg-[var(--homepage-primary)]/50" />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
        {VALUE_PROPS.map((card) => (
          <div
            key={card.title}
            className="glass-card group p-10 flex flex-col gap-6"
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

            <div className="relative z-10 flex flex-col gap-6">
              <span className="material-symbols-outlined text-[var(--homepage-primary)] text-4xl">
                {card.icon}
              </span>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed animate-content"
                style={{ fontFamily: "var(--homepage-font-body)", color: "var(--color-text-muted-warm)" }}
              >
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
