"use client";

import Image from "next/image";
import Slider from "./components/Slider";
import CategorySlider from "./components/CategorySlide";
import { getAuthUser } from "@/lib/auth";
import CategorySelectionSlider from "./components/CategorySelectionSlider"
import ProviderCategory from "./components/ProviderCategory";
import { Mic , Volume } from "lucide-react";
export default function Home() {
 const user = getAuthUser();
 console.log("user", user)
    const siteInfo = {
    slider_items: [
 

  { id: 1, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_235581.jpg",  alt: "Slide 1", },
  { id: 2, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_272517.jpg",alt: "Slide 1" },
  { id: 3, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" ,alt: "Slide 1"},
  { id: 4, imageUrl: "https://img.j189eb.com/upload/h5Announcement/image_265553.jpg" , alt: "Slide 1"},


    ],
  };


  return (
    <div className="">
      <main className="mt-[50px]">

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
              {/* <CategorySelectionSlider siteInfo={siteInfo}  autoPlay={false} interval={4000}/> */}

              {/* <ProviderCategory siteInfo={siteInfo}  autoPlay={false} interval={4000}/> */}

              

      </main>
    </div>
  );
}
