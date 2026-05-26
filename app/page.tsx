"use client"

import Image from "next/image"
import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Filter,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react"
import type { FormEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"

type CertificationEntry = {
  category: "HPE" | "Juniper" | "Dell" | "Cisco" | "Microsoft" | "Salesforce"
  vendor: string
  title: string
  issued: string
  expires?: string
  credentialId?: string
  skills?: string[]
  evidence?: string
  note?: string
  badge?: string
  logo?: string
  logoFit?: "vector" | "photo-cover" | "photo-banner"
  mark: string
}

type ExpertiseEntry = {
  title: string
  text: string
  detail: string
  metric: string
  Icon: LucideIcon
  accent: string
}

type ExperienceEntry = {
  company: string
  role: string
  period: string
  place: string
  logo: string
  text: string
  details: string[]
}

type SolutionTrack = {
  id: string
  label: string
  headline: string
  summary: string
  Icon: LucideIcon
  stack: string[]
  questions: string[]
  outcome: string
  accent: string
}

const emailAddress = "rajeshrg086@gmail.com"
const phoneNumber = "+13652929588"
const linkedInUrl = "https://www.linkedin.com/in/rajesh-r-g-948136a0/"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Studio", href: "#solution-studio" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const quickStats = [
  { value: "100+", label: "solutions, demos, and proposals shaped" },
]

const roleHighlights = [
  "Discovery workshops",
  "HPE Aruba positioning",
  "Secure campus architecture",
  "Cloud-connected infrastructure",
]

const expertise: ExpertiseEntry[] = [
  {
    title: "HPE Aruba Networking",
    text: "Customer discovery, Aruba Central, wired, wireless, and SD-WAN solution conversations.",
    detail: "Turns business needs into scoped access, campus, and operations designs.",
    metric: "Campus + Central",
    Icon: Server,
    accent: "bg-cyan-500/10 text-cyan-700 border-cyan-500/25",
  },
  {
    title: "Switching and Wireless",
    text: "Enterprise LAN, WLAN, Wi-Fi 6/6E, access layer design, and deployment planning.",
    detail: "Balances coverage, capacity, resiliency, and day-two manageability.",
    metric: "LAN + WLAN",
    Icon: Wifi,
    accent: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25",
  },
  {
    title: "Cybersecurity",
    text: "Secure access, VPN, SASE, network security, and risk-aware architecture.",
    detail: "Connects user access decisions to practical controls and operations.",
    metric: "Zero trust edge",
    Icon: ShieldCheck,
    accent: "bg-rose-500/10 text-rose-700 border-rose-500/25",
  },
  {
    title: "Cloud Solutions",
    text: "Hybrid cloud, AWS, Azure, GCP, and cloud-connected infrastructure strategy.",
    detail: "Frames migration and connectivity choices around business continuity.",
    metric: "Hybrid ready",
    Icon: Cloud,
    accent: "bg-sky-500/10 text-sky-700 border-sky-500/25",
  },
  {
    title: "Data Protection",
    text: "Backup, disaster recovery, cyber recovery, and continuity solution alignment.",
    detail: "Connects recovery objectives to architecture, tooling, and operating models.",
    metric: "RPO/RTO aware",
    Icon: Database,
    accent: "bg-amber-500/10 text-amber-700 border-amber-500/25",
  },
  {
    title: "Consulting and Pre-Sales",
    text: "Discovery, demos, RFI/RFP responses, proposals, BOMs, and sales enablement.",
    detail: "Makes technical depth understandable for stakeholders and buying teams.",
    metric: "RFI to BOM",
    Icon: Users,
    accent: "bg-indigo-500/10 text-indigo-700 border-indigo-500/25",
  },
]

const companyLogos = [
  { name: "CDW Canada", logo: "/logos/cdw.svg" },
  { name: "Dell Technologies", logo: "/logos/dell.svg" },
  { name: "Tech Mahindra", logo: "/logos/tech-mahindra.svg" },
  { name: "Cisco", logo: "/logos/cisco.svg" },
  { name: "Hewlett Packard Enterprise", logo: "/logos/hpe.svg" },
]

const experience: ExperienceEntry[] = [
  {
    company: "CDW Canada",
    role: "Networking Solutions Specialist",
    period: "Jul 2025 - Present",
    place: "Toronto, Canada",
    logo: "/logos/cdw.svg",
    text: "Pre-sales expertise for HPE Aruba Networking, customer discovery, solution design, BOMs, demos, workshops, and sales enablement.",
    details: [
      "Leads discovery conversations to clarify business goals, site constraints, and technical requirements.",
      "Builds customer-ready solution narratives for wired, wireless, SD-WAN, and Aruba Central opportunities.",
      "Supports account teams with demos, proposal language, and technical validation.",
    ],
  },
  {
    company: "Dell Technologies",
    role: "Engineer 2, Product Technologist",
    period: "Oct 2021 - Oct 2024",
    place: "Bengaluru, India",
    logo: "/logos/dell.svg",
    text: "Data protection, cyber recovery, cloud-integrated solutions, technical validation, and cross-platform enablement.",
    details: [
      "Mapped backup and cyber recovery requirements to practical architecture options.",
      "Worked across technical validation, enablement, and solution positioning for customer scenarios.",
      "Translated platform capabilities into clear recommendations for sales and delivery teams.",
    ],
  },
  {
    company: "Tech Mahindra",
    role: "Security Analyst",
    period: "May 2020 - Oct 2021",
    place: "Bengaluru, India",
    logo: "/logos/tech-mahindra.svg",
    text: "Secure access and VPN support, certificates, authentication, tunneling, licensing, RCA, and escalation management.",
    details: [
      "Handled secure access incidents involving authentication, certificates, and tunnel stability.",
      "Produced root cause analysis and escalation notes for complex customer-impacting issues.",
      "Supported licensing and operational continuity for enterprise security environments.",
    ],
  },
  {
    company: "Cisco",
    role: "TAC Engineer",
    period: "Nov 2018 - May 2020",
    place: "Bengaluru, India",
    logo: "/logos/cisco.svg",
    text: "Enterprise networking troubleshooting, customer support, and technical issue resolution.",
    details: [
      "Troubleshot routing, switching, and customer network issues in production environments.",
      "Communicated technical root causes and next steps to customer engineering teams.",
      "Built a strong foundation in support discipline, documentation, and escalation handling.",
    ],
  },
  {
    company: "Hewlett Packard Enterprise",
    role: "Wireless Network Engineer",
    period: "Feb 2017 - Nov 2018",
    place: "Bengaluru, India",
    logo: "/logos/hpe.svg",
    text: "Wireless network engineering, deployment support, optimization, and customer technical assistance.",
    details: [
      "Supported WLAN deployments and optimization across customer environments.",
      "Assisted with configuration, troubleshooting, and operational handoff activities.",
      "Built early specialization in wireless performance and enterprise access networking.",
    ],
  },
]

const solutionTracks: SolutionTrack[] = [
  {
    id: "campus",
    label: "Campus Refresh",
    headline: "Design a cleaner, cloud-managed campus network.",
    summary: "A path for organizations modernizing access switching, wireless, and day-two operations without losing sight of budget and rollout reality.",
    Icon: Network,
    stack: ["Aruba Central", "Access switching", "Wi-Fi 6/6E", "Lifecycle planning"],
    questions: ["How many sites and user profiles are in scope?", "What breaks most often today?", "What needs to be centrally operated?"],
    outcome: "A phased campus design with discovery notes, technical assumptions, and a practical bill of materials direction.",
    accent: "border-cyan-500/35 bg-cyan-500/10 text-cyan-800",
  },
  {
    id: "secure-access",
    label: "Secure Access",
    headline: "Connect identity, access, and network controls.",
    summary: "A practical security-led conversation that makes access decisions easier to understand for both IT and business stakeholders.",
    Icon: ShieldCheck,
    stack: ["Policy design", "VPN/SASE", "Segmentation", "Certificate flow"],
    questions: ["Who needs access from where?", "Which apps and segments are sensitive?", "What audit or compliance needs matter most?"],
    outcome: "A secure access story that maps users, applications, controls, and operational ownership.",
    accent: "border-rose-500/35 bg-rose-500/10 text-rose-800",
  },
  {
    id: "cloud",
    label: "Hybrid Cloud",
    headline: "Make infrastructure cloud-ready without overcomplicating it.",
    summary: "A discovery-led track for teams connecting campus, data protection, and cloud operations into one clearer plan.",
    Icon: Cloud,
    stack: ["Azure/AWS/GCP", "Hybrid connectivity", "Operational readiness", "Migration inputs"],
    questions: ["Which workloads are moving?", "What latency and recovery targets exist?", "Who owns day-two operations?"],
    outcome: "A hybrid readiness view with constraints, design priorities, and next-step technical validation.",
    accent: "border-sky-500/35 bg-sky-500/10 text-sky-800",
  },
  {
    id: "recovery",
    label: "Cyber Recovery",
    headline: "Protect business operations with recovery-led architecture.",
    summary: "A structured route from business continuity goals to backup, recovery, and resilience design choices.",
    Icon: Database,
    stack: ["Backup design", "Cyber vaulting", "RPO/RTO mapping", "Recovery testing"],
    questions: ["Which systems define business continuity?", "What recovery time is acceptable?", "How often is recovery tested?"],
    outcome: "A resilience brief that links critical workloads, recovery assumptions, and solution priorities.",
    accent: "border-amber-500/35 bg-amber-500/10 text-amber-800",
  },
]

const projects = [
  {
    tag: "Networking",
    title: "HPE Aruba Opportunity Discovery Assistant",
    text: "A guided workflow to identify customer needs, qualify solution areas, and capture next steps for sales conversations.",
    impact: "Shortens early discovery and improves handoff quality.",
  },
  {
    tag: "Pre-Sales",
    title: "AI-Assisted BOM and RFI Workflow",
    text: "A structured assistant concept that turns customer asks into BOM tables, missing information, and RFI questions.",
    impact: "Makes proposal preparation more consistent and easier to review.",
  },
  {
    tag: "Architecture",
    title: "Network Solution Proposal Templates",
    text: "Reusable customer-ready formats for discovery notes, solution positioning, and professional follow-up documents.",
    impact: "Creates cleaner customer communication from the first meeting onward.",
  },
  {
    tag: "Automation",
    title: "Support Ticketing and OCR Assistant",
    text: "Concept workflow for reading screenshots, understanding the ask, and creating response prompts for technical work.",
    impact: "Reduces manual triage for repetitive technical support patterns.",
  },
]

const projectFilters = ["All", ...Array.from(new Set(projects.map((project) => project.tag)))]

const certifications: CertificationEntry[] = [
  {
    category: "Juniper",
    vendor: "Juniper Networks",
    title: "Juniper Networks Certified Associate, Data Center (JNCIA-DC)",
    issued: "Mar 2026",
    expires: "Mar 2029",
    badge: "/badges/jncia-dc.svg",
    mark: "JN",
  },
  {
    category: "Juniper",
    vendor: "Juniper Networks",
    title: "Ingenious Technical Champion",
    issued: "Mar 2026",
    expires: "Oct 2026",
    badge: "/badges/juniper-ingenious-champion.svg",
    mark: "JN",
  },
  {
    category: "HPE",
    vendor: "Hewlett Packard Enterprise",
    title: "HPE Aruba Networking Certified Professional - Campus Access",
    issued: "Oct 2025",
    expires: "Oct 2028",
    evidence: "ACP-CamAcss-HPE0073808612 certificate.pdf",
    note: "HPE certificate and badge for campus access expertise.",
    logo: "/logos/hpe.svg",
    mark: "HPE",
  },
  {
    category: "HPE",
    vendor: "Hewlett Packard Enterprise",
    title: "HPE Sales Certified - Compute and Storage Solutions [2025]",
    issued: "Aug 2025",
    evidence: "Hewlett Packard Enterprise certificate.pdf",
    note: "Earned with support from CDW Canada.",
    logo: "/logos/hpe.svg",
    mark: "HPE",
  },
  {
    category: "HPE",
    vendor: "Hewlett Packard Enterprise",
    title: "HPE Sales Certified - HPE Aruba Networking Solutions",
    issued: "Jul 2025",
    expires: "Jul 2027",
    skills: ["Aruba"],
    evidence: "Aruba-SCE-APAS-HPE0073808612_a4.pdf",
    note: "Validates positioning Aruba secure, AI-powered networking, Aruba Central, and next-generation campus, branch, and data-center networking.",
    logo: "/logos/hpe.svg",
    mark: "HPE",
  },
  {
    category: "HPE",
    vendor: "Hewlett Packard Enterprise",
    title: "Aruba Product Specialist - Central",
    issued: "Jul 2025",
    expires: "Jul 2027",
    skills: ["Wireless Networking", "Network Management Systems", "Aruba Central"],
    logo: "/logos/hpe.svg",
    mark: "HPE",
  },
  {
    category: "Salesforce",
    vendor: "Salesforce",
    title: "Salesforce Certified Agentforce Specialist",
    issued: "Jun 2025",
    badge: "/badges/salesforce-agentforce-specialist.svg",
    mark: "SF",
  },
  {
    category: "Dell",
    vendor: "Dell Technologies",
    title: "Dell GenAI Foundations",
    issued: "Oct 2024",
    evidence: "Dell GenAI foundations achievement.pdf",
    logo: "/logos/dell.svg",
    mark: "Dell",
  },
  {
    category: "Dell",
    vendor: "Dell Technologies",
    title: "Specialist - Technology Architect, Data Protection Version 1.0",
    issued: "Mar 2022",
    evidence: "Dell Specialist Data Protection.pdf",
    logo: "/logos/dell.svg",
    mark: "Dell",
  },
  {
    category: "Dell",
    vendor: "Dell Technologies",
    title: "Associate - Data Protection and Management",
    issued: "Jan 2022",
    logo: "/logos/dell.svg",
    mark: "Dell",
  },
  {
    category: "Dell",
    vendor: "Dell Technologies",
    title: "Associate - Information Storage and Management Version 4.0",
    issued: "Nov 2021",
    logo: "/logos/dell.svg",
    mark: "Dell",
  },
  {
    category: "Cisco",
    vendor: "Cisco",
    title: "Cisco Certified Network Associate Routing and Switching (CCNA Routing and Switching)",
    issued: "Sep 2018",
    expires: "Sep 2021",
    credentialId: "CSCO13365947",
    skills: ["Routing and Switching"],
    evidence: "CCNA - Credly-certificate.pdf",
    logo: "/logos/cisco.svg",
    mark: "Cisco",
  },
  {
    category: "Microsoft",
    vendor: "Microsoft",
    title: "Microsoft Certified: Azure Fundamentals",
    issued: "Jan 2021",
    credentialId: "H6299749",
    logo: "/logos/microsoft.svg",
    mark: "MS",
  },
]

const certificationFilters = ["All", "HPE", "Juniper", "Dell", "Cisco", "Microsoft", "Salesforce"]

function getSectionId(href: string) {
  return href.replace("#", "")
}

function sendContactEmail(event: FormEvent<HTMLFormElement>, onStatus: (message: string) => void) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const name = String(formData.get("name") || "")
  const email = String(formData.get("email") || "")
  const subject = String(formData.get("subject") || "Portfolio inquiry")
  const message = String(formData.get("message") || "")

  const body = [
    "Hi Rajesh,",
    "",
    message,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
  ].join("\n")

  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const launcher = document.createElement("a")

  launcher.href = mailtoUrl
  launcher.style.display = "none"
  document.body.appendChild(launcher)

  onStatus("Opening your default email app with the message ready to send.")
  launcher.click()
  launcher.remove()
}

function Nav({
  activeSection,
  mobileOpen,
  scrollProgress,
  onToggleMobile,
  onCloseMobile,
}: {
  activeSection: string
  mobileOpen: boolean
  scrollProgress: number
  onToggleMobile: () => void
  onCloseMobile: () => void
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="glass-strong mx-auto max-w-7xl overflow-hidden rounded-lg">
        <div className="h-1 bg-slate-200/70">
          <div className="h-full bg-cyan-600 transition-all duration-200" style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <a href="#home" className="group flex min-w-0 items-center gap-3" onClick={onCloseMobile}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-semibold text-white shadow-sm transition group-hover:bg-cyan-700">
              RG
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold text-slate-950">Rajesh R G</span>
              <span className="block truncate text-xs font-medium text-slate-600">Networking Solutions Specialist</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = activeSection === getSectionId(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <a href="#certifications" className="soft-button inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-950">
              <FileText size={16} /> Credentials
            </a>
            <a href="#contact" className="dark-button inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold">
              <Send size={16} /> Contact
            </a>
          </div>

          <button
            type="button"
            className="soft-button grid h-10 w-10 place-items-center rounded-lg text-slate-950 lg:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={onToggleMobile}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/60 px-4 pb-4 lg:hidden">
            <nav className="grid gap-2 py-3" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = activeSection === getSectionId(item.href)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-slate-950 text-white" : "bg-white/45 text-slate-800 hover:bg-white/75"}`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
            <a href="#contact" onClick={onCloseMobile} className="dark-button inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold">
              <MessageCircle size={16} /> Start a conversation
            </a>
          </div>
        ) : null}
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="section-panel mx-auto max-w-7xl px-5 pt-32 sm:px-8 lg:pt-36">
      <div className="grid items-center gap-9 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Toronto based pre-sales engineer
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-normal text-slate-950 sm:text-6xl lg:text-[4.5rem]">
            Rajesh R G
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium leading-tight text-slate-700 sm:text-2xl">
            Networking solutions specialist for modern campus, cloud, and secure access conversations.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            I help enterprise teams translate business goals into clear network architecture, technical validation, proposal direction, and customer-ready next steps.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {roleHighlights.map((highlight) => (
              <span key={highlight} className="rounded-lg border border-white/70 bg-white/55 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#solution-studio" className="dark-button inline-flex items-center justify-center gap-3 rounded-lg px-6 py-4 text-base font-semibold">
              <Sparkles size={18} /> Explore the studio
            </a>
            <a href="#projects" className="soft-button inline-flex items-center justify-center gap-3 rounded-lg px-6 py-4 text-base font-semibold text-slate-950">
              <ArrowRight size={18} /> View project ideas
            </a>
          </div>
        </div>

        <div>
          <div className="glass-strong rounded-lg p-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-white/70 bg-white/45 p-2">
                <Image
                  src="/rajesh-profile.png"
                  alt="Rajesh R G — event portrait"
                  width={480}
                  height={640}
                  priority
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="h-auto w-full object-contain object-center"
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-white/70 bg-slate-950 p-2">
                <Image
                  src="/rajesh-profile-new.png"
                  alt="Rajesh R G — professional headshot"
                  width={480}
                  height={640}
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="h-auto w-full object-contain object-center"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <a href={linkedInUrl} aria-label="LinkedIn profile" className="soft-button grid place-items-center rounded-lg p-4 text-slate-950 transition hover:-translate-y-0.5">
              <BriefcaseBusiness />
            </a>
            <a href={`mailto:${emailAddress}`} aria-label="Email Rajesh" className="soft-button grid place-items-center rounded-lg p-4 text-slate-950 transition hover:-translate-y-0.5">
              <Mail />
            </a>
            <a href={`tel:${phoneNumber}`} aria-label="Call Rajesh" className="soft-button grid place-items-center rounded-lg p-4 text-slate-950 transition hover:-translate-y-0.5">
              <Phone />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CompanyLogoStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-5 rounded-lg border border-white/65 bg-white/35 p-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">Technology background</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Experience across leading enterprise technology organizations</h2>
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-5">
          {companyLogos.map((company) => (
            <div key={company.name} className="logo-card glass flex h-20 items-center justify-center rounded-lg p-3">
              <Image src={company.logo} alt={`${company.name} logo`} width={180} height={72} className="max-h-12 w-auto object-contain" style={{ width: "auto", height: "auto" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
        <div>
          <p className="eyebrow">About Me</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">
            I turn complex infrastructure requirements into clear customer-ready plans.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            With nearly eight years across enterprise networking, cloud, cybersecurity, and data protection, I bring a practical mix of troubleshooting depth and pre-sales storytelling. My work starts with listening, then shaping solutions that technical teams can trust and business leaders can understand.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="glass-strong rounded-lg p-5">
                <p className="text-4xl font-semibold tracking-normal text-slate-950">{stat.value}</p>
                <p className="mt-2 text-sm font-medium leading-5 text-slate-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-lg p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white">
              <Target size={24} />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Operating style</h3>
              <p className="text-sm font-medium text-slate-600">Discovery first, architecture second, clarity always.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              "Listen for the outcome behind the technical ask.",
              "Convert messy requirements into decision-ready options.",
              "Keep proposal language clear enough for every stakeholder.",
              "Build trust through documentation, demos, and accountable follow-up.",
            ].map((item) => (
              <div key={item} className="feature-line">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Expertise() {
  return (
    <section id="expertise" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <p className="eyebrow">Expertise</p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">Core areas I bring into customer conversations</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            The portfolio is strongest where pre-sales, architecture, and operational experience meet.
          </p>
        </div>
        <a href="#contact" className="soft-button inline-flex w-fit items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-950">
          <MessageCircle size={16} /> Discuss a requirement
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expertise.map((item) => {
          const Icon = item.Icon
          return (
            <article key={item.title} className="interactive-card glass-strong rounded-lg p-6">
              <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${item.accent}`}>
                <Icon size={18} /> {item.metric}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-normal text-slate-950">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">{item.text}</p>
              <p className="mt-4 border-t border-white/65 pt-4 text-sm font-medium leading-6 text-slate-600">{item.detail}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function SolutionStudio({
  activeSolution,
  onSelect,
}: {
  activeSolution: SolutionTrack
  onSelect: (id: string) => void
}) {
  const Icon = activeSolution.Icon

  return (
    <section id="solution-studio" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <p className="eyebrow">Interactive Studio</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">Pick a customer scenario and see how I would frame the conversation.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            This lightweight studio shows the way I structure discovery: desired outcome, technical stack, clarifying questions, and a usable next step.
          </p>

          <div className="mt-8 grid gap-3">
            {solutionTracks.map((track) => {
              const TrackIcon = track.Icon
              const isActive = activeSolution.id === track.id
              return (
                <button
                  key={track.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelect(track.id)}
                  className={`solution-tab ${isActive ? "solution-tab-active" : ""}`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border ${track.accent}`}>
                    <TrackIcon size={21} />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-base font-semibold">{track.label}</span>
                    <span className="block text-sm font-medium text-slate-600">{track.stack.slice(0, 2).join(" + ")}</span>
                  </span>
                  <ChevronDown className={`ml-auto transition ${isActive ? "rotate-180 text-cyan-700" : "text-slate-400"}`} size={18} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="glass-strong rounded-lg p-6 lg:p-8">
          <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${activeSolution.accent}`}>
            <Icon size={18} /> {activeSolution.label}
          </div>
          <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-normal text-slate-950">{activeSolution.headline}</h3>
          <p className="mt-4 text-base leading-7 text-slate-700">{activeSolution.summary}</p>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-slate-600">
                <Zap size={16} /> Solution stack
              </h4>
              <div className="mt-3 grid gap-2">
                {activeSolution.stack.map((item) => (
                  <span key={item} className="rounded-lg border border-white/70 bg-white/50 px-3 py-2 text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-slate-600">
                <Filter size={16} /> Discovery questions
              </h4>
              <div className="mt-3 grid gap-2">
                {activeSolution.questions.map((question) => (
                  <div key={question} className="feature-line bg-white/45">
                    <CheckCircle2 size={17} className="text-cyan-700" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-lg border border-slate-900/10 bg-slate-950 p-5 text-white">
            <p className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <BarChart3 size={17} /> Expected customer-ready output
            </p>
            <p className="mt-3 text-base leading-7 text-slate-100">{activeSolution.outcome}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience({
  activeCompany,
  onSelect,
}: {
  activeCompany: string
  onSelect: (company: string) => void
}) {
  const activeJob = experience.find((job) => job.company === activeCompany) ?? experience[0]

  return (
    <section id="experience" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <p className="eyebrow">Experience</p>
      <div className="mt-4 grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">A career built from support depth to solution leadership.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Select a role to see the strongest part of the story. The arc matters: troubleshooting, security, recovery, and now customer-facing network architecture.
          </p>
          <div className="mt-8 grid gap-3">
            {experience.map((job) => {
              const isActive = activeJob.company === job.company
              return (
                <button
                  key={job.company}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelect(job.company)}
                  className={`timeline-button ${isActive ? "timeline-button-active" : ""}`}
                >
                  <span className="logo-card flex h-12 w-24 shrink-0 items-center justify-center rounded-lg bg-white/60 p-2">
                    <Image src={job.logo} alt={`${job.company} logo`} width={140} height={56} className="max-h-8 w-auto object-contain" style={{ width: "auto", height: "auto" }} />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block truncate text-base font-semibold">{job.company}</span>
                    <span className="block truncate text-sm font-medium text-slate-600">{job.period}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <article className="glass-strong rounded-lg p-6 lg:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-700">{activeJob.company}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-normal text-slate-950">{activeJob.role}</h3>
              <p className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
                <span>{activeJob.period}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={15} /> {activeJob.place}</span>
              </p>
            </div>
            <span className="logo-card flex h-16 w-36 shrink-0 items-center justify-center rounded-lg bg-white/55 p-3">
              <Image src={activeJob.logo} alt={`${activeJob.company} logo`} width={170} height={72} className="max-h-10 w-auto object-contain" style={{ width: "auto", height: "auto" }} />
            </span>
          </div>
          <p className="mt-6 text-base leading-7 text-slate-700">{activeJob.text}</p>
          <div className="mt-6 grid gap-3">
            {activeJob.details.map((detail) => (
              <div key={detail} className="feature-line">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

function Projects({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string
  onFilterChange: (filter: string) => void
}) {
  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === "All" || project.tag === activeFilter),
    [activeFilter],
  )

  return (
    <section id="projects" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <p className="eyebrow">Projects</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">Featured project concepts and reusable workflows</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Filter by theme to see the kind of tools and templates that support stronger customer conversations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Project filters">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => onFilterChange(filter)}
              className={`filter-button ${activeFilter === filter ? "filter-button-active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <article key={project.title} className="interactive-card glass-strong rounded-lg p-6">
            <span className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-800">{project.tag}</span>
            <h3 className="mt-5 text-2xl font-semibold tracking-normal text-slate-950">{project.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-700">{project.text}</p>
            <div className="mt-5 rounded-lg border border-white/70 bg-white/45 p-4">
              <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">Impact</p>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{project.impact}</p>
            </div>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800">
              Contact me for details <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function VendorMark({ cert }: { cert: CertificationEntry }) {
  if (cert.badge) {
    return (
      <Image
        src={cert.badge}
        alt={`${cert.title} badge`}
        width={180}
        height={180}
        className="badge-image"
      />
    )
  }

  if (cert.logo) {
    return (
      <Image
        src={cert.logo}
        alt={`${cert.vendor} logo`}
        width={190}
        height={72}
        className="max-h-12 w-auto max-w-full object-contain"
        style={{ width: "auto", height: "auto" }}
      />
    )
  }

  return (
    <span className={`vendor-mark vendor-mark-${cert.category.toLowerCase()}`}>
      {cert.mark}
    </span>
  )
}

function Certifications({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string
  onFilterChange: (filter: string) => void
}) {
  const filteredCertifications = useMemo(
    () => certifications.filter((cert) => activeFilter === "All" || cert.category === activeFilter),
    [activeFilter],
  )

  return (
    <section id="certifications" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <p className="eyebrow">Certifications</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">Certifications across HPE, Juniper, Dell, Microsoft, and Salesforce</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            A current credential portfolio focused on Aruba campus networking, data center, cloud, data protection, and AI-enabled sales conversations.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:justify-end" aria-label="Certification filters">
          {certificationFilters.map((filter) => {
            const count = filter === "All" ? certifications.length : certifications.filter((cert) => cert.category === filter).length
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => onFilterChange(filter)}
                className={`filter-button ${activeFilter === filter ? "filter-button-active" : ""}`}
              >
                {filter} <span className="ml-1 opacity-75">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {[
          ["HPE", "4", "Aruba, Campus Access, Central, Compute and Storage"],
          ["Juniper", "2", "Data Center and technical champion credentials"],
          ["Dell", "4", "GenAI, data protection, storage, and management"],
          ["Cisco", "1", "CCNA Routing and Switching"],
          ["Microsoft", "1", "Azure Fundamentals"],
          ["Salesforce", "1", "Agentforce Specialist"],
        ].map(([vendor, count, text]) => (
          <div key={vendor} className="cert-summary">
            <p className="text-3xl font-semibold text-slate-950">{count}</p>
            <p className="mt-1 text-sm font-bold text-cyan-800">{vendor}</p>
            <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertifications.map((cert) => (
          <article key={`${cert.vendor}-${cert.title}`} className="interactive-card glass-strong rounded-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div className={`logo-card flex ${cert.badge ? "h-24 min-w-28" : "h-16 min-w-28"} items-center justify-center overflow-hidden rounded-lg bg-white/50 px-4 py-3`}>
                <VendorMark cert={cert} />
              </div>
              <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-800">
                {cert.category}
              </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-tight text-slate-950">{cert.title}</h3>
            <p className="mt-2 text-sm font-semibold text-cyan-800">{cert.vendor}</p>
            <div className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
              <p className="flex items-center gap-2">
                <Award size={16} className="text-amber-700" /> Issued {cert.issued}
              </p>
              {cert.expires ? <p className="text-slate-600">Expires {cert.expires}</p> : null}
              {cert.credentialId ? <p className="text-slate-600">Credential ID {cert.credentialId}</p> : null}
            </div>
            {cert.skills?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span key={skill} className="rounded-lg border border-white/70 bg-white/50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}
            {cert.note ? <p className="mt-4 text-sm font-medium leading-6 text-slate-600">{cert.note}</p> : null}
            {cert.evidence ? (
              <div className="mt-5 rounded-lg border border-white/70 bg-white/45 p-3 text-xs font-bold leading-5 text-slate-600">
                Certificate file: {cert.evidence}
              </div>
            ) : null}
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-800">
              <CheckCircle2 size={18} /> Credential listed
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact({
  status,
  copied,
  onCopyEmail,
  onStatus,
}: {
  status: string
  copied: boolean
  onCopyEmail: () => void
  onStatus: (message: string) => void
}) {
  return (
    <section id="contact" className="section-panel mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid gap-7 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">Let's connect about the next customer problem worth solving.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Send a note, copy the email address, or open LinkedIn. The form prepares a message in your email app so nothing is stored by the website.
          </p>
          <div className="mt-8 grid gap-3">
            <a href={`mailto:${emailAddress}`} className="contact-row">
              <Mail className="text-cyan-700" /> {emailAddress}
            </a>
            <a href={linkedInUrl} className="contact-row">
              <BriefcaseBusiness className="text-cyan-700" /> linkedin.com/in/rajesh-r-g-948136a0
            </a>
            <a href={`tel:${phoneNumber}`} className="contact-row">
              <Phone className="text-cyan-700" /> {phoneNumber}
            </a>
            <p className="contact-row">
              <MapPin className="text-cyan-700" /> Toronto, Canada
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={onCopyEmail} className="soft-button inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-950">
              <Copy size={16} /> {copied ? "Email copied" : "Copy email"}
            </button>
            <a href={linkedInUrl} className="soft-button inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-950">
              <ExternalLink size={16} /> Open LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={(event) => sendContactEmail(event, onStatus)} className="glass-strong rounded-lg p-6 sm:p-8">
          <div className="grid gap-4">
            <label className="field-label">
              Name
              <input name="name" required placeholder="Your name" className="form-field" />
            </label>
            <label className="field-label">
              Email
              <input name="email" required type="email" placeholder="you@example.com" className="form-field" />
            </label>
            <label className="field-label">
              Subject
              <input name="subject" required placeholder="How can Rajesh help?" className="form-field" />
            </label>
            <label className="field-label">
              Message
              <textarea name="message" required placeholder="Share the project, role, or customer challenge." rows={6} className="form-field resize-none" />
            </label>
            <button type="submit" className="dark-button inline-flex items-center justify-center gap-3 rounded-lg px-6 py-4 text-base font-semibold">
              <Send size={18} /> Send Message
            </button>
            <p className="min-h-6 text-sm font-medium text-slate-600" role="status" aria-live="polite">
              {status}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default function RajeshPortfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSolutionId, setActiveSolutionId] = useState(solutionTracks[0].id)
  const [activeCompany, setActiveCompany] = useState(experience[0].company)
  const [activeProjectFilter, setActiveProjectFilter] = useState("All")
  const [activeCertFilter, setActiveCertFilter] = useState("All")
  const [contactStatus, setContactStatus] = useState("")
  const [copied, setCopied] = useState(false)

  const activeSolution = solutionTracks.find((track) => track.id === activeSolutionId) ?? solutionTracks[0]

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      if (window.scrollY < 120) {
        setActiveSection("home")
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    )

    navItems.forEach((item) => {
      const section = document.querySelector(item.href)
      if (section) observer.observe(section)
    })

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setContactStatus("Email address copied to clipboard.")
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setContactStatus("Copy was blocked by the browser, so the email link is ready above.")
    }
  }

  return (
    <main className="bg-toronto min-h-screen font-helvetica text-slate-950">
      <Nav
        activeSection={activeSection}
        mobileOpen={mobileOpen}
        scrollProgress={scrollProgress}
        onToggleMobile={() => setMobileOpen((open) => !open)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <Hero />
      <CompanyLogoStrip />
      <About />
      <Expertise />
      <SolutionStudio activeSolution={activeSolution} onSelect={setActiveSolutionId} />
      <Experience activeCompany={activeCompany} onSelect={setActiveCompany} />
      <Projects activeFilter={activeProjectFilter} onFilterChange={setActiveProjectFilter} />
      <Certifications activeFilter={activeCertFilter} onFilterChange={setActiveCertFilter} />
      <Contact status={contactStatus} copied={copied} onCopyEmail={copyEmail} onStatus={setContactStatus} />
    </main>
  )
}
