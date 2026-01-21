"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, Eye, EyeClosed, X } from "lucide-react";
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
    const res = await fetch("https://api-v2.bajiraj.cloud/auth/login", {
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

}, 3000);
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

  const [showPassword, setShowPassword] = useState(false);
const handleSignUp = async () => {
 if (!username || !phone) {
      alert("Current Password and new Password required!");
      return;
    }

    setIsLoading(true);

    try {
// const res = await fetch("https://api-v2.bajiraj.cloud/users", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "*/*",
//   },
//   body: JSON.stringify({
//     name: username,
//     phone: phone,
//     password: password,
//     referred_by: referral || null, // optional
//     wallet: 0,                     // optional default
//   }),
// });

// const data = await res.json();


//       console.log(data);

//       if (res.ok) {
//       loginUser(data.user);
//       setIsLoading(false);
//       window.location.href = "/";
//       } else {
//         alert(data.error || "Signup failed!");
//       }
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
        <h1 className="text-center mx-auto mt-2 !font-bold text-xl">Update Password</h1>
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 text-gray-100 hover:text-red-600" />
                </button>
      </header>

      {/* Background */}
      <div className="absolute " />
      <div className="text-center py-4 -my-4">
        {isVisible&&(
<img src="/oie_transparent.png" className=" mx-auto " alt="" />
        )}
      </div>
      <div className="relative z-10 px-4 pt-6 max-w-md mx-auto">
  


<div className="px-4 pt-6 max-w-md bg-white/10  rounded-md">


  {/* Phone */}
  <div className="mb-4">
    <label className="text-lg text-gray-300 mb-2 block">Current Password</label>

      <input
        type={showPassword ? "text" : "password"}
        className="w-full h-12 bg-white/10 rounded-md px-4 pr-12 text-lg placeholder-gray-400"
        placeholder="Write Password Here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-800 hover:text-gray-200"
      >
        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
      </button>

  </div>

  {/* Password */}
<div className="mb-4 relative">
      <label className="text-lg text-gray-300 mb-2 block">
       New Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="w-full h-12 bg-white/10 rounded-md px-4 pr-12 text-lg placeholder-gray-400"
        placeholder="Write Password Here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-800 hover:text-gray-200"
      >
        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
      </button>
<div className="flex font-bold  items-center text-gray-400 mt-4">
  <CheckCircle size={18}/>
     <p className="ml-1">Between 6-20 Character</p>
</div>
<div className="flex font-bold items-center text-gray-400 mt-2">
  <CheckCircle size={18}/>
     <p className="ml-1">At least one alphabet.</p>
</div>
<div className="flex font-bold items-center text-gray-400 mt-2">
  <CheckCircle size={18}/>
     <p className="ml-2">At least one number.
(Special character, symbols are allowed)</p>
</div>
   
    </div>



  {/* Sign Up Button */}
  <DotLoadingButton
    onClick={handleSignUp}
    loading={isLoadinge}
                         className="px-3 w-full mb-[20px] mt-6 w-full py-[10px] text-xl text-slate-900 bg-yellow-300/90 font-medium rounded hover:bg-orange-600"

  >
    Update
  </DotLoadingButton>
</div>


     

      </div>
    </div>
  );
}
