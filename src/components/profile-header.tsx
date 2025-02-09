import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { getUserById } from "@/actions/user.action";

export async function ProfileHeader() {
  const authUser = await currentUser();
  if (!authUser) return null;
  const user = await getUserById(authUser.id);
  const name = user?.name ?? "User";

  console.log(user);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Investor</Badge>
              <Badge variant="secondary">Accountant</Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-6 text-sm">
        <div>
          <span className="font-medium">{user?._count.posts}</span>{" "}
          <span className="text-muted-foreground">posts</span>
        </div>
        <div>
          <span className="font-medium">{user?._count.followers}</span>{" "}
          <span className="text-muted-foreground">followers</span>
        </div>
        <div>
          <span className="font-medium">{user?._count.following}</span>{" "}
          <span className="text-muted-foreground">following</span>
        </div>
      </div>
    </div>
  );
}
