"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 99,
      yearlyPrice: 990,
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
    },
    {
      name: "Professional",
      description: "For growing businesses with support needs",
      monthlyPrice: 299,
      yearlyPrice: 2990,
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
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 56px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 80 }}>
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
          Simple & Transparent Pricing
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Plans for every stage
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.8,
          }}
        >
          Start free, scale as you grow. No setup fees. Cancel anytime. All plans include a 14-day free trial.
        </p>

        {/* Billing Toggle */}
        <div
          style={{
            display: "inline-flex",
            background: "var(--glass)",
            border: "1px solid var(--gb)",
            borderRadius: 12,
            padding: 4,
            backdropFilter: "blur(8px)",
          }}
        >
          {(["monthly", "annual"] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              style={{
                flex: 1,
                padding: "10px 24px",
                border: "none",
                background: billingCycle === cycle ? "rgba(78,205,196,0.15)" : "transparent",
                color: billingCycle === cycle ? "var(--mint)" : "rgba(255,255,255,0.6)",
                fontWeight: billingCycle === cycle ? 700 : 500,
                fontSize: "0.95rem",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {cycle === "monthly" ? "Monthly" : "Annual"}
              {cycle === "annual" && (
                <span style={{ fontSize: "0.8rem", color: "var(--coral)", marginLeft: 8 }}>Save 17%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 28,
          marginBottom: 100,
        }}
      >
        {plans.map((plan, idx) => (
          <div
            key={idx}
            style={{
              background: plan.highlighted
                ? "linear-gradient(135deg, rgba(78,205,196,0.15), rgba(255,107,107,0.08))"
                : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: plan.highlighted ? "1px solid rgba(78,205,196,0.5)" : "1px solid var(--gb)",
              borderRadius: 20,
              padding: 40,
              backdropFilter: "blur(10px)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: plan.highlighted ? "0 20px 60px rgba(78,205,196,0.15)" : "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              if (!plan.highlighted) {
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))";
                el.style.borderColor = "rgba(78,205,196,0.4)";
              }
              el.style.transform = "translateY(-8px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              if (!plan.highlighted) {
                el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))";
                el.style.borderColor = "var(--gb)";
              }
              el.style.transform = "translateY(0)";
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
                  background: "linear-gradient(135deg, var(--coral), var(--amber))",
                  color: "#000",
                  padding: "6px 16px",
                  borderRadius: 20,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                MOST POPULAR
              </div>
            )}

            {/* Plan Title */}
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
              {plan.name}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
              {plan.description}
            </p>

            {/* Pricing */}
            <div style={{ marginBottom: 32 }}>
              {plan.price ? (
                <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "'Syne', sans-serif" }}>
                  {plan.price}
                </div>
              ) : (
                <>
                  <div style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "'Syne', sans-serif" }}>
                    ${billingCycle === "monthly" ? plan.monthlyPrice : Math.floor(plan.yearlyPrice! / 12)}{" "}
                    <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>/mo</span>
                  </div>
                  {billingCycle === "annual" && (
                    <p style={{ fontSize: "0.85rem", color: "var(--mint)", marginTop: 8 }}>
                      Billed ${plan.yearlyPrice} annually
                    </p>
                  )}
                </>
              )}
            </div>

            {/* CTA Button */}
            <Link href={plan.name === "Enterprise" ? "#contact" : "/chat"} style={{ marginBottom: 32, textDecoration: "none" }}>
              <button
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: plan.highlighted
                    ? "linear-gradient(135deg, var(--coral), var(--amber))"
                    : "transparent",
                  border: plan.highlighted ? "none" : "1.5px solid var(--gb)",
                  borderRadius: 12,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: plan.highlighted ? "#000" : "#fff",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: plan.highlighted ? "0 10px 30px rgba(255,107,107,0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.highlighted) {
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 15px 40px rgba(255,107,107,0.4)";
                  } else {
                    el.style.background = "rgba(255,255,255,0.08)";
                    el.style.borderColor = "var(--mint)";
                    el.style.transform = "translateY(-4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.highlighted) {
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 10px 30px rgba(255,107,107,0.3)";
                  } else {
                    el.style.background = "transparent";
                    el.style.borderColor = "var(--gb)";
                    el.style.transform = "translateY(0)";
                  }
                }}
              >
                {plan.cta}
              </button>
            </Link>

            {/* Features List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, flexGrow: 1 }}>
              {plan.features.map((feature, featureIdx) => (
                <div key={featureIdx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      color: "var(--mint)",
                      fontWeight: 700,
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "2rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              q: "Can I upgrade or downgrade my plan anytime?",
              a: "Yes! Change your plan at any time. We'll prorate charges for upgrades and apply credits for downgrades.",
            },
            {
              q: "Is there a setup fee?",
              a: "No setup fees. Start for free with a 14-day trial, then choose a plan. You control when to upgrade.",
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
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid var(--gb)",
                borderRadius: 12,
                padding: 24,
                backdropFilter: "blur(8px)",
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: 12,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {faq.q}
              </h4>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div
        style={{
          marginTop: 80,
          textAlign: "center",
          padding: "60px 40px",
          background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.05))",
          border: "1px solid rgba(78,205,196,0.3)",
          borderRadius: 20,
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1.8rem",
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Questions about pricing?
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
          Our team is here to help. Book a demo or reach out with any questions.
        </p>
        <button
          style={{
            background: "linear-gradient(135deg, var(--coral), var(--amber))",
            border: "none",
            borderRadius: 12,
            padding: "14px 32px",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#000",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(255,107,107,0.3)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-4px)";
            el.style.boxShadow = "0 15px 40px rgba(255,107,107,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 10px 30px rgba(255,107,107,0.3)";
          }}
        >
          Schedule a Demo
        </button>
      </div>
    </div>
  );
}
