"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowRight, Zap, Shield, Brain } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  intent?: string;
}

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: "assistant", 
      content: "👋 Hi! I'm Aria, an AI customer support assistant. Try me out by asking about orders, billing, technical issues, or anything else. Sign up for unlimited conversations and full features!" 
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
    
    // Check if user has reached 2 message limit (counting only user messages)
    const userMessageCount = messages.filter(m => m.role === "user").length;
    if (userMessageCount >= 2) {
      return; // Don't send if limit reached
    }

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
    <div style={{ display: "flex", height: "calc(100vh - 80px)", background: "#0B0D17", position: "relative", overflow: "hidden", marginTop: "80px" }}>
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
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, rgba(11,13,23,0.8), rgba(11,13,23,0.4))",
          backdropFilter: "blur(12px)",
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
                <h2 style={{ color: "white", fontSize: "1.15rem", fontWeight: 700, margin: 0, fontFamily: "'Syne', sans-serif" }}>Aria Demo</h2>
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
          {!user && (
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.25s",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(255,107,107,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(255,107,107,0.5)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(255,107,107,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}>
                Unlock Full Access
                <ArrowRight size={16} />
              </button>
            </Link>
          )}
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
          minHeight: 0,
        }}>
          {messages.length === 1 && !loading && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              flexDirection: "column",
              gap: 16,
              pointerEvents: "none",
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,179,71,0.05))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,107,107,0.2)",
                position: "relative",
              }}>
                <Bot size={40} color="#FF6B6B" />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "20px",
                  border: "2px solid rgba(255,107,107,0.1)",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", fontWeight: 500 }}>Start by asking Aria anything</p>
                <p style={{ margin: "8px 0 0 0", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Orders • Billing • Technical Support</p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", animation: "fadeIn 0.3s ease-out" }}>
              <div style={{ maxWidth: "65%", display: "flex", gap: 14, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
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
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 6, paddingLeft: 4 }}>
                      Intent: {msg.intent}
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

          {messages.filter(m => m.role === "user").length >= 2 && !loading && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              maxWidth: "500px",
              pointerEvents: "auto",
            }}>
              <div style={{
                padding: "32px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,179,71,0.05))",
                border: "1.5px solid rgba(255,107,107,0.3)",
                textAlign: "center",
                backdropFilter: "blur(10px)",
              }}>
                <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 12px 0" }}>Demo Limit Reached</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", margin: "0 0 20px 0", lineHeight: 1.6 }}>{"You've reached your 2-message demo limit. Sign up for unlimited conversations with Aria!"}</p>
                <Link href="/signup" style={{ textDecoration: "none" }}>
                  <button style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    transition: "all 0.25s",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(255,107,107,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(255,107,107,0.5)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(255,107,107,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}>
                    Unlock Full Access
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{
          padding: "24px 32px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(135deg, rgba(11,13,23,0.8), rgba(11,13,23,0.4))",
          backdropFilter: "blur(12px)",
          position: "relative",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about orders, billing, or support..."
              disabled={messages.filter(m => m.role === "user").length >= 2}
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
                opacity: messages.filter(m => m.role === "user").length >= 2 ? 0.5 : 1,
                cursor: messages.filter(m => m.role === "user").length >= 2 ? "not-allowed" : "text",
              }}
              onFocus={(e) => {
                if (messages.filter(m => m.role === "user").length < 2) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,107,107,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,107,107,0.15)";
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || messages.filter(m => m.role === "user").length >= 2}
              style={{
                background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "12px",
                cursor: loading || !input.trim() || messages.filter(m => m.role === "user").length >= 2 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.25s",
                opacity: loading || !input.trim() || messages.filter(m => m.role === "user").length >= 2 ? 0.6 : 1,
                boxShadow: loading || !input.trim() ? "none" : "0 8px 24px rgba(255,107,107,0.3)",
              }}
              onMouseEnter={(e) => !loading && input.trim() && ((e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(255,107,107,0.4)")}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(255,107,107,0.3)"}
            >
              <Send size={18} />
            </button>
          </div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} />
            Try asking: &quot;Where is my order?&quot; or &quot;How do I reset my password?&quot;
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideGrid {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
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
