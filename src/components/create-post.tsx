"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const POST_TYPES = {
  Analysis: {
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    description: "Deep dive into market trends and financial instruments",
  },
  News: {
    color: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-100 dark:bg-green-900",
    description: "Share important financial news and updates",
  },
  Discussion: {
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    description: "Start a conversation about financial topics",
  },
  Strategy: {
    color: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-100 dark:bg-orange-900",
    description: "Share investment strategies and portfolio management tips",
  },
} as const;

type PostType = keyof typeof POST_TYPES;

export function CreatePost() {
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>("Discussion");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Financial Post</DialogTitle>
          <DialogDescription>
            Share your financial insights, tips, or questions with the
            community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="post-type">Post Type</Label>
            <Select
              value={postType}
              onValueChange={(value) => setPostType(value as PostType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(POST_TYPES).map(
                  ([type, { color, bgColor, description }]) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={cn("font-medium", color, bgColor)}
                        >
                          {type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {description}
                        </span>
                      </div>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter your post title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind about finance?"
              className="min-h-[200px]"
            />
          </div>
          <div className="grid gap-2">
            <Label>Add to your post</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" type="button">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" type="button">
                <DollarSign className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
