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
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState,useEffect } from "react";
import { getAuthUser } from "@/lib/auth";
import { gameImages } from "@/utils/gameData";
import { ExclusiveGrid } from "./ExclusiveGrid";
import { CasinoGrid } from "./CasinoGrid";
import { useAuthModal } from "@/store/useAuthModal";
import { DotLoadingButton } from "./DotLoadingButton";
import {useAutoFetch} from "@/hooks/use-auto-fetch"

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

export default function MobileFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false); 
   const [psheetOpen, psetSheetOpen] = useState(false); 
     const [isLoadinge,setIsLoading] = useState(false);
          const [isVLoading,setIsVLoading] = useState(false);
       const { openModal:openVerifyModal, closeModal } = useVerifyModal();
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
const [unreadCount, setUnread] = useState(null)
const [notifications, setNotifications] = useState(null)
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
          setNotifications(data.notifications)
          console.log('notofication', data)
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
    router.push("/casino");
  };
  const goToSlots = () => {
    router.push("/slots");
  };

  const goToPromotions = () => router.push("/promos");

  // Helper to highlight active button
  const isActive = (path: string) => pathname === path;
  const handleDeposit = () => {
    if(!user){
        openModal();
    }
    else{
      router.push('/deposit')
    }
  
  }

  const handleWithdrawl = () =>{
    setIsVLoading(true)
       setTimeout(() => {
          setIsVLoading(false);
          openVerifyModal()
          }, 1000); 

  }
  const handleRoutechange = (e:any) =>{
    psetSheetOpen(false)
    router.push(`/${e}`)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-200">
      <div className="flex items-center justify-between px-6 py-4  border-t text-gray-400 w-full  bg-gray-900">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex flex-col items-center gap-1 px-2 py-1 relative ${
                  sheetOpen ? "text-orange-400" : "text-gray-400"
                }`}
              >
                <Menu className="w-6 h-6 " />
                <span className="text-[12px]">Menu</span>
                {sheetOpen && (
                  <span className="absolute -top-1 w-full h-1 bg-orange-400 rounded-t-md"></span>
                )}
              </div>
            </div>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-full h-[85%] !top-[57px] !bottom-[57px] p-0 bg-slate-800 overflow-y-auto"
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
                className="bg-gray-300 px-4 py-1 rounded-lg flex items-center justify-center z-100"
                onClick={() => setSheetOpen(false)} // This actually closes the sheet
              >
                <X className="w-8 h-8 text-gray-700 hover:text-red-600" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="p-4 space-y-2 text-lg text-gray-300">
              <img src="/b-1.jpg" alt="Logo" className="-mt-4 mb-2" />
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => item.children && toggleSection(item.name)}
                    className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100"
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
                  className="px-3 mb-[220px] mt-6 w-[175px] py-[6px] text-sm bg-orange-400 text-white font-medium rounded hover:bg-blue-600"
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
          className={`flex flex-col items-center gap-1 px-2 py-1 relative ${
            isActive("/casino") ? "text-orange-400" : "text-gray-400"
          }`}
        >
          <Star className="w-6 h-6" />
          <span className="text-[12px]">Casino</span>
          {isActive("/casino") && (
            <span className="absolute -top-1 w-full h-1 bg-orange-400 rounded-t-md"></span>
          )}
        </button>

        {/* Slots */}
        <button
          onClick={goToSlots}
          className={`flex flex-col items-center gap-1 px-4 py-1 relative ${
            isActive("/slots") ? "text-orange-400  " : "text-gray-400 "
          }`}
        >
          <Dice6 className="w-6 h-6" />
          <span className="text-[12px]">Slots</span>
          {isActive("/slots") && (
            <span className="absolute -top-1 w-full h-1 bg-orange-400 rounded-t-md"></span>
          )}
        </button>

        <button onClick={handleDeposit} className="flex flex-col text-gray-400  items-center gap-1">
          <Wallet className="w-6 h-6 " />
          <span className="text-[12px]">Deposit</span>
        </button>

        {user && (
          <Sheet open={psheetOpen} onOpenChange={psetSheetOpen}>
            <SheetTrigger>
              <div className="relative flex flex-col items-center gap-1">
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[12px] font-bold px-1 py-[1px] rounded-full">
                  {unreadCount}
                </span>
                <div
                  className={`flex flex-col items-center gap-1 px-2 py-1 relative ${
                    psheetOpen ? "text-orange-400" : "text-gray-400"
                  }`}
                >
                  <User className="w-6 h-6 " />
                  <span className="text-[12px]">Profile</span>
                  {psheetOpen && (
                    <span className="absolute -top-1 w-full h-1 bg-orange-400 rounded-t-md"></span>
                  )}
                </div>
              </div>
            </SheetTrigger>

               <SheetContent
            side="bottom"
            className="w-full h-[91%] !top-[0px] !bottom-[57px] p-0 bg-slate-800 overflow-y-auto"
          >
            <VisuallyHidden>
              <DialogTitle>Mobile Menu</DialogTitle>
            </VisuallyHidden>

            {/* Custom Close Button */}
            <div className="p-4 flex justify-between">
              <div>

              </div>
              <button
                className="bg-gray-300 px-4 py-1 rounded-lg flex items-center justify-center z-100"
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
            <p className="text-xs ">
              Sign up date : 2025-12-12
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
             <DotLoadingButton
             onClick = {handleWithdrawl}
                          loading={isVLoading}
                          className=" flex-1 bg-slate-500 text-slate-200 hover:bg-zinc-700"
                        >
                           Withdrawal
              </DotLoadingButton>
         <DotLoadingButton
             onClick = {handleWithdrawl}
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
              <p className="text-sm ">Main wallet</p>
              <div className="flex gap-2">
                <EyeOff className="h-4 w-4 " />
                <RefreshCcw className="h-4 w-4 " />
              </div>
            </div>

            <div className="text-xl font-bold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-500" />
              {balance}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
              <div>
                <p className="text-sm ">VIP Points</p>
                <p className="flex items-center gap-2 font-medium">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  0
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm bg-zinc-700 px-3 py-1 rounded-full">
                Normal
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Menu */}
        <div className="space-y-1">
          <MenuItem onClick = {()=>handleRoutechange('notifications')} icon={Bell} label="Notifications"   badge={unreadCount !== null && unreadCount !== undefined ? String(unreadCount) : undefined} />
          <MenuItem  onClick = {()=>handleRoutechange('personal-info')} icon={User} label="Personal info" />
          <MenuItem onClick = {()=>handleRoutechange('personal-info')} icon={Lock} label="Login & Security" />
          <MenuItem icon={ShieldCheck} label="Verification" />
          <MenuItem onClick = {()=>handleRoutechange('transactions')} icon={FileText} label="Transaction records" />
          <MenuItem onClick = {()=>handleRoutechange('betting')} icon={TrendingUp} label="Betting records" />
          <MenuItem onClick = {()=>handleRoutechange('turnover')} icon={Wallet} label="Turnover" />
          <MenuItem icon={Crown} label="My VIP" />
        </div>
        {user && (
                <button
                  onClick={handleLogout}
                  className="px-3 mb-[220px] mt-6 w-[175px] py-[6px] text-sm bg-orange-400 text-white font-medium rounded hover:bg-blue-600"
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
  icon: any
  label: string
  badge?: string
  onClick?: () => void
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-zinc-800 transition">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 " />
        <span className="text-sm">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 " />
      </div>
    </button>
  )
}