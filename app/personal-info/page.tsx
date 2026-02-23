"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Plus, BadgeCheck, X } from "lucide-react";
import { getAuthUser } from "@/lib/auth";

/* ================= TYPES ================= */
type Phone = {
  id: number;
  phone: string;
  is_verified: boolean;
};

type User = {
  id: number;
  name: string;
  email: string | null;
  password: string;
  created_at: string;
  full_name: any;
  dob:any
};

/* ================= COMPONENT ================= */
export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [newPhone, setNewPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [fullName, setFullName] = useState("");
const [dob, setDob] = useState("");
const [claiming, setClaiming] = useState(false);
const [vipPoints, setVipPoints] = useState(0);



  /* ================= DATA ================= */
  useEffect(() => {
    const u = getAuthUser() as User | null;
    setUser(u);
    if (u) fetchPhones(u.id);
  }, []);

  const fetchPhones = async (userId: number) => {
    const res = await fetch(
      `https://api.spcwin.info/users/phones/${userId}`
    );
    const data = await res.json();
    setPhones(data);
  };


const [bets, setBets] = useState<any[]>([]);
  /* 📡 Fetch user bets */
useEffect(() => {
  if (!user) return;

  fetch(`https://api.spcwin.info/users/user-total-vip/${user.id}`)
    .then((res) => res.json())
    .then((data) => {
      setBets(data.total_vip_points || 0);
      setVipPoints(data.total_vip_points || 0);
      console.log("user", data); // ✅ correct
    })
    .catch(console.error);
}, [user]);

const handleClaimVip = async () => {
  if (!user) return;

  if (vipPoints < 1000) {
    alert("Minimum 1000 VIP points required");
    return;
  }

  try {
    setClaiming(true);

    const res = await fetch("https://api.spcwin.info/users/claim-vip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: user.name }),
    });

    const data = await res.json();

    if (data.success) {
      alert(`Successfully claimed ${data.claimed} balance`);
      
      // refresh VIP
      setVipPoints(data.remainingPoints || 0);
    } else {
      alert(data.message || "Claim failed");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setClaiming(false);
  }
};

 
const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
  const addPhone = async () => {
    if (!newPhone || !user) return;
    setLoading(true);

    await fetch("https://api.spcwin.info/users/phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        phone: newPhone.trim(),
      }),
    });

    setNewPhone("");
    setDialogOpen(false);
    fetchPhones(user.id);
    setLoading(false);
  };
const [otp, setOtp] = useState("")
const [otpModal, setOtpModal] = useState(false)
const [verifyPhoneN, setVeriPhoneN]= useState("")
const [wpotp, setwpotp] = useState("")
const [verifying, setVerifying] = useState(false);
const handleVerify = async (phone: string)=>{
  // setLoading(true)

setOtpModal(true);

  setVeriPhoneN(phone);
      setTimeout(() => {

     sendOtp(phone);
    // close dialog after success
  }, 100);

    // setLoading(false)

}
const sendOtp = async (phone:any) => {
  const res = await fetch("/apis/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: `88${phone}`,
      otpBody: "2344",   // the OTP text in the body
      otpButton: "2342", // text in the button
    }),
  });

  const result = await res.json();
  setwpotp(result.bodyOtp)
  console.log(result);
};



const handleSaveProfile = async () => {
  if (!user) {
    console.error("User is not loaded");
    return;
  }

  try {
    // Determine which field to update
    const payload =
      fullName && !user.full_name
        ? { full_name: fullName }
        : dob && !user.dob
        ? { dob }
        : null;

    if (!payload) {
      console.warn("Nothing to update");
      return;
    }

    const res = await fetch(`https://api.spcwin.info/users/${user.id}/set-once`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Profile updated!");
      // optionally refresh user state
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};





const submitOtp =async () => {
  


if(otp == wpotp){
  setVerifying(true);
    setTimeout(() => {
    setVerifying(false);
    setOtpModal(false);
    verifyPhone(verifyPhoneN)
    // close dialog after success
  }, 400);
}
else{
   alert('NN!matched')
}

};
  const verifyPhone = async (phone: string) => {
    if (!user) return;
    await fetch("https://api.spcwin.info/users/phone/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, phone }),
    });
    fetchPhones(user.id);
  };

  if (!user) return <p className="p-6">Loading profile...</p>;

  /* ================= UI ================= */
  return (
    <div className="max-w-md mx-auto  space-y-4 text-white">

      {/* ===== HEADER ===== */}
                   <header className="h-14 px-4 py-2  relative bg-black-700 ">
                  <h1 className="text-center mx-auto mt-2 text-slate-200 font-bold text-xl">My Profile</h1>
                  <button
                            className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-2 z-50  "
                            onClick={() => backToHome()}
                          >
                            <X className="w-9 h-9 text-gray-100 hover:text-red-600" />
                          </button>
                </header>
      <div className="bg-black-800 p-5 text-center space-y-2">
       <div>
        <img className="w-[50%] mx-auto -mt-2" src="https://img.m156b.com/mb/h5/assets/images/vip/login/ranking1.png?v=1768297086272&source=mcdsrc" alt="" />
       </div>
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-xs text-gray-400">
          Registered: {format(new Date(user.created_at), "yyyy/MM/dd")}
        </p>
      </div>

      {/* ===== VIP POINTS ===== */}
<div className="bg-black-600 m-2 rounded-lg p-4 space-y-3">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-lg font-bold text-gray-200">VIP Points (VP)</p>
      <p className="text-2xl font-bold text-yellow-400">
        {vipPoints}
      </p>
    </div>

    <Button
      onClick={handleClaimVip}
      disabled={claiming || vipPoints < 1000}
      className={`${
        vipPoints >= 1000
          ? "bg-yellow-400 text-black"
          : "bg-gray-600 text-gray-400 cursor-not-allowed"
      }`}
    >
      {claiming
        ? "Claiming..."
        : vipPoints >= 1000
        ? `Claim ${Math.floor(vipPoints / 1000)}`
        : "Need 1000+"}
    </Button>
  </div>

  <p className="text-xs text-gray-400">
    1000 VIP Points = 1 Balance
  </p>
</div>


      {/* ===== TABS ===== */}
      <Tabs defaultValue="personal">
        {/* <TabsList className="w-full bg-black-600">
          <TabsTrigger value="personal" className="flex-1">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1">
            Login & Security
          </TabsTrigger>
        </TabsList> */}

        {/* ===== PERSONAL INFO ===== */}
        <TabsContent value="personal" className="space-y-3  m-2 mb-32 rounded-md">
 
        <div className=" bg-black-600 rounded-md">
          <div className="py-5 px-4 -mt-2  ">
            <div className="flex gap-4 items-center">
              <img className="bg-yellow-300/90 p-[1px] rounded-full" src="https://1betjili.com/assets/images/icon-set/theme-icon/icon-info.svg" alt="" />
          {/* Full Name */}
    <p className="font-bold text-lg text-gray-200">Full Name</p>
    {user.full_name ? (
      <p className="font-bold text-gray-400">{user.full_name}</p>
    ) : (
      <input
        type="text"
        placeholder="Enter full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="bg-gray-700 text-white rounded-md px-2 py-1 mt-1"
      />
    )}
            </div>

          </div>
    <div className="py-5 px-4 -mt-2  border-t border-slate-500">
               <div className="flex gap-4 items-center">
              <img className="bg-yellow-300/90 p-[1px] rounded-full" src="https://1betjili.com/assets/images/icon-set/theme-icon/icon-birthday.svg" alt="" />
     <div>


    {/* DOB */}
    <p className="font-bold text-lg text-gray-200 mt-2">Date of Birth</p>
    {user.dob ? (
      <p className="font-bold text-gray-400">{user.dob}</p>
    ) : (
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="bg-gray-700 text-white rounded-md px-2 py-1 mt-1"
      />
    )}

    {/* Optional: Save Button if either is unset */}
    {!user.full_name || !user.dob ? (
      <button
        onClick={handleSaveProfile}
        className="mt-2 ml-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-md font-bold"
      >
        Save
      </button>
    ) : null}
  </div>
            </div>
            <div className="flex gap-4 items-center">



</div>


            

          </div>
              <div className="py-5 px-4 -mt-2  border-t border-slate-500">
               <div className="flex gap-4 items-center justify-between">
              <img className="bg-yellow-300/90 p-[1px] rounded-full" src="https://1betjili.com/assets/images/icon-set/theme-icon/icon-phone.svg" alt="" />
              <div className="w-full">
                         <p className=" font-bold text-lg text-gray-200 mb-2">Phone Numbers</p>
                         <div className="w-full">
                               {phones.map((p, i) => (
              <div
                key={p.id}
                className="flex mb-2 w-full justify-between items-center bg-neutral-800 rounded-lg p-3"
              >
                <div className="w-full">
                  <p className="font-medium">
                    {i === 0 && (
                      <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded mr-2">
                        Primary
                      </span>
                    )}
                    {p.phone}
                  </p>
                  <p
                    className={`text-sm ${
                      p.is_verified
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  >
                    {p.is_verified ? "Verified" : "Not verified"}
                  </p>
                </div>

                {!p.is_verified && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-slate-800"
                    disabled={loading}
                    onClick={() => handleVerify(p.phone)} 
                  >
                    Verify
                  </Button>
                )}
              </div>
            ))}

                         </div>
      
              </div>
            </div>
                   <div onClick={() => setDialogOpen(true)} className="flex mx-4 ml-12 mt-2 border  border-yellow-300/90 rounded-xl  text-slate-200 py-1 px-6  justify-between items-center">
              <p className="font-medium">Add Phone Numbers</p>
              <Button className="bg-transparent text-slate-100" size="icon" >
                <Plus size={26} />
              </Button>
            </div>

            

          </div>
 
        </div>

   


                    {/* <div>
            <Label>Username</Label>
            <Input readOnly value={user.name} />
          </div> */}

          {/* <div className="relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              readOnly
              value={user.password}
              className="pr-10"
            />
            <button
              className="absolute right-3 top-9 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div> */}
{/* 
          <Button className="w-full">Update Login Info</Button> */}
        </TabsContent>

        {/* ===== SECURITY ===== */}
        <TabsContent value="security" className="space-y-4 mt-4">

        </TabsContent>
      </Tabs>

      {/* ===== ADD PHONE DIALOG ===== */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent   className="
        bg-black-600
    fixed top-20 left-0 right-0
    translate-x-0 translate-y-0
    rounded-t-2xl
   
    mx-2
  ">
          <DialogHeader>
            <DialogTitle>Add Phone Number</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Enter phone number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" className="!text-slate-800" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="!text-slate-200" onClick={addPhone} disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

            <Dialog open={otpModal} onOpenChange={setOtpModal}>
        <DialogContent   className="
        bg-black-600
    fixed top-20 left-0 right-0
    translate-x-0 translate-y-0
    rounded-t-2xl
   
    mx-2
  ">
          <DialogHeader>
            <DialogTitle>Send Otp</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Enter phone number"
            value={verifyPhoneN}
            disabled
            // onChange={(e) => setNewPhone(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" className="!text-slate-800" onClick={() => setOtpModal(false)}>
             Submit
            </Button>
            <Button className="!text-slate-200" onClick={addPhone} disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={otpModal} onOpenChange={setOtpModal}>
  <DialogContent
    className="
      bg-black-600
      fixed top-20 left-0 right-0
      translate-x-0 translate-y-0
      rounded-t-2xl
      mx-2
    "
  >
    <DialogHeader>
      <DialogTitle>Verify OTP</DialogTitle>
    </DialogHeader>

    <Input
      placeholder="Phone number"
      value={verifyPhoneN}
      disabled
    />

    {/* OTP INPUT */}
    <div className="mt-4">
      <p className="text-sm text-gray-400 text-center mb-2">
        Enter 6-digit OTP
      </p>
      

   <div className="flex justify-center gap-2 mt-4">
  {[...Array(4)].map((_, i) => (
    <input
      key={i}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={otp[i] || ""}
      onChange={(e) => {
        const val = e.target.value;
        if (!val) return;

        const newOtp = otp.split("");
        newOtp[i] = val;
        setOtp(newOtp.join(""));

        // auto focus next
        const next = e.target.nextSibling as HTMLInputElement;
        if (next) next.focus();
      }}
      className="
        w-10 h-12 text-center text-lg
        rounded-md border
        bg-black/40 text-white
        focus:outline-none focus:ring-2 focus:ring-yellow-500
      "
    />
  ))}
</div>

    </div>

    {/* WAITING UI */}
    {verifying && (
      <p className="text-center text-yellow-400 mt-4 animate-pulse">
        Verifying OTP, please wait...
      </p>
    )}

    <DialogFooter className="mt-4">
      <Button
        variant="outline"
        className="!text-slate-800"
        onClick={() => {
          
          setOtp("")
          setVerifying(false);
          setOtpModal(false)


        }}
        disabled={verifying}
      >
        Cancel
      </Button>


           <button
        disabled={loading || !wpotp}
          onClick={submitOtp}
 
        className={`px-4 py-2 rounded-md ${
          loading || !wpotp
            ? "!text-slate-200 bg-gray-500 cursor-not-allowed"
            : "!text-slate-800 bg-yellow-300/90"
        }`}
      >
        {loading ? "Loading..." : wpotp ? "Submit OTP" : "Waiting..."}
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-black-600 rounded-lg p-3 flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
