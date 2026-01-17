"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowRight, LogIn, Plus, RotateCw, UserPlus, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getAuthUser } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useAutoFetch } from "@/hooks/use-auto-fetch";
import RefreshButton from "./RefreshButton";
import { ex } from "@/utils/exclusive";

import { gameImages } from "@/utils/gameData";

import { useAuthModal } from "@/store/useAuthModal";
import { DotLoadingButton } from "./DotLoadingButton";
import { CasinoGrid } from "./CasinoGrid";

import { ExclusiveGrid } from "./ExclusiveGrid";

import { SlotGrid } from "./SlotGrid";
import { CrashGrid } from "./CrashGrid";

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

import { Button } from "@/components/ui/button";
import { CasinoCol } from "./CasinoCol";
import { SlotCol } from "./SlotCol";
import { CrashCol } from "./CrashCol";
import Profile from "./Profile";
interface SocialLink {
  platform: "telegram" | "whatsapp" | "messenger";
  group_link: string;
  is_active: boolean;
}

type SocialLinksMap = {
  [key in SocialLink["platform"]]: string | null;
};
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

const category = [
   { id: 1, name: "Exclusive", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-hotgame.svg?v=1767782599110&quot" },
  { id: 2, name: "Sports", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-sport.svg?v=1767782599110&quot"  },
  { id: 3, name: "Casino", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-casino.svg?v=1767782599110&quot"  },
  { id: 4, name: "Slot", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-slot.svg?v=1767782599110&quot"  },
  { id: 5, name: "Crash", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-crash.svg?v=1767782599110&quot"  },
  { id: 6, name: "Fishing", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-hotgame.svg?v=1767782599110&quot"  },
  { id: 7, name: "Arcade", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-arcade.svg?v=1767782599110&quot"  },
  { id: 8, name: "Lottery", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-lottery.svg?v=1767782599110&quot"  },
]

const features = [
  { id: 1, name: "Promotions", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-promotion.svg?v=1767782599110" },
  { id: 2, name: "Downloads", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-download.svg?v=1767782599110" },
  
  { id: 4, name: "Ambassador", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-ambassador.svg?v=1767782599110" },
];

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
   // { name: "Favourite", icon: <span>⭐</span>, link: "#" },
    {
      name: "Exclusive",
      icon: <Crown className="w-5 h-5 mr-1" />,
      children: <ExclusiveGrid items={ex} />,
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
 const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { data, error } = useAutoFetch<BalanceData | undefined>(
    user ? `https://api.bajiraj.cloud/users/${user.id}/balance` : "",
    10000
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const balance = data?.balance ?? 0;
    const [open, setOpen] = useState(false);

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

 const [psheetOpen, psetSheetOpen] = useState(false);

 const [links, setLinks] = useState<SocialLinksMap>({
    telegram: null,
    whatsapp: null,
    messenger: null,
  });
const [isVisible, setIsVisible] = useState(false);
const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
useEffect(() => {
  setIsVisible(true);
}, []);
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await fetch("https://api.bajiraj.cloud/users/social-link");
        const data: { data: SocialLink[] } = await res.json();

        const formatted: SocialLinksMap = {
          telegram: null,
          whatsapp: null,
          messenger: null,
        };

        data.data.forEach((item) => {
          formatted[item.platform] = item.is_active ? item.group_link : null;
        });

        setLinks(formatted);
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      }
    };

    fetchSocialLinks();
  }, []);

  

  const handleProfile = () =>{
  console.log('okkk');
  setSheetOpenS(false);
  setTimeout(()=>{
router.push('/profile')
  }, 100)

}
const handleLogin = () =>{
  console.log('okkk');
  setSheetOpenS(false);
  setTimeout(()=>{
router.push('/login')
  }, 100)

}

const handleHome = () =>{
  console.log('okkk');
  setSheetOpenS(false);
  setTimeout(()=>{
router.push('/')
  }, 100)

}


const handleSignUp = () =>{
  console.log('okkk');
  setSheetOpenS(false);
  setTimeout(()=>{
router.push('/registration')
  }, 100)

}

const handlePSheet = ()=>{
  psetSheetOpen(true);

  //   setTimeout(()=>{
  //   setSheetOpenS(false);
  // }, 100)

}
  const handleLogout = () => {
    // remove user data
    localStorage.removeItem("auth_user");

    // optional: remove token
    // localStorage.removeItem("token");

    // redirect after logout
    window.location.href = "/login";
  };
const [isSwitching, setIsSwitching] = useState(false);
const [subMenu, setSubMenu] = useState("")
const handleSubmenuOpen = (name: any) => {
  if (subMenu === name) return;

  // trigger slide-out
  setIsSwitching(true);
   setSubMenu(name);   
  setTimeout(() => {
         // change submenu
    setIsSubmenuOpen(true);
    setIsSwitching(false);      // slide back in
  }, 200); // must match transition duration
};

 
  // Icon mapping
  const icons: Record<SocialLink["platform"], string> = {
    telegram: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-telegram-channel.svg",
    whatsapp: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-whatsapp.svg",
    messenger: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-facebook.svg",
  };
                      const translateClass = !isSubmenuOpen
  ? "-translate-x-150"
  : subMenu
  ? "translate-x-0"
  : "-translate-x-100";

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

      const handleModal = () => {
    console.log('kkkkkkkkkk')
    setSheetOpenS(false)
psetSheetOpen(false)
  };
  return (


    <>
      {!isActive("/login") && !isActive("/registration") && !isActive("/profile") && !isActive("/deposit") && !isActive("/user-bets") && !isActive("/turnover") && !isActive("/transactions") && isVisible &&
      
      (

        <>
               {sheetOpen && (
        <div className="fixed max-w-screen inset-0 bg-black/30  z-40 transition-opacity" />
      )}

      <div className="flex fixed top-0 w-full items-center justify-between px-4 py-3 !h-[60px] shadow-md z-50 bg-black-700">
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
                          className={`absolute inset-0 rounded-full from-orange-300 
        blur-3xl opacity-70 scale-110 
        ${sheetOpenS ? "animate-spin-slow" : ""}`}
                        />



<button
  className="flex bg-transparent flex-col justify-between w-[25px] h-[18px] focus:outline-none"
 // your function
>
  <span className="block h-0.5 !bg-yellow-300/90  rounded"></span>
  <span className="block h-0.5 bg-yellow-300/90  rounded"></span>
  <span className="block h-1 bg-yellow-300/90 rounded"></span>
</button>
                      </div>

                    </div>
                  </div>
                </div>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-full max-h-screen  h-full z-400 p-0 bg-transparent backdrop-blur-md overflow-y-auto"
              >
                <VisuallyHidden>
                  <DialogTitle>Mobile Menu</DialogTitle>
                </VisuallyHidden>

                {/* Custom Close Button */}
                <div className="p-4 flex justify-between">
                  <div>


                    
                  </div>
          
                  <button
                    className=" px-4 py-1 rounded-lg -mr-6 -mt-3  flex items-center justify-center h-10 z-100"
                    onClick={() => {
setIsSubmenuOpen(false)
    setSubMenu("");                 // reset submenu
    setSheetOpenS(false);             // close sheet
  }}// This actually closes the sheet
                  >
                    <X className="w-9 h-9  text-gray-100 hover:text-red-600" />
                  </button>
                </div>
<div className="flex gap-4">
    {/* Menu Items */}
                <div className="w-2/3 ml-2 -mt-8">
                <div className="bg-black-700 rounded-t-md flex  items-center">
                <img className="w-[120px]" src="https://img.m156b.com/mb/h5/assets/images/dark/animation/head-coin.png?v=1767782599110" alt="" />
                {!user?  <p className="text-yellow-300 text-lg font-medium">Hi! Welcome</p> :(
                  <div className="relative flex  items-center">
<div>
    <p className="text-yellow-300 text-lg font-medium">{user?.name}</p>
                   <p className="text-yellow-300 text-lg font-medium">Profile</p>

</div>
                      
                          {user && (
                              <Sheet open={psheetOpen} onOpenChange={handlePSheet}>
                                <SheetTrigger>
             <ArrowRight  className="absolute left-20 top-4" size={26} color="yellow" /> 
                                </SheetTrigger>
                    
                           <Profile onAction={handleModal}/>
                              </Sheet>
                            )}
                  </div>
              
                )
                }
              
                </div>

                {!user ? (
                  <div className="bg-yellow-300 flex gap-10 justify-center py-4 rounded-b-md flex items-center">
               
               <Button  className="text-slate-900 bg-transparent z-100"  onClick={() => handleLogin()}>
                <LogIn/>
<span>Login</span>
               </Button>
                              <Button  className="text-slate-900 bg-transparent z-100"  onClick={() => handleSignUp()}>
                <UserPlus/>
<span>Sign Up</span>
               </Button>
                </div>
                ):(

                                    <div className="bg-yellow-300 flex px-4 justify-between py-4 rounded-b-md flex items-center">
                                      <div>

                                                                            <p className="text-slate-900 font-medium">                      Main Wallet</p>
                                        <RefreshButton
                balance={balance}
                loading={isLoading}
                onRefresh={async () => {
                  fetchBalance();
                }}
              />

                                      </div>
  
<div className="p-[6px] secondary-bg-1 rounded-full">
<img src="https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-bonuses.svg?v=1768297086272&quot" alt="" />
</div>
                              
                </div>
                )}

             <div className="grid grid-cols-3 gap-2 mt-2">
      {category.map((item) => (
     <div
  onClick={() => handleSubmenuOpen(item.name)}
  key={item.id}
  className={`px-5 py-3 rounded-md flex flex-col items-center
    ${subMenu === item.name ? 'bg-white/20 backdrop-blur-xs text-black' : 'bg-black-700 text-slate-200'}
  `}
>
  <img
    className="bg-yellow-300 p-[1px] rounded-full mb-2"
    src={item.icon}
    alt={item.name}
  />
  <span className="text-sm font-medium">{item.name}</span>
</div>
      ))}
    </div>
    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 mt-2 bg-black-700 p-2 rounded-md">
      {features.map((item) => (
        <div
          key={item.id}
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2 "
            src={item.icon}
            alt={item.name}
          />
          <span className="text-slate-200 text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-2 bg-black-700 p-2 rounded-md">

        <div
        
          className=" p-2 -ml-12 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2 "
            src="https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-referral-program.svg?v=1767782599110&quot"
            alt="reffer"
          />
          <span className="text-slate-200 text-sm font-medium ml-2">Reffer Program</span>
        </div>
 
    </div>
        <div className="grid grid-cols-2  gap-1 mt-2 bg-black-700 p-2 rounded-md">

        <div
        
          className=" rounded-md flex -ml-12 flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2 "
            src="  https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-customer.svg?v=1767782599110&quot"
            alt="reffer"
          />
          <span className="text-slate-200 text-sm font-medium ml-2">Live Chat</span>
        </div>
 
    </div>

            <div className="grid grid-cols-2 p-2  gap-1 mt-2 bg-black-700 pt-4 rounded-md">

        <div
        
          className=" rounded-md flex   items-center"
        >
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2 "
            src="https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-login.svg?v=1767782599110&quot"
            alt="reffer"
          />
          {!user ? ( <Button  onClick={() => handleLogin()} className="bg-transparent -mt-2 z-100">    <span className="text-slate-200 text-lg font-medium -ml-1">Login</span></Button>):(
             <Button   onClick={handleLogout} className="bg-transparent -mt-2 z-100">    <span className="text-slate-200 ext-lg font-medium -ml-1">Sign Out</span></Button>
          )}
        
        </div>
              <div
        
          className="flex rounded-md flex  items-center"
        >
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2 "
            src="https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-home.svg?v=1767782599110&quot"
            alt="reffer"
          />
         <Button onClick={() => handleHome()} className="bg-transparent  -mt-2 z-100">    <span className="text-slate-200 text-lg font-medium -ml-1">Home</span></Button>
        </div>
 
    </div>
  

                </div>

                {/* submenu */}
               
                  {/* <div className="inset-0 bg-white/30 rounded-lg  -mt-8" >
                                 <div className="gap-2  mt-2">
      {category.map((item) => (
        <div key={item.id} className=" px-5 py-3  mb-2  rounded-md flex flex-col items-center">
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2"
            src={item.icon}
            alt={item.name}
          />
          <span className="text-slate-200 text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>

                  </div> */}

                    <div
        className={`
      fixed top-12 left-[70%] h-[86%] w-[120px] 
    rounded-lg p-4
    bg-white/20 backdrop-blur-xs shadow-lg
    overflow-y-auto
    
${
      !isSubmenuOpen
        ? "-translate-x-150 transition-transform ease-in-out duration-50 "
        : isSwitching
        ? "-translate-x-26 opacity-20 transition-transform duration-50 ease-linear "
        : "translate-x-0 transition-transform ease-in-out duration-600"
    }
        `}
      >
        {/* <button
          className="text-black mb-4"
          onClick={() => setIsSubmenuOpen(false)}
        >
       
        </button> */}

        <div className="mb-2  ">
          {subMenu == 'Exclusive'&& ex.map((item) => (
            <div
              key={item.id}
              className="flex flex-col mb-2 items-center py-3 rounded-md hover:scale-105 transition-transform"
            >
              <img
                className="bg-yellow-300 p-[1px]  mb-2 w-16 h-14"
                src={item.image}
                alt={item.title}
              />
              <span className="text-slate-200 text-sm font-medium">{item.title}</span>
            </div>
          ))}
                {subMenu == 'Sports'&& gameImages.sports.map((item:any) => (
            <div
              key={item.id}
              className="flex flex-col  items-center py-3 rounded-md hover:scale-105 transition-transform"
            >
              <img
                className=" rounded-full mb-2 w-18 p-2"
                src={item.src}
                alt={item.title}
              />
              <span className="text-slate-200 text-sm -mt-2 font-medium">{item.title}</span>
            </div>
          ))}
                     {subMenu == 'Casino'&& (
                      <CasinoCol items={gameImages.casino}/>
                     )}
                        {subMenu == 'Slot'&& (
                      <SlotCol items={gameImages.slot}/>
                     )}
                            {subMenu == 'Crash'&& (
                      <CrashCol items={gameImages.crash}/>
                     )}


        </div>
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

        {isVisible&&(
<img src="/oie_119753jyAZNTiD.png" className="w-[110px] -ml-8 " alt="" />
        )}

          </div>
        </div>

        <div className="flex items-center gap-1 z-50">
          {user && (
            <div className="flex items-center">
                  <button
                      className="w-full px-2 py-[1px] rounded-md bg-yellow-300 text-slate-900 font-semibold hover:scale-105 transition-transform"
                        onClick={() => {
                        router.push("/deposit");
                        setIsOpen(false);
                      }}
                    >
                      Deposit
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
                  className="bg-gray-300 px-2 py-1 rounded-lg flex items-center justify-center px-3 z-50 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-yellow-600"
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
                      className="text-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-yellow-600 w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform"
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
    px-2 py-[2px] w-[70px]
    text-sm font-bold 
    rounded-md
    text-slate-900
    bg-yellow-300
    backdrop-blur-md
  "
>
  Login
</button>

<button
 onClick={() => router.push("/registration")}
  className="
    px-2 py-[2px] w-[70px]
    text-sm font-bold 
    rounded-md
    bg-white  text-slate-900
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
              <button className="w-8 p-2 h-8 flex items-center justify-center border-2 border-yellow-400 ml-2 rounded-xl">
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
                  className="bg-gray-300 px-2 py-1 rounded-lg flex items-center justify-center px-3 z-50 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white font-medium rounded hover:bg-yellow-600"
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
                        ? "bg-yellow-300 text-white"
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
      )
      }
      {/* Blur overlay */}
 
    </>
  );
}
