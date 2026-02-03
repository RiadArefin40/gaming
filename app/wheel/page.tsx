"use client";
import { useState } from "react";

const segments = [

  "৳188",
  "৳38",
  "৳15",
  "2 Spins",
  "3000 Points",
];

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const size = 320;
  const center = size / 2;
  const radius = size / 2;
  const angle = 360 / segments.length;

  const spin = () => {
    if (spinning) return;

    setSpinning(true);

    const index = Math.floor(Math.random() * segments.length);
    const extra = 360 * 6;

    const targetRotation = extra + (360 - index * angle - angle / 2);

    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setSpinning(false);
      alert("You won " + segments[index]);
    }, 4500);
  };

  // SVG arc slice generator
  const createSlice = (startAngle:any, endAngle:any) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}
      Z
    `;
  };

  function polarToCartesian(cx:any, cy:any, r:any, angleDeg:any) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        SPIN & WIN
      </h1>

      {/* POINTER */}
      <div className="relative z-20 mb-[-25px]">
        <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent border-b-yellow-400" />
      </div>

      {/* WHEEL CONTAINER */}
      <div className="relative">

        {/* OUTER GOLD RING */}
        <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 shadow-[0_0_35px_gold]">

          {/* SVG WHEEL */}
          <svg
            width={size}
            height={size}
            className="transition-transform duration-[4500ms] ease-out rounded-full border-[10px] border-yellow-400"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {segments.map((text, i) => {
              const startAngle = i * angle;
              const endAngle = (i + 1) * angle;
              const midAngle = startAngle + angle / 2;

              const textPos = polarToCartesian(
                center,
                center,
                radius * 0.6,
                midAngle
              );

              return (
                <g key={i}>
                  {/* Slice */}
                  <path
                    d={createSlice(startAngle, endAngle)}
                    fill={
                      i % 2 === 0
                        ? "url(#yellowGrad)"
                        : "url(#tealGrad)"
                    }
                    stroke="#111"
                    strokeWidth="2"
                  />

                  {/* Text */}
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    fill={i % 2 === 0 ? "#000" : "#fff"}
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  >
                    {text}
                  </text>
                </g>
              );
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="yellowGrad">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>

              <linearGradient id="tealGrad">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#134e4a" />
              </linearGradient>
            </defs>
          </svg>

          {/* SPIN BUTTON */}
          <button
            onClick={spin}
            disabled={spinning}
            className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 text-black font-bold shadow-xl border-4 border-white active:scale-95 transition"
          >
            {spinning ? <span className="text-slate-400">WAIT</span>  : "SPIN"}
          </button>
        </div>
      </div>
    </div>
  );
}
