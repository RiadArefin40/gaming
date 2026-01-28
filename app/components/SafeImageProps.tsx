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
<div className={`relative  ${className}`} >
  {/* Simple Loader */}



  {/* Image container */}
  <div className="relative ">
    <img
      src={imgSrc}
      alt={alt}
      className={`object-cover w-full h-[155px] transition-opacity duration-500 rounded-md ${
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

  </div>
</div>


  );
}
