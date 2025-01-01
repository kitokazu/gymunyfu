'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookmarkIcon, Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react'
import { CommentSection } from "./comment-section"

interface Post {
  id: number
  author: {
    name: string
    image: string
    handle: string
  }
  content: string
  timestamp: string
  likes: number
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
  shares: number
}

interface FinancialPostProps {
  post: Post
}

export function FinancialPost({ post }: FinancialPostProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.image} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold">{post.author.name}</div>
          <div className="text-sm text-muted-foreground">{post.author.handle}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <BookmarkIcon className="mr-2 h-4 w-4" /> Save post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <div className="flex items-center gap-4 p-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
          <span className="ml-auto text-xs">{post.timestamp}</span>
        </div>
        <div className="border-t px-4 py-2">
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      </CardFooter>
    </Card>
  )
}

