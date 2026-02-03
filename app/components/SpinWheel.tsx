import { useState } from "react";

const segments = [
  { label: "iPhone 17", color: "#f97316" },
  { label: "৳1000", color: "#22c55e" },
  { label: "৳188", color: "#eab308" },
  { label: "৳38", color: "#06b6d4" },
  { label: "৳15", color: "#8b5cf6" },
  { label: "2 Spins", color: "#ef4444" },
];

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = async () => {
    if (spinning) return;

    setSpinning(true);

    // 🔥 simulate backend result
    const resultIndex = Math.floor(Math.random() * segments.length);

    const segmentAngle = 360 / segments.length;

    // rotate multiple rounds + land on result
    const extraRotation = 360 * 5;
    const targetRotation =
      extraRotation + (360 - resultIndex * segmentAngle);

    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setSpinning(false);
      alert("You won: " + segments[resultIndex].label);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-6">

      {/* Pointer */}
      <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-yellow-400 z-10" />

      {/* Wheel */}
      <div
        className="w-80 h-80 rounded-full border-8 border-yellow-400 relative transition-transform duration-[4000ms] ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {segments.map((seg, i) => {
          const angle = 360 / segments.length;
          return (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${i * angle}deg)`,
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center text-white font-bold"
                style={{
                  background: seg.color,
                  transform: `rotate(${angle / 2}deg) skewY(${90 - angle}deg)`,
                }}
              >
                {seg.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="bg-yellow-400 px-8 py-3 rounded text-black font-bold"
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
