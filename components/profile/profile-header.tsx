"use client";

import { Button } from "@/components/ui/button";
import type { User, ProfileIcon } from "@/lib/types";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  GraduationCap,
  Heart,
  Star,
} from "lucide-react";
import { useState } from "react";
import { ProfileIconSelector } from "./profile-icon-selector";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollowToggle?: () => void;
  onIconChange?: (icon: ProfileIcon) => void;
}

const getProfileIcon = (icon: ProfileIcon) => {
  const iconProps = { className: "h-6 w-6" };

  switch (icon) {
    case "briefcase":
      return <Briefcase {...iconProps} />;
    case "dollar-sign":
      return <DollarSign {...iconProps} />;
    case "trending-up":
      return <TrendingUp {...iconProps} />;
    case "piggy-bank":
      return <PiggyBank {...iconProps} />;
    case "credit-card":
      return <CreditCard {...iconProps} />;
    case "home":
      return <Home {...iconProps} />;
    case "car":
      return <Car {...iconProps} />;
    case "graduation-cap":
      return <GraduationCap {...iconProps} />;
    case "heart":
      return <Heart {...iconProps} />;
    case "star":
      return <Star {...iconProps} />;
    default:
      return <Briefcase {...iconProps} />;
  }
};

export function ProfileHeader({
  user,
  isOwnProfile,
  isFollowing: initialIsFollowing,
  onFollowToggle,
  onIconChange,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [currentIcon, setCurrentIcon] = useState(user.profileIcon);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
    onFollowToggle?.();
  };

  const handleIconChange = (icon: ProfileIcon) => {
    setCurrentIcon(icon);
    onIconChange?.(icon);
  };

  return (
    <div className="w-full border-b border-border pb-3 mt-4">
      <div className="px-4">
        <div className="flex items-center gap-4">
          {/* Profile Icon on the left */}
          <div className="h-14 w-14 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
            {currentIcon ? (
              getProfileIcon(currentIcon)
            ) : (
              <Briefcase className="h-6 w-6 text-primary" />
            )}
          </div>

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
                <ProfileIconSelector
                  currentIcon={currentIcon}
                  onIconSelect={handleIconChange}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0 bg-transparent"
                  >
                    Edit Profile
                  </Button>
                </ProfileIconSelector>
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
