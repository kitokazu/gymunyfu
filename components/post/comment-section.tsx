"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Comment, User } from "@/lib/types";
import { Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ProfileIconComponent } from "@/components/ui/profile-icon";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  currentUser: User;
  onAddComment?: (postId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
}

export function CommentSection({
  postId,
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment?.(postId, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Comment */}
      <div className="flex gap-3">
        <ProfileIconComponent
          icon={currentUser.profileIcon}
          size="md"
          className="shrink-0"
        />

        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              size="sm"
            >
              Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Link href={`/profile/${comment.user.username}`}>
                <ProfileIconComponent
                  icon={comment.user.profileIcon}
                  size="md"
                  className="shrink-0"
                />
              </Link>

              <div className="flex-1 space-y-1">
                <div className="rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/profile/${comment.user.username}`}
                      className="font-semibold text-sm text-foreground hover:underline"
                    >
                      {comment.user.displayName}
                    </Link>
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={comment.createdAt.toISOString()}
                    >
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs text-muted-foreground hover:text-primary"
                    onClick={() => onLikeComment?.(comment.id)}
                  >
                    <Heart
                      className={`h-3 w-3 mr-1 ${
                        comment.isLiked ? "fill-primary text-primary" : ""
                      }`}
                    />
                    {comment.likesCount > 0 && comment.likesCount}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs text-muted-foreground"
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
