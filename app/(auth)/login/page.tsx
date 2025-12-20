"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DotLoadingButton } from "@/app/components/DotLoadingButton";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [isLoadinge,setIsLoading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async () => {
  setIsLoading(true);
  setError("");

  try {


    const status =   fetch('/api/status', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , "Accept": "*/*", },
       
      })
      .then(res => res.json())
      .then(data => console.log(data));

      
    const check = await status;

    // 🔥 Log full API response
    console.log("CreateToken API Response:", check);


    const response = // Instead of calling https://bs.sxvwlkohlv.com/api/v2/auth/createtoken/


      fetch('/api/auth/createtoken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: 'milon123', clientSecret: '1bRiw9JMiF9OsVbwW8chx4MwX0VwC0mKp' })
      })
      .then(res => res.json())
      .then(data => console.log(data));



    const data = await response;

    // 🔥 Log full API response
    console.log("CreateToken API Response:", data);

    // if (!response.ok || !data) {
    //   throw new Error("Invalid credentials");
    // }

    // Optional: store token if returned
    // localStorage.setItem("token", data.token);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  } catch (err) {
    console.error("Login Error:", err);

    setTimeout(() => {
      setIsLoading(false);
      setError("ভুল ইউজারনেম বা পাসওয়ার্ড");
    }, 1000);
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
          <>
            <div className="mb-4">
              <label className="text-xs text-gray-300 mb-2 block">
                ব্যবহারকারীর নাম
              </label>
              <input
                className="w-full h-12 bg-gray-700/60 rounded-md px-4 text-sm"
                placeholder="আপনার ইউজার নেম লিখুন"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-300 mb-2 block">
                মুদ্রা বেছে নিন
              </label>
              <div className="flex items-center justify-between h-12 bg-gray-700/60 rounded-md px-4">
                <span>BDT</span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs text-gray-300 mb-2 block">
                মোবাইল নম্বর
              </label>
              <input
                className="w-full h-12 bg-gray-700/60 rounded-md px-4"
                placeholder="+880 ---------"
              />
            </div>

            <button className="w-full h-12 bg-orange-700 rounded-md">
              চালিয়ে যান
            </button>
          </>
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
