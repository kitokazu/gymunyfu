"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPosts } from "./user-posts"
import { UserInformation } from "./user-information"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="information">Information</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="space-y-4">
        <UserPosts />
      </TabsContent>
      <TabsContent value="information" className="space-y-4">
        <UserInformation />
      </TabsContent>
    </Tabs>
  )
}

