"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  unread?: boolean;
};

type NotificationGroup = {
  date: string;
  items: NotificationItem[];
};

const notifications: NotificationGroup[] = [
  {
    date: "2025-12-14",
    items: [
      {
        id: "1",
        title: "Daily Login Free Spins",
        description:
          "You've received 3 free spins from ডেইলি ফ্রি স্পিন today’s login reward. Use them within 1 days.",
      },
      {
        id: "2",
        title: "ক্রিকেট ম্যাচ: ১.৫০ কোটি টাকার অফার!",
        description:
          "প্রিয় গ্রাহক, আমাদের ক্রিকেট ম্যাচ ফিচার চালু হয়েছে। আজই অংশ নিন।",
        unread: true,
      },
      {
        id: "3",
        title: "এক্সক্লুসিভ গিফট - ৮০০০ বোনাস",
        description:
          "প্রিয় গ্রাহক, উত্তোলনযোগ্য বোনাস। আমাদের নতুন সদস্যদের জন্য।",
        unread: true,
      },
    ],
  },
  {
    date: "2025-12-13",
    items: [
      {
        id: "4",
        title: "ডিপোজিট এক্সক্লুসিভ গিফট - এক্সট্রা ক্যাশ প্রাইজ",
        description:
          "প্রিয় গ্রাহক, আপনি JeetBuzz-এ আপনার গেমিং অভিজ্ঞতা উন্নত করুন।",
        unread: true,
      },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <ChevronLeft className="w-6 h-6 cursor-pointer" />
        <h1 className="text-lg font-semibold">Notifications</h1>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="pb-6">
          {notifications.map((group) => (
            <div key={group.date}>
              {/* Date */}
              <div className="px-4 pt-8 pb-4 text-xl  text-gray-100">
                {group.date}
              </div>

              <Accordion type="single" collapsible>
                {group.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-none"
                  >
                    <div className="px-4 py-4 bg-slate-700 flex gap-3">
                      {/* Left */}
                      <div className="flex-1">
                        <AccordionTrigger className="p-0 hover:no-underline">
                          <div className="text-left">
                            <h3 className="font-semibold text-sm leading-snug">
                              {item.title}
                            </h3>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pt-2 text-sm text-gray-400">
                          {item.description}
                        </AccordionContent>
                      </div>

                      {/* Right */}
                      {item.unread && (
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-400 shrink-0" />
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
