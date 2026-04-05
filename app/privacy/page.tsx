"use client";

import { Shield, Eye, Lock, BarChart3, Delete, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content:
        "We collect information you provide directly, such as when you create an account, use our services, or contact us. This includes your name, email address, profile information, and any content you submit. We also automatically collect certain information about your device and how you interact with our services.",
    },
    {
      icon: Lock,
      title: "How We Use Your Data",
      content:
        "We use your information to provide, improve, and protect our services. This includes personalizing your experience, communicating with you about service updates, conducting research and analytics, and complying with legal obligations. We never sell your personal data to third parties.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Tracking",
      content:
        "We use analytics tools to understand how users interact with our platform. This helps us improve features, identify issues, and optimize performance. We use cookies and similar tracking technologies, which you can control through your browser settings.",
    },
    {
      icon: Shield,
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your data, including encryption, secure data storage, and regular security audits. However, no data transmission over the internet is completely secure. We encourage you to use strong passwords and protect your account.",
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information at any time. You can control your privacy settings, opt out of communications, and request a copy of your data. To exercise these rights, please contact our privacy team.",
    },
    {
      icon: Delete,
      title: "Data Retention",
      content:
        "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time. Some information may be retained in aggregated form for analytics.",
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
          Last updated: April 5, 2026
        </p>
      </section>

      {/* Intro */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 28 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontSize: "0.95rem" }}>
            At Aria, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our services. By accessing or using Aria, you acknowledge that you have read and understood this Privacy Policy.
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
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{section.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Questions About Our Privacy Policy?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            If you have any questions about our privacy practices, please contact us at{" "}
            <span style={{ color: "#2DD4BF", fontWeight: 600 }}>privacy@aria.dev</span>
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
            Contact Privacy Team
          </button>
        </div>
      </section>
    </div>
  );
}
