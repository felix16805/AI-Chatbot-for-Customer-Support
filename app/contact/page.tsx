"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    { icon: Mail, title: "Email", description: "support@aria-ai.com", href: "mailto:support@aria-ai.com" },
    { icon: Phone, title: "Phone", description: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, title: "Address", description: "San Francisco, CA 94105", href: null },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ position: "fixed", top: 0, right: 0, width: "600px", height: "600px", background: "radial-gradient(circle, rgba(45,212,191,0.1) 0%, transparent 100%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1, filter: "blur(120px)" }}></div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 56px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 50, padding: "8px 16px", marginBottom: 24, fontSize: "0.85rem", color: "#2DD4BF", fontWeight: 600 }}>
            📧 Contact Us
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>
            Get In Touch
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
            Have a question or feedback? We&apos;d love to hear from you. Our team is here to help!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section style={{ padding: "60px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32, marginBottom: 80 }}>
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return method.href ? (
                <a
                  key={method.title}
                  href={method.href}
                  style={{ textDecoration: "none", display: "block", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px", textAlign: "center", transition: "all 0.25s", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(45,212,191,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={40} color="#2DD4BF" style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{method.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)" }}>{method.description}</p>
                </a>
              ) : (
                <div
                  key={method.title}
                  style={{ textDecoration: "none", display: "block", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px", textAlign: "center" }}
                >
                  <Icon size={40} color="#2DD4BF" style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{method.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)" }}>{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "60px 56px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 40, textAlign: "center", fontFamily: "'Syne', sans-serif" }}>Send us a Message</h2>

          {submitted && (
            <div style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 12, padding: "16px", marginBottom: 24, color: "#2DD4BF", textAlign: "center", fontWeight: 500 }}>
              ✓ Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.25s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(45,212,191,0.3)";
                  (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.03)";
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.25s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(45,212,191,0.3)";
                  (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.03)";
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.25s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(45,212,191,0.3)";
                  (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.03)";
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.25s",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(45,212,191,0.3)";
                  (e.currentTarget as HTMLTextAreaElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLTextAreaElement).style.background = "rgba(255,255,255,0.03)";
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #2DD4BF, #06B6D4)",
                color: "white",
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(45,212,191,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
