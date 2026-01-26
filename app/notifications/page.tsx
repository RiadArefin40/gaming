"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
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

    interface AuthUser {
  username: string;
  password?: string;
  name: string;
  id: number;
  wallet: number;
}
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored) as AuthUser);
  }, []);
    const backToHome = () =>{
  router.push('/')
  console.log('okkk')
}
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
  if (!user) return; // safety check

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`https://api.spcwin.info/notifications/user/${user.id}`);
      const data = await res.json();
      setUnread(data.unread_count);
      setNotifications(groupNotificationsByDate(data.notifications));
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotifications(); // fetch immediately
  const interval = setInterval(fetchNotifications, 5000); // fetch every 10s

  return () => clearInterval(interval); // cleanup on unmount
}, [user?.id]);
// useEffect(() => {
//   if (!user || typeof window === "undefined") return;

//   const fetchNotification = async () => {
//     try {
//       const res = await fetch(
//         `https://api.spcwin.info/notifications/user/${user.id}`
//       );

//       if (!res.ok) return;

//       const data = await res.json();

//       setUnread(data.unread_count);
//       setNotifications(groupNotificationsByDate(data.notifications));
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   fetchNotification();
//   const interval = setInterval(fetchNotification, 3000);

//   return () => clearInterval(interval);
// }, [user?.id]);
const markAsRead = async (id: number) => {
  await fetch(`https://api.spcwin.info/notifications/${id}/read`, {
    method: "PATCH",
  });
};

  return (
    <div className="h-screen bg-black-800 text-white flex flex-col">
      {/* Header */}
       <header className="h-14 px-4 py-2  relative bg-black-700 ">
        <h1 className="text-center mx-auto mt-2 !font-bold text-xl">Notifications</h1>
        <button
                  className=" px-2 py-1 rounded-lg absolute right-2 top-1 px-3 z-50  "
                  onClick={() => backToHome()}
                >
                  <X className="w-9 h-9 text-gray-100 hover:text-red-600" />
                </button>
      </header>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 mx-2 rounded-md">

        <div className="pb-6 mt-4">
       {notifications?.map((group) => (
  <div key={group.date}>
                        <div className="bg-yellow-300/90 -mt-2 py-2 flex justify-between px-2">
              <div className="flex-1 flex gap-1 ">
                                <img className="bg-white rounded-full p-1" src="https://img.m156b.com/mb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1768297086272&quot" alt="" />
             <span className="text-md font-bold text-gray-700">
              {new Date(group.date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
})}
            </span>

              </div>
              <div className="border border-slate-900 rounded-md px-1 text-slate-900">
                <p>GMT +8</p>
              </div>

        </div>

    <Accordion type="single" collapsible>
      {group.items.map((item) => (
        <AccordionItem onClick={() => markAsRead(item.id)} key={item.id} value={String(item.id)}>
         <div className="px-4 py-4 bg-black-600 flex gap-3"> <img className="p-[3px] bg-yellow-300/90 rounded-full h-8" src="https://img.m156b.com/mb/h5/assets/images/icon-set/icon-speaker.svg?v=1768297086272&source=mcdsrc" alt="" /> {item.unread && ( <span className="mt-1 -ml-3 h-2 w-2 rounded-full bg-orange-700 shrink-0" /> )} <div className="flex-1"> <AccordionTrigger className="p-0 hover:no-underline"> <div className="text-left"> <h3 className="font-semibold text-lg leading-snug"> {item.title} </h3> </div> </AccordionTrigger> <AccordionContent className="pt-2 text-lg text-gray-400"> {item.description} </AccordionContent> </div> {/* Right */}  </div>
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
