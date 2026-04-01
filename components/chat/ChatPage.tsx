"use client";

import ChatWindow from "@/components/chat/ChatWindow";
import ChatRightPanel from "@/components/chat/ChatRightPanel";

export default function ChatPage() {
  return (
    <div style={{ display: "flex", height: "calc(100vh - 80px)", background: "#0F111A", marginTop: "80px" }}>
      <ChatWindow />
      <ChatRightPanel />
    </div>
  );
}
