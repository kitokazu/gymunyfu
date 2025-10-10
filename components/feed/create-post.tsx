"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { User, PostTag, PostCategory } from "@/lib/types"
import { ImageIcon, Tag } from "lucide-react"
import { postTags, postCategories } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface CreatePostProps {
  user: User
  onPost?: (content: string, category: PostCategory, tags: PostTag[]) => void
}

export function CreatePost({ user, onPost }: CreatePostProps) {
  const [content, setContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null)
  const [selectedTags, setSelectedTags] = useState<PostTag[]>([])
  const [showTagSelector, setShowTagSelector] = useState(false)

  const handlePost = () => {
    if (content.trim() && selectedCategory) {
      onPost?.(content, selectedCategory, selectedTags)
      setContent("")
      setSelectedCategory(null)
      setSelectedTags([])
      setShowTagSelector(false)
    }
  }

  const toggleTag = (tag: PostTag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Share your financial wins, questions, or advice..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
            />

            {/* Category Selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Category</p>
              <div className="flex flex-wrap gap-2">
                {postCategories.map((category) => (
                  <Badge
                    key={category.value}
                    className={`cursor-pointer ${
                      selectedCategory === category.value
                        ? `${category.color} text-white hover:opacity-90`
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => {
                  const tagInfo = postTags.find((t) => t.value === tag)
                  return (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => toggleTag(tag)}>
                      #{tagInfo?.label}
                    </Badge>
                  )
                })}
              </div>
            )}

            {/* Tag Selector */}
            {showTagSelector && (
              <div className="rounded-lg border border-border bg-muted/50 p-3">
                <p className="text-sm font-medium mb-2 text-foreground">Select topic tags</p>
                <div className="flex flex-wrap gap-2">
                  {postTags.map((tag) => (
                    <Badge
                      key={tag.value}
                      variant={selectedTags.includes(tag.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.value)}
                    >
                      #{tag.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => setShowTagSelector(!showTagSelector)}
                >
                  <Tag className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handlePost} disabled={!content.trim() || !selectedCategory} size="sm">
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
