"use client";

import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ReferralPage = () => {
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [referralData, setReferralData] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // Get auth user
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const myreferral = user?.referral_code;

  // Fetch referrals
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch(`https://stage.api.bajiraj.com/users/${myreferral}/referrals`);
        const data = await res.json();
        setReferralData(data || []);
      } catch (error) {
        console.error("Failed to fetch referrals:", error);
      }
    };
    if (myreferral) fetchReferrals();
  }, [myreferral]);

  // Filter by date
  const filteredReferrals = referralData.filter(r => {
    const now = new Date();
    let fromDate = new Date();
    if (timeRange === "Last 7 days") fromDate.setDate(now.getDate() - 7);
    if (timeRange === "Last 30 days") fromDate.setDate(now.getDate() - 30);
    if (timeRange === "Last 90 days") fromDate.setDate(now.getDate() - 90);
    return new Date(r.created_at) >= fromDate;
  });

  // Calculate summary
  const totalValid = filteredReferrals.length;
  const claimedBonus = filteredReferrals.reduce((sum, r) => sum + Number(r.claimed_bonus || 0), 0);
  const unclaimedBonus = filteredReferrals.reduce((sum, r) => sum + Number(r.unclaimed_bonus || 0), 0);

  return (
    <div className="p-4 max-w-4xl mx-auto mt-20">
      {/* Referral Code + Time Range */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-100 text-xl mb-2">Your Referral Code</p>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 w-fit">
            <span className="font-mono font-semibold text-lg text-white">{myreferral || "N/A"}</span>
            <button
              onClick={() => {
                if (myreferral) {
                  navigator.clipboard.writeText(myreferral);
                  alert("Referral code copied!");
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm transition"
            >
              Copy
            </button>
          </div>
        </div>

        <Select onValueChange={setTimeRange} defaultValue="Last 7 days">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
            <SelectItem value="Last 90 days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-100">Total Referrals</p>
          <p className="text-2xl font-bold text-green-400">{totalValid}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-100">Claimed Bonus</p>
          <p className="text-2xl font-bold text-blue-400">{claimedBonus}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-100">Unclaimed Bonus</p>
          <p className="text-2xl font-bold text-yellow-400">{unclaimedBonus}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4 bg-slate-500 mx-auto">
          <TabsTrigger value="all">All Referrals</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ReferralList data={filteredReferrals} setData={setReferralData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferralPage;

/* ---------------- COMPONENT ---------------- */
const ReferralList = ({
  data,
  setData,
  emptyText = "No referrals",
}: {
  data: any[];
  setData: any;
  emptyText?: string;
}) => {
  if (!data.length) return <div className="text-center text-gray-500 mt-10">{emptyText}</div>;

  const handleClaim = async (bonusId: number, userId: number) => {
    try {
      const res = await fetch(`https://stage.api.bajiraj.com/users/${bonusId}/claim`, { method: "POST" });
      const result = await res.json();

      if (res.ok) {
        // Update frontend data instantly
        setData((prev: any[]) =>
          prev.map((r) => {
            if (r.id === userId) {
              // Find the bonus in r.bonuses and mark it claimed
              const newBonuses = r.bonuses.map((b: any) =>
                b.id === bonusId ? { ...b, is_claimed: true } : b
              );

              // Recalculate claimed/unclaimed
              const claimed = newBonuses.filter((b: any) => b.is_claimed).reduce((sum: number, b: any) => sum + Number(b.amount), 0);
              const unclaimed = newBonuses.filter((b: any) => !b.is_claimed).reduce((sum: number, b: any) => sum + Number(b.amount), 0);

              return { ...r, bonuses: newBonuses, claimed_bonus: claimed, unclaimed_bonus: unclaimed };
            }
            return r;
          })
        );
      } else {
        alert(result.error || "Failed to claim bonus");
      }
    } catch (err) {
      console.error(err);
      alert("Error claiming bonus");
    }
  };

  return (
    <div className="space-y-2 mb-[100px]">
      {data.map((r) => (
        <div key={r.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-md">
          <div>
            <p className="font-medium">{r.name || r.username || r.email}</p>
            <p className="text-sm text-gray-100">{new Date(r.created_at).toLocaleString()}</p>
            <p className="text-xs text-gray-400">Phone: {r.phone}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-blue-400">Claimed: {r.claimed_bonus}</span>
            <span className="text-yellow-400">Unclaimed: {r.unclaimed_bonus}</span>

            {/* Render a claim button for each unclaimed bonus */}
            {r.bonuses
              .filter((b: any) => !b.is_claimed)
              .map((b: any) => (
                <button
                  key={b.id}
                  onClick={() => handleClaim(b.id, r.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-sm transition"
                >
                  Claim {b.amount}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
