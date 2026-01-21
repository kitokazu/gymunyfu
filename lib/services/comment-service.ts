import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  increment,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Comment, User } from "../types";
import {
  docToComment,
  commentToDoc,
  denormalizeUser,
  type CommentDoc,
} from "./firestore-converters";
import { updatePostCounts } from "./post-service";

// Get comments collection path for a post
function getCommentsPath(postId: string) {
  return `posts/${postId}/comments`;
}

// Add a comment to a post
export async function addComment(
  postId: string,
  user: User,
  content: string
): Promise<Comment> {
  const commentsRef = collection(db, getCommentsPath(postId));
  const commentRef = doc(commentsRef);
  const now = new Date();

  const newComment: Omit<Comment, "id"> = {
    postId,
    userId: user.id,
    user,
    content,
    createdAt: now,
    likesCount: 0,
  };

  const docData = commentToDoc(newComment, denormalizeUser(user));
  await setDoc(commentRef, docData);

  // Increment the post's comments count
  await updatePostCounts(postId, { commentsCount: 1 });

  return {
    id: commentRef.id,
    ...newComment,
  };
}

// Get all comments for a post
export async function getComments(postId: string): Promise<Comment[]> {
  const commentsRef = collection(db, getCommentsPath(postId));
  const q = query(commentsRef, orderBy("createdAt", "asc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) =>
    docToComment(doc.id, doc.data() as CommentDoc)
  );
}

// Subscribe to comments (real-time updates)
export function subscribeToComments(
  postId: string,
  callback: (comments: Comment[]) => void
): Unsubscribe {
  const commentsRef = collection(db, getCommentsPath(postId));
  const q = query(commentsRef, orderBy("createdAt", "asc"));

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) =>
      docToComment(doc.id, doc.data() as CommentDoc)
    );
    callback(comments);
  });
}

// Get a single comment by ID
export async function getCommentById(
  postId: string,
  commentId: string
): Promise<Comment | null> {
  const commentRef = doc(db, getCommentsPath(postId), commentId);
  const commentSnap = await getDoc(commentRef);

  if (!commentSnap.exists()) {
    return null;
  }

  return docToComment(commentSnap.id, commentSnap.data() as CommentDoc);
}

// Delete a comment
export async function deleteComment(
  postId: string,
  commentId: string
): Promise<void> {
  const commentRef = doc(db, getCommentsPath(postId), commentId);
  await deleteDoc(commentRef);

  // Decrement the post's comments count
  await updatePostCounts(postId, { commentsCount: -1 });
}

// Update comment likes count
export async function updateCommentLikesCount(
  postId: string,
  commentId: string,
  delta: number
): Promise<void> {
  const commentRef = doc(db, getCommentsPath(postId), commentId);
  await updateDoc(commentRef, {
    likesCount: increment(delta),
  });
}
