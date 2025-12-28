"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { allGames } from "@/utils/allGames";
import { jilliSlotArray } from "@/utils/jilliSlots";
import { JdbSlotArray } from "@/utils/JdbSlots";
import { PgSlotArray } from "@/utils/pgSlots";
import SafeImage from "@/app/components/SafeImageProps";
import { getAuthUser } from "@/lib/auth";
import { ppAsia } from "@/utils/liveCasinoGames/ppAsia";
import { evo } from "@/utils/liveCasinoGames/evo";
import { pt } from "@/utils/liveCasinoGames/pt";
import { evolive } from "@/utils/liveCasinoGames/evolive";

const user = getAuthUser();

interface Category {
  name: string;
  icon: React.ReactNode;
  label: string
}

interface Game {
  id: number;
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
  { name: "all", label: "All", icon: <span>🌐</span> }, // fallback
  { name: "evaluation-live", label: "Evaluation Live", icon: <span>♠️</span> },
  { name: "pragmatic-play-live", label: "Pragmatic Play Live", icon: <span>🎰</span> },
  { name: "ezugi-live", label: "Ezugi Live", icon: <span>💥</span> },
  { name: "playtech-live", label: "Playtech Live", icon: <span>💥</span> },
];

// Combine all arrays for "all"
const allGames = [
  ...(Array.isArray(evolive) ? evolive : []),
  ...(Array.isArray(ppAsia) ? ppAsia : []),
  ...(Array.isArray(PgSlotArray) ? PgSlotArray : []),
  ...(Array.isArray(pt) ? pt : []),
  ...(Array.isArray(jilliSlotArray) ? jilliSlotArray : []),
];

// Select games based on lastSegment (mirrors your ternary logic)
const gamesWithImages: Game[] = (
  lastSegment === "evaluation-live"
    ? evolive
    : lastSegment === "pragmatic-play-live"
    ? ppAsia
    : lastSegment === "ezugi-live"
    ? PgSlotArray
    : lastSegment === "playtech-live"
    ? pt
    : allGames
).map((item: any): Game => ({
  ...item,
}));

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
        sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
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
  const [data, setData] = useState(null)
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
         setShowGame(true);
        setData(data.gameUrl)
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



  return (
    <>
    
      {loading && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
            <p className="text-lg text-gray-200 animate-pulse">{loadingText}</p>
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
 <div className="p-2 py-[80px]">
        <div className="sticky top-2 bg-slate-900 z-50">

                  <div className="flex items-center  justify-between">

                   {/* Provider Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProviderDropdownOpen(!providerDropdownOpen)}
              className="flex min-w-[180px] items-center justify-between font-semibold px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              <span>{selectedProvider}</span>
              <span className="pl-2">{providerDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {providerDropdownOpen && (
              <div className="absolute w-full bg-gray-700 rounded-md shadow-lg z-10">
                {providers.map((p,i) => (
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
          {/* Category Dropdown */}
          <div className="relative mt-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex min-w-[150px] -mt-4 items-center space-x-1 font-semibold px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              {categories.find((c) => c.name === selectedCategory)?.icon}
              <span>{selectedCategory}</span>
              <span className="pl-6">{dropdownOpen ? "▲" : "▼"}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute w-full bg-gray-700 rounded-md shadow-lg z-10">
                {categories.map((cat,i) => (
                  <div
                    key={i}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-600 ${
                      selectedCategory === cat.name ? "bg-slate-400" : ""
                    }`}
                  >
                    {cat.icon} <span>{cat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

 
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white py-2 rounded-md mb-4">
          <div className="flex items-center">
            {searchOpen && (
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 w-[180px] py-1 flex-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            )}
          </div>
        </div>

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
            : filteredGames.map((game,i) => (
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
                  {/* <img src={game.image} alt="" /> */}
                  <div className="-mt-2  text-white text-center py-1 text-lg sm:text-base">
                    {/* <p className="text-orange-500 text-xl">{game.id}</p> */}
                    {/* <span className="pb-1 mt-4 !text-blue-600">
                    
                      {game.title.length > 10
                        ? `${game.title.slice(0, 10)}..`
                        : game.title}
                    </span> */}
                  </div>
                </div>
              ))}
        </div>

        <div className="!my-28">
            <p className="text-center text-xl font-medium">The End</p>
        </div>
      </div>
    )}
     
    </>
  );
}
