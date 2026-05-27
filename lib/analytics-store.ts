import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type AnalyticsEventType = "visit" | "pageview" | "click" | "contact";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  label: string;
  time: string;
  visitorId: string;
  sessionId: string;
  ip: string;
  userAgent: string;
  view?: string;
  referrer?: string;
  name?: string;
  email?: string;
};

export type DailyMetric = {
  date: string;
  visits: number;
  pageviews: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  clicks: number;
  contacts: number;
};

export type VisitorProfile = {
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  sessions: number;
  eventCount: number;
  lastIp: string;
  views: string[];
};

export type AnalyticsSummary = {
  generatedAt: string;
  retentionDays: number;
  totalEvents: number;
  visitsToday: number;
  visitsLast7Days: number;
  visitsLast30Days: number;
  uniqueVisitorsToday: number;
  uniqueVisitorsLast7Days: number;
  uniqueVisitorsLast30Days: number;
  uniqueSessionsToday: number;
  activeSessionsLast15Min: number;
  totalClicks: number;
  totalContacts: number;
  dailyMetrics: DailyMetric[];
  topClicks: { label: string; count: number }[];
  visitors: VisitorProfile[];
};

const RETENTION_DAYS = 183;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;
const MAX_EVENTS = 50_000;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics-events.json");

let cache: AnalyticsEvent[] | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function isWithinDays(iso: string, days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(iso).getTime() >= cutoff;
}

async function loadEvents(): Promise<AnalyticsEvent[]> {
  if (cache) return cache;
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as AnalyticsEvent[];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

async function persist(events: AnalyticsEvent[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(events, null, 2), "utf8");
  cache = events;
}

function prune(events: AnalyticsEvent[]) {
  const cutoff = Date.now() - RETENTION_MS;
  const kept = events.filter((event) => new Date(event.time).getTime() >= cutoff);
  return kept.length > MAX_EVENTS ? kept.slice(-MAX_EVENTS) : kept;
}

export async function appendAnalyticsEvent(event: AnalyticsEvent) {
  const events = await loadEvents();
  events.push(event);
  const next = prune(events);
  writeQueue = writeQueue.then(() => persist(next));
  await writeQueue;
  return event;
}

export async function readAnalyticsEvents() {
  return prune(await loadEvents());
}

export function buildAnalyticsSummary(events: AnalyticsEvent[]): AnalyticsSummary {
  const visits = events.filter((e) => e.type === "visit");
  const pageviews = events.filter((e) => e.type === "pageview");
  const clicks = events.filter((e) => e.type === "click");
  const contacts = events.filter((e) => e.type === "contact");
  const sessionEvents = [...visits, ...pageviews];

  const visitsToday = visits.filter((e) => isWithinDays(e.time, 1)).length;
  const visitsLast7Days = visits.filter((e) => isWithinDays(e.time, 7)).length;
  const visitsLast30Days = visits.filter((e) => isWithinDays(e.time, 30)).length;

  const uniqueVisitorsToday = new Set(visits.filter((e) => isWithinDays(e.time, 1)).map((e) => e.visitorId)).size;
  const uniqueVisitorsLast7Days = new Set(visits.filter((e) => isWithinDays(e.time, 7)).map((e) => e.visitorId)).size;
  const uniqueVisitorsLast30Days = new Set(visits.filter((e) => isWithinDays(e.time, 30)).map((e) => e.visitorId)).size;

  const uniqueSessionsToday = new Set(sessionEvents.filter((e) => isWithinDays(e.time, 1)).map((e) => e.sessionId)).size;

  const activeCutoff = Date.now() - 15 * 60 * 1000;
  const activeSessionsLast15Min = new Set(
    events.filter((e) => new Date(e.time).getTime() >= activeCutoff).map((e) => e.sessionId),
  ).size;

  const clickCounts = clicks.reduce<Record<string, number>>((acc, event) => {
    acc[event.label] = (acc[event.label] || 0) + 1;
    return acc;
  }, {});

  const topClicks = Object.entries(clickCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([label, count]) => ({ label, count }));

  type DailyAccumulator = DailyMetric & { visitorSet: Set<string>; sessionSet: Set<string> };
  const dailyMap = new Map<string, DailyAccumulator>();
  for (const event of events) {
    const date = dayKey(event.time);
    const row =
      dailyMap.get(date) ??
      ({
        date,
        visits: 0,
        pageviews: 0,
        uniqueVisitors: 0,
        uniqueSessions: 0,
        clicks: 0,
        contacts: 0,
        visitorSet: new Set<string>(),
        sessionSet: new Set<string>(),
      } satisfies DailyAccumulator);

    if (event.type === "visit") row.visits += 1;
    if (event.type === "pageview") row.pageviews += 1;
    if (event.type === "click") row.clicks += 1;
    if (event.type === "contact") row.contacts += 1;
    row.visitorSet.add(event.visitorId);
    row.sessionSet.add(event.sessionId);
    dailyMap.set(date, row);
  }

  const dailyMetrics = Array.from(dailyMap.values())
    .map((row) => ({
      date: row.date,
      visits: row.visits,
      pageviews: row.pageviews,
      uniqueVisitors: row.visitorSet.size,
      uniqueSessions: row.sessionSet.size,
      clicks: row.clicks,
      contacts: row.contacts,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 90);

  const visitorMap = new Map<string, VisitorProfile & { sessionSet: Set<string>; viewSet: Set<string> }>();
  for (const event of events) {
    const existing =
      visitorMap.get(event.visitorId) ??
      ({
        visitorId: event.visitorId,
        firstSeen: event.time,
        lastSeen: event.time,
        sessions: 0,
        eventCount: 0,
        lastIp: event.ip,
        views: [],
        sessionSet: new Set<string>(),
        viewSet: new Set<string>(),
      } as VisitorProfile & { sessionSet: Set<string>; viewSet: Set<string> });

    existing.eventCount += 1;
    if (new Date(event.time) < new Date(existing.firstSeen)) existing.firstSeen = event.time;
    if (new Date(event.time) > new Date(existing.lastSeen)) {
      existing.lastSeen = event.time;
      existing.lastIp = event.ip;
    }
    existing.sessionSet.add(event.sessionId);
    if (event.view) existing.viewSet.add(event.view);
    visitorMap.set(event.visitorId, existing);
  }

  const visitors = Array.from(visitorMap.values())
    .map((visitor) => ({
      visitorId: visitor.visitorId,
      firstSeen: visitor.firstSeen,
      lastSeen: visitor.lastSeen,
      sessions: visitor.sessionSet.size,
      eventCount: visitor.eventCount,
      lastIp: visitor.lastIp,
      views: Array.from(visitor.viewSet),
    }))
    .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
    .slice(0, 100);

  return {
    generatedAt: new Date().toISOString(),
    retentionDays: RETENTION_DAYS,
    totalEvents: events.length,
    visitsToday,
    visitsLast7Days,
    visitsLast30Days,
    uniqueVisitorsToday,
    uniqueVisitorsLast7Days,
    uniqueVisitorsLast30Days,
    uniqueSessionsToday,
    activeSessionsLast15Min,
    totalClicks: clicks.length,
    totalContacts: contacts.length,
    dailyMetrics,
    topClicks,
    visitors,
  };
}
