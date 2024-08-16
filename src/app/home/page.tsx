import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Divide } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-6">
      <h1 className="mr-40 text-3xl font-bold">Feed</h1>
      <hr className="my-4 w-full border-gray-300" />
    </div>
  );
}
