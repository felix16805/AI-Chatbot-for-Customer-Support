"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      question: "What is Aria AI?",
      answer: "Aria AI is an intelligent customer support chatbot powered by advanced machine learning and natural language processing. It handles customer inquiries, provides instant support, and seamlessly escalates complex issues to human agents.",
    },
    {
      id: 1,
      question: "How does the AI understand my customers' questions?",
      answer: "Aria uses state-of-the-art NLP models to understand context, intent, and sentiment in customer messages. It's trained on thousands of customer support conversations and continuously learns from new interactions.",
    },
    {
      id: 2,
      question: "Can Aria handle multiple languages?",
      answer: "Yes! Aria supports 50+ languages with automatic language detection. Our translation system ensures your customers can communicate in their preferred language.",
    },
    {
      id: 3,
      question: "What if the AI can't answer a question?",
      answer: "Aria intelligently identifies when a question requires human intervention. When necessary, it seamlessly escalates the conversation to your support team while providing complete context.",
    },
    {
      id: 4,
      question: "How do I integrate Aria with my existing systems?",
      answer: "We provide comprehensive REST APIs, webhooks, and pre-built integrations with popular platforms like Shopify, Zendesk, and Slack. Our documentation includes code examples and SDKs.",
    },
    {
      id: 5,
      question: "Is my customer data secure?",
      answer: "Yes, we take security seriously. Aria uses bank-level encryption, is GDPR compliant, and holds SOC 2 Type II certification. All customer data is isolated and never used for training other customers' models.",
    },
    {
      id: 6,
      question: "What analytics does Aria provide?",
      answer: "Our analytics dashboard shows customer satisfaction scores, resolution rates, response times, common questions, and detailed conversation transcripts. You can export reports and create custom dashboards.",
    },
    {
      id: 7,
      question: "How much does Aria cost?",
      answer: "We offer three plans: Starter (free), Professional ($29.99/month), and Enterprise (custom pricing). Each plan includes different message limits and feature sets. See our pricing page for details.",
    },
    {
      id: 8,
      question: "Do I need to provide customer data for training?",
      answer: "No, Aria comes pre-trained and ready to use out of the box. You can optionally fine-tune it with your support conversations for better accuracy without sharing data.",
    },
    {
      id: 9,
      question: "What's your uptime guarantee?",
      answer: "Aria guarantees 99.9% uptime. We have multiple data centers and automatic failover systems to ensure your customer support never goes down.",
    },
  ];

  const categories = ["General", "Integration", "Security", "Pricing", "Technical"];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ position: "fixed", top: 0, right: 0, width: "600px", height: "600px", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1, filter: "blur(120px)" }}></div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)", borderRadius: 50, padding: "8px 16px", marginBottom: 24, fontSize: "0.85rem", color: "#EC4899", fontWeight: 600 }}>
            ❓ Frequently Asked Questions
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>
            Got a Question?
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
            Find answers to commonly asked questions about Aria AI and our services.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "40px 56px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.8)",
                padding: "8px 20px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(236,72,153,0.3)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(236,72,153,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: "60px 56px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  background: expandedId === faq.id ? "rgba(236,72,153,0.05)" : "rgba(255,255,255,0.02)",
                  border: expandedId === faq.id ? "1px solid rgba(236,72,153,0.2)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "all 0.25s",
                }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", margin: 0, flex: 1 }}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    color={expandedId === faq.id ? "#EC4899" : "rgba(255,255,255,0.5)"}
                    style={{
                      transform: expandedId === faq.id ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.25s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {expandedId === faq.id && (
                  <div style={{ padding: "0 24px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section style={{ padding: "80px 56px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0.05) 100%)", border: "1px solid rgba(236,72,153,0.2)", borderRadius: 30, padding: "60px 40px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Still Have Questions?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24, lineHeight: 1.8 }}>
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a href="/contact" style={{ background: "linear-gradient(135deg, #EC4899, #DB2777)", color: "white", padding: "14px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 600, display: "inline-block", transition: "all 0.25s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
