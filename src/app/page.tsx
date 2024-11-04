import React from "react";
import Link from "next/link";

const todo1 = "Add ClerkProvider to the layout";
const todo2 = "Add HeaderMobile to the layout";
const todo3 = "Add Header to the layout";

export default function Page() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Get Your Money Up Not Your Funny Up
        </h1>
        <Link href="/home">
          <button className="w-24 bg-green-600">Access</button>
        </Link>
      </div>
    </section>
  );
}
