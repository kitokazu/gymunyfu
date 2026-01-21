"use client";

import { useState, useEffect, useCallback } from "react";
import type { Comment } from "../types";
import {
  subscribeToComments,
  addComment as addCommentService,
  isCommentLiked,
  toggleCommentLike,
} from "../services";
import { useCurrentUser } from "./use-current-user";

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: Error | null;
  addComment: (content: string) => Promise<Comment | null>;
  likeComment: (commentId: string) => Promise<void>;
}

export function useComments(postId: string): UseCommentsReturn {
  const { user } = useCurrentUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [likeStatuses, setLikeStatuses] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to comments
  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToComments(postId, (fetchedComments) => {
      setComments(fetchedComments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  // Fetch like statuses when comments change
  useEffect(() => {
    if (!user || comments.length === 0) return;

    const fetchLikeStatuses = async () => {
      try {
        const statuses: Record<string, boolean> = {};
        await Promise.all(
          comments.map(async (comment) => {
            statuses[comment.id] = await isCommentLiked(
              postId,
              comment.id,
              user.id
            );
          })
        );
        setLikeStatuses(statuses);
      } catch (err) {
        console.error("Error fetching comment like statuses:", err);
      }
    };

    fetchLikeStatuses();
  }, [comments, user, postId]);

  // Combine comments with like statuses
  const commentsWithLikeStatus = comments.map((comment) => ({
    ...comment,
    isLiked: likeStatuses[comment.id] || false,
  }));

  // Add a new comment
  const handleAddComment = useCallback(
    async (content: string): Promise<Comment | null> => {
      if (!user || !content.trim()) return null;

      try {
        const newComment = await addCommentService(postId, user, content);
        return newComment;
      } catch (err) {
        console.error("Error adding comment:", err);
        setError(err instanceof Error ? err : new Error("Failed to add comment"));
        return null;
      }
    },
    [postId, user]
  );

  // Like/unlike a comment with optimistic update
  const handleLikeComment = useCallback(
    async (commentId: string) => {
      if (!user) return;

      const currentlyLiked = likeStatuses[commentId] || false;

      // Optimistic update
      setLikeStatuses((prev) => ({
        ...prev,
        [commentId]: !currentlyLiked,
      }));

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likesCount: comment.likesCount + (currentlyLiked ? -1 : 1),
              }
            : comment
        )
      );

      try {
        await toggleCommentLike(postId, commentId, user.id);
      } catch (err) {
        // Revert on error
        setLikeStatuses((prev) => ({
          ...prev,
          [commentId]: currentlyLiked,
        }));
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likesCount: comment.likesCount + (currentlyLiked ? 1 : -1),
                }
              : comment
          )
        );
        console.error("Error toggling comment like:", err);
      }
    },
    [user, postId, likeStatuses]
  );

  return {
    comments: commentsWithLikeStatus,
    loading,
    error,
    addComment: handleAddComment,
    likeComment: handleLikeComment,
  };
}
