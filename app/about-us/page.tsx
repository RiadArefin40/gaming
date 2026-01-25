"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, List, X } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
import { DialogFooter,DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

const TransactionRecordPage = () => {
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [transactions, setTransactions] = useState<any[]>([]);
  interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}






const router = useRouter();

  const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
  return (
    <div className=" max-w-4xl mx-auto">
    <header className="h-16 px-4 py-2  relative bg-black-700 ">
      
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 mt-1 text-white/70 hover:text-red-600" />
                </button>
      </header>
     <div className="flex relative flex-row bg-black-600 mt-2 py-3 px-3 mx-2  rounded-sm  justify-between sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      
<section className="bg-black-900 text-gray-300 py-2 pb-20 px-6">
<div className="max-w-6xl mx-auto">
{/* Header */}
<div className="text-center mb-16">
<h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide">
About SPCWIN
</h1>
<p className="mt-5 text-lg text-gray-400 max-w-3xl mx-auto">
SPCWIN is a trusted online casino platform in Bangladesh, offering
a premium gaming experience with live casino, popular slots, and
fast, secure betting services.
</p>
</div>


{/* Main Content */}
<div className="grid md:grid-cols-2 gap-14 items-center">
{/* Left */}
<div>
<h2 className="text-2xl font-semibold text-yellow-400 mb-4">
Who We Are
</h2>
<p className="leading-relaxed text-gray-400 mb-4">
SPCWIN was built with one clear mission — to deliver a safe,
exciting, and reliable online casino experience for players
across Bangladesh. We combine modern technology with trusted
gaming providers to ensure fairness, speed, and entertainment.
</p>
<p className="leading-relaxed text-gray-400">
From live casino tables to high-return slot games and sports
betting, SPCWIN is designed for players who value quality,
transparency, and fast payouts.
</p>
</div>


{/* Right Card */}
<div className="bg-[#111] rounded-2xl p-8 border border-yellow-400/20 shadow-xl">
<h3 className="text-xl font-semibold text-yellow-400 mb-6">
Why Play on SPCWIN
</h3>


<ul className="space-y-4">
<li className="flex gap-3">
<span className="text-yellow-400 text-xl">🎰</span>
<p>
Wide selection of live casino games and popular slot machines
</p>
</li>


<li className="flex gap-3">
<span className="text-yellow-400 text-xl">⚡</span>
<p>
Fast deposits and quick withdrawals for Bangladeshi players
</p>
</li>


<li className="flex gap-3">
<span className="text-yellow-400 text-xl">🔒</span>
<p>
Secure platform with advanced data protection and encryption
</p>
</li>


<li className="flex gap-3">
<span className="text-yellow-400 text-xl">🎯</span>
<p>
Fair play, verified games, and transparent betting system
</p>
</li>


<li className="flex gap-3">
<span className="text-yellow-400 text-xl">📞</span>
<p>
Dedicated customer support available 24/7
</p>
</li>
</ul>
</div>
</div>


{/* Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center">
<div className="bg-[#111] p-6 rounded-xl border border-yellow-400/10">
<h4 className="text-3xl font-bold text-yellow-400">1000+</h4>
<p className="mt-2 text-gray-400">Games Available</p>
</div>


<div className="bg-[#111] p-6 rounded-xl border border-yellow-400/10">
<h4 className="text-3xl font-bold text-yellow-400">24/7</h4>
<p className="mt-2 text-gray-400">Live Support</p>
</div>


<div className="bg-[#111] p-6 rounded-xl border border-yellow-400/10">
<h4 className="text-3xl font-bold text-yellow-400">Fast</h4>
<p className="mt-2 text-gray-400">Withdrawals</p>
</div>


<div className="bg-[#111] p-6 rounded-xl border border-yellow-400/10">
<h4 className="text-3xl font-bold text-yellow-400">Trusted</h4>
<p className="mt-2 text-gray-400">By Players</p>
</div>
</div>


{/* Footer Text */}
<div className="text-center mt-16 max-w-3xl mx-auto">
<p className="text-gray-400">
At SPCWIN, responsible gaming is important to us. We encourage all
players to enjoy our platform responsibly and within their limits.
</p>
</div>
</div>
</section>
   
  
     
      </div>

  


    </div>
  );
};

export default TransactionRecordPage;

/* ---------------- COMPONENT ---------------- */


const TransactionList = ({
  data,
  emptyText = "No transactions",
}: {
  data: any[];
  emptyText?: string;
}) => {
  if (!data.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
           <h1 className="text-center text-slate-100 text-2xl">No Data Found</h1>
            <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="ml-10"
   
    >
      <source
        src="https://img.m156b.com/mb/h5/assets/images/animation/no-data.mov?v=1768297086272"
        type="video/quicktime"
      />
      <source
        src="https://img.m156b.com/mb/h5/assets/images/animation/no-data.webm?v=1768297086272"
        type="video/webm"
      />
      {/* Fallback text */}
      Your browser does not support the video tag.
    </video>
      </div>
    );
  }
console.log("data", data)
  return (
    <div className="space-y-2">
          <div className="flex bg-black-600 justify-between items-center px-4 py-2 bg-gray-600 rounded-t-sm -mt-1"> 
            <p className="border-r flex-1 border-dashed  text-yellow-300/90 text-lg font-bold">Type </p>
                                 <p className="border-r flex-1 pl-4 border-dashed  text-yellow-300/90 text-lg font-bold">Amount</p>
                     <p className="border-r flex-1 border-dashed pl-4 text-yellow-300/90 text-lg font-bold">Status </p>
             <p className=" text-yellow-300/90 flex-1 pl-4 text-lg font-bold"> <span className="pl-8">Total</span>  </p>
          </div>
      {data.map((tx) => (
        
        <div
          key={`${tx.type}-${tx.id}`}
       
        >
                        <div className="bg-yellow-300/90 -mt-2 py-2 flex justify-between px-2">
              <div className="flex-1 flex gap-1 ">
                                <img className="bg-white rounded-full p-1" src="https://img.m156b.com/mb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1768297086272&quot" alt="" />
             <span className="text-md font-bold text-gray-700">
              {new Date(tx.created_at).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
})}
            </span>

              </div>
              <div className="border border-slate-900 rounded-md px-1 text-slate-900">
                <p>GMT +8</p>
              </div>

        </div>
          {/* <div>
            <p className="font-medium">{tx.payment_gateway}</p>
            <p className="text-sm text-gray-400">
              {new Date(tx.created_at).toLocaleString()}
            </p>
          </div>

          <span
            className={
              tx.status === "approved"
                ? "text-green-400"
                : tx.status === "pending"
                ? "text-yellow-300"
                : "text-red-400"
            }
          >
            {tx.amount} ({tx.status})
          </span> */}
                 <div className="flex justify-between items-center  py-2 bg-white/30">
    
          <div className="flex-1">
            <p className="font-medium capitalize pl-4 border-r border-dashed  text-white/70">{tx.type}</p>
         
          </div>
          <div className="flex-1">
            <p className="font-medium capitalize border-r border-dashed pl-6 text-white/70">{tx.amount}</p>
         
          </div >
               <div className="flex-1">
            <p className="font-medium capitalize border-r border-dashed pl-4 text-white/70">
            
            {tx.status == 'processing' ? (
<span className="bg-yellow-300/80 p-[2px] !w-[150px] text-slate-800 rounded-sm">{tx.status}</span>
            ) : null}
                        {tx.status == 'pending' ? (
<span className="bg-green-200/50 p-[2px] !w-[150px] px-3 text-slate-800 rounded-sm">{tx.status}</span>
            ) : null}
                                    {tx.status == 'success' ? (
<span className="bg-green-600/50 p-[2px] w-[120px] text-slate-800 rounded-sm">{tx.status}</span>
            ) : null}
            </p>
   
          </div>

          <div className=" flex-1 pr-4">
            <p className="text-white/70 pl-8 font-bold ">
              ৳ {tx.amount}
            </p>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};
