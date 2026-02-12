"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// ----------------- TYPES -----------------
type Sender = "user" | "support";

interface Message {
  id: string;
  sender: Sender;
  message: string;
  created_at: string;
  chat_id?: string;
}

interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}

interface Chat {
  id: string;
}

// ----------------- CONFIG -----------------
const API_BASE = "https://api.spcwin.info/users";

// ----------------- COMPONENT -----------------
export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const socketRef = useRef<Socket | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  // ----------------- LOAD USER -----------------
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      const u = JSON.parse(stored) as AuthUser;
      setUser(u);
      console.log("[DEBUG] Loaded user:", u);
    }
  }, []);
const chatIdRef = useRef<string | null>(null);
  // ----------------- SOCKET INIT -----------------
useEffect(() => {
  const socket = io(API_BASE.replace("/users", ""), {
    transports: ["websocket"],
    path: "/socket.io",
  });

  socketRef.current = socket;

  socket.on("connect", () =>
    console.log("[DEBUG] Socket connected:", socket.id)
  );

  socket.on("disconnect", (reason) =>
    console.log("[DEBUG] Socket disconnected:", reason)
  );

  socket.on("connect_error", (err) =>
    console.error("[DEBUG] Socket connection error:", err)
  );

socket.on("receive_message", (msg: Message) => {
  console.log("[DEBUG] Socket received message:", msg);

  if (msg.chat_id === chatIdRef.current) {
    console.log("[DEBUG] Message accepted for chat:", msg.chat_id);
    setMessages((prev) => [...prev, msg]);
  } else {
    console.log(
      "[DEBUG] Message ignored, chat mismatch:",
      msg.chat_id,
      "vs",
      chatIdRef.current
    );
  }
});


  return () => {
    socket.disconnect();
    console.log("[DEBUG] Socket disconnected manually");
  };
}, []);

  // ----------------- INIT CHAT -----------------
  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      try {
        // 1️⃣ Create or get chat
        const { data: chat } = await axios.post(`${API_BASE}/chat/init`, { user_id: user.id });
        if (!chat?.id) throw new Error("Chat ID missing");
        setChatId(chat.id);
        chatIdRef.current = chat.id;
        console.log("[DEBUG] Chat initialized:", chat.id);

        // 2️⃣ Join socket room
        socketRef.current?.emit("join_chat", { chatId: chat.id });
        console.log("[DEBUG] Emitted join_chat:", chat.id);

        // 3️⃣ Fetch previous messages
        const { data: prevMessages } = await axios.get(`${API_BASE}/chat/${user.id}/${chat.id}/messages`);
        console.log("[DEBUG] Fetched previous messages:", prevMessages);
        setMessages(prevMessages);

        setLoading(false);
      } catch (err: any) {
        console.error("[DEBUG] Chat init failed:", err.response?.data || err.message || err);
        setError("Unable to start chat. Please try again later.");
        setLoading(false);
      }
    };

    initChat();
  }, [user]);

  // ----------------- SEND MESSAGE -----------------
  const sendMessage = async () => {
    if (!input.trim() || !chatId || !user) return;

    const msg: Message = {
      id: Date.now().toString(),
      sender: "user",
      message: input.trim(),
      created_at: new Date().toISOString(),
      chat_id: chatId,
    };

    console.log("[DEBUG] Sending message:", msg);

    // Optimistic UI
    setMessages((prev) => [...prev, msg]);
    setInput("");

    try {
      // Emit to socket for real-time admin receive
      socketRef.current?.emit("send_message", { chatId, message: msg });
      console.log("[DEBUG] Emitted send_message to socket");

      // API fallback to store in DB
      await axios.post(`${API_BASE}/chat/${user.id}/${chatId}/message`, { message: msg.message });
      console.log("[DEBUG] Message saved via API");
    } catch (err) {
      console.error("[DEBUG] Failed to send message:", err);
      setError("Failed to send message.");
    }
  };

  // ----------------- SCROLL -----------------
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return <div>Loading chat...</div>;

  return (
    <div className="fixed bottom-40 right-5 w-[360px] h-[520px] bg-[#0b0b0b] border border-yellow-500 rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.3)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-3 font-bold flex items-center justify-between">
        <span>💬 Live Support</span>
        <span className="text-xs bg-black text-yellow-400 px-2 py-0.5 rounded-full">Online</span>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-3 py-2 rounded-xl ${msg.sender === "user" ? "bg-yellow-400 text-black rounded-br-none" : "bg-[#1f1f1f] text-white rounded-bl-none"}`}>
              <p>{msg.message}</p>
              <p className="text-[10px] opacity-60 mt-1 text-right">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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

      {error && <div className="text-red-500 text-xs px-4 py-1">{error}</div>}
    </div>
  );
}
