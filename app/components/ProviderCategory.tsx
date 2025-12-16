"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  Star,
  Trophy,
  Dice6,
  Coins,
  Fish,
  Joystick,
  Ticket,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { gameImages } from "@/utils/gameData";
const categories = [
  { name: "Exclusive", icon: <Star /> },
  { name: "Sports", icon: <Trophy /> },
  { name: "Casino", icon: <Coins /> },
  { name: "Slot", icon: <Dice6 /> },
  { name: "Fishing", icon: <Fish /> },
  { name: "Arcade", icon: <Joystick /> },
  { name: "Lottery", icon: <Ticket /> },
];



export default function CategorySlider() {
  const [selected, setSelected] = useState(0);
   const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, "");    // remove leading/trailing hyphens
}
  const handleSelect = (idx: number, title:any) => {
    setSelected(idx);

    const container = containerRef.current;
    const item = container?.children[idx] as HTMLElement;

    item?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    const slug = slugify(title);
    router.push(`/games/${slug}`);
  };

  const scrollByCard = (direction: "left" | "right") => {
  const container = containerRef.current;
  if (!container) return;

  const card = container.querySelector(
    "[data-card]"
  ) as HTMLElement;

  if (!card) return;

  const cardWidth = card.offsetWidth + 12; // 12 = gap-3

  container.scrollBy({
    left: direction === "left" ? -cardWidth : cardWidth,
    behavior: "smooth",
  });
};


  return (
    <div className="my-4 px-4 z-50 max-w-screen">
     <div className="mb-4 flex items-center justify-between">
  <p className="text-xl border-l-4 border-orange-400 pl-4">
    Provider
  </p>

  <div className="flex gap-2">
    <button
      onClick={() => scrollByCard("left")}
      className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700
                 flex items-center justify-center text-slate-300
                 hover:bg-slate-700 transition"
    >
      <ChevronLeft size={18} />
    </button>

    <button
      onClick={() => scrollByCard("right")}
      className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700
                 flex items-center justify-center text-slate-300
                 hover:bg-slate-700 transition"
    >
      <ChevronRight size={18} />
    </button>
  </div>
</div>

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
  
  no-scrollbar
        "
      >
        {gameImages.casino.map((item, idx) => {
          const isActive = idx === selected;

          return (
            <div
              data-card
              key={item.id}
              onClick={() => handleSelect(idx,item.title)}
              className={`
    snap-center
    flex-shrink-0 basis-[48%]   
max-w-[48%]  pt-2 p-1
   
    flex flex-col items-center justify-center
    cursor-pointer select-none
    transition-all duration-300 ease-out
    border
           bg-gradient-to-br from-slate-800 to-slate-900
          text-slate-300
   
          border-slate-700
   
  `}
            >
              <div

              >
                <div className=" flex items-center"> 
                      <img className="w-12" src={item.src} alt="" />
                      <span className="text-sm font-medium">{item.title}</span>
                </div>
    
              </div>

            
            </div>
          );
        })}
      </div>


    </div>
  );
}
