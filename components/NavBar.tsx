import Link from "next/link";

export default function NavBar() {
  return (
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
      <div
        className="container"
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          padding: "14px 20px",
        }}
      >
        <Link href="/" style={{ fontWeight: 800, color: "#3a5a8c", textDecoration: "none" }}>
          LifeBack™
        </Link>

        <div style={{ display: "flex", gap: 14, marginLeft: "auto" }}>
          <Link href="/about">About</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/services">Services</Link>
          <Link href="/stakeholders">Stakeholders</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}