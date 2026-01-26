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
          fetch(`https://api.spcwin.info/deposit/${userId}`),
          fetch(`https://api.spcwin.info/withdrawals/${userId}`),
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


  const [filterOpen, setFilterOpen] = useState(false);

const [fromDate, setFromDate] = useState<string>("");
const [toDate, setToDate] = useState<string>("");

  const filteredTransactions = filterTransactionsByDate(transactions);
  const deposits = filteredTransactions.filter(t => t.type === "deposit");
  const withdrawals = filteredTransactions.filter(t => t.type === "withdraw");
const router = useRouter();
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored) as AuthUser);
  }, []);
  const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
  return (
    <div className=" max-w-4xl mx-auto">
    <header className="h-16 px-4 py-2  relative bg-black-700 ">
        <h1 className="text-center mx-auto mt-2 font-bold text-white/70 text-xl">Transaction Records</h1>
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 mt-1 text-white/70 hover:text-red-600" />
                </button>
      </header>
     <div className="flex relative flex-row bg-black-600 mt-2 py-3 px-3 mx-2  rounded-sm  justify-between sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      

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
      <Button className="text-slate-100" onClick={() => setFilterOpen(false)}>
        Apply
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
        </div>
     
      </div>

      <Tabs defaultValue="all">
        {/* <TabsList className="mb-4 bg-slate-500 mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Deposit</TabsTrigger>
          <TabsTrigger value="expense">Withdraw</TabsTrigger>
        </TabsList> */}

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
