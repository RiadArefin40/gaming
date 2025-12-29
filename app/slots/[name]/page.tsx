"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { allGames } from "@/utils/allGames";
import { jilliSlotArray } from "@/utils/jilliSlots";
import { JdbSlotArray } from "@/utils/JdbSlots";
import { PgSlotArray } from "@/utils/pgSlots";
import SafeImage from "@/app/components/SafeImageProps";
import { getAuthUser } from "@/lib/auth";
import { evoLive } from "@/utils/evoLive";
import { jilli } from "@/utils/slots/jilli";
import { pg } from "@/utils/slots/pg";
import { jdb } from "@/utils/slots/jdb";
import { netent } from "@/utils/slots/netent";
import { playtech } from "@/utils/slots/playtech";
import { fa } from "@/utils/slots/fa";
import { cq9 } from "@/utils/slots/cq9";
import { redTiger } from "@/utils/slots/redTiger";

const user = getAuthUser();

interface Category {
  name: string;
  icon: React.ReactNode;
  label: string;
}

interface Game {
  serial: number;
  title: string;
  image: string;
  game_uid: string;
}

// Slugify helper
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Casino() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";
  const lastSegment = segments.pop() || "";
  const [showGame, setShowGame] = useState(false);
  const [gameUrl, setGameUrl] = useState(null);

  const categories: Category[] = [
    { name: "casino", label: "Casino", icon: <span>♠️</span> },
    { name: "slots", label: "Slots", icon: <span>🎰</span> },
    { name: "crash", label: "Crash", icon: <span>💥</span> },
    { name: "table", label: "Table", icon: <span>🃏</span> },
    { name: "fishing", label: "Fishing", icon: <span>🎣</span> },
    { name: "arcade", label: "Arcade", icon: <span>👾</span> },
    { name: "lottery", label: "Lottery", icon: <span>🎫</span> },
  ];

  const providers = [
    { name: "all", label: "All", icon: <span>🌐</span> },
    { name: "jilli", label: "Jili", icon: <span>♠️</span> },
    { name: "pg-soft", label: "PG Soft", icon: <span>🎰</span> },
    { name: "Jdb", label: "JDB", icon: <span>💥</span> },
    { name: "netent", label: "NetEnt", icon: <span>🎲</span> },
    { name: "playtech", label: "Playtech", icon: <span>🃏</span> },
    { name: "fa", label: "FA Chai", icon: <span>🔥</span> },
    { name: "cq", label: "CQ", icon: <span>🎯</span> },
    { name: "redtiger", label: "Red Tiger", icon: <span>🐯</span> },
  ];

  const all = [
    ...(Array.isArray(jilli) ? jilli : []),
    ...(Array.isArray(pg) ? pg : []),
    ...(Array.isArray(jdb) ? jdb : []),
    ...(Array.isArray(netent) ? netent : []),
    ...(Array.isArray(playtech) ? playtech : []),
    ...(Array.isArray(fa) ? fa : []),
    ...(Array.isArray(cq9) ? cq9 : []),
    ...(Array.isArray(redTiger) ? redTiger : []),
  ];
  const gamesWithImages: Game[] = (
    lastSegment === "jilli"
      ? jilli
      : lastSegment === "pg-soft"
      ? pg
      : lastSegment === "Jdb"
      ? jdb
      : lastSegment === "netent"
      ? netent
      : lastSegment === "playtech"
      ? playtech
      : lastSegment === "fa"
      ? fa
      : lastSegment === "cq"
      ? cq9
      : lastSegment === "redtiger"
      ? redTiger
      : all
  ).map(
    (item: any): Game => ({
      ...item,
    })
  );

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const matchedCategory = categories.find(
      (cat) => cat.name.toLowerCase() === firstSegment.toLowerCase()
    );
    return matchedCategory ? matchedCategory.label : categories[0].name;
  });

  const [selectedProvider, setSelectedProvider] = useState(() => {
    const matchedProvider = providers.find(
      (p) => p.name.toLowerCase() === lastSegment.toLowerCase()
    );
    return matchedProvider ? matchedProvider.label : providers[0].name;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [providerDropdownOpen, setProviderDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(gamesWithImages);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Launching game...");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);

  // Filter & sort games
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let filtered = gamesWithImages.filter((game: Game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filtered.sort((a, b) =>
        sortAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
      setFilteredGames(filtered);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, sortAsc]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setDropdownOpen(false);
    const slug = slugify(catName);
    console.log("slug", slug);
    router.push(`/${slug}/all`); // Uncomment if needed
  };

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    setProviderDropdownOpen(false);
    router.push(`/${firstSegment}/${provider}`);
  };
  const [data, setData] = useState(null);
  const handleGameClick = async (item: any) => {
    if (loading) return;

    setLoading(true);
    setLoadingText("Preparing game session...");

    try {
      if (!user) {
        alert("User not authenticated");
        setLoading(false);
        return;
      }

      const res = await fetch("https://api.bajiraj.cloud/launch_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          userName: user.name,
          game_uid: item.game_uid,
          credit_amount: user.wallet,
          game_type: "slot",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.gameUrl) {
       setTimeout(() => {
  setShowGame(true);
}, 3000); // 1000ms = 1 second

        setData(data.gameUrl);
        setGameUrl(data.gameUrl);
        setLoadingText("Opening game…");
        // window.open(data.gameUrl, "_blank", "noopener,noreferrer");
      } else {
        alert(data.error || "Failed to launch game");
        setShowGame(false);
      }
    } catch (error) {
      console.error("Error launching game:", error);
      setShowGame(false);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  console.log(evoLive);

  return (
    <>
  {loading && (
  <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/70 backdrop-blur-md">
    <div className="relative flex flex-col items-center justify-center gap-4">
      
      {/* Rotating gradient rings */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 opacity-40 blur-xl animate-spin-slow" />
        <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin shadow-lg" />
        <div className="absolute inset-0 rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />
      </div>

      {/* Floating dots around spinner */}
      <div className="absolute w-32 h-32 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-tr from-purple-400 via-pink-500 to-orange-400 rounded-full animate-bounce`}
            style={{
              transform: `rotate(${i * 60}deg) translateX(4rem)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <p className="mt-24 text-lg text-white font-semibold tracking-wide animate-pulse">
        {loadingText}
      </p>
    </div>
  </div>
)}

      {showGame && gameUrl && (
        <>
          {/* Close Button */}
          <button
            onClick={() => {
              setShowGame(false);
              setGameUrl(null);
            }}
            className="fixed top-4 right-4 z-[1000] flex items-center justify-center 
                 w-10 h-10 rounded-full 
                 bg-black/60 backdrop-blur-md 
                 text-white hover:bg-red-500 
                 transition-all duration-200 
                 hover:scale-110 shadow-lg"
            aria-label="Close Game"
          >
            ✕
          </button>

          {/* Game Frame */}
          <iframe
            src={gameUrl}
            className="fixed inset-0 w-full h-full border-0 z-[998]"
            allow="fullscreen"
          />
        </>
      )}

      {!showGame && (
         <div className="p-2 pt-[67px] ">
          <div className="sticky h-[60px] top-2 z-50">
            <div className="flex items-center gap-2 justify-between">
              {/* Provider Dropdown */}
              <div className="relative mt-[8px]">
            <button
  onClick={() => setProviderDropdownOpen(!providerDropdownOpen)}
  className="flex w-full -ml-1 min-w-[180px]  h-10 items-center justify-between font-semibold px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
>
  <div className="flex items-center space-x-2">
    {/* Provider icon */}
    {providers.find((p) => p.label == selectedProvider)?.icon}

    {/* Provider label */}

    <span>
  {(() => {
    const label =
      providers.find((p) => p.name === selectedProvider)?.label ||
      selectedProvider;
    return label.length > 9 ? label.slice(0, 9) + " .." : label;
  })()}
</span>

  </div>

  {/* Dropdown arrow */}
  <span className="pl-2">{providerDropdownOpen ? "▲" : "▼"}</span>
</button>

                {providerDropdownOpen && (
                  <div className="absolute w-full bg-gray-700 rounded-md shadow-lg z-10">
                    {providers.map((p, i) => (
                      <div
                        key={i}
                        onClick={() => handleProviderSelect(p.name)}
                        className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-600 ${
                          selectedProvider === p.label ? "bg-slate-400" : ""
                        }`}
                      >
                        {p.icon} <span>{p.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                                       <div className="flex  h-10 flex-col sm:flex-row items-start sm:items-center justify-between text-white py-2 rounded-md -mt-[8px]">
  <div className="relative flex items-center">
    {searchOpen && (
      <>
        {/* Magnifying glass icon */}
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        {/* Input field */}
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8  h-10 px-3 w-full py-1 flex-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </>
    )}
  </div>
</div>
        
              {/* <div className="relative mt-2">
                 <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="flex min-w-[150px] h-10 -mt-4 items-center space-x-1 font-semibold px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
>

  {categories.find((c) => c.label == selectedCategory)?.icon}
  

  <span>
    {categories.find((c) => c.name == selectedCategory)?.label || selectedCategory}
  </span>
  

  <span className="pl-8">{dropdownOpen ? "▲" : "▼"}</span>
</button>
                {dropdownOpen && (
                  <div className="absolute w-full bg-gray-700 rounded-md shadow-lg z-10">
                    {categories.map((cat, i) => (
                      <div
                        key={i}
                        onClick={() => handleCategorySelect(cat.label)}
                        className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-600 ${
                          selectedCategory === cat.name ? "bg-slate-400" : ""
                        }`}
                      >
                        {cat.icon} <span>{cat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            </div>

            {/* Search */}


          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-700 rounded-lg h-32 sm:h-40 md:h-48"
                  />
                ))
              : filteredGames.map((game, i) => (
                  <div
                    key={i}
                    onClick={() => handleGameClick(game)}
                    className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-200"
                  >
                    <SafeImage
                      src={game.image}
                      width={130}
                      height={170}
                      className="rounded-[10px]"
                    />
                    {/* <div className="-mt-6 bg-slate-800 h-8 text-slate-200 text-white text-center py-1 text-lg sm:text-base">
                    <span className="pb-1">
                      {game.title.length > 10
                        ? `${game.title.slice(0, 10)}..`
                        : game.title}
                    </span>
                  </div> */}
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
