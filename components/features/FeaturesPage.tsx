import FeaturesGrid from "@/components/features/FeaturesGrid";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 56px 40px" }}>
        <div style={{ fontSize: "0.76rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
          Capabilities
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
          Everything you need for modern support
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 600 }}>
          Aria combines advanced NLP, real-time analytics, and seamless integrations to transform how your team handles customer support.
        </p>
      </section>
      <FeaturesGrid />
    </div>
  );
}
