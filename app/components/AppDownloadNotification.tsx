"use client";

import { useEffect, useState } from "react";
import {  Download } from 'lucide-react';
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function AppDownloadNotification() {
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(
          "https://api.spcwin.info/users/welcome-banner"
        );

        const json = await res.json();

        if (!json.success || !json.data?.length) return;

        // Get first active banner
        const activeBanner = json.data.find(
          (item: any) => item.is_active === true
        );

        if (!activeBanner) return;

        setBanner(activeBanner);
        setOpen(true);
      
        
      } catch (err) {
        console.error("Welcome banner fetch error:", err);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen bg-black-600 fixed top-24 rounded-2xl p-0 overflow-hidden">
        
        {/* Banner Image */}
        <div className="relative w-full ">
          {/* <img
            src={`https://api.spcwin.info${banner.image_url}`}
            alt="Welcome"
         
            className="object-cover"
           
          /> */}
        </div>

        {/* Optional Text Section */}
   
          <div className="p-4 -mt-4 text-lg text-center text-white text-lg font-semibold">
            <Download className="inline mr-4 -mt-1" size={20} />
            এপস্ ডাউনলোড করুন
          </div>
     

      </DialogContent>
    </Dialog>
  );
}