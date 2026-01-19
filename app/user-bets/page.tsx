"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { DialogFooter,DialogContent, DialogHeader ,Dialog , DialogTitle} from "@/components/ui/dialog";


const UserBetsPage = () => {
  const [bets, setBets] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [activeType, setActiveType] = useState("all");

  /* 🔐 Get auth user */
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const userId = user?.id;

  /* 📡 Fetch user bets */
  useEffect(() => {
    if (!userId) return;

    fetch(`https://api.bajiraj.cloud/users/userbet/${userId}`)
      .then((res) => res.json())
      .then(setBets)
      .catch(console.error);
  }, [userId]);

  /* 🕒 Time filter */
  const filteredByTime = useMemo(() => {
    const now = new Date();
    const from = new Date();

    if (timeRange === "Last 7 days") from.setDate(now.getDate() - 7);
    if (timeRange === "Last 30 days") from.setDate(now.getDate() - 30);
    if (timeRange === "Last 90 days") from.setDate(now.getDate() - 90);

    return bets.filter((b) => new Date(b.updated_at) >= from);
  }, [bets, timeRange]);

    const [filterOpen, setFilterOpen] = useState(false);

const [fromDate, setFromDate] = useState<string>("");
const [toDate, setToDate] = useState<string>("");

  /* 🎯 Type filter */
  const finalBets = useMemo(() => {
    if (activeType === "all") return filteredByTime;
    return filteredByTime.filter((b) => b.bet_type === activeType);
  }, [filteredByTime, activeType]);

  /* 🧮 Summary */
  const totalAmount = finalBets.reduce(
    (sum, b) => sum + Number(b.amount),
    0
  );

  const betTypes = useMemo(() => {
    return ["all", ...new Set(bets.map((b) => b.bet_type))];
  }, [bets]);
  const router = useRouter();
const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
const filterTransactionsByDate = (txList: any[]) => {
  const now = new Date();
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (timeRange === "Last 7 days") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 7);
  }

  if (timeRange === "Last 30 days") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 30);
  }

  if (timeRange === "Last 90 days") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 90);
  }

  if (timeRange === "Custom" && fromDate && toDate) {
    startDate = new Date(fromDate);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999); // include full day
  }

  return txList.filter((tx) => {
    const txDate = new Date(tx.created_at);
    if (startDate && endDate)
      return txDate >= startDate && txDate <= endDate;
    if (startDate)
      return txDate >= startDate;
    return true;
  });
};
  return (
    <div className=" max-w-screen bg-black-800 mx-0 py-2 -mt-2">
         <header className="h-16 px-4 py-2  relative bg-black-700 ">
        <h1 className="text-center mx-auto mt-2 font-bold text-white/70 text-xl">Betting Records</h1>
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 mt-1 text-white/70 hover:text-red-600" />
                </button>
      </header>
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
  <DialogContent className="bg-black-600 rounded-xl">
    <DialogHeader>
      <DialogTitle>Filter by Date</DialogTitle>
    </DialogHeader>


    {/* Custom Date Inputs */}
    <div className="space-y-3 mt-4">

      <div className="flex gap-2">
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setTimeRange("Custom");
            setFromDate(e.target.value);
          }}
        />
        <Input
          type="date"
          value={toDate}
          onChange={(e) => {
            setTimeRange("Custom");
            setToDate(e.target.value);
          }}
        />
      </div>
    </div>

    <DialogFooter>
      <Button className="text-slate-800" variant="outline" onClick={() => setFilterOpen(false)}>
        Cancel
      </Button>
      <Button className="text-slate-200" onClick={() => setFilterOpen(false)}>
        Apply
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
          <Tabs defaultValue="active" className="px-4  border-t border-b-0 border-gray-700 bg-black-700 w-full pt-8 -pb-12">
       <TabsList className="gap-12 bg-black-700  w-full">
          <TabsTrigger
            value="active"
            className="
              relative flex-1 pb-8 bg-black-700 text-white text-center 
              data-[state=active]:text-yellow-300/90
              after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
              after:w-8 after:h-1 after:bg-yellow-300/90 
              after:opacity-100
              data-[state=inactive]:after:opacity-0
              after:transition-opacity after:duration-200
            "
          >
            Setteled
          </TabsTrigger>
      
          <TabsTrigger
            value="completed"
            className="
              relative pb-8 flex-1 bg-black-700 text-white text-center 
              data-[state=active]:text-yellow-300/90
              after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
              after:w-8 after:h-1 after:bg-yellow-300/90 
              after:opacity-100
              data-[state=inactive]:after:opacity-0
              after:transition-opacity after:duration-200
            "
          >
            Unsetteled
          </TabsTrigger>
        </TabsList>
      
              {/* Active */}
              <TabsContent value="active" className="mt-4 space-y-3 text-neutral-400">
              
              </TabsContent>
      
              {/* Completed */}
              <TabsContent value="completed" className="mt-4 space-y-3">
                </TabsContent>
          

            </Tabs>
      <div className="flex relative flex-row bg-black-600 -mt-[10px] py-3 px-3 mx-2  rounded-sm  justify-between sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      

        <Select onValueChange={setTimeRange} defaultValue="Last 7 days">
          <SelectTrigger className="w-40 bg-yellow-300/90 text-slate-800 font-medium border-yellow-300/90">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
        <div className="bg-yellow-300/90 rounded-r-sm absolute top-0 z-300 right-0 h-[59px] w-14 text-slate-800">
            <Button
  size="icon"
  variant="ghost"
  className="ml-2 mt-3"
  onClick={() => setFilterOpen(true)}
>
  <Filter size={28} />
</Button>

        </div>
     
      </div>
      

      {/* Summary */}
      {/* <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black-600 rounded-lg p-4 text-center">
          <p className="text-gray-100">Total Bets Type</p>
          <p className="text-2xl font-bold text-yellow-300/90">
            {finalBets.length}
          </p>
        </div>
        <div className="bg-black-600 rounded-lg p-4 text-center">
          <p className="text-gray-100">Total Amount</p>
          <p className="text-2xl font-bold text-yellow-300/90">
            ৳ {totalAmount.toFixed(2)}
          </p>
        </div>
      </div> */}

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveType}>
        {/* <TabsList className="mb-4 bg-yellow-500 w-[98%] mx-auto flex flex-wrap">
          {betTypes.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList> */}

        <TabsContent className="" value={activeType}>
          <BetList  data={finalBets} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBetsPage;

/* ---------------- COMPONENT ---------------- */

const BetList = ({
  data,
  emptyText = "No bets found",
}: {
  data: any[];
  emptyText?: string;
}) => {
  if (!data.length)
    return <div className="text-center mx-2 bg-gray-600 rounded-lg text-gray-500 mt-10">
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
    </div>;

  return (
    <div className="space-y-2 mb-[100px]">
        <div className="flex bg-black-600 justify-between items-center px-4 py-2 bg-gray-600 rounded-t-sm -mt-1"> 
            <p className="border-r border-dashed pr-32 text-yellow-300/90 text-lg font-bold">Type </p>
             <p className=" text-yellow-300/90 text-lg font-bold">Total turnover </p>
          </div>
      {data.map((b) => (
        <div
          key={b.id}
          
        >
              <div className="bg-yellow-300/90 -mt-2 py-2 flex justify-between px-2">
              <div className="flex-1 flex gap-1 ">
                                <img className="bg-white rounded-full p-1" src="https://img.m156b.com/mb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1768297086272&quot" alt="" />
             <span className="text-md font-bold text-gray-700">
              {new Date(b.created_at).toLocaleDateString("en-US", {
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
          <div className="flex justify-between items-center px-4 py-2 bg-white/30">
    
          <div>
            <p className="font-medium capitalize border-r border-dashed pr-[140px] text-white/70">{b.bet_type}</p>
         
          </div>

          <div className="text-right">
            <p className="text-white/70 font-bold ">
              ৳ {b.amount}
            </p>
          </div>
          </div>

        </div>
      ))}
    </div>
  );
};
