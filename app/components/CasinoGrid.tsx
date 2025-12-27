"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuthUser } from "@/lib/auth";
const user = getAuthUser()
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

export function CasinoGrid({ items }: GameGridProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const [loadingText, setLoadingText] = useState("Launching game...");
    const handleClick = async (item: any) => {
    const slug = slugify(item.title);
    router.push(`/casino/${slug}`);
    

    
  };

  return (
    <>


      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
            <p className="text-lg text-gray-200 animate-pulse">
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
          onClick={() => handleClick(item)}
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
            <span className="text-lg font-medium">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
    
    </>
  
  );
}
