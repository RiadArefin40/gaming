"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
interface Prize {
  id: number;
  type: "amount" | "vip_points";
  value: number;
}
type User = {
  id: number;
  name: string;
  email: string | null;
  password: string;
  created_at: string;
  full_name: any;
  dob:any
};

export default function SpinWheel() {
  const router = useRouter();
 const [user, setUser] = useState<User | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [segments, setSegments] = useState<string[]>([]);
  const [spinCost, setSpinCost] = useState<number>(0);

  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  useEffect(() => {
    const u = getAuthUser() as User | null;
    setUser(u);
  
  }, []);
  const size = 320;
  const center = size / 2;
  const radius = size / 2;

  const angle = prizes.length ? 360 / prizes.length : 0;

  // 🔵 Load prizes + settings
  useEffect(() => {
    fetch("https://api.spcwin.info/users/wheel-prizes")
      .then(res => res.json())
      .then(data => {
        setPrizes(data);

        const labels = data.map((p: Prize) =>
          p.type === "amount"
            ? `৳${p.value}`
            : `${p.value} VIP Points`
        );

        setSegments(labels);
      });

    fetch("https://api.spcwin.info/users/wheel-settings")
      .then(res => res.json())
      .then(data => setSpinCost(data.spin_cost));
  }, []);

  // 🟢 Spin Function (Backend Controlled)
  const spin = async () => {
    if (spinning) return;

    if (!user) {
      alert("Login required");
      return;
    }

    setSpinning(true);
    setWinner(null);

    try {
      const res = await fetch("https://api.spcwin.info/users/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setSpinning(false);
        return;
      }

      const prizeLabel =
        data.prize_type === "amount"
          ? `৳${data.prize_value}`
          : `${data.prize_value} VIP Points`;

      const index = segments.findIndex(s => s === prizeLabel);

      const extra = 360 * 6;
      const targetRotation =
        extra + (360 - index * angle - angle / 2);

      setRotation(prev => prev + targetRotation);

      setTimeout(() => {
        setWinner(prizeLabel);
        setSpinning(false);
      }, 4500);

    } catch (err) {
      console.error(err);
      setSpinning(false);
    }
  };

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
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

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl
        bg-black/40 border border-yellow-400/40 hover:border-yellow-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-4xl font-bold text-yellow-400 mb-2">
        SPIN & WIN
      </h1>

      <p className="mb-6 text-sm text-gray-300">
        Cost per spin: {spinCost} VIP Points
      </p>

      {/* POINTER */}
      <div className="relative z-20 mb-[-25px]">
        <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent border-b-cyan-600" />
      </div>

      {/* WHEEL */}
      <div className="relative">
        <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 shadow-[0_0_35px_gold]">

          <svg
            width={size}
            height={size}
            className="transition-transform duration-[4500ms] ease-out rounded-full border-[10px] border-yellow-700"
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
                    fill={i % 2 === 0 ? "#fde047" : "#0d9488"}
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
          </svg>

          {/* SPIN BUTTON */}
          <button
            onClick={spin}
            disabled={spinning || prizes.length === 0}
            className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-white text-black font-bold shadow-xl border-4 border-white active:scale-95 transition"
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
      <div className="mt-10 w-full max-w-md grid grid-cols-2 gap-3">
        {segments.map((item, i) => {
          const isWinner = item === winner;

          return (
            <div
              key={i}
              className={`p-3 rounded-xl border text-center font-semibold transition-all
              ${
                isWinner
                  ? "bg-yellow-400 text-black border-yellow-300 shadow-[0_0_15px_gold]"
                  : "bg-[#111] border-yellow-500/40"
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}