"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const chatLabel = isAuthenticated ? "Live Chat" : "Live Demo";
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 56px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
      }}
    >
      {/* Left */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--glass)",
            border: "1px solid var(--gb)",
            borderRadius: 50,
            padding: "6px 16px",
            fontSize: "0.76rem",
            color: "var(--mint)",
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: "0.04em",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mint)", display: "inline-block" }} />
          Powered by Advanced NLP
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
            fontWeight: 800,
            lineHeight: 1.04,
            marginBottom: 22,
          }}
        >
          AI Support That{" "}
          <span className="grad-text">Actually Resolves</span>
        </h1>

        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 40, maxWidth: 460 }}>
          Aria handles tickets, tracks orders, and escalates to humans seamlessly — cutting resolution time from hours to under a second.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
          <Link href="/chat">
            <button
              style={{
                padding: "15px 36px",
                fontSize: "1rem",
                borderRadius: 50,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: "linear-gradient(135deg, var(--coral), var(--amber))",
                color: "#fff",
                transition: "all 0.25s",
              }}
            >
              Launch {chatLabel} →
            </button>
          </Link>
          <Link href="/features">
            <button
              style={{
                padding: "15px 36px",
                fontSize: "1rem",
                borderRadius: 50,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                background: "var(--glass)",
                border: "1px solid var(--gb)",
                color: "#fff",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
              }}
            >
              Explore Features
            </button>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex" }}>
            {["SP", "RK", "AM", "JD"].map((init, i) => (
              <span
                key={init}
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: `linear-gradient(135deg, var(--coral), var(--violet))`,
                  border: "2px solid var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  marginLeft: i === 0 ? 0 : -10,
                  zIndex: 4 - i,
                  position: "relative",
                }}
              >
                {init}
              </span>
            ))}
          </div>
          <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
            <strong style={{ color: "#fff" }}>2,400+</strong> teams trust Aria for customer support
          </div>
        </div>
      </div>

      {/* Right — floating cards */}
      <HeroVisual />
    </section>
  );
}

function HeroVisual() {
  return (
    <div style={{ position: "relative", height: 480 }}>
      {/* Main chat card */}
      <div
        style={{
          position: "absolute",
          width: 320,
          top: 40,
          right: 0,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid var(--gb)",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          padding: "20px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          animation: "float 4s ease-in-out infinite alternate",
        }}
      >
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Live Conversation</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { text: "Hi! How can I help you today? 👋", bot: true },
            { text: "Track my order please", bot: false },
            { text: "Order #2847 is out for delivery — arrives by 3 PM 📦", bot: true },
          ].map((msg, i) => (
            <div
              key={i}
              style={{
                padding: "9px 13px",
                borderRadius: 14,
                fontSize: "0.8rem",
                lineHeight: 1.4,
                maxWidth: "85%",
                background: msg.bot ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, var(--coral), var(--amber))",
                alignSelf: msg.bot ? "flex-start" : "flex-end",
                borderBottomLeftRadius: msg.bot ? 3 : 14,
                borderBottomRightRadius: msg.bot ? 14 : 3,
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Resolution rate card */}
      <div
        style={{
          position: "absolute",
          width: 160,
          bottom: 80,
          left: 0,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid var(--gb)",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          padding: "20px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          animation: "float 5s ease-in-out infinite alternate",
          animationDelay: "0.5s",
        }}
      >
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Resolution Rate</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800 }}>98.2%</div>
        <div style={{ display: "inline-block", fontSize: "0.7rem", padding: "3px 10px", borderRadius: 20, fontWeight: 600, marginTop: 6, background: "rgba(78,205,196,0.15)", color: "var(--mint)" }}>↑ 4.1% this week</div>
      </div>

      {/* Avg response card */}
      <div
        style={{
          position: "absolute",
          width: 180,
          top: 10,
          left: 30,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid var(--gb)",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          padding: "20px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          animation: "float 3.5s ease-in-out infinite alternate",
          animationDelay: "1s",
        }}
      >
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Avg Response</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800 }}>0.8s</div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", marginTop: 10 }}>
          {[20, 28, 16, 32, 24, 18, 36].map((h, i) => (
            <div key={i} style={{ width: 14, height: h, background: i % 2 === 0 ? "rgba(255,255,255,0.15)" : "linear-gradient(to top, var(--coral), var(--amber))", borderRadius: 3 }} />
          ))}
        </div>
      </div>

      {/* Notification card */}
      <div
        style={{
          position: "absolute",
          width: 220,
          bottom: 20,
          right: 20,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid var(--gb)",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          padding: "20px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          animation: "float 4.5s ease-in-out infinite alternate",
          animationDelay: "0.3s",
        }}
      >
        <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>🔥</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.88rem", fontWeight: 700 }}>Query resolved!</div>
        <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Refund processed automatically in 2 steps</div>
        <div style={{ display: "inline-block", fontSize: "0.7rem", padding: "3px 10px", borderRadius: 20, fontWeight: 600, marginTop: 8, background: "rgba(255,107,107,0.15)", color: "var(--coral)" }}>Auto-resolved</div>
      </div>
    </div>
  );
}