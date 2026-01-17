"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuthUser } from "@/lib/auth";
// const user = getAuthUser()
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

export function CrashCol({ items }: GameGridProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const [loadingText, setLoadingText] = useState("Launching game...");
    const handleClick = async (item: any) => {
    const slug = slugify(item.title);
    router.push(`/crash/${slug}`);
    

    
  };

  return (
    <>


       {loading && (
  <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="relative flex flex-col items-center justify-center gap-4">

      {/* Rotating gradient rings with text inside */}
      <div className="relative w-28 m-1 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-200 opacity-40 blur-xl animate-spin-slow" />
        <div className="absolute inset-0 rounded-full border-3 border-white border-t-transparent animate-spin shadow-lg" />
        <div className="absolute inset-0  rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />

        {/* Center text */}
       <span className="relative text-yellow-400 text-md font-bold drop-shadow-lg">
          Bajiraj
        </span>
      </div>


      {/* Sparkling stars around */}

  


    </div>
  </div>
)}

        <div className="grid grid-cols-1">
      {items.map((item) => (
        <div
          data-card
          key={item.id}
          onClick={() => handleClick(item)}
          className="
            pt-2 p-1
            rounded-lg
            transition-all duration-300 ease-out 
            bg-transparent
            cursor-pointer hover:scale-105
          "
        >
          <div className="flex flex-col items-center  gap-2">
            <img className="w-14" src={item.src} alt={item.title} />
            <p className="text-lg font-medium">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
    
    </>
  
  );
}
