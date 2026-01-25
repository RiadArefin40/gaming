"use client";

interface GameItem {
  id: any;
  title: any;
  image:any;
  uid:any;
  src: any;
  type: any;
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
interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}

// const user: AuthUser | null = (() => {
//   const stored = localStorage.getItem("auth_user");
//   return stored ? JSON.parse(stored) as AuthUser : null;
// })();



interface SportsGridProps {
  items: GameItem[];
}

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


export function SportsGrid({ items }: SportsGridProps) {
  const pathname = usePathname();
   const router = useRouter();
   const [user, setUser] = useState<AuthUser | null>(null);
 
   useEffect(() => {
     const stored = localStorage.getItem("auth_user");
     if (stored) setUser(JSON.parse(stored) as AuthUser);
   }, []);
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

   function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

 

   const [data, setData] = useState(null);
 
 
  // Cache helpers
const getCachedGameUrl = (user: AuthUser, gameUid: string) => {
  try {
    const authUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
    const wallet = authUser.wallet ?? user.wallet ?? 0;

    const cache = JSON.parse(localStorage.getItem("game_url_cache") || "{}");
    const key = `${user.id}_${gameUid}_${wallet}`;

    return cache[key] || null;
  } catch (err) {
    console.error("Cache read failed", err);
    return null;
  }
};

  const setCachedGameUrl = (user: AuthUser, gameUid: string, url: string) => {
    try {
      const cache = JSON.parse(localStorage.getItem("game_url_cache") || "{}");
      const key = `${user.id}_${gameUid}_${user.wallet}`;
      cache[key] = url;
      localStorage.setItem("game_url_cache", JSON.stringify(cache));
    } catch {}
  };

  // Handle mobile back button
  useEffect(() => {
    const handleBack = () => {
      if (showGame) {
        setShowGame(false);
        setLoading(false);
        window.history.pushState(null, ""); // remove extra history entry
      }
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [showGame]);

  // Launch or load cached game
  const handleGameClick = async (item: GameItem) => {
    if (loading) return;
    if (!user) {
      alert("User not authenticated");
      return;
    }
    setLoading(true);
    // 1️⃣ Check cache first
    const cachedUrl = getCachedGameUrl(user, item.uid);
if (cachedUrl) {
console.log("Using cached game URL");
  setShowGame(false);
    setGameUrl(cachedUrl);
    setShowGame(true);
    setLoading(true);
    window.history.pushState({ gameOpen: true }, "");
    return;
}

    try {
      const res = await fetch("https://api.bajiraj.cloud/launch_game", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify({
          userName: user.name,
          game_uid: item.uid,
          credit_amount: user.wallet,
          game_type: 'sports',
        }),
      });

      const data = await res.json();
      console.log("Launch game response:", data);
      if (res.ok && data.success && data.gameUrl) {
        setGameUrl(data.gameUrl);
        setCachedGameUrl(user, item.uid, data.gameUrl); // cache it
        setShowGame(true);
        window.history.pushState({ gameOpen: true }, "");
      } else {
             alert(data.error || "Failed to launch game");
        setShowGame(false);
setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setShowGame(false);
    } 
  };


  return (
    <>
      {/* 🔥 Loading Overlay */}
    {loading && (
  <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/30 ">
    <div className="relative flex flex-col items-center justify-center gap-4">

      {/* Rotating gradient rings with text inside */}
      <div className="relative w-28 m-1 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-200 opacity-40 blur-xl animate-spin-slow" />
        <div className="absolute inset-0 rounded-full border-3 border-white border-t-transparent animate-spin shadow-lg" />
        <div className="absolute inset-0  rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />

        {/* Center text */}
       <span className="relative text-yellow-400 text-md font-bold drop-shadow-lg">
          Bajiraj
        </span>
      </div>


      {/* Sparkling stars around */}

  


    </div>
  </div>
)}




      {showGame && gameUrl && (
  <iframe
  key={gameUrl}               // 🔥 force remount
  src={gameUrl || ""}
  className="fixed inset-0 w-full h-full border-0 z-[300]"
  allow="fullscreen"
  style={{ display: showGame ? "block" : "none" }}
  loading="eager"
    onLoad={() => {

    setLoading(false); // ✅ hide loader ONLY now
  }}
/>

)}
      {!showGame && (
      <div className="grid grid-cols-4 gap-2 p-2">
        {items.map((item) => (
           <div         onClick={() => handleGameClick(item)}  key={item.id} className="relative  rounded-lg p-[1px] bg-gradient-to-r from-pink-500 via-yellow-300 to-blue-500 animate-gradient-glow">
        <div className="relative p-[1px] pt-2  flex-col rounded-sm spribe-card bg-yellow-300 !w-auto">
  <img
    src={item.src}
    alt="exclusive-game"
    className="w-[40px] h-[45px] rounded-sm "
  />
 <div>
 <p className="text-sm font-medium">{item?.title}</p>
 </div>
  
</div>
          </div>
        ))}
      </div>
      )}
    </>
  );
}
