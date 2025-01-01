import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainSidebar } from "@/components/main-sidebar";
import { MarketSidebar } from "@/components/market-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GYMUNYFU",
  description: "A social platform for finance enthusiasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-[100vh] w-[100vw]">
      <body
        className={`${inter.className} h-[100vh] w-[100vw] overflow-hidden`}
      >
        {/* <SidebarProvider>
          <div className="h-[100vh] w-[100vw] flex justify-center">
            <div className="w-full flex">
              <MainSidebar />
              <div className="flex-1 flex min-w-0 h-full">
                <SidebarInset className="flex-1 flex flex-col h-full overflow-hidden">
                  <header className="flex h-14 items-center gap-4 border-b px-4 bg-background z-10 shrink-0">
                    <SidebarTrigger />
                    <div className="flex-1">
                      <h1 className="text-lg font-semibold">
                        GET YOUR MONEY UP NOT YOUR FUNNY UP
                      </h1>
                    </div>
                  </header>
                
                </SidebarInset>
              </div>
              <div className="hidden lg:block h-full ml-10">
                <MarketSidebar />
              </div>
            </div>
          </div>
        </SidebarProvider> */}
        <div className="flex-1 overflow-auto">{children}</div>
      </body>
    </html>
  );
}
