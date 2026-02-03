"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Sender = "user" | "support";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  time: string;
}

interface LiveChatProps {
  open: boolean;
  onClose: () => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "support",
      text: "👋 Welcome to SPCWIN Live Support! How can we help you today?",
      time: "10:30 AM",
    },
  ]);

  const [input, setInput] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Fake reply
    setTimeout(() => {
      const supportMsg: Message = {
        id: Date.now() + 1,
        sender: "support",
        text: "Thanks for your message! Our team will assist you shortly 😊",
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, supportMsg]);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
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
                <p>{msg.text}</p>

                <p className="text-[10px] opacity-60 mt-1 text-right">
                  {msg.time}
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
