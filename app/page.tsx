"use client";
import { useRouter } from "next/navigation";
import img from "next/image";
import Slider from "./components/Slider";
import CategorySlider from "./components/CategorySlide";
import { getAuthUser } from "@/lib/auth";
import CategorySelectionSlider from "./components/CategorySelectionSlider"
import ProviderCategory from "./components/ProviderCategory";
import { Headphones, Mic , Volume } from "lucide-react";
import MatchSlider from "./components/MatchSlider";
import EventSlider from "./components/EventSlider";
import FeaturedSlider from "./components/FeaturedSlider";
import { Menu, Gamepad2, Dice6, Wallet, User, Crown, Activity, Rocket, X,MessageCircle  } from "lucide-react";
import { useState, useEffect, useRef } from "react";


interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: string[];
}

export default function Home() {
  const router = useRouter();
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

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [position, setPosition] = useState({ x: 20, y: 200 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  /* ===== START DRAG ===== */
  const startDrag = (clientX: number, clientY: number) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    offset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    setDragging(true);
  };

  /* ===== MOVE ===== */
const onMove = (clientX: number, clientY: number) => {
if (!dragging || !buttonRef.current) return;


const marginX = 10;
const marginTop = 10;
const marginBottom = 70;


const btnWidth = buttonRef.current.offsetWidth;
const btnHeight = buttonRef.current.offsetHeight;


const newX = clientX - offset.current.x;
const newY = clientY - offset.current.y;


const minX = marginX;
const maxX = window.innerWidth - btnWidth - marginX;


const minY = marginTop;
const maxY = window.innerHeight - btnHeight - marginBottom;


setPosition({
x: Math.min(Math.max(newX, minX), maxX),
y: Math.min(Math.max(newY, minY), maxY),
});
};
  /* ===== END ===== */
  const endDrag = () => setDragging(false);
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
          fetch("https://api.spcwin.info/users/hero-slider"),
          fetch("https://api.spcwin.info/users/event-slider"),
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
      const promoRes = await fetch("https://api.spcwin.info/users/headline");
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
const [contact, setContact] = useState(true);



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
        const res = await fetch("https://api.spcwin.info/users/social-link");
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


  const isDragging = useRef(false);


  const [mounted, setMounted] = useState(false);


  // ✅ Set position AFTER mount
  useEffect(() => {
    setMounted(true);
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 160,
    });
  }, []);



  const stopDrag = () => {
    isDragging.current = false;
  };
const handleContact = () =>{
  setContact(false);
 setOpen(false)
}
  if (!mounted) return null; // ⛔ prevent SSR crash

  return (
    <div className="">
      <main className="mt-[35px] min-h-screen  bg-black-800  mb-[800px">

         <Slider siteInfo={heroSlides || siteInfo}  autoPlay={true} interval={4000}  />
                {/* Marquee Section */}
              <div className="flex items-center gap-2  py-2   bg-black-800 relative overflow-hidden">
         
                <Volume  className="w-8 h-8 text-yellow-300 bg-black rounded-r-md z-10 pl-2" />
                <div className="flex-1 absolute overflow-hidden">
                  <span className="animate-marquee text-white text-sm inline-block whitespace-nowrap">
    🎉 <span className="text-white font-bold">SW</span> {headline}  🎰

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
            
               <EventSlider siteInfo={heroSlides || siteInfo}/>
                 {/* <ProviderCategory/> */}
                 <FeaturedSlider siteInfo={siteInfo1}  autoPlay={true} interval={4000} />

                 <div className="bg-grey-900">
                          <ul className="p-2 space-y-2 text-lg text-gray-800 ">
                      {/* <div className="flex justify-center">
        <img src="/banner/Screenshot 2025-12-12 161900.png" alt="Logo" className="text-center" />
                      </div> */}
       
         


      
  
                         </ul>
                         <section className=" text-gray-300 px-2 py-6 space-y-6">


{/* Brand Ambassadors */}
<h4 className="font-semibold mb-1">Brand Ambassador</h4>
<div className="border-t border-gray-700 card-bg text-white rounded-md p-3 pt-4">
  

<div className="flex gap-32">
<div>

<img className="h-[24px w-[94px]" src="https://img.m156b.com/mb/h5/assets/images/dark/footer/ambassadors-sunny-leone.png?v=1767782599110&source=mcdsrc" alt="" />
<p className="text-md font-medium">Sunny Leone</p>
<p className="text-sm italic font-medium">Actress</p>
<p className="text-sm italic -mt-1 font-medium">2024 - present</p>
</div>
<div>

<img className="h-[24px w-[94px]" src="https://img.m156b.com/mb/h5/assets/images/dark/footer/ambassadors-nussrat-jahan-signature.png?v=1767782599110&source=mcdsrc" alt="" />
<p className="text-md font-medium">Nusrat Jahan</p>
<p className="text-sm italic font-medium">Actress</p>
<p className="text-sm italic -mt-1 font-medium">2024 - present</p>
</div>
</div>
<div className="flex my-6 gap-20">
<div>

<img className="h-[24px w-[94px]" src="https://img.m156b.com/mb/h5/assets/images/dark/footer/ambassadors-quinton-de-kock.png?v=1767782599110&source=mcdsrc" alt="" />
<p className="text-md font-medium">Quinton de Kock</p>
<p className="text-sm italic font-medium">South African Cricketer</p>
<p className="text-sm italic -mt-1 font-medium">2024 - present</p>
</div>
<div>

<img className="h-[24px w-[94px]" src="https://img.m156b.com/mb/h5/assets/images/dark/footer/ambassadors-david-de-gea.png?v=1767782599110&source=mcdsrc" alt="" />
<p className="text-md font-medium">David De Gea</p>
<p className="text-sm italic font-medium">Spanish Footballer</p>
<p className="text-sm italic -mt-1 font-medium">2024 - present</p>
</div>
</div>
<div className="flex my-6 gap-32">
<div>

<img className="h-[24px w-[94px]" src="https://img.m156b.com/mb/h5/assets/images/dark/footer/ambassadors-monami-ghosh.png?v=1767782599110&source=mcdsrc" alt="" />
<p className="text-md font-medium -mt-2">Monami Ghosh</p>
<p className="text-sm italic font-medium">Actress</p>
<p className="text-sm italic -mt-1 font-medium">2024 - present</p>
</div>

</div>
</div>
{/* Sponsorship */}
<h3 className=" font-semibold mb-1 -mt-4">Sponsorship</h3>
<div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4">

<div className="flex items-center justify-between gap-6">
<div className="flex items-center gap-2">
<img className="h-[34px w-[34px]" src="https://img.j189eb.com/jb/h5/assets/v3/images/sponsor/delhi-bulls.png?v=1765526091482&source=drccdnsrc" alt="Delhi Bulls"  />
<div>

<p className="text-md italic font-medium">Delhi Bulls</p>
<p className="text-sm italic -mt-1 font-medium">2024 - present</p>
</div>
</div>

</div>
</div>



{/* Official Partner */}
<h3 className="font-semibold mb-1  -mt-4">Official Partner</h3>
<div className="border-t border-gray-800 pt-4 card-bg text-white rounded-md p-3">

<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/official-brand-partner-type/cazvip.png?v=1765526091482&source=drccdnsrc" alt="Cazvip" width={120} height={32} />
</div>


{/* Gaming License */}
<h4 className="font-semibold mb-1  -mt-4">Gaming License</h4>
<div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4">

<div className="flex gap-6 items-center">
<img src="https://img.j189eb.com/jb/h5/assets/images/footer/gaming_license.png?v=1765526091482&source=drccdnsrc" alt="Gaming Curacao" width={88} height={58} />
<img src="https://img.j189eb.com/jb/h5/assets/images/footer/anjouan_license.png?v=1765526091482&source=drccdnsrc" alt="Anjouan eGaming" width={88} height={58} />
<img src="https://img.j189eb.com/jb/h5/assets/images/footer/montenegro_license.png?v=1765526091482&source=drccdnsrc" alt="Costa Rica" width={88} height={58} />
</div>
</div>
<h4 className="font-semibold mb-1  -mt-4">Community Website</h4>
<div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4">


 <div className="  flex  gap-4">
      {Object.keys(icons).map((platform) => {
        const key = platform as SocialLink["platform"];
        return (
          <a
            key={key}
            href={links[key] || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={links[key] ? "" : "opacity-0 pointer-events-none"}
          >
            <img src={icons[key]} alt={key} width={38} height={38} />
          </a>
        );
      })}
    </div>
</div>
<h4 className="font-semibold mb-1  -mt-4">Payment Method</h4>
<div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4">

<div className="flex gap-2 flex-wrap">
  <img className="w-[70px]" src="https://img.m156b.com/mb/h5/assets/images/footer/white/pay16.png?v=1767782599110&source=mcdsrc" alt="" />
  <img  src="https://img.m156b.com/mb/h5/assets/images/footer/white/pay22.png?v=1767782599110&source=mcdsrc" alt="" />
  <img src="https://img.m156b.com/mb/h5/assets/images/footer/white/pay33.png?v=1767782599110&source=mcdsrc" alt="" />
  <img  src="https://img.m156b.com/mb/h5/assets/images/footer/white/pay34.png?v=1767782599110&source=mcdsrc" alt="" />
  <img src="https://img.m156b.com/mb/h5/assets/images/footer/white/pay45.png?v=1767782599110&source=mcdsrc" alt="" />
</div>
</div>
<h4 className="font-semibold mb-1  -mt-4">About Us</h4>
<div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4">

<div className="flex gap-2 flex-wrap">
 <p  onClick={()=>{router.push('/about-us')}} className="text-yellow-400 font-medium underline border-r border-slate-300 pr-6">About Us</p>
 <p onClick={()=>{router.push('/privacy-policy')}} className="text-yellow-400 font-medium underline border-r border-slate-300 pr-6">Privacy Policy</p>
  <p onClick={()=>{router.push('/terms')}} className="text-yellow-400 font-medium underline">Terms and Conditions</p>
</div>
</div>


{/* Responsible Gaming */}
{/* <div className="border-t border-gray-800 card-bg text-white rounded-md p-3 pt-4 ">
<h3 className=" font-semibold mb-3">Responsible Gaming</h3>
<div className="flex gap-6 items-center">
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/trivial-type/gamcare.svg?v=1765526091482&source=drccdnsrc" alt="GameCare" width={40} height={40} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/trivial-type/age-limit.svg?v=1765526091482&source=drccdnsrc" alt="18+" width={40} height={40} />
<img src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/trivial-type/regulations.svg?v=1765526091482&source=drccdnsrc" alt="Responsible" width={40} height={40} />
</div>


</div> */}
<p className="text-center mb-[100px]"> © 2026 jili Copyrights. All Rights Reserved </p>


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
      <div className="relative">
              {contact && (
        <div className="relative">    <button
              ref={buttonRef}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => dragging && onMove(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
       onTouchStart={(e) => {
    e.preventDefault();
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }}
  onTouchMove={(e) => {
    e.preventDefault(); // 🔥 stops scroll
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }}
        onTouchEnd={endDrag}
        onClick={() => setOpen(!open)}
        className="  fixed z-50 h-14 w-14   touch-none bg-black-800 border border-yellow-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform"
        aria-label="Contact"
            style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className="relative">
      <p className="text-2xl font-bold pt-3"> <span className="text-yellow-300/90">S</span><span>W</span></p>
       <Headphones size={20} className="text-slate-100 lighter absolute -top-1 right-[8px]"/>
        </div>
      
      </button>
       {/* <X onClick={() => handleContact()} className="absolute z-50  top-2 right-12 text-white/70 font-bold"/> */}

       </div>

      )}
  

      {/* Contact List */}
      <div
        className={`fixed  flex flex-col gap-2  p-1 rounded-lg transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
               style={{
          left: position.x - 0,
          top: position.y + 60,
        }}
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
              className={`flex items-center h-10 w-10 gap-2 rounded-lg shadow-md  ${
                active ? "opacity-100 hover:bg-gray-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img src={icons[key]} alt={key} width={64} height={64} />
              {/* <span className="capitalize">{key}</span> */}
            </a>
          );
        })}
      </div>

      </div>

    </>
<div className="text-center">
  <h1 className="text-center text-2xl text-yellow-400 font-medium">Contact Us</h1>
</div>





</section>
                 </div>
              {/* <CategorySelectionSlider siteInfo={siteInfo}  autoPlay={false} interval={4000}/> */}

          

              
           <div className="h-[250x]"></div>
      </main>
    </div>
  );
}



