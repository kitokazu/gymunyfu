import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "gymunyfu - Get Your Money Up Not Your Funny Up",
  description:
    "A finance-focused social platform where users share financial wins, investments, and money management tips",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <div className="flex min-h-[calc(100vh-4rem)]">
            <Sidebar />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          </div>
          <MobileNav />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
