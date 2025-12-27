"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Gift } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // if you use radix or ui kit
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function EWalletPage() {
  const router = useRouter();
  const currentUser = getAuthUser();
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
  };

  useEffect(() => {
    const load = async () => {
      const promoRes = await fetch("https://api.bajiraj.cloud/promos");
      const promoData = await promoRes.json();

      const payRes = await fetch("https://api.bajiraj.cloud/payment-gateways/");
      const payData = (await payRes.json()).filter((p) => p.is_active);

      setPromotions(promoData);
      setPaymentOptions(payData);

      if (payData.length) {
        setSelectedChannel(payData[0].deposit_channel);
        setSelectedPayment(payData[0].id);
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
    Number(amount) >= 200;
  const canStep3 = transactionId;

  const maskNumber = (number) => {
    if (!number || number.length < 6) return number;
    return `${number.slice(0, 3)}****${number.slice(-3)}`;
  };

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

      setSuccessModalOpen(true);
      setStep(1);
      setSenderNumber("");
      setTransactionId("");
    } finally {
      setIsLoading(false);
    }
  };
  const uniquePaymentOptions = paymentOptions.filter(
    (option, index, self) =>
      index === self.findIndex((o) => o.name === option.name)
  );

  const [phones, setPhones] = useState([]);

useEffect(() => {
  if (!currentUser) return;
  const fetchPhones = async () => {
    try {
      const res = await fetch(`https://api.bajiraj.cloud/users/phones/${currentUser.id}`);
      const data= await res.json();
      setPhones(data.map(p => p.phone));
      setSenderNumber(currentUser.phone); // default to main phone
    } catch (err) {
      console.error(err);
    }
  };
  fetchPhones();
}, [currentUser]);

  return (
    <div className="mt-14 bg-slate-900 flex justify-center p-2">
      <Card className="w-full max-w-lg rounded-2xl border bg-slate-900 border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">E-Wallet</CardTitle>
          {/* <CardDescription className="text-gray-400 text-xl">
            Fast & secure deposit
          </CardDescription> */}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="relative">
                {/* Promotion selection */}
                <div className="flex left-2 absolute text-slate-200 top-[18px] text-lg items-center gap-2">
                  <Gift />
                  <Label className="text-lg">Promotion</Label>
                </div>

                <Sheet
                  open={promotionSheetOpen}
                  onOpenChange={setPromotionSheetOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-slate-800 text-slate-200 h-16 text-lg pl-32 text-left"
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
                    className="!top-[80px] p-4 h-screen bg-slate-800  rounded-lg overflow-y-auto border-b-0"
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
                  ? "border-orange-500 bg-gray-800"
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
                      className="mt-4 w-full bg-orange-500 px-8 py-4"
                      onClick={() => setPromotionSheetOpen(false)}
                    >
                      Confirm
                    </Button>
                  </SheetContent>
                </Sheet>
              </div>
              <Label className="text-slate-200 text-lg">Payment Method</Label>
              <div className="grid grid-cols-2 gap-3">
                {uniquePaymentOptions
                  // .filter(p => p.deposit_channel === selectedChannel)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPayment(p.id);
                        setReceiverNumber(p.agent_number);
                      }}
                      className={`w-full flex items-center gap-2 py-4 px-4 rounded-lg font-medium transition 
    ${
      selectedPayment === p.id
        ? "bg-slate-800 border-2  text-white border-orange-500"
        : "bg-slate-800 text-gray-100 border-gray-300"
    } 
    border`}
                    >
                      {p.name}
                      <img src={paymentImages[p.name]} className="h-8" />
                    </button>
                  ))}
              </div>

              <Label className="text-slate-200 text-lg">Payment Method</Label>
              <div className="border-orange-400">
                <div
                  className={`w-full items-center justify-between flex gap-8 py-4 px-4 rounded-lg font-medium transition 
    border-2 border-orange-500 text-slate-100 text-lg`}
                >
               
                  Selected{" "}
                  {paymentOptions.find((p) => p.id === selectedPayment)?.name ||
                    "None"}

                       <div
                    className={`h-5 w-5 rounded-full border-2 flex-shrink-0 
               border-orange-500 bg-orange-500`}
                  />
                </div>

                
              </div>

              <Label className="mt-4 text-slate-200 text-lg">
                Deposit Channel
              </Label>
              <select
                className="w-full p-2 h-14 rounded-md bg-slate-700 text-white"
                value={selectedChannel || ""}
                onChange={(e) => setSelectedChannel(e.target.value)}
              >
                {[...new Set(paymentOptions.map((p) => p.deposit_channel))].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>

              <Button
                disabled={!canStep1}
                className="w-full h-14 text-lg mt-4 mb-[300px] bg-orange-400"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </>
          )}

          {/* STEP 2 */}
        {step === 2 && (
  <>
    <Button
      className="bg-red-500 text-slate-100"
      variant="ghost"
      onClick={() => setStep(1)}
    >
      ← Back
    </Button>

    <Label className="text-slate-200 text-lg">Your Number</Label>
    <select
      className="w-full p-2 h-14 rounded-md bg-slate-700 text-white text-lg"
      value={senderNumber || currentUser.phone} // default to main phone
      onChange={(e) => setSenderNumber(e.target.value)}
    >
      {[currentUser.phone, ...(phones || [])].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>

    <Label className="mb-1 block text-slate-200 text-lg">Receiver Number</Label>
    <div className="flex gap-2 items-center">
      <Input
        value={receiverNumber}
        readOnly
        className="bg-slate-700 h-14 text-white text-lg font-medium tracking-wider cursor-not-allowed"
      />
      <Button
        variant="outline"
        className="bg-slate-700 h-14"
        onClick={() => copyText(receiverNumber)}
        disabled={!receiverNumber}
      >
        <span className="text-lg">{copied ? "✔" : "📋"}</span>
      </Button>
    </div>

    <Label className="mb-1 block text-slate-200 text-lg">Amount (Min 200)</Label>
    <Input
      type="number"
      value={amount}
      min={200}
      onChange={(e) => setAmount(e.target.value)}
      className="mb-3 bg-slate-700 h-14 text-slate-100 text-lg"
    />

    <div className="grid grid-cols-3 gap-2 mb-3">
      {[200, 500, 1000].map((value) => (
        <Button
          key={value}
          variant="outline"
          onClick={() =>
            setAmount((prev) => (Number(prev || 0) + value).toString())
          }
        >
          +{value}
        </Button>
      ))}
    </div>

    {Number(amount) < 200 && amount !== "" && (
      <p className="text-lg text-red-500 mb-2">Minimum amount is 200</p>
    )}

    <Button
      disabled={!canStep2 || Number(amount) < 200}
      className="w-full mt-2 h-14 text-lg bg-orange-400 mb-[300px]"
      onClick={() => setStep(3)}
    >
      Next
    </Button>
  </>
)}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Button className="bg-red-500 text-slate-100" variant="ghost" onClick={() => setStep(2)}>
                ← Back
              </Button>

              <Label className="text-slate-200 text-lg">Transaction ID</Label>
              <Input
              className="text-slate-200 text-lg bg-slate-700 h-14"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />

              <Button
                disabled={!canStep3 || isLoading}
                className="w-full mt-4 h-14 bg-green-500"
                onClick={handleDeposit}
              >
                {isLoading ? "Processing..." : "Submit Deposit"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Successful</DialogTitle>
            <DialogDescription className="text-center">
              🎉 Your deposit has been submitted!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push("/")}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
