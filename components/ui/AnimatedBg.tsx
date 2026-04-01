"use client";

interface BgProps {
  variant?: "home" | "features" | "chat" | "login";
}

const variants = {
  home: `radial-gradient(ellipse 60% 50% at 10% 20%, rgba(132,94,194,0.28) 0%, transparent 60%),
    radial-gradient(ellipse 50% 60% at 90% 80%, rgba(255,107,107,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 60% 10%, rgba(78,205,196,0.12) 0%, transparent 60%)`,
  features: `radial-gradient(ellipse 55% 45% at 80% 20%, rgba(78,205,196,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 50% 55% at 5% 75%, rgba(132,94,194,0.25) 0%, transparent 60%),
    radial-gradient(ellipse 40% 35% at 50% 50%, rgba(255,107,107,0.1) 0%, transparent 60%)`,
  chat: `radial-gradient(ellipse 50% 50% at 20% 30%, rgba(132,94,194,0.25) 0%, transparent 60%),
    radial-gradient(ellipse 45% 50% at 80% 70%, rgba(255,107,107,0.2) 0%, transparent 60%)`,
  login: `radial-gradient(ellipse 70% 60% at 15% 30%, rgba(132,94,194,0.35) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 85% 70%, rgba(255,107,107,0.28) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 50% 10%, rgba(78,205,196,0.15) 0%, transparent 60%)`,
};

export default function AnimatedBg({ variant = "home" }: BgProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: variants[variant],
        animation: "bgPulse 10s ease-in-out infinite alternate",
        pointerEvents: "none",
      }}
    />
  );
}