"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { allGames } from "@/utils/allGames";

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

  const categories: Category[] = [
    { name: "Casino", icon: <span>♠️</span> },
    { name: "Slots", icon: <span>🎰</span> },
    { name: "Crash", icon: <span>💥</span> },
    { name: "Table", icon: <span>🃏</span> },
    { name: "Fishing", icon: <span>🎣</span> },
    { name: "Arcade", icon: <span>👾</span> },
    { name: "Lottery", icon: <span>🎫</span> },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(allGames);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  // Update filtered games when searchTerm or sort changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let filtered = allGames.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered.sort((a, b) =>
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
  const handleGameClick = (gameName: string) => {
    const slug = slugify(gameName);
    router.push(`/games/${slug}`);
  };

  return (
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                onClick={() => handleGameClick(game.name)}
                className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-200"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 h-[28px] left-0 w-full bg-slate-600 bg-opacity-50 text-slate-200 text-center py-1 text-lg sm:text-base">
                  {game.name}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
