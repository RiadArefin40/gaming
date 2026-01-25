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
        <div className="max-w-5xl mx-auto">
          <p>
            You can manage or disable cookies through your browser settings, but
            some features may not function properly.
          </p>
        </div>

        {/* Data Security */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-400">
            We implement appropriate technical and organizational security
            measures to protect your personal data against unauthorized access,
            loss, or misuse. However, no online system can be 100% secure.
          </p>
        </div>

        {/* Sharing Info */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            5. Sharing of Information
          </h2>
          <p className="text-gray-400 mb-3">
            We do not sell or rent your personal information. Your data may only
            be shared with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Trusted service providers required to operate the platform</li>
            <li>Payment processors for transaction handling</li>
            <li>Authorities if required by law or legal process</li>
          </ul>
        </div>

        {/* User Rights */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            6. Your Rights
          </h2>
          <p className="text-gray-400">
            You have the right to access, update, or request deletion of your
            personal information. For any privacy-related requests, please
            contact our support team.
          </p>
        </div>

        {/* Responsible Gaming */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            7. Responsible Gaming & Age Restriction
          </h2>
          <p className="text-gray-400">
            SPCWIN services are intended for users aged 18 or above. We do not
            knowingly collect information from minors. We promote responsible
            gaming and encourage users to play within their limits.
          </p>
        </div>

        {/* Policy Updates */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-400">
            SPCWIN may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and continued use of the platform
            indicates acceptance of the updated policy.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-[#111] border border-yellow-400/20 rounded-xl p-6 mt-10">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-400">
            If you have any questions about this Privacy Policy or how your data
            is handled, please contact SPCWIN customer support through our
            official channels.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TransactionRecordPage;

/* ---------------- COMPONENT ---------------- */
