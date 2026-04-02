"use client";

import { useAuth } from "@/contexts/AuthContext";
import ChatPage from "@/components/chat/ChatPage";
import DemoChatPage from "@/components/chat/DemoChatPage";

export default function ChatRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F111A] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-[#FF6B6B]/20 border-t-[#FF6B6B] rounded-full"></div>
          </div>
          <p className="text-white">Loading chat...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <ChatPage /> : <DemoChatPage />;
}

