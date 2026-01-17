"use client";

import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
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

const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  setIsVisible(true);
}, []);
  return (
    <div     className={`
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
      {/* Header */}
  
      <header className="h-14 px-4 py-2  relative bg-black-700 ">
        <h1 className="text-center mx-auto mt-2 font-bold text-xl">Login</h1>
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 text-gray-100 hover:text-red-600" />
                </button>
      </header>

      {/* Background */}
      <div className="absolute bg-slate-900" />

      <div className="text-center py-4">
        <span className="text-yellow-300 text-5xl  ">Jili</span> <span className="text-5xl">Win</span>
      </div>

      <div className="relative z-10 px-4 pt-6 max-w-md bg-black-600 m-4 rounded-md">
        {/* Tabs */}
  



        {/* LOGIN */}

          <>
            <div className="mb-4 ">
              <label className="text-lg text-gray-300 mb-2 block">
                User Name
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="w-full h-12 bg-gray-600 rounded-md px-4 text-lg"
                placeholder="User Name"
              />
            </div>

            <div className="mb-2">
              <label className="text-lg text-gray-300 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-gray-600 rounded-md px-4 text-lg"
                placeholder="******"
              />
            </div>

            {error && (
              <p className="text-red-500 text-lg mb-4">{error}</p>
            )}
   <DotLoadingButton
   onClick = {handleLogin}
                loading={isLoadinge}
                      className="px-3 w-full text-slate-900 mb-[20px] mt-6 w-full py-[8px] text-lg primary-bg font-medium rounded hover:bg-orange-600"
              >
                Log in
              </DotLoadingButton>
     
          </>
    
      </div>
      <div className="text-center text-slate-300 my-2">
<p><span>Don't have a account?</span> <span onClick={() => router.push("/registration")} className="text-yellow-300" >Sign Up</span></p>

</div>
    </div>
  );
}
