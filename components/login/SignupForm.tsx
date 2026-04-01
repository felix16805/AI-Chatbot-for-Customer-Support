"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(email, password, name);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {error && (
        <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 16, padding: "16px 20px", color: "#FF6B6B", fontSize: "0.95rem" }}>
          {error}
        </div>
      )}

      <div>
        <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "16px 20px",
            color: "white",
            fontSize: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s",
            outline: "none"
          }}
          onFocus={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,107,0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
          required
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "16px 20px",
            color: "white",
            fontSize: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s",
            outline: "none"
          }}
          onFocus={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,107,0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
          required
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>Password</label>
        <div style={{ position: "relative" }}>
          <input 
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "16px 20px 16px 20px",
              color: "white",
              fontSize: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.25s",
              outline: "none"
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,107,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1rem", transition: "color 0.25s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Must be at least 6 characters</p>
      </div>

      <button 
        disabled={loading}
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
          color: "white",
          padding: "16px 24px",
          borderRadius: 14,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          transition: "all 0.25s",
          opacity: loading ? 0.6 : 1,
        }}
        onMouseEnter={(e) => !loading && (e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,107,0.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {loading && <Loader size={18} className="animate-spin" />}
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
