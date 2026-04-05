"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const chatLabel = isAuthenticated ? "Live Chat" : "Live Demo";

  return (
    <footer style={{ borderTop: "1px solid var(--gb)", padding: "56px 56px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", marginBottom: 16 }}>
              <span
                className="animate-pulse-dot"
                style={{ width: 9, height: 9, borderRadius: "50%", background: "linear-gradient(135deg, var(--coral), var(--amber))", boxShadow: "0 0 12px var(--coral)", display: "inline-block" }}
              />
              Aria
            </Link>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260 }}>
              AI-powered customer support that resolves queries instantly, 24 hours a day.
            </p>
          </div>

          {/* Links */}
          {[
            { title: "Product", links: [{ label: "Features", href: "/features" }, { label: chatLabel, href: "/chat" }, { label: "Pricing", href: "/pricing" }, { label: "Changelog", href: "/changelog" }] },
            { title: "Resources", links: [{ label: "Documentation", href: "/documentation" }, { label: "API Reference", href: "/api-reference" }, { label: "Blog", href: "/blog" }, { label: "FAQs", href: "/faqs" }] },
            { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", marginBottom: 16 }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--gb)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>© 2026 Aria AI. All rights reserved.</span>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>AI Chatbot for Customer Support</span>
        </div>
      </div>
    </footer>
  );
}