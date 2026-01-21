import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  collection,
  getDocs,
  Timestamp,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Follow } from "../types";
import { timestampToDate } from "./firestore-converters";

const FOLLOWS_COLLECTION = "follows";
const USERS_COLLECTION = "users";

// Generate a consistent follow document ID
function getFollowId(followerId: string, followingId: string): string {
  return `${followerId}_${followingId}`;
}

// Check if a user is following another user
export async function isFollowing(
  followerId: string,
  followingId: string
): Promise<boolean> {
  const followId = getFollowId(followerId, followingId);
  const followRef = doc(db, FOLLOWS_COLLECTION, followId);
  const followSnap = await getDoc(followRef);
  return followSnap.exists();
}

// Follow a user
export async function followUser(
  followerId: string,
  followingId: string
): Promise<Follow> {
  // Don't allow following yourself
  if (followerId === followingId) {
    throw new Error("Cannot follow yourself");
  }

  const followId = getFollowId(followerId, followingId);
  const followRef = doc(db, FOLLOWS_COLLECTION, followId);

  // Check if already following
  const existingFollow = await getDoc(followRef);
  if (existingFollow.exists()) {
    const data = existingFollow.data();
    return {
      id: followId,
      followerId: data.followerId,
      followingId: data.followingId,
      createdAt: timestampToDate(data.createdAt),
    };
  }

  const now = Timestamp.now();

  // Create the follow document
  await setDoc(followRef, {
    followerId,
    followingId,
    createdAt: now,
  });

  // Update the follower's followingCount
  const followerRef = doc(db, USERS_COLLECTION, followerId);
  await updateDoc(followerRef, {
    followingCount: increment(1),
  });

  // Update the following user's followersCount
  const followingRef = doc(db, USERS_COLLECTION, followingId);
  await updateDoc(followingRef, {
    followersCount: increment(1),
  });

  return {
    id: followId,
    followerId,
    followingId,
    createdAt: now.toDate(),
  };
}

// Unfollow a user
export async function unfollowUser(
  followerId: string,
  followingId: string
): Promise<void> {
  const followId = getFollowId(followerId, followingId);
  const followRef = doc(db, FOLLOWS_COLLECTION, followId);

  // Check if following
  const existingFollow = await getDoc(followRef);
  if (!existingFollow.exists()) {
    return; // Not following, nothing to do
  }

  // Delete the follow document
  await deleteDoc(followRef);

  // Update the follower's followingCount
  const followerRef = doc(db, USERS_COLLECTION, followerId);
  await updateDoc(followerRef, {
    followingCount: increment(-1),
  });

  // Update the following user's followersCount
  const followingRef = doc(db, USERS_COLLECTION, followingId);
  await updateDoc(followingRef, {
    followersCount: increment(-1),
  });
}

// Toggle follow status
export async function toggleFollow(
  followerId: string,
  followingId: string
): Promise<boolean> {
  const isCurrentlyFollowing = await isFollowing(followerId, followingId);

  if (isCurrentlyFollowing) {
    await unfollowUser(followerId, followingId);
    return false; // Now not following
  } else {
    await followUser(followerId, followingId);
    return true; // Now following
  }
}

// Get all users a user is following
export async function getFollowing(userId: string): Promise<string[]> {
  const followsRef = collection(db, FOLLOWS_COLLECTION);
  const q = query(followsRef, where("followerId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data().followingId);
}

// Get all followers of a user
export async function getFollowers(userId: string): Promise<string[]> {
  const followsRef = collection(db, FOLLOWS_COLLECTION);
  const q = query(followsRef, where("followingId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data().followerId);
}

// Get follower count
export async function getFollowerCount(userId: string): Promise<number> {
  const followers = await getFollowers(userId);
  return followers.length;
}

// Get following count
export async function getFollowingCount(userId: string): Promise<number> {
  const following = await getFollowing(userId);
  return following.length;
}
