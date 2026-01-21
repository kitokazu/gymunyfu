import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { updatePostCounts } from "./post-service";
import { updateCommentLikesCount } from "./comment-service";

// Get likes collection path for a post
function getPostLikesPath(postId: string) {
  return `posts/${postId}/likes`;
}

// Get likes collection path for a comment
function getCommentLikesPath(postId: string, commentId: string) {
  return `posts/${postId}/comments/${commentId}/likes`;
}

// Check if a post is liked by a user
export async function isPostLiked(
  postId: string,
  userId: string
): Promise<boolean> {
  const likeRef = doc(db, getPostLikesPath(postId), userId);
  const likeSnap = await getDoc(likeRef);
  return likeSnap.exists();
}

// Check if a comment is liked by a user
export async function isCommentLiked(
  postId: string,
  commentId: string,
  userId: string
): Promise<boolean> {
  const likeRef = doc(db, getCommentLikesPath(postId, commentId), userId);
  const likeSnap = await getDoc(likeRef);
  return likeSnap.exists();
}

// Toggle like on a post (like if not liked, unlike if already liked)
export async function togglePostLike(
  postId: string,
  userId: string
): Promise<boolean> {
  const likeRef = doc(db, getPostLikesPath(postId), userId);
  const likeSnap = await getDoc(likeRef);

  if (likeSnap.exists()) {
    // Unlike: remove the like document
    await deleteDoc(likeRef);
    await updatePostCounts(postId, { likesCount: -1 });
    return false; // Now unliked
  } else {
    // Like: create the like document
    await setDoc(likeRef, {
      userId,
      createdAt: Timestamp.now(),
    });
    await updatePostCounts(postId, { likesCount: 1 });
    return true; // Now liked
  }
}

// Toggle like on a comment
export async function toggleCommentLike(
  postId: string,
  commentId: string,
  userId: string
): Promise<boolean> {
  const likeRef = doc(db, getCommentLikesPath(postId, commentId), userId);
  const likeSnap = await getDoc(likeRef);

  if (likeSnap.exists()) {
    // Unlike: remove the like document
    await deleteDoc(likeRef);
    await updateCommentLikesCount(postId, commentId, -1);
    return false; // Now unliked
  } else {
    // Like: create the like document
    await setDoc(likeRef, {
      userId,
      createdAt: Timestamp.now(),
    });
    await updateCommentLikesCount(postId, commentId, 1);
    return true; // Now liked
  }
}

// Like a post (only if not already liked)
export async function likePost(postId: string, userId: string): Promise<void> {
  const likeRef = doc(db, getPostLikesPath(postId), userId);
  const likeSnap = await getDoc(likeRef);

  if (!likeSnap.exists()) {
    await setDoc(likeRef, {
      userId,
      createdAt: Timestamp.now(),
    });
    await updatePostCounts(postId, { likesCount: 1 });
  }
}

// Unlike a post (only if already liked)
export async function unlikePost(postId: string, userId: string): Promise<void> {
  const likeRef = doc(db, getPostLikesPath(postId), userId);
  const likeSnap = await getDoc(likeRef);

  if (likeSnap.exists()) {
    await deleteDoc(likeRef);
    await updatePostCounts(postId, { likesCount: -1 });
  }
}

// Get multiple post like statuses for a user (batch check)
export async function getPostLikeStatuses(
  postIds: string[],
  userId: string
): Promise<Record<string, boolean>> {
  const statuses: Record<string, boolean> = {};

  await Promise.all(
    postIds.map(async (postId) => {
      statuses[postId] = await isPostLiked(postId, userId);
    })
  );

  return statuses;
}
