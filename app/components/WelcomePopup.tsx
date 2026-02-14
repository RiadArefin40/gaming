"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function WelcomePopup() {
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

        // Show once per session
        const alreadyShown = sessionStorage.getItem("welcome_popup_seen");

        if (!alreadyShown) {
          setOpen(true);
          sessionStorage.setItem("welcome_popup_seen", "true");
        }
      } catch (err) {
        console.error("Welcome banner fetch error:", err);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden">
        
        {/* Banner Image */}
        <div className="relative w-full ">
          <img
            src={`https://api.spcwin.info${banner.image_url}`}
            alt="Welcome"
         
            className="object-cover"
           
          />
        </div>

        {/* Optional Text Section */}
        {banner.text && (
          <div className="p-4 -mt-4 text-lg text-center text-black text-lg font-semibold">
            {banner.text}
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}