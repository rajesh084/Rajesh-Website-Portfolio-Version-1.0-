import { NextRequest, NextResponse } from "next/server";
import {
  appendAnalyticsEvent,
  buildAnalyticsSummary,
  readAnalyticsEvents,
  type AnalyticsEvent,
  type AnalyticsEventType,
} from "@/lib/analytics-store";

function getIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function GET() {
  const events = await readAnalyticsEvents();
  const summary = buildAnalyticsSummary(events);
  return NextResponse.json({
    events: events.slice(-1000),
    summary,
    storage: "file",
    dataFile: "data/analytics-events.json",
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const allowedTypes: AnalyticsEventType[] = ["visit", "pageview", "click", "contact"];
  const type = allowedTypes.includes(body.type) ? (body.type as AnalyticsEventType) : "pageview";

  const event: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    label: typeof body.label === "string" ? body.label : "Unknown event",
    time: new Date().toISOString(),
    visitorId: typeof body.visitorId === "string" ? body.visitorId : "unknown-visitor",
    sessionId: typeof body.sessionId === "string" ? body.sessionId : "unknown-session",
    ip: getIp(req),
    userAgent: req.headers.get("user-agent") || "unknown",
    view: typeof body.view === "string" ? body.view : undefined,
    referrer: typeof body.referrer === "string" ? body.referrer : undefined,
    name: typeof body.name === "string" ? body.name : undefined,
    email: typeof body.email === "string" ? body.email : undefined,
  };

  await appendAnalyticsEvent(event);
  return NextResponse.json({ ok: true, event });
}
