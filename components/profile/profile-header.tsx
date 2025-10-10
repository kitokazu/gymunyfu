"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/types";
import { Briefcase } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: () => void;
}

export function ProfileHeader({
  user,
  isOwnProfile,
  isFollowing: initialIsFollowing,
  onFollowToggle,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(user.followersCount);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
    onFollowToggle?.();
  };

  return (
    <div className="w-full border-b border-border pb-3">
      <div className="px-4">
        <div className="flex items-center gap-4">
          {/* Avatar on the left */}
          <Avatar className="h-14 w-14 flex-shrink-0">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.displayName}
            />
            <AvatarFallback className="text-lg">
              {user.displayName[0]}
            </AvatarFallback>
          </Avatar>

          {/* Info in the middle */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h1 className="text-lg font-bold truncate">
                  {user.displayName}
                </h1>
                <p className="text-xs text-muted-foreground">
                  @{user.username}
                </p>
              </div>

              {/* Button on the right */}
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 bg-transparent"
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={handleFollowToggle}
                  variant={isFollowing ? "outline" : "default"}
                  size="sm"
                  className="flex-shrink-0"
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </div>

            {/* Occupation inline */}
            {user.occupation && user.occupation.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{user.occupation.join(" • ")}</span>
              </div>
            )}

            {/* Stats inline */}
            <div className="flex gap-3 text-xs">
              <div>
                <span className="font-semibold text-foreground">
                  {followersCount.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {user.followingCount.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-1">Following</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {user.postsCount.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-1">Posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
