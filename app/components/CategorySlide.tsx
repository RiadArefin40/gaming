"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
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
  { name: "Slot", icon: <Dice6 /> },
  { name: "Casino", icon: <Coins /> },
  { name: "Fishing", icon: <Fish /> },
  { name: "Arcade", icon: <Joystick /> },
  { name: "Lottery", icon: <Ticket /> },
];

export default function CategorySlider() {
  const [selected, setSelected] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setSliderPos((prev) => Math.min(prev + 1, categories.length - 1)),
    onSwipedRight: () =>
      setSliderPos((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  const handleClick = (idx: number) => {
    if (idx === selected) return; // already selected

    setSelected(idx); // select immediately

    if (idx > selected) {
      setSliderPos((prev) => Math.min(prev + 1, categories.length - 1));
    } else if (idx < selected) {
      setSliderPos((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="relative max-w-screen px-2 py-6 bg-gray-600 mt-4 overflow-hidden">
      <div
        {...handlers}
        className="flex gap-3 transition-transform duration-300"
        style={{
          transform: `translateX(-${sliderPos * 7.5}rem)`,
        }}
      >
        {categories.map((item, idx) => {
          const isActive = idx === selected;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(idx)}
              className={`
                flex-shrink-0 w-28 h-20 rounded-xl flex flex-col
                items-center justify-center cursor-pointer select-none
                transition-all duration-300 shadow-md
                ${isActive ? "bg-orange-400 animate-pulse text-white scale-105" : "bg-gray-900 text-gray-300 hover:bg-gray-700"}
              `}
            >
              {/* <div
                className={`w-7 h-7 mb-1 ${isActive ? "animate-pulse text-white" : "text-gray-300"}`}
              >
                {item.icon}
              </div> */}
              <div
  className={`
    w-7 h-7 mb-1 flex items-center justify-center
    rounded-full transition-all duration-300
    ${isActive ? "animate-pulse w-10 h-10 border-4 border-white text-gray-100" : "w-7 h-7 border-none text-gray-300"}
  `}
>
  {item.icon}
</div>

              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
