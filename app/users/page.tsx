"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { mockUsers } from "@/lib/mock-data"
import Link from "next/link"
import { Search } from "lucide-react"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({})

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFollow = (userId: string) => {
    setFollowingStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Discover Users</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <Link href={`/profile/${user.username}`}>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                      <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="flex-1 min-w-0 w-full">
                    <Link href={`/profile/${user.username}`}>
                      <h3 className="font-semibold text-foreground hover:underline truncate">{user.displayName}</h3>
                      <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                    </Link>
                    {user.occupation && user.occupation.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{user.occupation[0]}</p>
                    )}
                  </div>

                  <div className="flex gap-3 text-xs text-muted-foreground w-full justify-center">
                    <span>
                      <span className="font-semibold text-foreground">{user.followersCount.toLocaleString()}</span>{" "}
                      followers
                    </span>
                    <span>
                      <span className="font-semibold text-foreground">{user.postsCount.toLocaleString()}</span> posts
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant={followingStatus[user.id] ? "outline" : "default"}
                    onClick={() => toggleFollow(user.id)}
                    className="w-full"
                  >
                    {followingStatus[user.id] ? "Following" : "Follow"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
