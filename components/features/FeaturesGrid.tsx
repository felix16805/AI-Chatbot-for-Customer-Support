const features = [
  {
    icon: "🧠",
    title: "Natural Language Understanding",
    desc: "Classifies intent, extracts entities, and handles typos, slang, and multi-language input with high accuracy.",
    tags: ["Intent Classification", "Entity Extraction", "Multi-language"],
    accent: "linear-gradient(90deg, var(--coral), var(--amber))",
    iconBg: "rgba(255,107,107,0.15)",
  },
  {
    icon: "⚡",
    title: "Sub-second Responses",
    desc: "Vector-indexed knowledge retrieval returns answers in under 800ms — orders of magnitude faster than human agents.",
    tags: ["Vector Search", "RAG", "Real-time"],
    accent: "linear-gradient(90deg, var(--mint), #00b4d8)",
    iconBg: "rgba(78,205,196,0.15)",
  },
  {
    icon: "🔀",
    title: "Smart Escalation",
    desc: "Detects frustration signals and escalates with full conversation context — customers never have to repeat themselves.",
    tags: ["Sentiment Analysis", "Handoff", "Context Preservation"],
    accent: "linear-gradient(90deg, var(--violet), var(--coral))",
    iconBg: "rgba(132,94,194,0.15)",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Track resolution rates, sentiment trends, peak hours, and agent handoffs across every channel in real-time.",
    tags: ["Real-time", "Custom Reports", "Alerts"],
    accent: "linear-gradient(90deg, var(--amber), var(--mint))",
    iconBg: "rgba(255,179,71,0.15)",
  },
  {
    icon: "🔗",
    title: "Deep Integrations",
    desc: "Connect with Zendesk, Freshdesk, Shopify, WooCommerce, Salesforce, and 40+ platforms via native connectors.",
    tags: ["Zendesk", "Shopify", "Salesforce"],
    accent: "linear-gradient(90deg, var(--coral), var(--violet))",
    iconBg: "rgba(255,107,107,0.15)",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "SOC2 Type II, GDPR-compliant, end-to-end encrypted conversations with role-based access and audit logs.",
    tags: ["SOC2", "GDPR", "E2E Encryption"],
    accent: "linear-gradient(90deg, var(--mint), var(--amber))",
    iconBg: "rgba(78,205,196,0.15)",
  },
];

export default function FeaturesGrid() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 56px 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {features.map((f, i) => (
        <div
          key={f.title}
          style={{
            background: "var(--glass)",
            border: "1px solid var(--gb)",
            borderRadius: 22,
            padding: "30px 28px",
            backdropFilter: "blur(12px)",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(-7px)";
            el.style.boxShadow = "0 24px 56px rgba(0,0,0,0.35)";
            (el.querySelector(".accent-bar") as HTMLElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
            (el.querySelector(".accent-bar") as HTMLElement).style.opacity = "0";
          }}
        >
          <div
            className="accent-bar"
            style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: f.accent,
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
          <div style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: 18, background: f.iconBg }}>
            {f.icon}
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.02rem", marginBottom: 8 }}>{f.title}</div>
          <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{f.desc}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {f.tags.map((tag) => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid var(--gb)", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", padding: "3px 10px", borderRadius: 20 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}