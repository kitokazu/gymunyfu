import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const session = await auth();
  // if (session) {
  //   redirect("/home");
  // }
  const { userId } = await auth();

  console.log(session);

  if (userId != null) {
    // Query DB for user specific information or display assets only to signed in users
    console.log("User ID:", userId);
    redirect("/home");
  }

  // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser();
  // console.log({ user });

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
