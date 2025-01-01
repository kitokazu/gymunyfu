import { CreatePost } from "@/components/create-post";
import { FinancialFeed } from "@/components/financial-feed";

export default function Page() {
  return (
    <div className="h-full">
      <main className="w-full min-w-max mx-auto px-4 py-6">
        <div className="space-y-6">
          <CreatePost />
          <FinancialFeed />
        </div>
      </main>
    </div>
  );
}
