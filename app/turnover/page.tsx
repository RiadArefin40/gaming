"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TurnoverCard from "../components/turnover-card";
import { useAutoFetch } from "@/hooks/use-auto-fetch";
import { getAuthUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
interface Turnover {
  id: number;
  user_id: number;
  promo_id: number | null;
  amount: string | null;
  created_at: string;
  type: string | null;
  code: string | null;
  complete: boolean;
  active_turnover_amount: string | number;
}

interface BalanceData {
  balance: string;
  turnover: Turnover[];
}

export default function TurnoverPage() {
  interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}

// const user: AuthUser | null = (() => {
//   const stored = localStorage.getItem("auth_user");
//   return stored ? JSON.parse(stored) as AuthUser : null;
// })();
  const [user, setUser] = useState<AuthUser | null>(null);
const router = useRouter();
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored) as AuthUser);
  }, []);

  const { data, error } = useAutoFetch<BalanceData | undefined>(
    user ? `https://api.spcwin.info/users/${user.id}/balance` : "",
    10000
  );

  if (error) return <div>Error loading turnover data.</div>;
  if (!data) return <div>Loading...</div>;

  // Active = incomplete AND active_turnover_amount > 0
  const activeTurnover = data.turnover.filter(
    t => !t.complete && parseFloat(t.active_turnover_amount as any) > 0
  );
  const completedTurnover = data.turnover.filter(t => t.complete);
const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
  return (
    <div className="min-h-screen max-w-screen bg-black-800 text-white">
      {/* Header */}
      <header className="h-15 px-4 py-2 border-b border-gray-700 pb-2  relative bg-black-700 ">
        <h1 className="text-center text-white/70 mx-auto mt-2 font-bold text-xl">Turnover</h1>
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 text-white/70 hover:text-red-600" />
                </button>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full gap-0 bg-black-700 pt-8">
 <TabsList className="flex gap-12 bg-black-700 w-full">
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
      Active
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
      Completed
    </TabsTrigger>
  </TabsList>

        {/* Active */}
        <div className="bg-black-800">
              <TabsContent value="active" className="mt-4 mx-2 bg-black-800 space-y-3 text-neutral-400">
          {activeTurnover.length > 0 ? (
            activeTurnover.map(t => {
              const total = parseFloat(t.amount || "0");
              const remaining = parseFloat(t.active_turnover_amount as any || "0");
              const completed = total - remaining;
              const progress = total > 0 ? (completed / total) * 100 : 0;

              // optional dynamic color class
              const progressColor =
                progress >= 90
                  ? "bg--500"
                  : progress >= 50
                  ? "bg-yellow-300"
                  : "bg-yellow-300/90";

              return (
                <TurnoverCard
                  key={t.id}
                  title={t.code || t.type || "Unknown Promo"}
                  amount={`৳ ${remaining}`}
                  progress={progress}
                  progressText={`${completed.toFixed(2)} / ${total.toFixed(2)}`}
                  status="active"
                  progressClassName={progressColor} // you can pass this prop to TurnoverCard
                />
              );
            })
          ) : (
            <div className="mx-auto bg-black-600 rounded-md p-4">
<h1 className="text-center text-2xl">No Data Found</h1>
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
          )}
        </TabsContent>

        </div>
    
<div className="bg-black-800">
    <TabsContent value="completed" className="mt-4 mx-2 bg-black-800 space-y-3">
          {completedTurnover.length > 0 ? (
            completedTurnover.map(t => (
              <TurnoverCard
                key={t.id}
                title={t.code || t.type || "Unknown Promo"}
                amount={`৳ ${t.amount || "0"}`}
                progress={100}
                progressText={`${t.amount || "0"} / ${t.amount || "0"}`}
                status="completed"
                progressClassName="bg-yellow-300/90"
              />
            ))
          ) : (
            <div>কোনো সম্পূর্ণ টার্নওভার নেই</div>
          )}
        </TabsContent>
</div>
        {/* Completed */}
    
      </Tabs>
    </div>
  );
}
