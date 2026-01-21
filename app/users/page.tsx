"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";
import { ProfileIconComponent } from "@/components/ui/profile-icon";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { getUsers, toggleFollow, getFollowing } from "@/lib/services";
import type { User } from "@/lib/types";

export default function UsersPage() {
  const { user: currentUser } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers.filter((u) => u.id !== currentUser?.id));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentUser?.id]);

  useEffect(() => {
    const loadFollowing = async () => {
      if (!currentUser) return;
      try {
        const followingIds = await getFollowing(currentUser.id);
        setFollowingStatus(
          followingIds.reduce<Record<string, boolean>>((acc, id) => {
            acc[id] = true;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error loading following list:", error);
      }
    };

    loadFollowing();
  }, [currentUser]);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [users, searchQuery]
  );

  const handleToggleFollow = async (userId: string) => {
    if (!currentUser) return;

    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    const currentlyFollowing = !!followingStatus[userId];

    // Optimistic update
    setFollowingStatus((prev) => ({ ...prev, [userId]: !currentlyFollowing }));
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              followersCount: u.followersCount + (currentlyFollowing ? -1 : 1),
            }
          : u
      )
    );

    try {
      await toggleFollow(currentUser.id, userId);
    } catch (error) {
      console.error("Error toggling follow:", error);
      // Revert on error
      setFollowingStatus((prev) => ({ ...prev, [userId]: currentlyFollowing }));
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                followersCount: u.followersCount + (currentlyFollowing ? 1 : -1),
              }
            : u
        )
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Discover Users</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => {
              const isFollowing = !!followingStatus[user.id];
              return (
                <Card key={user.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      <Link href={`/profile/${user.username}`}>
                        <ProfileIconComponent icon={user.profileIcon} size="lg" />
                      </Link>

                      <div className="flex-1 min-w-0 w-full">
                        <Link href={`/profile/${user.username}`}>
                          <h3 className="font-semibold text-foreground hover:underline truncate">
                            {user.displayName}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            @{user.username}
                          </p>
                        </Link>
                        {user.occupation && user.occupation.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {user.occupation[0]}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3 text-xs text-muted-foreground w-full justify-center">
                        <span>
                          <span className="font-semibold text-foreground">
                            {user.followersCount.toLocaleString()}
                          </span>{" "}
                          followers
                        </span>
                        <span>
                          <span className="font-semibold text-foreground">
                            {user.postsCount.toLocaleString()}
                          </span>{" "}
                          posts
                        </span>
                      </div>

                      <Button
                        size="sm"
                        variant={isFollowing ? "outline" : "default"}
                        onClick={() => handleToggleFollow(user.id)}
                        className="w-full"
                        disabled={!currentUser || actionLoading[user.id]}
                      >
                        {actionLoading[user.id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isFollowing ? (
                          "Following"
                        ) : (
                          "Follow"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {filteredUsers.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                No users found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
