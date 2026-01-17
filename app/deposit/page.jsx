"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // if you use radix or ui kit
import { Button } from "@/components/ui/button";
import Withdraw from "../components/Withdraw"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { X } from "lucide-react";

// const user = (() => {
//   const stored = localStorage.getItem("auth_user");
//   return stored ? JSON.parse(stored)  : null;
// })();

export default function EWalletPage() {
  const router = useRouter();

  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // const currentUser = (() => {
  //   const stored = localStorage.getItem("auth_user");
  //   return stored ? JSON.parse(stored)  : null;
  // })();
  // const currentUser = getAuthUser();
  const [promotionSheetOpen, setPromotionSheetOpen] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [senderNumber, setSenderNumber] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promoSheetOpen, setPromoSheetOpen] = useState(false);

  const paymentImages = {
    Bkash:
      "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/bkash.png",
    Nagad:
      "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/nagad.png",
    Upai: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/upay.png",
    Rocket:
      "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/rocket.png?v=1766500192641&quot",
  };
  const [infoModal, setInfoModal] = useState(false);
  useEffect(() => {
    const load = async () => {
      const promoRes = await fetch("https://api.bajiraj.cloud/promos");
      const promoData = await promoRes.json();

      const payRes = await fetch("https://api.bajiraj.cloud/payment-gateways/");
      const payData = await payRes.json();

      setPromotions(promoData);

      let defaultPromo = promoData.find((p) => p.promo_type == "default");

      setSelectedPromotion(defaultPromo.id || 9);
      setPaymentOptions(payData);

      if (payData.length) {
        const activePayData = payData.filter((p) => p.is_active);
        setSelectedChannel(activePayData[0]?.deposit_channel);
        const activePayment = payData.find((item) => item.is_active === true);

        if (activePayment) {
          setSelectedPayment(activePayment.id);
        }

        setReceiverNumber(payData[0].agent_number);
      }
    };

    load();
  }, []);

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const canStep1 = selectedPayment && selectedChannel;
  const canStep2 =
    selectedPayment &&
    receiverNumber &&
    senderNumber.trim().length >= 6 &&
    amount &&
    Number(amount) >= 100;
  const canStep3 = transactionId;

  const maskNumber = (number) => {
    if (!number || number.length < 6) return number;
    return `${number.slice(0, 3)}****${number.slice(-3)}`;
  };
  const [depositAlert, setDepositAlert] = useState("");
  const handleDeposit = async () => {
    if (!canStep3) return;

    setIsLoading(true);
    try {
      const gateway = paymentOptions.find((p) => p.id === selectedPayment);
      const promo = promotions.find((p) => p.id === selectedPromotion);

      await fetch("https://api.bajiraj.cloud/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount,
          sender_number: senderNumber,
          receiver_number: receiverNumber,
          payment_gateway: gateway?.name,
          transaction_id: transactionId,
          promo_code: promo?.code,
        }),
      });

      setDepositAlert(
        `Deposit of ${amount} Succes. Please wait 30 second to for auto approve.`,
      );
      // setStep(1);
      setSenderNumber("");
      setTransactionId("");
    } catch (error) {
      console.error("Deposit failed:", error);

      setDepositAlert("Deposit failed. Please try again.");
    } finally {
      setTimeout(() => {
        setSuccessModalOpen(true);
        setIsLoading(false);
      }, 500);
    }
  };
const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchPhones = async () => {
      try {
        const res = await fetch(
          `https://api.bajiraj.cloud/users/phones/${currentUser.id}`,
        );
        const data = await res.json();
        setPhones(data.map((p) => p.phone));
        // senderNumber(data?.[0] || '');
        console.log("num", data?.[0]?.phone);
        setSenderNumber(data?.[0]?.phone); // default to main phone
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhones();
  }, [currentUser]);

  const uniquePaymentOptions = Object.values(
    paymentOptions.reduce((acc, curr) => {
      if (!acc[curr.name]) {
        acc[curr.name] = curr; // just keep one for UI
      }
      return acc;
    }, {}),
  );
  console.log("Unique Payment Options:", uniquePaymentOptions);

  const handlePaymentSelect = (paymentName) => {
    if (!selectedChannel) return;

    const matched = paymentOptions.find(
      (p) =>
        p.name == paymentName &&
        p.deposit_channel.toLowerCase().trim() ==
          selectedChannel.toLowerCase().trim() &&
        p.is_active,
    );

    if (!matched) {
      alert("This payment method is not available for selected channel");
      return;
    }

    setSelectedPayment(matched.id);
    setReceiverNumber(matched.agent_number);
  };

  useEffect(() => {
    if (selectedPayment) {
      setSelectedPayment(null);
      setReceiverNumber("");
    }
  }, [selectedChannel]);

  const [delay, setDelay] = useState(10);
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
  const [tab, setTab] = useState("deposit");
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  setIsVisible(true);
}, []);

  return (
    <div className={`
    min-h-screen
    bg-black-800
    text-white
    relative
    overflow-hidden
    mt-[0px]
    transform-gpu
    transition-all
    duration-900
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-full"
    }
  `}>
    
      <Card className="w-full max-w-screen rounded-2xl border bg-black-800 border-0 shadow-xl py-0">
              <header className="h-14 px-4 py-2  relative bg-black-700 ">
            <h1 className="text-center mx-auto mt-2 text-slate-200 font-bold text-xl">My wallet</h1>
            <button
                      className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-2 z-50  "
                      onClick={() => backToHome()}
                    >
                      <X className="w-9 h-9 text-gray-100 hover:text-red-600" />
                    </button>
          </header>
        <Tabs value={tab} onValueChange={setTab} className={" bg-black-700 -mt-6  "}>
          {/* Tabs Header */}
          <div className="pt-6 pb-4">

                      <TabsList className="grid grid-cols-2 mb-8  bg-white/20 rounded-sm mb-6 h-11 w-[94%] mx-3 -mt-5">
            <TabsTrigger
              value="deposit"
              className="data-[state=active]:bg-yellow-300 text-slate-200 data-[state=active]:text-slate-800 h-9 !data-[state=active]:rounded-sm"
            >
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
 className="data-[state=active]:bg-yellow-300 text-slate-200 data-[state=active]:text-slate-800 h-9"
            >
              Withdraw
            </TabsTrigger>
          </TabsList>

          </div>


           {tab === "deposit" && (

                    <CardContent className="space-y-3 px-2 bg-black-800 -mt-8">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="relative bg-black-600 mt-1">
                {/* Promotion selection */}
                <div className="flex left-2  absolute text-slate-200 top-[18px] text-lg items-center !rounded-md gap-2">
              
                  <Label className="text-lg text-lg border-l-4 border-yellow-400 pl-4 bg-black-600 mb-4 ">Promotion</Label>
                </div>

                <Sheet
                  open={promotionSheetOpen}
                  onOpenChange={setPromotionSheetOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-slate-200 bg-black-600 border-0 !rounded-md h-16 text-md pl-34 text-left rounded-md"
                    >
                      {selectedPromotion
                        ? (() => {
                            const code =
                              promotions.find((p) => p.id === selectedPromotion)
                                ?.code || "";
                            return code.length > 20
                              ? code.slice(0, 20) + "…"
                              : code;
                          })()
                        : "Select promotion"}
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="top"
                    className="!top-[60px] p-4 h-screen bg-black-700  rounded-lg overflow-y-auto border-b-0"
                  >
                    <VisuallyHidden>
                      <DialogTitle>Mobile Menu</DialogTitle>
                    </VisuallyHidden>
                    <h3 className="text-xl text-white mb-4">
                      Select Promotion
                    </h3>

                    <div className="flex flex-col gap-3">
                      {promotions.map((promo) => {
                        const isSelected = selectedPromotion === promo.id;
                        return (
                          <div
                            key={promo.id}
                            onClick={() => setSelectedPromotion(promo.id)}
                            className={`
              p-3 border rounded-lg cursor-pointer flex justify-between items-center
              ${
                isSelected
                  ? "border-yellow-500 bg-gray-800"
                  : "border-gray-700 hover:border-orange-500"
              }
            `}
                          >
                            <div>
                              <p className="text-white font-semibold">
                                {promo.name || promo.code}
                              </p>
                              <p className="text-gray-400 text-lg">
                                {promo.description}
                              </p>
                            </div>
                            {/* Optional: keep the radio visual */}
                            <div
                              className={`h-5 w-5 rounded-full border-2 flex-shrink-0 
                ${
                  isSelected
                    ? "border-orange-500 bg-orange-500"
                    : "border-gray-400"
                } `}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <Button
                      className="mt-4 w-full text-2xl bg-yellow-300 font-bold text-slate-900 px-8 py-8"
                      onClick={() => setPromotionSheetOpen(false)}
                    >
                      Confirm
                    </Button>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="bg-black-600 p-2  -mt-1 rounded-md pt-3">
                <Label className="text-slate-200 text-lg border-l-4 border-yellow-400 pl-4 bg-black-600 mb-1">
                  Payment Method
                </Label>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  {uniquePaymentOptions.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => handlePaymentSelect(p.name)}
                      // disabled={p.is_active === false}
                      className={`w-full flex flex-col justify-center relative items-center gap-2 py-[10px] px-2 rounded-lg font-medium transition 
        ${
          selectedPayment &&
          p.name == paymentOptions.find((x) => x.id == selectedPayment)?.name
            ? "bg-select  border-1 text-white border-yellow-400"
            : "bg-unselect border-0 text-gray-100 border-gray-300"
        } 
        border
        ${!p.is_active ? "opacity-50 cursor-not-allowed !bg-yellow-200" : "hover:border-yellow-400"}
  
        `}
                    >
                       <img src={paymentImages[p.name]} className="h-[29px]  rounded-md" />
                      {p.name} {p.is_active}
                     <div class="absolute top-[10px] -right-[8px] rounded-sm inline-block bg-red-500 text-white font-bold px-[10px] py-[1px] text-sm">
  +5%
  <span class="absolute left-0 top-0 w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[8px] border-l-red-500"></span>
</div>

                    </button>
                  ))}
                </div>

                <div className="border-yellow-400">
                <div className="mt-4 w-full border-t-1 border-dashed border-slate-300 mt-6 mb-6" />


                  <div
                    className={`w-[170px] items-center justify-between flex gap-8 py-1 bg-select px-2 rounded-lg font-medium transition 
    border-1 border-yellow-400 text-slate-100 text-lg mb-4`}
                  >
                    <div className="text-center">
                      {/* <img
                        src={
                          paymentImages[
                            paymentOptions.find((p) => p.id === selectedPayment)
                              ?.name
                          ]
                        }
                        className="h-8"
                      /> */}
                     
                      <span className="text-center !text-sm !font-medium ml-6">  {paymentOptions.find((p) => p.id === selectedPayment)
                        ?.name || "None"} Payment</span>
                    
                    </div>

                 
                  </div>
                </div>
              </div>

         
              {/* <Select
          className="h-14"
  value={selectedChannel || ""}
  onValueChange={(value) => setSelectedChannel(value)}
>
  <SelectTrigger className="!h-14 !bg-slate-800 w-full  text-white rounded-md pl-10">
  
    <SelectValue placeholder="Select channel" />
  </SelectTrigger>
  <SelectContent className="bg-slate-800 text-white rounded-md">
    {[...new Set(paymentOptions.map((p) => p.deposit_channel))].map((c) => (
      <SelectItem key={c} value={c}>
        {c}
      </SelectItem>
    ))}
  </SelectContent>
</Select> */}
<div className="bg-black-600 rounded-sm p-2 pb-4 -mt-1">
     <Label className="-mt-1 text-lg border-l-4 border-yellow-400 pl-4 text-slate-200 mb-1">
                Deposit Channel
              </Label>
  <ToggleGroup
  type="single"
  value={selectedChannel}
  onValueChange={(value) => {
    if (value) setSelectedChannel(value)
  }}
  className="flex gap-3 py-2"
>
  {[...new Set(
    paymentOptions
      .filter((p) => p.is_active)
      .map((p) => p.deposit_channel)
  )].map((c) => (
    <ToggleGroupItem
      key={c}
      value={c}
      className="
        h-[38px] flex-1 w-[180px] !rounded-lg border
        bg-white/10 text-slate-300 border-transparent
        transition-all duration-200
        data-[state=on]:bg-yellow-500/30 
        data-[state=on]:text-white
        data-[state=on]:border-yellow-400
      "
    >
      {c}
    </ToggleGroupItem>
  ))}
</ToggleGroup>

</div>
<div className="bg-black-600 p-5 rounded-sm  -mt-1">
          <Label className="mb-1  block text-slate-200 text-lg text-lg border-l-4 border-yellow-400 pl-4 !text-slate-200 mb-2">
            <div className="flex justify-between">
    <p> Deposit Amount </p> <p>৳ 200 - ৳ 30,000</p>
            </div>
        
              
              </Label>
    

              <div className="grid grid-cols-4 gap-2 mb-3">
                {[500, 1000, 2000, 5000, 10000, 25000].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    className={"bg-white/10 !text-slate-200 text-md !h-[44px] !rounded-lg !font-bold border-0"}
                    onClick={() =>
                      setAmount((prev) =>
                        (Number(prev || 0) + value).toString(),
                      )
                    }
                  >
                    {value}
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
                        <Input
                type="number"
                value={amount}
                min={100}
                max={25000}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-3 bg-white/10 border-0 h-14 text-slate-100 text-2xl font-bold"
              />
</div>

<Accordion
  type="single"
  collapsible
   defaultValue="deposit-info"
  className="w-full rounded-md border border-0 bg-black-600"
>
  <AccordionItem value="deposit-info" className="border-b border-slate-700">
    <AccordionTrigger className="px-4 py-3 text-left text-white hover:no-underline">
      ডিপোজিট সংক্রান্ত গুরুত্বপূর্ণ তথ্য
    </AccordionTrigger>

    <AccordionContent className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">
       <div className="mt w-full border-t-1 border-dashed border-slate-300  my-3" />
      <p className="space-y-2">
        ১. ক্যাশ আউট বা সেন্ডমানি করার আগে ‘ব্যক্তিগত তথ্য’ অংশে সর্বোচ্চ ৩টি মোবাইল
        নম্বর যোগ করে ভেরিফাই করুন।
        <br /><br />
        ২. আপনার ডিপোজিট প্রক্রিয়াটি আরও দ্রুত সফল করতে সঠিক ক্যাশ আউট নাম্বার,
        এমাউন্ট এবং ট্রানজেকশন আইডি সহ সাবমিট করুন।
        <br /><br />
        ৩. যেকোনো ডিপোজিট করার আগে সবসময় আমাদের ডিপোজিট পেইজে নাম্বার চেক করুন।
        <br /><br />
        ৪. ডিপোজিট পেন্ডিং থাকা অবস্থায় আপনি সর্বোচ্চ ২টি ডিপোজিট ট্রাই করতে পারবেন।
        কোনো সমস্যা হলে অনুগ্রহ করে লাইভচ্যাটের মাধ্যমে সহায়তা নিন।
        <br /><br />
        ৫. বাজির ODDs অবশ্যই ১.৩০-এর ওপরে হতে হবে। এর নিচের অডসে রাখা বাজি উইথড্র
        টার্নওভারের জন্য গণনা করা হবে না।
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>





              <Button
                disabled={!canStep1}
                className="w-full h-14 text-2xl mt-4 mb-[300px] bg-yellow-300 text-slate-900"
                onClick={() => {
                  setInfoModal(true);
                  setStep(2);
                }}
              >
               Next
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-black-600 p-5 mt-14 rounded-md">
              <button
                onClick={() => setStep(1)}
                className="
    fixed top-[128px] left-2 z-50
    h-10 w-10 rounded-full
    bg-yellow-400 text-white
    flex items-center justify-center
    
    hover:bg-red-600 hover:scale-110
    active:scale-95
    transition-all duration-200
    select-none
    border-0
  "
                aria-label="Go Back"
              >
                <ArrowLeft size={22} strokeWidth={2.5} />
              </button>

              <Label className="text-slate-200 text-lg mb-2">Your Number</Label>
              {/* <select
      className="w-full p-2 h-14 rounded-md bg-white/10 text-white text-lg"
      value={senderNumber || currentUser.phone} // default to main phone
      onChange={(e) => setSenderNumber(e.target.value)}
    >
      {[currentUser.phone, ...(phones || [])].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select> */}

              <Select
                className="h-14 w-full"
                value={senderNumber}
                onValueChange={(value) => setSenderNumber(value)}
              >
                <SelectTrigger className="!h-14 !bg-white/10 w-full text-white rounded-md pl-3 border-0">
                  <SelectValue placeholder="Select channel or phone" />
                </SelectTrigger>

                <SelectContent className="bg-white/10 text-white rounded-md">
                  {/* Payment channels */}
                  {/* {[...new Set(paymentOptions.map((p) => p.deposit_channel))].map((c) => (
      <SelectItem key={c} value={c}>
        {c}
      </SelectItem>
    ))} */}

                  {/* User phones */}
                  {[...(phones || [])].map((num) => (
                    <SelectItem key={num} value={num}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className="mb-1 block text-slate-200 text-lg my-2">
                Receiver Number
              </Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={receiverNumber}
                  readOnly
                  className="bg-white/10 border-0 h-14 text-white text-lg font-medium tracking-wider cursor-not-allowed"
                />
                <Button
                  variant="outline"
                  className="bg-white/10 h-14"
                  onClick={() => copyText(receiverNumber)}
                  disabled={!receiverNumber}
                >
                  <span className="text-xl text-slate-100">
                    {copied ? "✔" : "Copy"}
                  </span>
                </Button>
              </div>

      

              <Button
                disabled={
                  !canStep2 || Number(amount) < 100 || Number(amount) > 25000
                }
                className="w-full mt-2 h-14 my-4 text-2xl font-bold bg-yellow-300 text-slate-800 "
                onClick={() => setStep(3)}
              >
                Next
              </Button>

              {/* <div className="border-3 border-red-500 rounded-xl p-2 bg-slate-300 mb-[150px]">
                <h2 className="text-2xl font-bold text-green-700">
                  🎉 ডিপোজিট সংক্রান্ত তথ্য
                </h2>
                <p>
                  {" "}
                  আমাদের সাইটে দেখানো নামবারে টাকা পাঠাবেন, এই নামবার কেউ সেভ
                  করে রাখবেননা। আমাদের নামবার পরিবর্তনশীল |
                </p>
              </div> */}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="bg-black-600 p-5  mt-14 rounded-md">
              <button
                onClick={() => setStep(1)}
                className="
    fixed top-[128px] left-2 z-50
    h-10 w-10 rounded-full
    bg-yellow-400 text-white
    flex items-center justify-center

    hover:bg-red-600 hover:scale-110
    active:scale-95
    transition-all duration-200
    select-none
  "
                aria-label="Go Back"
              >
                <ArrowLeft size={22} strokeWidth={2.5} />
              </button>

              <Label className="text-slate-200 text-lg">Transaction ID</Label>
              <Input
                className="text-slate-200 text-2xl font-bold border-0 text-lg bg-white/10 mt-2 h-14"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />

              <Button
                disabled={!canStep3 || isLoading}
                className="w-full mt-4 h-16 bg-yellow-300 text-slate-800 text-2xl  to-pink-500"
                onClick={handleDeposit}
              >
                {isLoading ? "Processing..." : "Submit Deposit"}
              </Button>
            </div>
          )}
        </CardContent>
           )}

               {tab === "withdraw" && (

                <Withdraw/>
               )}
        </Tabs>


      </Card>

      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            {!isLoading ? (
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            ) : null}
          </div>

          <DialogHeader>
            {!isLoading ? (
              <DialogTitle className="text-3xl font-bold text-green-700">
                Deposit Successful
              </DialogTitle>
            ) : (
              <DialogTitle className="text-3xl font-bold text-orange-700">
                Wait! Deposit is Processing ...
              </DialogTitle>
            )}

            {!isLoading ? (
              <DialogDescription className="mt-2 text-gray-600">
                🎉 {depositAlert}
              </DialogDescription>
            ) : null}
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
