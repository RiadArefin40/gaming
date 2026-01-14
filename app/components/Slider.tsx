"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  siteInfo: any;
  autoPlay?: boolean;
  interval?: number;
}



export default function Slider({
  siteInfo,
  autoPlay = true,
  interval = 5000,
}: SliderProps) {
  const router = useRouter();

  // const siteInfo: any[] = Array.isArray(siteInfo)
  //   ? [
  //    siteInfo
  //     ]
  //   : [];
  console.log('slider',siteInfo)
  const pages = useMemo(() => {
    if (!siteInfo.length) return [];
    const res: any[][] = [];
    const len = siteInfo.length;
    for (let i = 0; i < len; i += 2) {
      const first = siteInfo[i];
      const second = siteInfo[i + 1] ?? siteInfo[(i + 1) % len];
      res.push([first, second]);
    }
    return res;
  }, [siteInfo]);

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

  // Auto-play effect
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

  // Touch swipe state
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
        if (deltaX > 0) next(); // swipe left
        else prev(); // swipe right
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
    <div
      dir="ltr"
      className="mt-1  relative h-[190px] sm:h-[220px] md:h-[240px] w-full overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* track */}
      <div
        className="flex h-full  transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {pages.map((page, pageIdx) => (
          <div key={pageIdx} className="w-full h-full flex-shrink-0 flex">
            {page.map((item: any, itemIdx: number) => (
              <button
                key={itemIdx}
                type="button"
                className={`relative h-full flex-1 focus:outline-none ${
                  itemIdx === 1 ? "hidden md:block" : ""
                }`}
              >
                <img
                  src={item?.image_url}
                  alt={item?.alt || "Qatarat banner"}
                  className="object-contain  mt-4"
                  // sizes="(max-width: 768px) 100vw, 50vw"
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        type="button"
        onClick={prev}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full text-gray-800 shadow-md focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={next}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full text-gray-800 shadow-md focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* dots */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-2 !mt-2">
        {pages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === current ? "w-8 bg-yellow-600" : "bg-gray-100"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
