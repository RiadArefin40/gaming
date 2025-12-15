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
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const categories = [
  { name: "Exclusive", icon: <Star /> },
  { name: "Sports", icon: <Trophy /> },
  { name: "Casino", icon: <Coins /> },
  { name: "Slot", icon: <Dice6 /> },
  { name: "Fishing", icon: <Fish /> },
  { name: "Arcade", icon: <Joystick /> },
  { name: "Lottery", icon: <Ticket /> },
];

const gameImages: Record<string, { id: number; src: string }[]> = {
  exclusive: [
    {
      id: 1,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-super-tiger.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 2,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-sexy-baccarat.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 3,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-7-up-7-down.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 4,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-7-up-7-down.png?v=1765526091482&source=drccdnsrc",
    },
  ],

  sports: [
    {
      id: 1,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-exchange.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 2,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-sportbook.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 3,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-horsebook.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 4,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-sbtech.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 5,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-cmd.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 6,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-cmd.svg?v=1765526091482&source=drccdnsrc",
    },
  ],

  casino: [
    {
      id: 1,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/menu-type/active/icon-casino.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 2,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-evo.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 3,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-awcmpp.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 4,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-awcmpp.png?v=1765526091482&source=drccdnsrc",
    },
  ],

  // 👇 same common images reused
  slot: [],
  fishing: [],
  arcade: [],
  lottery: [],
};

// reuse casino images for other categories
gameImages.slot = gameImages.casino;
gameImages.fishing = gameImages.casino;
gameImages.arcade = gameImages.casino;
gameImages.lottery = gameImages.casino;

export default function CategorySlider() {
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="my-4 px-4 z-50">
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
              onClick={() => handleSelect(idx)}
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
                      <span className="text-sm font-medium">Provider-{item.id}</span>
                </div>
    
              </div>

            
            </div>
          );
        })}
      </div>


    </div>
  );
}
