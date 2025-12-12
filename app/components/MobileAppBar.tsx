"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, RotateCw, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function MobileAppBar() {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [sheetOpen, setSheetOpen] = useState(false);

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "BN", name: "বাংলা", flag: "🇧🇩" },
  ];

  return (
    <>
      {/* Blur overlay */}
      {sheetOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"></div>
      )}

      <div className="flex w-full items-center justify-between px-4 py-4 shadow-md absolute top-0 left-0 right-0 z-50 bg-gray-900">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="hidden md:block" />
          <h1 className="text-xl text-orange-400 font-semibold">YourLogo</h1>
        </div>

        <div className="flex items-center gap-3 z-50">
          {/* Login / Signup */}
          <button className="px-3 w-[75px] py-[6px] text-sm bg-orange-400 text-white font-medium rounded hover:bg-blue-600">
            Login
          </button>
          <button className="px-3 w-[75px] py-[6px] text-sm bg-orange-400 text-white font-medium rounded hover:bg-green-600">
            Sign Up
          </button>

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

              {/* Header with Close Button */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl text-white">Select Language</p>
                <button
                  className="bg-gray-300 px-2 py-1 rounded-lg flex items-center justify-center"
                  onClick={() => setSheetOpen(false)}
                >
                  <X className="w-6 h-6 text-gray-700 hover:text-red-600" />
                </button>
              </div>

              {/* Language Options */}
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
                    <span className="font-medium">    {lang.name}</span>
                  
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
