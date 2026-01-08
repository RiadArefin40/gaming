"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthUser } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string | null;
  password: string;
  name: string;
  created_at: string;
  referral_code: string;
  referred_by: string | null;
  wallet: string;
  phone: string;
  role: string;
  is_block_user: boolean;
  turnover: string;
};

type Phone = {
  id: number;
  phone: string;
  is_verified: boolean;
  created_at: string;
};

type PaymentOption = {
  id: number;
  name: string;
  deposit_channel: string;
  agent_number: string;
  is_active: boolean;
};

type  paymentImages = {
    Bkash: string;
    Nagad: string;
    Upai: string;
}

export default function WithdrawPage() {
  const [user, setUser] = useState<User | null>(null);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>();
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [receiverNumber, setReceiverNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [widthraw, setWidthraw] = useState<boolean>(false);
  const [depositAlert, setDepositAlert] = useState('')
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [error, setError] = useState(false)
   const router = useRouter();
const [delay, setDelay] = useState(10)



  useEffect(() => {
  if (!successModalOpen) return;

  setIsLoading(true);
  setDelay(10);

  const interval = setInterval(() => {
    setDelay((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setIsLoading(false);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [successModalOpen]);
    const paymentImages = {
    Bkash:
      "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/bkash.png",
    Nagad:
      "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/nagad.png",
    Upai: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/upay.png",
    Rocket:"https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/rocket.png?v=1766500192641&quot"
  };
 
  useEffect(() => {
    const u = getAuthUser() as User | null;
    setUser(u);

    const loadPhones = async () => {
      if (!u) return;
      try {
        const res = await fetch(`https://api.bajiraj.cloud/users/phones/${u.id}`);
        const data: Phone[] = await res.json();
        setPhones(data);
       setSelectedPhone(data?.[0]?.phone) 
      } catch (err) {
        console.error(err);
      }
    };

    const loadPaymentOptions = async () => {
      try {
        const res = await fetch("https://api.bajiraj.cloud/payment-gateways/");
        const data: PaymentOption[] = (await res.json());
        setPaymentOptions(data);

        if (data.length) {
          setSelectedChannel(data[0].deposit_channel);
          setSelectedPayment(data[0].id);
          setReceiverNumber(data[0].agent_number);
        }
      } catch (err) {
        console.error(err);
      }
    };


        const loadWidthraw = async () => {
      if (!u) return;
      try {
        const res = await fetch(`https://api.bajiraj.cloud/payment-gateways/widthraw`);
        const data = await res.json();
         console.log("Widthraw status:", data);
        setWidthraw(data.widthraw);
      } catch (err) {
        console.error(err);
      }
    };
loadWidthraw()
    loadPhones();
    loadPaymentOptions();
  }, []);

  if (!user) return <p className="text-white text-center mt-20">Loading user...</p>;

const handleWithdraw = async () => {
  if (!user || !selectedPhone || !amount || !selectedPayment || !selectedChannel) return;

  setIsLoading(true);

  try {
    const gateway = paymentOptions.find((p) => p.id === selectedPayment);

    const res = await fetch("https://api.bajiraj.cloud/withdrawals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        amount,
        sender_number: selectedPhone,
        receiver_number: receiverNumber,
        payment_gateway: gateway?.name || "",
      }),
    });

    const data = await res.json(); // 🔥 IMPORTANT
    setDepositAlert(`Widthrawal of ${amount} Succes. Please wait 30 second to for auto approve.`);
    if (!res.ok) {
      setSuccessModalOpen(true);
      // show backend error message
      setDepositAlert(data.error || "Something went wrong");
      setError(true);
   //   alert(data.error || "Something went wrong");
      return;
    }

    // Success
   // alert(data.message || "Withdrawal request submitted successfully");

    // setAmount("");
    // setSelectedPhone("");
  } catch (err) {
    console.error(err);
    setIsLoading(false)
    setDepositAlert("Widthraw failed. Please try again.");
    // alert("Network error. Please try again.");
  } finally {
          setTimeout(() => {
            setSuccessModalOpen(true);
            setIsLoading(false);

        }, 500);
  }
};



  const uniquePaymentOptions = paymentOptions.filter(
    (option, index, self) =>
      index === self.findIndex((o) => o.name === option.name)
  );


  return (
    <div className="max-w-screen mx-auto mt-2 mb-[200px]">
      <Card className="bg-slate-900 border-0 shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Withdraw</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Payment Method */}
          <Label className="text-slate-200 text-2xl">Payment Method</Label>
          {!widthraw && (
            <p className="text-red-400">Widthraw is Disabled till morning 7AM</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {uniquePaymentOptions.map((p) => (
              <button
                key={p.id}
                disabled={!widthraw}
                onClick={() => {
                  setSelectedPayment(p.id);
                  setReceiverNumber(p.agent_number);
                  setSelectedChannel(p.deposit_channel);
                }}
                className={`w-full flex items-center gap-2 py-4 px-4 rounded-lg font-medium transition 
                ${
                  (selectedPayment === p.id && widthraw)
                    ? "bg-slate-800 border-2 text-white border-orange-500"
                    : "bg-slate-900 text-gray-100 border-gray-400"
                } border
                  ${
                  widthraw
                    ? "bg-slate-800 border-2 text-white "
                    : "bg-slate-900 text-gray-100 !border-red-400"
                } border
                
                `}
              >
                {p.name}
                <img
  src={paymentImages[p.name as keyof typeof paymentImages] || ""}
  className="h-8"
/>
              </button>
            ))}
          </div>



          {/* Phone Selection */}
          <Label className="mt-4 text-slate-200 text-lg">Your Number</Label>
          {/* <select
            className="w-full p-2 h-14 rounded-md bg-slate-700 text-white"
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
          >
            <option value="">Select number</option>
            {[user.phone, ...phones.map(p => p.phone)].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select> */}

                    <Select
            value={selectedPhone || ""}
            onValueChange={(value) => setSelectedPhone(value)}
          >
            <SelectTrigger className="!h-14 bg-slate-900 w-full  text-white rounded-md pl-4">
            
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 text-white rounded-md">
              {[...new Set(phones.map((p) => p.phone))].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Amount */}
          {/* <Label className="mt-4 text-slate-200 text-lg">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-3 bg-slate-700 h-14 text-slate-100 text-lg"
            placeholder="Enter amount"
          /> */}
<Input
  type="number"
  value={amount}
  min={100}
  max={25000}
  onChange={(e) => setAmount(e.target.value)}
  className="mb-3 bg-slate-900 h-14 text-slate-100 text-lg"
  placeholder="Enter amount"
/>

<div className="grid grid-cols-3 gap-2 mb-3 mt-3">
  {[ 500, 1000, 10000, 25000].map((value) => (
    <Button
      key={value}
      variant="outline"
      onClick={() => setAmount((prev) => {
        const current = Number(prev) || 0;
        return (current + value).toString();
      })}
    >
      +{value}
    </Button>
  ))}
</div>

{Number(amount) < 100 && amount !== "" && (
  <p className="text-lg text-red-500 mb-2">
    Minimum amount is 100
  </p>
)}
{Number(amount) > 25000 && amount !== "" && (
  <p className="text-lg text-red-500 mb-2">
    Maximum amount is 25000
  </p>
)}


          <Button
            className="w-full h-14 mt-4 bg-orange-400 text-lg"
            onClick={handleWithdraw}
            disabled={isLoading || !selectedPhone ||  Number(amount)  < 100 ||
 Number(amount) > 2500  || !selectedPayment || !selectedChannel}
          >
            {isLoading ? "Processing..." : "Submit Withdraw"}
          </Button>
        </CardContent>
      </Card>
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-8 text-center">
          
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            {!isLoading  ?(
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              {!error ? (
  <CheckCircle2 className="h-10 w-10 text-green-600" />

              ):
              (  <CheckCircle2 className="h-10 w-10 text-red-600" />)
              }
            
            </div>):null}
          </div>
      
          <DialogHeader>
            {!isLoading ?(
              
                 <DialogTitle className="text-3xl font-bold ">
                  {!error?(
                    <span className="text-green-700">  Widthraw Successful</span>
                  ) :(
                    <span className="text-red-600">  Widthraw Failed</span>
                  ) }
            
            </DialogTitle>
            ) :
            (           <DialogTitle className="text-3xl font-bold text-orange-700">
              Wait! Widthraw is Processing ...
            </DialogTitle>)}
         
      {!isLoading ?(
            <DialogDescription className="mt-2 text-gray-600">
              🎉 {depositAlert}
            </DialogDescription>)
            : null}
          </DialogHeader>
      
          {/* Loading / Footer */}
          <DialogFooter className="mt-6 flex flex-col items-center gap-4">
            {isLoading ? (
               <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-8 w-8 text-orange-700 animate-spin" />
                <span>Processing... {delay}s remaining</span>
              </div>
            ) : (
              <button
                className="w-full py-3 bg-orange-400 text-xl text-slate-100 rounded-xl"
                onClick={() => router.push("/")}
              >
                
                Home
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
