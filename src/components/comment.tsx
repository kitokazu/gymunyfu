import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface CommentProps {
  comment: {
    id: number
    author: {
      name: string
      image: string
    }
    content: string
    timestamp: Date
    likes: number
  }
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-3 py-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.image} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{comment.content}</p>
      </div>
    </div>
  )
}

