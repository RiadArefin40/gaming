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
  Plane,
} from "lucide-react";
import { gameImages } from "@/utils/gameData";
import { CasinoGrid } from "./CasinoGrid";
import { ex } from "@/utils/exclusive";
import { ExclusiveGrid } from "./ExclusiveGrid";
import { SportsGrid } from "./SportsGrid";
import { SlotGrid } from "./SlotGrid";
import { CrashGrid } from "./CrashGrid";
import { FishingGrid } from "./FishingGrid";
import { ArcadeGrid } from "./ArcadeGrid";
import { LotteryGrid } from "./LotteryGrid";


const categories = [
  { id: 1, name: "Exclusive", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-hotgame.svg?v=1767782599110&quot" },
  { id: 2, name: "Sports", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-sport.svg?v=1767782599110&quot"  },
  { id: 3, name: "Casino", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-casino.svg?v=1767782599110&quot"  },
  { id: 4, name: "Slot", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-slot.svg?v=1767782599110&quot"  },
  { id: 5, name: "Crash", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-crash.svg?v=1767782599110&quot"  },
  { id: 6, name: "Fishing", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-hotgame.svg?v=1767782599110&quot"  },
  { id: 7, name: "Arcade", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-arcade.svg?v=1767782599110&quot"  },
  { id: 8, name: "Lottery", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-lottery.svg?v=1767782599110&quot"  },
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
    <div
      className="py-4 px-0 max-w-screen                                                 
     z-50 -mt-4"
    >
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
        px-1
bg-yellow-300 rounded-sm bg-gradient-to-t from-black/20 to-transparent
        no-scrollbar
      pt-3
      pb-1
     
        "
      >
        {categories.map((item, idx) => {
          const isActive = idx === selected;

          return (
            <div    key={idx} className="relative rounded-xl max-w-screen -mt-2  pb-[0px]  animate-gradient-glow">
              <div className="rounded-sm overflow-hidden    ">
                <div
               
                  onClick={() => handleSelect(idx)}
                  className={`
                snap-center
                flex-shrink-0 w-12 pt-[6px]
                w-[85px]
                flex flex-col items-center justify-center
                cursor-pointer select-none py-1
               
                  ${
                                isActive
                                  ? `
                         bg-slate-800 rounded-sm
                              
                                  `
                                  : `
                                  
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
                              
                             
                                   
                              
                                    text-yellow-300
                                    hover:translate-y-[-2px]
                                 
                              
                                  `
                                  : `
                                  
                                                    
                                 
                                    text-slate-900
                                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]
                                  `
                              }
                            `}
                  >
                   <img    className={`
                        
                              ${
                                isActive
                                  ? `
                              
                             bg-yellow-300
                                rounded-full
                                p-[1px]
                              
                                  `
                                  : `
                         
                                  `
                              }
                            `}  src={item.icon || ''} alt="" />
                  </div>

                  <span className={`text-xs uppercase font-medium    ${
                                isActive
                                  ? `
                           text-yellow-300
                              
                                  `
                                  : `
                           text-slate-900
                                  `
                              }` } >{item.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCategory === "exclusive" && <ExclusiveGrid items={ex} />}
      {selectedCategory === "sports" && (
        <SportsGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}
      {selectedCategory === "casino" && (
        <CasinoGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}
      {selectedCategory === "slot" && (
        <SlotGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}
            {selectedCategory === "crash" && (
        <CrashGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}
                  {selectedCategory === "fishing" && (
        <FishingGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}
                        {selectedCategory === "arcade" && (
        <ArcadeGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}
                              {selectedCategory === "lottery" && (
        <LotteryGrid
          items={
            activeGamesMap[selectedCategory as keyof typeof activeGamesMap]
          }
        />
      )}

      {/* {(selectedCategory !== "exclusive" && selectedCategory !== "sports")  && (
           <CasinoGrid items={activeGamesMap[selectedCategory as keyof typeof activeGamesMap]} />
        )} */}
    </div>
  );
}
