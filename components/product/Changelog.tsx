"use client";

import React from "react";

export default function ChangelogPage() {
  const changelogEntries = [
    {
      version: "3.2.0",
      date: "March 28, 2025",
      tag: "Latest",
      changes: [
        { type: "feature", title: "Advanced Sentiment Analysis", desc: "New ML model for detecting customer emotion and tone with 94% accuracy" },
        { type: "feature", title: "Proactive Issue Detection", desc: "AI now identifies potential problems before customers report them" },
        { type: "improvement", title: "Response Time Optimization", desc: "Reduced average response latency from 240ms to 85ms" },
        { type: "bug", title: "Fixed metadata caching issue", desc: "Resolved bug where conversation metadata wasn't syncing properly" },
      ],
    },
    {
      version: "3.1.0",
      date: "March 15, 2025",
      tag: "Stable",
      changes: [
        { type: "feature", title: "Slack Integration", desc: "Seamless two-way sync with Slack channels for unified support" },
        { type: "feature", title: "Custom Knowledge Base", desc: "Upload and manage custom documentation for AI training" },
        { type: "improvement", title: "Dashboard redesign", desc: "New analytics dashboard with real-time metrics and trends" },
        { type: "improvement", title: "Webhook system", desc: "Enhanced webhook delivery with retry logic and monitoring" },
      ],
    },
    {
      version: "3.0.0",
      date: "February 28, 2025",
      tag: "Major Release",
      changes: [
        { type: "feature", title: "Multi-language Support", desc: "Support for 25+ languages with automatic detection" },
        { type: "feature", title: "Enterprise SSO", desc: "SAML 2.0 and OpenID Connect integration for enterprise deployments" },
        { type: "feature", title: "Advanced Escalation Flows", desc: "Conditional routing based on multiple factors with AI optimization" },
        { type: "improvement", title: "Performance boost", desc: "40% improvement in query processing speed" },
        { type: "breaking", title: "API v2 deprecation", desc: "API v1 officially deprecated (migration guide available)" },
      ],
    },
    {
      version: "2.9.0",
      date: "January 20, 2025",
      tag: "Stable",
      changes: [
        { type: "feature", title: "Voice Support", desc: "Handle customer support through voice interactions" },
        { type: "improvement", title: "Batch processing", desc: "Process up to 10,000 messages per minute" },
        { type: "bug", title: "Fixed timezone handling", desc: "Corrected UTC offset calculations for all regions" },
      ],
    },
    {
      version: "2.8.0",
      date: "December 10, 2024",
      tag: "Stable",
      changes: [
        { type: "feature", title: "Real-time Analytics Dashboard", desc: "Live metrics for conversations, satisfaction scores, and resolution rates" },
        { type: "feature", title: "Custom Integrations", desc: "Webhooks and API for building custom connectors" },
        { type: "improvement", title: "Mobile responsiveness", desc: "Optimized all interfaces for mobile and tablet devices" },
      ],
    },
    {
      version: "2.7.0",
      date: "November 15, 2024",
      tag: "Stable",
      changes: [
        { type: "feature", title: "Conversation History Search", desc: "Full-text search across all past conversations" },
        { type: "improvement", title: "Knowledge base indexing", desc: "Faster search results with semantic understanding" },
        { type: "bug", title: "Fixed email parsing", desc: "Improved accuracy of email content extraction" },
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "var(--mint)";
      case "improvement":
        return "var(--amber)";
      case "bug":
        return "var(--coral)";
      case "breaking":
        return "#FF6B6B";
      default:
        return "rgba(255,255,255,0.6)";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "feature":
        return "✨ Feature";
      case "improvement":
        return "🚀 Improvement";
      case "bug":
        return "🐛 Bug Fix";
      case "breaking":
        return "⚠️ Breaking";
      default:
        return "📝 Update";
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 56px" }}>
      {/* Header */}
      <div style={{ marginBottom: 80, textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--glass)",
            border: "1px solid var(--gb)",
            borderRadius: 50,
            padding: "8px 20px",
            fontSize: "0.76rem",
            color: "var(--mint)",
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: "0.04em",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mint)", display: "inline-block" }} />
          Release History
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Changelog
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Track our continuous improvements and new features. We release updates regularly to keep Aria at the forefront of AI support technology.
        </p>
      </div>

      {/* Changelog Timeline */}
      <div style={{ position: "relative", paddingLeft: 40 }}>
        {/* Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(180deg, var(--coral), var(--amber), var(--mint))",
            opacity: 0.3,
          }}
        />

        {/* Timeline Items */}
        {changelogEntries.map((entry, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 48,
              position: "relative",
            }}
          >
            {/* Timeline Dot */}
            <div
              style={{
                position: "absolute",
                left: -48,
                top: 8,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--coral), var(--amber))",
                border: "3px solid var(--ink)",
                boxShadow: "0 0 16px rgba(255,107,107,0.4)",
              }}
            />

            {/* Version Header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  {entry.version}
                </h2>
                {entry.tag && (
                  <span
                    style={{
                      background:
                        entry.tag === "Latest"
                          ? "rgba(78,205,196,0.2)"
                          : entry.tag === "Major Release"
                          ? "rgba(255,107,107,0.2)"
                          : "rgba(255,255,255,0.1)",
                      color:
                        entry.tag === "Latest"
                          ? "var(--mint)"
                          : entry.tag === "Major Release"
                          ? "var(--coral)"
                          : "rgba(255,255,255,0.7)",
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      border:
                        entry.tag === "Latest"
                          ? "1px solid rgba(78,205,196,0.4)"
                          : entry.tag === "Major Release"
                          ? "1px solid rgba(255,107,107,0.4)"
                          : "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {entry.tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                Released {entry.date}
              </p>
            </div>

            {/* Changes Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {entry.changes.map((change, changeIdx) => (
                <div
                  key={changeIdx}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: 16,
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(135deg, rgba(78,205,196,0.08), rgba(255,107,107,0.04))";
                    el.style.borderColor = "rgba(78,205,196,0.3)";
                    el.style.transform = "translateX(8px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.transform = "translateX(0)";
                  }}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span
                      style={{
                        color: getTypeColor(change.type),
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        paddingTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      {getTypeLabel(change.type)}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          margin: "0 0 6px 0",
                          color: "#fff",
                        }}
                      >
                        {change.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.55)",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {change.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div
        style={{
          marginTop: 80,
          background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.05))",
          border: "1px solid rgba(78,205,196,0.3)",
          borderRadius: 20,
          padding: "40px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          New features are coming soon
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 24,
          }}
        >
          We&apos;re constantly innovating to make Aria even more powerful. Check back regularly for updates.
        </p>
        <a
          href="mailto:updates@aria.ai?subject=Subscribe to updates"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, var(--coral), var(--amber))",
            border: "none",
            color: "#000",
            padding: "12px 28px",
            borderRadius: 10,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 10px 30px rgba(255,107,107,0.3)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-4px)";
            el.style.boxShadow = "0 15px 40px rgba(255,107,107,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 10px 30px rgba(255,107,107,0.3)";
          }}
        >
          Subscribe to Updates
        </a>
      </div>
    </div>
  );
}
