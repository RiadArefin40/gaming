"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthUser } from "@/lib/auth";

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
      setLoading(false);
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

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="bg-slate-500 mx-auto mt-4">
          <TabsTrigger value="personal">Personal info</TabsTrigger>
          <TabsTrigger value="login">Login & Security</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        {/* PERSONAL INFO */}
        <TabsContent value="personal" className="space-y-4 mt-4 bg-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Username</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Phone</span>
            <span className="font-medium">{user.phone}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">Wallet</span>
            <span className="font-medium">{user.wallet}</span>
          </div>
        </TabsContent>

        {/* LOGIN & SECURITY */}
        <TabsContent value="login" className="space-y-4 mt-4 bg-slate-800 p-4 rounded-xl">
          <div className="space-y-3">
            <div>
              <Label className="text-lg mb-2" htmlFor="email">User Name</Label>
              <Input className="h-14 text-lg" id="email" type="email" value={user.name || ""} readOnly />
            </div>
            <div>
              <Label className="text-lg mb-2" htmlFor="password">Password</Label>
              <Input className="h-14 text-lg" id="password" type="password" value={user.password} readOnly />
            </div>
            <Button className="mt-2">Update Login Info</Button>
          </div>
        </TabsContent>

        {/* VERIFICATION */}
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
