"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Gamepad2,
  Dice6,
  Wallet,
  User,
  Crown,
  Activity,
  Rocket,
  X,
  MessageCircle,
  Star
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { getAuthUser } from "@/lib/auth";
import { gameImages } from "@/utils/gameData";
import { ExclusiveGrid } from "./ExclusiveGrid";
import { GameGrid } from "./GameGrid";
interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: string[] | React.ReactNode;
}



export default function MobileFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false); // Controlled sheet state
  const user = getAuthUser();
    const pathname = usePathname();
  const router = useRouter();
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
    window.location.href = "/login";
  };
  const menuItems: MenuItem[] = [
    { name: "Favourite", icon: <span>⭐</span>, link: "#" },
    {
      name: "Exclusive",
      icon: <Crown className="w-5 h-5 mr-1" />,
      children: (
        <ExclusiveGrid items={gameImages.exclusive} />
      ),
    },

    {
      name: "Sports",
      icon: <Activity className="w-5 h-5 mr-[6px]" />,
      children: (
      <GameGrid items={gameImages.sports}/>
      ),
    },
    {
      name: "Casino",
      icon: <Gamepad2 className="w-5 h-5 mr-[6px]" />,
      children: (
      <GameGrid items={gameImages.casino}/>
      ),
    },
    {
      name: "Slot",
      icon: <Dice6 className="w-5 h-5 mr-[8px]" />,
      children: (
      <GameGrid items={gameImages.slot}/>
      ),
    },
    {
      name: "Crash",
      icon: <Rocket className="w-5 h-5 mr-[6px]" />,
      children: (
      <GameGrid items={gameImages.crash}/>
      ),
    },

    {
      name: "Fishing",
      icon: <span>🎣</span>,
      children: (
      <GameGrid items={gameImages.fishing}/>
      ),
    },
  ];

    const goToCasino = () => {
      setSheetOpen(false)
    router.push("/casino");
  };
      const goToSlots = () => {
    router.push("/slots");
  };


  const goToPromotions = () => router.push("/promotions");

  // Helper to highlight active button
  const isActive = (path: string) => pathname === path;

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
                        <div onClick={() => setSheetOpen(false)} >
                        
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

        <button className="flex flex-col text-gray-400  items-center gap-1">
          <Wallet className="w-6 h-6 " />
          <span className="text-[12px]">Deposit</span>
        </button>

        {user && (
          <button className="relative flex flex-col items-center gap-1">
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[8px] font-bold px-1 py-[1px] rounded-full">
              4
            </span>
            <User className="w-6 h-6 text-orange-400" />
            <span className="text-[12px]">Profile</span>
          </button>
        )}
      </div>
    </div>
  );
}
