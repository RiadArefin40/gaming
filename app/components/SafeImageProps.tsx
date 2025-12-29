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
<div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
  {/* Simple Loader */}
  {loading && (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-md z-50">
      
      {/* Rotating neon ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-orange-500 opacity-50 blur-md animate-spin-slow" />
        <span className="relative text-white text-lg font-bold drop-shadow-md animate-pulse">
          Bajiraj
        </span>
      </div>
    </div>
  )}

  {/* Image container */}
  <div className="relative ">
    <img
      src={imgSrc}
      alt={alt}
      className={`object-cover  transition-opacity duration-500 rounded-md ${
        loading ? "opacity-0" : "opacity-100"
      }`}
      onLoad={() => setLoading(false)}
      onError={() => {
        setImgSrc(FALLBACK_IMAGE);
        setLoading(false);
      }}
    />

    {/* Top-right badge */}
    {/* <img
      src={imgSrc}
      alt={alt}
      className={`h-8 w-8 rounded-full opacity-80 absolute top-0 right-2 transition-opacity duration-500 ${
        loading ? "opacity-0" : "opacity-80"
      }`}
      onLoad={() => setLoading(false)}
      onError={() => {
        setImgSrc(FALLBACK_IMAGE);
        setLoading(false);
      }}
    /> */}

    {/* Bajiraj label */}
    <div className="absolute top-0 right-0 px-2 py-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-400 text-white font-semibold text-sm rounded-lg shadow-lg drop-shadow-lg">
      Bajiraj
    </div>
  </div>
</div>


  );
}
