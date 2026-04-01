"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SignupForm from "@/components/login/SignupForm";

export default function SignupPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 28px", position: "relative", overflow: "hidden" }}>
      {/* Background Glows */}
      <div style={{ position: "absolute", top: "-150px", right: "-150px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", filter: "blur(120px)" }}></div>
      <div style={{ position: "absolute", bottom: "-150px", left: "-150px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", filter: "blur(120px)" }}></div>

      <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 10 }}>
        <Link 
          href="/" 
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 48, transition: "color 0.25s", fontWeight: 500, fontSize: "0.95rem" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "56px 48px", backdropFilter: "blur(12px)" }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>Create Account</h1>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Get started with Aria AI Support today</p>
          </div>

          <SignupForm />

          <p style={{ marginTop: 32, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#FFB347", textDecoration: "none", fontWeight: 600, transition: "color 0.25s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FFC96E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFB347")}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
