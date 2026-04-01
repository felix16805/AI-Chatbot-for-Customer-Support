"use client";

import Link from "next/link";

interface CTAProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export default function CTASection({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CTAProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(132,94,194,0.2), rgba(255,107,107,0.15))",
        border: "1px solid var(--gb)",
        borderRadius: 28,
        margin: "0 56px 80px",
        padding: "80px 56px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(78,205,196,0.08), transparent 70%)", pointerEvents: "none" }} />
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 20,
          position: "relative",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px", position: "relative" }}>
        {subtitle}
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
        <Link href={primaryHref}>
          <button style={{ padding: "15px 36px", fontSize: "1rem", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", border: "none", background: "linear-gradient(135deg, var(--coral), var(--amber))", color: "#fff" }}>
            {primaryLabel}
          </button>
        </Link>
        <Link href={secondaryHref}>
          <button style={{ padding: "15px 36px", fontSize: "1rem", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", background: "var(--glass)", border: "1px solid var(--gb)", color: "#fff", backdropFilter: "blur(8px)" }}>
            {secondaryLabel}
          </button>
        </Link>
      </div>
    </div>
  );
}