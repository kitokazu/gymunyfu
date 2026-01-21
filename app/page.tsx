"use client"

import { Button } from "@/components/ui/button"
import { CreatePostModal } from "@/components/feed/create-post-modal"
import { PostCard } from "@/components/feed/post-card"
import { TrendingSidebar } from "@/components/feed/trending-sidebar"
import { FilterBar } from "@/components/feed/filter-bar"
import type { PostTag, PostCategory } from "@/lib/types"
import { useState, useMemo } from "react"
import { Pen, Loader2 } from "lucide-react"
import { usePosts } from "@/lib/hooks/use-posts"
import { useCurrentUser } from "@/lib/hooks/use-current-user"
import { createPost, deletePost } from "@/lib/services"

export default function HomePage() {
  const { user: currentUser, loading: userLoading } = useCurrentUser()
  const { posts, loading: postsLoading, likePost, refresh } = usePosts()
  const [selectedTags, setSelectedTags] = useState<PostTag[]>([])
  const [selectedCategories, setSelectedCategories] = useState<PostCategory[]>([])
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) => selectedCategories.includes(post.category))
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)))
    }

    return filtered
  }, [posts, selectedTags, selectedCategories])

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

  const handleCreatePost = async (content: string, category: PostCategory, tags: PostTag[]) => {
    if (!currentUser) return

    try {
      await createPost(currentUser, {
        content,
        category,
        tags,
      })
      setIsCreatePostOpen(false)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId)
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const isLoading = userLoading || postsLoading

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

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUser?.id}
                    onLike={likePost}
                    onDelete={handleDeletePost}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts match your filters</p>
                  <Button variant="link" onClick={handleClearFilters} className="mt-2">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Trending Sidebar */}
      <TrendingSidebar />

      {/* Create Post Modal */}
      {currentUser && (
        <CreatePostModal
          user={currentUser}
          open={isCreatePostOpen}
          onOpenChange={setIsCreatePostOpen}
          onPost={handleCreatePost}
        />
      )}
    </div>
  )
}
