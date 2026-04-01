"use client";

import React from "react";

const steps = [
  {
    num: "01",
    icon: "🧠",
    title: "Understand Intent",
    desc: "Aria's NLP engine analyses every message, classifying intent and extracting entities with high accuracy — even from casual or typo-filled language.",
    color: "rgba(255,107,107,0.15)",
  },
  {
    num: "02",
    icon: "⚡",
    title: "Respond Instantly",
    desc: "Matched against a curated knowledge base, Aria fires back the right answer in under a second — order status, FAQs, policies, and more.",
    color: "rgba(78,205,196,0.15)",
  },
  {
    num: "03",
    icon: "🔀",
    title: "Escalate Smartly",
    desc: "When Aria detects frustration or complexity it hands off to a human agent with full context — no repeating, no friction, no dropped threads.",
    color: "rgba(132,94,194,0.15)",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 56px" }}>
      <div style={{ fontSize: "0.76rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        How It Works
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, maxWidth: 520 }}>
        Three steps to effortless support
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 480, marginBottom: 56 }}>
        Aria understands, responds, and escalates — all without your team lifting a finger.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
        {steps.map((step) => (
          <div
            key={step.num}
            style={{
              background: "var(--glass)",
              border: "1px solid var(--gb)",
              borderRadius: 22,
              padding: "32px 28px",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(12px)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 56px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "3.5rem", fontWeight: 800, opacity: 0.07, position: "absolute", top: 12, right: 20, lineHeight: 1 }}>
              {step.num}
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: 20, background: step.color }}>
              {step.icon}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: 10 }}>{step.title}</div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}