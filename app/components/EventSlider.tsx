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
import Slider from "./Slider";
interface SliderProps {
  siteInfo: any;
  autoPlay?: boolean;
  interval?: number;
}
    const siteInfo = {
    slider_items: [
 


  { id: 4, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" , alt: "Slide 1"},


    ],
  };
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
  event:[
    {id:1, src:"https://img.j189eb.com/upload/announcement/image_281195.jpg&quot"},
       {id:2, src:"https://img.j189eb.com/upload/announcement/image_281195.jpg&quot"},
  ]
};

// reuse casino images for other categories
gameImages.slot = gameImages.casino;
gameImages.fishing = gameImages.casino;
gameImages.arcade = gameImages.casino;
gameImages.lottery = gameImages.casino;

export default function EventSlider({
  siteInfo,
  autoPlay = true,
  interval = 5000,
}: SliderProps) {
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
    <div className="my-4 px-2 z-50">
     <div className="flex items-center justify-between -mb-2">
  <p className="text-lg border-l-4 border-yellow-300 pl-3">
    Favourite
  </p>

  {/* <div className="flex gap-2">
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
  </div> */}
</div>

    <Slider siteInfo={siteInfo}  autoPlay={true} interval={4000} />


    </div>
  );
}
