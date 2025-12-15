"use client";

import Image from "next/image";
import Slider from "./components/Slider";
import CategorySlider from "./components/CategorySlide";
import { getAuthUser } from "@/lib/auth";
import CategorySelectionSlider from "./components/CategorySelectionSlider"
import ProviderCategory from "./components/ProviderCategory";
import { Mic , Volume } from "lucide-react";
import MatchSlider from "./components/MatchSlider";
import EventSlider from "./components/EventSlider";
import FeaturedSlider from "./components/FeaturedSlider";
import { Menu, Gamepad2, Dice6, Wallet, User, Crown, Activity, Rocket, X,MessageCircle  } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: string[];
}

export default function Home() {
 const user = getAuthUser();
 console.log("user", user)
    const siteInfo = {
    slider_items: [
 

  { id: 1, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_235581.jpg",  alt: "Slide 1", },
  { id: 2, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_272517.jpg",alt: "Slide 1" },
  { id: 3, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" ,alt: "Slide 1"},
  { id: 4, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" , alt: "Slide 1"},
  { id: 1, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_235581.jpg",  alt: "Slide 1", },
  { id: 2, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_272517.jpg",alt: "Slide 1" },
  { id: 3, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" ,alt: "Slide 1"},
  { id: 4, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" , alt: "Slide 1"},

    ],
  };

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false); // Controlled sheet state

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems: MenuItem[] = [
    { name: "Gaming", icon: <span>⭐</span>, children: ["Option 1", "Option 2"]  },
    { name: "About", icon: <Crown className="w-5 h-5" />, children: ["Option 1", "Option 2"] },
    { name: "Feature", icon: <Activity className="w-5 h-5" />, children: ["Football", "Cricket"] },
    { name: "Help", icon: <Gamepad2 className="w-5 h-5" />, children: ["Live Casino", "Table Games"] },

  ];


  return (
    <div className="">
      <main className="mt-[50px] min-h-screen mb-[800px">

         <Slider siteInfo={siteInfo}  autoPlay={true} interval={4000}  />
                {/* Marquee Section */}
              <div className="flex items-center gap-2  py-2 bg-gray-800 relative overflow-hidden mt-2">
         
                <Volume  className="w-8 h-8 text-orange-400 bg-gray-800 z-10 pl-2" />
                <div className="flex-1 absolute overflow-hidden">
                  <span className="animate-marquee text-white text-sm inline-block whitespace-nowrap">
                  এই একটি উদাহরণ বাংলার ম্যারিক টেক্সট যা বাম থেকে ডান দিকে চলবে। এটি স্বয়ংক্রিয়ভাবে স্ক্রল হবে।
                  </span>
                </div>
       
          
              </div>

              <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0%); /* start fully visible */
                  }
                  100% {
                    transform: translateX(-100%); /* scroll completely left */
                  }
                }
                .animate-marquee {
                  display: inline-block;
                  animation: marquee 15s linear infinite;
                }
              `}</style>

   

              <CategorySlider/> 


               <ProviderCategory/>
               <MatchSlider  />
               <EventSlider/>
                 <ProviderCategory/>
                 <FeaturedSlider siteInfo={siteInfo}  autoPlay={true} interval={4000} />

                 <div className="bg-grey-900">
                          <ul className="p-4 space-y-2 text-lg text-gray-800 ">
                      {/* <div className="flex justify-center">
        <img src="/banner/Screenshot 2025-12-12 161900.png" alt="Logo" className="text-center" />
                      </div> */}
       
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => item.children && toggleSection(item.name)}
                    className="flex items-center justify-between w-full py-2 px-3 rounded text-slate-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <div className="flex font-medium items-center gap-2 ">
       
                      <span>{item.name}</span>
                    </div>
                    {item.children && <span>{openSections[item.name] ? "▲" : "▼"}</span>}
                  </button>
                  {item.children && openSections[item.name] && (
                    <ul className="pl-8 mt-1 space-y-1">
                      {item.children.map((child, cidx) => (
                        <li key={cidx}>
                          <a href="#" className="block py-1 text-gray-300 hover:text-purple-700">
                            {child}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
                         </ul>
                         <section className=" text-gray-300 px-4 py-6 space-y-6">
{/* Sponsorship */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">স্পন্সরশিপ</h3>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2">
<Image src="/images/delhi-bulls.png" alt="Delhi Bulls" width={36} height={36} />
<div>
<p className="text-sm font-medium">Delhi Bulls</p>
<p className="text-xs text-gray-400">টাইটেল স্পন্সর</p>
<p className="text-xs text-gray-500">২০২৩ - ২০২৮</p>
</div>
</div>
<div className="flex items-center gap-2">
<Image src="/images/montreal-tigers.png" alt="Montreal Tigers" width={36} height={36} />
<div>
<p className="text-sm font-medium">Montreal Tigers</p>
<p className="text-xs text-gray-400">টাইটেল স্পন্সর</p>
<p className="text-xs text-gray-500">২০২৪ - ২০২৫</p>
</div>
</div>
</div>
</div>


{/* Brand Ambassadors */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">ব্র্যান্ড অ্যাম্বাসেডরস</h3>
<div className="flex gap-10">
<div>
<p className="text-sm font-medium">Andre Dwayne Russell</p>
<p className="text-xs text-gray-500">২০২৪ - ২০২৬</p>
</div>
<div>
<p className="text-sm font-medium">Glenn McGrath</p>
<p className="text-xs text-gray-500">২০২৩ - ২০২৪</p>
</div>
</div>
</div>


{/* Official Partner */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">অফিসিয়াল ব্র্যান্ড পার্টনার</h3>
<Image src="/images/cazvip.png" alt="Cazvip" width={120} height={32} />
</div>


{/* Gaming License */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">গেইমিংস লাইসেন্স</h3>
<div className="flex gap-6 items-center">
<Image src="/images/gaming-curacao.png" alt="Gaming Curacao" width={48} height={48} />
<Image src="/images/anjouan-egaming.png" alt="Anjouan eGaming" width={48} height={48} />
<Image src="/images/costa-rica.png" alt="Costa Rica" width={48} height={48} />
</div>
</div>


{/* Responsible Gaming */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">দায়িত্বশীল গেমিং</h3>
<div className="flex gap-6 items-center">
<Image src="/images/gamecare.png" alt="GameCare" width={40} height={40} />
<Image src="/images/18plus.png" alt="18+" width={40} height={40} />
<Image src="/images/hand-stop.png" alt="Responsible" width={40} height={40} />
</div>
</div>


{/* Social Icons */}
<div className="border-t border-gray-800 pt-4 flex justify-center gap-4">
<Image src="/icons/facebook.png" alt="Facebook" width={28} height={28} />
<Image src="/icons/instagram.png" alt="Instagram" width={28} height={28} />
<Image src="/icons/x.png" alt="X" width={28} height={28} />
<Image src="/icons/pinterest.png" alt="Pinterest" width={28} height={28} />
<Image src="/icons/youtube.png" alt="YouTube" width={28} height={28} />
<Image src="/icons/telegram.png" alt="Telegram" width={28} height={28} />
</div>
</section>
                 </div>
              {/* <CategorySelectionSlider siteInfo={siteInfo}  autoPlay={false} interval={4000}/> */}

          

              
           <div className="h-[250x]"></div>
      </main>
    </div>
  );
}
