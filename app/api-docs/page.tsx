"use client";

import { Zap, Lock, Database } from "lucide-react";
import Link from "next/link";

export default function ApiDocsPage() {
  const endpoints = [
    { method: "POST", path: "/api/chat", description: "Send a message and get AI response" },
    { method: "GET", path: "/api/chat-sessions", description: "Retrieve all chat sessions for user" },
    { method: "GET", path: "/api/chat-sessions/:id", description: "Get a specific chat session with messages" },
    { method: "DELETE", path: "/api/chat-sessions/:id", description: "Delete a chat session" },
    { method: "POST", path: "/api/auth/signup", description: "Create a new user account" },
    { method: "POST", path: "/api/auth/login", description: "Login and receive JWT token" },
  ];

  const features = [
    { icon: Zap, title: "Lightning-Fast", description: "Sub-30ms response times with streaming support" },
    { icon: Lock, title: "Secure", description: "JWT authentication and end-to-end encryption" },
    { icon: Database, title: "Scalable", description: "Handle unlimited requests with auto-scaling" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ position: "fixed", top: 0, right: 0, width: "600px", height: "600px", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1, filter: "blur(120px)" }}></div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 50, padding: "8px 16px", marginBottom: 24, fontSize: "0.85rem", color: "#22C55E", fontWeight: 600 }}>
            💻 API Documentation
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>
            Powerful REST API
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
            Integrate Aria AI into your application with our comprehensive REST API. Full documentation and code examples included.
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "60px 56px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, textAlign: "center" }}>
                  <Icon size={40} color="#22C55E" style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{feature.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section style={{ padding: "80px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Authentication</h2>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32 }}>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, lineHeight: 1.8 }}>
              All API requests require authentication using a JWT token. Include your token in the Authorization header:
            </p>
            <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: "0.9rem", color: "#22C55E", overflow: "auto" }}>
              Authorization: Bearer YOUR_JWT_TOKEN
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Get your token by logging in via the /api/auth/login endpoint.</p>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section style={{ padding: "80px 56px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Endpoints</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {endpoints.map((endpoint, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ background: endpoint.method === "POST" ? "rgba(34,197,94,0.2)" : "rgba(59,130,246,0.2)", color: endpoint.method === "POST" ? "#22C55E" : "#3B82F6", padding: "4px 12px", borderRadius: 6, fontWeight: 700, fontSize: "0.85rem", minWidth: "50px", textAlign: "center" }}>
                    {endpoint.method}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "monospace", color: "white", fontSize: "0.95rem", marginBottom: 4 }}>{endpoint.path}</p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{endpoint.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section style={{ padding: "80px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Example Usage</h2>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32, fontFamily: "monospace", fontSize: "0.85rem", color: "#A3E635", overflow: "auto" }}>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
{`const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'How can I track my order?'
  })
});

const data = await response.json();
console.log(data.response);`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 56px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 30, padding: "60px 40px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Ready to Build?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24, lineHeight: 1.8 }}>Start integrating the Aria AI API into your application today.</p>
          <Link href="/signup" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "white", padding: "14px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 600, display: "inline-block", transition: "all 0.25s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
