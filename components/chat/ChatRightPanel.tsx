export default function ChatRightPanel() {
  return (
    <div style={{
      width: 340,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      borderLeft: "1.5px solid rgba(255,107,107,0.15)",
      background: "linear-gradient(180deg, rgba(11,13,23,0.8), rgba(11,13,23,0.4))",
      backdropFilter: "blur(20px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <div style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: -100,
          left: -50,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite 1s",
        }} />
      </div>

      {/* AI Sentiment Analysis */}
      <section style={{ position: "relative", zIndex: 2 }}>
        <h4 style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 14,
          margin: 0,
          paddingBottom: 14,
        }}>
          AI Sentiment
        </h4>
        <div style={{
          background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(45,212,191,0.08))",
          border: "1.5px solid rgba(45,212,191,0.35)",
          padding: "20px",
          borderRadius: "16px",
          transition: "all 0.3s",
          boxShadow: "0 8px 24px rgba(45,212,191,0.1)",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(45,212,191,0.2), rgba(45,212,191,0.1))";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,212,191,0.5)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(45,212,191,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(45,212,191,0.08))";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,212,191,0.35)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,212,191,0.1)";
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#2DD4BF",
              boxShadow: "0 0 12px rgba(45,212,191,0.8)",
              animation: "pulse 2s infinite",
            }} />
            <p style={{
              color: "#2DD4BF",
              fontSize: "0.95rem",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}>
              Inquisitive / Positive
            </p>
          </div>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            margin: 0,
            lineHeight: 1.6,
            fontWeight: 500,
          }}>
            Customer seeking real-time order status.
          </p>
        </div>
      </section>

      {/* Detected Intent */}
      <section style={{ position: "relative", zIndex: 2 }}>
        <h4 style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 14,
          margin: 0,
          paddingBottom: 14,
        }}>
          Detected Intent
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["Order Tracking", "Delivery", "Logistics"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,179,71,0.1))",
                color: "rgba(255,255,255,0.9)",
                padding: "8px 14px",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "1.5px solid rgba(255,107,107,0.3)",
                transition: "all 0.25s",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 12px rgba(255,107,107,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(255,107,107,0.25), rgba(255,179,71,0.15))";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,107,0.5)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(255,107,107,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,179,71,0.1))";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,107,0.3)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(255,107,107,0.1)";
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Key Information */}
      <section style={{ position: "relative", zIndex: 2, marginTop: "auto" }}>
        <h4 style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 14,
          margin: 0,
          paddingBottom: 14,
        }}>
          Key Information
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Status", value: "Order In Transit", color: "#2DD4BF" },
            { label: "ETA", value: "2-3 Business Days", color: "#FFB347" },
            { label: "Action", value: "Awaiting Delivery", color: "#FF6B6B" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1.5px solid rgba(255,255,255,0.1)",
                transition: "all 0.25s",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  width: 4,
                  height: 10,
                  borderRadius: "2px",
                  background: item.color,
                  boxShadow: `0 0 10px ${item.color}40`,
                }} />
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.label}
                </div>
              </div>
              <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", fontWeight: 600, paddingLeft: 12 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}