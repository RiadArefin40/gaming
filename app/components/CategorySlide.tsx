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
const selectedCategory = categories[selected].name.toLowerCase();
const imagesToShow = selectedCategory === "exclusive" ? gameImages.exclusive : gameImages.casino;
const isExclusive = selectedCategory === "exclusive";
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
{isExclusive ? (
  // Exclusive games grid
  <div className="grid grid-cols-3 gap-3 my-4 px-4">
    {gameImages.exclusive.map((game) => (
      <div
        key={game.id}
        className="flex items-center justify-center rounded-xl"
      >
        <img
          src={game.src}
          alt="exclusive-game"
          className="w-full h-auto object-contain"
        />
      </div>
    ))}
  </div>
) : (
  // Casino/provider cards
  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>
)}


      <div className="flex justify-center ">
        <button
          // onClick={() => router.push("/login")}
          className="px-3 w-[172px] h-[55px] py-[6px] text-lg font-medium bg-orange-400 text-white font-medium rounded hover:bg-blue-600 "
        >
          More
        </button>
      </div>
    </div>
  );
}
