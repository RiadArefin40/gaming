"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthUser } from "@/lib/auth";
import { Eye, EyeOff, Plus } from "lucide-react";
import { format } from "date-fns";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

/* ================= TYPES ================= */
type Phone = {
  id: number;
  phone: string;
  is_verified: boolean;
  created_at: string;
};

type User = {
  id: number;
  email: string | null;
  password: string;
  name: string;
  created_at: string;
  referral_code: string;
  referred_by: string | null;
  wallet: string;
  phone: string;
  role: string;
  is_block_user: boolean;
  turnover: string;
};

/* ================= COMPONENT ================= */
export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [newPhone, setNewPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddPhone = async () => {
    if (!newPhone) return;
    setLoading(true);
    try {
       await addPhone(); // pass newPhone to parent function
      setNewPhone("");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
    //  setLoading(false);
    }
  };

useEffect(() => {
  const u = getAuthUser() as User | null; // cast to your User type
  setUser(u);
  if (u) fetchPhones(u.id);
}, []);



  const fetchPhones = async (userId: number) => {
    try {
      const res = await fetch(`https://api.bajiraj.cloud/users/phones/${userId}`);
      const data: Phone[] = await res.json();
      setPhones(data);
    } catch (error) {
      console.error("Failed to fetch phones", error);
    }
  };

  const addPhone = async (): Promise<void> => {
    if (!newPhone.trim() || !user) return;

    setLoading(true);
    try {
      const res = await fetch("https://api.bajiraj.cloud/users/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, phone: newPhone.trim() }),
      });

      const data: { message?: string; error?: string } = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }

      setNewPhone("");
      fetchPhones(user.id);
    } catch (err) {
      console.error(err);
    } finally {
    //  setLoading(false);
    }
  };

  const verifyPhone = async (phone: string) => {
    if (!user) return;
    try {
      const res = await fetch("https://api.bajiraj.cloud/users/phone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, phone }),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }
      fetchPhones(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePhone = async (phone: string) => {
    if (!user) return;
    try {
      const res = await fetch("https://api.bajiraj.cloud/users/phone", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, phone }),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }
      fetchPhones(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Loading user...</p>; // Early return until user is loaded

  return (
    <div className="max-w-screen mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <Tabs defaultValue="personal" className="space-y-4 p-1">
        <TabsList className="bg-slate-500 max-w-screen mx-auto mt-4 p-1">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="login">Login & Security</TabsTrigger>
          {/* <TabsTrigger value="verification">Verification</TabsTrigger> */}
        </TabsList>

        {/* PERSONAL INFO */}
        <TabsContent value="personal" className="space-y-4 mt-4 bg-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-center bg-slate-900 p-3 rounded-lg">
            <span className="text-gray-300">Username</span>
            <span className="font-medium">{user.name}</span>
          </div>
            <div className="flex justify-between items-center bg-slate-900 p-3 px-4 rounded-lg">
            <p className="text-gray-300">Registration Date</p>
            <p className="font-medium">{  format(new Date( user.created_at), "PPpp")}</p>
          </div>
        
          {/* <div className="flex justify-between items-center">
            <p>    <span className="text-gray-300">Phone</span> <span className="bg-yellow-300 text-bold rounded-full px-2 py-1">Primary</span></p>
        
           <span className="font-medium">{phones?.[0].phone} &gt;</span>
              <p className={`text-lg ${phones?.[0].is_verified ? "text-green-400" : "text-orange-400"}`}>
                    {phones?.[0].is_verified ? "Verified" : "Not verified"}
                  </p>

          </div> */}
                    <div className="space-y-3 mt-3">
      <div className="space-y-3 mt-3 bg-slate-900 p-2 rounded-lg">
      {/* Add Phone Button */}
      <div className="flex items-center justify-between mx-2">

           <p>Add New Number</p>
      <Button className="bg-green-500 !w-12 ml-2" onClick={() => setDialogOpen(true)}><Plus size={25} /></Button>

      </div>
   
      {/* Phones List */}
      {phones.map((p, i) => (
        <div
          key={p.id}
          className="flex items-center justify-between bg-slate-800 p-3 rounded-lg"
        >
          <div>
            <p className="font-medium">
              {i === 0 && (
                <span className="text-xs bg-green-500 rounded-lg text-white p-1 mr-2">
                  Primary
                </span>
              )}
              Number: {p.phone}
            </p>
            <p className={`text-lg ${p.is_verified ? "text-green-400" : "text-orange-400"}`}>
              {p.is_verified ? "Verified" : "Not verified"}
            </p>
          </div>
          <div className="flex gap-2">
            {!p.is_verified && (
              <Button className="!bg-slate-800" size="sm" onClick={() => verifyPhone(p.phone)}>
                Verify
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Add Phone Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-slate-700">
          <DialogHeader>
            <DialogTitle>Add New Phone</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="bg-slate-800 !h-12"
              placeholder="Enter phone number"
            />
          </div>

          <DialogFooter>
            <Button className="!bg-orange-500" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPhone} disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
                    
        

          </div>

          {/* <div className="flex justify-between items-center">
            <span className="text-gray-300">Mobile</span>
            <span className="font-medium">{user.phone}</span>
          </div> */}
        </TabsContent>

        {/* LOGIN & SECURITY */}
        <TabsContent value="login" className="space-y-4 mt-4 bg-slate-800 p-4 rounded-xl">
          <div className="space-y-3">
            <div>
              <Label className="text-lg mb-2" htmlFor="email">User Name</Label>
              <Input className="h-14 text-lg" id="email" type="email" value={user.name || ""} readOnly />
            </div>
            <div>
    <div className="relative">
      <Label className="text-lg mb-2" htmlFor="password">
        Password
      </Label>
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        value={user.password}
        readOnly
        className="h-14 text-lg pr-12" // add padding for the eye icon
      />
      <button
        type="button"
        className="absolute right-3 top-[54px] text-gray-400 hover:text-gray-200"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
            </div>
            <Button className="mt-2">Update Login Info</Button>
          </div>
        </TabsContent>


        <TabsContent value="verification" className="space-y-4 mt-4 bg-slate-800 p-4 rounded-xl">
          <div className="flex gap-2">
            <Input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Enter phone number"
            />
            <Button onClick={addPhone} disabled={loading}>Add</Button>
          </div>

          <div className="space-y-3 mt-3">
            {phones.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-slate-900 p-3 rounded-lg">
                <div>
                  <p className="font-medium">{p.phone}</p>
                  <p className={`text-lg ${p.is_verified ? "text-green-400" : "text-orange-400"}`}>
                    {p.is_verified ? "Verified" : "Not verified"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!p.is_verified && (
                    <>
                      <Button size="sm" onClick={() => verifyPhone(p.phone)}>Verify</Button>
                      {/* <Button size="sm" variant="destructive" onClick={() => deletePhone(p.phone)}>Delete</Button> */}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
