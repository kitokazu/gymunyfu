"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/types"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { postCategories, mockComments } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onSave?: (postId: string) => void
}

export function PostCard({ post, onLike, onComment, onShare, onSave }: PostCardProps) {
  const categoryInfo = postCategories.find((c) => c.value === post.category)
  const [showComments, setShowComments] = useState(false)
  const postComments = mockComments.filter((c) => c.postId === post.id)

  return (
    <article className="rounded-lg border border-border bg-card p-3 transition-colors hover:bg-card/80">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-2 flex-1 min-w-0">
          <Link href={`/profile/${post.user.username}`}>
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.displayName} />
              <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  href={`/profile/${post.user.username}`}
                  className="font-semibold text-sm text-foreground hover:underline truncate"
                >
                  {post.user.displayName}
                </Link>
                <Link
                  href={`/profile/${post.user.username}`}
                  className="text-xs text-muted-foreground hover:underline truncate"
                >
                  @{post.user.username}
                </Link>
              </div>
              <time className="text-xs text-muted-foreground" dateTime={post.createdAt.toISOString()}>
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </time>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {categoryInfo && (
                <Badge className={`${categoryInfo.color} text-white text-xs px-2 py-0.5`}>{categoryInfo.label}</Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report post</DropdownMenuItem>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <Link href={`/post/${post.id}`} className="block">
        <div className="mt-2">
          <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {/* Topic Tags */}
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = `/tag/${tag}`
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="mt-2 grid gap-2 grid-cols-2">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  className="rounded-lg w-full h-40 object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Post Actions */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-primary h-8 px-2"
            onClick={() => onLike?.(post.id)}
          >
            <Heart className={`h-3.5 w-3.5 ${post.isLiked ? "fill-primary text-primary" : ""}`} />
            <span className="text-xs">{post.likesCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-primary h-8 px-2"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="text-xs">{post.commentsCount}</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => onSave?.(post.id)}
          >
            <Bookmark className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {showComments && postComments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border space-y-3">
          {postComments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Link href={`/profile/${comment.user.username}`}>
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.displayName} />
                  <AvatarFallback>{comment.user.displayName[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="rounded-lg bg-muted p-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Link
                      href={`/profile/${comment.user.username}`}
                      className="font-semibold text-xs text-foreground hover:underline"
                    >
                      {comment.user.displayName}
                    </Link>
                    <time className="text-xs text-muted-foreground" dateTime={comment.createdAt.toISOString()}>
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </time>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                  >
                    <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-primary text-primary" : ""}`} />
                    {comment.likesCount > 0 && comment.likesCount}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
