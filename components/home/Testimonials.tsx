"use client";

import React from "react";

const testimonials = [
  {
    text: "Aria handles 80% of our tickets automatically. Our agents finally focus on meaningful work instead of answering \"Where's my order?\" all day.",
    name: "Sneha Prasad",
    role: "Head of CX, Zepto",
    initials: "SP",
    gradient: "linear-gradient(135deg, var(--coral), var(--amber))",
  },
  {
    text: "Setup took two hours. Within a week our CSAT score jumped 18 points. I didn't think an AI chatbot could be this context-aware.",
    name: "Rahul Kumar",
    role: "Product Manager, CRED",
    initials: "RK",
    gradient: "linear-gradient(135deg, var(--mint), #00b4d8)",
  },
  {
    text: "The smart escalation alone saved us. Aria catches frustrated customers before they churn and routes them to the right agent instantly.",
    name: "Aisha Mehta",
    role: "Support Lead, Razorpay",
    initials: "AM",
    gradient: "linear-gradient(135deg, var(--violet), var(--coral))",
  },
];

export default function Testimonials() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 56px" }}>
      <div style={{ fontSize: "0.76rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        What People Say
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
        Teams love Aria
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 480, marginBottom: 56 }}>
        Real results from real support teams who switched to AI-first.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{
              background: "var(--glass)",
              border: "1px solid var(--gb)",
              borderRadius: 22,
              padding: "28px",
              backdropFilter: "blur(12px)",
              transition: "transform 0.3s",
            }}
          >
            <div style={{ color: "var(--amber)", fontSize: "0.9rem", marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 20 }}>
              {t.text}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700 }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.38)" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}