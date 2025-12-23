"use client";
import { useState } from "react";

interface GameItem {
  id: number | string;
  title: string;
  src: string;
  uid: string;
}

interface SportsGridProps {
  items: GameItem[];
}

export function SportsGrid({ items }: SportsGridProps) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Launching game...");

  const handleClick = async (item: GameItem) => {
    if (loading) return;

    setLoading(true);
    setLoadingText("Preparing game session...");

    try {
      const res = await fetch("/api/launch_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          userName: "player123",
          game_uid: item.uid,
          credit_amount: 1200,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.gameUrl) {
        setLoadingText("Opening game…");

        // ✅ Open game in new tab
        window.open(data.gameUrl, "_blank", "noopener,noreferrer");
      } else {
        alert(data.error || "Failed to launch game");
      }
    } catch (error) {
      console.error("Error launching game:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
            <p className="text-sm text-gray-200 animate-pulse">
              {loadingText}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`
              pt-2 p-1 transition-all duration-300 ease-out border
              bg-gradient-to-br from-slate-800 to-slate-900
              border-slate-700 cursor-pointer hover:scale-105
              ${loading ? "pointer-events-none opacity-50" : ""}
            `}
          >
            <div className="flex items-center px-4 gap-2">
              <img className="w-8" src={item.src} alt={item.title} />
              <span className="text-sm font-medium text-slate-300">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
