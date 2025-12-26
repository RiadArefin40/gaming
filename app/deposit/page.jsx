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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function EWalletPage() {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const currentUser = getAuthUser();
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [amount, setAmount] = useState(null);
  const [senderNumber, setSenderNumber] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
 const router = useRouter();
  const [step, setStep] = useState(1); // 1 = payment select, 2 = sender/receiver, 3 = transaction id
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Fetch promotions and payment options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promoRes = await fetch("https://api.bajiraj.cloud/promos");
        const promoData = await promoRes.json();
        setPromotions(promoData);
        setSelectedPromotion(promoData[0]?.id || null);

        const payRes = await fetch("https://api.bajiraj.cloud/payment-gateways/");
        let payData = await payRes.json();
        payData = payData.filter((p) => p.is_active);
        setPaymentOptions(payData);
        setSelectedPayment(payData[0]?.id || null);

        // Set receiver number for initial selected payment
        if (payData[0]) setReceiverNumber(payData[0].agent_number || "");
      } catch (err) {
        console.error("Failed to fetch dynamic data:", err);
      }
    };
    fetchData();
  }, []);

  const handleProceedToSender = () => {
    const selectedGateway = paymentOptions.find((p) => p.id === selectedPayment);
    if (selectedGateway) {
      setReceiverNumber(selectedGateway.agent_number || "");
    }
    setStep(2);
  };

 const handleProceedToTransaction = () => {
  if (!senderNumber || !receiverNumber || !amount) {
    alert("Please fill all fields");
    return;
  }
  if (amount < 200) {
    alert("Deposit amount must be at least 200");
    return;
  }
  setStep(3);
};

  const handleDeposit = async () => {
    if (!currentUser) return;
    if (!transactionId) {
      alert("Please enter transaction ID");
      return;
    }

    setIsLoading(true);
    try {
      const selectedGateway = paymentOptions.find((p) => p.id === selectedPayment);
      const selectedPromo = promotions.find((p) => p.id === selectedPromotion);

      const res = await fetch("https://api.bajiraj.cloud/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount,
          sender_number: senderNumber,
          receiver_number: receiverNumber,
          payment_gateway: selectedGateway?.name,
          transaction_id: transactionId,
          promo_code: selectedPromo?.code,
        }),
      });

      const data = await res.json();


        setSuccessModalOpen(true);
        setStep(1);
        setSenderNumber("");
        setTransactionId("");

       
      
    } catch (err) {
      console.error(err);
      alert("Deposit failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-b from-slate-900 to-slate-700 flex justify-center items-start p-6">
      <Card className="w-full max-w-lg shadow-xl border border-gray-700 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">E-Wallet</CardTitle>
          <CardDescription className="text-gray-700 font-medium text-lg">
            Make your deposit securely and quickly
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          {step === 1 && (
            <>
              {/* Payment selection */}
              <Label>Payment Options</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {paymentOptions.map((pay) => (
                  <Button
                    key={pay.id}
                    variant={selectedPayment === pay.id ? "default" : "outline"}
                    className={cn("w-full text-sm font-semibold")}
                    onClick={() => setSelectedPayment(pay.id)}
                  >
                    {pay.name} ({pay.deposit_channel})
                  </Button>
                ))}
              </div>

              <Label className="mt-4">Promotion</Label>
              <Select value={selectedPromotion} onValueChange={setSelectedPromotion} className="w-full">
                <SelectTrigger  className="w-full">
                  <SelectValue placeholder="Select promotion" />
                </SelectTrigger>
                <SelectContent  className="w-full">
                  {promotions.map((promo) => (
                    <SelectItem key={promo.id} value={promo.id}>{promo.code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3 shadow-lg"
                onClick={handleProceedToSender}
              >
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Sender / Receiver block */}
              <div className="space-y-4">
                <div>
                  <Label>Your Number</Label>
                  <Input
                    placeholder="Enter your number"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Receiver Number</Label>
                  <Input
                    placeholder="Receiver number"
                    value={receiverNumber}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>

          <div>
    <Label>Deposit Amount (Min-200)</Label>
    <Input
      type="number"
      placeholder="Enter amount"
      min={200} // prevents typing below 200 in some browsers
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      className="mt-1"
    />
  </div>


                <Button
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3 shadow-lg"
                  onClick={handleProceedToTransaction}
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>Transaction ID</Label>
                  <Input
                    placeholder="Enter transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-400 text-white font-bold py-3 shadow-lg"
                  onClick={handleDeposit}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Submit Deposit"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="max-w-screen text-lg">
          <DialogHeader >
            <DialogTitle className="text-2xl">Deposit Successful </DialogTitle>
            <DialogDescription>
              <p className="text-center text-2xl mb-4">🎉 Congratulations!</p>
              Your deposit has been successfully submitted. Wait for admin approval.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() =>{ setSuccessModalOpen(false)

              router.push('/')
            }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
