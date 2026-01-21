"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Bookmark, Settings, PlusCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/lib/hooks/use-current-user"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useCurrentUser()
  const isAuthPage = ["/login", "/signup"].includes(pathname)

  if (isAuthPage) {
    return null
  }

  const navigation = [
    { name: "Feed", href: "/", icon: Home },
    { name: "Profile", href: user ? `/profile/${user.username}` : "/login", icon: User },
    { name: "Users", href: "/users", icon: Users },
    { name: "Saved", href: "/saved", icon: Bookmark },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-border">
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}

        <Button className="w-full mt-4" size="lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          New Post
        </Button>
      </nav>
    </aside>
  )
}
