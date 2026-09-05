"use client";
import Link from "next/link";
export default function StudyError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="explorer-loading">
      <h1>This study couldn’t open.</h1>
      <p>
        Your study link still holds your place. Try opening it again, or
        continue in the Bible reader.
      </p>
      <button onClick={reset}>Try again</button>
      <Link href="/bible/luke/2">Read Luke 2 →</Link>
    </main>
  );
}
