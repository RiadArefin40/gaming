"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, List, X } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
import {
  DialogFooter,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

const TransactionRecordPage = () => {
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [transactions, setTransactions] = useState<any[]>([]);
  interface AuthUser {
    username: string;
    password?: string;
    name: string;
    id: number;
    wallet: number;
  }

  const router = useRouter();

  const backToHome = () => {
    router.push("/");
    console.log("okkk");
  };
  return (
    <div className=" max-w-4xl mx-auto">
      <header className="h-16 px-4 py-2  relative bg-black-700 ">
        <button
          className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
          onClick={() => backToHome()}
        >
          <X className="w-9 h-9 mt-1 text-white/70 hover:text-red-600" />
        </button>
      </header>
      <section className="bg-black-600 text-gray-300 py-4 pb-20 px-6">
                <h1 className="text-4xl mb-4 md:text-5xl font-bold text-yellow-400 tracking-wide">
Privacy Policy
</h1>
        <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
          5. Bonuses & Promotions
        </h2>
        <div>
          <p className="text-gray-400">
            Bonuses and promotional offers are subject to specific terms and
            wagering requirements. SPCWIN reserves the right to modify or cancel
            any promotion at any time without prior notice.
          </p>
        </div>

        {/* Prohibited Activities */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            6. Prohibited Activities
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Fraud, cheating, or collusion</li>
            <li>Use of automated software or bots</li>
            <li>Money laundering or illegal activities</li>
            <li>Abusive behavior toward staff or other users</li>
          </ul>
        </div>

        {/* Suspension */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            7. Account Suspension & Termination
          </h2>
          <p className="text-gray-400">
            SPCWIN reserves the right to suspend or terminate accounts that
            violate these Terms & Conditions, without prior notice, to protect
            platform integrity and users.
          </p>
        </div>

        {/* Liability */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-400">
            SPCWIN is not responsible for losses resulting from technical
            issues, user errors, internet connectivity problems, or misuse of
            the platform.
          </p>
        </div>

        {/* Changes */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            9. Changes to Terms
          </h2>
          <p className="text-gray-400">
            SPCWIN may update these Terms & Conditions at any time. Continued
            use of the platform indicates acceptance of the updated terms.
          </p>
        </div>

        {/* Governing */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            10. Governing Use
          </h2>
          <p className="text-gray-400">
            These Terms are governed by applicable laws and regulations. Any
            disputes should be resolved through SPCWIN support channels before
            pursuing formal action.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-[#111] border border-yellow-400/20 rounded-xl p-6 mt-10">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-400">
            If you have any questions regarding these Terms & Conditions, please
            contact SPCWIN customer support through our official communication
            channels.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TransactionRecordPage;

/* ---------------- COMPONENT ---------------- */
