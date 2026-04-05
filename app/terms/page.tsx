"use client";

import { FileText, AlertCircle, DollarSign, Lock, Zap } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content:
        "By accessing and using Aria, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: Zap,
      title: "Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials (information or software) on Aria for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
      items: [
        "Modify or copy the materials",
        "Use the materials for any commercial purpose or for any public display",
        "Attempt to reverse engineer, disassemble, or decompile the software",
        "Remove any copyright or other proprietary notations from the materials",
        "Transfer the materials to another person or 'mirror' the materials on any other server",
      ],
    },
    {
      icon: AlertCircle,
      title: "Disclaimer",
      content:
        "The materials on Aria are provided on an 'as is' basis. Aria makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
      icon: DollarSign,
      title: "Limitations",
      content:
        "In no event shall Aria or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Aria.",
    },
    {
      icon: Lock,
      title: "Accuracy of Materials",
      content:
        "The materials appearing on Aria could include technical, typographical, or photographic errors. Aria does not warrant that any of the materials on Aria are accurate, complete, or current. Aria may make changes to the materials contained on its website at any time without notice.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 80 }}>
      {/* Background Grid */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(0deg, transparent 24%, rgba(45,212,191,0.05) 25%, rgba(45,212,191,0.05) 26%, transparent 27%, transparent 74%, rgba(45,212,191,0.05) 75%, rgba(45,212,191,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(45,212,191,0.05) 25%, rgba(45,212,191,0.05) 26%, transparent 27%, transparent 74%, rgba(45,212,191,0.05) 75%, rgba(45,212,191,0.05) 76%, transparent 77%, transparent)",
        backgroundSize: "50px 50px",
        pointerEvents: "none",
        zIndex: 0,
      }}></div>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px 60px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          color: "white",
          marginBottom: 16,
          fontFamily: "'Syne', sans-serif",
        }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
          Last updated: April 5, 2026
        </p>
      </section>

      {/* Intro */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 28 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontSize: "0.95rem" }}>
            Welcome to Aria. These Terms of Service (&quot;Terms&quot;) govern your use of our website, services, and products. By accessing or using Aria in any way, including visiting our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 24 }}>
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 28 }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <Icon size={28} color="#2DD4BF" style={{ flexShrink: 0 }} />
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "white", fontFamily: "'Syne', sans-serif" }}>{section.title}</h2>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: section.items ? 16 : 0 }}>{section.content}</p>
                  {section.items && (
                    <ul style={{ marginLeft: 24, color: "rgba(255,255,255,0.6)" }}>
                      {section.items.map((item, i) => (
                        <li key={i} style={{ marginBottom: 8, lineHeight: 1.6 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Governing Law</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            These Terms and Conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts located in that location.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Have Questions?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <span style={{ color: "#2DD4BF", fontWeight: 600 }}>legal@aria.dev</span>
          </p>
          <button style={{
            background: "linear-gradient(135deg, #2DD4BF, #06B6D4)",
            color: "white",
            padding: "12px 32px",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.95rem",
          }}>
            Contact Legal Team
          </button>
        </div>
      </section>
    </div>
  );
}
