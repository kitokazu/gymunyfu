import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import type { User, FinancialProfile } from "../types";
import { docToUser, userToDoc, type UserDoc } from "./firestore-converters";

const USERS_COLLECTION = "users";

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return docToUser(userSnap.id, userSnap.data() as UserDoc);
}

// Get user by username
export async function getUserByUsername(username: string): Promise<User | null> {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where("username", "==", username), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  return docToUser(userDoc.id, userDoc.data() as UserDoc);
}

// Create a new user
export async function createUser(userId: string, userData: Omit<User, "id">): Promise<User> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const docData = userToDoc(userData);

  await setDoc(userRef, docData);

  return {
    id: userId,
    ...userData,
  };
}

// Update user profile
export async function updateUser(
  userId: string,
  updates: Partial<Omit<User, "id" | "createdAt">>
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, updates);
}

// Update financial profile specifically
export async function updateFinancialProfile(
  userId: string,
  financialProfile: FinancialProfile
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, { financialProfile });
}

// Increment/decrement user stats
export async function updateUserStats(
  userId: string,
  stats: {
    followersCount?: number;
    followingCount?: number;
    postsCount?: number;
  }
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const updates: Record<string, number> = {};

  if (stats.followersCount !== undefined) {
    updates.followersCount = stats.followersCount;
  }
  if (stats.followingCount !== undefined) {
    updates.followingCount = stats.followingCount;
  }
  if (stats.postsCount !== undefined) {
    updates.postsCount = stats.postsCount;
  }

  await updateDoc(userRef, updates);
}

// Check if username is available
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const user = await getUserByUsername(username);
  return user === null;
}

// Get a list of users (ordered by creation date desc)
export async function getUsers(): Promise<User[]> {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnap) =>
    docToUser(docSnap.id, docSnap.data() as UserDoc)
  );
}
