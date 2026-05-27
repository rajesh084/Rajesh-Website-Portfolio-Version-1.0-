"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BriefcaseBusiness, ExternalLink, Mail, Phone } from "lucide-react";

type ViewId = "home" | "about" | "expertise" | "experience" | "projects" | "certifications" | "contact";
type CertCategory = "All" | "HPE" | "Juniper" | "Dell" | "Cisco" | "Microsoft" | "Salesforce" | "Other";

type AnalyticsEvent = {
  id: string;
  type: "visit" | "pageview" | "click" | "contact";
  label: string;
  time: string;
  visitorId: string;
  sessionId: string;
  ip?: string;
  userAgent?: string;
  view?: string;
  referrer?: string;
  name?: string;
  email?: string;
};

type DailyMetric = {
  date: string;
  visits: number;
  pageviews: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  clicks: number;
  contacts: number;
};

type VisitorProfile = {
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  sessions: number;
  eventCount: number;
  lastIp: string;
  views: string[];
};

type AnalyticsSummary = {
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

const OWNER_PASSWORD = "ParuRaj084$";

const profile = {
  name: "Rajesh R G",
  title: "Solutions Engineer",
  tagline: "Pre-Sales Engineer | HPE Aruba | Cloud | Cybersecurity",
  location: "Toronto, Canada",
  email: "rajeshrg086@gmail.com",
  phone: "+13652929588",
  linkedin: "linkedin.com/in/rajesh-r-g-948136a0",
  linkedinUrl: "https://www.linkedin.com/in/rajesh-r-g-948136a0/",
  photo: "/rajesh-profile.png",
  photoNew: "/rajesh-profile-new.png",
  background: "/toronto-skyline.jpg",
};

const navItems: { id: ViewId; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "about", label: "About", icon: "◎" },
  { id: "expertise", label: "Expertise", icon: "✣" },
  { id: "experience", label: "Experience", icon: "▣" },
  { id: "projects", label: "Projects", icon: "▤" },
  { id: "certifications", label: "Certifications", icon: "◈" },
  { id: "contact", label: "Contact", icon: "✉" },
];

const expertise = [
  ["HPE Aruba Networking", "Wired, wireless, switching, Aruba Central, licensing, BOMs, and customer solution mapping."],
  ["Switching & Wireless", "Enterprise switching, Wi-Fi 6/6E, access layer design, WLAN conversations, and optimization."],
  ["Cybersecurity", "Secure access, VPN, threat-aware network design, cyber recovery, and data protection alignment."],
  ["Cloud Solutions", "AWS, Azure, GCP, hybrid cloud, infrastructure modernization, and cloud-connected networking."],
  ["Data Protection", "Backup, recovery, cyber recovery, disaster recovery strategy, and business continuity conversations."],
  ["Consulting & Pre-Sales", "Discovery, technical positioning, solution design, RFI/RFP support, demos, and workshops."],
];

const companies = [
  { name: "CDW Canada", role: "Networking Solutions Specialist", logo: "/logos/cdw.svg" },
  { name: "Dell Technologies", role: "Engineer 2, Product Technologist", logo: "/logos/dell.svg" },
  { name: "Tech Mahindra", role: "Security Analyst", logo: "/logos/tech-mahindra.svg" },
  { name: "Cisco", role: "TAC Engineer", logo: "/logos/cisco.svg" },
  { name: "Hewlett Packard Enterprise", role: "Wireless Network Engineer", logo: "/logos/hpe.svg" },
];

const experience = [
  { company: "CDW Canada", role: "Networking Solutions Specialist", period: "Jul 2025 - Present", location: "Toronto, Canada", logo: "/logos/cdw.svg", focus: "HPE Aruba Networking, customer discovery, solution design, BOMs, demos, workshops, and sales enablement." },
  { company: "Dell Technologies", role: "Engineer 2, Product Technologist", period: "Oct 2021 - Oct 2024", location: "Bengaluru, India", logo: "/logos/dell.svg", focus: "Data protection, cyber recovery, cloud-integrated solutions, technical validation, and cross-platform enablement." },
  { company: "Tech Mahindra", role: "Security Analyst", period: "May 2020 - Oct 2021", location: "Bengaluru, India", logo: "/logos/tech-mahindra.svg", focus: "Pulse Secure VPN troubleshooting, authentication, certificates, tunneling, licensing, RCA, and escalation management." },
  { company: "Cisco", role: "TAC Engineer", period: "Nov 2018 - May 2020", location: "Bengaluru, India", logo: "/logos/cisco.svg", focus: "Enterprise networking support, technical troubleshooting, customer issue resolution, and escalation handling." },
  { company: "Hewlett Packard Enterprise", role: "Wireless Network Engineer", period: "Feb 2017 - Nov 2018", location: "Bengaluru, India", logo: "/logos/hpe.svg", focus: "Wireless networking, deployment support, optimization, and customer technical assistance." },
];

const projects = [
  ["HPE Aruba Network Modernization", "Networking", "Customer-ready Aruba switching and wireless recommendations aligned to technical and commercial requirements."],
  ["AI-Assisted BOM and RFI Workflow", "AI Workflow", "Interactive workflow concept to classify customer asks, find missing details, and generate BOM or RFI next steps."],
  ["Network Architecture Diagrams", "Design", "Proposal-friendly topology visuals for customer conversations, internal alignment, and solution validation."],
  ["Customer Discovery Assistant", "Pre-Sales", "Guided discovery prompts to help account teams uncover requirements, risks, and expansion opportunities."],
  ["Data Backup & DR Solution", "Data Protection", "Data protection and cyber recovery focused solution approach for hybrid and enterprise environments."],
  ["Sales Enablement Templates", "Enablement", "Reusable technical content, proposal notes, and customer-ready messaging for faster sales cycles."],
];

const certifications: { name: string; org: string; detail: string; logo: string; category: CertCategory }[] = [
  { name: "HPE Sales Certified", org: "Hewlett Packard Enterprise", detail: "Compute and Storage Solutions", logo: "/certifications/hpe.svg", category: "HPE" },
  { name: "HPE Aruba Sales Certified", org: "Hewlett Packard Enterprise", detail: "Aruba campus networking sales credential", logo: "/certifications/hpe.svg", category: "HPE" },
  { name: "Juniper Networks Certified Associate, Data Center", org: "Juniper Networks", detail: "JNCIA-DC", logo: "/certifications/juniper-jncia-dc.svg", category: "Juniper" },
  { name: "Ingenious Technical Champion", org: "Juniper Networks", detail: "Technical champion credential", logo: "/certifications/juniper-champion.svg", category: "Juniper" },
  { name: "Specialist - Technology Architect", org: "Dell Technologies", detail: "Data Protection Version 1.0", logo: "/certifications/dell.svg", category: "Dell" },
  { name: "Dell GenAI Foundations", org: "Dell Technologies", detail: "Generative AI foundation credential", logo: "/certifications/dell.svg", category: "Dell" },
  { name: "Microsoft Azure Fundamentals", org: "Microsoft", detail: "AZ-900 foundation knowledge", logo: "/certifications/microsoft.svg", category: "Microsoft" },
  { name: "CCNA", org: "Cisco", detail: "Cisco networking foundation", logo: "/certifications/cisco.svg", category: "Cisco" },
  { name: "Salesforce Agentforce Specialist", org: "Salesforce", detail: "Agentforce Specialist", logo: "/certifications/salesforce.svg", category: "Salesforce" },
  { name: "ITIL V4 Foundation", org: "PeopleCert", detail: "IT service management foundation", logo: "/certifications/itil.svg", category: "Other" },
  { name: "Business English Certificate", org: "Cambridge", detail: "B1 Level", logo: "/certifications/cambridge.svg", category: "Other" },
];

const certFilters: CertCategory[] = ["All", "HPE", "Juniper", "Dell", "Cisco", "Microsoft", "Salesforce", "Other"];

function getVisitorId() {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem("rgVisitorId");
  if (!id) {
    id = `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("rgVisitorId", id);
  }
  return id;
}

function getSessionId() {
  if (typeof window === "undefined") return "server-session";
  let id = sessionStorage.getItem("rgSessionId");
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem("rgSessionId", id);
  }
  return id;
}

async function sendEvent(
  type: AnalyticsEvent["type"],
  label: string,
  extra?: Partial<AnalyticsEvent> & { view?: string },
) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        label,
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        view: extra?.view,
        referrer: typeof document !== "undefined" ? document.referrer || "direct" : undefined,
        ...extra,
      }),
    });
  } catch {
    // Local preview can still run if analytics is unavailable.
  }
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass ios-card rounded-[2rem] ${className}`}>{children}</div>;
}

function AnimatedView({ viewId, children }: { viewId: ViewId; children: ReactNode }) {
  return (
    <div key={viewId} className="ios-page-enter">
      {children}
    </div>
  );
}

function LogoImage({ src, name }: { src: string; name: string }) {
  return <img src={src} alt={name} className="mx-auto h-12 w-[150px] object-contain" />;
}

function CertLogoImage({ src, name }: { src: string; name: string }) {
  return <img src={src} alt={name} className="mx-auto h-32 w-[170px] object-contain" />;
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/45 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-blue-500" /> {eyebrow}
      </div>
      <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{subtitle}</p>
    </div>
  );
}

function LinkedInButton({
  label = "LinkedIn Profile",
  className = "",
  onClick,
}: {
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={profile.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="Open Rajesh R G LinkedIn profile"
      className={`ios-press inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0a66c2] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-900/20 hover:-translate-y-0.5 hover:bg-[#084f9a] ${className}`}
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function OwnerLogin() {
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  async function loadEvents() {
    const res = await fetch("/api/analytics", { cache: "no-store" });
    const data = await res.json();
    setEvents(Array.isArray(data.events) ? data.events : []);
    setSummary(data.summary ?? null);
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (password !== OWNER_PASSWORD) {
      setError("Wrong password");
      return;
    }
    setError("");
    setIsOwner(true);
    await loadEvents();
  }

  useEffect(() => {
    if (!isOwner || !autoRefresh) return;
    const timer = window.setInterval(() => {
      void loadEvents();
    }, 15000);
    return () => window.clearInterval(timer);
  }, [isOwner, autoRefresh]);

  function exportCsv() {
    const header = ["time", "type", "label", "visitorId", "sessionId", "view", "ip", "referrer", "name", "email"];
    const rows = events.map((event) =>
      [
        event.time,
        event.type,
        event.label,
        event.visitorId,
        event.sessionId,
        event.view ?? "",
        event.ip ?? "",
        event.referrer ?? "",
        event.name ?? "",
        event.email ?? "",
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const topClicks = summary?.topClicks ?? [];
  const maxClick = Math.max(1, ...topClicks.map((item) => item.count));

  if (!isOwner) {
    return (
      <form className="space-y-4" onSubmit={login}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Owner login</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">Private visitor stats</h3>
          <p className="mt-2 text-sm text-slate-600">Visitor status is hidden from public visitors and only visible after owner login.</p>
        </div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter owner password" className="w-full rounded-2xl border border-white/55 bg-white/65 px-4 py-3 outline-none focus:border-blue-400" />
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white">Login</button>
      </form>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Owner only</p>
          <h3 className="text-2xl font-semibold text-slate-950">Visitor telemetry</h3>
          {summary && (
            <p className="mt-1 text-xs text-slate-600">
              Retains {summary.retentionDays} days · Updated {new Date(summary.generatedAt).toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setAutoRefresh((value) => !value)} className={`rounded-xl px-3 py-2 text-sm font-semibold ${autoRefresh ? "bg-emerald-600 text-white" : "bg-white/70 text-slate-800"}`}>
            {autoRefresh ? "Live (15s)" : "Paused"}
          </button>
          <button type="button" onClick={exportCsv} className="rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-slate-800">
            Export CSV
          </button>
          <button type="button" onClick={loadEvents} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Refresh
          </button>
        </div>
      </div>

      {summary && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Stat value={summary.visitsToday} label="Sessions today" />
            <Stat value={summary.uniqueVisitorsToday} label="Unique visitors today" />
            <Stat value={summary.visitsLast7Days} label="Sessions (7 days)" />
            <Stat value={summary.uniqueVisitorsLast7Days} label="Unique visitors (7 days)" />
            <Stat value={summary.visitsLast30Days} label="Sessions (30 days)" />
            <Stat value={summary.uniqueVisitorsLast30Days} label="Unique visitors (30 days)" />
            <Stat value={summary.activeSessionsLast15Min} label="Active now (15 min)" />
            <Stat value={summary.totalClicks} label="Total clicks (all time)" />
            <Stat value={summary.totalContacts} label="Contact attempts" />
            <Stat value={summary.totalEvents} label="Telemetry events stored" />
          </div>

          <div className="rounded-2xl bg-white/55 p-4">
            <p className="mb-3 font-semibold text-slate-950">Daily visit matrix</p>
            <div className="soft-scrollbar max-h-56 overflow-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="py-2 pr-2">Date</th>
                    <th className="py-2 pr-2">Sessions</th>
                    <th className="py-2 pr-2">Visitors</th>
                    <th className="py-2 pr-2">Page views</th>
                    <th className="py-2 pr-2">Clicks</th>
                    <th className="py-2">Contacts</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.dailyMetrics.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-3 text-slate-600">
                        No daily data yet.
                      </td>
                    </tr>
                  ) : (
                    summary.dailyMetrics.map((day) => (
                      <tr key={day.date} className="border-b border-slate-100">
                        <td className="py-2 pr-2 font-semibold text-slate-900">{day.date}</td>
                        <td className="py-2 pr-2">{day.visits}</td>
                        <td className="py-2 pr-2">{day.uniqueVisitors}</td>
                        <td className="py-2 pr-2">{day.pageviews}</td>
                        <td className="py-2 pr-2">{day.clicks}</td>
                        <td className="py-2">{day.contacts}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white/55 p-4">
            <p className="mb-3 font-semibold text-slate-950">Visitor profiles</p>
            <div className="soft-scrollbar max-h-56 space-y-2 overflow-auto pr-1">
              {summary.visitors.length === 0 ? (
                <p className="text-sm text-slate-600">No visitors recorded yet.</p>
              ) : (
                summary.visitors.map((visitor) => (
                  <div key={visitor.visitorId} className="rounded-xl bg-white/70 p-3 text-xs">
                    <p className="font-semibold text-slate-900">{visitor.visitorId.slice(0, 28)}…</p>
                    <p className="mt-1 text-slate-600">
                      First: {new Date(visitor.firstSeen).toLocaleString()} · Last: {new Date(visitor.lastSeen).toLocaleString()}
                    </p>
                    <p className="mt-1 text-slate-600">
                      Sessions: {visitor.sessions} · Events: {visitor.eventCount} · IP: {visitor.lastIp}
                    </p>
                    {visitor.views.length > 0 && <p className="mt-1 text-slate-600">Views: {visitor.views.join(", ")}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      <div className="rounded-2xl bg-white/55 p-4">
        <p className="mb-3 font-semibold text-slate-950">Top clicked items</p>
        {topClicks.length === 0 ? (
          <p className="text-sm text-slate-600">No clicks tracked yet.</p>
        ) : (
          topClicks.map((item) => (
            <div key={item.label} className="mb-3">
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="truncate">{item.label}</span>
                <span>{item.count}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${(item.count / maxClick) * 100}%` }} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-2xl bg-white/55 p-4">
        <p className="mb-3 font-semibold text-slate-950">Recent activity</p>
        <div className="soft-scrollbar max-h-72 space-y-2 overflow-auto pr-1">
          {events
            .slice(-40)
            .reverse()
            .map((event) => (
              <div key={event.id} className="rounded-xl bg-white/70 p-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="font-semibold">{event.label}</span>
                  <span className="shrink-0 text-xs text-slate-500">{new Date(event.time).toLocaleString()}</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  {event.type}
                  {event.view ? ` · ${event.view}` : ""} · IP: {event.ip || "unknown"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Visitor: {event.visitorId.slice(0, 22)}… · Session: {event.sessionId.slice(0, 18)}…
                </p>
                {(event.name || event.email) && (
                  <p className="mt-1 text-xs text-slate-600">
                    {event.name || ""} {event.email || ""}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>

      <p className="text-xs leading-5 text-slate-600">
        Data is saved to <code className="rounded bg-white/60 px-1">data/analytics-events.json</code> on your server (kept ~6 months).
        Each browser gets its own visitor ID; each tab session gets a session ID. Restart the dev server only after saving — data persists across refreshes.
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return <div className="rounded-2xl bg-white/60 p-4"><p className="text-3xl font-semibold text-slate-950">{value}</p><p className="text-sm text-slate-600">{label}</p></div>;
}

function HomeView({ goTo, trackClick }: { goTo: (view: ViewId) => void; trackClick: (label: string) => void }) {
  return (
    <div className="space-y-8">
      <section className="grid min-h-[660px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="ios-fade-in">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/45 px-5 py-2.5 text-base font-semibold text-slate-800 shadow-sm backdrop-blur-xl"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Toronto based pre-sales engineer</div>
          <h1 className="max-w-4xl text-6xl font-bold tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">{profile.name}</h1>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-blue-900 md:text-5xl">{profile.title}</h2>
          <p className="mt-5 text-xl font-normal text-slate-700">{profile.tagline}</p>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-700">Helping enterprises design, secure, and scale modern networking solutions. I bridge business goals with technical excellence to deliver reliable, future-ready outcomes.</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button type="button" onClick={() => goTo("projects")} className="ios-press rounded-2xl bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-slate-900/25 hover:-translate-y-0.5 hover:bg-blue-700">Explore My Work</button>
            <button type="button" onClick={() => goTo("contact")} className="ios-press rounded-2xl border border-white/60 bg-white/55 px-7 py-4 text-base font-semibold text-slate-950 shadow-xl backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/75">Get In Touch</button>
            <LinkedInButton label="LinkedIn" onClick={() => trackClick("LinkedIn: hero")} className="px-7 py-4 text-base" />
          </div>
        </div>
        <div className="ios-photo-enter mx-auto w-full max-w-[560px]">
          <GlassCard className="p-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.2rem] border border-white/70 bg-white/45 p-2">
                <img src={profile.photo} alt={`${profile.name} — event portrait`} className="h-auto w-full object-contain object-center" />
              </div>
              <div className="overflow-hidden rounded-[1.2rem] border border-white/70 bg-slate-950 p-2">
                <img src={profile.photoNew} alt={`${profile.name} — professional headshot`} className="h-auto w-full object-contain object-center" />
              </div>
            </div>
          </GlassCard>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("LinkedIn: hero")} aria-label="LinkedIn profile" className="ios-press glass flex items-center justify-center rounded-2xl p-4 text-slate-950 hover:-translate-y-0.5">
              <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={`mailto:${profile.email}`} onClick={() => trackClick("Email: hero")} aria-label="Email Rajesh" className="ios-press glass flex items-center justify-center rounded-2xl p-4 text-slate-950 hover:-translate-y-0.5">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={`tel:${profile.phone}`} onClick={() => trackClick("Phone: hero")} aria-label="Call Rajesh" className="ios-press glass flex items-center justify-center rounded-2xl p-4 text-slate-950 hover:-translate-y-0.5">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <div className="ios-stagger grid grid-cols-2 gap-4 lg:grid-cols-6">{expertise.map(([title]) => <button type="button" key={title} onClick={() => goTo("expertise")} className="ios-press rounded-[1.4rem] border border-white/45 bg-white/35 p-5 text-left font-semibold shadow-xl backdrop-blur-2xl hover:-translate-y-1 hover:bg-white/55">{title}</button>)}</div>
      <GlassCard className="p-6"><h3 className="mb-5 text-center text-lg font-semibold text-slate-950">Trusted Experience Across Leading Technology Organizations</h3><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{companies.map((company) => <div key={company.name} className="rounded-2xl border border-white/45 bg-white/40 p-5 shadow-sm backdrop-blur-xl"><LogoImage src={company.logo} name={company.name} /><p className="mt-3 text-center text-xs font-semibold text-slate-700">{company.role}</p></div>)}</div></GlassCard>
    </div>
  );
}

const websiteFeatures = [
  "Easy-to-read educational content on AI, cloud, networking, and security",
  "A clean and responsive design for desktop and mobile users",
  "A simple user-friendly layout focused on learning and exploration",
  "Cloud-hosted deployment using AWS",
];

function AboutView({ goTo, trackClick }: { goTo: (view: ViewId) => void; trackClick: (label: string) => void }) {
  function shareFeedback() {
    trackClick("Share Feedback");
    goTo("contact");
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="About"
        title="About this website"
        subtitle="A personal learning platform for AI, cloud, networking, and technology—built to explain complex ideas in a clear, practical way."
      />

      <GlassCard className="uniform-copy p-8">
        <h3 className="text-2xl font-bold text-slate-950">About This Website</h3>
        <p className="mt-4">
          This website was designed and developed by me as a personal AI, cloud, networking, and technology learning platform. The goal of this site is to simplify complex technical concepts and make them easier to understand through clear explanations, practical examples, and educational content.
        </p>
        <p>
          The website is hosted and deployed on Amazon Web Services (AWS), giving it a reliable, scalable, and cloud-ready foundation. It was built using modern web technologies such as HTML, CSS, JavaScript, and cloud deployment practices to deliver a clean and responsive user experience.
        </p>
      </GlassCard>

      <GlassCard className="uniform-copy p-8">
        <h3 className="text-2xl font-bold text-slate-950">Key Features</h3>
        <p className="mt-4">This website includes:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          {websiteFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="uniform-copy p-8">
        <h3 className="text-2xl font-bold text-slate-950">Development Approach</h3>
        <p className="mt-4">
          I developed this website with a focus on simplicity, performance, and practical learning. The website structure was created using front-end technologies, while AWS is used for hosting and deployment. This helped me gain hands-on experience in building, deploying, and managing a cloud-hosted website.
        </p>
      </GlassCard>

      <GlassCard className="uniform-copy p-8">
        <h3 className="text-2xl font-bold text-slate-950">Feedback</h3>
        <p className="mt-4">
          I&apos;m continuously improving this website based on user experience and feedback. Share suggestions, report issues, or request new content topics so the site becomes more useful for learners.
        </p>
        <button type="button" onClick={shareFeedback} className="ios-press mt-6 rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-xl hover:bg-blue-700">
          Share Feedback
        </button>
      </GlassCard>
    </div>
  );
}

function ExpertiseView() {
  return <div><SectionHeader eyebrow="Core Expertise" title="Core areas of expertise" subtitle="Interactive cards showing the solution areas I support across networking, security, cloud, and consulting." /><div className="ios-stagger grid gap-5 md:grid-cols-2 xl:grid-cols-3">{expertise.map(([title, detail]) => <GlassCard key={title} className="p-6"><h3 className="text-2xl font-semibold text-slate-950">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-700">{detail}</p></GlassCard>)}</div></div>;
}

function ExperienceView() {
  return <div><SectionHeader eyebrow="Professional Experience" title="A journey of growth, learning, and delivery" subtitle="Experience across CDW Canada, Dell Technologies, Tech Mahindra, Cisco, and HPE." /><div className="ios-stagger grid gap-4">{experience.map((job) => <GlassCard key={job.company} className="p-6"><div className="grid gap-4 md:grid-cols-[140px_1fr_auto] md:items-center"><LogoImage src={job.logo} name={job.company} /><div><h3 className="text-2xl font-semibold text-slate-950">{job.company}</h3><p className="font-semibold text-blue-800">{job.role}</p><p className="mt-2 text-slate-700">{job.focus}</p></div><div className="text-sm text-slate-600 md:text-right"><p>{job.period}</p><p>{job.location}</p></div></div></GlassCard>)}</div></div>;
}

function ProjectsView({ goTo, trackClick }: { goTo: (view: ViewId) => void; trackClick: (label: string) => void }) {
  return <div><SectionHeader eyebrow="Featured Projects" title="Practical work that shows initiative" subtitle="Projects that demonstrate problem solving, pre-sales thinking, AI workflow ideas, and network architecture." /><div className="ios-stagger grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map(([title, tag, detail]) => <GlassCard key={title} className="p-6"><span className="rounded-full bg-white/55 px-3 py-1 text-xs font-semibold text-blue-700">{tag}</span><h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-700">{detail}</p><button type="button" onClick={() => { trackClick(`Project: ${title}`); goTo("contact"); }} className="ios-press mt-6 text-sm font-semibold text-blue-700">Contact me for details →</button></GlassCard>)}</div></div>;
}

function CertificationsView({ trackClick }: { trackClick: (label: string) => void }) {
  const [filter, setFilter] = useState<CertCategory>("All");
  const filtered = filter === "All" ? certifications : certifications.filter((cert) => cert.category === filter);
  const counts = useMemo(() => certFilters.reduce<Record<string, number>>((acc, item) => { acc[item] = item === "All" ? certifications.length : certifications.filter((cert) => cert.category === item).length; return acc; }, {}), []);
  function choose(item: CertCategory) { setFilter(item); trackClick(`Certification filter: ${item}`); }
  return (
    <div>
      <SectionHeader eyebrow="Certifications" title="Certifications and professional development" subtitle="Filters work on desktop and mobile. Tap a category to refine the credential list." />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">{certFilters.map((item) => <button type="button" key={item} onClick={() => choose(item)} className={`rounded-2xl border px-4 py-3 font-semibold transition ${filter === item ? "border-slate-950 bg-slate-950 text-white" : "border-white/55 bg-white/45 text-slate-800 backdrop-blur-xl"}`}>{item} <span className="ml-1 text-sm opacity-70">{counts[item]}</span></button>)}</div>
      <div className="ios-stagger grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((cert) => <GlassCard key={`${cert.name}-${cert.org}`} className="p-6 hover:bg-white/55"><div className="flex items-start justify-between gap-4"><div className="rounded-2xl border border-white/45 bg-white/50 p-4"><CertLogoImage src={cert.logo} name={cert.org} /></div><button type="button" onClick={() => choose(cert.category)} className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800">{cert.category}</button></div><h3 className="mt-6 text-xl font-semibold text-slate-950">{cert.name}</h3><p className="mt-2 text-sm font-semibold text-blue-800">{cert.org}</p><p className="mt-3 text-sm leading-6 text-slate-700">{cert.detail}</p></GlassCard>)}</div>
    </div>
  );
}

function ContactView({ trackContact, trackClick }: { trackContact: (name: string, email: string) => void; trackClick: (label: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    trackContact(form.name, form.email);
    const subject = encodeURIComponent(form.subject || "Portfolio website message");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }
  return (
    <div>
      <SectionHeader eyebrow="Contact" title="Let’s connect" subtitle="Have a project in mind or want to discuss networking, cloud, and pre-sales opportunities? Let’s talk." />
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassCard className="p-8">
          <div className="space-y-4">
            {[["Location", profile.location], ["Email", profile.email], ["LinkedIn", profile.linkedin]].map(([a, b]) => (
              <div key={a} className="rounded-2xl border border-white/45 bg-white/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{a}</p>
                <p className="font-semibold text-slate-950">{b}</p>
              </div>
            ))}
            <LinkedInButton label="Open LinkedIn Profile" onClick={() => trackClick("LinkedIn: contact")} className="w-full" />
          </div>
        </GlassCard>
        <GlassCard className="p-8">
          <form className="grid gap-4" onSubmit={submitForm}>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="rounded-2xl border border-white/45 bg-white/55 px-5 py-4 outline-none" />
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" className="rounded-2xl border border-white/45 bg-white/55 px-5 py-4 outline-none" />
            <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="rounded-2xl border border-white/45 bg-white/55 px-5 py-4 outline-none" />
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={6} className="rounded-2xl border border-white/45 bg-white/55 px-5 py-4 outline-none" />
            <button type="submit" className="rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white">Send Message</button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

export default function RajeshPortfolioApp() {
  const [activeView, setActiveView] = useState<ViewId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    void sendEvent("visit", "Session started", { view: "home" });
  }, []);

  useEffect(() => {
    void sendEvent("pageview", `Viewed ${activeView}`, { view: activeView });
  }, [activeView]);

  function trackClick(label: string) {
    void sendEvent("click", label, { view: activeView });
  }

  function goTo(view: ViewId) {
    trackClick(`Navigation: ${view}`);
    setActiveView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderView() {
    switch (activeView) {
      case "about": return <AboutView goTo={goTo} trackClick={trackClick} />;
      case "expertise": return <ExpertiseView />;
      case "experience": return <ExperienceView />;
      case "projects": return <ProjectsView goTo={goTo} trackClick={trackClick} />;
      case "certifications": return <CertificationsView trackClick={trackClick} />;
      case "contact": return <ContactView trackContact={(name, email) => { void sendEvent("contact", "Contact form submitted", { name, email }); }} trackClick={trackClick} />;
      default: return <HomeView goTo={goTo} trackClick={trackClick} />;
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-sky-50/20 font-sans antialiased text-slate-950">
      <div className="ios-bg"><img src={profile.background} alt="Toronto skyline" /></div>
      <div className="ios-shell-enter relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="ios-panel ios-header-enter sticky top-4 z-50 mb-10 rounded-[1.7rem] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => goTo("home")} className="ios-press flex shrink-0 items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/60 bg-slate-950 shadow-inner">
                <img src={profile.photoNew} alt={profile.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="hidden text-left sm:block">
                <p className="font-semibold text-slate-950">{profile.name}</p>
              </div>
            </button>
            <nav className="soft-scrollbar hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-1 md:flex lg:gap-1">
              {navItems.slice(1).map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className={`ios-nav-pill ios-press shrink-0 rounded-2xl px-2.5 py-2 text-xs font-semibold lg:px-4 lg:py-2.5 lg:text-sm ${activeView === item.id ? "bg-white/70 text-blue-700 shadow-sm" : "text-slate-700 hover:bg-white/45 hover:text-slate-950"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2 lg:gap-3">
              <LinkedInButton label="LinkedIn" onClick={() => trackClick("LinkedIn: header")} className="hidden sm:inline-flex" />
              <button type="button" onClick={() => setMenuOpen(true)} className="ios-press grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-2xl font-semibold text-slate-950 shadow-sm" aria-label="Open menu">☰</button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div className="ios-overlay-enter fixed inset-0 z-[100] bg-slate-950/40 p-4 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
            <div className="ios-menu ios-sheet-enter soft-scrollbar mx-auto max-h-[92vh] w-full max-w-md overflow-auto rounded-[2rem] p-5 md:ml-auto md:mr-0" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-semibold text-slate-950">Menu</h2><button type="button" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-xl">×</button></div>
              <div className="grid gap-2">{navItems.map((item) => <button type="button" key={item.id} onClick={() => goTo(item.id)} className="flex items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold text-slate-800 hover:bg-white/70"><span className="flex items-center gap-3"><span>{item.icon}</span>{item.label}</span><span>›</span></button>)}</div>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("LinkedIn: menu")} className="mt-3 flex items-center justify-between rounded-2xl border border-blue-200 bg-[#0a66c2] px-4 py-3 text-left font-semibold text-white hover:bg-[#084f9a]"><span className="flex items-center gap-3"><ExternalLink className="h-4 w-4" aria-hidden="true" />LinkedIn Profile</span><span>›</span></a>
              <div className="my-5 h-px bg-slate-300/70" />
              <OwnerLogin />
            </div>
          </div>
        )}

        {activeView !== "home" && <div className="ios-fade-in mb-6 flex items-center gap-2 text-sm font-semibold text-slate-700"><button type="button" onClick={() => goTo("home")} className="ios-press hover:text-blue-700">Home</button><span>›</span><span className="text-blue-700">{navItems.find((i) => i.id === activeView)?.label}</span></div>}
        <AnimatedView viewId={activeView}>{renderView()}</AnimatedView>
      </div>
    </main>
  );
}
