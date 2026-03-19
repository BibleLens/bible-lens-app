// src/app/api/subscribe/route.ts
// Server-side Buttondown relay with honeypot check and input validation
import { NextRequest, NextResponse } from "next/server";

const BUTTONDOWN_API_URL = "https://api.buttondown.com/v1/subscribers";

export async function POST(request: NextRequest) {
  const { email, website } = await request.json();

  // Honeypot check — return 200 silently so bots don't know they were caught
  if (website && typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ message: "Thanks for subscribing!" }, { status: 200 });
  }

  // Email validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // API key guard — fail fast if env var is missing
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Subscription service unavailable." },
      { status: 503 }
    );
  }

  // Buttondown API call — no type field so double opt-in default is preserved
  const bdResponse = await fetch(BUTTONDOWN_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email.trim().toLowerCase() }),
  });

  if (bdResponse.ok) {
    return NextResponse.json(
      { message: "Thanks! Check your inbox to confirm." },
      { status: 200 }
    );
  }

  if (bdResponse.status === 400) {
    // Buttondown returns 400 for duplicate subscribers — treat as success
    return NextResponse.json(
      { message: "You're already subscribed — thanks!" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: "Something went wrong on our end. Please try again." },
    { status: 500 }
  );
}
