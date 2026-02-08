"use client";

/**
 * Pricing & Business Model — Finance, Pricing, GTM, Channel Partners
 * Enhanced with vibrant, colorful design
 */
import { useState, useEffect, useRef } from "react";
import PageShell from "@/components/PageShell";
import {
  Building2, GraduationCap, Briefcase, Smartphone, FlaskConical, Dna, Monitor,
  Users, Handshake, Shield, TrendingUp, ArrowRight, Hospital, CreditCard,
  BarChart3, Target, Globe, Zap, Heart, Brain, Activity, Rocket, TrendingUp as TrendingUpIcon,
  DollarSign, PieChart, Layers, Anchor, Cloud, Cpu, Database, Download
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area, PieChart as RechartPie, Pie, Cell
} from "recharts";

/* ─── VIBRANT COLOR PALETTE ─── */
const C = {
  // Primary vibrant colors
  teal: "#00B4D8",      // Bright cyan-teal
  tealLight: "#56CFE1",
  tealPastel: "#CAF0F8",
  
  emerald: "#10B981",   // Vibrant emerald
  emeraldPastel: "#D1FAE5",
  
  blue: "#3B82F6",      // Bright blue
  blueLight: "#60A5FA",
  bluePastel: "#DBEAFE",
  
  purple: "#8B5CF6",    // Vibrant purple
  purpleLight: "#A78BFA",
  purplePastel: "#EDE9FE",
  
  pink: "#EC4899",      // Hot pink
  pinkPastel: "#FCE7F3",
  
  orange: "#F97316",    // Vibrant orange
  orangeLight: "#FB923C",
  orangePastel: "#FED7AA",
  
  yellow: "#F59E0B",    // Golden yellow
  yellowPastel: "#FEF3C7",
  
  rose: "#F43F5E",      // Bright rose
  rosePastel: "#FFE4E6",
  
  cyan: "#06B6D4",      // Bright cyan
  cyanPastel: "#CFFAFE",
  
  indigo: "#6366F1",    // Deep indigo
  indigoPastel: "#E0E7FF",
  
  // Neutrals
  slate900: "#0F172A",
  slate700: "#334155",
  slate600: "#475569", // Standard Tailwind CSS slate600
  slate500: "#64748B",
  slate300: "#CBD5E1",
  slate200: "#E2E8F0",
  white: "#FFFFFF",
  
  // Backgrounds
  gradient1: "linear-gradient(135deg, #00B4D8 0%, #3B82F6 50%, #8B5CF6 100%)",
  gradient2: "linear-gradient(135deg, #CAF0F8 0%, #DBEAFE 50%, #EDE9FE 100%)",
  gradient3: "linear-gradient(135deg, #D1FAE5 0%, #FED7AA 50%, #FFE4E6 100%)",
  gradient4: "linear-gradient(135deg, #E0E7FF 0%, #FCE7F3 50%, #CFFAFE 100%)",
  
  bg: "#F8FAFC",
};

/* ─── Data ─── */
const revenueData = [
  { year: "Year 3", Hospitals: 7.5, Companies: 3.0, Colleges: 2.25, Patients: 1.8, "Pharma/R&D": 0.75 },
  { year: "Year 4", Hospitals: 18.0, Companies: 6.0, Colleges: 4.5, Patients: 4.8, "Pharma/R&D": 1.5 },
  { year: "Year 5", Hospitals: 30.0, Companies: 9.0, Colleges: 6.75, Patients: 9.0, "Pharma/R&D": 2.25 },
  { year: "Year 6", Hospitals: 42.0, Companies: 12.0, Colleges: 9.0, Patients: 14.4, "Pharma/R&D": 3.0 },
  { year: "Year 7", Hospitals: 52.5, Companies: 15.0, Colleges: 11.25, Patients: 21.6, "Pharma/R&D": 3.75 },
];

const growthData = [
  { year: "Year 3", revenue: 15.3 },
  { year: "Year 4", revenue: 34.8 },
  { year: "Year 5", revenue: 57.0 },
  { year: "Year 6", revenue: 80.4 },
  { year: "Year 7", revenue: 104.1 },
];

const segmentData = [
  { name: "Hospitals", value: 50, color: C.teal },
  { name: "Companies", value: 20, color: C.blue },
  { name: "Colleges", value: 15, color: C.purple },
  { name: "Patients", value: 10, color: C.orange },
  { name: "Pharma/R&D", value: 5, color: C.rose },
];

const pricingTiers = [
  { icon: <Hospital size={24} />, segment: "Hospitals", product: "Hospital SaaS Platform", price: "₹30K–50K/mo", unit: "per department", share: "50%", color: C.teal, bg: C.tealPastel, border: C.tealLight },
  { icon: <GraduationCap size={24} />, segment: "Education", product: "Campus Mental Health Suite", price: "₹2–4L/yr", unit: "per institution", share: "15%", color: C.purple, bg: C.purplePastel, border: C.purpleLight },
  { icon: <Briefcase size={24} />, segment: "Corporate", product: "Employee Mental Health", price: "₹5–10L/yr", unit: "per company", share: "20%", color: C.blue, bg: C.bluePastel, border: C.blueLight },
  { icon: <Monitor size={24} />, segment: "Tele-Health", product: "White-label API", price: "₹50K–1L/mo", unit: "+ revenue share", share: "—", color: C.emerald, bg: C.emeraldPastel, border: C.emerald },
  { icon: <Smartphone size={24} />, segment: "Patients", product: "Continuous Care App", price: "₹999/mo", unit: "or ₹9,999/yr", share: "10%", color: C.orange, bg: C.orangePastel, border: C.orangeLight },
  { icon: <FlaskConical size={24} />, segment: "DaaS", product: "De-identified Data", price: "₹20–50L", unit: "per project", share: "5%", color: C.rose, bg: C.rosePastel, border: C.rose },
  { icon: <Dna size={24} />, segment: "Genomics+", product: "PRS/PGx Reports", price: "₹5–8K", unit: "per report (Year 5+)", share: "Future", color: C.pink, bg: C.pinkPastel, border: C.pink },
];

const gtmPhases = [
  {
    phase: "Phase 1",
    title: "Clinical Validation",
    period: "M0 – M18",
    color: C.teal,
    bg: C.tealPastel,
    border: C.tealLight,
    icon: <FlaskConical size={20} />,
    items: ["IRB-approved trials at RML Hospital", "97% accuracy validation", "CDSCO regulatory pathway mapping", "Patent filing & IP protection"],
  },
  {
    phase: "Phase 2",
    title: "Commercial Launch",
    period: "M18 – M36",
    color: C.blue,
    bg: C.bluePastel,
    border: C.blueLight,
    icon: <Rocket size={20} />,
    items: ["Hospital SaaS deployment (5–10 hospitals)", "Corporate wellness pilot programs", "Campus mental health partnerships", "Direct sales team buildout"],
  },
  {
    phase: "Phase 3",
    title: "Scale & Expand",
    period: "M36 – M60+",
    color: C.purple,
    bg: C.purplePastel,
    border: C.purpleLight,
    icon: <Globe size={20} />,
    items: ["50+ hospital deployments", "White-label API partnerships", "DaaS for Pharma & research", "Regional → Global expansion"],
  },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ badge, title, subtitle, color = C.teal }: { badge: string; title: string; subtitle: string; color?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${color}15`, border: `2px solid ${color}`,
          borderRadius: 999, padding: "6px 16px", marginBottom: 16,
          fontSize: "0.75rem", fontWeight: 700, color: color,
          textTransform: "uppercase", letterSpacing: "0.06em",
        }}
      >
        {badge}
      </div>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: C.slate900, marginBottom: 12, letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <p style={{ color: C.slate500, fontSize: "1rem", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
        {subtitle}
      </p>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Pricing() {
  return (
    <PageShell
      title="Pricing & Business Model"
      subtitle="Transparent pricing across all segments and a diversified revenue model for sustainable growth."
    >
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* Hero Metrics with Gradient */}
        <div style={{ 
          background: C.gradient2,
          borderRadius: 20,
          padding: "2.5rem",
          marginBottom: "3rem",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,180,216,0.1) 0%, rgba(59,130,246,0.05) 70%, transparent 100%)"
          }} />
          
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            position: "relative",
            zIndex: 1
          }}>
            {[
              { value: 30, prefix: "₹", suffix: " Cr", label: "Pre-Money Valuation", color: C.teal, icon: <DollarSign size={20} /> },
              { value: 15, prefix: "$", suffix: "B TAM", label: "Total Addressable Mkt", color: C.blue, icon: <PieChart size={20} /> },
              { value: 83, prefix: "$", suffix: "M SOM", label: "5-Year Target", color: C.purple, icon: <Target size={20} /> },
              { value: 104, prefix: "₹", suffix: " Cr", label: "Year 7 Revenue", color: C.emerald, icon: <TrendingUpIcon size={20} /> },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 16,
                  padding: "1.5rem",
                  border: `2px solid ${m.color}30`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 12,
                    background: m.color,
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "white"
                  }}>
                    {m.icon}
                  </div>
                  <div style={{ fontSize: "1.8rem", color: m.color, fontWeight: 800 }}>
                    <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                </div>
                <div style={{ fontSize: "0.8rem", color: C.slate600, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Segments with Pie Chart */}
        <section style={{ 
          padding: "3rem 0", 
          background: C.gradient3,
          borderRadius: 20,
          marginBottom: "2rem"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <SectionHeading 
              badge="Revenue Segments" 
              title="5-Segment Revenue Architecture" 
              subtitle="Diversified across hospitals, corporates, education, patients, and research."
              color={C.teal}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
              {/* Pie Chart */}
              <div style={{
                background: C.white,
                borderRadius: 20,
                padding: "2rem",
                border: `2px solid ${C.slate200}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.slate900, marginBottom: 20, textAlign: "center" }}>
                  Revenue Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartPie>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  </RechartPie>
                </ResponsiveContainer>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
                  {segmentData.map((seg) => (
                    <div key={seg.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 4, background: seg.color }} />
                      <span style={{ fontSize: "0.8rem", color: C.slate700 }}>{seg.name} ({seg.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                {segmentData.map((seg) => (
                  <div
                    key={seg.name}
                    style={{
                      background: C.white,
                      borderRadius: 16,
                      padding: "1.5rem",
                      border: `2px solid ${seg.color}40`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      transition: "all 0.3s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 12px 24px ${seg.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
                    }}
                  >
                    <div style={{ 
                      position: "absolute", 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      height: 4, 
                      background: `linear-gradient(90deg, ${seg.color}, ${seg.color}80)` 
                    }} />
                    <div style={{ 
                      fontSize: "2rem", 
                      fontWeight: 800, 
                      color: seg.color,
                      textAlign: "center",
                      marginBottom: 12 
                    }}>
                      {seg.value}%
                    </div>
                    <h3 style={{ 
                      fontSize: "1.1rem", 
                      fontWeight: 700, 
                      color: C.slate900, 
                      marginBottom: 8,
                      textAlign: "center"
                    }}>
                      {seg.name}
                    </h3>
                    <div style={{ 
                      height: 6, 
                      background: `${seg.color}20`, 
                      borderRadius: 999, 
                      overflow: "hidden",
                      marginTop: 12 
                    }}>
                      <div style={{ 
                        width: `${seg.value}%`, 
                        height: "100%", 
                        background: seg.color, 
                        borderRadius: 999,
                        transition: "width 1.5s ease-out"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Model - Colorful Cards */}
        <section style={{ 
          padding: "3rem 0", 
          background: C.white,
          borderRadius: 20,
          marginBottom: "2rem"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <SectionHeading 
              badge="Pricing" 
              title="Flexible Pricing Model" 
              subtitle="Tailored pricing across all segments with transparent revenue sharing."
              color={C.blue}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {pricingTiers.map((tier) => (
                <div
                  key={tier.segment}
                  style={{
                    background: `linear-gradient(135deg, ${tier.bg}, white)`,
                    borderRadius: 20,
                    padding: "2rem",
                    border: `2px solid ${tier.border}`,
                    boxShadow: `0 6px 20px ${tier.color}20`,
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 12px 32px ${tier.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = `0 6px 20px ${tier.color}20`;
                  }}
                >
                  {/* Corner accent */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 60,
                    height: 60,
                    background: tier.color,
                    borderBottomLeftRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.2rem"
                  }}>
                    {tier.icon}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <span style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: tier.color,
                      background: `${tier.color}15`,
                      padding: "4px 12px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      {tier.segment}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.slate900, marginBottom: 12 }}>
                    {tier.product}
                  </h3>

                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                    <span style={{ 
                      fontFamily: "'JetBrains Mono', monospace", 
                      fontSize: "1.5rem", 
                      fontWeight: 800, 
                      color: tier.color 
                    }}>
                      {tier.price}
                    </span>
                    <span style={{ color: C.slate500, fontSize: "0.9rem" }}>/ {tier.unit}</span>
                  </div>

                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    paddingTop: 16,
                    borderTop: `1px solid ${tier.border}`
                  }}>
                    <span style={{ fontSize: "0.85rem", color: C.slate600 }}>Revenue Share</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      color: tier.color,
                      padding: "4px 12px",
                      background: `${tier.color}15`,
                      borderRadius: 8
                    }}>
                      {tier.share}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GTM Phases with Timeline */}
        <section style={{ 
          padding: "3rem 0", 
          background: C.gradient4,
          borderRadius: 20,
          marginBottom: "2rem"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <SectionHeading 
              badge="Go-to-Market" 
              title="3-Phase Growth Strategy" 
              subtitle="From clinical validation to global expansion in 5+ years."
              color={C.purple}
            />

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
              gap: 30,
              position: "relative"
            }}>
              {gtmPhases.map((phase, index) => (
                <div
                  key={phase.phase}
                  style={{
                    background: C.white,
                    borderRadius: 20,
                    padding: "2rem",
                    border: `2px solid ${phase.border}`,
                    boxShadow: `0 8px 32px ${phase.color}20`,
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 16px 40px ${phase.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 32px ${phase.color}20`;
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: phase.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.5rem"
                    }}>
                      {phase.icon}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          color: phase.color,
                          padding: "4px 12px",
                          background: `${phase.color}15`,
                          borderRadius: 999
                        }}>
                          {phase.phase}
                        </span>
                        <span style={{ 
                          fontSize: "0.85rem", 
                          color: C.slate500, 
                          fontFamily: "'JetBrains Mono', monospace" 
                        }}>
                          {phase.period}
                        </span>
                      </div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: C.slate900, marginTop: 4 }}>
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {phase.items.map((item, idx) => (
                      <li 
                        key={idx}
                        style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 12, 
                          padding: "10px 0",
                          borderBottom: idx < phase.items.length - 1 ? `1px dashed ${phase.color}30` : "none"
                        }}
                      >
                        <div style={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: "50%", 
                          background: `${phase.color}20`,
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: phase.color,
                          flexShrink: 0
                        }}>
                          ✓
                        </div>
                        <span style={{ color: C.slate700, fontSize: "0.9rem", lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Projections with Colorful Charts */}
        <section style={{ 
          padding: "3rem 0", 
          background: C.white,
          borderRadius: 20,
          marginBottom: "2rem"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <SectionHeading 
              badge="Financials" 
              title="5-Year Revenue Projections" 
              subtitle="Exponential growth from ₹15.3 Cr to ₹104.1 Cr in 5 years."
              color={C.emerald}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: 30, marginBottom: 40 }}>
              {/* Stacked Bar Chart */}
              <div style={{
                background: "linear-gradient(135deg, #F8FAFC, white)",
                borderRadius: 20,
                padding: "2rem",
                border: `2px solid ${C.slate200}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <BarChart3 size={24} color={C.teal} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.slate900 }}>
                    Revenue by Segment (₹ Cr)
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 12, fill: C.slate500, fontWeight: 600 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: C.slate500 }}
                      label={{ value: '₹ Cr', angle: -90, position: 'insideLeft', fill: C.slate500 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        borderRadius: 12, 
                        border: `2px solid ${C.slate200}`, 
                        fontSize: 12,
                        backdropFilter: "blur(10px)",
                        background: "rgba(255,255,255,0.9)"
                      }}
                      formatter={(value: number | undefined) => [`?${value ?? 0} Cr`, "Revenue"]}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, marginTop: 20 }} />
                    <Bar dataKey="Hospitals" stackId="a" fill={C.teal} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Companies" stackId="a" fill={C.blue} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Colleges" stackId="a" fill={C.purple} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Patients" stackId="a" fill={C.orange} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Pharma/R&D" stackId="a" fill={C.rose} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Growth Area Chart */}
              <div style={{
                background: "linear-gradient(135deg, #F8FAFC, white)",
                borderRadius: 20,
                padding: "2rem",
                border: `2px solid ${C.slate200}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <TrendingUpIcon size={24} color={C.emerald} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.slate900 }}>
                    Total Revenue Growth (₹ Cr)
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.emerald} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={C.emerald} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 12, fill: C.slate500, fontWeight: 600 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: C.slate500 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        borderRadius: 12, 
                        border: `2px solid ${C.slate200}`, 
                        fontSize: 12,
                        backdropFilter: "blur(10px)",
                        background: "rgba(255,255,255,0.9)"
                      }}
                      formatter={(value: number | undefined) => [`?${value ?? 0} Cr`, "Revenue"]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={C.emerald} 
                      strokeWidth={3}
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Investment CTA - Colorful Gradient */}
        <section style={{ 
          padding: "3rem 0",
          background: C.gradient1,
          borderRadius: 20,
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }} />
          
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                padding: "8px 20px",
                marginBottom: 20,
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "white",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                <Rocket size={16} />
                Investment Opportunity
              </div>
              
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)", 
                fontWeight: 800, 
                color: "white", 
                marginBottom: 16,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}>
                Join the Future of Mental Healthcare
              </h2>
              
              <p style={{ 
                color: "rgba(255,255,255,0.9)", 
                fontSize: "1.1rem", 
                lineHeight: 1.7, 
                marginBottom: 32,
                maxWidth: 600,
                margin: "0 auto"
              }}>
                ₹1.5 Cr for 5% Equity at ₹30 Cr Pre-Money Valuation. 
                Staged global expansion with phased disease rollout across 17 conditions.
              </p>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: 20,
              maxWidth: 700,
              margin: "0 auto"
            }}>
              {[
                { 
                  value: "₹1.5 Cr", 
                  label: "Investment Ask", 
                  color: C.tealPastel, 
                  textColor: C.teal,
                  icon: <DollarSign size={24} />
                },
                { 
                  value: "5%", 
                  label: "Equity Offered", 
                  color: C.bluePastel, 
                  textColor: C.blue,
                  icon: <PieChart size={24} />
                },
                { 
                  value: "₹30 Cr", 
                  label: "Pre-Money Valuation", 
                  color: C.purplePastel, 
                  textColor: C.purple,
                  icon: <TrendingUpIcon size={24} />
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 16,
                    padding: "1.5rem",
                    border: `2px solid ${item.color}`,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    transition: "all 0.3s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)";
                  }}
                >
                  <div style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 12,
                    background: item.color,
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: item.textColor,
                    margin: "0 auto 16px"
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ 
                    fontFamily: "'JetBrains Mono', monospace", 
                    fontWeight: 800, 
                    fontSize: "1.8rem", 
                    color: item.textColor,
                    marginBottom: 8 
                  }}>
                    {item.value}
                  </div>
                  <div style={{ 
                    fontSize: "0.85rem", 
                    color: C.slate600, 
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button
                onClick={() => alert("Investment deck available upon request")}
                style={{
                  background: "white",
                  color: C.teal,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 32px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                <Download size={18} />
                Request Investment Deck
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}



