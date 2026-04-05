"use client";

import { Code2, BookOpen, Settings, Zap, ChevronRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DocumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const docs = [
    {
      title: "Getting Started",
      icon: Zap,
      sections: [
        { heading: "Installation", content: "npm install aria-sdk" },
        { heading: "Authentication", content: "import { AriaClient } from 'aria-sdk';\nconst client = new AriaClient('YOUR_API_KEY');" },
      ],
    },
    {
      title: "API Reference",
      icon: Code2,
      sections: [
        { heading: "Conversations", content: "client.conversations.list()\nclient.conversations.get(id)\nclient.conversations.create()" },
        { heading: "Messages", content: "client.messages.send(conversationId, content)\nclient.messages.list(conversationId)" },
      ],
    },
    {
      title: "Configuration",
      icon: Settings,
      sections: [
        { heading: "Settings", content: "client.config.setLanguage('en')\nclient.config.setTimeZone('UTC')\nclient.config.enableAnalytics(true)" },
      ],
    },
    {
      title: "Guides",
      icon: BookOpen,
      sections: [
        { heading: "Integration", content: "Step-by-step guide to integrate Aria into your application" },
        { heading: "Best Practices", content: "Learn optimization techniques and performance tips" },
      ],
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
        background: "linear-gradient(0deg, transparent 24%, rgba(255,107,107,0.05) 25%, rgba(255,107,107,0.05) 26%, transparent 27%, transparent 74%, rgba(255,107,107,0.05) 75%, rgba(255,107,107,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,107,107,0.05) 25%, rgba(255,107,107,0.05) 26%, transparent 27%, transparent 74%, rgba(255,107,107,0.05) 75%, rgba(255,107,107,0.05) 76%, transparent 77%, transparent)",
        backgroundSize: "50px 50px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.1,
      }}></div>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px 100px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
          fontWeight: 800,
          color: "white",
          marginBottom: 24,
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #FF6B6B 0%, #2DD4BF 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Developer Documentation
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
          Complete guides and API reference for building with Aria
        </p>
      </section>

      {/* Documentation Grid */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {docs.map((doc, idx) => {
              const Icon = doc.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20,
                    padding: 32,
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,107,0.4)";
                    (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)";
                  }}
                >
                  <Icon size={32} color="#FF6B6B" style={{ marginBottom: 16 }} />
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>{doc.title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {doc.sections.map((sec, i) => (
                      <div key={i}>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FF6B6B", marginBottom: 8 }}>{sec.heading}</h3>
                        <div style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12,
                          padding: 12,
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "monospace",
                          position: "relative",
                          whiteSpace: "pre-wrap",
                        }}>
                          {sec.content}
                          <button
                            onClick={() => copyToClipboard(sec.content)}
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              background: "rgba(255,255,255,0.1)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: 6,
                              padding: "4px 8px",
                              cursor: "pointer",
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "0.75rem",
                            }}
                          >
                            {copiedCode === sec.content ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px", textAlign: "center" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(45,212,191,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: 60,
          backdropFilter: "blur(10px)",
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Need Help?</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>Check our FAQ or contact support</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
              color: "white",
              padding: "14px 32px",
              borderRadius: 12,
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
            }} onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }} onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}>
              View FAQs
            </button>
            <button style={{
              background: "transparent",
              color: "white",
              padding: "14px 32px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
            }} onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,107,0.5)";
            }} onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}>
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
