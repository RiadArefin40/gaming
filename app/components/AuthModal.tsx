"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useAuthModal } from "@/store/useAuthModal";
import { useRouter } from "next/navigation";
import { DotLoadingButton,  } from "./DotLoadingButton";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AuthModal() {
  const [isLoadinge,setIsLoading] = useState(false);
    const router = useRouter();
  const { open, closeModal } = useAuthModal();
  const handleLogin = ()=> {
    setIsLoading(true)
    closeModal()
    router.push('/login')
    setIsLoading(false)
  }
  const handleSignUp = ()=> {
    setIsLoading(true)
    closeModal()
    router.push('/registration')
    setIsLoading(false)
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
        <div className="flex justify-center -mb-8">
            {/* <img src="/oie_transparent.png" className="w-[160px] -ml-8" alt="" /> */}
        </div>
 <span className="text-4xl"><span className="text-orange-400">Baji</span>raj</span>
        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-2">
          Become a Bajiraj Member
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
          Please log in to play the game. If you don&apos;t have an account,
          sign up for free!
        </p>

        {/* Actions */}
        <div className="space-y-3">

              <DotLoadingButton
                onClick = {handleSignUp}
                loading={isLoadinge}
                className="w-full h-11 bg-gradient-to-r from-orange-400 to-orange-700 hover:bg-orange-600"
              >
                Sign up
              </DotLoadingButton>


   <DotLoadingButton
   onClick = {handleLogin}
                loading={isLoadinge}
                className="w-full h-11 bg-slate-400 hover:bg-orange-600"
              >
                Log in
              </DotLoadingButton>
        </div>

        {/* Bottom Close */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <button
           onClick = {handleSignUp}
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
