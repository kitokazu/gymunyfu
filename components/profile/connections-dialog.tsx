"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProfileIconComponent } from "@/components/ui/profile-icon";
import type { User } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";

interface ConnectionsDialogProps {
  trigger: React.ReactNode;
  title: string;
  fetchUsers: () => Promise<User[]>;
}

export function ConnectionsDialog({ trigger, title, fetchUsers }: ConnectionsDialogProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const loadUsers = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers();
        setUsers(result);
      } catch (error) {
        console.error("Error loading connections", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {title}
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">No users found</div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg border border-border p-2 hover:bg-muted transition-colors"
              >
                <ProfileIconComponent icon={user.profileIcon} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  View
                </Button>
              </Link>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
