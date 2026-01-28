"use client";

import { useState, useEffect, useRef } from "react";
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

interface GameItem {
  id: any;
  title: any;
  image: any;
  game_uid: any;
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

// const user: AuthUser | null = (() => {
//   const stored = localStorage.getItem("auth_user");
//   return stored ? JSON.parse(stored) as AuthUser : null;
// })();

interface Category {
  name: string;
  icon: React.ReactNode;
  label: string;
}

// interface GameItem {
//   serial: number;
//   title: string;
//   image: string;
//   game_uid: string;
// }

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
    { name: "all", label: "All", icon: <p>All</p> },
    {
      name: "netent",
      label: "NETENT",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_netent.png?v=1769513938282&source=mcdsrc"
          alt="NETENT"
        />
      ),
    },
    {
      name: "jili",
      label: "JILI",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_jili.png?v=1769513938282&source=mcdsrc"
          alt="JILI"
        />
      ),
    },
    {
      name: "jdb",
      label: "JDB",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_jdb.png?v=1769513938282&source=mcdsrc"
          alt="JDB"
        />
      ),
    },
    {
      name: "fc",
      label: "FC",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_fc.png?v=1769513938282&source=mcdsrc"
          alt="FC"
        />
      ),
    },
    {
      name: "pg",
      label: "PG",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_pg.png?v=1769513938282&source=mcdsrc"
          alt="PG"
        />
      ),
    },
    {
      name: "rich88",
      label: "RICH88",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-rich88.png?v=1769513938282&source=mcdsrc"
          alt="RICH88"
        />
      ),
    },
    {
      name: "nextspin",
      label: "NextSpin",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-nextspin.png?v=1769513938282&source=mcdsrc"
          alt="NextSpin"
        />
      ),
    },
    {
      name: "fastspin",
      label: "FASTSPIN",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_fastspin.png?v=1769513938282&source=mcdsrc"
          alt="FASTSPIN"
        />
      ),
    },
    {
      name: "spade",
      label: "SPADE",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_spade.png?v=1769513938282&source=mcdsrc"
          alt="SPADE"
        />
      ),
    },
    {
      name: "mg",
      label: "MG",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-mg.png?v=1769513938282&source=mcdsrc"
          alt="MG"
        />
      ),
    },
    {
      name: "dragoonsoft",
      label: "DRAGOONSOFT",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_dragoonsoft.png?v=1769513938282&source=mcdsrc"
          alt="DRAGOONSOFT"
        />
      ),
    },
    {
      name: "pp",
      label: "PP",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_pp.png?v=1769513938282&source=mcdsrc"
          alt="PP"
        />
      ),
    },
    {
      name: "btg",
      label: "BTG",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_btg.png?v=1769513938282&source=mcdsrc"
          alt="BTG"
        />
      ),
    },
    {
      name: "kingmaker",
      label: "KINGMAKER",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_kingmaker.png?v=1769513938282&source=mcdsrc"
          alt="KINGMAKER"
        />
      ),
    },
    {
      name: "p8",
      label: "P8",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_play8.png?v=1769513938282&source=mcdsrc"
          alt="P8"
        />
      ),
    },
    {
      name: "pt",
      label: "PT",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_pt.png?v=1769513938282&source=mcdsrc"
          alt="PT"
        />
      ),
    },
    {
      name: "cg",
      label: "CG",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_cg.png?v=1769513938282&source=mcdsrc"
          alt="CG"
        />
      ),
    },
    {
      name: "rt",
      label: "RT",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_rt.png?v=1769513938282&source=mcdsrc"
          alt="RT"
        />
      ),
    },
    {
      name: "cq9",
      label: "CQ9",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-cq9.png?v=1769513938282&source=mcdsrc"
          alt="CQ9"
        />
      ),
    },
    {
      name: "joker",
      label: "Joker",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-joker.png?v=1769513938282&source=mcdsrc"
          alt="Joker"
        />
      ),
    },
    {
      name: "ka",
      label: "KA",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-ka.png?v=1769513938282&source=mcdsrc"
          alt="KA"
        />
      ),
    },
    {
      name: "lucky365",
      label: "Lucky365",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-lucky365.png?v=1769513938282&source=mcdsrc"
          alt="Lucky365"
        />
      ),
    },
    {
      name: "playngo",
      label: "PNG",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-playngo.png?v=1769513938282&source=mcdsrc"
          alt="PNG"
        />
      ),
    },
    {
      name: "iloveu",
      label: "ILOVEU",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_iloveu.png?v=1769513938282&source=mcdsrc"
          alt="ILOVEU"
        />
      ),
    },
    {
      name: "maha",
      label: "MAHA",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-maha.png?v=1769513938282&source=mcdsrc"
          alt="MAHA"
        />
      ),
    },
    {
      name: "worldmatch",
      label: "WorldMatch",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-worldmatch.png?v=1769513938282&source=mcdsrc"
          alt="WorldMatch"
        />
      ),
    },
    {
      name: "yellowbat",
      label: "YELLOWBAT",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_yesbingo.png?v=1769513938282&source=mcdsrc"
          alt="YELLOWBAT"
        />
      ),
    },
    {
      name: "yl",
      label: "YL",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_yl.png?v=1769513938282&source=mcdsrc"
          alt="YL"
        />
      ),
    },
    {
      name: "nlc",
      label: "NLC",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_nlc.png?v=1769513938282&source=mcdsrc"
          alt="NLC"
        />
      ),
    },
    {
      name: "fiveg",
      label: "FIVEG",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_fiveg.png?v=1769513938282&source=mcdsrc"
          alt="FIVEG"
        />
      ),
    },
    {
      name: "relax",
      label: "RELAX",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_relax.png?v=1769513938282&source=mcdsrc"
          alt="RELAX"
        />
      ),
    },
    {
      name: "octoplay",
      label: "OCTOPLAY",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_octoplay.png?v=1769513938282&source=mcdsrc"
          alt="OCTOPLAY"
        />
      ),
    },
    {
      name: "hacksaw",
      label: "HACKSAW",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_hacksaw.png?v=1769513938282&source=mcdsrc"
          alt="HACKSAW"
        />
      ),
    },
    {
      name: "acewin",
      label: "ACEWIN",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_acewin.png?v=1769513938282&source=mcdsrc"
          alt="ACEWIN"
        />
      ),
    },
    {
      name: "jj",
      label: "JJ",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_jj.png?v=1769513938282&source=mcdsrc"
          alt="JJ"
        />
      ),
    },
    {
      name: "gtf",
      label: "GTF",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_gtf.png?v=1769513938282&source=mcdsrc"
          alt="GTF"
        />
      ),
    },
    {
      name: "yggdrasil",
      label: "YGGDRASIL",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_yggdrasil.png?v=1769513938282&source=mcdsrc"
          alt="YGGDRASIL"
        />
      ),
    },
    {
      name: "combo",
      label: "COMBO",
      icon: (
        <img
          className="h-14"
          src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-awcv2_combo.png?v=1769513938282&source=mcdsrc"
          alt="COMBO"
        />
      ),
    },
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
  const gamesWithImages: GameItem[] = (
    lastSegment === "jili"
      ? jilli
      : lastSegment === "pg"
        ? pg
        : lastSegment === "jdb"
          ? jdb
          : lastSegment === "netent"
            ? netent
            : lastSegment === "playtech"
              ? playtech
              : lastSegment === "fc"
                ? fa
                : lastSegment === "cq"
                  ? cq9
                  : lastSegment === "redtiger"
                    ? redTiger
                    : jdb
  ).map(
    (item: any): GameItem => ({
      ...item,
    }),
  );

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const matchedCategory = categories.find(
      (cat) => cat.name.toLowerCase() === firstSegment.toLowerCase(),
    );
    return matchedCategory ? matchedCategory.label : categories[0].name;
  });

  const [selectedProvider, setSelectedProvider] = useState(() => {
    const matchedProvider = providers.find(
      (p) => p.name.toLowerCase() == lastSegment.toLowerCase(),
    );
    return matchedProvider ? matchedProvider.label : providers[0].name;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [providerDropdownOpen, setProviderDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] =
    useState<GameItem[]>(gamesWithImages);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Launching game...");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);

  // Filter & sort games
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let filtered = gamesWithImages.filter((game: GameItem) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      filtered.sort((a, b) =>
        sortAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
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
    const cachedUrl = getCachedGameUrl(user, item.game_uid);
    if (cachedUrl) {
      console.log("Using cached game URL");
      setShowGame(false);
      setGameUrl(cachedUrl);
      setShowGame(true);
      setLoading(true);
      window.history.pushState({ gameOpen: true }, "");
      return;
    }

    // 2️⃣ Fetch new game URL
    try {
      const res = await fetch("https://api.spcwin.info/launch_game", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify({
          userName: user.name,
          game_uid: item.game_uid,
          credit_amount: user.wallet,
          game_type: "slot",
        }),
      });

      const data = await res.json();
      console.log("Launch game response:", data);
      if (res.ok && data.success && data.gameUrl) {
        setGameUrl(data.gameUrl);
        setCachedGameUrl(user, item.game_uid, data.gameUrl); // cache it
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
    } finally {
      //  setLoading(false);
    }
  };

  console.log(evoLive);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
useEffect(() => {
const selectedButton = buttonRefs.current[selectedProvider.toLowerCase()];
if (selectedButton && containerRef.current) {
const container = containerRef.current;
const containerRect = container.getBoundingClientRect();
const buttonRect = selectedButton.getBoundingClientRect();


// Calculate the scroll so the selected button is ~2-3 items from the left
const offset = buttonRect.left - containerRect.left - 80; // 80px = approximate padding to left
container.scrollBy({
left: offset,
behavior: "smooth",
});
}
}, [selectedProvider]);

const START = 398678;
const END = 868786;


const [grand, setGrand] = useState(START);
const [major, setMajor] = useState(16378);
const [minor, setMinor] = useState(2688);


const intervalRef = useRef<number | null>(null);


useEffect(() => {
  const increment = () => {
    setGrand((prev) => (prev >= END ? START : prev + 1));
    setMajor((prev) => (prev >= END ? START : prev + 1));
    setMinor((prev) => (prev >= END ? START : prev + 1));
  };

  // assign browser interval ID (number)
  intervalRef.current = window.setInterval(increment, .2);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // ✅ no TS error now
    }
  };
}, []);
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/60">
          <div className="relative flex flex-col items-center justify-center gap-4">
            {/* Rotating gradient rings with text inside */}
            <div className="relative w-14 m-1 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-200 opacity-40 blur-xl animate-spin-slow" />
              <div className="absolute inset-0 rounded-full border-3 border-white border-t-transparent animate-spin shadow-lg" />
              <div className="absolute inset-0  rounded-full border-2 border-pink-400 border-b-transparent animate-spin-slower" />

              {/* Center text */}
              <p className="relative text-yellow-400 text-xl font-bold drop-shadow-lg">
                <span>S</span>
                <span className="text-slate-100">W</span>
              </p>
            </div>

            {/* Sparkling stars around */}
          </div>
        </div>
      )}

      {showGame && gameUrl && (
        <>
          {/* Top Bar */}

          {/* GameItem Frame */}
          <iframe
            src={gameUrl}
            className="fixed inset-0 top-0 w-full h-full border-0 z-[998]"
            allow="fullscreen"
          />
        </>
      )}

      {!showGame && (
        <div className="p-2 pt-[67px] ">
          <div className="sticky bg-black-700 h-[50px] top-2 z-50">
            <div className="flex items-center gap-2 justify-between">
              {/* Provider Dropdown */}

              <div className="w-full">
                <div className="relative px-3 mt-1 flex items-center">
                  {searchOpen && (
                    <>
                      {/* Magnifying glass icon */}
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                        className="pl-8  h-10 px-3 w-full  py-1 flex-1 rounded-md bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* <div className="relative mt-2">
                 <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="flex min-w-[150px] h-10 -mt-4 items-center space-x-1 font-semibold px-3 py-1 rounded-md bg-black-700 hover:bg-black-600"
>

  {categories.find((c) => c.label == selectedCategory)?.icon}
  

  <span>
    {categories.find((c) => c.name == selectedCategory)?.label || selectedCategory}
  </span>
  

  <span className="pl-8">{dropdownOpen ? "▲" : "▼"}</span>
</button>
                {dropdownOpen && (
                  <div className="absolute w-full bg-black-700 rounded-md shadow-lg z-10">
                    {categories.map((cat, i) => (
                      <div
                        key={i}
                        onClick={() => handleCategorySelect(cat.label)}
                        className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-black-600 ${
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

          <div className="my-4 relative max-w-screen">
            <img
              src="https://img.m167cw.com/upload/backgroundImgH5/image_260077.jpg"
              alt=""
            />
            <p className="absolute bottom-[25px] font-bold text-slate-300 left-[44px]">{minor}</p>
               <p className="text-xl absolute font-bold text-orange-400 bottom-[32px] left-1/2 -translate-x-1/2">{grand}</p>
                <p className="absolute bottom-[25px] font-bold text-slate-300 right-[52px]">{major}</p>
          </div>

          <div>
            <div className="relative my-2">
          <div
  ref={containerRef}
  className="flex space-x-2 my-4 overflow-x-auto bg-black-600 py-2 px-1 max-w-screen -mx-2 px-2"
>
  {providers.map((p) => (
    <button
      key={p.name}
      ref={(el) => {
        buttonRefs.current[p.name.toLowerCase()] = el; // ✅ TS happy
      }}
      onClick={() => handleProviderSelect(p.name)}
      className={`flex flex-col items-center justify-center min-w-[80px] h-10 px-3 rounded-xs font-semibold cursor-pointer transition-all ${
        selectedProvider.toLowerCase() === p.name
          ? "bg-slate-700 text-white"
          : "bg-black-700 text-white"
      }`}
    >
      <div className="text-lg">{p.icon}</div>
    </button>
  ))}
</div>
            </div>
          </div>
          {/* Games Grid */}
          <div className="grid grid-cols-2 max-w-screen sm:grid-cols-2 mt-2 gap-2 mb-[100px]">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-black-600 rounded-lg h-32 sm:h-40 md:h-48"
                  />
                ))
              : filteredGames.map((game, i) => (
                  <div
                    key={i}
                    onClick={() => handleGameClick(game)}
                    className="relative rounded-lg  bg-black-600 max-w-screen cursor-pointer hover:scale-105 transform transition duration-200"
                  >
                    <SafeImage src={game.image} className="" />

                    <div className=" rounded-b-sm bg-black-600 text-slate-200 text-white text-center py-1 text-lg sm:text-base">
                      <span className="">
                        {game.title.length > 15
                          ? `${game.title.slice(0, 15)}..`
                          : game.title}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
