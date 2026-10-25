// src/app/api/subscribe/route.ts
// Server-side Buttondown relay with honeypot check and input validation
import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { crossOrigin, readJsonObject } from '@/lib/request-guards';
import { checkSubscribeRateLimit, getClientIp } from '@/lib/rate-limit';

const BUTTONDOWN_API_URL = "https://api.buttondown.com/v1/subscribers";

export async function POST(request: NextRequest) {
  if (crossOrigin(request)) return Response.json({ error: 'Forbidden.' }, { status: 403 });
  const parsed = await readJsonObject(request, 8192);
  if (parsed.response) return parsed.response;
  const { email, website } = parsed.body;

  // Return silently for honeypot submissions without contacting Buttondown.
  if (website && typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ message: "Thanks for subscribing!" }, { status: 200 });
  }

  // Email validation
  if (
    typeof email !== "string" ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Fail fast if the server credential is missing.
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Subscription service unavailable." },
      { status: 503 }
    );
  }

  const { allowed, resetAt } = checkSubscribeRateLimit(getClientIp(request));
  if (!allowed) {
    return Response.json({ error: 'Too many signups. Please try again in a minute.' }, {
      status: 429, headers: { 'Retry-After': String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))) },
    });
  }

  // Only trust the client IP supplied by Vercel on a Vercel deployment.
  // Buttondown uses it for spam checks instead of the shared server IP.
  const forwardedIP = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.trim()
    : undefined;
  const ipAddress = forwardedIP && isIP(forwardedIP) ? forwardedIP : undefined;

  try {
    // Keep the default double opt-in and firewall checks enabled.
    const bdResponse = await fetch(BUTTONDOWN_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email.trim().toLowerCase(),
        ...(ipAddress ? { ip_address: ipAddress } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
    });

    if (bdResponse.ok) {
      return NextResponse.json(
        { message: "Thanks! Check your inbox to confirm." },
        { status: 200 }
      );
    }

    const failure: unknown = await bdResponse.json().catch(() => null);
    const code = failure && typeof failure === "object" && "code" in failure
      ? failure.code
      : undefined;

    // HTTP 400 also covers firewall and validation failures, not just duplicates.
    // Never turn an unconfirmed provider rejection into a successful signup.
    if (bdResponse.status === 400 && code === "subscriber_blocked") {
      return NextResponse.json(
        { error: "We couldn't accept this signup. Please contact us if this keeps happening." },
        { status: 403 }
      );
    }
    if (bdResponse.status === 400 && code === "email_invalid") {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (bdResponse.status === 429) {
      return NextResponse.json(
        { error: "Signups are temporarily busy. Please try again later." },
        { status: 429 }
      );
    }
  } catch {
    // Do not expose provider responses, submitted addresses or credentials.
  }

  return NextResponse.json(
    { error: "We couldn't complete your signup. Please try again later." },
    { status: 502 }
  );
}
