"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { List } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
const TransactionRecordPage = () => {
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [transactions, setTransactions] = useState<any[]>([]);
   const user = getAuthUser();
  const userId = user?.id; // Replace with dynamic user ID if needed

  // Fetch deposits from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`https://api.bajiraj.cloud/deposit/${userId}`);
        const data = await res.json();
        if (data.success) {
          setTransactions(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, [userId]);

  // Filter transactions based on timeRange
  const filterTransactionsByDate = (txList: any[]) => {
    const now = new Date();
    let fromDate = new Date();

    if (timeRange === "Last 7 days") {
      fromDate.setDate(now.getDate() - 7);
    } else if (timeRange === "Last 30 days") {
      fromDate.setDate(now.getDate() - 30);
    } else if (timeRange === "Last 90 days") {
      fromDate.setDate(now.getDate() - 90);
    }

    return txList.filter(tx => new Date(tx.created_at) >= fromDate);
  };

  const filteredTransactions = filterTransactionsByDate(transactions);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-20">
        <h1 className="text-lg font-semibold">Transaction Records</h1>

        {/* Date Filter */}
        <Select onValueChange={(value) => setTimeRange(value)} defaultValue="Last 7 days">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
            <SelectItem value="Last 90 days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        {/* Settings / Filter Icon */}
        <Button variant="outline" size="icon">
          <List className="w-5 h-5 bg-slate-600" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4 bg-slate-500 mx-auto my-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Deposit</TabsTrigger>
          <TabsTrigger value="expense">Withdraw</TabsTrigger>
        </TabsList>

        {/* All Transactions Tab */}
        <TabsContent value="all">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500">
              <img
                src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-3d/default.webp?v=1765880929569&source=drccdnsrc"
                alt="No data"
                className="w-24 h-24 mb-4"
              />
              <p>No transactions</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between p-4 bg-gray-800 rounded-md"
                >
                  <div>
                    <p className="font-medium">{tx.payment_gateway}</p>
                    <p className="text-sm text-gray-400">
                      {tx.promo_code || "No Promo"} • {new Date(tx.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={tx.status === "approved" ? "text-green-400" : tx.status === "pending" ? "text-yellow-400" : "text-red-400"}>
                    {tx.amount} ({tx.status})
                  </span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Deposit Tab */}
        <TabsContent value="income">
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 mt-4">No deposit transactions.</p>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between p-4 bg-gray-800 rounded-md"
                >
                  <div>
                    <p className="font-medium">{tx.payment_gateway}</p>
                    <p className="text-sm text-gray-400">
                      {tx.promo_code || "No Promo"} • {new Date(tx.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={tx.status === "approved" ? "text-green-400" : tx.status === "pending" ? "text-yellow-400" : "text-red-400"}>
                    {tx.amount} ({tx.status})
                  </span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Withdraw Tab */}
        <TabsContent value="expense">
          <p className="text-gray-500 mt-4">No withdrawal transactions.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionRecordPage;
