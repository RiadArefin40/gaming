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
      {loading && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-md" />
      )}

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
