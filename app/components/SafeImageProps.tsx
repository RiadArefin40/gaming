"use client";

import Image from "next/image";
import { useState } from "react";

type SafeImageProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function SafeImage({
  src,
  alt = "image",
  width = 300,
  height = 150,
  className = "",
}: SafeImageProps) {
  const FALLBACK_IMAGE = "/images/demo.png"; // put this in /public/images/

  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loader */}
      {loading && <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/70 backdrop-blur-md">
    <div className="relative flex flex-col items-center justify-center gap-4">

      {/* Rotating gradient rings with text inside */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 opacity-40 blur-xl animate-spin-slow" />
        <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin shadow-lg" />
        <div className="absolute inset-0 rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />

        {/* Center text */}
        <span className="relative text-white text-xl font-bold drop-shadow-lg">
          Bajiraj
        </span>
      </div>

      {/* Floating dots around spinner */}
      <div className="absolute w-40 h-40 flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-tr from-purple-400 via-pink-500 to-orange-400 rounded-full animate-bounce"
            style={{
              transform: `rotate(${i * 30}deg) translateX(5rem)`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkling stars around */}
      <div className="absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.5 + Math.random()}s`,
            }}
          />
        ))}
      </div>


    </div>
  </div>}

<div className="relative w-full "> {/* Set your container size */}
  <img
    src={imgSrc}
    alt={alt}
    className={`object-cover transition-opacity duration-300 ${
      loading ? "opacity-0" : "opacity-100"
    }`}
    onLoad={() => setLoading(false)}
    onError={() => {
      setImgSrc(FALLBACK_IMAGE);
      setLoading(false);
    }}
  />
    <img
    src={imgSrc}
    alt={alt}
    className= "h-8 rounded-full w-8 opacity-80 absolute top-0 right-1"
    onLoad={() => setLoading(false)}
    onError={() => {
      setImgSrc(FALLBACK_IMAGE);
      setLoading(false);
    }}
  />
  <div
      className= "h-6 rounded-full  text-slate-100 absolute top-0 left-2"
  >
    Bajiraj
  </div>


</div>
    </div>
  );
}
