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
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
      )}

<div className="relative w-full h-[150px]"> {/* Set your container size */}
  <Image
    src={imgSrc}
    alt={alt}
    fill
    className={`object-cover transition-opacity duration-300 ${
      loading ? "opacity-0" : "opacity-100"
    }`}
    onLoad={() => setLoading(false)}
    onError={() => {
      setImgSrc(FALLBACK_IMAGE);
      setLoading(false);
    }}
  />
</div>
    </div>
  );
}
