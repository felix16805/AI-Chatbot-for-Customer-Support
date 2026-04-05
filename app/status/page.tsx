"use client";

import { CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function StatusPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const services = [
    { name: "Chat API", status: "operational", uptime: 99.98, lastIncident: "Mar 28, 2026" },
    { name: "Authentication", status: "operational", uptime: 99.99, lastIncident: "Mar 15, 2026" },
    { name: "Database", status: "operational", uptime: 99.95, lastIncident: "Apr 1, 2026" },
    { name: "Email Service", status: "operational", uptime: 99.89, lastIncident: "Apr 2, 2026" },
  ];

  const incidents = [
    { date: "April 2, 2026", time: "14:32 UTC", service: "Email Service", severity: "minor", title: "Email delivery delays", resolved: true, duration: "23 minutes" },
    { date: "April 1, 2026", time: "03:15 UTC", service: "Database", severity: "moderate", title: "Database connection timeout", resolved: true, duration: "45 minutes" },
    { date: "March 28, 2026", time: "22:10 UTC", service: "Chat API", severity: "minor", title: "Rate limiting spike", resolved: true, duration: "12 minutes" },
    { date: "March 15, 2026", time: "18:45 UTC", service: "API Gateway", severity: "minor", title: "Temporary latency increase", resolved: true, duration: "8 minutes" },
  ];

  const metrics = [
    { label: "API Response Time", value: "89ms", trend: "↓ 2%" },
    { label: "99th Percentile", value: "234ms", trend: "↓ 5%" },
    { label: "Error Rate", value: "0.002%", trend: "↓ 15%" },
    { label: "Uptime", value: "99.95%", trend: "↑ 0.1%" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#FF6B6B";
      case "major":
        return "#FFB347";
      case "moderate":
        return "#FFD93D";
      case "minor":
        return "#2DD4BF";
      default:
        return "#06B6D4";
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 80 }}>
      {/* Background Grid */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(0deg, transparent 24%, rgba(45,212,191,0.05) 25%, rgba(45,212,191,0.05) 26%, transparent 27%, transparent 74%, rgba(45,212,191,0.05) 75%, rgba(45,212,191,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(45,212,191,0.05) 25%, rgba(45,212,191,0.05) 26%, transparent 27%, transparent 74%, rgba(45,212,191,0.05) 75%, rgba(45,212,191,0.05) 76%, transparent 77%, transparent)",
        backgroundSize: "50px 50px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.1,
      }}></div>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px 60px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
          fontWeight: 800,
          color: "white",
          marginBottom: 24,
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #2DD4BF 0%, #06B6D4 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          System Status
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto" }}>
          Real-time monitoring of Aria services and infrastructure
        </p>
      </section>

      {/* Overall Status */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.1) 0%, rgba(45,212,191,0.05) 100%)",
            border: "1px solid rgba(45,212,191,0.3)",
            borderRadius: 16,
            padding: 32,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}>
            <CheckCircle size={48} color="#2DD4BF" />
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>All Systems Operational</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>Last checked: April 5, 2026 at 14:32 UTC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Performance Metrics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{metric.label}</p>
                  <TrendingUp size={14} color="#2DD4BF" />
                </div>
                <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: 8 }}>{metric.value}</p>
                <p style={{ color: "#2DD4BF", fontSize: "0.85rem", fontWeight: 600 }}>{metric.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Service Status</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {services.map((service, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <CheckCircle size={24} color="#2DD4BF" />
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: 4 }}>{service.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Last incident: {service.lastIncident}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2DD4BF", marginBottom: 4 }}>{service.uptime}% uptime</p>
                  <span style={{ background: "rgba(45,212,191,0.2)", color: "#2DD4BF", padding: "4px 12px", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>Operational</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incidents Timeline */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 32, fontFamily: "'Syne', sans-serif" }}>Recent Incidents</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {incidents.map((incident, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 20,
                  borderLeft: `4px solid ${getSeverityColor(incident.severity)}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: 4 }}>{incident.title}</h3>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                        <Clock size={14} style={{ display: "inline", marginRight: 4 }} />
                        {incident.date} at {incident.time}
                      </span>
                      <span style={{ background: `${getSeverityColor(incident.severity)}20`, color: getSeverityColor(incident.severity), padding: "2px 8px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 600 }}>
                        {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                  <span style={{ background: "rgba(45,212,191,0.2)", color: "#2DD4BF", padding: "4px 12px", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>Resolved</span>
                </div>
                <div style={{ display: "flex", gap: 24, color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                  <span>Service: {incident.service}</span>
                  <span>Duration: {incident.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 56px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Get Status Updates</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>Subscribe to notifications for service incidents and maintenance windows</p>
          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "12px 16px",
                color: "white",
                fontSize: "0.95rem",
              }}
            />
            <button style={{
              background: "linear-gradient(135deg, #2DD4BF, #06B6D4)",
              color: "white",
              padding: "12px 32px",
              borderRadius: 8,
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
