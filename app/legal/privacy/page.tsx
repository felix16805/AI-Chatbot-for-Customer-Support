"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ marginBottom: 60 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Last updated: April 1, 2025</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              1. Information We Collect
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              We collect information you provide directly to us, such as when you create an account, subscribe to our services, or contact us. This may include:
            </p>
            <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 }}>
              <li>Name and email address</li>
              <li>Company information</li>
              <li>Chat conversations and customer data you provide</li>
              <li>Payment information (processed securely through payment processors)</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              2. How We Use Your Information
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              We use the information we collect to:
            </p>
            <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 }}>
              <li>Provide, maintain, and improve our services</li>
              <li>Analyze usage patterns and optimize performance</li>
              <li>Communicate with you about updates and changes</li>
              <li>Ensure security and prevent fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              3. Data Security
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              We implement comprehensive security measures to protect your data:
            </p>
            <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 }}>
              <li>End-to-end encryption for all data in transit</li>
              <li>Bank-level encryption for data at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>SOC 2 Type II certified infrastructure</li>
              <li>Strict access controls and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              4. GDPR Compliance
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              We are committed to compliance with the General Data Protection Regulation (GDPR). We respect your rights to access, modify, or delete your personal data. To exercise these rights, please contact our privacy team at privacy@aria-ai.com.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              5. Third-Party Sharing
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              We do not sell, trade, or rent your personal information. We may share information only with:
            </p>
            <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 }}>
              <li>Service providers who assist in operating our website</li>
              <li>Law enforcement when required by legal processes</li>
              <li>Trusted partners with your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              6. Cookies and Tracking
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              We use cookies and similar technologies to enhance your experience. You can disable cookies in your browser settings, though some features may be limited. We use analytics to understand how users interact with our service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              7. Data Retention
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time, subject to legal retention requirements.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              8. Changes to This Policy
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              We may update this privacy policy from time to time. We will notify you of significant changes via email or by posting a notice on our website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              9. Contact Us
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              If you have questions or concerns about our privacy practices, please contact us at:
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginTop: 12 }}>
              <strong style={{ color: "white" }}>Email:</strong> privacy@aria-ai.com<br />
              <strong style={{ color: "white" }}>Address:</strong> San Francisco, CA 94105
            </p>
          </section>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginTop: 40 }}>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
              For more information about your data rights and our practices, please review our <span style={{ color: "white", fontWeight: 600 }}>Data Processing Agreement</span> available upon request.
            </p>
            <Link href="/terms" style={{ color: "#FF6B6B", textDecoration: "none", fontWeight: 600 }}>
              View our Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
