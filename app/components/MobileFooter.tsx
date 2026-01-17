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
  HomeIcon,
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
import { ex } from "@/utils/exclusive";
import RefreshButton from "./RefreshButton";

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
  if (!user) return; // safety check

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`https://api.bajiraj.cloud/notifications/user/${user.id}`);
      const data = await res.json();
      setUnread(data.unread_count);
      // setNotifications(data.notifications);
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotifications(); // fetch immediately
  const interval = setInterval(fetchNotifications, 30000); // fetch every 10s

  return () => clearInterval(interval); // cleanup on unmount
}, [user?.id]); // minimal dependency just to get user.id

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
         setLink("/all-casino")
    setSheetOpen(false);
  
    router.push("/all-casino");
  };
  const goToSlots = () => {
       setLink("/all-slot")
    setSheetOpen(false)
 
    router.push("/all-slot");
  };
 const goToHome  = () => {
    setLink("/")
    setSheetOpen(false)
  
    router.push("/");
  };
  const goToPromotions = () => router.push("/promos");
 const [link, setLink] = useState("")
  // Helper to highlight active button
  // const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/") || link === path;
 const isActive = (path: string) => {
  if (link) return link === path;

  return pathname === path || pathname.startsWith(path + "/");
};




  const handleDeposit = () => {

      setTimeout(()=>{setLink("/deposit")
        psetSheetOpen(false)
        router.push("/deposit");
      }, 300)
      
    
  };
      const handleReferral = () => {
               psetSheetOpen(false)
     setTimeout(()=>{
      
        router.push("/referrals");
      }, 300)
  };
      const handleBetting = () => {
               psetSheetOpen(false)
     setTimeout(()=>{
    
        router.push("/user-bets");
      }, 300)
  };
        const handleturnOver = () => {
                 psetSheetOpen(false)
     setTimeout(()=>{
   
        router.push("/turnover");
      }, 300)
  };
        const handleTransaction = () => {
                 psetSheetOpen(false)
     setTimeout(()=>{
    
        router.push("/transactions");
      }, 300)
  };

  const handleWithdrawl = () => {
    setIsVLoading(true);
    setTimeout(() => {
      setIsVLoading(false);
   
      psetSheetOpen(false)
   
        router.push("/withdraw");
      
    }, 300);
  };
  const handleRoutechange = (e: any) => {
    psetSheetOpen(false);
    router.push(`/${e}`);
  };

    const fetchBalance = () => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
    }, 3000); // 1.5 seconds delay
  };
const features = [
  { id: 1, name: "Promotions", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-promotion.svg?v=1767782599110" },
  { id: 2, name: "Downloads", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-download.svg?v=1767782599110" },
  
  { id: 4, name: "Ambassador", icon: "https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-ambassador.svg?v=1767782599110" },
];
  return (
  
<>
  {user && (

     <div className="fixed min-w-screen bottom-0 left-0 right-0 md:hidden z-50 !bg-black-800">
      <div className="flex items-center justify-between px-6  gap-2   border-t border-slate-800 text-gray-400 w-full  bg-black-700">
     
<button
  onClick={goToHome}
  className="flex flex-col w-[70px] items-center gap-1 px-2  -ml-[20px] relative"
>

     <div className={`relative w-14 h-12 flex flex-col items-center justify-center    rounded-full  ${isActive("/") ? "bottom-4 bg-yellow-600": " "}`}>
    {/* Glowing animated 3D background */}
    <div
      className={`absolute 
        scale-100
        ${isActive("/") ? "animate-spin-slow primary-bg p-[15px] rounded-full z-4" : ""}`}
    />
        <div
      className={`absolute 
        scale-100
        ${isActive("/") ? "animate-spin-slow secondary-bg p-5 rounded-full z-3" : ""}`}
    />
        <div
      className={`absolute 
        scale-100
        ${isActive("/") ? "animate-spin-slow bg-black-700 p-6 rounded-full w-16 h-16" : ""}`}
    />

    {/* Floating Star icon with tilt + shadow */}
    <HomeIcon
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-5
        transition-all duration-500 ease-out transform 
        ${isActive("/") ? "text-slate-900 w-6 h-6 scale-100 " : "text-white w-6 h-6 scale-100"} 
        drop-shadow-2xl hover:scale-130  cursor-pointer`}
    />

  
  </div>


  {/* Label */}
  <span
    className={`-mt-4 text-white text-md font-medium drop-shadow-lg
      ${isActive("/") ? "!font-bold -mt-[22px] -mb-2 text-slate-100 font-bold" : "text-white font-normal"}`}
  >
    Home
  </span>
</button>

        {/* Casino */}
<button
  onClick={goToCasino}
  className="flex flex-col w-[70px] items-center gap-1 px-2 py-1  relative"
>


      <div className={`relative w-14 h-12 flex flex-col items-center justify-center    rounded-full  ${isActive("/all-casino") ? "bottom-4 bg-yellow-600": " "}`}>
    {/* Glowing animated 3D background */}
    <div
      className={`absolute 
        scale-100
        ${isActive("/all-casino") ? "animate-spin-slow primary-bg p-[15px] rounded-full z-4" : ""}`}
    />
        <div
      className={`absolute 
        scale-100
        ${isActive("/all-casino") ? "animate-spin-slow secondary-bg p-5 rounded-full z-3" : ""}`}
    />
        <div
      className={`absolute 
        scale-100
        ${isActive("/all-casino") ? "animate-spin-slow bg-black-700 p-6 rounded-full w-16 h-16" : ""}`}
    />

    {/* Floating Star icon with tilt + shadow */}
    <Star
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-5
        transition-all duration-500 ease-out transform 
        ${isActive("/all-casino") ? "text-slate-900 w-6 h-6 scale-100 " : "text-white w-6 h-6 scale-100"} 
        drop-shadow-2xl hover:scale-130  cursor-pointer`}
    />

  
  </div>







  {/* Label */}
  <span
    className={`-mt-4 text-white text-md font-medium drop-shadow-lg
      ${isActive("/all-casino") ? "!font-bold -mt-[22px] text-slate-100" : "text-white font-normal"}`}
  >
    Casino
  </span>
</button>



        {/* Slots */}
    {/* <button
  onClick={goToSlots}
  className="flex flex-col w-[70px] items-center gap-1 px-4 py-1 z-300  relative"
>
  <div className="relative w-14 h-12 flex flex-col items-center justify-center">
 
    <div
      className={`absolute 
        blur-3xl opacity-70 scale-100
        ${isActive("/all-slot") ? "animate-spin-slow" : ""}`}
    />


    <Dice6
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${isActive("/all-slot") ? "text-orange-400 w-7 h-7 scale-100" : "text-white w-6 h-6 scale-100"} 
        drop-shadow-2xl hover:scale-130  cursor-pointer`}
    />

 </div>


  <span
    className={`-mt-4 text-white text-md font-medium drop-shadow-lg
      ${isActive("/all-slot") ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Slots
  </span>
</button> */}

{/* 
 <button
  onClick={handleDeposit}
  className="flex w-[70px] flex-col items-center gap-1  px-4 py-1 relative"
>
  <div className="relative w-14 h-12 flex flex-col items-center justify-center">
 
    <div
      className={`absolute 
        blur-3xl opacity-70 scale-100
        ${isActive("/deposit") ? "animate-spin-slow" : ""}`}
    />


    <Wallet
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${isActive("/deposit") ? "text-orange-400 w-7 h-7 scale-100" : "text-white w-6 h-6 scale-100"} 
        drop-shadow-2xl hover:scale-130  cursor-pointer`}
    />

  </div>


  <span
    className={`-mt-4 text-white text-md font-medium drop-shadow-lg
      ${isActive("/deposit") ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Deposit
  </span>
</button> */}
<button
  onClick={handleDeposit}
  className="flex flex-col w-[70px] items-center gap-1 px-2 py-1  relative"
>


      <div className={`relative w-14 h-12 flex flex-col items-center justify-center    rounded-full  ${isActive("/deposit") ? "bottom-4 bg-yellow-600": " "}`}>
    {/* Glowing animated 3D background */}
    <div
      className={`absolute 
        scale-100
        ${isActive("/deposit") ? "animate-spin-slow primary-bg p-[15px] rounded-full z-4" : ""}`}
    />
        <div
      className={`absolute 
        scale-100
        ${isActive("/deposit") ? "animate-spin-slow secondary-bg p-5 rounded-full z-3" : ""}`}
    />
        <div
      className={`absolute 
        scale-100 
        ${isActive("/deposit") ? "animate-spin-slow bg-black-700 p-6 rounded-full w-16 h-16" : ""}`}
    />

    {/* Floating Star icon with tilt + shadow */}
    <Wallet
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-5
        transition-all duration-500 ease-out transform 
        ${isActive("/deposit") ? "text-slate-900 w-6 h-6 scale-100 " : "text-white w-6 h-6 scale-100"} 
        drop-shadow-2xl hover:scale-130  cursor-pointer`}
    />

  
  </div>







  {/* Label */}
  <span
    className={`-mt-4 text-white text-md font-medium drop-shadow-lg
      ${isActive("/deposit") ? "!font-bold -mt-[22px] text-slate-100" : "text-white font-normal"}`}
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
    {unreadCount}
  </span>

  <div
    className={`relative w-14 h-12 flex flex-col items-center justify-center`}
  >
    {/* Glowing animated 3D background */}
    <div
      className={`absolute 
        blur-3xl opacity-70 scale-100
        ${psheetOpen ? "animate-spin-slow" : ""}`}
    />

    {/* Floating User icon with tilt + shadow */}
    <User
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 
        transition-all duration-500 ease-out transform 
        ${psheetOpen ? "text-orange-400 w-7 h-7 scale-100" : "text-white w-6 h-6 scale-100"} 
        drop-shadow-2xl hover:scale-130  cursor-pointer`}
    />


  </div>

  {/* Label */}
  <span
    className={`text-white -mt-4 text-md font-medium drop-shadow-lg
      ${psheetOpen ? "!text-orange-400 font-bold" : "text-white font-normal"}`}
  >
    Profile
  </span>
</div>

            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="w-full h-[100%] !top-[0px] !bottom-[0px] p-0 bg-black-800 overflow-y-auto"
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
                    onClick={() => psetSheetOpen(false)} // This actually closes the sheet
                  >
                    <X className="w-9 h-9  text-gray-100 hover:text-red-600" />
                  </button>
                </div>

              <div className="min-h-screen -mt-16 bg-black-800 text-white flex justify-center">
                <div className="w-full max-w-md ">
                         <div className="bg-black-800 rounded-t-md flex items-center">
                <img className="w-[120px]" src="https://img.m156b.com/mb/h5/assets/images/dark/animation/head-coin.png?v=1767782599110" alt="" />
              <p className="text-lg font-medium text-yellow-300 mt-4">{user?.name}</p>
              
                </div>
           
                                    <div className="bg-yellow-300 flex px-4 justify-between py-4  flex items-center">
                                      <div>

                                                                            <p className="text-slate-900 font-medium">                      Main Wallet</p>
                                        <RefreshButton
                balance={balance}
                loading={isLoadinge}
                onRefresh={async () => {
                  fetchBalance();
                }}
              />

                                      </div>
  
<div className="p-[6px] secondary-bg-1 rounded-full">
<img src="https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-bonuses.svg?v=1768297086272&quot" alt="" />
</div>
                              
                </div>

<div className="mt-2 card-bg p-2 rounded-md mx-2 my-2">
 <p>Funds</p>
                 <div className="grid grid-cols-4 md:grid-cols-4 gap-1 ">
               
   
        <div
         onClick={()=> handleDeposit()}
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-deposit.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-slate-200 text-md font-bold">Deposit</span>
        </div>
            <div
         onClick={()=> handleDeposit()}
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-withdrawal.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-slate-200 text-md font-bold">Withdraw</span>
        </div>
           <div
       onClick={()=> handleReferral()}
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-referral.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Referral Bonus</span>
        </div>
    
    </div>

</div>


<div className="mt-2 card-bg p-2 rounded-md mx-2 my-2">
 <p>History</p>
                 <div className="grid grid-cols-4 md:grid-cols-4 gap-1 ">
               
    
        <div
             onClick={()=> handleBetting()}
    
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-bet-records.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Betting Record</span>
        </div>
               <div
                onClick={()=> handleturnOver()}
    
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-turnover.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Turnover</span>
        </div>
               <div
     onClick={()=> handleTransaction()}
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-records.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Transaction Record</span>
        </div>
     
    </div>

</div>
<div className="mt-2 card-bg p-2 rounded-md mx-2 my-2">
 <p>My</p>
                 <div className="grid grid-cols-4 md:grid-cols-4 gap-1 ">
               
   
        <div
    
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-info.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Profile</span>
        </div>

               <div
    
          className=" p-5 rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-inbox.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Notification</span>
        </div>
    
      {unreadCount}
    </div>

</div>
<div className="mt-2 card-bg p-2 rounded-md mx-2 my-2">
 <p className="mb-2">Contact Us</p>
                 <div className="grid grid-cols-3 md:grid-cols-4 gap-1 ">
               
        <div
        
          className=" rounded-md flex -ml-12 flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[1px] rounded-full mb-2 "
            src="  https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-customer.svg?v=1767782599110&quot"
            alt="reffer"
          />
          <span className="text-slate-200 text-md font-bold font-medium ml-2">Live Chat</span>
        </div>
    </div>

</div>
                  {/* Actions */}
                  {/* <div className="flex bg-yellow-300 py-4 gap-3">
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
                      className=" flex-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-slate-200 hover:bg-zinc-700"
                    >
                      Deposit
                    </DotLoadingButton>
                  </div> */}

         
     {user && (
                    <button
                      onClick={handleLogout}
                      className="px-3 mb-[220px] mt-6 w-full py-[10px] text-2xl bg-yellow-300 text-slate-900 font-medium rounded hover:bg-blue-600"
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
  )}
</>
   
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
          <span className="text-lg text-red-400 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 " />
      </div>
    </button>
  );
}
