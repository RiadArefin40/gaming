"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
// import { useAuthModal } from "@/store/useAuthModal";
import { useVerifyModal } from "@/store/VerifyModalState";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { DotLoadingButton,  } from "./DotLoadingButton";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function VerificationModal() {
  const [isLoadinge,setIsLoading] = useState(false);
    const router = useRouter();
     const user = getAuthUser();
  const { open, closeModal } = useVerifyModal();
  const handleLogin = ()=> {
    if(!user){
    setIsLoading(true)
    closeModal()
    router.push('/login')
    setIsLoading(false)
    }

  }
  const handleSignUp = ()=> {
    if(!user){
    setIsLoading(true)
    closeModal()
    router.push('/login')
    setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={closeModal}>
  <DialogContent
        className="
          max-w-[340px]
          rounded-xl
          bg-slate-800
          border-none
          p-6
          text-center
          shadow-2xl
        "
      >
               <VisuallyHidden>
              <DialogTitle>Mobile Menu</DialogTitle>
            </VisuallyHidden>
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/tlogo.png"
            alt="JB Logo"
            width={220}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-2">
         Account Verification required
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Please log in to play the game. If you don&apos;t have an account,
          sign up for free!
        </p>

        {/* Actions */}
        <div className="space-y-3">

              <DotLoadingButton
                onClick = {handleLogin}
                loading={isLoadinge}
                className="w-full h-11 bg-orange-400 hover:bg-orange-600"
              >
                Verify Now
              </DotLoadingButton>



        </div>

        {/* Bottom Close */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <button
           onClick = {closeModal}
            className="
              h-10 w-10
              rounded-full
              bg-[#3a3d3d]
              flex items-center justify-center
              text-white
              hover:bg-[#4a4d4d]
              transition
            "
          >
            <X size={18} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
