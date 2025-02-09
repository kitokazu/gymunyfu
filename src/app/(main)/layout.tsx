import { MainSidebar } from "@/components/main-sidebar";
import { MarketSidebar } from "@/components/market-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { Metadata } from "next";
import "../globals.css";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/actions/user.action";

export const metadata: Metadata = {
  title: "GYMUNYFU",
  description: "A social platform for finance enthusiasts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const user = await currentUser();
  if (user) await syncUser(); // POST request

  return (
    <SidebarProvider>
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
              <div className="flex-1 overflow-auto">{children}</div>
            </SidebarInset>
          </div>
          <div className="hidden lg:block h-full ml-10">
            <MarketSidebar />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
