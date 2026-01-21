import { Timestamp } from "firebase/firestore";
import type { User, Post, Comment, FinancialProfile, ProfileIcon, PostCategory, PostTag } from "../types";

// Convert Firestore Timestamp to JavaScript Date
export function timestampToDate(timestamp: Timestamp | Date | undefined | null): Date {
  if (!timestamp) return new Date();
  if (timestamp instanceof Date) return timestamp;
  return timestamp.toDate();
}

// Convert JavaScript Date to Firestore Timestamp
export function dateToTimestamp(date: Date | Timestamp | undefined | null): Timestamp {
  if (!date) return Timestamp.now();
  if (date instanceof Timestamp) return date;
  return Timestamp.fromDate(date);
}

// Denormalized user data stored on posts/comments to avoid extra reads
export interface DenormalizedUser {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  profileIcon?: ProfileIcon;
}

// Extract denormalized user data from a full User object
// Only includes defined fields (Firestore doesn't accept undefined)
export function denormalizeUser(user: User): DenormalizedUser {
  const denormalized: DenormalizedUser = {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
  };

  if (user.avatar !== undefined) {
    denormalized.avatar = user.avatar;
  }
  if (user.profileIcon !== undefined) {
    denormalized.profileIcon = user.profileIcon;
  }

  return denormalized;
}

// Firestore document data types (what's stored in Firestore)
export interface UserDoc {
  username: string;
  displayName: string;
  email: string;
  bio?: string;
  occupation?: string[];
  avatar?: string;
  profileIcon?: ProfileIcon;
  coverImage?: string;
  createdAt: Timestamp;
  financialProfile?: FinancialProfile;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface PostDoc {
  userId: string;
  user: DenormalizedUser;
  content: string;
  category: PostCategory;
  tags: PostTag[];
  images?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likesCount: number;
  commentsCount: number;
}

export interface CommentDoc {
  postId: string;
  userId: string;
  user: DenormalizedUser;
  content: string;
  createdAt: Timestamp;
  likesCount: number;
}

export interface FollowDoc {
  followerId: string;
  followingId: string;
  createdAt: Timestamp;
}

export interface LikeDoc {
  userId: string;
  createdAt: Timestamp;
}

// Convert Firestore document to User type
export function docToUser(id: string, data: UserDoc): User {
  return {
    id,
    username: data.username,
    displayName: data.displayName,
    email: data.email,
    bio: data.bio,
    occupation: data.occupation,
    avatar: data.avatar,
    profileIcon: data.profileIcon,
    coverImage: data.coverImage,
    createdAt: timestampToDate(data.createdAt),
    financialProfile: data.financialProfile,
    followersCount: data.followersCount || 0,
    followingCount: data.followingCount || 0,
    postsCount: data.postsCount || 0,
  };
}

// Convert User to Firestore document data
// Only includes defined fields (Firestore doesn't accept undefined)
export function userToDoc(user: Omit<User, "id">): UserDoc {
  const doc: Partial<UserDoc> = {
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    createdAt: dateToTimestamp(user.createdAt),
    followersCount: user.followersCount || 0,
    followingCount: user.followingCount || 0,
    postsCount: user.postsCount || 0,
  };

  if (user.bio !== undefined) doc.bio = user.bio;
  if (user.occupation !== undefined) doc.occupation = user.occupation;
  if (user.avatar !== undefined) doc.avatar = user.avatar;
  if (user.profileIcon !== undefined) doc.profileIcon = user.profileIcon;
  if (user.coverImage !== undefined) doc.coverImage = user.coverImage;
  if (user.financialProfile !== undefined) doc.financialProfile = user.financialProfile;

  return doc as UserDoc;
}

// Convert Firestore document to Post type
export function docToPost(id: string, data: PostDoc, fullUser?: User): Post {
  // Build a partial User from denormalized data if fullUser not provided
  const user: User = fullUser || {
    id: data.user.id,
    username: data.user.username,
    displayName: data.user.displayName,
    avatar: data.user.avatar,
    profileIcon: data.user.profileIcon,
    email: "",
    createdAt: new Date(),
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
  };

  return {
    id,
    userId: data.userId,
    user,
    content: data.content,
    category: data.category,
    tags: data.tags || [],
    images: data.images,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
    likesCount: data.likesCount || 0,
    commentsCount: data.commentsCount || 0,
  };
}

// Convert Post to Firestore document data
// Only includes defined fields (Firestore doesn't accept undefined)
export function postToDoc(post: Omit<Post, "id">, denormalizedUser: DenormalizedUser): PostDoc {
  const doc: PostDoc = {
    userId: post.userId,
    user: denormalizedUser,
    content: post.content,
    category: post.category,
    tags: post.tags || [],
    createdAt: dateToTimestamp(post.createdAt),
    updatedAt: dateToTimestamp(post.updatedAt),
    likesCount: post.likesCount || 0,
    commentsCount: post.commentsCount || 0,
  };

  if (post.images !== undefined && post.images.length > 0) {
    doc.images = post.images;
  }

  return doc;
}

// Convert Firestore document to Comment type
export function docToComment(id: string, data: CommentDoc, fullUser?: User): Comment {
  const user: User = fullUser || {
    id: data.user.id,
    username: data.user.username,
    displayName: data.user.displayName,
    avatar: data.user.avatar,
    profileIcon: data.user.profileIcon,
    email: "",
    createdAt: new Date(),
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
  };

  return {
    id,
    postId: data.postId,
    userId: data.userId,
    user,
    content: data.content,
    createdAt: timestampToDate(data.createdAt),
    likesCount: data.likesCount || 0,
  };
}

// Convert Comment to Firestore document data
export function commentToDoc(comment: Omit<Comment, "id">, denormalizedUser: DenormalizedUser): CommentDoc {
  return {
    postId: comment.postId,
    userId: comment.userId,
    user: denormalizedUser,
    content: comment.content,
    createdAt: dateToTimestamp(comment.createdAt),
    likesCount: comment.likesCount || 0,
  };
}
