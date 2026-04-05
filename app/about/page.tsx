"use client";

import { Users, Award, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      
      // Intersection observer for animations
      const sections = document.querySelectorAll("[data-section]");
      const newVisible: { [key: string]: boolean } = {};
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        newVisible[section.getAttribute("data-section") || ""] = isVisible;
      });
      
      setVisibleSections(newVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const values = [
    { icon: Users, title: "Collaboration", description: "Building together as a team with clear communication" },
    { icon: Award, title: "Quality", description: "Committed to maintaining high engineering standards" },
    { icon: Zap, title: "Innovation", description: "Implementing modern technologies and best practices" },
    { icon: Globe, title: "Scalability", description: "Designing for growth and production-grade reliability" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", overflow: "hidden" }}>
      {/* Animated Background Grid */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(0deg, transparent 24%, rgba(255,107,107,0.05) 25%, rgba(255,107,107,0.05) 26%, transparent 27%, transparent 74%, rgba(255,107,107,0.05) 75%, rgba(255,107,107,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,107,107,0.05) 25%, rgba(255,107,107,0.05) 26%, transparent 27%, transparent 74%, rgba(255,107,107,0.05) 75%, rgba(255,107,107,0.05) 76%, transparent 77%, transparent)",
        backgroundSize: "50px 50px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.1,
      }}></div>

      {/* Floating Orbs */}
      <div style={{
        position: "fixed",
        top: "10%",
        right: "10%",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 100%)",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "float 8s ease-in-out infinite",
      }}></div>
      <div style={{
        position: "fixed",
        bottom: "10%",
        left: "5%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 100%)",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "float 10s ease-in-out infinite reverse",
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{ position: "relative", paddingTop: 140, paddingBottom: 100, overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(ellipse at center, rgba(255,107,107,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}></div>

          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 56px", textAlign: "center", position: "relative", zIndex: 2 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.3)",
              borderRadius: 50,
              padding: "12px 24px",
              marginBottom: 24,
              fontSize: "0.85rem",
              color: "#FF6B6B",
              fontWeight: 600,
              animation: "slideUp 1s ease-out",
            }}>
              📚 Software Engineering Project
            </div>

            <h1 style={{
              fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
              fontWeight: 800,
              color: "white",
              marginBottom: 24,
              fontFamily: "'Syne', sans-serif",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFB347 50%, #2DD4BF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "slideUp 1s ease-out 0.1s forwards",
              opacity: 0,
            }}>
              AI-Powered Customer Support Chatbot
            </h1>

            <p style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 700,
              margin: "0 auto 40px",
              lineHeight: 1.8,
              animation: "slideUp 1s ease-out 0.2s forwards",
              opacity: 0,
            }}>
              A production-grade intelligent chatbot demonstrating enterprise software engineering practices, built as a course project for Software Engineering BCSE301L at VIT Vellore.
            </p>

            <div style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "slideUp 1s ease-out 0.3s forwards",
              opacity: 0,
            }}>
              <Link href="/chat" style={{
                background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
                color: "white",
                padding: "16px 32px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 600,
                transition: "all 0.3s",
                border: "1px solid rgba(255,107,107,0.5)",
              }} onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 20px 40px rgba(255,107,107,0.3)";
              }} onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}>
                Try Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Project Overview Section */}
        <section style={{ padding: "100px 56px", background: "rgba(255,255,255,0.008)" }} data-section="overview">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: 60,
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              opacity: visibleSections["overview"] ? 1 : 0,
              transform: visibleSections["overview"] ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out",
            }}>
              Project Overview
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 20,
                      padding: "32px",
                      textAlign: "center",
                      transition: "all 0.5s ease-out 0.3s",
                      opacity: visibleSections["overview"] ? 1 : 0,
                      transform: visibleSections["overview"] ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                      cursor: "pointer",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,107,0.4)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px) scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                    }}
                  >
                    <div style={{ position: "relative", marginBottom: 16 }}>
                      <Icon size={40} color="#FF6B6B" style={{ margin: "0 auto", position: "relative", zIndex: 2 }} />
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(circle, rgba(255,107,107,0.2) 0%, transparent 70%)",
                        borderRadius: "50%",
                        filter: "blur(20px)",
                        zIndex: 1,
                      }}></div>
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>{value.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course Info Section */}
        <section style={{ padding: "100px 56px" }} data-section="course">
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: 50,
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              opacity: visibleSections["course"] ? 1 : 0,
              transform: visibleSections["course"] ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out",
            }}>
              Course Details
            </h2>
            <div style={{
              background: "linear-gradient(135deg, rgba(255,107,107,0.05) 0%, rgba(45,212,191,0.05) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: 48,
              backdropFilter: "blur(10px)",
              opacity: visibleSections["course"] ? 1 : 0,
              transform: visibleSections["course"] ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out 0.2s",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 12, fontSize: "0.9rem", fontStyle: "italic" }}>Course Code</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FF6B6B", fontFamily: "'Syne', sans-serif" }}>BCSE301L</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 12, fontSize: "0.9rem", fontStyle: "italic" }}>Institution</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg, #FFB347, #FF6B6B)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", fontFamily: "'Syne', sans-serif" }}>VIT Vellore</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 12, fontSize: "0.9rem", fontStyle: "italic" }}>Category</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#2DD4BF", fontFamily: "'Syne', sans-serif" }}>Software Engineering</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Project Goals</h3>
                <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 2.2, fontSize: "0.95rem" }}>
                  <li>✓ Demonstrate enterprise software engineering practices</li>
                  <li>✓ Build a production-grade full-stack application</li>
                  <li>✓ Implement comprehensive testing and CI/CD pipelines</li>
                  <li>✓ Showcase modern tech stack and best practices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section style={{ padding: "100px 56px", background: "rgba(255,255,255,0.008)" }} data-section="team">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: 60,
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              opacity: visibleSections["team"] ? 1 : 0,
              transform: visibleSections["team"] ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out",
            }}>
              Project Team
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
              {[
                { name: "Dipanjan Das", roll: "23BCE0131" },
                { name: "Anish Padavala", roll: "23BCE0192" },
                { name: "Gurjot Singh", roll: "23BCE0166" },
              ].map((member, idx) => (
                <div
                  key={member.roll}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,107,107,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 24,
                    padding: "32px",
                    textAlign: "center",
                    transition: "all 0.6s ease-out",
                    opacity: visibleSections["team"] ? 1 : 0,
                    transform: visibleSections["team"] ? "translateY(0)" : "translateY(60px)",
                    transitionDelay: `${idx * 0.1}s`,
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,107,0.4)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-12px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ width: 100, height: 100, background: "linear-gradient(135deg, #FF6B6B, #FFB347)", borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", fontWeight: 700, color: "white", boxShadow: "0 0 30px rgba(255,107,107,0.4)" }}>
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{member.name}</h3>
                  <p style={{ color: "#FF6B6B", fontSize: "0.9rem", fontWeight: 600 }}>Reg. No.: {member.roll}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section style={{ padding: "100px 56px" }} data-section="tech">
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: 50,
              textAlign: "center",
              fontFamily: "'Syne', sans-serif",
              opacity: visibleSections["tech"] ? 1 : 0,
              transform: visibleSections["tech"] ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out",
            }}>
              Technology Stack
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
              {[
                { title: "Frontend", color: "#FF6B6B", items: ["• Next.js 16.2.2 (Turbopack)", "• React & TypeScript", "• Tailwind CSS"] },
                { title: "Backend", color: "#FFB347", items: ["• Next.js API Routes", "• NextAuth.js v4", "• PostgreSQL & Prisma"] },
                { title: "DevOps", color: "#2DD4BF", items: ["• Docker & Docker Compose", "• GitHub Actions CI/CD", "• Git Version Control"] },
              ].map((stack, idx) => (
                <div
                  key={stack.title}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: 20,
                    padding: 32,
                    transition: "all 0.6s ease-out",
                    opacity: visibleSections["tech"] ? 1 : 0,
                    transform: visibleSections["tech"] ? "translateY(0)" : "translateY(60px)",
                    transitionDelay: `${idx * 0.1}s`,
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = stack.color;
                    (e.currentTarget as HTMLDivElement).style.background = `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)";
                  }}
                >
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: stack.color, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>{stack.title}</h3>
                  <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 2, fontSize: "0.95rem" }}>
                    {stack.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
