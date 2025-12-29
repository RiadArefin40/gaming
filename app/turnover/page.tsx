"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TurnoverCard from "../components/turnover-card";
import { useAutoFetch } from "@/hooks/use-auto-fetch";
import { getAuthUser } from "@/lib/auth";

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
  const user = getAuthUser();

  const { data, error } = useAutoFetch<BalanceData | undefined>(
    user ? `https://api.bajiraj.cloud/users/${user.id}/balance` : "",
    10000
  );

  if (error) return <div>Error loading turnover data.</div>;
  if (!data) return <div>Loading...</div>;

  // Active = incomplete AND active_turnover_amount > 0
  const activeTurnover = data.turnover.filter(
    t => !t.complete && parseFloat(t.active_turnover_amount as any) > 0
  );
  const completedTurnover = data.turnover.filter(t => t.complete);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 px-4 py-3">
        <h1 className="text-lg font-semibold">টার্নওভার</h1>
        <p className="text-sm text-neutral-400 mt-1">Balance: ৳ {data.balance}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="completed" className="px-4 pt-8">
        <TabsList className="bg-slate-500 mx-auto border-b border-neutral-800 rounded-none">
          <TabsTrigger value="active" className="data-[state=active]:text-orange-500">
            একটিভ
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:text-orange-500">
            সম্পূর্ণ হয়েছে
          </TabsTrigger>
        </TabsList>

        {/* Active */}
        <TabsContent value="active" className="mt-4 space-y-3 text-neutral-400">
          {activeTurnover.length > 0 ? (
            activeTurnover.map(t => {
              const total = parseFloat(t.amount || "0");
              const remaining = parseFloat(t.active_turnover_amount as any || "0");
              const completed = total - remaining;
              const progress = total > 0 ? (completed / total) * 100 : 0;

              // optional dynamic color class
              const progressColor =
                progress >= 90
                  ? "bg-green-500"
                  : progress >= 50
                  ? "bg-yellow-500"
                  : "bg-orange-500";

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
            <div>কোনো একটিভ টার্নওভার নেই</div>
          )}
        </TabsContent>

        {/* Completed */}
        <TabsContent value="completed" className="mt-4 space-y-3">
          {completedTurnover.length > 0 ? (
            completedTurnover.map(t => (
              <TurnoverCard
                key={t.id}
                title={t.code || t.type || "Unknown Promo"}
                amount={`৳ ${t.amount || "0"}`}
                progress={100}
                progressText={`${t.amount || "0"} / ${t.amount || "0"}`}
                status="completed"
                progressClassName="bg-green-500"
              />
            ))
          ) : (
            <div>কোনো সম্পূর্ণ টার্নওভার নেই</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
