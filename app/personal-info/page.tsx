"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const [phone, setPhone] = useState("+880 1717807159");

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <Tabs defaultValue="personal" className="space-y-4 ">
        <TabsList className="bg-slate-500 mx-auto mt-4">
          <TabsTrigger value="personal">Personal info</TabsTrigger>
          <TabsTrigger value="login">Login & Security</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4 mt-4 bg-slate-800 p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Username</span>
            <span className="font-medium">likhon4040</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">Full legal name</span>
            <Button  className="px-2 bg-slate-600 text-gray-300">Manage</Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">Date of birth</span>
            <Button  className="px-2 bg-slate-600 text-gray-300">Manage</Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">Phone</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{phone}</span>
              <span className="text-orange-500 text-lg">!</span>
              <Button  className="px-2 bg-slate-600 text-gray-300">Manage</Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">Email</span>
            <Button  className="px-2 bg-slate-600 text-gray-300">Manage</Button>
          </div>
        </TabsContent>

        {/* Login & Security Tab */}
        <TabsContent value="login" className="space-y-4 mt-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter new password" />
            </div>
            <Button className="mt-2">Update Login Info</Button>
          </div>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-4 mt-4">
          <p className="text-gray-300">Verification status and options will appear here.</p>
          <Button>Start Verification</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
