"use client";

import type React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { User, Post } from "@/lib/types";
import { EditableFinancialOverview } from "./editable-financial-overview";
import { FileText, DollarSign, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ProfileTabsProps {
  user: User;
  posts: Post[];
  isOwnProfile?: boolean;
}

export function ProfileTabs({ user, posts, isOwnProfile }: ProfileTabsProps) {
  const renderPosts = (posts: Post[]) => {
    if (posts.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No posts yet
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post) => {
          // You'll need to import postCategories or pass it as a prop
          return (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className="rounded-lg border border-border bg-card p-4 hover:bg-card/80 transition-colors">
                <p className="text-foreground leading-relaxed">
                  {post.content}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.commentsCount}
                  </span>
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <Tabs defaultValue="financial" className="w-full">
      <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
        <TabsTrigger
          value="financial"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Financial
        </TabsTrigger>
        <TabsTrigger
          value="posts"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          <FileText className="mr-2 h-4 w-4" />
          Posts
        </TabsTrigger>
      </TabsList>

      <TabsContent value="financial" className="mt-6">
        {user.financialProfile ? (
          <EditableFinancialOverview
            profile={user.financialProfile}
            isOwnProfile={isOwnProfile || false}
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No financial information available
          </div>
        )}
      </TabsContent>

      <TabsContent value="posts" className="mt-6">
        {renderPosts(posts)}
      </TabsContent>
    </Tabs>
  );
}
