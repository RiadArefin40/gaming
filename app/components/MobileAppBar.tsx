"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, RotateCw, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getAuthUser } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import {useAutoFetch} from "@/hooks/use-auto-fetch"
import RefreshButton from "./RefreshButton";

interface BalanceData {
  balance: number;
  turnover: number;
}

export default function MobileAppBar() {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [sheetOpen, setSheetOpen] = useState(false);
  const user = getAuthUser();
  const router = useRouter();
  const pathname = usePathname();
  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "BN", name: "বাংলা", flag: "🇧🇩" },
  ];


  const { data, error } = useAutoFetch<BalanceData | undefined>(
    user ? `https://api.bajiraj.cloud/users/${user.id}/balance` : "",
    10000
  );
  

  const balance = data?.balance ?? 0;
  const turnover = data?.turnover ?? 0;
  const [isLoading, setIsloading] = useState(false)
  const fetchBalance = () =>{
    setIsloading (true);
   setTimeout(async () => {
 setIsloading (false);
    }, 1500); // 1.5 seconds delay
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Blur overlay */}
      {sheetOpen && (
        <div className="fixed max-w-screen inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity" />
      )}

      <div className="flex fixed top-0 w-full items-center justify-between px-4 py-4 shadow-md z-50 bg-gray-900">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="hidden md:block" />
          <div onClick={() => router.push("/")} className="">
            {/* <img src="/tlogo.png" alt="Logo" /> */}
       <p className="tracking-wider text-3xl font-bold text-yellow-300 select-none touch-none">
  Bajiraj
</p>

          </div>
        </div>

        <div className="flex items-center gap-3 z-50">
          {user && (
            <div className="flex items-center">
      <RefreshButton
  balance={balance}
  loading= {isLoading}
  onRefresh={async () => {

      fetchBalance();
 
  }}
/>


              <button  onClick={() => setIsOpen(true)} className="w-9 h-[40px] flex -ml-2 items-center justify-center bg-orange-400 rounded-r-md">
                <Plus size={24} />
              </button>


                    {/* Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
   

        <SheetContent
        side="top"
          className="fixed !top-[67px] bottom-0 max-h-[150px] left-0 right-0 bg-slate-900  p-6 flex flex-col gap-4 shadow-lg
          transform transition-transform duration-300 border-b-0"
        >
         <VisuallyHidden>
                <DialogTitle>Mobile Menu</DialogTitle>
              </VisuallyHidden>

          <div className="flex flex gap-4 mt-4">
            <button
              className="w-full py-3 rounded-lg bg-slate-700 text-white font-semibold hover:scale-105 transition-transform"
              onClick={() => {
                router.push('/withdraw')
                setIsOpen(false);
              }}
            >
              Withdraw
            </button>

            <button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform"
              onClick={() => {
                router.push('/deposit')
                setIsOpen(false)
              }}
            >
              Deposit
            </button>
          </div>
        </SheetContent>
      </Sheet>
            </div>
          )}

          {!user && pathname !== "/login" && (
            <>
              <button
                onClick={() => router.push("/login")}
                className="px-3 w-[90px] py-[6px] text-lg bg-orange-400 text-white font-medium rounded hover:bg-blue-600"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/login")}
                className="px-3 -ml-2 w-[90px] py-[6px] text-lg bg-orange-400 text-white font-medium rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </>
          )}

          {/* Language Sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="w-8 p-2 h-8 flex items-center justify-center border-2 border-orange-400 rounded-xl">
                <span className="text-md">
                  {languages.find((l) => l.code === selectedLang)?.flag}
                </span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="h-[70%] !top-[57px] bg-gray-900 p-4 shadow-lg z-50 border-b-0"
            >
              <VisuallyHidden>
                <DialogTitle>Mobile Menu</DialogTitle>
              </VisuallyHidden>

              <div className="flex justify-between items-center mb-4">
                <p className="text-xl text-white">Select Language</p>
                <button
                  className="bg-gray-300 px-2 py-1 rounded-lg flex items-center justify-center"
                  onClick={() => setSheetOpen(false)}
                >
                  <X className="w-6 h-6 text-gray-700 hover:text-red-600" />
                </button>
              </div>

              <div className="flex gap-4 flex-wrap bg-gray-100 p-4 rounded w-[300px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`px-4 py-2 w-[120px] font-medium rounded ${
                      selectedLang === lang.code
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-orange-500"
                    }`}
                    onClick={() => setSelectedLang(lang.code)}
                  >
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
