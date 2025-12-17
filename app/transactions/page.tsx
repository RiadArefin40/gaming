"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { List } from "lucide-react";

const TransactionRecordPage = () => {
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [transactions, setTransactions] = useState<any[]>([]); // Replace with your data type

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
            <div className="flex items-center justify-between mb-6 mt-20">
        <h1 className="text-lg font-semibold">Transaction records</h1>

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

      {/* Tabs for different transaction types */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4 bg-slate-500 mx-auto my-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Deposit</TabsTrigger>
          <TabsTrigger value="expense">Widthdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500">
              <img
                src="https://img.j189eb.com/jb/h5/assets/v3/images/icon-3d/default.webp?v=1765880929569&source=drccdnsrc" // Replace with your folder illustration path
                alt="No data"
                className="w-24 h-24 mb-4"
              />
              <p>No data</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex justify-between p-4 bg-gray-800 rounded-md"
                >
                  <span>{tx.name}</span>
                  <span>{tx.amount}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="income">
          <p className="text-gray-500">No income transactions.</p>
        </TabsContent>

        <TabsContent value="expense">
          <p className="text-gray-500">No expense transactions.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionRecordPage;
