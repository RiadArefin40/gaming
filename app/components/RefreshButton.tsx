"use client";
import { useState } from "react";
import { RotateCw } from "lucide-react";

interface RefreshButtonProps {
  balance: number | string;
  onRefresh: () => Promise<void>;
  loading:boolean;
}

export default function RefreshButton({ balance, onRefresh, loading }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}       // Desktop click
      onTouchStart={handleRefresh}  // Mobile touch
      onPointerDown={handleRefresh} // Pointer devices
      className="flex items-center gap-2 px-2 h-9 rounded-md -ml-3  hover:bg-slate-700 transition-colors duration-300 select-none"
    >
      <div className="flex  items-center gap-4 pointer-events-auto">
        {/* Balance Icon */}
        <div className="relative h-9 w-9 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-800 shadow-[inset_0_2px_2px_rgba(255,255,255,0.35),_0_3px_6px_rgba(0,0,0,0.45)]">
          <div
            className="absolute inset-1 rounded-full 
              bg-gradient-to-b from-yellow-700 to-yellow-400
              shadow-[inset_0_3px_4px_rgba(0,0,0,0.55),inset_0_-1px_1px_rgba(255,255,255,0.25)]
              flex items-center justify-center"
          >
     
            <img className="bg-yellow-400 p-1 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETDA86E-C-bE5dYwOP36otJe_6tx1uPT9yRznfp2m5w&s=10" alt="" />
          </div>
          <div className="absolute top-[6px] left-[7px] h-[2px] w-4 rounded-full bg-white/25 blur-[1px]" />
        </div>

        {/* Balance */}
        <span className="text-lg font-lexend -ml-3 text-slate-800 font-bold"> {loading? " ----- " : balance}</span>

        {/* Refresh Icon */}
        <RotateCw
          size={16}
          className={`transition-transform text-slate-700 font-bold mt-[2px] -ml-3 duration-500 ${loading? "animate-spin" : ""}`}
        />
      </div>
      
    </button>
  );
}
