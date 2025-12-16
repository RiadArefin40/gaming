"use client";

import { Menu, Gamepad2, Dice6, Wallet, User, Crown, Activity, Rocket, X,MessageCircle  } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { getAuthUser } from "@/lib/auth";



interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: string[] | React.ReactNode;
}

const gameImages: Record<string, { id: number; src: string }[]> = {
  exclusive: [
    {
      id: 1,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-super-tiger.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 2,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-sexy-baccarat.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 3,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-7-up-7-down.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 4,
      src: "https://img.j189eb.com/jb/h5/assets/images/exclusivegames/default/menu/exclusive-7-up-7-down.png?v=1765526091482&source=drccdnsrc",
    },
  ],

  sports: [
    {
      id: 1,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-exchange.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 2,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-sportbook.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 3,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-horsebook.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 4,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-sbtech.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 5,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-cmd.svg?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 6,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/sports-type/icon-cmd.svg?v=1765526091482&source=drccdnsrc",
    },
  ],

  casino: [
    {
      id: 1,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/menu-type/active/icon-casino.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 2,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-evo.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 3,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-awcmpp.png?v=1765526091482&source=drccdnsrc",
    },
    {
      id: 4,
      src: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-awcmpp.png?v=1765526091482&source=drccdnsrc",
    },
  ],

  // 👇 same common images reused
  slot: [],
  fishing: [],
  arcade: [],
  lottery: [],
};

// reuse casino images for other categories
gameImages.slot = gameImages.casino;
gameImages.fishing = gameImages.casino;
gameImages.arcade = gameImages.casino;
gameImages.lottery = gameImages.casino;

export default function MobileFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false); // Controlled sheet state
  const user = getAuthUser();
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
    <>
    <div className="grid grid-cols-3 gap-3 my-4 px-4">
      {gameImages.exclusive.map((game) => (
        <div
          key={game.id}
          className="flex items-center justify-center rounded-xl"
        >
          <img
            src={game.src}
            alt="exclusive-game"
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </div>
         <div className="flex justify-center ">
        <button
          // onClick={() => router.push("/login")}
          className="px-3 w-[172px] h-[55px] py-[6px] text-lg font-medium bg-orange-400 text-white font-medium rounded hover:bg-blue-600 "
        >
          More
        </button>
      </div>
      </>
  ),
},

    { name: "Sports", icon: <Activity className="w-5 h-5 mr-[6px]" />, children: (  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>) },
    { name: "Casino", icon: <Gamepad2 className="w-5 h-5 mr-[6px]" />, children: (  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>)  },
    { name: "Slot", icon: <Dice6 className="w-5 h-5 mr-[8px]" />, children: (  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>) },
    { name: "Crash", icon: <Rocket className="w-5 h-5 mr-[6px]" />,  children: (  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>)  },
    { name: "Table", icon: <span>🪑</span>,  children: (  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>)  },
    { name: "Fishing", icon: <span>🎣</span>, children: (  <div className="flex flex-wrap gap-2 p-4">
    {gameImages.casino.map((item, idx) => (
      <div
        data-card
        key={item.id}
        className={`
          snap-center flex-shrink-0 basis-[48%] max-w-[48%] pt-2 p-1
          flex flex-col items-center justify-center cursor-pointer select-none
          transition-all duration-300 ease-out border
          bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
          border-slate-700
        `}
      >
        <div className="flex items-center gap-2">
          <img className="w-12" src={item.src} alt="" />
          <span className="text-sm font-medium">Provider-{item.id}</span>
        </div>
      </div>
    ))}
  </div>) },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-200">


      <div className="flex items-center justify-between px-6 py-4  border-t text-gray-400 w-full  bg-gray-900">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <div className="flex flex-col items-center gap-1">
              <Menu className="w-6 h-6 text-orange-400" />
              <span className="text-[12px]">Menu</span>
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="w-full h-[85%] !top-[57px] !bottom-[57px] p-0 bg-slate-800 overflow-y-auto">
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
                    {item.children && <span>{openSections[item.name] ? "▲" : "▼"}</span>}
                  </button>
                  {item.children && openSections[item.name] && (
                    <>
                      {Array.isArray(item.children) ? (
                        <ul className="pl-8 mt-1 space-y-1">
                          {item.children.map((child, cidx) => (
                            <li key={cidx}>
                              <a href="#" className="block py-1 text-gray-700 hover:text-purple-700">
                                {child}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        item.children
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
