"use client";

import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DotLoadingButton } from "@/app/components/DotLoadingButton";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("signup");
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
    const res = await fetch("https://api.bajiraj.cloud/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ identifier: username, password: password }),
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
     window.location.href = "/";
   // window.location.reload();
 
   setTimeout(() => {
     setIsLoading(false);

}, 1000);
  } catch (err) {
    console.error("Login Error:", err);
    let errorMsg = "Unknown error";
    if (typeof err === "string") {
      errorMsg = err;
    } else if (err instanceof Error) {
      errorMsg = err.message;
    }
    setError(errorMsg);
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
const res = await fetch("https://api.bajiraj.cloud/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  body: JSON.stringify({
    name: username,
    phone: phone,
    password: password,
    referred_by: referral || null, // optional
    wallet: 0,                     // optional default
  }),
});

const data = await res.json();


      console.log(data);

      if (res.ok) {
      loginUser(data.user);
      setIsLoading(false);
      window.location.href = "/";
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

const [isVisible, setIsVisible] = useState(false);
const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
useEffect(() => {
  setIsVisible(true);
}, []);
  return (
    <div  className={`
    min-h-screen
    bg-black-800
    text-white
    relative
    overflow-hidden
    mt-[20px]
    transition-all
    duration-900
    ease-out
    ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
    }
  `}>
      {/* Header */}
     <header className="h-14 px-4 flex items-center justify-end">
        <button
                  className=" px-2 py-1 rounded-lg flex items-center justify-center px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 text-gray-100 hover:text-red-600" />
                </button>
      </header>

      {/* Background */}
      <div className="absolute " />

      <div className="relative z-10 px-4 pt-6 max-w-md mx-auto">
  


<div className="px-4 pt-6 max-w-md bg-black-600  rounded-md">
  {/* Name */}
  <div className="mb-4 ">
    <label className="text-lg text-gray-300 mb-2 block">User Name</label>
<input
  type="text"
  className="w-full h-12 bg-gray-600 rounded-md px-4 text-lg"
  placeholder="User Name Here"
  value={username}
  onChange={(e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\s+/g, ""); // remove all spaces

    setUsername(value);
  }}
/>
  </div>

  {/* Phone */}
  <div className="mb-4">
    <label className="text-lg text-gray-300 mb-2 block">Mobile Number</label>
<input
  type="text"
  maxLength={11}
  className="w-full h-12 bg-gray-600  rounded-md px-4 text-lg"
  placeholder="Write Mobile Number Here"
  value={phone}
  onChange={(e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
  }}
/>
  </div>

  {/* Password */}
  <div className="mb-4">
    <label className="text-lg text-gray-300 mb-2 block">Password</label>
    <input
      type="password"
      className="w-full h-12 bg-gray-600  rounded-md px-4 text-lg"
      placeholder="Write Password Here"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  {/* Referral (optional) */}
  <div className="mb-6">
    <label className="text-lg text-gray-300 mb-2 block">Referral</label>
    <input
      type="text"
      className="w-full h-12 bg-gray-600  rounded-md px-4 text-lg"
      placeholder="Referral Code (optional)"
      value={referral}
      onChange={(e) => setReferral(e.target.value)}
    />
  </div>

  {/* Sign Up Button */}
  <DotLoadingButton
    onClick={handleSignUp}
    loading={isLoadinge}
                         className="px-3 w-full mb-[220px] mt-6 w-full py-[8px] text-lg text-slate-900 primary-bg font-medium rounded hover:bg-orange-600"

  >
    Sign Up
  </DotLoadingButton>
</div>

     

      </div>
    </div>
  );
}
