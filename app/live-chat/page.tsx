"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

type Sender = "user" | "support";

interface Message {
  id: string;
  sender: Sender;
  message: string;
  created_at: string;
  chat_id?: string;
}

interface AuthUser {
  id: number;
  username: string;
  name: string;
  wallet: number;
}

const API_BASE = "https://api.spcwin.info";
const SOCKET_URL = "https://api.spcwin.info";

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatIdRef = useRef<string | null>(null);

  // ---------------- LOAD USER ----------------
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // ---------------- SOCKET INIT ----------------
  useEffect(() => {
    if (!user) return;

    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      path: "/socket.io",
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("user_online", user.id);
    });

    // handle incoming messages
    socket.on("receive_message", (msg: Message) => {
      if (msg.chat_id === chatIdRef.current) {
        setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        scrollToEnd();

        // if chat window is closed, increment unread
        if (!isOpen && msg.sender === "support") {
          setUnreadCount((prev) => prev + 1);
        }
      } else {
        // any other chat messages from support
        setUnreadCount((prev) => prev + 1);
      }
    });

    // real-time unread count from server
    socket.on(
      "unread_count",
      ({ chatId: cId, count }: { chatId: string; count: number }) => {
        if (chatIdRef.current === cId) setUnreadCount(count);
      }
    );

    // update online users
    socket.on("online_users", (users: number[]) => setOnlineUsers(users));

   return () => { socket.disconnect(); };
  }, [user, isOpen]);

  // ---------------- SOCKET INIT ---------------- 
  // useEffect(() => { if (!user) return; const socket: Socket = io(SOCKET_URL, { transports: ["websocket"], path: "/socket.io", }); socketRef.current = socket; socket.on("connect", () => { console.log("Socket connected:", socket.id); // Notify server user is online socket.emit("user_online", user.id); }); socket.on("receive_message", (msg: Message) => { if (msg.chat_id !== chatIdRef.current) return; setMessages((prev) => prev.some((m) => m.id === msg.id) ? prev : [...prev, msg] ); if (!isOpen && msg.sender === "support") { setUnreadCount((prev) => prev + 1); } }); socket.on("unread_count", ({ chatId: cId, count }: { chatId: string; count: number }) => { if (chatIdRef.current === cId) setUnreadCount(count); }); return () => { socket.disconnect(); }; }, [user, isOpen]);

  // ---------------- INIT CHAT ----------------
  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      try {
        const { data: chat } = await axios.post(`${API_BASE}/chat/init`, { user_id: user.id });
        setChatId(chat.id);
        chatIdRef.current = chat.id;

        socketRef.current?.emit("join_chat", { chatId: chat.id });

        const { data: prev } = await axios.get(`${API_BASE}/chat/${user.id}/${chat.id}/messages`);
        setMessages(prev);

        const { data } = await axios.get(`${API_BASE}/chat/${user.id}/unread-count`);
        setUnreadCount(data.unread || 0);

        // scroll to bottom
        setTimeout(scrollToEnd, 100);
      } catch (err) {
        console.error("Chat init failed:", err);
      }
    };

    initChat();
  }, [user]);

  // ---------------- MARK READ ----------------
  const markAsRead = async () => {
    if (!user || !chatId) return;
    try {
      await axios.post(`${API_BASE}/chat/${user.id}/${chatId}/read`);
      setUnreadCount(0);
    } catch (err) {
      console.error("Mark read failed");
    }
  };

  // ---------------- TOGGLE CHAT ----------------
  const toggleChat = async () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next) await markAsRead();
    setTimeout(scrollToEnd, 100);
  };

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async () => {
    if (!input.trim() || !chatId || !user) return;
    const text = input.trim();
    setInput("");

    try {
      const { data } = await axios.post(`${API_BASE}/chat/${user.id}/${chatId}/message`, { message: text });
      setMessages((prev) => [...prev, data]);
 setTimeout(scrollToEnd, 100);
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  // ---------------- AUTO SCROLL ----------------
  const scrollToEnd = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed top-20 right-0 bg-yellow-400 text-black px-4 py-3 rounded-full shadow-lg font-bold z-[9999] relative"
      >
        💬 My SMS
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[520px] bg-[#0b0b0b] border border-yellow-500 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999]">
          {/* Header */}
          <div className="bg-yellow-400 text-black px-4 py-3 font-bold flex justify-between items-center">
            <span>Live Support</span>
            <span className="text-xs">
              Status: {onlineUsers.includes(user?.id || 0) ? "Online" : "Offline"}
            </span>
            <button onClick={toggleChat}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
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
              className="bg-yellow-400 text-black px-4 rounded-lg font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}