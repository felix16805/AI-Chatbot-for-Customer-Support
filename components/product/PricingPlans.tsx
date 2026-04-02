"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 49,
      yearlyPrice: 499,
      features: [
        "Up to 1,000 conversations/month",
        "Basic NLP capabilities",
        "Email & chat support",
        "Single integration",
        "Community support",
        "15-day message history",
      ],
      cta: "Get Started",
      highlighted: false,
      accentColor: "rgba(78,205,196,0.6)",
    },
    {
      name: "Professional",
      description: "For growing businesses with support needs",
      monthlyPrice: 99,
      yearlyPrice: 999,
      features: [
        "Up to 10,000 conversations/month",
        "Advanced NLP with learning",
        "Multi-channel support",
        "Up to 5 integrations",
        "Priority email support",
        "90-day message history",
        "Custom response templates",
        "Team collaboration tools",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      accentColor: "rgba(78,205,196,1)",
    },
    {
      name: "Enterprise",
      description: "For large-scale operations",
      monthlyPrice: null,
      yearlyPrice: null,
      price: "Custom",
      features: [
        "Unlimited conversations",
        "Custom ML models",
        "All channels + voice",
        "Unlimited integrations",
        "24/7 dedicated support",
        "Unlimited history",
        "Advanced analytics & reporting",
        "SSO & advanced security",
        "SLA guarantee",
        "Custom deployment options",
      ],
      cta: "Contact Sales",
      highlighted: false,
      accentColor: "rgba(255,107,107,0.6)",
    },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      position: "relative", 
      overflow: "hidden", 
      background: "radial-gradient(ellipse at top, #0f1419 0%, #0B0D17 50%, #08090e 100%)",
    }}>
      {/* Animated grid background */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(78,205,196,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(78,205,196,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.3,
      }} />

      {/* Top right glow */}
      <div style={{
        position: "fixed",
        top: -200,
        right: -200,
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(78,205,196,0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(100px)",
      }} />

      {/* Bottom left glow */}
      <div style={{
        position: "fixed",
        bottom: -200,
        left: -200,
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(100px)",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 40px 80px 40px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(78,205,196,0.1)",
              border: "1px solid rgba(78,205,196,0.4)",
              borderRadius: 50,
              padding: "8px 20px",
              fontSize: "0.75rem",
              color: "var(--mint)",
              fontWeight: 600,
              marginBottom: 24,
              letterSpacing: "0.08em",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(78,205,196,0.2)",
            }}
          >
            <span style={{ 
              width: 6, 
              height: 6, 
              borderRadius: "50%", 
              background: "var(--mint)", 
              display: "inline-block",
              boxShadow: "0 0 10px rgba(78,205,196,0.8)",
            }} />
            DYNAMIC PRICING
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 20,
              background: "linear-gradient(135deg, #4ECDC4 0%, #FFB347 50%, #FF6B6B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            Plans for Every Scale
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 650,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Enterprise-grade AI support infrastructure. No setup fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(11,13,23,0.6)",
              border: "1px solid rgba(78,205,196,0.3)",
              borderRadius: 16,
              padding: 4,
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(78,205,196,0.15)",
            }}
          >
            {(["monthly", "annual"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                style={{
                  flex: 1,
                  padding: "10px 28px",
                  border: "none",
                  background: billingCycle === cycle 
                    ? "rgba(78,205,196,0.25)"
                    : "transparent",
                  color: billingCycle === cycle ? "#fff" : "rgba(255,255,255,0.5)",
                  fontWeight: billingCycle === cycle ? 700 : 600,
                  fontSize: "0.9rem",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: billingCycle === cycle 
                    ? "0 0 15px rgba(78,205,196,0.3)" 
                    : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (billingCycle !== cycle) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(255,255,255,0.7)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (billingCycle !== cycle) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(255,255,255,0.5)";
                  }
                }}
              >
                {cycle === "monthly" ? "Monthly" : "Annual"}
                {cycle === "annual" && (
                  <span style={{ 
                    fontSize: "0.65rem", 
                    color: "var(--ink)", 
                    fontWeight: 900,
                    background: "var(--mint)",
                    padding: "4px 12px",
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                  }}>SAVE 17%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 80,
          }}
        >
          {plans.map((plan, idx) => (
            <div
              key={idx}
              style={{
                background: plan.highlighted
                  ? "rgba(78,205,196,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlighted 
                  ? "1px solid rgba(78,205,196,0.5)" 
                  : "1px solid rgba(78,205,196,0.2)",
                borderRadius: 20,
                padding: 32,
                backdropFilter: "blur(20px)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                boxShadow: plan.highlighted 
                  ? "0 0 30px rgba(78,205,196,0.2)" 
                  : "0 0 15px rgba(78,205,196,0.08)",
                transform: plan.highlighted ? "scale(1.02)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(78,205,196,0.6)";
                el.style.transform = plan.highlighted ? "scale(1.03)" : "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = plan.highlighted ? "rgba(78,205,196,0.5)" : "rgba(78,205,196,0.2)";
                el.style.transform = plan.highlighted ? "scale(1.02)" : "scale(1)";
              }}
            >
              {/* Badge for popular */}
              {plan.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #FFB347, #FF6B6B)",
                    color: "#000",
                    padding: "6px 16px",
                    borderRadius: 20,
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: "0 4px 15px rgba(255,107,107,0.4)",
                    textTransform: "uppercase",
                    zIndex: 10,
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan Title */}
              <h3 style={{ 
                fontFamily: "'Syne', sans-serif", 
                fontSize: "1.5rem", 
                fontWeight: 800, 
                marginBottom: 8, 
                color: plan.highlighted ? "var(--mint)" : "#fff",
              }}>
                {plan.name}
              </h3>
              <p style={{ 
                fontSize: "0.9rem", 
                color: "rgba(255,255,255,0.6)", 
                marginBottom: 24, 
                lineHeight: 1.6,
              }}>
                {plan.description}
              </p>

              {/* Pricing */}
              <div style={{ 
                marginBottom: 24, 
                paddingBottom: 24, 
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}>
                {plan.price ? (
                  <div style={{ 
                    fontSize: "2rem", 
                    fontWeight: 900, 
                    fontFamily: "'Syne', sans-serif", 
                    color: "var(--coral)",
                  }}>
                    {plan.price}
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "'Syne', sans-serif" }}>
                      <span style={{ color: plan.highlighted ? "var(--mint)" : "#fff" }}>
                        ${billingCycle === "monthly" ? plan.monthlyPrice : Math.floor(plan.yearlyPrice! / 12)}
                      </span>
                      <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginLeft: 4 }}>/mo</span>
                    </div>
                    {billingCycle === "annual" && (
                      <p style={{ fontSize: "0.8rem", color: "var(--mint)", marginTop: 6, fontWeight: 600 }}>
                        Billed ${plan.yearlyPrice} annually
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* CTA Button */}
              <Link href={plan.name === "Enterprise" ? "#contact" : "/chat"} style={{ marginBottom: 24, textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "12px 24px",
                    background: plan.highlighted
                      ? "linear-gradient(135deg, #FFB347, #FF6B6B)"
                      : "rgba(78,205,196,0.2)",
                    border: plan.highlighted ? "none" : "1px solid rgba(78,205,196,0.4)",
                    borderRadius: 12,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: plan.highlighted ? "#000" : "#fff",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: plan.highlighted ? "0 4px 15px rgba(255,107,107,0.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.highlighted) {
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = "0 6px 20px rgba(255,107,107,0.4)";
                    } else {
                      el.style.background = "rgba(78,205,196,0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.highlighted) {
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 4px 15px rgba(255,107,107,0.3)";
                    } else {
                      el.style.background = "rgba(78,205,196,0.2)";
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </Link>

              {/* Features List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map((feature, featureIdx) => (
                  <div key={featureIdx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{
                      color: "var(--mint)",
                      fontWeight: 700,
                      marginTop: 2,
                      flexShrink: 0,
                      fontSize: "1rem",
                    }}>
                      ✓
                    </span>
                    <span style={{ 
                      fontSize: "0.9rem", 
                      color: "rgba(255,255,255,0.75)", 
                      lineHeight: 1.5,
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: 800, margin: "0 auto", marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 800,
                marginBottom: 12,
                background: "linear-gradient(135deg, #4ECDC4, #FFB347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Common Questions
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>
              Everything you need to know about our pricing
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                q: "Can I upgrade or downgrade my plan anytime?",
                a: "Yes! Change your plan at any time. We'll prorate charges for upgrades and apply credits for downgrades.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees. Start for free with a 14-day trial, then choose a plan.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, Amex), plus wire transfers for Enterprise.",
              },
              {
                q: "Do you offer volume discounts?",
                a: "Yes, for Enterprise plans. Contact our sales team to discuss your specific needs.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(78,205,196,0.05)",
                  border: "1px solid rgba(78,205,196,0.25)",
                  borderRadius: 16,
                  padding: 24,
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(78,205,196,0.08)";
                  el.style.borderColor = "rgba(78,205,196,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(78,205,196,0.05)";
                  el.style.borderColor = "rgba(78,205,196,0.25)";
                }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: 10,
                    fontFamily: "'Syne', sans-serif",
                    color: "var(--mint)",
                  }}
                >
                  {faq.q}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          style={{
            padding: "50px 40px",
            background: "rgba(78,205,196,0.08)",
            border: "1px solid rgba(78,205,196,0.4)",
            borderRadius: 24,
            backdropFilter: "blur(20px)",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(78,205,196,0.15)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
              fontWeight: 800,
              marginBottom: 12,
              background: "linear-gradient(135deg, #4ECDC4, #FFB347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ready to Scale?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", marginBottom: 32, lineHeight: 1.6 }}>
            Join thousands of companies transforming support with Aria&apos;s enterprise AI.
          </p>
          <button
            style={{
              background: "linear-gradient(135deg, #FFB347, #FF6B6B)",
              border: "none",
              borderRadius: 12,
              padding: "14px 36px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#000",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,107,107,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-4px)";
              el.style.boxShadow = "0 6px 25px rgba(255,107,107,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 20px rgba(255,107,107,0.3)";
            }}
          >
            Start Free Trial
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridSlide {
          0% { transform: translateY(0); }
          100% { transform: translateY(80px); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-30px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}