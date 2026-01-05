"use client";

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
import { List } from "lucide-react";
import { getAuthUser } from "@/lib/auth";

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

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored) as AuthUser);
  }, []);
  const userId = user?.id;

  // ✅ Fetch deposits + withdrawals
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [depositRes, withdrawRes] = await Promise.all([
          fetch(`https://api.bajiraj.cloud/deposit/${userId}`),
          fetch(`https://api.bajiraj.cloud/withdrawals/${userId}`),
        ]);

        const depositData = await depositRes.json();
        const withdrawData = await withdrawRes.json();

        const deposits = (depositData?.data || []).map((d: any) => ({
          ...d,
          type: "deposit",
        }));

        const withdrawals = (withdrawData || []).map((w: any) => ({
          ...w,
          type: "withdraw",
        }));

        setTransactions([...deposits, ...withdrawals]);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    if (userId) fetchTransactions();
  }, [userId]);

  // ✅ Date filter
  const filterTransactionsByDate = (txList: any[]) => {
    const now = new Date();
    let fromDate = new Date();

    if (timeRange === "Last 7 days") fromDate.setDate(now.getDate() - 7);
    if (timeRange === "Last 30 days") fromDate.setDate(now.getDate() - 30);
    if (timeRange === "Last 90 days") fromDate.setDate(now.getDate() - 90);

    return txList.filter(
      (tx) => new Date(tx.created_at) >= fromDate
    );
  };

  const filteredTransactions = filterTransactionsByDate(transactions);
  const deposits = filteredTransactions.filter(t => t.type === "deposit");
  const withdrawals = filteredTransactions.filter(t => t.type === "withdraw");

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-20">
        <h1 className="text-lg font-semibold">Transaction Records</h1>

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

        <Button variant="outline" size="icon">
          <List className="w-5 h-5" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4 bg-slate-500 mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Deposit</TabsTrigger>
          <TabsTrigger value="expense">Withdraw</TabsTrigger>
        </TabsList>

        {/* ALL */}
        <TabsContent value="all">
          <TransactionList data={filteredTransactions} />
        </TabsContent>

        {/* DEPOSIT */}
        <TabsContent value="income">
          <TransactionList data={deposits} emptyText="No deposit records." />
        </TabsContent>

        {/* WITHDRAW */}
        <TabsContent value="expense">
          <TransactionList data={withdrawals} emptyText="No withdrawal records." />
        </TabsContent>
      </Tabs>
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
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.map((tx) => (
        <div
          key={`${tx.type}-${tx.id}`}
          className="flex justify-between p-4 bg-gray-800 rounded-md"
        >
          <div>
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
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {tx.amount} ({tx.status})
          </span>
        </div>
      ))}
    </div>
  );
};
