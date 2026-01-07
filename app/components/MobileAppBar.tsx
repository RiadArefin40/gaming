"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, RotateCw, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getAuthUser } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useAutoFetch } from "@/hooks/use-auto-fetch";
import RefreshButton from "./RefreshButton";

import { gameImages } from "@/utils/gameData";
import { ExclusiveGrid } from "./ExclusiveGrid";
import { CasinoGrid } from "./CasinoGrid";
import { useAuthModal } from "@/store/useAuthModal";
import { DotLoadingButton } from "./DotLoadingButton";

import {
  Menu,
  Gamepad2,
  Dice6,
  Activity,
  Rocket,
  MessageCircle,
  Star,
} from "lucide-react";
import {
  Bell,
  User,
  ShieldCheck,
  Lock,
  FileText,
  Wallet,
  TrendingUp,
  Crown,
  EyeOff,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";
import { SportsGrid } from "./SportsGrid";

interface BalanceData {
  balance: number;
  turnover: number;
}
interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: string[] | React.ReactNode;
}

export default function MobileAppBar() {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetOpenS, setSheetOpenS] = useState(false);
  interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored) as AuthUser);
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "BN", name: "বাংলা", flag: "🇧🇩" },
  ];

  const menuItems: MenuItem[] = [
    { name: "Favourite", icon: <span>⭐</span>, link: "#" },
    {
      name: "Exclusive",
      icon: <Crown className="w-5 h-5 mr-1" />,
      children: <ExclusiveGrid items={gameImages.exclusive} />,
    },

    {
      name: "Sports",
      icon: <Activity className="w-5 h-5 mr-[6px]" />,
      children: <SportsGrid items={gameImages.sports} />,
    },
    {
      name: "Casino",
      icon: <Gamepad2 className="w-5 h-5 mr-[6px]" />,
      children: <CasinoGrid items={gameImages.casino} />,
    },
    {
      name: "Slot",
      icon: <Dice6 className="w-5 h-5 mr-[8px]" />,
      children: <CasinoGrid items={gameImages.slot} />,
    },
    {
      name: "Crash",
      icon: <Rocket className="w-5 h-5 mr-[6px]" />,
      children: <CasinoGrid items={gameImages.crash} />,
    },

    {
      name: "Fishing",
      icon: <span>🎣</span>,
      children: <CasinoGrid items={gameImages.fishing} />,
    },
  ];

  const { data, error } = useAutoFetch<BalanceData | undefined>(
    user ? `https://stage.api.bajiraj.com/users/${user.id}/balance` : "",
    10000
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const balance = data?.balance ?? 0;
  

  const turnover = data?.turnover ?? 0;
  const [isLoading, setIsloading] = useState(false);
  const fetchBalance = () => {
    setIsloading(true);
    setTimeout(async () => {
      setIsloading(false);
    }, 1000); // 1.5 seconds delay
  };
useEffect(() => {
  if (!user) return; // no user, skip

  const updatedUser = {
    ...user,
    wallet: balance, // update balance
  };

  localStorage.setItem("auth_user", JSON.stringify(updatedUser));

  const stored = localStorage.getItem("auth_user");
  console.log("Updated User in localStorage:", stored);
}, [user, balance]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const handleLogout = () => {
    // remove user data
    localStorage.removeItem("auth_user");

    // optional: remove token
    // localStorage.removeItem("token");

    // redirect after logout
    // window.location.href = "/login";
  };
  return (
    <>
      {/* Blur overlay */}
      {sheetOpen && (
        <div className="fixed max-w-screen inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity" />
      )}

      <div className="flex fixed top-0 w-full items-center justify-between px-4 py-1 !max-h-[70px] shadow-md z-50 bg-gray-900">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="hidden md:block" />
          <div onClick={() => router.push("/")} className="flex items-center gap-2">
            {/* <img src="/tlogo.png" alt="Logo" /> */}
          
            <Sheet open={sheetOpenS} onOpenChange={setSheetOpenS}>
              <SheetTrigger>
                <div className="flex flex-col relative items-center gap-1">
                  <div
                    className={`flex flex-col w-[70px] items-center gap-1 px-2 py-1  -ml-[25px] relative `}
                  >
                    {/* <Menu    className={`w-6 h-6 absolute bottom-2 ${
                  sheetOpen ? "!text-orange-500 w-9 h-9" : "!text-white "
                }`} /> */}
                    <div className="relative flex flex-col items-center gap-1">
                      <div className="relative w-14 h-14 flex flex-col items-center justify-center">
                        {/* Glowing animated 3D background */}
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 
        blur-3xl opacity-70 scale-110 
        ${sheetOpenS ? "animate-spin-slow" : ""}`}
                        />

                        {/* Floating Menu icon with tilt + shadow */}
                        <Menu
                          className={`absolute bottom-4 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${
          sheetOpenS
            ? "text-orange-400 w-7 h-7 scale-100"
            : "text-white w-6 h-6 scale-100"
        } 
        drop-shadow-2xl hover:scale-130 hover:rotate-[15deg] cursor-pointer`}
                        />

                        {/* Floating rings for 3D effect */}
                        <div
                          className={`absolute rounded-full border-2 border-orange-400 opacity-30 animate-spin-slow
        transition-all duration-500 ease-out
        ${sheetOpenS ? "w-12 h-12" : "w-10 h-10"}`}
                        />
                        <div
                          className={`absolute rounded-full border-2 border-pink-400 opacity-20 animate-spin-slower
        transition-all duration-500 ease-out
        ${sheetOpenS ? "w-13 h-13 scale-115 border-white" : "w-0 h-0"}`}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-full max-h-screen h-[90%] p-0 bg-slate-800 overflow-y-auto"
              >
                <VisuallyHidden>
                  <DialogTitle>Mobile Menu</DialogTitle>
                </VisuallyHidden>

                {/* Custom Close Button */}
                <div className="p-4 flex justify-between">
                  <button className="bg-gray-900 px-4 py-1 flex items-center gap-2 rounded-lg">
                    <MessageCircle className="w-5 h-5" />
                    <p>Live Support</p>
                  </button>
                  <button
                    className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 px-4 py-1 rounded-lg flex items-center justify-center z-100"
                    onClick={() => setSheetOpenS(false)} // This actually closes the sheet
                  >
                    <X className="w-6 h-6 text-gray-100 hover:text-red-600" />
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="p-4 space-y-2 text-lg text-gray-300">
                  <img src="/b-1.jpg" alt="Logo" className="-mt-4 mb-2" />
                  {menuItems.map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() =>
                          item.children && toggleSection(item.name)
                        }
                        className={`flex items-center justify-between w-full py-2 px-3 rounded transition-colors
    ${
      openSections[item.name]
        ? "text-orange-400 bg-slate-800 font-semibold"
        : "text-gray-200 bg-transparent"
    }
    hover:bg-gray-100 focus:outline-none focus:bg-slate-800`}
                        style={{
                          WebkitTapHighlightColor: "transparent", // removes default mobile highlight
                          touchAction: "manipulation", // helps mobile taps behave properly
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        {item.children && (
                          <span>{openSections[item.name] ? "▲" : "▼"}</span>
                        )}
                      </button>

                      {item.children && openSections[item.name] && (
                        <>
                          {Array.isArray(item.children) ? (
                            <ul className="pl-8 mt-1 space-y-1">
                              {item.children.map((child, cidx) => (
                                <li key={cidx}>
                                  <a
                                    href="#"
                                    className="block py-1 text-gray-700 hover:text-purple-700"
                                  >
                                    {child}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div onClick={() => setSheetOpen(false)}>
                              {item.children}
                            </div>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="px-3 w-full mb-[220px] mt-6 w-full py-[8px] text-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-orange-600"
                    >
                      Log Out
                    </button>
                  )}
                </ul>

                <style jsx global>{`
                  [data-slot="sheet-overlay"] {
                    top: 3.5rem !important;
                    height: calc(100vh - 9.5rem) !important;

                    backdrop-filter: none !important;
                    bottom: 3.5rem !important;
                  }
                `}</style>
              </SheetContent>
            </Sheet>
     
            {/* <p
  className="tracking-wider italic -mt-2 text-2xl -ml-4 font-extrabold text-orange-500 select-none touch-none"
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
</p> */}
<img src="/oie_119753jyAZNTiD.png" className="w-[110px] -ml-8" alt="" />

          </div>
        </div>

        <div className="flex items-center gap-1 z-50">
          {user && (
            <div className="flex items-center">
              <RefreshButton
                balance={balance}
                loading={isLoading}
                onRefresh={async () => {
                  fetchBalance();
                }}
              />

              <button
                onClick={() => setIsOpen(true)}
                className="w-9 h-[35px] flex -ml-2 items-center justify-center bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-r-md"
              >
                <Plus size={22} />
              </button>

              {/* Sheet */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent
                  side="top"
                  className="fixed !top-[55px] bottom-0 max-h-[200px] left-0 right-0 bg-slate-900  p-6 flex flex-col gap-4 shadow-lg
          transform transition-transform duration-300 border-b-0"
                >
                  <VisuallyHidden>
                    <DialogTitle>Mobile Menu</DialogTitle>
                  </VisuallyHidden>

                      <div className="flex -mt-2 -mr-3 justify-between items-center">
<p></p>
                <button
                  className="bg-gray-300 px-2 py-1 rounded-lg flex items-center justify-center px-3 z-50 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-orange-600"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-6 h-6 text-gray-100 hover:text-red-600" />
                </button>
              </div>

                  <div className="flex flex gap-4 mt-4">
                    <button
                      className="w-full py-3 rounded-lg bg-slate-700 text-white font-semibold hover:scale-105 transition-transform"
                      onClick={() => {
                        router.push("/withdraw");
                        setIsOpen(false);
                      }}
                    >
                      Withdraw
                    </button>

                    <button
                      className="text-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-orange-600 w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform"
                      onClick={() => {
                        router.push("/deposit");
                        setIsOpen(false);
                      }}
                    >
                      Deposit
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

          {!user && pathname !== "/login" && (
            <>
     <button
  onClick={() => router.push("/login")}
  className="
    px-2 py-[6px] w-[70px]
    text-sm font-bold text-white
    rounded-lg
    bg-gradient-to-r from-orange-400 to-orange-600
    backdrop-blur-md
  "
>
  Login
</button>

<button
 onClick={() => router.push("/registration")}
  className="
    px-2 py-[6px] w-[70px]
    text-sm font-bold text-white
    rounded-lg
    bg-gradient-to-r from-orange-400 to-orange-600
    backdrop-blur-md
    mr-1
  "
>
  Sign Up
</button>

            </>
          )}

          {/* Language Sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="w-8 p-2 h-8 flex items-center justify-center border-2 border-orange-500 ml-2 rounded-xl">
                <span className="text-md">
                  {languages.find((l) => l.code === selectedLang)?.flag}
                </span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="h-[70%] !top-[57px] bg-gray-900 p-4 shadow-lg z-50 border-b-0"
            >
              <VisuallyHidden>
                <DialogTitle>Mobile Menu</DialogTitle>
              </VisuallyHidden>

              <div className="flex justify-between items-center mb-4">
                <p className="text-xl text-white">Select Language</p>
                <button
                  className="bg-gray-300 px-2 py-1 rounded-lg flex items-center justify-center px-3 z-50 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-orange-600"
                  onClick={() => setSheetOpen(false)}
                >
                  <X className="w-6 h-6 text-gray-100 hover:text-red-600" />
                </button>
              </div>

              <div className="flex gap-4 flex-wrap  p-4 rounded w-[300px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`px-4 py-2 w-[120px] font-medium rounded ${
                      selectedLang === lang.code
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-orange-500"
                    }`}
                    onClick={() => setSelectedLang(lang.code)}
                  >
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
