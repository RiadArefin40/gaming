// app/.../components/Slider.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface SliderProps {
  siteInfo: any;
  autoPlay?: boolean;
  interval?: number;
}

export default function ProviderCategory({
  siteInfo,
  autoPlay = true,
  interval = 3000,
}: SliderProps) {
  const router = useRouter();

  // Always work from the original array
  const sliderItems: any[] = Array.isArray(siteInfo?.slider_items)
    ? [
        ...siteInfo.slider_items,
        ...siteInfo.slider_items,
        ...siteInfo.slider_items,
      ]
    : [];
  const [sliderPos, setSliderPos] = useState(0);

  const [selected, setSelected] = useState(0);

  const handleClick = (idx: number) => {
    if (idx === selected) return; // already selected

    setSelected(idx); // select immediately

    if (idx > selected) {
      setSliderPos((prev) => Math.min(prev + 1, categories.length - 1));
    } else if (idx < selected) {
      setSliderPos((prev) => Math.max(prev - 1, 0));
    }
  };

  const pages = useMemo(() => {
    if (!sliderItems.length) return [];

    const res: any[][] = [];
    const len = sliderItems.length;
    for (let i = 0; i < len; i += 2) {
      const first = sliderItems[i];
      const second = sliderItems[i + 1] ?? sliderItems[(i + 1) % len];
      res.push([first, second]);
    }

    return res;
  }, [sliderItems]);

  const total = pages.length;
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (index: number) => {
    if (!total) return;
    setCurrent((index + total) % total);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (!autoPlay || isHovering || total <= 1) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    timerRef.current = setTimeout(next, interval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, autoPlay, isHovering, total, interval]);

  if (!total) {
    return (
      <div className="mt-4">
        <div className="h-[200px] sm:h-[220px] md:h-[240px] w-full rounded-lg bg-gray-100 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div
        // Force this component to layout in LTR so translateX logic is stable
        dir="ltr"
        className="mt-4 relative  max-w-screen overflow-hidden rounded-lg px-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* track */}
        <div
          className="flex gap-2  h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {categories.map((item, idx) => {
            const isActive = idx === selected;
            return (
              <div
                key={item.id}
                // onClick={() => handleClick(idx)}
                className={
                "flex-shrink-0"}
              >
                <div
                  
                >
                <img src={item.src} alt="" />  {}
                </div>

                <span className="-mt-1 font-medium">{item.id}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div>

        
      </div>


    </>
  );
}
