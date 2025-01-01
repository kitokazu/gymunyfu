'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, ImageIcon } from 'lucide-react'

export function CreatePost() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Financial Post</DialogTitle>
          <DialogDescription>
            Share your financial insights, tips, or questions with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter your post title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind about finance?"
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label>Add to your post</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <DollarSign className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

