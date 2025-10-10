"use client"

import { PostCard } from "@/components/feed/post-card"
import { TrendingSidebar } from "@/components/feed/trending-sidebar"
import { Bookmark } from "lucide-react"

export default function SavedPage() {
  // In a real app, fetch saved posts from database
  const savedPosts: any[] = []

  return (
    <div className="flex min-h-screen">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-10 p-4">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" />
            Saved Posts
          </h1>
        </div>

        <div className="p-4 space-y-4">
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No saved posts yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Save posts to read them later by clicking the bookmark icon
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Trending Sidebar */}
      <TrendingSidebar />
    </div>
  )
}
