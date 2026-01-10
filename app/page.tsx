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
 interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}
interface SocialLink {
  platform: "telegram" | "whatsapp" | "messenger";
  group_link: string;
  is_active: boolean;
}

type SocialLinksMap = {
  [key in SocialLink["platform"]]: string | null;
};


// const user: AuthUser | null = (() => {
//   const stored = localStorage.getItem("auth_user");
//   return stored ? JSON.parse(stored) as AuthUser : null;
// })();
//  console.log("user", user)
  const [headline, setHeadLine] = useState(null);

    const [heroSlides, setHeroSlides] = useState([]);
  const [eventSlides, setEventSlides] = useState([]);

const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const [heroRes, eventRes] = await Promise.all([
          fetch("https://api.bajiraj.cloud/users/hero-slider"),
          fetch("https://api.bajiraj.cloud/users/event-slider"),
        ]);

        const heroData = await heroRes.json();
        const eventData = await eventRes.json();

        setHeroSlides(heroData.data || []);
        setEventSlides(eventData.data || []);
      } catch (err) {
        console.error("Failed to fetch sliders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  useEffect(() => {

        const load = async () => {
      const promoRes = await fetch("https://api.bajiraj.cloud/users/headline");
      const promoData = await promoRes.json();
      console.log("Promos data:", promoData.title);
      setHeadLine(promoData.title)
    }
    load()

  }, []);
    const siteInfo = {
    slider_items: [

  { id: 2, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_272517.jpg", alt: "Slide 1" },
  { id: 5, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_277174.jpg", alt: "Slide 1" },
  { id: 3, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg", alt: "Slide 1" }
]
,
  };

      const siteInfo1 = {
    slider_items: [
  { id: 2, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_272517.jpg", alt: "Slide 1" },
  { id: 5, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_277174.jpg", alt: "Slide 1" },
  { id: 3, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg", alt: "Slide 1" }

]
,
  };

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [sheetOpen, setSheetOpen] = useState(false); // Controlled sheet state
      // Sample T&C content
  const termsContent = `
  Welcome to our online casino. By accessing and using this site, you agree to comply with the following Terms & Conditions:
  
  1. You must be 18 years or older to play.
  2. Gambling is prohibited in certain jurisdictions. Please ensure it is legal in your region.
  3. Users are responsible for maintaining account security.
  4. All bets are final and non-refundable.
  5. We reserve the right to suspend or terminate accounts suspected of fraudulent activity.
  6. Please gamble responsibly. 
  7. By using this site, you agree to our Privacy Policy and Rules.
  `;

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems: MenuItem[] = [
  { 
    name: "Features", 
    icon: <Activity className="w-5 h-5" />, 
    children: ["Live Casino","Slots","Football Betting", "Cricket Betting", "Instant Withdrawals", "Bonuses & Promotions"] 
  },
  { 
    name: "Help", 
    icon: <Gamepad2 className="w-5 h-5" />, 
    children: ["Live Chat Support",  ] 
  },

  ];
   

  const [gameList, setGameList] = useState<any[]>([]); // store gamelist here

  const [open, setOpen] = useState(false);




  const [vendorCode, setVendorCode] = useState('casino-pragmatic'); // example vendor
  const [language, setLanguage] = useState('en');



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
    <div className="">
      <main className="mt-[50px] min-h-screen bg-slate-800 mb-[800px">

         <Slider siteInfo={heroSlides || siteInfo}  autoPlay={true} interval={4000}  />
                {/* Marquee Section */}
              <div className="flex items-center gap-2  py-2   bg-gradient-to-r from-gray-700 relative overflow-hidden mt-2">
         
                <Volume  className="w-8 h-8 text-orange-400 bg-gray-800 rounded-r-md z-10 pl-2" />
                <div className="flex-1 absolute overflow-hidden">
                  <span className="animate-marquee text-orange-100 text-lg inline-block whitespace-nowrap">
    🎉 <span className="text-orange-400 font-bold">Bajiraj</span> {headline}  🎰

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
               {/* <MatchSlider  /> */}
            
               <EventSlider siteInfo={eventSlides}/>
                 {/* <ProviderCategory/> */}
                 <FeaturedSlider siteInfo={siteInfo1}  autoPlay={true} interval={4000} />

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
                <li key={cidx} className="flex flex-col gap-1">
                  <a
                    href="#"
                    className="block py-1 text-gray-300 hover:text-purple-700"
                  >
                    {child}
                  </a>

                  {/* Show social icons if child === "Live Chat Support" */}
                  {child === "Live Chat Support" && (
                    <div className="flex gap-1 mt-1">
                      {Object.keys(icons).map((platform) => {
                        const key = platform as SocialLink["platform"];
                        const active = Boolean(links[key]);
                        return (
                          <a
                            key={key}
                            href={links[key] || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center p-1 rounded hover:bg-gray-100 transition ${
                              active ? "opacity-100" : "opacity-30 pointer-events-none"
                            }`}
                          >
                            <img src={icons[key]} alt={key} width={44} height={44} />
                          </a>
                        );
                      })}
                    </div>
                  )}
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
<p className="text-lg font-medium">Delhi Bulls</p>
<p className="text-lg text-gray-400">টাইটেল স্পন্সর</p>
<p className="text-lg text-gray-500">২০২৩ - ২০২৮</p>
</div>
</div>
<div className="flex items-center gap-2">
<img className="h-[34px w-[34px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/sponsor/montreal-tigers.png?v=1765526091482&source=drccdnsrc" alt="Montreal Tigers" />
<div>
<p className="text-lg font-medium">Montreal Tigers</p>
<p className="text-lg text-gray-400">টাইটেল স্পন্সর</p>
<p className="text-lg text-gray-500">২০২৪ - ২০২৫</p>
</div>
</div>
</div>
</div>


{/* Brand Ambassadors */}
<div className="border-t border-gray-800 pt-4">
  
<h3 className="text-amber-400 font-semibold mb-3">ব্র্যান্ড অ্যাম্বাসেডরস</h3>
<div className="flex justify-between gap-10">
<div>
<p className="text-lg font-medium">Andre Dwayne Russell</p>
<p className="text-lg text-gray-500">২০২৪ - ২০২৬</p>
<img className="h-[24px w-[94px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/ambassador/andre-russell.png?v=1765526091482&source=drccdnsrc" alt="" />
</div>
<div>
<p className="text-lg font-medium">Glenn McGrath</p>
<p className="text-lg text-gray-500">২০২৩ - ২০২৪</p>
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
{/* <div className="border-t border-gray-800 pt-4 flex justify-center gap-4">
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-facebook.svg?v=1765526091482&source=drccdnsrc" alt="Facebook" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-instagram.svg?v=1765526091482&source=drccdnsrc" alt="Instagram" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-twitter.svg?v=1765526091482&source=drccdnsrc" alt="X" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-pinterest.svg?v=1765526091482&source=drccdnsrc" alt="Pinterest" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-youtube.svg?v=1765526091482&source=drccdnsrc" alt="YouTube" width={28} height={28} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/media-type/icon-telegram-channel.svg?v=1765526091482&source=drccdnsrc" alt="Telegram" width={28} height={28} />

</div> */}

<>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-6 bg-gradient-to-tr from-yellow-200 to-orange-300 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform"
        aria-label="Contact"
      >
        📞
      </button>

      {/* Contact List */}
      <div
        className={`fixed bottom-36 right-6 flex flex-col gap-3 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {Object.keys(icons).map((platform) => {
          const key = platform as SocialLink["platform"];
          const active = Boolean(links[key]);
          return (
            <a
              key={key}
              href={links[key] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 p-2 rounded-lg shadow-md bg-white border ${
                active ? "opacity-100 hover:bg-gray-100" : "opacity-40 pointer-events-none"
              }`}
            >
              <img src={icons[key]} alt={key} width={28} height={28} />
              <span className="capitalize">{key}</span>
            </a>
          );
        })}
      </div>
    </>
<div className="text-center">
  <h1 className="text-center text-2xl text-yellow-500 font-medium">Contact Us</h1>
</div>

 <div className="border-t border-gray-800  flex justify-center gap-2 mb-[200px]">
      {Object.keys(icons).map((platform) => {
        const key = platform as SocialLink["platform"];
        return (
          <a
            key={key}
            href={links[key] || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={links[key] ? "" : "opacity-30 pointer-events-none"}
          >
            <img src={icons[key]} alt={key} width={44} height={44} />
          </a>
        );
      })}
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



