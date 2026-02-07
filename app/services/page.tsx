"use client";

import PageShell from "@/components/PageShell";
import { Building2, Users, Database, Link2, Mic, Smile, Brain, Activity, Shield, FileText, Zap, Target, BarChart, Heart, Stethoscope, Globe, Cpu, ShieldCheck, Cloud, Cctv, PieChart, ClipboardCheck, Calendar, Download } from "lucide-react";

const C = {
  teal: "#0D9488",
  tealLight: "#14B8A6",
  tealLighter: "#99F6E4",
  tealBg: "#F0FDFA",
  slate900: "#0F172A",
  slate700: "#334155",
  slate500: "#64748B",
  slate200: "#E2E8F0",
  white: "#FFFFFF",
  orange: "#F97316",
  blue: "#2563EB",
  blueBg: "#EFF6FF",
  purple: "#7C3AED",
  purpleBg: "#F5F3FF",
  red: "#DC2626",
  redBg: "#FEF2F2",
  amber: "#F59E0B",
  amberBg: "#FEF3C7",
};

const services = [
  {
    icon: <Building2 size={34} />,
    title: "Hospital Module (B2B)",
    subtitle: "For Clinicians & Hospital Administrators",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealLighter,
    features: [
      "AI-powered screening & severity scoring",
      "Clinician dashboard with trend analytics",
      "Follow-up tracker & reminders",
      "EMR/EHR integration (HL7/FHIR, SSO)",
      "Department-level reporting & audit trails",
      "Multi-specialty support (17 conditions)",
    ],
    cta: "Learn More →",
    stats: "Used by 50+ hospitals"
  },
  {
    icon: <Users size={34} />,
    title: "Patient Module (B2B2C)",
    subtitle: "For Patients Under Hospital Care",
    color: C.blue,
    bg: C.blueBg,
    border: "#93C5FD",
    features: [
      "Continuous care dashboard",
      "Self-monitoring & mood tracking",
      "Medication adherence reminders",
      "Caregiver family access",
      "Secure messaging with care team",
      "Progress reports & insights",
    ],
    cta: "View Demo →",
    stats: "10,000+ active patients"
  },
  {
    icon: <Database size={34} />,
    title: "Data & Analytics (DaaS)",
    subtitle: "For Researchers, Pharma & Institutions",
    color: C.purple,
    bg: C.purpleBg,
    border: "#C4B5FD",
    features: [
      "De-identified, audit-ready datasets",
      "Population health analytics",
      "Pharma R&D collaboration tools",
      "Academic research partnerships",
      "Regulatory-compliant data handling",
      "Custom analytics dashboards",
    ],
    cta: "Request Access →",
    stats: "5+ research partners"
  },
  {
    icon: <Link2 size={34} />,
    title: "Connected Care",
    subtitle: "Cross-Specialty Expansion",
    color: C.red,
    bg: C.redBg,
    border: "#FECACA",
    features: [
      "Start with Psychiatry as beachhead",
      "Expand to Cardio-metabolic conditions",
      "Oncology mental health support",
      "Postpartum depression screening",
      "Chronic disease mental wellness",
      "Phased rollout across 17 conditions",
    ],
    cta: "Explore Roadmap →",
    stats: "17 medical specialties"
  },
];

const techStack = [
  { 
    icon: <Mic size={26} />, 
    label: "Voice Biomarkers", 
    desc: "Prosody, pitch, pauses, energy analysis" 
  },
  { 
    icon: <Smile size={26} />, 
    label: "Facial Analysis", 
    desc: "Action Units, micro-expressions, emotional cues" 
  },
  { 
    icon: <Brain size={26} />, 
    label: "Multi-Modal Fusion", 
    desc: "Cross-signal AI integration & validation" 
  },
  { 
    icon: <Activity size={26} />, 
    label: "Longitudinal Tracking", 
    desc: "Trend analysis over time with predictive alerts" 
  },
  { 
    icon: <ShieldCheck size={26} />, 
    label: "Privacy-First Design", 
    desc: "On-premise / federated learning options" 
  },
  { 
    icon: <FileText size={26} />, 
    label: "Clinical Scales", 
    desc: "PHQ-9, HAMD, GAD-7 calibrated & validated" 
  },
  { 
    icon: <Cpu size={26} />, 
    label: "Edge AI Processing", 
    desc: "On-device processing for data privacy" 
  },
  { 
    icon: <Globe size={26} />, 
    label: "Multi-Language Support", 
    desc: "Support for 12+ languages & dialects" 
  },
];

const industries = [
  {
    title: "Hospitals & Healthcare Systems",
    icon: <Stethoscope size={24} />,
    benefits: ["Reduce readmission rates", "Improve patient outcomes", "Optimize clinician workflow"]
  },
  {
    title: "Pharmaceutical Companies",
    icon: <PieChart size={24} />,
    benefits: ["Clinical trial recruitment", "Treatment adherence monitoring", "Real-world evidence"]
  },
  {
    title: "Insurance Providers",
    icon: <Shield size={24} />,
    benefits: ["Risk assessment tools", "Claims validation", "Preventive care incentives"]
  },
  {
    title: "Research Institutions",
    icon: <BarChart size={24} />,
    benefits: ["Longitudinal studies", "Population health data", "Grant support materials"]
  },
  {
    title: "Corporate Wellness",
    icon: <Users size={24} />,
    benefits: ["Employee mental health", "Productivity metrics", "ROI analysis"]
  },
  {
    title: "Government & Public Health",
    icon: <ClipboardCheck size={24} />,
    benefits: ["Population screening", "Policy planning", "Public health initiatives"]
  },
];

export default function Services() {
  return (
    <PageShell
      title="Our Services & Products"
      subtitle="Comprehensive AI-powered healthcare solutions for hospitals, patients, and research partners"
    >
      {/* Hero Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #F0FDFA 0%, #E0F2FE 100%)",
        borderRadius: 24,
        padding: "60px 40px",
        marginBottom: 60,
        textAlign: "center",
        border: "2px solid #99F6E4"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ 
            fontSize: "2.8rem", 
            fontWeight: 800, 
            color: C.slate900, 
            marginBottom: 20,
            lineHeight: 1.2
          }}>
            Transform Healthcare with <span style={{ color: C.teal }}>AI-Driven</span> Solutions
          </h1>
          <p style={{ 
            fontSize: "1.3rem", 
            color: C.slate700, 
            lineHeight: 1.6,
            marginBottom: 30
          }}>
            LifeBack™ offers modular, scalable platforms designed to improve patient outcomes, 
            streamline clinical workflows, and advance medical research through cutting-edge AI technology.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              padding: "16px 32px",
              background: C.teal,
              color: "white",
              border: "none",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <Zap size={20} /> Request Enterprise Demo
            </button>
            <button style={{
              padding: "16px 32px",
              background: "transparent",
              color: C.teal,
              border: `2px solid ${C.teal}`,
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1.1rem",
              cursor: "pointer"
            }}>
              Download Product Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Core Services */}
      <div style={{ marginBottom: 80 }}>
        <h2 style={{ 
          fontSize: "2.2rem", 
          fontWeight: 800, 
          color: C.slate900, 
          marginBottom: 40,
          textAlign: "center"
        }}>
          Core Product Modules
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: 30,
          marginBottom: 60
        }}>
          {services.map((service, index) => (
            <div
              key={service.title}
              style={{
                background: C.white,
                borderRadius: 20,
                padding: 36,
                border: `2px solid ${service.border}`,
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${service.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                height: 4, 
                background: `linear-gradient(90deg, ${service.color}, ${service.color}80)`,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }} />
              
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    background: service.bg,
                    border: `2px solid ${service.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: service.color,
                    marginRight: 20,
                    flexShrink: 0
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: 800, 
                    color: C.slate900, 
                    marginBottom: 6 
                  }}>
                    {service.title}
                  </h3>
                  <p style={{ 
                    fontSize: "0.95rem", 
                    color: service.color, 
                    fontWeight: 700, 
                    marginBottom: 6 
                  }}>
                    {service.subtitle}
                  </p>
                  <div style={{ 
                    fontSize: "0.85rem", 
                    color: C.slate500, 
                    background: "#F8FAFC",
                    padding: "4px 12px",
                    borderRadius: 20,
                    display: "inline-block"
                  }}>
                    {service.stats}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, marginBottom: 24 }}>
                <ul style={{ 
                  listStyle: "none", 
                  padding: 0, 
                  margin: 0, 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 12 
                }}>
                  {service.features.map((feature) => (
                    <li key={feature} style={{ 
                      display: "flex", 
                      alignItems: "flex-start", 
                      gap: 12, 
                      color: C.slate700, 
                      fontSize: "0.98rem", 
                      lineHeight: 1.5 
                    }}>
                      <div style={{ 
                        width: 22, 
                        height: 22, 
                        borderRadius: "50%", 
                        background: service.bg, 
                        border: `2px solid ${service.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        <div style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: "50%", 
                          background: service.color 
                        }} />
                      </div>
                      <span style={{ fontWeight: 500 }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: service.bg,
                  color: service.color,
                  border: `2px solid ${service.border}`,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = service.color;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = service.bg;
                  e.currentTarget.style.color = service.color;
                }}
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div style={{ marginBottom: 80 }}>
        <h2 style={{ 
          fontSize: "2.2rem", 
          fontWeight: 800, 
          color: C.slate900, 
          marginBottom: 40,
          textAlign: "center"
        }}>
          Advanced Technology Stack
        </h2>
        
        <div style={{ 
          background: C.white,
          borderRadius: 24,
          padding: "50px 40px",
          border: `2px solid ${C.slate200}`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: 24,
            marginBottom: 40
          }}>
            {techStack.map((tech) => (
              <div
                key={tech.label}
                style={{
                  background: C.tealBg,
                  border: `2px solid ${C.tealLighter}`,
                  borderRadius: 16,
                  padding: "28px 20px",
                  textAlign: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 15px 30px ${C.teal}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ 
                  color: C.teal, 
                  marginBottom: 16, 
                  display: "flex", 
                  justifyContent: "center" 
                }}>
                  {tech.icon}
                </div>
                <div style={{ 
                  fontWeight: 800, 
                  color: C.slate900, 
                  fontSize: "1.1rem", 
                  marginBottom: 8 
                }}>
                  {tech.label}
                </div>
                <div style={{ 
                  color: C.slate500, 
                  fontSize: "0.9rem",
                  lineHeight: 1.5
                }}>
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            textAlign: "center", 
            marginTop: 40,
            paddingTop: 40,
            borderTop: `2px solid ${C.slate200}`
          }}>
            <h3 style={{ 
              fontSize: "1.5rem", 
              fontWeight: 700, 
              color: C.slate900, 
              marginBottom: 20 
            }}>
              Infrastructure & Compliance
            </h3>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 16, 
              justifyContent: "center",
              maxWidth: 800,
              margin: "0 auto"
            }}>
              {["HIPAA Compliant", "GDPR Ready", "SOC 2 Type II", "ISO 27001 Certified", "FedRAMP Authorized", "HITRUST CSF"].map((item) => (
                <div key={item} style={{
                  background: "#F8FAFC",
                  border: `1px solid ${C.slate200}`,
                  borderRadius: 20,
                  padding: "10px 20px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: C.slate700
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industries Served */}
      <div style={{ marginBottom: 80 }}>
        <h2 style={{ 
          fontSize: "2.2rem", 
          fontWeight: 800, 
          color: C.slate900, 
          marginBottom: 40,
          textAlign: "center"
        }}>
          Industries We Serve
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: 24 
        }}>
          {industries.map((industry) => (
            <div
              key={industry.title}
              style={{
                background: C.white,
                borderRadius: 16,
                padding: 28,
                border: `2px solid ${C.slate200}`,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = C.teal;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = C.slate200;
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: C.tealBg,
                  border: `2px solid ${C.tealLighter}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.teal,
                  marginRight: 16,
                  flexShrink: 0
                }}>
                  {industry.icon}
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 700, 
                  color: C.slate900 
                }}>
                  {industry.title}
                </h3>
              </div>
              
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {industry.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    gap: 10, 
                    marginBottom: 12,
                    fontSize: "0.98rem",
                    color: C.slate700
                  }}>
                    <div style={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      background: C.tealBg,
                      border: `1px solid ${C.tealLighter}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      <div style={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: "50%", 
                        background: C.teal 
                      }} />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
        borderRadius: 24,
        padding: "60px 40px",
        textAlign: "center",
        color: "white"
      }}>
        <h2 style={{ 
          fontSize: "2.5rem", 
          fontWeight: 800, 
          marginBottom: 20 
        }}>
          Ready to Transform Your Healthcare Services?
        </h2>
        <p style={{ 
          fontSize: "1.2rem", 
          marginBottom: 40,
          opacity: 0.9,
          maxWidth: 700,
          margin: "0 auto 40px",
          lineHeight: 1.6
        }}>
          Schedule a personalized demo to see how LifeBack™ can integrate with your existing systems 
          and deliver measurable improvements in patient care and operational efficiency.
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            padding: "18px 40px",
            background: "white",
            color: C.teal,
            border: "none",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <Calendar size={20} /> Schedule Demo
          </button>
          <button style={{
            padding: "18px 40px",
            background: "transparent",
            color: "white",
            border: "2px solid white",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <Download size={20} /> Download Case Studies
          </button>
        </div>
        <p style={{ marginTop: 40, fontSize: "0.95rem", opacity: 0.8 }}>
          Contact our sales team: sales@lifeback.ai • +1 (800) 555-HEALTH • Available Mon-Fri 9AM-6PM EST
        </p>
      </div>
    </PageShell>
  );
}