import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { auth } from "@/auth";

export async function ProfileHeader() {
  const session = await auth();
  const user = session?.user;
  console.log({ user });
  const name = user?.name;
  const email = user?.email;
  const firstLetter = name?.charAt(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-muted-foreground">{email}</p>
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
          <span className="font-medium">2</span>{" "}
          <span className="text-muted-foreground">posts</span>
        </div>
        <div>
          <span className="font-medium">2</span>{" "}
          <span className="text-muted-foreground">followers</span>
        </div>
        <div>
          <span className="font-medium">3</span>{" "}
          <span className="text-muted-foreground">following</span>
        </div>
      </div>
    </div>
  );
}
