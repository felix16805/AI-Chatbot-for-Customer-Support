"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0B0D17", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ marginBottom: 60 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "white", marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>
            Terms of Service
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Last updated: April 1, 2025</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              By accessing and using Aria AI services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              2. Use License
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              Permission is granted to temporarily download one copy of the materials (information or software) on Aria AI&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 }}>
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile, reverse engineering, or disassemble any software contained on Aria AI</li>
              <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              3. Disclaimer
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 12 }}>
              The materials on Aria AI&apos;s website are provided on an &apos;as is&apos; basis. Aria AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              4. Limitations
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              In no event shall Aria AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Aria AI&apos;s website, even if Aria AI or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              5. Accuracy of Materials
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              The materials appearing on Aria AI&apos;s website could include technical, typographical, or photographic errors. Aria AI does not warrant that any of the materials on its website are accurate, complete, or current. Aria AI may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              6. Links
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              Aria AI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Aria AI of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              7. Modifications
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              Aria AI may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              8. Governing Law
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts located in California.
            </p>
          </section>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginTop: 40 }}>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
              For questions about these Terms of Service, please contact our legal team at <span style={{ color: "white" }}>legal@aria-ai.com</span>
            </p>
            <Link href="/privacy" style={{ color: "#FF6B6B", textDecoration: "none", fontWeight: 600 }}>
              View our Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
