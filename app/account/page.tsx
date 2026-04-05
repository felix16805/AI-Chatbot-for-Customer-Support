"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Download, Calendar, AlertCircle } from "lucide-react";

export default function AccountPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0D17", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", animation: "spin 1s linear infinite", marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, border: "4px solid rgba(59,130,246,0.2)", borderTop: "4px solid #3B82F6", borderRadius: "50%" }}></div>
          </div>
          <p style={{ color: "white" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const invoices = [
    { id: "INV-001", date: "2025-04-01", amount: "$29.99", status: "Paid", description: "Professional Plan" },
    { id: "INV-002", date: "2025-03-01", amount: "$29.99", status: "Paid", description: "Professional Plan" },
    { id: "INV-003", date: "2025-02-01", amount: "$29.99", status: "Paid", description: "Professional Plan" },
  ];

  const plans = [
    { name: "Starter", price: "$0", features: ["Up to 1,000 messages/month", "Basic analytics", "Email support"], current: false },
    { name: "Professional", price: "$29.99", features: ["Up to 100,000 messages/month", "Advanced analytics", "Priority support", "Custom integrations"], current: true },
    { name: "Enterprise", price: "Custom", features: ["Unlimited messages", "Dedicated account manager", "24/7 support", "Custom SLA"], current: false },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 56px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            Billing & Account
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Manage your subscription and billing information</p>
        </div>

        {/* Current Plan */}
        <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(99,102,241,0.05) 100%)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 20, padding: 32, marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>Professional Plan</h2>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>You're currently on the Professional plan</p>
            </div>
            <div style={{ background: "rgba(59,130,246,0.2)", borderRadius: 12, padding: "8px 16px" }}>
              <span style={{ color: "#3B82F6", fontWeight: 600 }}>Active</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 24 }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 8 }}>Next Billing Date</p>
              <p style={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}>May 1, 2025</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 8 }}>Monthly Cost</p>
              <p style={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}>$29.99</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 8 }}>Messages Used</p>
              <p style={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}>45,230 / 100,000</p>
            </div>
          </div>

          <button style={{ background: "linear-gradient(135deg, #3B82F6, #1E40AF)", color: "white", padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600 }}>
            Upgrade Plan
          </button>
        </div>

        {/* Plans Comparison */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>All Plans</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ background: plan.current ? "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.05) 100%)" : "rgba(255,255,255,0.02)", border: plan.current ? "2px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, position: "relative" }}>
                {plan.current && (
                  <div style={{ position: "absolute", top: -12, right: 20, background: "#3B82F6", color: "white", padding: "4px 12px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600 }}>
                    CURRENT
                  </div>
                )}
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "#3B82F6", fontFamily: "'Syne', sans-serif" }}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>/month</span>}
                </div>
                <ul style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#3B82F6", fontWeight: 700 }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", background: plan.current ? "transparent" : "rgba(59,130,246,0.1)", color: plan.current ? "rgba(255,255,255,0.5)" : "#3B82F6", padding: "12px 24px", borderRadius: 12, border: plan.current ? "1px solid rgba(255,255,255,0.2)" : "none", cursor: "pointer", fontWeight: 600 }}>
                  {plan.current ? "Current Plan" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>Invoices</h2>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th style={{ padding: "16px", textAlign: "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.9rem" }}>Invoice</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.9rem" }}>Date</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.9rem" }}>Amount</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.9rem" }}>Status</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.9rem" }}></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <td style={{ padding: "16px", color: "white", fontWeight: 500 }}>{invoice.id}</td>
                    <td style={{ padding: "16px", color: "rgba(255,255,255,0.7)" }}>{invoice.date}</td>
                    <td style={{ padding: "16px", color: "white", fontWeight: 600 }}>{invoice.amount}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E", padding: "4px 12px", borderRadius: 6, fontSize: "0.85rem", fontWeight: 600 }}>
                        {invoice.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      <button style={{ background: "transparent", border: "none", color: "#3B82F6", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
