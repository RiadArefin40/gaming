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
  width = 200,
  height = 140,
  className = "",
}: SafeImageProps) {
  const FALLBACK_IMAGE = "/images/demo.png"; // put this in /public/images/

  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);
  const [loading, setLoading] = useState(true);

  return (
<div className={`relative  ${className}`} style={{ width, height }}>
  {/* Simple Loader */}



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

    {/* SW label */}
    {!loading && (
    <div className="absolute top-0 right-0 backdrop-blur-md  bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-400 text-white font-semibold text-sm rounded-lg shadow-lg drop-shadow-lg">
     <p
  className="tracking-wider italic -mt-2 text-lg  font-extrabold text-orange-500 select-none touch-none"
  style={{
    textShadow: `
      1px 1px 0 #0e0d0cff,
      2px 2px 0 #fafafaff,
      3px 1px 0 #f0e7e2ff,
      4px 4px 6px rgba(112, 76, 76, 0.35)
    `
  }}
>
  BajiRaj
</p>
    </div>)}
  </div>
</div>


  );
}
