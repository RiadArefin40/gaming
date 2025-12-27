"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { getAuthUser } from "@/lib/auth";
type ApiNotification = {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  unread: boolean;
};

type NotificationGroup = {
  date: string;
  items: NotificationItem[];
};


import { useState,useEffect } from "react";



export default function NotificationsPage() {

    const user = getAuthUser();
    
const [unreadCount, setUnread] = useState<number>(0);
const [notifications, setNotifications] = useState<NotificationGroup[]>([]);
function groupNotificationsByDate(data: ApiNotification[]): NotificationGroup[] {
  const groups: Record<string, NotificationItem[]> = {};

  data.forEach((item) => {
    const date = new Date(item.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push({
      id: item.id,
      title: item.title,
      description: item.message,
      unread: !item.is_read,
    });
  });

  return Object.entries(groups).map(([date, items]) => ({
    date,
    items,
  }));
}

useEffect(() => {
  if (!user || typeof window === "undefined") return;

  const fetchNotification = async () => {
    try {
      const res = await fetch(
        `https://api.bajiraj.cloud/notifications/user/${user.id}`
      );

      if (!res.ok) return;

      const data = await res.json();

      setUnread(data.unread_count);
      setNotifications(groupNotificationsByDate(data.notifications));
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  fetchNotification();
  const interval = setInterval(fetchNotification, 500);

  return () => clearInterval(interval);
}, []);
const markAsRead = async (id: number) => {
  await fetch(`https://api.bajiraj.cloud/notifications/${id}/read`, {
    method: "PATCH",
  });
};

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
       {notifications?.map((group) => (
  <div key={group.date}>
    <div className="px-4 pt-8 pb-4 text-xl text-gray-100">
      {group.date}
    </div>

    <Accordion type="single" collapsible>
      {group.items.map((item) => (
        <AccordionItem onClick={() => markAsRead(item.id)} key={item.id} value={String(item.id)}>
         <div className="px-4 py-4 bg-slate-700 flex gap-3"> {/* Left */} <div className="flex-1"> <AccordionTrigger className="p-0 hover:no-underline"> <div className="text-left"> <h3 className="font-semibold text-lg leading-snug"> {item.title} </h3> </div> </AccordionTrigger> <AccordionContent className="pt-2 text-lg text-gray-400"> {item.description} </AccordionContent> </div> {/* Right */} {item.unread && ( <span className="mt-1 h-2 w-2 rounded-full bg-orange-400 shrink-0" /> )} </div>
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
