"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const segments: string[] = [
  "৳188",
  "৳38",
  "৳15",
  "2 Spins",
  "3000 Points",
];

export default function SpinWheel() {
  const router = useRouter();

  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  const size = 320;
  const center = size / 2;
  const radius = size / 2;
  const angle = 360 / segments.length;

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setWinner(null);

    const index = Math.floor(Math.random() * segments.length);
    const extra = 360 * 6;
    const targetRotation = extra + (360 - index * angle - angle / 2);

    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setWinner(segments[index]);
      setSpinning(false);
    }, 4500);
  };

  const createSlice = (startAngle: number, endAngle: number) => {
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

  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black-800 text-white px-4">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl
        bg-black/40 backdrop-blur border border-yellow-400/40
        hover:border-yellow-400 hover:bg-black/60 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-yellow-400 mb-6 tracking-wider">
        SPIN & WIN
      </h1>

      {/* POINTER */}
      <div className="relative z-20 mb-[-25px]">
        <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent border-b-yellow-400" />
      </div>

      {/* WHEEL */}
      <div className="relative">
        <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 shadow-[0_0_35px_gold]">

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
                  <path
                    d={createSlice(startAngle, endAngle)}
                    fill={i % 2 === 0 ? "url(#yellowGrad)" : "url(#tealGrad)"}
                    stroke="#111"
                    strokeWidth="2"
                  />

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
            {spinning ? "WAIT" : "SPIN"}
          </button>
        </div>
      </div>

      {/* WIN MESSAGE */}
      {winner && (
        <div className="mt-6 text-xl font-bold text-yellow-300 animate-pulse">
          🎉 You won {winner}
        </div>
      )}

      {/* PRIZE LIST */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-center text-lg font-semibold text-yellow-400 mb-4">
          Available Rewards
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {segments.map((item, i) => {
            const isWinner = item === winner;

            return (
              <div
                key={i}
                className={`p-3 rounded-xl border text-center font-semibold transition-all
                ${
                  isWinner
                    ? "bg-yellow-400 text-black border-yellow-300 shadow-[0_0_15px_gold] scale-105"
                    : "bg-[#111] border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_10px_gold]"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
