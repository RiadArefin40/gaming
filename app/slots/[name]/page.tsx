"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { allGames } from "@/utils/allGames";
import { prgmGamesArray } from "@/utils/prgmGame";
import { jilliSlotArray } from "@/utils/jilliSlots";
import { getAuthUser } from "@/lib/auth";
import { PgSlotArray } from "@/utils/pgSlots";
import { prgmSlotGamesArray } from "@/utils/prgmCgames";
import { JdbSlotArray } from "@/utils/JdbSlots";
import SafeImage from "@/app/components/SafeImageProps";
const user = getAuthUser()
interface Category {
  name: string;
  icon: React.ReactNode;
}

interface Game {
  uid: string;
  name: string;
  image: string;
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
  const lastSegment = pathname.split("/").filter(Boolean).pop();
console.log('alll',prgmGamesArray ,lastSegment)
  const categories: Category[] = [
    { name: "Casino", icon: <span>♠️</span> },
    { name: "Slots", icon: <span>🎰</span> },
    { name: "Crash", icon: <span>💥</span> },
    { name: "Table", icon: <span>🃏</span> },
    { name: "Fishing", icon: <span>🎣</span> },
    { name: "Arcade", icon: <span>👾</span> },
    { name: "Lottery", icon: <span>🎫</span> },
  ];

//  const gamesWithImages = allGames.map(game => ({
//   ...game,
//   image: `/evo/${game.name}.png`,
// }));


interface GameSource {
  uid: string;
  name: string;
  // Allow extra fields for compatibility
  [key: string]: any;
}

const gamesWithImages: Game[] = (
  lastSegment === 'evolution'
    ? (allGames as GameSource[])
    : lastSegment === 'jili'
      ? (jilliSlotArray as GameSource[])
      : lastSegment === 'jdb'
      ? (JdbSlotArray as GameSource[])
     : lastSegment === 'pg-soft'
    ? (PgSlotArray as GameSource[])
        : lastSegment === 'pragmatic-play'
    ? (prgmSlotGamesArray as GameSource[])
   
      : (prgmGamesArray as GameSource[])
).map((item: GameSource): Game => {
  let image = '';

  if (lastSegment === 'evolution') {
    image = `/evo/${item.name}.png`;
  } else if (lastSegment === 'jili') {
    image = `/JILI Slot/${item.name}.png`; // <-- replace with the actual Jilli image path
  } 
  else if (lastSegment === 'jdb') {
    image = `/JDB Slot/${item.name}.png`; // <-- replace with the actual Jilli image path
  } 
  else if (lastSegment === 'pg-soft') {
    
     image = `/PG Slot/${item.name}.png`; // < // <-- replace with the actual Jilli image path
  } 
    else if (lastSegment === 'pragmatic-play') {
    
     image = `/pp/${item.name}.png`; // < // <-- replace with the actual Jilli image path
  } 
  
  else {
    image = 'https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-pg.png';
  }

  return {
    ...item,
    image,
  };
});


  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(gamesWithImages);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
const [loadingText, setLoadingText] = useState("Launching game...");
  // Update filtered games when searchTerm or sort changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let filtered = gamesWithImages.filter((game:any) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered.sort((a:any, b:any) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );

      setFilteredGames(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, sortAsc]);

  // Handle category selection: update state and navigate
  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setDropdownOpen(false);
    const slug = slugify(catName);
    router.push(`/games/${slug}`);
  };

  // Handle game card click
  const handleGameClick = async (item:any) => {
    if (loading) return;

    setLoading(true);
    setLoadingText("Preparing game session...");

    try {
      if (!user) {
        alert("User not authenticated");
        setLoading(false);
        return;
      }
      console.log(item)
      const res = await fetch("https://api.bajiraj.cloud/launch_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          userName: user.name,
          game_uid: item.uid,
          credit_amount: user.wallet,
          game_type: 'slot'
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.gameUrl) {
        setLoadingText("Opening game…");

        // ✅ Open game in new tab
        window.open(data.gameUrl, "_blank", "noopener,noreferrer");
      } else {
        alert(data.error || "Failed to launch game");
      }
    } catch (error) {
      console.error("Error launching game:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
           {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
            <p className="text-lg text-gray-200 animate-pulse">
              {loadingText}
            </p>
          </div>
        </div>
      )}

       <div className="p-2 py-[100px]">
      

      {/* Category Dropdown */}
      <div className="relative mb-2 -mt-2">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-1 font-semibold px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          {categories.find((c) => c.name === selectedCategory)?.icon}
          <span>{selectedCategory}</span>
          <span>{dropdownOpen ? "▲" : "▼"}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-10">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-600 ${
                  selectedCategory === cat.name ? "bg-slate-400" : ""
                }`}
              >
                {cat.icon} <span>{cat.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top bar: search toggle + sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 text-white p-2 rounded-md mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className="px-3 py-1 bg-indigo-600 rounded hover:bg-indigo-500"
          >
            🔍
          </button>

          {searchOpen && (
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 transition-all duration-300"
            />
          )}

          <button
            onClick={() => setSortAsc((prev) => !prev)}
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
            title={`Sort ${sortAsc ? "Z-A" : "A-Z"}`}
          >
            ⚙️ {sortAsc ? "A-Z" : "Z-A"}
          </button>
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
          : filteredGames.map((game) => (
              <div
                key={game.uid}
                onClick={() => handleGameClick(game)}
                className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-200"
              >

                
                <SafeImage
                     src={game.image} // could be broken or empty
                      width={140}
                      height={170}
                      className="rounded-[10px]"
                />
                <div className="absolute bottom-0 h-[28px] left-0 w-full bg-slate-600 bg-opacity-50 text-slate-200 text-center py-1 text-lg sm:text-base">
                  {game.name}
                </div>
              </div>
            ))}
      </div>
    </div>
    </>
   
  );
}
