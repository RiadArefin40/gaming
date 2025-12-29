"use client";
interface GameItem {
  id: number | string;
  title: number | string;
  image:number | string;
  game_uid:number | string;
  src: string;
}

interface ExclusiveGridProps {
  items: any;
}



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
  label: string;
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



export function ExclusiveGrid({ items }: ExclusiveGridProps) {
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
    {
      name: "evaluation-live",
      label: "Evaluation Live",
      icon: <span>♠️</span>,
    },
    {
      name: "pragmatic-play-live",
      label: "Pragmatic Play Live",
      icon: <span>🎰</span>,
    },
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
      : lastSegment === "playtech-live"
      ? pt
      : allGames
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
          game_type: item.type,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.gameUrl) {
 // 1000ms = 1 second
        setData(data.gameUrl);
        setGameUrl(data.gameUrl);
        setLoadingText("Opening game…");
             setTimeout(() => {
            setShowGame(true);
          }, 3000);
      } else {
        alert(data.error || "Failed to launch game");
        setShowGame(false);
      }
    } catch (error) {
      console.error("Error launching game:", error);
      setShowGame(false);
      alert("Something went wrong");
    } finally {
      // setLoading(false);
    }
  };


  return (
    <>

    {loading && (
  <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/70 backdrop-blur-md">
    <div className="relative flex flex-col items-center justify-center gap-4">

      {/* Rotating gradient rings with text inside */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 opacity-40 blur-xl animate-spin-slow" />
        <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin shadow-lg" />
        <div className="absolute inset-0 rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />

        {/* Center text */}
        <span className="relative text-white text-xl font-bold drop-shadow-lg">
          Bajiraj
        </span>
      </div>

      {/* Floating dots around spinner */}
      <div className="absolute w-40 h-40 flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-tr from-purple-400 via-pink-500 to-orange-400 rounded-full animate-bounce"
            style={{
              transform: `rotate(${i * 30}deg) translateX(5rem)`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkling stars around */}
      <div className="absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.5 + Math.random()}s`,
            }}
          />
        ))}
      </div>


    </div>
  </div>
)}


      {showGame && gameUrl && (
<>
  {/* Top Bar */}
  <div className="fixed top-0 left-0 w-full z-[1000] flex items-center justify-between bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-lg h-16 px-4">
    {/* Logo / Text */}
    <div className="flex items-center gap-3">
      {/* Optional Logo */}
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
        <span className="text-orange-500 font-bold text-lg">B</span>
      </div>
      <span className="text-white font-bold text-xl drop-shadow-lg">Bajiraj</span>
    </div>

    {/* Close Button */}
    <button
      onClick={() => {
        setShowGame(false);
        setGameUrl(null);
        setLoading(false);
      }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-red-500 transition-all duration-200 hover:scale-110 shadow-lg"
      aria-label="Close Game"
    >
      ✕
    </button>
  </div>

  {/* Game Frame */}
  <iframe
    src={gameUrl}
    className="fixed inset-0 top-16 w-full h-[calc(100%-4rem)] border-0 z-[998]"
    allow="fullscreen"
  />
</>

      )}


      {!showGame && (
        <>
    <div className="grid grid-cols-3 gap-3 my-4 px-4">
      {items.map((game:any) => (
        <div
          key={game.id}
          onClick = {() => handleGameClick(game)}
          className="flex items-center justify-center rounded-xl"
        >
          <img
            src={game.image}
            alt="exclusive-game"
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </div>
      <div className="flex justify-center ">
        <button
          // onClick={() => router.push("/login")}
          className="px-3 w-[172px] h-[55px] py-[6px] text-lg font-medium bg-orange-400 text-white font-medium rounded hover:bg-blue-600 "
        >
          More
        </button>
      </div> </>)}
    </>

  );
}
