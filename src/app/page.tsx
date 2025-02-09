import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const { userId } = await auth();

  console.log(session);

  if (userId != null) {
    redirect("/home");
  }

  return (
    <div className="h-full">
      <main className="w-full px-4 py-6">
        <div>
          Go to <a href="/home">Home</a>
        </div>
      </main>
    </div>
  );
}
