"use client";
import { useEffect, useState } from "react";

const EWalletPage = ({ currentUser }) => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch all dynamic data from your APIs
    const fetchData = async () => {
      try {
        // Promotions
        const promoRes = await fetch("https://api.bajiraj.cloud/promos");
        const promoData = await promoRes.json();
        setPromotions(promoData);
        setSelectedPromotion(promoData[0]?.id || null);

        // Payment options
        const payRes = await fetch("https://api.bajiraj.cloud/payments");
        const payData = await payRes.json();
        setPaymentOptions(payData);
        setSelectedPayment(payData[0]?.id || null);

        // Types
        const typeRes = await fetch("https://api.bajiraj.cloud/types");
        const typeData = await typeRes.json();
        setTypes(typeData);
        setSelectedType(typeData[0]?.id || null);

        // Deposit channels
        const channelRes = await fetch("https://api.bajiraj.cloud/channels");
        const channelData = await channelRes.json();
        setChannels(channelData);
        setSelectedChannel(channelData[0]?.id || null);
      } catch (err) {
        console.error("Failed to fetch dynamic data:", err);
      }
    };

    fetchData();
  }, []);

  const handleDeposit = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const res = await fetch("https://api.bajiraj.cloud/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          promotionId: selectedPromotion,
          paymentId: selectedPayment,
          typeId: selectedType,
          channelId: selectedChannel,
        }),
      });
      const data = await res.json();
      alert(data.message || "Deposit successful");
    } catch (err) {
      console.error("Deposit error:", err);
      alert("Deposit failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold">ই-ওয়ালেট</h2>

      {/* Promotions */}
      <div>
        <label className="block mb-1 font-semibold">প্রমোশন সিলেক্ট করুন</label>
        <select
          className="w-full border rounded p-2"
          value={selectedPromotion}
          onChange={(e) => setSelectedPromotion(e.target.value)}
        >
          {promotions.map((promo) => (
            <option key={promo.id} value={promo.id}>
              {promo.name}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Options */}
      <div>
        <label className="block mb-1 font-semibold">পেমেন্ট নির্বাচন করুন</label>
        <div className="flex gap-2">
          {paymentOptions.map((pay) => (
            <button
              key={pay.id}
              className={`flex-1 border p-2 rounded ${
                selectedPayment === pay.id ? "border-orange-500 bg-orange-50" : ""
              }`}
              onClick={() => setSelectedPayment(pay.id)}
            >
              {pay.name}
            </button>
          ))}
        </div>
      </div>

      {/* Types */}
      <div>
        <label className="block mb-1 font-semibold">টাইপ নির্বাচন করুন</label>
        <select
          className="w-full border rounded p-2"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Deposit Channels */}
      <div>
        <label className="block mb-1 font-semibold">ডিপোজিট চ্যানেল</label>
        <select
          className="w-full border rounded p-2"
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
        >
          {channels.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleDeposit}
        disabled={isLoading}
        className="w-full bg-orange-500 text-white font-semibold p-3 rounded"
      >
        {isLoading ? "চালানো হচ্ছে..." : "চালিয়ে যান"}
      </button>
    </div>
  );
};

export default EWalletPage;
