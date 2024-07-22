import React from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <section className="py-2">
      <Sidebar />
      <div className="container">
        <h1 className="text-center text-3xl font-bold">
          Get Your Money Up Not Your Funny Up
        </h1>
      </div>
    </section>
  );
}
