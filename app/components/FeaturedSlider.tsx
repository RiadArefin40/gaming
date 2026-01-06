"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExclusiveGrid } from "./ExclusiveGrid";
import { ex } from "@/utils/exclusive";
import { featured } from "@/utils/featured";

interface SliderProps {
  siteInfo: any;
  autoPlay?: boolean;
  interval?: number;
}

export default function FeaturedSlider({
  siteInfo,
  autoPlay = true,
  interval = 3000,
}: SliderProps) {
  const router = useRouter();

  const sliderItems: any[] = Array.isArray(siteInfo?.slider_items)
    ? [
        ...siteInfo.slider_items,
        ...siteInfo.slider_items,
        ...siteInfo.slider_items,
      ]
    : [];

  // Create pages with 3 items per slide
  const pages = useMemo(() => {
    if (!sliderItems.length) return [];
    const res: any[][] = [];
    const len = sliderItems.length;
    for (let i = 0; i < len; i += 3) {
      const first = sliderItems[i];
      const second = sliderItems[i + 1] ?? sliderItems[(i + 1) % len];
      const third = sliderItems[i + 2] ?? sliderItems[(i + 2) % len];
      res.push([first, second, third]);
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

  // Auto-play
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
  }, [current, autoPlay, isHovering, total, interval]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) next();
        else prev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!total) {
    return (
      <div className="mt-4">
        <div className="h-[200px] sm:h-[220px] md:h-[240px] w-full rounded-lg bg-gray-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-0">
         <div className="mb-4 flex items-center justify-between">
  <p className="text-xl border-l-4 border-orange-400 pl-4">
    Featured
  </p>

  <div className="flex gap-2">
    <button
    //   onClick={() => scrollByCard("left")}
      className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700
                 flex items-center justify-center text-slate-300
                 hover:bg-slate-700 transition"
    >
      <ChevronLeft size={18} />
    </button>

    <button
    //   onClick={() => scrollByCard("right")}
      className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700
                 flex items-center justify-center text-slate-300
                 hover:bg-slate-700 transition"
    >
      <ChevronRight size={18} />
    </button>
  </div>
</div>

      <div
        dir="ltr"
        className="relative mt-4  w-full overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* track */}
        {/* <div
          className="flex  transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="w-full  flex flex-shrink-0 justify-between gap-2"
            >
              {page.map((item: any, itemIdx: number) => (
                <button
                  key={itemIdx}
                  type="button"
                  className="relative h-[120px] focus:outline-none"
                >
                  <img
                    src={item?.imageUrl}
                    alt={item?.alt || "Qatarat banner"}
                    className="object-cover rounded-md w-full h-full"
                    // sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </button>
              ))}
            </div>
          ))}
        </div> */}

        <ExclusiveGrid items={featured}/>

        {/* arrows */}
        <button
          type="button"
          onClick={prev}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full text-gray-800 shadow-md focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={next}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full text-gray-800 shadow-md focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>

        {/* dots */}
       
      </div>
    </div>
  );
}
