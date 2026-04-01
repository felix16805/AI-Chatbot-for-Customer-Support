"use client";

import React from "react";

const metrics = [
  { value: "98%", label: "Query Resolution Rate" },
  { value: "<1s", label: "Average Response Time" },
  { value: "60%", label: "Fewer Support Tickets" },
  { value: "24/7", label: "Always-On Coverage" },
];

export default function MetricsBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(132,94,194,0.15), rgba(255,107,107,0.1))",
        border: "1px solid var(--gb)",
        borderRadius: 28,
        padding: "56px",
        margin: "0 56px",
        backdropFilter: "blur(12px)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(78,205,196,0.12), transparent 70%)", right: -100, top: -100, pointerEvents: "none" }} />
      {metrics.map((m) => (
        <div key={m.value} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, var(--coral), var(--amber))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 6,
            }}
          >
            {m.value}
          </div>
          <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}