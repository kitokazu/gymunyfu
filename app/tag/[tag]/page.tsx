"use client";

import { PostCard } from "@/components/feed/post-card";
import { TrendingSidebar } from "@/components/feed/trending-sidebar";
import { mockPosts, postTags } from "@/lib/mock-data";
import type { PostTag } from "@/lib/types";
import { Tag } from "lucide-react";
import { useState, use } from "react";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = use(params);
  const tagValue = tag as PostTag;
  const tagInfo = postTags.find((t) => t.value === tagValue);

  // Filter posts by tag
  const taggedPosts = mockPosts.filter((post) => post.tags.includes(tagValue));

  const [posts, setPosts] = useState(taggedPosts);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked
                ? post.likesCount - 1
                : post.likesCount + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-10 p-4">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              #{tagInfo?.label || tagValue}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {posts.length.toLocaleString()} posts
          </p>
        </div>

        <div className="p-4 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No posts found with this tag
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Trending Sidebar */}
      <TrendingSidebar />
    </div>
  );
}
