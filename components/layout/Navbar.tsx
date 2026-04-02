"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { 
    href: "/product",
    label: "Product", 
    submenu: [
      { href: "/features", label: "Features" },
      { href: "/chat", label: "Live Demo" },
      { href: "/pricing", label: "Pricing" },
      { href: "/changelog", label: "Changelog" },
    ]
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "12px 56px" : "20px 56px",
        borderBottom: `2px solid ${scrolled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(20px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled 
          ? "linear-gradient(to bottom, rgba(26,26,46,0.9), rgba(26,26,46,0.7))" 
          : "linear-gradient(to bottom, rgba(26,26,46,0.5), transparent)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Background Gradient Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(255,107,107,0.05), transparent, rgba(255,179,71,0.05))",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <Link 
        href="/" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12, 
          textDecoration: "none", 
          color: "#fff", 
          fontFamily: "'Syne', sans-serif", 
          fontWeight: 900, 
          fontSize: "1.8rem",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
          const dot = (e.currentTarget as HTMLElement).querySelector('span');
          if (dot) dot.style.transform = "scale(1.3) rotate(20deg)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          const dot = (e.currentTarget as HTMLElement).querySelector('span');
          if (dot) dot.style.transform = "scale(1) rotate(0deg)";
        }}
      >
        <span
          className="animate-pulse-dot"
          style={{
            width: 12, 
            height: 12, 
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--coral), var(--amber))",
            boxShadow: "0 0 20px var(--coral), inset 0 0 10px rgba(255,255,255,0.3)",
            display: "inline-block",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        Aria
      </Link>

      {/* Nav Links */}
      <ul style={{ 
        display: "flex", 
        gap: 8, 
        listStyle: "none",
        position: "relative",
        zIndex: 1,
      }}>
        {navLinks.map((link: any) => {
          const hasSubmenu = link.submenu;
          const isActive = pathname === link.href;
          const isSubmenuActive = hasSubmenu && link.submenu.some((sub: any) => pathname === sub.href);
          const isOpen = openSubmenu === link.label;
          
          return (
            <li 
              key={link.label}
              style={{ position: "relative" }}
            >
              {hasSubmenu ? (
                <div>
                  <button
                    onClick={() => setOpenSubmenu(isOpen ? null : link.label)}
                    style={{
                      color: isSubmenuActive || isOpen ? "#fff" : "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      position: "relative",
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      background: isSubmenuActive || isOpen ? "rgba(255,255,255,0.12)" : "transparent",
                      backdropFilter: isSubmenuActive || isOpen ? "blur(10px)" : "none",
                      border: isSubmenuActive || isOpen ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmenuActive && !isOpen) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.95)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmenuActive && !isOpen) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                      }
                    }}
                  >
                    {link.label}
                    {isSubmenuActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -8,
                          left: 0,
                          right: 0,
                          height: "3px",
                          background: "linear-gradient(90deg, var(--coral), var(--amber))",
                          borderRadius: "2px",
                          animation: "slideInUp 0.4s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      />
                    )}
                  </button>
                  
                  {/* Submenu Dropdown - Click based */}
                  {isOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 12px)",
                        left: 0,
                        background: "linear-gradient(135deg, rgba(26,26,46,0.98), rgba(26,26,46,0.92))",
                        border: "1px solid rgba(78,205,196,0.25)",
                        borderRadius: "14px",
                        overflow: "hidden",
                        minWidth: "200px",
                        boxShadow: "0 0 30px rgba(78,205,196,0.15), 0 20px 50px rgba(0,0,0,0.5)",
                        backdropFilter: "blur(20px)",
                        animation: "slideInUp 0.3s cubic-bezier(0.16,1,0.3,1)",
                        zIndex: 10,
                      }}
                    >
                      {link.submenu.map((sublink: any, idx: number) => {
                        const isSubActive = pathname === sublink.href;
                        return (
                          <Link
                            key={idx}
                            href={sublink.href}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "13px 18px",
                              color: isSubActive ? "var(--mint)" : "rgba(255,255,255,0.72)",
                              textDecoration: "none",
                              fontSize: "0.9rem",
                              fontWeight: isSubActive ? 700 : 500,
                              transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                              background: isSubActive ? "rgba(78,205,196,0.15)" : "transparent",
                              position: "relative",
                              borderBottom: idx < link.submenu.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            }}
                            onClick={() => setOpenSubmenu(null)}
                            onMouseEnter={(e) => {
                              if (!isSubActive) {
                                (e.currentTarget as HTMLElement).style.background = "rgba(78,205,196,0.12)";
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.95)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubActive) {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)";
                              }
                            }}
                          >
                            <span style={{ marginRight: 8, opacity: 0.7 }}>•</span>
                            {sublink.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    position: "relative",
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                    backdropFilter: isActive ? "blur(10px)" : "none",
                    border: isActive ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.95)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, var(--coral), var(--amber))",
                        borderRadius: "2px",
                        animation: "slideInUp 0.4s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* Actions */}
      <div style={{ 
        display: "flex", 
        gap: 12, 
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}>
        {isAuthenticated && user ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
                padding: "8px 16px",
                borderRadius: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B6B, #FFB347)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <User size={16} color="white" />
              </div>
              <span className="hidden sm:inline">{user.name}</span>
            </button>
            {showDropdown && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "#161925",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                minWidth: "200px",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
              }}>
                <div style={{ padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", margin: 0 }}>Logged in as</p>
                  <p style={{ color: "white", fontWeight: 600, margin: "4px 0 0 0" }}>{user.email}</p>
                </div>
                <Link href="/dashboard">
                  <button style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    background: "transparent",
                    color: "rgba(255,255,255,0.8)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}>
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    background: "transparent",
                    color: "#FF6B6B",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,107,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}>
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : !isLoading && (
          <>
            <Link href="/login">
              <button
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  padding: "10px 24px",
                  borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.95)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button
                style={{
                  background: "linear-gradient(135deg, var(--coral), var(--amber))",
                  border: "none",
                  color: "#fff",
                  padding: "10px 28px",
                  borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: "0 12px 32px rgba(255,107,107,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 16px 48px rgba(255,107,107,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(255,107,107,0.35)";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(0.98)";
                }}
              >
                Get Started →
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}