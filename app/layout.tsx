import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import MobileAppBar from "./components/MobileAppBar";
import MobileFooter from "./components/MobileFooter";
import AuthModal from "./components/AuthModal";
import VerificationModal from "./components/VerificationModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bajiraj – Online Gaming & Entertainment",
  description:
    "Bajiraj is a secure online gaming and entertainment platform offering slots, live casino, jackpots, and responsible gaming.",

  // Canonical URL
  alternates: {
    canonical: "https://bajiraj.com",
  },

  // Open Graph (social preview)
  openGraph: {
    title: "Bajiraj – Online Gaming & Entertainment",
    description:
      "Bajiraj is a secure online gaming and entertainment platform offering slots, live casino, jackpots, and responsible gaming.",
    url: "https://bajiraj.com",
    siteName: "Bajiraj",
    type: "website",
    images: [
      {
        url: "https://www.bajiraj.com/oie_transparent.png",
        width: 1200,
        height: 630,
        alt: "Bajiraj Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Bajiraj – Online Gaming & Entertainment",
    description:
      "Bajiraj is a secure online gaming and entertainment platform offering slots, live casino, jackpots, and responsible gaming.",
    images: ["https://www.bajiraj.com/oie_transparent.png"],
  },

  // iOS Safari / Apple status bar
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-800`}>
        <SidebarProvider>
          <div className="flex h-full w-full">
            <AppSidebar />
            <main className="flex-1">
              <MobileAppBar />
              {children}
              <AuthModal />
              <VerificationModal />
              <MobileFooter />
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
