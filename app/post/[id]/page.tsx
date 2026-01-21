"use client";

import { PostDetail } from "@/components/post/post-detail";
import { notFound } from "next/navigation";
import { use } from "react";
import { Loader2 } from "lucide-react";
import { usePost } from "@/lib/hooks/use-post";
import { useComments } from "@/lib/hooks/use-comments";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);
  const { user: currentUser, loading: userLoading } = useCurrentUser();
  const { post, loading: postLoading, likePost } = usePost(id);
  const { comments, loading: commentsLoading, addComment, likeComment } = useComments(id);

  const isLoading = userLoading || postLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const handleComment = async (postId: string, content: string) => {
    await addComment(content);
  };

  const handleLikeComment = async (commentId: string) => {
    await likeComment(commentId);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl p-4">
        {currentUser && (
          <PostDetail
            post={post}
            comments={comments}
            currentUser={currentUser}
            onLike={likePost}
            onComment={handleComment}
            onLikeComment={handleLikeComment}
            commentsLoading={commentsLoading}
          />
        )}
      </div>
    </div>
  );
}
