import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Privacy notice */}
      <div style={{ background: "#f8f9fa", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container" style={{ padding: "14px 20px", fontSize: 13, color: "#666" }}>
          By using our service, you agree to our{" "}
          <Link href="/resources" style={{ color: "#4a6fa5", fontWeight: 700, textDecoration: "none" }}>
            Privacy Policy
          </Link>
          . Your data is processed securely and anonymously.
        </div>
      </div>

      {/* Company strip */}
      <div style={{ background: "#1a252f", color: "#ecf0f1", borderTop: "3px solid #ff7e5f" }}>
        <div className="container" style={{ padding: "18px 20px", fontSize: 14, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700 }}>
            LifeBack™ is SIPL&apos;s multi-modal AI platform supporting the neuro-psychiatric care pathway and strengthening evidence-based management of MNS disorders.
          </div>
          <div style={{ opacity: 0.9, marginTop: 6 }}>
            Sequoia Insilico Private Ltd (SIPL), New Delhi — Advanced AI solutions for mental-health assessment, monitoring, and clinical support.
          </div>
        </div>
      </div>

      {/* Main footer */}
      <footer style={{ background: "#2c3e50", color: "#ecf0f1", padding: "44px 0 26px" }}>
        <div className="container" style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between" }}>
            <div style={{ minWidth: 260, maxWidth: 420 }}>
              <div style={{ fontWeight: 800, fontSize: 20 }}>LifeBack</div>
              <p style={{ opacity: 0.75, marginTop: 10, lineHeight: 1.6 }}>
                AI-powered mental health analysis combining voice patterns, facial action units, and expert-rated scale integration for comprehensive clinical assessment.
              </p>
            </div>

            <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 800, marginBottom: 10 }}>Analyses</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2 }}>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>Voice Patterns</a></li>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>Facial Action Units</a></li>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>Expert Rating Scales</a></li>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>Clinical Integration</a></li>
                </ul>
              </div>

              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 800, marginBottom: 10 }}>Resources</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2 }}>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>Research Validation</a></li>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>Clinical Trials</a></li>
                  <li><a href="/resources" style={{ color: "#b0b7c3", textDecoration: "none" }}>API Documentation</a></li>
                  <li><a href="/contact" style={{ color: "#b0b7c3", textDecoration: "none" }}>Technical Support</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #34495e", marginTop: 28, paddingTop: 18, fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>
            <div>© {new Date().getFullYear()} LifeBack. All rights reserved.</div>
            <div style={{ marginTop: 8, opacity: 0.75 }}>
              Voice patterns, facial action units, and expert rating scales are analyzed as complementary features. This tool is for clinical support purposes only and should be used with professional medical judgment.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
