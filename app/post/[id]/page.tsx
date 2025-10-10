"use client";

import { PostDetail } from "@/components/post/post-detail";
import { mockPosts, mockComments, mockUsers } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { useState, use } from "react";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);
  const post = mockPosts.find((p) => p.id === id);
  const currentUser = mockUsers[0];

  if (!post) {
    notFound();
  }

  const [comments, setComments] = useState(
    mockComments.filter((c) => c.postId === post.id)
  );
  const [postData, setPostData] = useState(post);

  const handleLike = (postId: string) => {
    setPostData((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
  };

  const handleComment = (postId: string, content: string) => {
    const newComment = {
      id: String(comments.length + 1),
      postId,
      userId: currentUser.id,
      user: currentUser,
      content,
      createdAt: new Date(),
      likesCount: 0,
    };
    setComments((prev) => [...prev, newComment]);
    setPostData((prev) => ({
      ...prev,
      commentsCount: prev.commentsCount + 1,
    }));
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likesCount: comment.isLiked
                ? comment.likesCount - 1
                : comment.likesCount + 1,
            }
          : comment
      )
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl p-4">
        <PostDetail
          post={postData}
          comments={comments}
          currentUser={currentUser}
          onLike={handleLike}
          onComment={handleComment}
          onLikeComment={handleLikeComment}
        />
      </div>
    </div>
  );
}
