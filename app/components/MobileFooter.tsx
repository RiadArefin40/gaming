"use client";

import { Menu, Gamepad2, Dice6, Wallet, User, Crown, Activity, Rocket, X,MessageCircle  } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: string[];
}

export default function MobileFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false); // Controlled sheet state

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems: MenuItem[] = [
    { name: "পছন্দের", icon: <span>⭐</span>, link: "#" },
    { name: "এক্সক্লুসিভ", icon: <Crown className="w-5 h-5" />, children: ["Option 1", "Option 2"] },
    { name: "স্পোর্ট", icon: <Activity className="w-5 h-5" />, children: ["Football", "Cricket"] },
    { name: "ক্যাসিনো", icon: <Gamepad2 className="w-5 h-5" />, children: ["Live Casino", "Table Games"] },
    { name: "স্লট", icon: <Dice6 className="w-5 h-5" />, children: ["Slot 1", "Slot 2"] },
    { name: "ক্র্যাশ", icon: <Rocket className="w-5 h-5" />, children: ["Crash 1", "Crash 2"] },
    { name: "টেবিল", icon: <span>🪑</span>, children: ["Table 1", "Table 2"] },
    { name: "ফিশিং", icon: <span>🎣</span>, children: ["Fish 1", "Fish 2"] },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-200">


      <div className="flex items-center justify-between px-6 py-4  border-t text-gray-300 w-full  bg-gray-900">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <div className="flex flex-col items-center gap-1">
              <Menu className="w-6 h-6 text-orange-400" />
              <span className="text-[12px]">Menu</span>
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="w-full h-[85%] !top-[57px] !bottom-[57px] p-0 overflow-y-auto">
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
            <ul className="p-4 space-y-2 text-lg text-gray-800">
              <img src="/banner/Screenshot 2025-12-12 161900.png" alt="Logo" className="" />
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
                    {item.children && <span>{openSections[item.name] ? "▲" : "▼"}</span>}
                  </button>
                  {item.children && openSections[item.name] && (
                    <ul className="pl-8 mt-1 space-y-1">
                      {item.children.map((child, cidx) => (
                        <li key={cidx}>
                          <a href="#" className="block py-1 text-gray-700 hover:text-purple-700">
                            {child}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
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
     

        <button className="flex flex-col items-center gap-1">
          <Gamepad2 className="w-6 h-6 text-orange-400" />
          <span className="text-[12px]">Casino</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <Dice6 className="w-6 h-6 text-orange-400" />
          <span className="text-[12px]">Slots</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <Wallet className="w-6 h-6 text-orange-400" />
          <span className="text-[12px]">Deposit</span>
        </button>

        <button className="relative flex flex-col items-center gap-1">
          <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[8px] font-bold px-1 py-[1px] rounded-full">
            4
          </span>
          <User className="w-6 h-6 text-orange-400" />
          <span className="text-[12px]">Profile</span>
        </button>
      </div>
    </div>
  );
}
