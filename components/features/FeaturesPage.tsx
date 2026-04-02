import FeaturesGrid from "@/components/features/FeaturesGrid";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Header Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 56px 40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--glass)",
            border: "1px solid var(--gb)",
            borderRadius: 50,
            padding: "8px 20px",
            fontSize: "0.76rem",
            color: "var(--mint)",
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: "0.04em",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mint)", display: "inline-block" }} />
          Advanced Capabilities
        </div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Powerful Features Built for <span className="grad-text">Scale</span>
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            maxWidth: 700,
          }}
        >
          Every feature is engineered for reliability, performance, and enterprise-grade security. See what makes Aria the choice of leading support teams.
        </p>
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Feature Highlight Sections */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px", marginBottom: 60 }}>
        <div style={{ marginBottom: 80, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "2rem",
              fontWeight: 900,
              marginBottom: 16,
            }}
          >
            Why Choose Aria
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
            Technical excellence combined with practical business outcomes
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Blazing Speed",
              desc: "Sub-800ms response times powered by vector search and advanced indexing",
              highlight: "var(--mint)",
            },
            {
              icon: "🧠",
              title: "Intelligent Learning",
              desc: "Continuous improvement from every interaction—gets smarter over time",
              highlight: "var(--coral)",
            },
            {
              icon: "🔗",
              title: "Universal Integrations",
              desc: "Connect to 40+ platforms including Zendesk, Shopify, Salesforce, and more",
              highlight: "var(--amber)",
            },
            {
              icon: "📊",
              title: "Rich Analytics",
              desc: "Real-time dashboards with custom reports, sentiment tracking, and insights",
              highlight: "var(--violet)",
            },
            {
              icon: "🛡️",
              title: "Enterprise Security",
              desc: "SOC 2 Type II, GDPR compliant, E2E encryption, audit logs, and more",
              highlight: "var(--coral)",
            },
            {
              icon: "🌍",
              title: "Global Scale",
              desc: "Multi-language support, 25+ languages, 99.9% uptime SLA",
              highlight: "var(--mint)",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                padding: 32,
                backdropFilter: "blur(10px)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))";
                el.style.borderColor = item.highlight;
                el.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.15rem", fontWeight: 800, marginBottom: 12, color: item.highlight }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px", marginBottom: 80 }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.05))",
            border: "1px solid rgba(78,205,196,0.3)",
            borderRadius: 24,
            padding: "60px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  marginBottom: 24,
                  lineHeight: 1.2,
                }}
              >
                Built for Performance
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", marginBottom: 32, lineHeight: 1.8 }}>
                Traditional support systems require hours to respond. Aria responds in milliseconds—every single time. Powered by advanced NLP and vector search technology that delivers accuracy at scale.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Sub-800ms average response time",
                  "99.9% system uptime guarantee",
                  "Vector-indexed knowledge base",
                  "Handles 10,000+ concurrent conversations",
                  "Auto-scaling infrastructure",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--mint)", fontWeight: 900, fontSize: "1.2rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { metric: "800ms", label: "Response Time", color: "var(--mint)", icon: "⚡" },
                { metric: "99.9%", label: "Uptime SLA", color: "var(--coral)", icon: "🛡️" },
                { metric: "40+", label: "Integrations", color: "var(--amber)", icon: "🔗" },
                { metric: "25+", label: "Languages", color: "var(--violet)", icon: "🌍" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(26,26,46,0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14,
                    padding: 24,
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = stat.color;
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{stat.icon}</div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      fontFamily: "'Syne', sans-serif",
                      background: `linear-gradient(135deg, ${stat.color}, rgba(255,255,255,0.2))`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: 4,
                    }}
                  >
                    {stat.metric}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 56px 100px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "2rem",
            fontWeight: 900,
            marginBottom: 16,
          }}
        >
          Experience the Power
        </h2>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          Try Aria free for 14 days and see these features in action. No credit card required.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/chat">
            <button
              style={{
                background: "linear-gradient(135deg, var(--coral), var(--amber))",
                border: "none",
                borderRadius: 12,
                padding: "16px 36px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#000",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 12px 32px rgba(255,107,107,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(255,107,107,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(255,107,107,0.3)";
              }}
            >
              Try Live Demo →
            </button>
          </Link>
          <Link href="/product">
            <button
              style={{
                background: "transparent",
                border: "1.5px solid var(--gb)",
                borderRadius: 12,
                padding: "15px 36px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(78,205,196,0.1)";
                el.style.borderColor = "var(--mint)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.borderColor = "var(--gb)";
                el.style.transform = "translateY(0)";
              }}
            >
              View Product
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
