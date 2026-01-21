"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import type { ProfileIcon, User } from "../types";
import { getUserById, createUser, updateUser, updateUserPostsProfileIcon } from "../services";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfileIcon: (icon: ProfileIcon) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        // Fetch the user profile from Firestore
        try {
          const userProfile = await getUserById(firebaseUser.uid);
          setUser(userProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userProfile = await getUserById(result.user.uid);
    setUser(userProfile);
  };

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    username: string,
    displayName: string
  ) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Create user profile in Firestore
    const newUser = await createUser(result.user.uid, {
      username,
      displayName,
      email,
      createdAt: new Date(),
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      financialProfile: {
        showIncome: true,
        showAssets: true,
      },
    });

    setUser(newUser);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    // Check if user already exists in Firestore
    let userProfile = await getUserById(result.user.uid);

    if (!userProfile) {
      // Create new user profile
      const username = result.user.email?.split("@")[0] || `user${Date.now()}`;
      userProfile = await createUser(result.user.uid, {
        username,
        displayName: result.user.displayName || username,
        email: result.user.email || "",
        avatar: result.user.photoURL || undefined,
        createdAt: new Date(),
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        financialProfile: {
          showIncome: true,
          showAssets: true,
        },
      });
    }

    setUser(userProfile);
  };

  // Sign out
  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  // Update profile icon for the current user and propagate to posts
  const updateProfileIcon = async (icon: ProfileIcon) => {
    if (!firebaseUser) return;

    await updateUser(firebaseUser.uid, { profileIcon: icon });
    await updateUserPostsProfileIcon(firebaseUser.uid, icon);
    setUser((prev) => (prev ? { ...prev, profileIcon: icon } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        updateProfileIcon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
