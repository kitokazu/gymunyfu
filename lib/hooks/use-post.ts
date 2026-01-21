"use client";

import { useState, useEffect, useCallback } from "react";
import type { Post } from "../types";
import { subscribeToPost, isPostLiked, togglePostLike } from "../services";
import { useCurrentUser } from "./use-current-user";

interface UsePostReturn {
  post: Post | null;
  loading: boolean;
  error: Error | null;
  likePost: () => Promise<void>;
}

export function usePost(postId: string): UsePostReturn {
  const { user } = useCurrentUser();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to post updates
  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToPost(postId, (fetchedPost) => {
      setPost(fetchedPost);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  // Check if post is liked by current user
  useEffect(() => {
    if (!user || !postId) return;

    const checkLikeStatus = async () => {
      try {
        const liked = await isPostLiked(postId, user.id);
        setIsLiked(liked);
      } catch (err) {
        console.error("Error checking like status:", err);
      }
    };

    checkLikeStatus();
  }, [postId, user]);

  // Combine post with like status
  const postWithLikeStatus = post
    ? {
        ...post,
        isLiked,
      }
    : null;

  // Handle liking the post with optimistic update
  const handleLikePost = useCallback(async () => {
    if (!user || !post) return;

    const currentlyLiked = isLiked;

    // Optimistic update
    setIsLiked(!currentlyLiked);
    setPost((prev) =>
      prev
        ? {
            ...prev,
            likesCount: prev.likesCount + (currentlyLiked ? -1 : 1),
          }
        : null
    );

    try {
      await togglePostLike(postId, user.id);
    } catch (err) {
      // Revert on error
      setIsLiked(currentlyLiked);
      setPost((prev) =>
        prev
          ? {
              ...prev,
              likesCount: prev.likesCount + (currentlyLiked ? 1 : -1),
            }
          : null
      );
      console.error("Error toggling like:", err);
    }
  }, [user, post, postId, isLiked]);

  return {
    post: postWithLikeStatus,
    loading,
    error,
    likePost: handleLikePost,
  };
}
