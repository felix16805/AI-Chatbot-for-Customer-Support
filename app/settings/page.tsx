"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Lock, Eye, LogOut, Trash2, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorEnabled: true,
    debugMode: false,
  });

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
            <div style={{ width: 48, height: 48, border: "4px solid rgba(244,63,94,0.2)", borderTop: "4px solid #F43F5E", borderRadius: "50%" }}></div>
          </div>
          <p style={{ color: "white" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 56px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            Settings
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Manage your account preferences and security settings</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 40, overflowX: "auto" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 24px",
                background: "transparent",
                border: "none",
                color: activeTab === tab.id ? "#F43F5E" : "rgba(255,255,255,0.6)",
                fontWeight: activeTab === tab.id ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.25s",
                borderBottom: activeTab === tab.id ? "2px solid #F43F5E" : "2px solid transparent",
                fontSize: "0.95rem",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                }
              }}
            >
              <span style={{ marginRight: 8 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 40 }}>
              <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #F43F5E, #FF9F1C)", borderRadius: "50%" }}></div>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "white", marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>
                  {user?.name}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)" }}>{user?.email}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Full Name</label>
                <input type="text" defaultValue={user?.name} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Email</label>
                <input type="email" defaultValue={user?.email} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Phone</label>
                <input type="tel" placeholder="+1 (555) 000-0000" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 500 }}>Company</label>
                <input type="text" placeholder="Your company name" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button style={{ background: "linear-gradient(135deg, #F43F5E, #FF9F1C)", color: "white", padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <Save size={18} />
                Save Changes
              </button>
              <button style={{ background: "transparent", color: "rgba(255,255,255,0.6)", padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: 600 }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", marginBottom: 4 }}>Email Notifications</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Receive updates via email</p>
                </div>
                <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} style={{ width: 24, height: 24, cursor: "pointer" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", marginBottom: 4 }}>SMS Notifications</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Get alerts via SMS</p>
                </div>
                <input type="checkbox" checked={settings.smsNotifications} onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })} style={{ width: 24, height: 24, cursor: "pointer" }} />
              </div>

              <button style={{ background: "linear-gradient(135deg, #F43F5E, #FF9F1C)", color: "white", padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600, width: "fit-content" }}>
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", marginBottom: 4 }}>Two-Factor Authentication</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Add an extra layer of security</p>
                </div>
                <input type="checkbox" checked={settings.twoFactorEnabled} onChange={(e) => setSettings({ ...settings, twoFactorEnabled: e.target.checked })} style={{ width: 24, height: 24, cursor: "pointer" }} />
              </div>

              <button style={{ background: "transparent", color: "rgba(255,255,255,0.7)", padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, width: "fit-content" }}>
                <Lock size={18} />
                Change Password
              </button>

              <button style={{ background: "transparent", color: "#FF6B6B", padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.3)", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, width: "fit-content" }}>
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 12, fontWeight: 500 }}>Theme</label>
                <select style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: "1rem" }}>
                  <option>Dark</option>
                  <option>Light</option>
                  <option>Auto</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: 12, fontWeight: 500 }}>Language</label>
                <select style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: "1rem" }}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <button style={{ background: "linear-gradient(135deg, #F43F5E, #FF9F1C)", color: "white", padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600, width: "fit-content" }}>
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
