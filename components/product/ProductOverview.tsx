"use client";

import React from "react";
import Link from "next/link";

export default function ProductOverview() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 56px 80px" }}>
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
          Intelligent Support Cloud
        </div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 900,
            margin: "0 auto 24px",
          }}
        >
          Meet <span className="grad-text">Aria</span> — Your AI Support Partner
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          A powerhouse AI chatbot designed to handle customer support 24/7. Resolves complex queries, manages orders, escalates intelligently, and learns with every interaction.
        </p>
      </div>

      {/* Hero Product Visual */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        {/* Left - Features List */}
        <div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.85rem",
              fontWeight: 800,
              marginBottom: 40,
              lineHeight: 1.2,
            }}
          >
            Built for Modern Support Teams
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { title: "Instant Resolution", desc: "Handle 80%+ of queries without human intervention using advanced NLP" },
              { title: "24/7 Availability", desc: "Never miss a customer. Support across all time zones, every day" },
              { title: "Seamless Integration", desc: "Works with your existing tools — helpdesk, CRM, payment systems" },
              { title: "Escalation Flow", desc: "Complex issues automatically route to the right agent team" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: 16 }}>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--coral), var(--amber))",
                    marginTop: 8,
                    flexShrink: 0,
                    boxShadow: "0 0 10px rgba(255,107,107,0.5)",
                  }}
                />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "1rem" }}>{item.title}</h4>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Visual Card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 480,
          }}
        >
          {/* Glowing Background Orb */}
          <div
            style={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(78,205,196,0.15), transparent 70%)",
              filter: "blur(60px)",
              animation: "orbFloat 8s ease-in-out infinite",
            }}
          />

          {/* Card */}
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(78,205,196,0.3)",
              borderRadius: 20,
              padding: 40,
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
              maxWidth: 340,
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--coral), var(--amber))",
                  animation: "pulse 2s ease-in-out infinite",
                  boxShadow: "0 0 20px var(--coral)",
                }}
              />
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--mint)", letterSpacing: "0.08em" }}>LIVE AI</span>
            </div>

            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Always Learning</h3>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24 }}>
              Each interaction trains Aria to be smarter. Your support system improves automatically.
            </p>

            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 40,
                  background: "rgba(78,205,196,0.1)",
                  border: "1px solid rgba(78,205,196,0.3)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  color: "var(--mint)",
                  fontWeight: 600,
                }}
              >
                ✓ Connected
              </div>
              <div
                style={{
                  flex: 1,
                  height: 40,
                  background: "rgba(255,107,107,0.1)",
                  border: "1px solid rgba(255,107,107,0.3)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  color: "var(--coral)",
                  fontWeight: 600,
                }}
              >
                ⚡ Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Capabilities Grid */}
      <div style={{ marginBottom: 100 }}>
        <div style={{ marginBottom: 50 }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Core Capabilities
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: 600 }}>
            Everything needed for world-class customer support operations
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: "💬",
              title: "Multi-Channel Conversations",
              desc: "Support customers across chat, email, social media, and voice from a unified interface",
            },
            {
              icon: "🔍",
              title: "Intelligent Search",
              desc: "Find solutions instantly with semantic understanding of customer intents",
            },
            {
              icon: "🧠",
              title: "Contextual Awareness",
              desc: "Understands full customer history, preferences, and issue context",
            },
            {
              icon: "📊",
              title: "Real-Time Analytics",
              desc: "Track satisfaction scores, response times, and resolution metrics live",
            },
            {
              icon: "🔗",
              title: "API Integrations",
              desc: "Connect with Shopify, Salesforce, Zendesk, Stripe, and 1000+ apps",
            },
            {
              icon: "🛡️",
              title: "Enterprise Security",
              desc: "SOC 2 compliant with end-to-end encryption and data residency options",
            },
          ].map((capability, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid var(--gb)",
                borderRadius: 16,
                padding: 32,
                backdropFilter: "blur(10px)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.05))";
                el.style.borderColor = "rgba(78,205,196,0.5)";
                el.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))";
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{capability.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
                {capability.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{capability.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.05))",
          border: "1px solid rgba(78,205,196,0.3)",
          borderRadius: 20,
          padding: "60px 56px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Ready to Transform Your Support?
        </h2>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 32,
            maxWidth: 600,
            margin: "0 auto 32px",
          }}
        >
          Try Aria free for 14 days. No credit card needed. See why thousands of teams trust Aria for support.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/chat">
            <button
              style={{
                background: "linear-gradient(135deg, var(--coral), var(--amber))",
                border: "none",
                borderRadius: 12,
                padding: "14px 32px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#000",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 10px 30px rgba(255,107,107,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 15px 40px rgba(255,107,107,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(255,107,107,0.3)";
              }}
            >
              Try Live Demo
            </button>
          </Link>
          <Link href="/pricing">
            <button
              style={{
                background: "transparent",
                border: "1.5px solid var(--gb)",
                borderRadius: 12,
                padding: "13px 32px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.08)";
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
              View Pricing
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
