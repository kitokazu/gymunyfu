"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { notFound } from "next/navigation";
import { use } from "react";
import { Loader2 } from "lucide-react";
import { useUserProfile } from "@/lib/hooks/use-user-profile";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  const {
    profile,
    posts,
    loading,
    isOwnProfile,
    isFollowingUser,
    followLoading,
    toggleFollowUser,
    updateFinancialProfile,
  } = useUserProfile(username);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="mx-auto max-w-4xl">
        <ProfileHeader
          user={profile}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowingUser}
          onFollowToggle={toggleFollowUser}
          followLoading={followLoading}
        />

        <div className="px-4 mt-6">
          <ProfileTabs
            user={profile}
            posts={posts}
            isOwnProfile={isOwnProfile}
            onFinancialProfileSave={updateFinancialProfile}
          />
        </div>
      </div>
    </div>
  );
}
