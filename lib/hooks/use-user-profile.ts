"use client";

import { useState, useEffect, useCallback } from "react";
import type { User, Post, FinancialProfile } from "../types";
import {
  getUserByUsername,
  getUserById,
  isFollowing,
  toggleFollow,
  updateFinancialProfile as updateFinancialProfileService,
  subscribeToUserPosts,
} from "../services";
import { useCurrentUser } from "./use-current-user";

interface UseUserProfileReturn {
  profile: User | null;
  posts: Post[];
  loading: boolean;
  error: Error | null;
  isOwnProfile: boolean;
  isFollowingUser: boolean;
  followLoading: boolean;
  toggleFollowUser: () => Promise<void>;
  updateFinancialProfile: (profile: FinancialProfile) => Promise<void>;
  refresh: () => void;
}

export function useUserProfile(username: string): UseUserProfileReturn {
  const { user: currentUser } = useCurrentUser();
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch user profile
  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const userProfile = await getUserByUsername(username);
        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch profile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, refreshKey]);

  // Subscribe to user's posts
  useEffect(() => {
    if (!profile) return;

    const unsubscribe = subscribeToUserPosts(profile.id, (fetchedPosts) => {
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [profile]);

  // Check if current user is following this profile
  useEffect(() => {
    if (!currentUser || !profile || currentUser.id === profile.id) {
      setIsFollowingUser(false);
      return;
    }

    const checkFollowStatus = async () => {
      try {
        const following = await isFollowing(currentUser.id, profile.id);
        setIsFollowingUser(following);
      } catch (err) {
        console.error("Error checking follow status:", err);
      }
    };

    checkFollowStatus();
  }, [currentUser, profile]);

  // Check if this is the current user's own profile
  const isOwnProfile = currentUser?.id === profile?.id;

  // Toggle follow with optimistic update
  const handleToggleFollow = useCallback(async () => {
    if (!currentUser || !profile || isOwnProfile) return;

    const currentlyFollowing = isFollowingUser;
    setFollowLoading(true);

    // Optimistic update
    setIsFollowingUser(!currentlyFollowing);
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            followersCount: prev.followersCount + (currentlyFollowing ? -1 : 1),
          }
        : null
    );

    try {
      await toggleFollow(currentUser.id, profile.id);
    } catch (err) {
      // Revert on error
      setIsFollowingUser(currentlyFollowing);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              followersCount: prev.followersCount + (currentlyFollowing ? 1 : -1),
            }
          : null
      );
      console.error("Error toggling follow:", err);
    } finally {
      setFollowLoading(false);
    }
  }, [currentUser, profile, isOwnProfile, isFollowingUser]);

  // Update financial profile
  const handleUpdateFinancialProfile = useCallback(
    async (financialProfile: FinancialProfile) => {
      if (!profile) return;

      try {
        await updateFinancialProfileService(profile.id, financialProfile);
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                financialProfile,
              }
            : null
        );
      } catch (err) {
        console.error("Error updating financial profile:", err);
        throw err;
      }
    },
    [profile]
  );

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return {
    profile,
    posts,
    loading,
    error,
    isOwnProfile,
    isFollowingUser,
    followLoading,
    toggleFollowUser: handleToggleFollow,
    updateFinancialProfile: handleUpdateFinancialProfile,
    refresh,
  };
}

// Hook to get a user profile by ID
export function useUserProfileById(userId: string): {
  profile: User | null;
  loading: boolean;
  error: Error | null;
} {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const userProfile = await getUserById(userId);
        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch profile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}
