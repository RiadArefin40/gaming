"use client";

import { useRef, useState } from "react";
import {
  Star,
  Trophy,
  Dice6,
  Coins,
  Fish,
  Joystick,
  Ticket,
  Plane
} from "lucide-react";
import { gameImages } from "@/utils/gameData";
import { GameGrid } from "./GameGrid";
import { ExclusiveGrid } from "./ExclusiveGrid";
const categories = [
  {id:1, name: "Exclusive", icon: <Star /> },
  {id:2, name: "Sports", icon: <Trophy /> },
  {id:3, name: "Casino", icon: <Coins /> },
  {id:4, name: "Slot", icon: <Dice6 /> },
  {id:5, name: "Crash", icon: <Plane /> },
  {id:6, name: "Fishing", icon: <Fish /> },
  {id:7, name: "Arcade", icon: <Joystick /> },
  {id:8, name: "Lottery", icon: <Ticket /> },

];
const activeGamesMap = {
  sports: gameImages.sports,
  casino: gameImages.casino,
  slot: gameImages.slot,
  crash: gameImages.crash,
  fishing: gameImages.fishing,
  arcade: gameImages.arcade,
  lottery: gameImages.lottery,
};




export default function CategorySlider() {
    const [selected, setSelected] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedCategory = categories[selected].name.toLowerCase();


    const handleSelect = (idx: number) => {
      setSelected(idx);
      const container = containerRef.current;
      const item = container?.children[idx] as HTMLElement;
      item?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    };


  return (
    <div className="my-4  z-50">
      <div
        ref={containerRef}
        className="
        flex gap-3
        overflow-x-auto 
        scroll-smooth
        snap-x snap-mandatory
        touch-pan-x
        overscroll-x-contain
        max-w-screen
        px-4
        no-scrollbar
        "
      >
        {categories.map((item, idx) => {
          const isActive = idx === selected;

          return (
            <div
              key={item.name}
              onClick={() => handleSelect(idx)}
              className={`
                snap-center
                flex-shrink-0 w-28  pt-2 p-1
                rounded-2xl
                flex flex-col items-center justify-center
                cursor-pointer select-none
                transition-all duration-300 ease-out
                border
                ${
                  isActive
                    ? `
                    
                      text-white 
                      border-orange-300
                      hight-[88px]
                      bg-gradient-to-br from-orange-400 to-orange-500
                    `
                    : `
                      bg-gradient-to-br from-slate-800 to-slate-900
                      text-slate-300
                      h-[80px]
                      border-slate-700
                    

                
                    `
                }
              `}
                        >
                          <div
                            className={`
                              flex items-center justify-center mb-1
                              rounded-full transition-all duration-300
                              ${
                                isActive
                                  ? `
                                    w-9 h-9
                                    bg-white/15
                                  scale-115
                                    text-white
                                    hover:translate-y-[-2px]
                                    bg-slate-200
                              
                                  `
                                  : `
                                    w-8 h-8
                                    bg-black/30
                                    text-slate-300
                                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]
                                  `
                              }
                            `}
                          >
                {item.icon}
              </div>

              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>
        {selectedCategory === "exclusive" && (
          <ExclusiveGrid items={gameImages.exclusive} />
        )}

        {selectedCategory !== "exclusive" && (
          <GameGrid items={activeGamesMap[selectedCategory as keyof typeof activeGamesMap]} />
        )}
    </div>
  );
}
