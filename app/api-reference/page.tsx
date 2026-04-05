"use client";

import { Code2, Settings, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ApiReferencePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/chat",
      description: "Send a message to chatbot",
      request: `curl -X POST https://api.aria.dev/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, how can I help?",
    "conversation_id": "conv_123",
    "meta": {"user_id": "user_456"}
  }'`,
      response: `{
  "id": "msg_789",
  "message": "Hello! I'm here to help...",
  "conversation_id": "conv_123",
  "timestamp": "2026-04-05T14:32:00Z",
  "confidence": 0.95
}`,
    },
    {
      method: "GET",
      path: "/api/conversations/:id",
      description: "Get conversation history",
      request: `curl -X GET https://api.aria.dev/v1/conversations/conv_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "id": "conv_123",
  "messages": [
    {"role": "user", "content": "Hi"},
    {"role": "assistant", "content": "Hello!"}
  ],
  "created_at": "2026-04-05T10:00:00Z",
  "updated_at": "2026-04-05T14:32:00Z"
}`,
    },
    {
      method: "POST",
      path: "/api/analytics/events",
      description: "Track custom events",
      request: `curl -X POST https://api.aria.dev/v1/analytics/events \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "user_satisfaction",
    "value": 5,
    "conversation_id": "conv_123"
  }'`,
      response: `{
  "event_id": "evt_123",
  "status": "recorded",
  "timestamp": "2026-04-05T14:32:00Z"
}`,
    },
    {
      method: "GET",
      path: "/api/models",
      description: "List available AI models",
      request: `curl -X GET https://api.aria.dev/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "models": [
    {
      "id": "gpt-4-turbo",
      "name": "GPT-4 Turbo",
      "type": "chat",
      "max_tokens": 4096,
      "available": true
    },
    {
      "id": "claude-3-opus",
      "name": "Claude 3 Opus",
      "type": "chat",
      "max_tokens": 8192,
      "available": true
    }
  ]
}`,
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
        opacity: 0.1,
      }}></div>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px 120px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
          fontWeight: 800,
          color: "white",
          marginBottom: 24,
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #2DD4BF 0%, #06B6D4 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          API Reference
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
          Complete guide to Aria&apos;s RESTful API
        </p>
      </section>

      {/* Base URL & Auth */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Base URL & Authentication</h2>
          <div style={{ display: "grid", gap: 20 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <Code2 size={24} color="#2DD4BF" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white" }}>Base URL</h3>
              </div>
              <pre style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(45,212,191,0.2)",
                borderRadius: 8,
                padding: 16,
                overflow: "auto",
                color: "#06B6D4",
                fontSize: "0.9rem",
              }}>
https://api.aria.dev/v1
              </pre>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <Settings size={24} color="#2DD4BF" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white" }}>Authentication</h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Include your API key in the Authorization header:</p>
              <pre style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(45,212,191,0.2)",
                borderRadius: 8,
                padding: 16,
                overflow: "auto",
                color: "#06B6D4",
                fontSize: "0.9rem",
              }}>
Authorization: Bearer YOUR_API_KEY_HERE
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Endpoints</h2>
          <div style={{ display: "grid", gap: 32 }}>
            {endpoints.map((endpoint, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 28, overflow: "hidden" }}>
                {/* Method & Path */}
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <span style={{
                    background: endpoint.method === "POST" ? "rgba(255,107,107,0.2)" : "rgba(45,212,191,0.2)",
                    color: endpoint.method === "POST" ? "#FF6B6B" : "#2DD4BF",
                    padding: "6px 12px",
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    minWidth: 50,
                  }}>
                    {endpoint.method}
                  </span>
                  <code style={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>{endpoint.path}</code>
                </div>

                {/* Description */}
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>{endpoint.description}</p>

                {/* Request */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Request Example</h4>
                    <button
                      onClick={() => copyToClipboard(`request-${idx}`, endpoint.request)}
                      style={{
                        background: "rgba(45,212,191,0.2)",
                        border: "none",
                        color: "#2DD4BF",
                        padding: "4px 8px",
                        borderRadius: 4,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {copiedId === `request-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === `request-${idx}` ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(45,212,191,0.2)",
                    borderRadius: 8,
                    padding: 16,
                    overflow: "auto",
                    color: "#06B6D4",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}>
                    {endpoint.request}
                  </pre>
                </div>

                {/* Response */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Response Example</h4>
                    <button
                      onClick={() => copyToClipboard(`response-${idx}`, endpoint.response)}
                      style={{
                        background: "rgba(45,212,191,0.2)",
                        border: "none",
                        color: "#2DD4BF",
                        padding: "4px 8px",
                        borderRadius: 4,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {copiedId === `response-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === `response-${idx}` ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(45,212,191,0.2)",
                    borderRadius: 8,
                    padding: 16,
                    overflow: "auto",
                    color: "#06B6D4",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}>
                    {endpoint.response}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Need Help?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            Check our documentation or contact our developer support team.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
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
              Documentation
            </button>
            <button style={{
              background: "rgba(255,255,255,0.05)",
              color: "white",
              padding: "12px 32px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}>
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
