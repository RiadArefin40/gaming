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



export function CasinoGrid({ items }: ExclusiveGridProps) {
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
        setLoading(false);
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
    <div className="">

    {loading && (
  <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/70 ">
    <div className="relative flex flex-col items-center justify-center gap-4">

      {/* Rotating gradient rings with text inside */}
      <div className="relative w-28 m-1 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-200 opacity-40 blur-xl animate-spin-slower" />
        <div className="absolute inset-0 rounded-full border-3 border-white border-t-transparent animate-spin shadow-lg" />
        <div className="absolute inset-0  rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />

        {/* Center text */}
        <span className="relative text-white text-xl font-bold drop-shadow-lg">
          Bajiraj
        </span>
      </div>


      {/* Sparkling stars around */}
      <div className="absolute w-full h-full">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${-Math.random() * 250}%`,
              left: `${Math.random() * 400}%`,
              animationDuration: `${0.4 + Math.random()}s`,
            }}
          />
        ))}
        
      </div>
            <div className="absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 300}%`,
              left: `${-Math.random() * 100}%`,
              animationDuration: `${0.4 + Math.random()}s`,
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
  <div className="fixed top-0 left-0 w-full z-[200] flex items-center bg-black/70  justify-between backdrop-blur-md shadow-lg h-16 px-4">
    {/* Logo / Text */}
    <div className="flex items-center gap-3">
            <p
  className="tracking-wider italic -mt-2 text-3xl ml-4 font-extrabold text-orange-600 select-none touch-none"
  style={{
    textShadow: `
      1px 1px 0 #0e0d0cff,
      2px 2px 0 #fafafaff,
      3px 1px 0 #f0e7e2ff,
      4px 4px 6px rgba(112, 76, 76, 0.35)
    `
  }}
>
  BajiRaj
</p>
    </div>

    {/* Close Button */}
    <button
      onClick={() => {
        setShowGame(false);
        // setGameUrl(null);
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
//         <>
//     <div className="grid grid-cols-2 gap-2 my-4 mt-4 px-4">
//       {items.map((game:any) => (
//         <div
//           key={game.id}
//           onClick = {() => handleGameClick(game)}
//           className="flex items-center justify-center rounded-xl"
//         >

// <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 animate-gradient-glow">
//   <div className="rounded-md flex items-center min-w-[180px] bg-slate-900 overflow-hidden">
//     <img
//       src={game.src}
//       alt="exclusive-game"
//       className="w-14 h-14 h-auto object-contain"
//     />
//     <p className="text-slate-100 text-lg">{game.provider}</p>
//   </div>

// </div>


//         </div>
//       ))}
//     </div>
//       <div className="flex justify-center ">
     
//       </div> </>

      <div className="grid grid-cols-2 gap-2 p-2">
        {items.map((item:any) => (
          <div         onClick={() => handleGameClick(item)}  key={item.id} className="relative rounded-lg p-[1px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 animate-gradient-glow">
          <div
            className={`
              pt-2 p-1 transition-all rounded-lg duration-300 ease-out border
              bg-gradient-to-br from-slate-800 to-slate-900
              border-slate-700 cursor-pointer hover:scale-105
              ${loading ? "pointer-events-none opacity-50" : ""}
            `}
          >
            <div className="flex items-center px-4 gap-2">
              <img className="h-8" src={item.src} alt={item.src} />
              <span className="text-lg font-medium text-slate-300">
                {item.provider}
              </span> 
            </div>
          </div>
          </div>
        ))}
      </div>
      
    )
      }
    </div>

  );
}
