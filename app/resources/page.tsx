"use client";

/**
 * Resources — LifeBack™ clinical & research resources
 * Theme: Light pastel health
 */
import PageShell from "@/components/PageShell";
import { FileText, BookOpen, Award, ExternalLink, Download, Beaker } from "lucide-react";

const C = {
  teal: "#0D9488",
  slate900: "#0F172A",
  slate700: "#334155",
  slate500: "#64748B",
  slate200: "#E2E8F0",
  white: "#FFFFFF",
};

const publications = [
  {
    title: "Multi-Modal AI Assessment for Depression Screening",
    journal: "IEEE Transactions on Biomedical Engineering",
    year: "2025",
    type: "Peer-Reviewed",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    title: "Vocal Biomarkers in Mental Health: A Systematic Review",
    journal: "Springer — Journal of Medical Systems",
    year: "2024",
    type: "Peer-Reviewed",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    title: "Facial Action Unit Analysis for Psychiatric Assessment",
    journal: "International Conference on AI in Healthcare",
    year: "2024",
    type: "Conference Paper",
    color: "#0D9488",
    bg: "#F0FDFA",
  },
];

const resources = [
  {
    icon: <FileText size={22} />,
    title: "Clinical Validation Report",
    desc: "97% accuracy results from RML Hospital, Delhi pilot study with 347+ patients.",
    tag: "Research",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Product White Paper",
    desc: "Technical overview of LifeBack's multi-modal AI architecture and clinical workflow integration.",
    tag: "Technical",
  },
  {
    icon: <Award size={22} />,
    title: "Patent Documentation",
    desc: "Indian Patent Filed (202511025669) — AI-based mental health screening methodology.",
    tag: "IP",
  },
  {
    icon: <Beaker size={22} />,
    title: "IRB Trial Protocols",
    desc: "IRB-approved clinical trial protocols and CDSCO regulatory pathway documentation.",
    tag: "Regulatory",
  },
];

export default function Resources() {
  return (
    <PageShell
      title="Resources & Publications"
      subtitle="Clinical evidence, research publications, and technical documentation supporting LifeBack™."
    >
      {/* Publications */}
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: C.slate900, marginBottom: 20 }}>
        Publications
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
        {publications.map((p) => (
          <div
            key={p.title}
            style={{
              background: C.white,
              borderRadius: 14,
              padding: "1.5rem 2rem",
              border: `1px solid ${C.slate200}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              transition: "box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ flex: 1, minWidth: 250 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: "0.7rem", fontWeight: 700, color: p.color,
                    background: p.bg, padding: "3px 10px", borderRadius: 999,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}
                >
                  {p.type}
                </span>
                <span style={{ fontSize: "0.8rem", color: C.slate500 }}>{p.year}</span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.slate900, marginBottom: 4 }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", color: C.slate500, margin: 0 }}>{p.journal}</p>
            </div>
            <button
              onClick={() => alert("Publication link coming soon.")}
              style={{
                background: "transparent", border: `1.5px solid ${C.slate200}`,
                borderRadius: 10, padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 6,
                color: C.slate700, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              }}
            >
              <ExternalLink size={14} /> View
            </button>
          </div>
        ))}
      </div>

      {/* Resource Cards */}
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: C.slate900, marginBottom: 20 }}>
        Documentation & Reports
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {resources.map((r) => (
          <div
            key={r.title}
            style={{
              background: C.white,
              borderRadius: 16,
              padding: "1.75rem",
              border: `1px solid ${C.slate200}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "#F0FDFA", border: "1px solid #99F6E4",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.teal,
                }}
              >
                {r.icon}
              </div>
              <span
                style={{
                  fontSize: "0.7rem", fontWeight: 700, color: C.teal,
                  background: "#F0FDFA", padding: "3px 10px", borderRadius: 999,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}
              >
                {r.tag}
              </span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.slate900, marginBottom: 8 }}>{r.title}</h3>
            <p style={{ color: C.slate500, fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>{r.desc}</p>
            <button
              onClick={() => alert("Download coming soon.")}
              style={{
                background: "transparent", border: `1.5px solid ${C.teal}`,
                borderRadius: 10, padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 6,
                color: C.teal, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              }}
            >
              <Download size={14} /> Download
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}