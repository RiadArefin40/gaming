"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bell,
  User,
  ShieldCheck,
  Lock,
  FileText,
  Wallet,
  TrendingUp,
  Crown,
  EyeOff,
  RefreshCcw,
  ChevronRight,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-800 text-white flex justify-center">
      <div className="w-full max-w-md px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-lg font-bold">
            I
          </div>
          <div>
            <p className="font-semibold">likhon4040</p>
            <p className="text-lg ">
              Sign up date : 2025-12-12
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1 bg-slate-500 text-slate-200 hover:bg-zinc-700"
          >
            Withdrawal
          </Button>
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
            Deposit
          </Button>
        </div>

        {/* Wallet Card */}
        <Card className="bg-gradient-to-r from-slate-500 to-slate-900 text-slate-100 font-medium border-none">
          <CardContent className="p-4 space-y-4">

            <div className="flex items-center justify-between">
              <p className="text-lg ">Main wallet</p>
              <div className="flex gap-2">
                <EyeOff className="h-4 w-4 " />
                <RefreshCcw className="h-4 w-4 " />
              </div>
            </div>

            <div className="text-xl font-bold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-500" />
              0
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
              <div>
                <p className="text-lg ">VIP Points</p>
                <p className="flex items-center gap-2 font-medium">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  0
                </p>
              </div>

              <div className="flex items-center gap-2 text-lg bg-zinc-700 px-3 py-1 rounded-full">
                Normal
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Menu */}
        <div className="space-y-1">
          <MenuItem icon={Bell} label="Notifications" badge="8" />
          <MenuItem icon={User} label="Personal info" />
          <MenuItem icon={Lock} label="Login & Security" />
          <MenuItem icon={ShieldCheck} label="Verification" />
          <MenuItem icon={FileText} label="Transaction records" />
          <MenuItem icon={TrendingUp} label="Betting records" />
          <MenuItem icon={Wallet} label="Turnover" />
          <MenuItem icon={Crown} label="My VIP" />
        </div>

      </div>
    </div>
  )
}

/* ---------------- Menu Item ---------------- */

function MenuItem({
  icon: Icon,
  label,
  badge,
}: {
  icon: any
  label: string
  badge?: string
}) {
  return (
    <button className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-zinc-800 transition">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 " />
        <span className="text-lg">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-lg bg-red-500 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 " />
      </div>
    </button>
  )
}
