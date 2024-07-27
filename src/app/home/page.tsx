import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Divide } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold">Feed</h1>
      <hr className="my-4 w-full border-gray-300" />
    </div>

    // <div className="flex h-screen flex-col items-center justify-center">
    //   <h1 className="text-4xl font-bold">Welcome to Clerk!</h1>
    //   <p className="text-center text-lg">
    //     Get started by editing <code>pages/index.tsx</code>
    //   </p>
    //   <UserButton />
    //   <Divide size={32} />
    // </div>
  );
}
