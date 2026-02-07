"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Mail, MapPin, Phone, Linkedin, Clock, User, Building } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    interest: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! This is a demo form.");
    // In real implementation: API call to backend
  };

  return (
    <PageShell
      title="Contact LifeBack"
      subtitle="Get in touch for partnerships, integrations, or investment opportunities"
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
        {/* Contact Form */}
        <div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 20 }}>Send us a message</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: "0.9rem", fontWeight: 500 }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc" }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: "0.9rem", fontWeight: 500 }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc" }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: "0.9rem", fontWeight: 500 }}>
                Organization
              </label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc" }}
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: "0.9rem", fontWeight: 500 }}>
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc" }}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "#0D9488",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                marginTop: 10
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 20 }}>Contact Information</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ background: "#F0FDFA", padding: 10, borderRadius: 8 }}>
                <Mail size={20} color="#0D9488" />
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>General Inquiries</div>
                <a href="mailto:contact@lifeback.ai" style={{ color: "#0D9488" }}>
                  contact@lifeback.ai
                </a>
                <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: 2 }}>
                  Response within 24 hours
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ background: "#F0FDFA", padding: 10, borderRadius: 8 }}>
                <Building size={20} color="#0D9488" />
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Clinical Partnerships</div>
                <a href="mailto:partnerships@lifeback.ai" style={{ color: "#0D9488" }}>
                  partnerships@lifeback.ai
                </a>
                <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: 2 }}>
                  For hospitals & healthcare providers
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ background: "#F0FDFA", padding: 10, borderRadius: 8 }}>
                <User size={20} color="#0D9488" />
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Investor Relations</div>
                <a href="mailto:investors@lifeback.ai" style={{ color: "#0D9488" }}>
                  investors@lifeback.ai
                </a>
                <div style={{ fontSize: "0.85rem", color: "#64748B", marginTop: 2 }}>
                  Investment deck available
                </div>
              </div>
            </div>

            {/* Demo Note */}
            <div style={{ 
              background: "#FEF3C7", 
              border: "1px solid #F59E0B",
              borderRadius: 8,
              padding: 16,
              marginTop: 20
            }}>
              <div style={{ fontSize: "0.9rem", color: "#92400E" }}>
                <strong>Note:</strong> This is a demonstration project. For actual business inquiries, 
                please replace with your professional contact information.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}