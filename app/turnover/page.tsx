"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TurnoverCard from "../components/turnover-card"

export default function TurnoverPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 px-4 py-3">
        <h1 className="text-lg font-semibold">টার্নওভার</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="completed" className="px-4 pt-8">
        <TabsList className="bg-slate-500 mx-auto border-b border-neutral-800 rounded-none">
          <TabsTrigger
            value="active"
            className="data-[state=active]:text-orange-500"
          >
            একটিভ
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:text-orange-500"
          >
            সম্পূর্ণ হয়েছে
          </TabsTrigger>
        </TabsList>

        {/* Completed */}
        <TabsContent value="completed" className="mt-4 space-y-3">
          <TurnoverCard
            title="Daily Login (General)"
            amount="৳ 7.00"
            progress={100}
            progressText="175.00 / 75.00"
            status="completed"
          />

          <TurnoverCard
            title="আনলিমিটেড ক্যাশব্যাক: সকল গেম"
            amount="৳ 25.94"
            progress={0}
            progressText="0 / 0"
            status="completed"
          />
        </TabsContent>

        {/* Active */}
        <TabsContent value="active" className="mt-4 text-neutral-400">
          কোনো একটিভ টার্নওভার নেই
        </TabsContent>
      </Tabs>
    </div>
  )
}
