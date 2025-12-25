"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
interface GameItem {
  id: number | string;
  title: string;
  src: string;
}

interface GameGridProps {
  items: GameItem[];
}

// Simple slugify function
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, "");    // remove leading/trailing hyphens
}

export function GameGrid({ items }: GameGridProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const [loadingText, setLoadingText] = useState("Launching game...");
  const handleClick = async (title: string) => {
    const slug = slugify(title);
    console.log('gamegrid', title )
    if(slug == 'pragmatic-play'){

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
          game_uid: "e58e145313cf8c3a41a2240c1579b735",
          credit_amount: 100,
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

    }
    else{
    const slug = slugify(title);
    router.push(`/games/${slug}`);
    }

    
  };

  return (
    <>


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
          data-card
          key={item.id}
          onClick={() => handleClick(item.title)}
          className="
            pt-2 p-1
            transition-all duration-300 ease-out border
            bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
            border-slate-700
            cursor-pointer hover:scale-105
          "
        >
          <div className="flex items-center px-4 gap-2">
            <img className="w-8" src={item.src} alt={item.title} />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
    
    </>
  
  );
}
