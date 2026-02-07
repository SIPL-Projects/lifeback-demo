/**
 * Stakeholders — LifeBack™ stakeholder ecosystem
 * Theme: Light pastel health
 */
 
 "use client";

/**
 * Stakeholders — LifeBack™ stakeholder ecosystem
 * Theme: Light pastel health
 */

import PageShell from "@/components/PageShell";
import { Users, Stethoscope, Building2, CreditCard, Shield, FlaskConical, Landmark } from "lucide-react";

const C = {
  teal: "#0D9488",
  slate900: "#0F172A",
  slate700: "#334155",
  slate500: "#64748B",
  slate200: "#E2E8F0",
  white: "#FFFFFF",
};

const stakeholders = [
  {
    icon: <Users size={24} />,
    num: "01",
    title: "Beneficiaries",
    subtitle: "Patients & Caregivers",
    color: "#0D9488",
    bg: "#F0FDFA",
    border: "#99F6E4",
    points: [
      "Easy-to-use patient interface",
      "Privacy-conscious data handling",
      "Caregiver support & family dashboards",
      "Continuous care monitoring",
    ],
  },
  {
    icon: <Stethoscope size={24} />,
    num: "02",
    title: "Clinical Users",
    subtitle: "Psychiatrists & Allied Clinicians",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#93C5FD",
    points: [
      "Fast multi-modal assessments (14 min avg)",
      "AI-powered decision support",
      "Better follow-up tracking",
      "Works across all specialties",
    ],
  },
  {
    icon: <Building2 size={24} />,
    num: "03",
    title: "Hospital Operators",
    subtitle: "Administrators & IT",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#C4B5FD",
    points: [
      "Operational efficiency gains",
      "Quality audit & compliance reporting",
      "EMR/EHR integration (HL7/FHIR)",
      "Uptime & reliability SLAs",
    ],
  },
  {
    icon: <CreditCard size={24} />,
    num: "04",
    title: "Buyers & Payers",
    subtitle: "Insurance, Corporate, Institutions",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    points: [
      "Measurable ROI & cost reduction",
      "Risk management tools",
      "Scalable deployment options",
      "Population health analytics",
    ],
  },
  {
    icon: <Shield size={24} />,
    num: "05",
    title: "Compliance & Trust",
    subtitle: "Regulatory & Ethics",
    color: "#EA580C",
    bg: "#FFF7ED",
    border: "#FED7AA",
    points: [
      "Patient safety protocols",
      "HIPAA/GDPR-compliant data handling",
      "Ethical AI use guidelines",
      "CDSCO regulatory pathway",
    ],
  },
  {
    icon: <FlaskConical size={24} />,
    num: "06",
    title: "Evidence Partners",
    subtitle: "Researchers & Pharma",
    color: "#0891B2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
    points: [
      "High-quality validation data",
      "Research collaboration framework",
      "Secure de-identified datasets",
      "Peer-reviewed publications",
    ],
  },
  {
    icon: <Landmark size={24} />,
    num: "07",
    title: "Governance & Capital",
    subtitle: "Board, Investors, Advisors",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    points: [
      "Clear product direction",
      "Sustainable growth metrics",
      "Transparent reporting",
      "Staged expansion roadmap",
    ],
  },
];

export default function Stakeholders() {
  return (
    <PageShell
      title="Stakeholder Ecosystem"
      subtitle="LifeBack™ is specialty-agnostic. The ecosystem is organized around the care pathway."
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {stakeholders.map((s) => (
          <div
            key={s.num}
            style={{
              background: C.white,
              borderRadius: 16,
              padding: "1.75rem",
              border: `1px solid ${C.slate200}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "transform 0.3s, box-shadow 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${s.color}15`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
            }}
          >
            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: s.bg, border: `1px solid ${s.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Stakeholder {s.num}
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: C.slate900 }}>{s.title}</div>
              </div>
            </div>

            <div style={{ fontSize: "0.8rem", color: s.color, fontWeight: 600, marginBottom: 12 }}>{s.subtitle}</div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {s.points.map((p) => (
                <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: C.slate700, fontSize: "0.85rem", lineHeight: 1.5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0, marginTop: 6 }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Specialty-agnostic flow */}
      <div
        style={{
          marginTop: 48,
          background: C.white,
          borderRadius: 16,
          padding: "2rem",
          border: `1px solid ${C.slate200}`,
        }}
      >
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: C.slate900, marginBottom: 20 }}>
          Specialty-Agnostic Flow
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { title: "Patients & Caregivers", desc: "Engagement, adherence, and feedback", bg: "#F0FDFA", border: "#99F6E4" },
            { title: "Clinicians (All Specialties)", desc: "Use signals + trends for care decisions", bg: "#ECFDF5", border: "#A7F3D0" },
            { title: "LifeBack Platform", desc: "Screening → Diagnosis → Monitoring → Decision Support", bg: "#F5F3FF", border: "#C4B5FD" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: 12,
                padding: "1.25rem",
              }}
            >
              <div style={{ fontWeight: 700, color: C.slate900, marginBottom: 6, fontSize: "0.95rem" }}>{item.title}</div>
              <div style={{ color: C.slate500, fontSize: "0.85rem" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
