"use client";

import { ArrowRight, CheckCircle, Zap, Users, BarChart3, Lock, Smartphone } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const mainFeatures = [
    { icon: Zap, title: "Lightning-Fast Responses", description: "AI-powered responses that resolve 94% of queries instantly, with average response time under 2.3 seconds.", benefits: ["Sub-second latency", "Real-time processing", "99.9% uptime"], },
    { icon: Users, title: "Human Touch When Needed", description: "Seamlessly escalate complex issues to human agents. AI identifies when human intervention is needed.", benefits: ["Smart escalation", "Context preservation", "Warm handoff"], },
    { icon: BarChart3, title: "Advanced Analytics", description: "Deep insights into customer satisfaction, resolution rates, response times, and support trends.", benefits: ["Real-time dashboards", "Custom reports", "Predictive insights"], },
    { icon: Users, title: "Multi-Channel Support", description: "Support customers across chat, email, phone, and social media from a single platform.", benefits: ["Unified inbox", "Channel switching", "Consistent data"], },
    { icon: Lock, title: "Enterprise Security", description: "Bank-level encryption, GDPR compliance, and SOC 2 Type II certification.", benefits: ["End-to-end encryption", "Data isolation", "Audit logs"], },
    { icon: Smartphone, title: "Mobile Optimized", description: "Native iOS and Android apps for managing support on the go.", benefits: ["Push notifications", "Offline mode", "Cross-platform sync"], },
  ];

  const capabilities = ["Intent Recognition", "Sentiment Analysis", "Language Detection", "Auto-Translation", "Document Summarization", "Knowledge Base Search", "Context Awareness", "Customer History", "Proactive Support", "Ticket Routing"];

  const stats = [
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Resolution Rate", value: "94%" },
    { label: "Average Response", value: "2.3s" },
    { label: "Active Deployments", value: "5,000+" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", position: "relative" }}>
      <div style={{ position: "fixed", top: 0, right: 0, width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1, filter: "blur(120px)" }}></div>
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "600px", height: "600px", background: "radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1, filter: "blur(120px)" }}></div>

      <section style={{ position: "relative", zIndex: 10, paddingTop: 100, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 50, padding: "8px 16px", marginBottom: 24, fontSize: "0.85rem", color: "#2DD4BF", fontWeight: 600, letterSpacing: "0.05em" }}>
            🚀 Powerful AI Features
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 800, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif", lineHeight: 1.15 }}>
            Everything Your Support Team Needs to Succeed
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", maxWidth: 700, margin: "0 auto", lineHeight: 1.8 }}>
            Advanced AI capabilities combined with powerful tools to deliver exceptional customer support at scale
          </p>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "40px 56px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 28px", textAlign: "center", transition: "all 0.25s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
              <p style={{ fontSize: "2.4rem", fontWeight: 800, background: "linear-gradient(135deg, #FF6B6B, #FFB347)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{stat.value}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "80px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Core Features</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>Everything you need to deliver world-class customer support</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
            {mainFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 32px", transition: "all 0.25s", cursor: "default" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(255,107,107,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                  <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,179,71,0.2))", padding: 16, borderRadius: 14, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon style={{ color: "#FF6B6B" }} size={28} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>{feature.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", marginBottom: 24, lineHeight: 1.7 }}>{feature.description}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "rgba(255,255,255,0.65)" }}>
                        <CheckCircle size={16} style={{ color: "#FF6B6B", flexShrink: 0 }} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "80px 56px", background: "linear-gradient(135deg, rgba(255,107,107,0.03), rgba(255,179,71,0.02))" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>AI Capabilities</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>Machine learning models trained on millions of support conversations</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
            {capabilities.map((capability) => (
              <div key={capability} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 16px", textAlign: "center", transition: "all 0.25s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,107,0.3)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <p style={{ color: "white", fontWeight: 600, fontSize: "0.95rem" }}>{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "80px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Integrations</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>Connect with your favorite tools</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20 }}>
            {["Slack", "Zendesk", "HubSpot", "Salesforce", "Discord", "Teams"].map((integration) => (
              <div key={integration} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", transition: "all 0.25s", fontWeight: 600, color: "rgba(255,255,255,0.7)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLDivElement).style.color = "white"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.7)"; }}>
                {integration}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "80px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,179,71,0.08))", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 24, padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(78,205,196,0.05), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "white", marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>Ready to Transform Your Support?</h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", marginBottom: 40, lineHeight: 1.8 }}>Join thousands of companies delivering exceptional customer experiences with Aria</p>
            <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #FF6B6B, #FFB347)", color: "white", padding: "14px 32px", borderRadius: 14, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, textDecoration: "none", transition: "all 0.25s", cursor: "pointer", border: "none" }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,107,107,0.3)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link href="/chat" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "14px 32px", borderRadius: 14, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, textDecoration: "none", transition: "all 0.25s", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}>
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
