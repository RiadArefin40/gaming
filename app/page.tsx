"use client";

import img from "next/image";
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
import { useState, useEffect } from "react";


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
   

  const [gameList, setGameList] = useState<any[]>([]); // store gamelist here
  const token = user?.token
  useEffect(() => {
     if (!token) return;
   const getVendorList = async () => {
      try {
        const res = await fetch('/api/vendors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${user?.token}` // pass the token here
          }
        });
        const data = await res.json();
        setGameList(data);
        console.log('vendorlist', data);
      } catch (err) {
        console.error(err);
      }
    }

    getVendorList();
  }, []);




  const [vendorCode, setVendorCode] = useState('casino-pragmatic'); // example vendor
  const [language, setLanguage] = useState('en');


    useEffect(() => {
    if (!token) return;

    // 2️⃣ Fetch games list
    const getGames = async () => {
      try {
        const res = await fetch('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ vendorCode, language })
        });
        const data = await res.json();
        setGameList(data.message);
        console.log('games-list',data.message, gameList);
      } catch (err) {
        console.error('Error fetching games list:', err);
      }
    };

    getGames();
  }, []);


const checkAvailibilityThenLaunch = async (game: any) => {
  try {
    const res = await fetch('/api/game/launch', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        vendorCode: game.vendorCode,
        gameCode: game.gameCode,
        userCode: user.username, // or however you identify the user
        language: 'en',
        lobbyUrl: '',
        theme: 1
      })
    });

    const data = await res.json();
    console.log('data', data)
    if (data.launchUrl) {
      // Open the game in new tab
      window.open(data.launchUrl, '_blank');
    } else {
      alert('Game is not available.');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to launch game.');
  }
};



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





              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.isArray(gameList) && gameList.length > 0 ? (
                  gameList.map((game) => (
                    <div
                      key={game.gameId}
                      onClick={() => checkAvailibilityThenLaunch(game)} // ✅ wrap in arrow function
                      className="bg-gray-800 text-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                      <img
                        src={game.thumbnail}
                        alt={game.gameName}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <h3 className="text-sm font-semibold truncate">{game.gameName}</h3>
                        <p className="text-xs text-gray-400 truncate">{game.provider}</p>
                        {game.isNew && <span className="inline-block text-xs text-green-400 font-semibold mt-1">NEW</span>}
                        {game.underMaintenance && <span className="inline-block text-xs text-red-400 font-semibold mt-1">MAINTENANCE</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white col-span-full text-center"></p>
                )}
              </div>






               <ProviderCategory/>
               <MatchSlider  />
               <EventSlider/>
                 <ProviderCategory/>
                 <FeaturedSlider siteInfo={siteInfo}  autoPlay={true} interval={4000} />

                 <div className="bg-grey-900">
                          <ul className="p-2 space-y-2 text-lg text-gray-800 ">
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
<div className="flex items-center justify-between gap-6">
<div className="flex items-center gap-2">
<img className="h-[34px w-[34px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/sponsor/delhi-bulls.png?v=1765526091482&source=drccdnsrc" alt="Delhi Bulls"  />
<div>
<p className="text-sm font-medium">Delhi Bulls</p>
<p className="text-xs text-gray-400">টাইটেল স্পন্সর</p>
<p className="text-xs text-gray-500">২০২৩ - ২০২৮</p>
</div>
</div>
<div className="flex items-center gap-2">
<img className="h-[34px w-[34px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/sponsor/montreal-tigers.png?v=1765526091482&source=drccdnsrc" alt="Montreal Tigers" />
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
<div className="flex justify-between gap-10">
<div>
<p className="text-sm font-medium">Andre Dwayne Russell</p>
<p className="text-xs text-gray-500">২০২৪ - ২০২৬</p>
<img className="h-[24px w-[94px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/ambassador/andre-russell.png?v=1765526091482&source=drccdnsrc" alt="" />
</div>
<div>
<p className="text-sm font-medium">Glenn McGrath</p>
<p className="text-xs text-gray-500">২০২৩ - ২০২৪</p>
<img className="h-[24px w-[94px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/ambassador/glenn-mcgrat.png?v=1765526091482&source=drccdnsrc" alt="" />
</div>
</div>
</div>


{/* Official Partner */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">অফিসিয়াল ব্র্যান্ড পার্টনার</h3>
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/official-brand-partner-type/cazvip.png?v=1765526091482&source=drccdnsrc" alt="Cazvip" width={120} height={32} />
</div>


{/* Gaming License */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">গেইমিংস লাইসেন্স</h3>
<div className="flex gap-6 items-center">
<img src="https://img.j189eb.com/jb/h5/assets/images/footer/gaming_license.png?v=1765526091482&source=drccdnsrc" alt="Gaming Curacao" width={88} height={58} />
<img src="https://img.j189eb.com/jb/h5/assets/images/footer/anjouan_license.png?v=1765526091482&source=drccdnsrc" alt="Anjouan eGaming" width={88} height={58} />
<img src="https://img.j189eb.com/jb/h5/assets/images/footer/montenegro_license.png?v=1765526091482&source=drccdnsrc" alt="Costa Rica" width={88} height={58} />
</div>
</div>


{/* Responsible Gaming */}
<div className="border-t border-gray-800 pt-4">
<h3 className="text-amber-400 font-semibold mb-3">দায়িত্বশীল গেমিং</h3>
<div className="flex gap-6 items-center">
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/trivial-type/gamcare.svg?v=1765526091482&source=drccdnsrc" alt="GameCare" width={40} height={40} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/trivial-type/age-limit.svg?v=1765526091482&source=drccdnsrc" alt="18+" width={40} height={40} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/trivial-type/regulations.svg?v=1765526091482&source=drccdnsrc" alt="Responsible" width={40} height={40} />
</div>
</div>


{/* Social Icons */}
<div className="border-t border-gray-800 pt-4 flex justify-center gap-4">
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-facebook.svg?v=1765526091482&source=drccdnsrc" alt="Facebook" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-instagram.svg?v=1765526091482&source=drccdnsrc" alt="Instagram" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-twitter.svg?v=1765526091482&source=drccdnsrc" alt="X" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-pinterest.svg?v=1765526091482&source=drccdnsrc" alt="Pinterest" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-youtube.svg?v=1765526091482&source=drccdnsrc" alt="YouTube" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-telegram-channel.svg?v=1765526091482&source=drccdnsrc" alt="Telegram" width={28} height={28} />

</div>



<div>
  <div _ngcontent-serverapp-c1503041133="" className="footer-description__title">JeetBuzz বাংলাদেশ - আপনার চূড়ান্ত গন্তব্য অনলাইন গেমিং এবং বেটিংয়ের জন্য</div>
</div>
</section>
                 </div>
              {/* <CategorySelectionSlider siteInfo={siteInfo}  autoPlay={false} interval={4000}/> */}

          

              
           <div className="h-[250x]"></div>
      </main>
    </div>
  );
}
