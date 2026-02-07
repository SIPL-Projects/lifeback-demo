"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/about", label: "About" },
  { href: "/doctor-dashboard", label: "Doctor Dashboard" },
  { href: "/programs", label: "Programs" },
  { href: "/services", label: "Services" }, // ← ADD THIS LINE
  { href: "/stakeholders", label: "Stakeholders" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  

];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* Thin full-width strip */}
      <div
        style={{
          width: "100%",
          padding: "8px 24px", // reduce header height
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Right-aligned group */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 22,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {/* Logo FIRST (before About), still on the right side */}
          <Link
            href="/"
            style={{
              fontWeight: 900,
              color: "#ff7e5f", // orange
              textDecoration: "none",
              fontSize: 36, // ~2x
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            LifeBack™
          </Link>

          {/* Menu after logo */}
          <nav style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: active ? "#3a5a8c" : "#111827",
                    fontWeight: active ? 700 : 500,
                    borderBottom: active ? "2px solid #ff7e5f" : "2px solid transparent",
                    paddingBottom: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
