"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* ================= CONFIG ================= */
const API_URL = "https://api.spcwin.info/users";
const SOCKET_URL = "https://api.spcwin.info";
/* ========================================== */

type Sender = "user" | "support";

interface Message {
  id: number;
  sender: Sender;
  message: string;
  created_at: string;
}

interface LiveChatProps {
  open: boolean;
  onClose: () => void;
  user_id: string;
}

let socket: Socket | null = null;

const LiveChat: React.FC<LiveChatProps> = ({ open, onClose, user_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- INIT CHAT ---------------- */
  useEffect(() => {
    if (!open) return;

    const initChat = async () => {
      const res = await fetch(`${API_URL}/chat/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });

      const chat = await res.json();
      setChatId(chat.id);
    };

    initChat();
  }, [open, user_id]);

  /* ---------------- SOCKET SETUP ---------------- */
  useEffect(() => {
    if (!chatId || !open) return;

    socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);
      socket?.emit("join_chat", { chatId });
    });

    socket.on("receive_message", (msg: Message) => {
      console.log("[SOCKET] received:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket?.emit("leave_chat", { chatId });
      socket?.disconnect();
      socket = null;
    };
  }, [chatId, open]);

  /* ---------------- LOAD HISTORY ---------------- */
  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
      const res = await fetch(
        `${API_URL}/chat/${user_id}/${chatId}/messages`
      );
      const data = await res.json();
      setMessages(data);
    };

    loadMessages();
  }, [chatId, user_id]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!input.trim() || !chatId) return;

    const text = input;
    setInput("");

    await fetch(
      `${API_URL}/chat/${user_id}/${chatId}/message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="p-0 max-w-[380px] bg-[#0b0b0b] border border-yellow-500 rounded-2xl overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-3 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-bold">
            💬 Live Support
          </DialogTitle>
          <span className="text-xs bg-black text-yellow-400 px-2 py-0.5 rounded-full">
            Online
          </span>
        </DialogHeader>

        {/* Chat Body */}
        <div className="h-[420px] overflow-y-auto px-4 py-3 space-y-3 text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-yellow-400 text-black rounded-br-none"
                    : "bg-[#1f1f1f] text-white rounded-bl-none"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-[10px] opacity-60 mt-1 text-right">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-yellow-500 p-3 flex gap-2 bg-black">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-[#1a1a1a] text-white px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-yellow-400 text-black px-4 rounded-lg font-semibold hover:bg-yellow-300 active:scale-95 transition"
          >
            Send
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveChat;
