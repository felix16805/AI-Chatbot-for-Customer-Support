"use client";

import React from "react";
import Link from "next/link";

export default function ProductOverview() {
  return (
    <div style={{ width: "100%" }}>
      {/* Hero Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 56px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 80, maxWidth: 900 }}>
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
            The Future of Customer Support
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: 28,
            }}
          >
            Meet <span className="grad-text">Aria</span> — AI Support That Actually Works
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.85,
              maxWidth: 700,
            }}
          >
            Resolve 80%+ of customer issues instantly. 24/7 support that learns, improves, and scales with your business—without adding headcount.
          </p>
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
            marginBottom: 100,
          }}
        >
          {[
            { stat: "80%+", label: "Issues Resolved Instantly", highlight: "var(--mint)" },
            { stat: "<800ms", label: "Average Response Time", highlight: "var(--coral)" },
            { stat: "24/7", label: "Always Available", highlight: "var(--amber)" },
            { stat: "40+", label: "Integrations Ready", highlight: "var(--violet)" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 28,
                backdropFilter: "blur(10px)",
                textAlign: "center",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))";
                el.style.borderColor = item.highlight;
                el.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  fontFamily: "'Syne', sans-serif",
                  background: `linear-gradient(135deg, ${item.highlight}, rgba(255,255,255,0.3))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 8,
                }}
              >
                {item.stat}
              </div>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 56px",
          marginBottom: 80,
        }}
      >
        <div style={{ marginBottom: 60, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "2rem",
              fontWeight: 900,
              marginBottom: 16,
            }}
          >
            Works for Any Industry
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
            From e-commerce to SaaS, Aria adapts to your business needs
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {[
            {
              icon: "🛍️",
              title: "E-Commerce",
              benefits: ["Order tracking", "Returns & refunds", "Product recommendations"],
              color: "var(--coral)",
            },
            {
              icon: "💳",
              title: "SaaS & Tech",
              benefits: ["Technical support", "Account issues", "Billing help"],
              color: "var(--mint)",
            },
            {
              icon: "🏥",
              title: "Healthcare",
              benefits: ["Appointment booking", "Insurance info", "Basic health Q&A"],
              color: "var(--amber)",
            },
            {
              icon: "🏦",
              title: "Financial Services",
              benefits: ["Account inquiries", "Transaction help", "Fraud prevention"],
              color: "var(--violet)",
            },
          ].map((useCase, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 36,
                backdropFilter: "blur(10px)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))`;
                el.style.borderColor = useCase.color;
                el.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>{useCase.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.3rem", fontWeight: 800, marginBottom: 20, color: useCase.color }}>
                {useCase.title}
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: useCase.color, fontWeight: 700 }}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 56px",
          marginBottom: 80,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.05))",
            border: "1px solid rgba(78,205,196,0.3)",
            borderRadius: 24,
            padding: "60px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  marginBottom: 24,
                  lineHeight: 1.2,
                }}
              >
                Save Money, Improve Satisfaction
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", marginBottom: 32, lineHeight: 1.8 }}>
                Companies using Aria report average cost savings of 60% on support operations and 40% faster resolution times.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Reduce support team costs by training AI instead of hiring agents",
                  "Eliminate peak-hour wait times forever",
                  "Increase customer satisfaction with instant responses",
                  "Gain actionable insights from conversation data",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--mint)", fontWeight: 900, fontSize: "1.2rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { label: "60%", desc: "Cost Reduction", color: "var(--coral)" },
                { label: "40%", desc: "Faster Resolution", color: "var(--mint)" },
                { label: "35%", desc: "More Capacity", color: "var(--amber)" },
                { label: "92%", desc: "CSAT Increase", color: "var(--violet)" },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(26,26,46,0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 20,
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      fontFamily: "'Syne', sans-serif",
                      background: `linear-gradient(135deg, ${metric.color}, rgba(255,255,255,0.2))`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: 4,
                    }}
                  >
                    {metric.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{metric.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px 100px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "2rem",
            fontWeight: 900,
            marginBottom: 16,
          }}
        >
          Ready to Transform Your Support?
        </h2>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          Start free for 14 days. See the Aria difference firsthand. No credit card required.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/chat">
            <button
              style={{
                background: "linear-gradient(135deg, var(--coral), var(--amber))",
                border: "none",
                borderRadius: 12,
                padding: "16px 36px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#000",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 12px 32px rgba(255,107,107,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(255,107,107,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(255,107,107,0.3)";
              }}
            >
              Try Live Demo →
            </button>
          </Link>
          <Link href="/features">
            <button
              style={{
                background: "transparent",
                border: "1.5px solid var(--gb)",
                borderRadius: 12,
                padding: "15px 36px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(78,205,196,0.1)";
                el.style.borderColor = "var(--mint)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.borderColor = "var(--gb)";
                el.style.transform = "translateY(0)";
              }}
            >
              Explore Features
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
