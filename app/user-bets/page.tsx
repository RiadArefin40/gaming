"use client";

import { useEffect, useMemo, useState } from "react";
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

    return bets.filter((b) => new Date(b.created_at) >= from);
  }, [bets, timeRange]);

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

  return (
    <div className="p-4 max-w-4xl bg-black-700 mx-2 rounded-md mt-20">
      {/* Header */}
      <div className="flex flex-row  justify-between sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">My Bets</h2>

        <Select onValueChange={setTimeRange} defaultValue="Last 7 days">
          <SelectTrigger className="w-40 border-yellow-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black-600 rounded-lg p-4 text-center">
          <p className="text-gray-100">Total Bets Type</p>
          <p className="text-2xl font-bold text-yellow-400">
            {finalBets.length}
          </p>
        </div>
        <div className="bg-black-600 rounded-lg p-4 text-center">
          <p className="text-gray-100">Total Amount</p>
          <p className="text-2xl font-bold text-yellow-400">
            ৳ {totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveType}>
        <TabsList className="mb-4 bg-yellow-500 w-[98%] mx-auto flex flex-wrap">
          {betTypes.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

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
    return <div className="text-center bg-gray-600 text-gray-500 mt-10">{emptyText}</div>;

  return (
    <div className="space-y-2 mb-[100px]">
        <div className="flex bg-black-800 justify-between items-center px-4 py-2 bg-gray-600 rounded-t-sm -mt-1"> 
            <p className="border-r pr-32 text-yellow-400 text-lg font-bold">Type </p>
             <p className=" text-yellow-400 text-lg font-bold">Total turnover </p>
          </div>
      {data.map((b) => (
        <div
          key={b.id}
          
        >
              <div className="bg-yellow-300 -mt-2 py-2 flex px-2">
                <img className="bg-white rounded-full p-1" src="https://img.m156b.com/mb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1768297086272&quot" alt="" />
             <p className="text-md font-bold mx-2  text-gray-700">
              {new Date(b.created_at).toLocaleString()}
            </p>
        </div>
          <div className="flex justify-between items-center px-4 py-2 bg-black-600">
    
          <div>
            <p className="font-medium capitalize border-r pr-[140px] text-white">{b.bet_type}</p>
         
          </div>

          <div className="text-right">
            <p className=" font-bold ">
              ৳ {b.amount}
            </p>
          </div>
          </div>

        </div>
      ))}
    </div>
  );
};
