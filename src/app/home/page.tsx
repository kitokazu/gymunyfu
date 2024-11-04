import React from "react";
import CreatePost from "@/components/CreatePost";

export default function Home() {
  return (
    <section className="flex flex-col items-center py-6">
      <header>
        <h1 className="text-3xl font-bold">Feed</h1>
      </header>
      <hr className="my-4 w-full border-gray-300" />

      <main className="w-full">
        <div className="px-6 lg:px-48">
          <CreatePost />
        </div>
        <hr className="my-4 w-full border-gray-300" />
      </main>
    </section>
  );
}
