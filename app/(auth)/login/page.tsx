"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { loginUser, getAuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DotLoadingButton } from "@/app/components/DotLoadingButton";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [isLoadinge,setIsLoading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [currency, setCurrency] = useState("BDT");



const handleLogin = async () => {
  setIsLoading(true);
  setError("");

  try {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ name: username, password: password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // API returned an error (like 400 or 401)
      setError(data.error || "ভুল ইউজারনেম বা পাসওয়ার্ড");
      setIsLoading(false);
      return; // Stop execution
    }

    // ✅ Successful login
    loginUser(data.user);
    setIsLoading(false);
    router.push("/");
  } catch (err) {
    console.error("Login Error:", err);
    setError("ভুল ইউজারনেম বা পাসওয়ার্ড");
    setIsLoading(false);
  }
};


const handleSignUp = async () => {
 if (!username || !phone) {
      alert("Name and Phone are required!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          name: username,
          phone,
          referred_by: referral || null,
          // you may also include default email/password for testing
          email: '',
          password: password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Signup successful!");

        setReferral("");
      } else {
        alert(data.error || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-700 text-white relative overflow-hidden mt-[80px]">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-bold text-lg">Jeet</span>
          <span className="text-orange-500 font-bold text-lg">Buzz</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-sm">🏠</span>
        </div>
      </header>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-black to-black" />

      <div className="relative z-10 px-4 pt-6 max-w-md mx-auto">
        {/* Tabs */}
        <div className="flex gap-8 text-sm mb-6">
          <button
            onClick={() => setTab("login")}
            className={`relative pb-2 ${
              tab === "login" ? "text-white" : "text-gray-400"
            }`}
          >
            লগইন
            {tab === "login" && (
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500" />
            )}
          </button>

          <button
            onClick={() => setTab("signup")}
            className={`relative pb-2 ${
              tab === "signup" ? "text-white" : "text-gray-400"
            }`}
          >
            সাইন আপ
            {tab === "signup" && (
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500" />
            )}
          </button>
        </div>

        {/* SIGNUP (UI only for now) */}
        {tab === "signup" && (
         <div>
      <div className="mb-4">
        <label className="text-xs text-gray-300 mb-2 block">ব্যবহারকারীর নাম</label>
        <input
          className="w-full h-12 bg-gray-700/60 rounded-md px-4 text-sm"
          placeholder="আপনার ইউজার নেম লিখুন"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="text-xs text-gray-300 mb-2 block">মোবাইল নম্বর</label>
        <input
          className="w-full h-12 bg-gray-700/60 rounded-md px-4"
          placeholder="+880 ---------"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="text-xs text-gray-300 mb-2 block">Reffaral</label>
        <input
          className="w-full h-12 bg-gray-700/60 rounded-md px-4"
          placeholder="Referral Code"
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
        />
      </div>

      <DotLoadingButton
        onClick={handleSignUp}
        loading={isLoadinge}
        className="max-w-screen w-[80%] mx-auto left-12 h-11 absolute top-[460px] bg-orange-400 hover:bg-orange-600"
      >
        Sign Up
      </DotLoadingButton>
    </div>
        )}

        {/* LOGIN */}
        {tab === "login" && (
          <>
            <div className="mb-4">
              <label className="text-xs text-gray-300 mb-2 block">
                ব্যবহারকারীর নাম
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 bg-gray-700/60 rounded-md px-4 text-sm"
                placeholder="admin"
              />
            </div>

            <div className="mb-2">
              <label className="text-xs text-gray-300 mb-2 block">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-gray-700/60 rounded-md px-4 text-sm"
                placeholder="123456"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-4">{error}</p>
            )}
   <DotLoadingButton
   onClick = {handleLogin}
                loading={isLoadinge}
                className="max-w-screen w-[80%] mx-auto left-12  h-11 absolute top-[300px] bg-orange-400 hover:bg-orange-600"
              >
                Log in
              </DotLoadingButton>
     
          </>
        )}
      </div>
    </div>
  );
}
