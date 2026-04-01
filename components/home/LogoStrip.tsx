"use client";

import React from "react";

const logos = ["Zepto", "Razorpay", "Swiggy", "Meesho", "CRED", "Groww", "Flipkart", "PhonePe"];

export default function LogoStrip() {
  const doubled = [...logos, ...logos];

  return (
    <div
      style={{
        borderTop: "1px solid var(--gb)",
        borderBottom: "1px solid var(--gb)",
        padding: "28px 56px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        overflow: "hidden",
      }}
    >
      <span style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", fontWeight: 500, marginRight: 8 }}>
        Trusted by teams at
      </span>
      <div className="animate-logos" style={{ display: "flex", gap: 48, alignItems: "center" }}>
        {doubled.map((name, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}