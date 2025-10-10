import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { mockUsers, mockPosts } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { use } from "react";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  // Find user by username
  const user = mockUsers.find((u) => u.username === username);

  if (!user) {
    notFound();
  }

  // Get user's posts
  const userPosts = mockPosts.filter((post) => post.userId === user.id);

  // Mock current user for follow status
  const currentUser = mockUsers[0];
  const isOwnProfile = currentUser.id === user.id;

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="mx-auto max-w-4xl">
        <ProfileHeader
          user={user}
          isOwnProfile={isOwnProfile}
          isFollowing={false}
        />

        <div className="px-4 mt-6">
          <ProfileTabs
            user={user}
            posts={userPosts}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </div>
    </div>
  );
}
