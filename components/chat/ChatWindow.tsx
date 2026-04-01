"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Zap, Brain, Shield } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  intent?: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "Hi! I'm Aria, your AI customer support assistant. I can help you with orders, tracking, billing, technical issues, and more. What can I help you with today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current!.scrollTop = messagesContainerRef.current!.scrollHeight;
      }, 0);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: data.message,
        intent: data.intent
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "row", background: "#0B0D17", borderLeft: "1.5px solid rgba(255,107,107,0.1)", borderRight: "1.5px solid rgba(255,107,107,0.1)", position: "relative", overflow: "hidden" }}>
      {/* Sci-Fi Background Elements */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {/* Animated Grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(90deg, rgba(255,107,107,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(45,212,191,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "slideGrid 20s linear infinite",
        }} />
        
        {/* Glowing Orbs */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 10s ease-in-out infinite 1s",
        }} />
        <div style={{
          position: "absolute",
          top: "50%",
          right: "20%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 12s ease-in-out infinite 2s",
        }} />

        {/* Animated Lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
          <line x1="0%" y1="20%" x2="100%" y2="25%" stroke="rgba(45,212,191,0.1)" strokeWidth="2" opacity="0.5" />
          <line x1="0%" y1="60%" x2="100%" y2="65%" stroke="rgba(255,107,107,0.1)" strokeWidth="2" opacity="0.5" />
        </svg>
      </div>

      {/* Left Sidebar */}
      <div style={{
        width: "280px",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(180deg, rgba(11,13,23,0.6), rgba(11,13,23,0.3))",
        backdropFilter: "blur(20px)",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        position: "relative",
        zIndex: 5,
      }}>
        {/* AI Status */}
        <div style={{
          padding: "16px",
          borderRadius: "14px",
          background: "rgba(45,212,191,0.05)",
          border: "1px solid rgba(45,212,191,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#2DD4BF",
              boxShadow: "0 0 12px rgba(45,212,191,0.6)",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ color: "#2DD4BF", fontSize: "0.85rem", fontWeight: 600 }}>AI Status</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Response Time</span>
              <span style={{ fontSize: "0.75rem", color: "#2DD4BF", fontWeight: 600 }}>0.2s</span>
            </div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "95%", background: "linear-gradient(90deg, #2DD4BF, #FF6B6B)", animation: "pulse 1s ease-in-out infinite" }} />
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Capabilities</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: Zap, label: "Quick Responses", color: "#FFB347" },
              { icon: Brain, label: "Smart Context", color: "#2DD4BF" },
              { icon: Shield, label: "24/7 Support", color: "#FF6B6B" },
            ].map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
                >
                  <Icon size={16} color={cap.color} />
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>{cap.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Performance</span>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FF6B6B" }}>98%</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Accuracy</div>
            </div>
            <div style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2DD4BF" }}>24/7</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 5 }}>

      {/* Header */}
      <div style={{
        padding: "24px 32px",
        borderBottom: "1.5px solid rgba(255,107,107,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, rgba(11,13,23,0.8), rgba(11,13,23,0.4))",
        backdropFilter: "blur(15px)",
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(255,107,107,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            position: "relative",
          }}>
            <Bot size={28} color="white" />
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
              pointerEvents: "none",
            }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ color: "white", fontSize: "1.15rem", fontWeight: 700, margin: 0, fontFamily: "'Syne', sans-serif" }}>Aria Support</h2>
              <span style={{
                background: "linear-gradient(135deg, rgba(45,212,191,0.2), rgba(45,212,191,0.1))",
                border: "1px solid rgba(45,212,191,0.3)",
                color: "#2DD4BF",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}>ACTIVE</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#2DD4BF",
                boxShadow: "0 0 10px rgba(45,212,191,0.8)",
                animation: "pulse 2s infinite",
              }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Ready to assist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div ref={messagesContainerRef} style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
        zIndex: 5,
        minHeight: 0,
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ maxWidth: "70%", display: "flex", gap: 14, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))"
                  : "linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,179,71,0.1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: msg.role === "user" ? "1.5px solid rgba(255,255,255,0.15)" : "1.5px solid rgba(255,107,107,0.2)",
              }}>
                {msg.role === "user" ? <User size={18} color="white" /> : <Bot size={18} color="#FF6B6B" />}
              </div>
              <div>
                <div style={{
                  padding: msg.role === "user" ? "12px 18px" : "14px 20px",
                  borderRadius: "16px",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: msg.role === "user" ? "white" : "rgba(255,255,255,0.85)",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #FF6B6B, #FFB347)"
                    : "rgba(255,255,255,0.06)",
                  border: msg.role === "user" ? "1px solid rgba(255,255,255,0.1)" : "1.5px solid rgba(255,255,255,0.12)",
                  borderTopLeftRadius: msg.role === "assistant" ? 4 : 16,
                  borderTopRightRadius: msg.role === "user" ? 4 : 16,
                  backdropFilter: "blur(10px)",
                  boxShadow: msg.role === "user" ? "0 8px 24px rgba(255,107,107,0.2)" : "0 4px 16px rgba(0,0,0,0.2)",
                }}>
                  {msg.content}
                </div>
                {msg.intent && (
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 8, paddingLeft: 4 }}>
                    <span style={{ color: "#2DD4BF" }}>Intent:</span> {msg.intent}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,179,71,0.1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "1.5px solid rgba(255,107,107,0.2)",
              }}>
                <Bot size={18} color="#FF6B6B" />
              </div>
              <div style={{
                padding: "14px 20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderTopLeftRadius: 4,
                display: "flex",
                gap: 8,
                alignItems: "center",
                backdropFilter: "blur(10px)",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B6B", animation: "bounce 1.4s infinite" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFB347", animation: "bounce 1.4s infinite 0.2s" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2DD4BF", animation: "bounce 1.4s infinite 0.4s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        padding: "24px 32px",
        borderTop: "1.5px solid rgba(255,107,107,0.1)",
        background: "linear-gradient(135deg, rgba(11,13,23,0.8), rgba(11,13,23,0.4))",
        backdropFilter: "blur(15px)",
        position: "relative",
        flexShrink: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about orders, billing, or support..."
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "white",
              padding: "14px 18px",
              borderRadius: "12px",
              fontSize: "0.95rem",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              transition: "all 0.25s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,107,107,0.4)";
              e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,107,107,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "12px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "all 0.25s",
              opacity: loading || !input.trim() ? 0.6 : 1,
              boxShadow: loading || !input.trim() ? "0 4px 12px rgba(255,107,107,0.2)" : "0 8px 24px rgba(255,107,107,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => !loading && input.trim() && ((e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(255,107,107,0.5)")}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(255,107,107,0.3)"}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      </div>

      <style>{`
        @keyframes slideGrid {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
