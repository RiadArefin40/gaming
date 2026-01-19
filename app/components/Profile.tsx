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
import { link } from "fs";

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
interface SocialLink {
  platform: "telegram" | "whatsapp" | "messenger";
  group_link: string;
  is_active: boolean;
}

type SocialLinksMap = {
  [key in SocialLink["platform"]]: string | null;
};
interface ProfileProps {
  onAction: () => void; // your callback
}
export default function Profile({ onAction }: ProfileProps) {
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
    setSheetOpen(false);
    router.push("/all-casino");
  };
  const goToSlots = () => {
    setSheetOpen(false)
    router.push("/all-slot");
  };
 const goToHome  = () => {
    setSheetOpen(false)
    router.push("/");
  };
  const goToPromotions = () => router.push("/promos");

  // Helper to highlight active button
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");


  const handleDeposit = () => {

      setTimeout(()=>{
        onAction()
        router.push("/deposit");
      }, 300)
      
    
  };
    const handleReferral = () => {
     setTimeout(()=>{
        onAction()
        router.push("/referrals");
      }, 300)
  };
      const handleBetting = () => {
     setTimeout(()=>{
        onAction()
        router.push("/user-bets");
      }, 300)
  };
        const handleturnOver = () => {
     setTimeout(()=>{
        onAction()
        router.push("/turnover");
      }, 300)
  };
        const handleTransaction = () => {
     setTimeout(()=>{
        onAction()
        router.push("/transactions");
      }, 300)
  };

  const handleProfile =()=>{
         setTimeout(()=>{
        onAction()
        router.push("/personal-info");
      }, 300)
  }
    const handleNotification =()=>{
         setTimeout(()=>{
        onAction()
        router.push("/notifications");
      }, 300)
  }
  
const handleHome = () =>{
  console.log('okkk');

  setTimeout(()=>{
router.push('/')
  }, 300)

}
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
    }, 3000);
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
 const [links, setLinks] = useState<SocialLinksMap>({
    telegram: null,
    whatsapp: null,
    messenger: null,
  });

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

  // Icon mapping
  const icons: Record<SocialLink["platform"], string> = {
    telegram: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-telegram-channel.svg",
    whatsapp: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-whatsapp.svg",
    messenger: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-facebook.svg",
  };
  return (
  
<>
  {user && (

     <SheetContent   side="left" className="fixed min-w-screen bottom-0 left-0 right-0 md:hidden z-100 !bg-black-800">
       <div
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
                    className=" px-4 py-1 rounded-lg -mr-6 -mt-3  flex items-center justify-center h-10 z-200"
                    onClick={() => onAction()} // This actually closes the sheet
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
           
                                    <div className="bg-yellow-300/90 flex px-4 justify-between py-[8px]  flex items-center">
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
<div className="mt-2 bg-black-600 px-2 pt-2 text-md font-medium rounded-md mx-2 my-2">
 <p className="font-medium pl-2">Funds</p>
                 <div className="grid grid-cols-4 md:grid-cols-4 gap-1 z-200">
               
   
        <div
        onClick={() => handleDeposit()}
          className="z-200 p-5 rounded-md flex flex-col items-center"
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
          <span className="text-slate-200  text-slate-200 text-md font-bold">Withdraw</span>
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
          <span className="text-slate-200 text-md font-bold">Referrals</span>
        </div>
    
    </div>

</div>

<div className="mt-2 bg-black-600 p-2 rounded-md mx-2 my-2">
 <p className="font-medium  pl-2">History</p>
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
<div className="mt-2 bg-black-600 p-2 rounded-md mx-2 my-2">
 <p className="font-medium pl-2">My</p>
                 <div className="grid grid-cols-4 md:grid-cols-4 gap-1 ">
               
   
        <div
        onClick={()=> handleProfile()}
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
                  onClick={()=> handleNotification()}
    
          className=" p-5 relative rounded-md flex flex-col items-center"
        >
          <img
            className="bg-yellow-300 p-[2px] rounded-full mb-2 "
            src={"https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-inbox.svg?v=1768297086272&quot"}
            alt={""}
          />
          <span className="text-slate-200 text-md font-bold">Notification</span>
            <span className="absolute right-6 bg-red-600 px-[4px] rounded-full top-3 text-sm">{unreadCount}</span> 
        </div>
    
   
    </div>

</div>
<div className="mt-2 bg-black-600 p-2 rounded-md mx-2 my-2">
 <p className="mb-2 font-medium pl-2">Contact Us</p>
                 <div className=" ">
               

        <div className="grid grid-cols-6 mt-4 md:grid-cols-4 gap-1 ">
            <div
        
          className=" rounded-md flex mr-4 flex-col items-center"
        >
          <img
            className="bg-yellow-300 h-10 p-[1px] rounded-full mb-2 "
            src="  https://img.m156b.com/mb/h5/assets/images/icon-set/theme-icon/icon-customer.svg?v=1767782599110&quot"
            alt="reffer"
          />
<span>Live Chat</span>
        </div>
                   {Object.keys(icons).map((platform) => {
        const key = platform as SocialLink["platform"];
        return (
          <>
               <a
            key={key}
            href={links[key] || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={links[key] ? "-mr-6" : "opacity-30 -mr-3 pointer-events-none"}
          >
            <img src={icons[key]} alt={key} width={38} height={38} />
          </a>
          {/* <p>{key}</p> */}
          </>
     
        );
      })}
  

        </div>
     
        <div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4">





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
                      className="px-3 mx-3 mb-[220px] mt-6 w-[94%] py-[12px] text-2xl bg-yellow-300/90 text-slate-900 font-medium rounded hover:bg-blue-600"
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
            </div>
    </SheetContent>
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
