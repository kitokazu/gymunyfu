"use client";

import { useState, useEffect, useCallback } from "react";
import type { Post, PostCategory, PostTag } from "../types";
import { subscribeToPosts, getPostLikeStatuses, togglePostLike } from "../services";
import { useCurrentUser } from "./use-current-user";

interface UsePostsOptions {
  category?: PostCategory;
  tag?: PostTag;
  limitCount?: number;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: Error | null;
  likePost: (postId: string) => Promise<void>;
  refresh: () => void;
}

export function usePosts(options?: UsePostsOptions): UsePostsReturn {
  const { user } = useCurrentUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likeStatuses, setLikeStatuses] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Subscribe to posts
  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToPosts(
      (fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoading(false);
      },
      {
        category: options?.category,
        tag: options?.tag,
        limitCount: options?.limitCount,
      }
    );

    return () => unsubscribe();
  }, [options?.category, options?.tag, options?.limitCount, refreshKey]);

  // Fetch like statuses when posts change
  useEffect(() => {
    if (!user || posts.length === 0) return;

    const fetchLikeStatuses = async () => {
      try {
        const postIds = posts.map((p) => p.id);
        const statuses = await getPostLikeStatuses(postIds, user.id);
        setLikeStatuses(statuses);
      } catch (err) {
        console.error("Error fetching like statuses:", err);
      }
    };

    fetchLikeStatuses();
  }, [posts, user]);

  // Combine posts with like statuses
  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: likeStatuses[post.id] || false,
  }));

  // Handle liking a post with optimistic update
  const handleLikePost = useCallback(
    async (postId: string) => {
      if (!user) return;

      const currentlyLiked = likeStatuses[postId] || false;

      // Optimistic update
      setLikeStatuses((prev) => ({
        ...prev,
        [postId]: !currentlyLiked,
      }));

      // Optimistically update the like count
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: post.likesCount + (currentlyLiked ? -1 : 1),
              }
            : post
        )
      );

      try {
        await togglePostLike(postId, user.id);
      } catch (err) {
        // Revert on error
        setLikeStatuses((prev) => ({
          ...prev,
          [postId]: currentlyLiked,
        }));
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likesCount: post.likesCount + (currentlyLiked ? 1 : -1),
                }
              : post
          )
        );
        console.error("Error toggling like:", err);
      }
    },
    [user, likeStatuses]
  );

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return {
    posts: postsWithLikeStatus,
    loading,
    error,
    likePost: handleLikePost,
    refresh,
  };
}
