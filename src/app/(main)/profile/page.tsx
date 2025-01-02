import { ProfileHeader } from "@/components/profile-header";
import { ProfileTabs } from "@/components/profile-tabs";

export default function ProfilePage() {
  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
}
