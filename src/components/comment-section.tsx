"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Comment } from "@/components/comment"
import { MessageCircle } from 'lucide-react'

interface CommentSectionProps {
  postId: number
  comments: Array<{
    id: number
    author: {
      name: string
      image: string
    }
    content: string
    timestamp: Date
    likes: number
  }>
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the comment to your backend
    console.log("New comment:", newComment)
    setNewComment("")
  }

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={() => setIsExpanded(true)}
      >
        <MessageCircle className="h-4 w-4" />
        {comments.length > 0 ? (
          <span>View all {comments.length} comments</span>
        ) : (
          <span>Add a comment</span>
        )}
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Comments ({comments.length})</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
        >
          Hide
        </Button>
      </div>
      
      <form onSubmit={handleSubmitComment} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button 
            type="submit"
            size="sm"
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </div>
      </form>

      <div className="divide-y">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

