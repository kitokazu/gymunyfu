"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PlusCircle, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Feed", href: "/", icon: Home },
  { name: "Users", href: "/users", icon: Users },
  { name: "Post", href: "/new-post", icon: PlusCircle },
  { name: "Profile", href: "/profile/wealthbuilder", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background lg:hidden">
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-primary")} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
