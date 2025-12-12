"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Plus, RotateCw } from "lucide-react";
export default function MobileAppBar() {
  return (
    <div className="flex w-full items-center justify-between px-4 py-3 border-b absolute top-0 left-0 right-0   z-50">
      <div className="flex">
        <SidebarTrigger className="hidden md:block" />
        <h1 className="text-xl text-orange-400 font-semibold">YourLogo</h1>
      </div>

      {/* <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
        Sign Up
      </button> */}
       <div className="z-50 bg-gray-200 h-8 flex rounded items-center justify-end gap-3">
      
      {/* T Button */}
      <button className="w-4 h-4 rounded-lg ml-2 bg-green-600 text-white rounded flex items-center justify-center font-bold">
        T
      </button>

      <p className="text-gray-700">0.00</p>

      {/* Refresh Button */}
      <button className="w-4 h-4  text-gray-700 rounded flex items-center justify-center hover:bg-gray-200">
        <RotateCw className="w-4 h-4" />
      </button>

      {/* Plus/Add Button */}
      <button className="w-8 h-8 bg-orange-500 rounded-r text-white flex items-center justify-center hover:bg-orange-600">
        <Plus className="w-4 h-4" />
      </button>
      
    </div>
    </div>
  );
}
