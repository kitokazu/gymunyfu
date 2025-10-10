"use client"

import { Button } from "@/components/ui/button"
import { CreatePostModal } from "@/components/feed/create-post-modal"
import { PostCard } from "@/components/feed/post-card"
import { TrendingSidebar } from "@/components/feed/trending-sidebar"
import { FilterBar } from "@/components/feed/filter-bar"
import { mockUsers, mockPosts } from "@/lib/mock-data"
import type { PostTag, PostCategory } from "@/lib/types"
import { useState, useMemo } from "react"
import { Pen } from "lucide-react"

export default function HomePage() {
  const currentUser = mockUsers[0]
  const [posts, setPosts] = useState(mockPosts)
  const [selectedTags, setSelectedTags] = useState<PostTag[]>([])
  const [selectedCategories, setSelectedCategories] = useState<PostCategory[]>([])
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const followerPosts = useMemo(() => {
    return posts
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = followerPosts

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) => selectedCategories.includes(post.category))
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)))
    }

    return filtered
  }, [followerPosts, selectedTags, selectedCategories])

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post,
      ),
    )
  }

  const handleTagToggle = (tag: PostTag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleCategoryToggle = (category: PostCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setSelectedCategories([])
  }

  return (
    <div className="flex min-h-screen pb-20 lg:pb-0">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-10 p-4">
          <h1 className="text-xl font-bold text-foreground mb-3">Following Feed</h1>
          <FilterBar
            selectedTags={selectedTags}
            selectedCategories={selectedCategories}
            onTagToggle={handleTagToggle}
            onCategoryToggle={handleCategoryToggle}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="p-4 space-y-4">
          <Button onClick={() => setIsCreatePostOpen(true)} className="w-full" size="lg">
            <Pen className="h-4 w-4 mr-2" />
            New Post
          </Button>

          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard key={post.id} post={post} onLike={handleLike} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts match your filters</p>
                <Button variant="link" onClick={handleClearFilters} className="mt-2">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trending Sidebar */}
      <TrendingSidebar />

      {/* Create Post Modal */}
      <CreatePostModal user={currentUser} open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen} />
    </div>
  )
}
