"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

export default function EWalletPage() {
  const router = useRouter();
  const currentUser = getAuthUser();

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

  const paymentImages = {
    Bkash: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/bkash.png",
    Nagad: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/nagad.png",
    Upai: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/payment-type/for-dark/upay.png",
  };

  useEffect(() => {
    const load = async () => {
      const promoRes = await fetch("https://api.bajiraj.cloud/promos");
      const promoData = await promoRes.json();

      const payRes = await fetch("https://api.bajiraj.cloud/payment-gateways/");
      const payData = (await payRes.json()).filter(p => p.is_active);

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

  const canStep3 = transactionId;

  const handleDeposit = async () => {
    if (!canStep3) return;

    setIsLoading(true);
    try {
      const gateway = paymentOptions.find(p => p.id === selectedPayment);
      const promo = promotions.find(p => p.id === selectedPromotion);

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
  const maskNumber = (number) => {
  if (!number || number.length < 6) return number;
  return `${number.slice(0, 3)}****${number.slice(-3)}`;
};
const canStep2 =
  selectedPayment &&
  receiverNumber &&
  senderNumber.trim().length >= 6 &&
  amount &&
  Number(amount) >= 200;




  return (
    <div className="min-h-screen mt-24 bg-gradient-to-b from-slate-900 to-slate-700 flex justify-center p-6">
      <Card className="w-full max-w-lg rounded-2xl border border-gray-700 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">E-Wallet</CardTitle>
          <CardDescription className="text-gray-400 text-xl">
            Fast & secure deposit
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-3">
                {paymentOptions
                  .filter(p => p.deposit_channel === selectedChannel)
                  .map(p => (
                    <Button
                      key={p.id}
                      variant={selectedPayment === p.id ? "default" : "outline"}
                      className="flex items-center gap-2 py-4"
                      onClick={() => {
                        setSelectedPayment(p.id);
                        setReceiverNumber(p.agent_number);
                      }}
                    >
                      <img classNamepy="py-4" src={paymentImages[p.name]} className="h-8" />
                      <span>{p.name}</span>
                    </Button>
                  ))}
              </div>

              <Label className="mt-4">Deposit Channel</Label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set(paymentOptions.map(p => p.deposit_channel))].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className="mt-4">Promotion</Label>
              <Select value={selectedPromotion} onValueChange={setSelectedPromotion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select promotion" />
                </SelectTrigger>
                <SelectContent>
                  {promotions.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button disabled={!canStep1} className="w-full mt-4" onClick={() => setStep(2)}>
                Continue
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>

              <Label>Your Number</Label>
              <Input value={senderNumber} onChange={e => setSenderNumber(e.target.value)} />

          <Label className="mb-1 block">Receiver Number</Label>

<div className="flex gap-2 items-center">
  <Input
    value={maskNumber(receiverNumber)}
    disabled
    className="bg-gray-100 font-medium tracking-wider"
  />

  <Button
    variant="outline"
    onClick={() => copyText(receiverNumber)}
    disabled={!receiverNumber}
  >
    {copied ? "✔" : "📋"}
  </Button>
</div>


<Label className="mb-1 block">Amount (Min 200)</Label>

<Input
  type="number"
  value={amount}
  min={200}
  onChange={(e) => setAmount(e.target.value)}
  className="mb-3"
/>

{/* Quick Amount Buttons */}
<div className="grid grid-cols-3 gap-2 mb-3">
  {[200, 500, 1000].map((value) => (
    <Button
      key={value}
      variant="outline"
      onClick={() =>
        setAmount(prev => Number(prev || 0) + value)
      }
    >
      +{value}
    </Button>
  ))}
</div>

{/* Validation message */}
{amount < 200 && amount !== "" && (
  <p className="text-xs text-red-500 mb-2">
    Minimum amount is 200
  </p>
)}

<Button
  disabled={!canStep2 || Number(amount) < 200}
  className="w-full mt-2"
  onClick={() => setStep(3)}
>
  Next
</Button>

            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>

              <Label>Transaction ID</Label>
              <Input value={transactionId} onChange={e => setTransactionId(e.target.value)} />

              <Button
                disabled={!canStep3 || isLoading}
                className="w-full mt-4 bg-green-500"
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
