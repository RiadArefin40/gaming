"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SafeImage from "@/app/components/SafeImageProps";

interface GameItem {
  id: any;
  title: string;
  image_url: any;
  uid: any;
  src: any;
  type: any;
}

interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}

interface Category {
  id: number;
  name: string;
  icon?: React.ReactNode;
  label?: string;
  title: string;
  image_url: string;
}

export default function Casino() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [filteredGames, setFilteredGames] = useState<GameItem[]>([]);
  const [providerGames, setProviderGames] = useState<GameItem[]>([]);
  const [providers, setProviders] = useState<Category[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";
  const lastSegment = segments[segments.length - 1] || "";

  // Load authenticated user
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored) as AuthUser);
  }, []);

  // Fetch all providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.spcwin.info/users/game-categories/6/games`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();

        const filtered = (json.games || []).filter((game: any) => game.is_provider === true);
        setProviders(filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Set initial selected provider
  useEffect(() => {
    if (!providers.length) return;
    const match = providers.find(p => p.title.toLowerCase() === lastSegment.toLowerCase());
    setSelectedProvider(match ? match.title : providers[0].title);

    // Fetch games for initial provider
    if (match) fetchProviderGames(match.id);
    else fetchProviderGames(providers[0].id);
  }, [providers, lastSegment]);

  // Fetch games for a provider dynamically
  const fetchProviderGames = async (providerId: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.spcwin.info/users/providers/${providerId}/games`);
      if (!res.ok) throw new Error(`Failed to fetch provider games: ${res.status}`);
      const json = await res.json();
      setProviderGames(json.games || []);
    } catch (err) {
      console.error(err);
      setProviderGames([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle provider selection
  const handleProviderSelect = (providerName: string, providerId: number) => {
    setSelectedProvider(providerName);
    router.push(`/${firstSegment}/${providerName.toLowerCase()}`);
    fetchProviderGames(providerId);
  };

  // Filter and sort games
  useEffect(() => {
    let filtered = providerGames.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) =>
      sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setFilteredGames(filtered);
  }, [searchTerm, sortAsc, providerGames]);

  // Cache helpers for game URLs
  const getCachedGameUrl = (user: AuthUser, gameUid: string) => {
    try {
      const cache = JSON.parse(localStorage.getItem("game_url_cache") || "{}");
      return cache[`${user.id}_${gameUid}_${user.wallet}`] || null;
    } catch {
      return null;
    }
  };

  const setCachedGameUrl = (user: AuthUser, gameUid: string, url: string) => {
    try {
      const cache = JSON.parse(localStorage.getItem("game_url_cache") || "{}");
      cache[`${user.id}_${gameUid}_${user.wallet}`] = url;
      localStorage.setItem("game_url_cache", JSON.stringify(cache));
    } catch {}
  };

  // Launch game
  const handleGameClick = async (item: GameItem) => {
    if (!user) return alert("User not authenticated");
    setLoading(true);

    const cachedUrl = getCachedGameUrl(user, item.uid);
    if (cachedUrl) {
      setGameUrl(cachedUrl);
      setShowGame(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.spcwin.info/launch_game", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify({ userName: user.name, game_uid: item.uid, credit_amount: user.wallet, game_type: "slot" }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.gameUrl) {
        setGameUrl(data.gameUrl);
        setCachedGameUrl(user, item.uid, data.gameUrl);
        setShowGame(true);
      } else {
        alert(data.error || "Failed to launch game");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Grand / Major / Minor counters
  const START = 398678, END = 868786;
  const [grand, setGrand] = useState(START);
  const [major, setMajor] = useState(16378);
  const [minor, setMinor] = useState(2688);
  useEffect(() => {
    const interval = setInterval(() => {
      setGrand(prev => (prev >= END ? START : prev + 1));
      setMajor(prev => (prev >= END ? START : prev + 1));
      setMinor(prev => (prev >= END ? START : prev + 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/60">Loading...</div>}
      {showGame && gameUrl && <iframe src={gameUrl} className="fixed inset-0 top-0 w-full h-full border-0 z-[998]" allow="fullscreen" />}

      {!showGame && (
        <div className="p-2 pt-[67px]">
          {/* Banner */}
          <div className="my-4 relative max-w-screen">
            <img
              src="https://img.m167cw.com/upload/backgroundImgH5/image_260077.jpg"
              alt="Banner"
              className="w-full"
            />
            <p className="absolute bottom-[25px] font-bold text-slate-300 left-[44px]">{minor}</p>
            <p className="absolute bottom-[32px] font-bold text-orange-400 text-xl left-1/2 -translate-x-1/2">{grand}</p>
            <p className="absolute bottom-[25px] font-bold text-slate-300 right-[52px]">{major}</p>
          </div>

          {/* Search */}
          <div className="relative px-0 mt-1 flex items-center">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 h-10 ml-2 px-3 w-full py-1 flex-1 rounded-md bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>

          {/* Providers */}
          <div className="flex space-x-2 my-2 overflow-x-auto bg-black-600 px-1 max-w-screen -mx-2">
            {(() => {
              if (!providers.length) return [];
              const selected = providers.find(p => p.title === selectedProvider);
              const others = providers.filter(p => p.title !== selectedProvider);
              const reordered = [...others];
              if (selected) reordered.splice(1, 0, selected);
              return reordered;
            })().map(p => (
              <button
                key={p.title}
                onClick={() => handleProviderSelect(p.title, p.id)}
                className={`flex py-1 flex-col items-center justify-center min-w-[80px] h-12 px-3 rounded-xs font-semibold cursor-pointer transition-all ${
                  selectedProvider.toLowerCase() === p.title.toLowerCase()
                    ? "bg-slate-700 text-white"
                    : "bg-black-700 text-white"
                }`}
              >
                <img src={`https://api.spcwin.info${p.image_url}`} className="w-20" />
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid mt-4 grid-cols-2 max-w-screen sm:grid-cols-2 mt-2 gap-2 mb-[100px]">
            {filteredGames.filter((game: any) => game?.is_active).map((game, i) => (
              <div key={i} onClick={() => handleGameClick(game)} className="relative rounded-lg bg-black-600 max-w-screen cursor-pointer hover:scale-105 transform transition duration-200">
                <SafeImage src={`https://api.spcwin.info${game.image_url}`} className="" />
                <div className="rounded-b-sm bg-black-600 text-slate-200 text-white text-center py-1 text-lg sm:text-base">
                  {game?.title.length > 15 ? `${game.title.slice(0, 15)}..` : game.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}