"use client";

import { Button } from "@/components/ui/button";
import type { Post, Comment, User } from "@/lib/types";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { CommentSection } from "./comment-section";
import { useRouter } from "next/navigation";
import { ProfileIconComponent } from "@/components/ui/profile-icon";

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  currentUser: User;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string) => void;
}

export function PostDetail({
  post,
  comments,
  currentUser,
  onLike,
  onComment,
  onLikeComment,
  onShare,
  onSave,
}: PostDetailProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Post */}
      <article className="rounded-lg border border-border bg-card p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex gap-3 flex-1 min-w-0">
            <Link href={`/profile/${post.user.username}`}>
              <ProfileIconComponent icon={post.user.profileIcon} size="lg" />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/profile/${post.user.username}`}
                className="font-semibold text-foreground hover:underline"
              >
                {post.user.displayName}
              </Link>
              <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                <Link
                  href={`/profile/${post.user.username}`}
                  className="hover:underline"
                >
                  @{post.user.username}
                </Link>
                <span>·</span>
                <time dateTime={post.createdAt.toISOString()}>
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </time>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report post</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="space-y-4">
          <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="grid gap-2 grid-cols-2">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  className="rounded-lg w-full h-64 object-cover"
                />
              ))}
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-y border-border py-3">
            <span>
              <strong className="text-foreground">
                {post.likesCount.toLocaleString()}
              </strong>{" "}
              likes
            </span>
            <span>
              <strong className="text-foreground">
                {post.commentsCount.toLocaleString()}
              </strong>{" "}
              comments
            </span>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={() => onLike?.(post.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    post.isLiked ? "fill-primary text-primary" : ""
                  }`}
                />
                <span>Like</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Comment</span>
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => onShare?.(post.id)}
              >
                <Share2 className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => onSave?.(post.id)}
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Comments */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Comments</h2>
        <CommentSection
          postId={post.id}
          comments={comments}
          currentUser={currentUser}
          onAddComment={onComment}
          onLikeComment={onLikeComment}
        />
      </div>
    </div>
  );
}
