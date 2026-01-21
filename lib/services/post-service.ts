import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  collection,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  increment,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Post, User, PostCategory, PostTag, ProfileIcon } from "../types";
import {
  docToPost,
  postToDoc,
  denormalizeUser,
  type PostDoc,
} from "./firestore-converters";

const POSTS_COLLECTION = "posts";

// Create a new post
export async function createPost(
  user: User,
  postData: {
    content: string;
    category: PostCategory;
    tags: PostTag[];
    images?: string[];
  }
): Promise<Post> {
  const postRef = doc(collection(db, POSTS_COLLECTION));
  const now = new Date();

  const newPost: Omit<Post, "id"> = {
    userId: user.id,
    user,
    content: postData.content,
    category: postData.category,
    tags: postData.tags,
    images: postData.images,
    createdAt: now,
    updatedAt: now,
    likesCount: 0,
    commentsCount: 0,
  };

  const docData = postToDoc(newPost, denormalizeUser(user));
  await setDoc(postRef, docData);

  return {
    id: postRef.id,
    ...newPost,
  };
}

// Get a single post by ID
export async function getPostById(postId: string): Promise<Post | null> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    return null;
  }

  return docToPost(postSnap.id, postSnap.data() as PostDoc);
}

// Get all posts (for feed)
export async function getPosts(options?: {
  category?: PostCategory;
  tag?: PostTag;
  limitCount?: number;
}): Promise<Post[]> {
  const postsRef = collection(db, POSTS_COLLECTION);
  let q = query(postsRef, orderBy("createdAt", "desc"));

  if (options?.category) {
    q = query(q, where("category", "==", options.category));
  }

  if (options?.tag) {
    q = query(q, where("tags", "array-contains", options.tag));
  }

  if (options?.limitCount) {
    q = query(q, limit(options.limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) =>
    docToPost(doc.id, doc.data() as PostDoc)
  );
}

// Get posts by user ID
export async function getUserPosts(userId: string): Promise<Post[]> {
  const postsRef = collection(db, POSTS_COLLECTION);
  const q = query(
    postsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) =>
    docToPost(doc.id, doc.data() as PostDoc)
  );
}

// Subscribe to posts (real-time updates)
export function subscribeToPosts(
  callback: (posts: Post[]) => void,
  options?: {
    category?: PostCategory;
    tag?: PostTag;
    limitCount?: number;
  }
): Unsubscribe {
  const postsRef = collection(db, POSTS_COLLECTION);
  let q = query(postsRef, orderBy("createdAt", "desc"));

  if (options?.category) {
    q = query(q, where("category", "==", options.category));
  }

  if (options?.tag) {
    q = query(q, where("tags", "array-contains", options.tag));
  }

  if (options?.limitCount) {
    q = query(q, limit(options.limitCount));
  }

  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) =>
      docToPost(doc.id, doc.data() as PostDoc)
    );
    callback(posts);
  });
}

// Subscribe to a single post (real-time updates)
export function subscribeToPost(
  postId: string,
  callback: (post: Post | null) => void
): Unsubscribe {
  const postRef = doc(db, POSTS_COLLECTION, postId);

  return onSnapshot(postRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    callback(docToPost(snapshot.id, snapshot.data() as PostDoc));
  });
}

// Subscribe to user's posts (real-time updates)
export function subscribeToUserPosts(
  userId: string,
  callback: (posts: Post[]) => void
): Unsubscribe {
  const postsRef = collection(db, POSTS_COLLECTION);
  const q = query(
    postsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) =>
      docToPost(doc.id, doc.data() as PostDoc)
    );
    callback(posts);
  });
}

// Update a post
export async function updatePost(
  postId: string,
  updates: Partial<Pick<Post, "content" | "category" | "tags" | "images">>
): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  await updateDoc(postRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// Delete a post
export async function deletePost(postId: string): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  await deleteDoc(postRef);
}

// Update denormalized user profile icon across a user's posts
export async function updateUserPostsProfileIcon(
  userId: string,
  profileIcon: ProfileIcon
): Promise<void> {
  const postsRef = collection(db, POSTS_COLLECTION);
  const q = query(postsRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.forEach((docSnap) => {
    batch.update(docSnap.ref, {
      "user.profileIcon": profileIcon,
    });
  });

  await batch.commit();
}

// Increment/decrement post engagement counts
export async function updatePostCounts(
  postId: string,
  counts: {
    likesCount?: number;
    commentsCount?: number;
  }
): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  const updates: Record<string, ReturnType<typeof increment>> = {};

  if (counts.likesCount !== undefined) {
    updates.likesCount = increment(counts.likesCount);
  }
  if (counts.commentsCount !== undefined) {
    updates.commentsCount = increment(counts.commentsCount);
  }

  await updateDoc(postRef, updates);
}
