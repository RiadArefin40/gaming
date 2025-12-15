"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";

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

//   useEffect(() => {
//   const container = containerRef.current;
//   if (!container) return;

//   const total = gameImages.casino.length;
//   let index = 0;

//   const interval = setInterval(() => {
//     index = (index + 1) % total;

//     const slide = container.children[index] as HTMLElement;
//     slide?.scrollIntoView({
//       behavior: "smooth",
//       inline: "center",
//     });
//   }, 3000); // ⏱️ 3 seconds

//   return () => clearInterval(interval);
// }, []);


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
    <div className="my-4 px-4 z-50 max-w-screen my-8">


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
  flex-shrink-0 w-full snap-center
 
   
    flex flex-col items-center justify-center
    cursor-pointer select-none
    transition-all duration-300 ease-out
  
      
          text-slate-300
   

   
  `}
            >
       <div className="w-full max-w-sm rounded-lg overflow-hidden bg-[#1c1f22] shadow-lg">
  {/* Header */}
  <div className="flex items-center justify-between bg-orange-400 px-3 py-2">
    <span className="text-sm font-semibold text-white">
      Under-19s Asia Cup
    </span>

    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
      <span className="text-white text-sm">➜</span>
    </div>
  </div>

  {/* Sub Header */}
  <div className="grid grid-cols-3 text-xs text-gray-300 px-3 py-2 border-b border-gray-700">
    <span className="text-green-400 font-semibold">IN PLAY</span>
    <span className="text-center">Back</span>
    <span className="text-center">Lay</span>
  </div>

  {/* Team 1 */}
  <div className="grid grid-cols-3 items-center px-3 py-2 gap-2">
    <span className="text-sm text-white">Sri Lanka U19</span>

    <div className="bg-sky-400 text-black text-sm font-semibold rounded px-2 py-1 text-center">
      1.75
    </div>

    <div className="bg-pink-400 text-black text-sm font-semibold rounded px-2 py-1 text-center">
      1.82
    </div>
  </div>

  {/* Team 2 */}
  <div className="grid grid-cols-3 items-center px-3 pb-3 gap-2">
    <span className="text-sm text-white">Afghanistan U19</span>

    <div className="bg-sky-400 text-black text-sm font-semibold rounded px-2 py-1 text-center">
      2.2
    </div>

    <div className="bg-pink-400 text-black text-sm font-semibold rounded px-2 py-1 text-center">
      2.34
    </div>
  </div>
</div>


            
            </div>
          );
        })}
      </div>

           {/* dots */}
      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 !mt-2">
        {gameImages.casino.map((_, idx) => (
          <button
            key={idx}
            type="button"
            // onClick={() => goTo(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === selected ? "w-6 bg-orange-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div> */}


    </div>
  );
}
