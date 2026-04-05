"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    { id: 1, title: "Getting Started with AI Customer Support", category: "Tutorial", date: "2025-04-01", author: "Sarah Chen", excerpt: "Learn how to implement Aria AI in your customer support workflow in just 5 minutes.", image: "🤖" },
    { id: 2, title: "5 Ways AI Chatbots Reduce Support Costs", category: "Business", date: "2025-03-28", author: "Marcus Lee", excerpt: "Discover how intelligent automation can cut support expenses by up to 60%.", image: "💰" },
    { id: 3, title: "Advanced NLP Techniques for Better Understanding", category: "Technical", date: "2025-03-25", author: "Emily Rodriguez", excerpt: "Deep dive into the natural language processing algorithms powering modern chatbots.", image: "🧠" },
    { id: 4, title: "Customer Success Story: E-Commerce Integration", category: "Case Study", date: "2025-03-20", author: "Alex Johnson", excerpt: "How TechStore increased customer satisfaction by 40% with Aria AI.", image: "⭐" },
    { id: 5, title: "Security Best Practices for AI Deployments", category: "Security", date: "2025-03-15", author: "Sarah Chen", excerpt: "Ensure your AI systems meet enterprise security standards and compliance requirements.", image: "🔐" },
    { id: 6, title: "Measuring AI Chatbot Performance Metrics", category: "Analytics", date: "2025-03-10", author: "Marcus Lee", excerpt: "Comprehensive guide to tracking and optimizing your chatbot's performance KPIs.", image: "📊" },
  ];

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["All", "Tutorial", "Business", "Technical", "Case Study", "Security", "Analytics"];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ position: "fixed", top: 0, left: 0, width: "600px", height: "600px", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1, filter: "blur(120px)" }}></div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 50, padding: "8px 16px", marginBottom: 24, fontSize: "0.85rem", color: "#A855F7", fontWeight: 600 }}>
            📚 Blog & Resources
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>
            Insights & Best Practices
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
            Learn from our experts about AI, customer support, and building better customer experiences.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section style={{ padding: "40px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "14px 20px",
              color: "white",
              fontSize: "1rem",
              marginBottom: 24,
              outline: "none",
              transition: "all 0.25s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(168,85,247,0.3)";
              (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.05)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.03)";
            }}
          />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchTerm(cat === "All" ? "" : cat)}
                style={{
                  background: (searchTerm === "" && cat === "All") || searchTerm === cat ? "linear-gradient(135deg, #A855F7, #EC4899)" : "rgba(255,255,255,0.05)",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: (searchTerm === "" && cat === "All") || searchTerm === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  if (((searchTerm === "" && cat === "All") || searchTerm === cat)) return;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(168,85,247,0.3)";
                }}
                onMouseLeave={(e) => {
                  if (((searchTerm === "" && cat === "All") || searchTerm === cat)) return;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: "40px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(168,85,247,0.3)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "3rem", padding: "24px", background: "rgba(168,85,247,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {article.image}
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "white", background: "rgba(168,85,247,0.2)", padding: "4px 12px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {article.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif", lineHeight: 1.4 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16, lineHeight: 1.6, fontSize: "0.9rem" }}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: 16 }}>
                    <Calendar size={14} />
                    <span>{article.date}</span>
                    <span>•</span>
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#A855F7", fontWeight: 600, fontSize: "0.9rem" }}>
                    Read More
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>No articles found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
