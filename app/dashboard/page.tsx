"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { MessageSquare, BarChart3, Clock, Shield } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0D17", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", animation: "spin 1s linear infinite", marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, border: "4px solid rgba(255,107,107,0.2)", borderTop: "4px solid #FF6B6B", borderRadius: "50%" }}></div>
          </div>
          <p style={{ color: "white" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: MessageSquare, label: "Active Chats", value: "12" },
    { icon: BarChart3, label: "Resolution Rate", value: "94%" },
    { icon: Clock, label: "Avg Response", value: "2.3s" },
    { icon: Shield, label: "Customer Score", value: "4.8/5" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>
            Welcome back, <span style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB347)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>{user?.name}</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Your AI customer support dashboard</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28, marginBottom: 56 }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  transition: "all 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(255,107,107,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 12 }}>{stat.label}</p>
                    <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "white", fontFamily: "'Syne', sans-serif" }}>{stat.value}</p>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,179,71,0.2))", padding: 12, borderRadius: 12 }}>
                    <Icon style={{ color: "#FF6B6B" }} size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main CTA */}
        <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,179,71,0.05))", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 24, padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(78,205,196,0.05), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Start Supporting Your Customers</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
              Ready to enhance your customer support with AI? Start a live chat session with Aria and experience seamless customer interactions.
            </p>
            <Link
              href="/chat"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
                color: "white",
                padding: "16px 32px",
                borderRadius: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s",
                cursor: "pointer",
                border: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,107,107,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Launch Chat Interface →
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
          {[
            {
              title: "Intelligent Responses",
              description: "AI-powered responses that understand customer intent and resolve issues faster",
            },
            {
              title: "Real-time Analytics",
              description: "Monitor performance and customer satisfaction metrics in real-time",
            },
            {
              title: "Seamless Integration",
              description: "Integrates with your existing customer support tools effortlessly",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "32px 28px",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <h3 style={{ color: "white", fontWeight: 700, marginBottom: 12, fontSize: "1.05rem", fontFamily: "'Syne', sans-serif" }}>{feature.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.6 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
