"use client";
import { useRouter, usePathname } from "next/navigation";

import { useVerifyModal } from "@/store/VerifyModalState";
import {
  Menu,
  Gamepad2,
  Dice6,
  Activity,
  Rocket,
  X,
  MessageCircle,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { getAuthUser } from "@/lib/auth";
import { gameImages } from "@/utils/gameData";
import { ExclusiveGrid } from "./ExclusiveGrid";
import { CasinoGrid } from "./CasinoGrid";
import { useAuthModal } from "@/store/useAuthModal";
import { DotLoadingButton } from "./DotLoadingButton";
import { useAutoFetch } from "@/hooks/use-auto-fetch";

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
type User = {
  id: number;
  email: string | null;
  password: string;
  name: string;
  created_at: string;
  referral_code: string;
  referred_by: string | null;
  wallet: string;
  phone: string;
  role: string;
  is_block_user: boolean;
  turnover: string;
};

export default function MobileFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const [psheetOpen, psetSheetOpen] = useState(false);
  const [isLoadinge, setIsLoading] = useState(false);
  const [isVLoading, setIsVLoading] = useState(false);
  const { openModal: openVerifyModal, closeModal } = useVerifyModal();
  // Controlled sheet state
  const { openModal } = useAuthModal();
  const user = getAuthUser();
  const pathname = usePathname();
  const router = useRouter();
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const { data, error } = useAutoFetch<BalanceData | undefined>(
    user ? `https://api.bajiraj.cloud/users/${user.id}/balance` : "",
    10000
  );
  const balance = data?.balance ?? 0;
  const turnover = data?.turnover ?? 0;
  const handleLogout = () => {
    // remove user data
    localStorage.removeItem("auth_user");

    // optional: remove token
    // localStorage.removeItem("token");

    // redirect after logout
    window.location.href = "/login";
  };
  const [unreadCount, setUnread] = useState(null);
  const [notifications, setNotifications] = useState(null);
  useEffect(() => {
    if (!user || typeof window === "undefined") return;

    const fetchNotification = async () => {
      try {
        const res = await fetch(
          `https://api.bajiraj.cloud/notifications/user/${user.id}`
        );

        if (!res.ok) {
          console.error("Failed to fetch balance:", res.status);
          return;
        }

        const data = await res.json();
        setUnread(data.unread_count);
        setNotifications(data.notifications);
        console.log("notofication", data);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchNotification();
    const interval = setInterval(fetchNotification, 500000);

    return () => clearInterval(interval);
  }, []);
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
      children: <CasinoGrid items={gameImages.sports} />,
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

  const goToCasino = () => {
    setSheetOpen(false);
    router.push("/slots/pg-soft");
  };
  const goToSlots = () => {
    router.push("/slots/jilli");
  };

  const goToPromotions = () => router.push("/promos");

  // Helper to highlight active button
  const isActive = (path: string) => pathname === path;
  const handleDeposit = () => {
    if (!user) {
      openModal();
    } else {
      router.push("/deposit");
    }
  };

  const handleWithdrawl = () => {
    setIsVLoading(true);
    setTimeout(() => {
      setIsVLoading(false);
      if (!user) {
        openVerifyModal();
      } else {
        psetSheetOpen(false);
        router.push("/deposit");
      }
    }, 1000);
  };
  const handleRoutechange = (e: any) => {
    psetSheetOpen(false);
    router.push(`/${e}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-200">
      <div className="flex items-center justify-between px-6 pt-2 gap-2  border-t border-slate-800 text-gray-400 w-full  bg-gray-900">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <div className="flex flex-col relative items-center gap-1">
              <div
                className={`flex flex-col w-[70px] items-center gap-1 px-2 py-1 mb-1 -ml-[20px] relative `}
              >
                {/* <Menu    className={`w-6 h-6 absolute bottom-2 ${
                  sheetOpen ? "!text-orange-500 w-9 h-9" : "!text-white "
                }`} /> */}
               <div className="relative flex flex-col items-center gap-1">
  <div className="relative w-16 h-16 flex flex-col items-center justify-center">
    {/* Glowing animated 3D background */}
    <div
      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 
        blur-3xl opacity-70 scale-110 
        ${sheetOpen ? "animate-spin-slow" : ""}`}
    />

    {/* Floating Menu icon with tilt + shadow */}
    <Menu
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${sheetOpen ? "text-orange-400 w-10 h-10 scale-100" : "text-white w-8 h-8 scale-100"} 
        drop-shadow-2xl hover:scale-130 hover:rotate-[15deg] cursor-pointer`}
    />

    {/* Floating rings for 3D effect */}
    <div
      className={`absolute rounded-full border-2 border-orange-400 opacity-30 animate-spin-slow
        transition-all duration-500 ease-out
        ${sheetOpen ? "w-16 h-16 scale-115" : "w-12 h-12"}`}
    />
    <div
      className={`absolute rounded-full border-2 border-pink-400 opacity-20 animate-spin-slower
        transition-all duration-500 ease-out
        ${sheetOpen ? "w-14 h-14 scale-115 border-white" : "w-14 h-14"}`}
    />
  </div>

  {/* Label */}
  <span
    className={`text-white text-md font-medium drop-shadow-lg
      ${sheetOpen ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Menu
  </span>
</div>

              </div>
            </div>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-full h-[100%] p-0 bg-slate-800 overflow-y-auto"
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
                className="bg-orange-400 px-4 py-1 rounded-lg flex items-center justify-center z-100"
                onClick={() => setSheetOpen(false)} // This actually closes the sheet
              >
                <X className="w-8 h-8 text-gray-100 hover:text-red-600" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="p-4 space-y-2 text-lg text-gray-300">
              <img src="/b-1.jpg" alt="Logo" className="-mt-4 mb-2" />
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => item.children && toggleSection(item.name)}
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
                  className="px-3 w-full mb-[220px] mt-6 w-full py-[8px] text-lg bg-orange-400 text-white font-medium rounded hover:bg-blue-600"
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

        {/* Casino */}
<button
  onClick={goToCasino}
  className="flex flex-col w-[70px] items-center gap-1 px-2 py-1 mb-1 relative"
>
  <div className="relative w-16 h-16 flex flex-col items-center justify-center">
    {/* Glowing animated 3D background */}
    <div
      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 
        blur-3xl opacity-70 scale-110 
        ${isActive("/casino") ? "animate-spin-slow" : ""}`}
    />

    {/* Floating Star icon with tilt + shadow */}
    <Star
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${isActive("/casino") ? "text-orange-400 w-10 h-10 scale-100" : "text-white w-8 h-8 scale-100"} 
        drop-shadow-2xl hover:scale-130 hover:rotate-[15deg] cursor-pointer`}
    />

    {/* Floating rings */}
    <div
      className={`absolute rounded-full border-2 border-orange-400 opacity-30 animate-spin-slow
        transition-all duration-500 ease-out
        ${isActive("/casino") ? "w-16 h-16 scale-115" : "w-12 h-12"}`}
    />
    <div
      className={`absolute rounded-full border-2 border-pink-400 opacity-20 animate-spin-slower
        transition-all duration-500 ease-out
        ${isActive("/casino") ? "w-14 h-14 scale-115 border-white" : "w-14 h-14"}`}
    />
  </div>

  {/* Label */}
  <span
    className={`text-white text-md font-medium drop-shadow-lg
      ${isActive("/casino") ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Casino
  </span>
</button>



        {/* Slots */}
    <button
  onClick={goToSlots}
  className="flex flex-col w-[70px] items-center gap-1 px-4 py-1 mb-1 relative"
>
  <div className="relative w-16 h-16 flex flex-col items-center justify-center">
    {/* Glowing animated 3D background */}
    <div
      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 
        blur-3xl opacity-70 scale-110 
        ${isActive("/slots") ? "animate-spin-slow" : ""}`}
    />

    {/* Floating Dice6 icon with tilt + shadow */}
    <Dice6
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${isActive("/slots") ? "text-orange-400 w-10 h-10 scale-100" : "text-white w-8 h-8 scale-100"} 
        drop-shadow-2xl hover:scale-130 hover:rotate-[15deg] cursor-pointer`}
    />

    {/* Floating rings */}
    <div
      className={`absolute rounded-full border-2 border-orange-400 opacity-30 animate-spin-slow
        transition-all duration-500 ease-out
        ${isActive("/slots") ? "w-16 h-16 scale-115" : "w-12 h-12"}`}
    />
    <div
      className={`absolute rounded-full border-2 border-pink-400 opacity-20 animate-spin-slower
        transition-all duration-500 ease-out
        ${isActive("/slots") ? "w-14 h-14 scale-115 border-white" : "w-14 h-14"}`}
    />
  </div>

  {/* Label */}
  <span
    className={`text-white text-md font-medium drop-shadow-lg
      ${isActive("/slots") ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Slots
  </span>
</button>


 <button
  onClick={handleDeposit}
  className="flex w-[70px] flex-col items-center gap-1 mb-1 px-4 py-1 relative"
>
  <div className="relative w-16 h-16 flex flex-col items-center justify-center">
    {/* Glowing animated 3D background */}
    <div
      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 
        blur-3xl opacity-70 scale-110 
        ${isActive("/deposit") ? "animate-spin-slow" : ""}`}
    />

    {/* Floating Wallet icon with tilt + shadow */}
    <Wallet
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${isActive("/deposit") ? "text-orange-400 w-10 h-10 scale-100" : "text-white w-8 h-8 scale-100"} 
        drop-shadow-2xl hover:scale-130 hover:rotate-[15deg] cursor-pointer`}
    />

    {/* Floating rings */}
    <div
      className={`absolute rounded-full border-2 border-orange-400 opacity-30 animate-spin-slow
        transition-all duration-500 ease-out
        ${isActive("/deposit") ? "w-16 h-16 scale-115" : "w-12 h-12"}`}
    />
    <div
      className={`absolute rounded-full border-2 border-pink-400 opacity-20 animate-spin-slower
        transition-all duration-500 ease-out
        ${isActive("/deposit") ? "w-14 h-14 scale-115 border-white" : "w-14 h-14"}`}
    />
  </div>

  {/* Label */}
  <span
    className={`text-white text-md font-medium drop-shadow-lg
      ${isActive("/deposit") ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Deposit
  </span>
</button>


        {user && (
          <Sheet open={psheetOpen} onOpenChange={psetSheetOpen}>
            <SheetTrigger>
<div className="relative flex flex-col items-center gap-1">
  {/* Notification badge */}
  <span className="absolute -top-1.5 -right-[6px] bg-red-600 text-white text-xs z-50 font-bold px-2 py-[1px] rounded-full">
    {unreadCount || 0}
  </span>

  <div
    className={`relative w-16 h-16 flex flex-col items-center justify-center`}
  >
    {/* Glowing animated 3D background */}
    <div
      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 
        blur-3xl opacity-70 scale-110 
        ${psheetOpen ? "animate-spin-slow" : ""}`}
    />

    {/* Floating User icon with tilt + shadow */}
    <User
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${psheetOpen ? "text-orange-400 w-10 h-10 scale-100" : "text-white w-8 h-8 scale-100"} 
        drop-shadow-2xl hover:scale-130 hover:rotate-[15deg] cursor-pointer`}
    />

    {/* Floating rings */}
    <div
      className={`absolute rounded-full border-2 border-orange-400 opacity-30 animate-spin-slow
        transition-all duration-500 ease-out
        ${psheetOpen ? "w-16 h-16 scale-115" : "w-12 h-12"}`}
    />
    <div
      className={`absolute rounded-full border-2 border-pink-400 opacity-20 animate-spin-slower
        transition-all duration-500 ease-out
        ${psheetOpen ? "w-14 h-14 scale-115 border-white" : "w-14 h-14"}`}
    />
  </div>

  {/* Label */}
  <span
    className={`text-white text-md font-medium drop-shadow-lg
      ${psheetOpen ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Profile
  </span>
</div>

            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="w-full h-[100%] !top-[0px] !bottom-[0px] p-0 bg-slate-800 overflow-y-auto"
            >
              <VisuallyHidden>
                <DialogTitle>Mobile Menu</DialogTitle>
              </VisuallyHidden>

              {/* Custom Close Button */}
              <div className="p-4 flex justify-between">
                <div></div>
                <button
                  className="bg-orange-400 px-4 py-1 rounded-lg flex items-center justify-center z-100"
                  onClick={() => psetSheetOpen(false)} // This actually closes the sheet
                >
                  <X className="w-8 h-8 text-gray-700 hover:text-red-600" />
                </button>
              </div>

              <div className="min-h-screen -mt-12 bg-slate-800 text-white flex justify-center">
                <div className="w-full max-w-md px-4 py-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-lg font-bold">
                      I
                    </div>
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-lg">
                        {(user as any).created_at || ""}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <DotLoadingButton
                      onClick={() => handleRoutechange("withdraw")}
                      loading={isVLoading}
                      className=" flex-1 bg-slate-500 text-slate-200 hover:bg-zinc-700"
                    >
                      Withdrawal
                    </DotLoadingButton>
                    <DotLoadingButton
                      onClick={handleWithdrawl}
                      loading={isVLoading}
                      className=" flex-1 bg-orange-400 text-slate-200 hover:bg-zinc-700"
                    >
                      Deposit
                    </DotLoadingButton>
                  </div>

                  {/* Wallet Card */}
                  <Card className="bg-gradient-to-r from-slate-500 to-slate-900 text-slate-100 font-medium border-none">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-lg ">Main wallet</p>
                        <div className="flex gap-2">
                          {/* <EyeOff className="h-4 w-4 " />
                <RefreshCcw className="h-4 w-4 " /> */}
                        </div>
                      </div>

                      <div className="text-xl font-bold flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-green-500" />
                        {balance}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
                        <div>
                          <p className="text-lg ">VIP Points</p>
                          <p className="flex items-center gap-2 font-medium">
                            <Crown className="h-4 w-4 text-yellow-500" />0
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-lg bg-zinc-700 px-3 py-1 rounded-full">
                          Normal
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Menu */}
                  <div className="space-y-1">
                    <MenuItem
                      onClick={() => handleRoutechange("notifications")}
                      icon={Bell}
                      label="Notifications"
                      badge={
                        unreadCount !== null && unreadCount !== undefined
                          ? String(unreadCount)
                          : undefined
                      }
                    />
                    <MenuItem
                      onClick={() => handleRoutechange("personal-info")}
                      icon={User}
                      label="Personal info"
                    />
                    <MenuItem
                      onClick={() => handleRoutechange("personal-info")}
                      icon={Lock}
                      label="Login & Security"
                    />
                    <MenuItem icon={ShieldCheck} label="Verification" />
                    <MenuItem
                      onClick={() => handleRoutechange("transactions")}
                      icon={FileText}
                      label="Transaction records"
                    />
                    <MenuItem
                      onClick={() => handleRoutechange("betting")}
                      icon={TrendingUp}
                      label="Betting records"
                    />
                    <MenuItem
                      onClick={() => handleRoutechange("turnover")}
                      icon={Wallet}
                      label="Turnover"
                    />
                    <MenuItem icon={Crown} label="My VIP" />
                  </div>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="px-3 mb-[220px] mt-6 w-full py-[10px] text-lg bg-orange-400 text-white font-medium rounded hover:bg-blue-600"
                    >
                      Log Out
                    </button>
                  )}
                </div>
              </div>

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
        )}
      </div>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  badge,
  onClick,
}: {
  icon: any;
  label: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-zinc-800 transition"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 " />
        <span className="text-lg">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-lg bg-red-500 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 " />
      </div>
    </button>
  );
}
