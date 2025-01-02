"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, Heart, MessageCircle, Share2 } from "lucide-react";
import { CommentSection } from "./comment-section";
import { cn } from "@/lib/utils";

type PostType = "Analysis" | "News" | "Discussion" | "Strategy";

const postTypeStyles: Record<PostType, { color: string; bgColor: string }> = {
  Analysis: {
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  News: {
    color: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  Discussion: {
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  Strategy: {
    color: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-100 dark:bg-orange-900",
  },
};

interface Post {
  id: number;
  type: PostType;
  author: {
    name: string;
    image: string;
    handle: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Array<{
    id: number;
    author: {
      name: string;
      image: string;
    };
    content: string;
    timestamp: Date;
    likes: number;
  }>;
  shares: number;
  saved?: boolean;
}

interface FinancialPostProps {
  post: Post;
}

export function FinancialPost({ post }: FinancialPostProps) {
  const typeStyle = postTypeStyles[post.type];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.image} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{post.author.name}</div>
              <Badge
                variant="secondary"
                className={cn(
                  "font-medium",
                  typeStyle.color,
                  typeStyle.bgColor
                )}
              >
                {post.type}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground ">
              {post.timestamp}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {post.author.handle}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(post.saved && "text-primary")}
        >
          <BookmarkIcon className="h-4 w-4" />
          <span className="sr-only">Save post</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <div className="flex items-center p-4 text-muted-foreground">
          <div className="flex items-center gap-4">
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
          </div>
        </div>
        <div className="border-t px-4 py-2 w-full">
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      </CardFooter>
    </Card>
  );
}
