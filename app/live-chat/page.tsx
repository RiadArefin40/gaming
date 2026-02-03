"use client";
import React, { useEffect, useRef, useState } from "react";

type Sender = "user" | "support";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  time: string;
}

const LiveChat: React.FC = () => {
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

    // Fake support reply
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
    <div className="fixed bottom-40 right-5 w-[360px] h-[520px] bg-[#0b0b0b] border border-yellow-500 rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.3)] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-3 font-bold flex items-center justify-between">
        <span>💬 Live Support</span>
        <span className="text-xs bg-black text-yellow-400 px-2 py-0.5 rounded-full">
          Online
        </span>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
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
              <p className="leading-relaxed">{msg.text}</p>

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && sendMessage()
          }
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
    </div>
  );
};

export default LiveChat;
