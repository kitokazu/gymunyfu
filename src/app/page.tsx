import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Get Your Money Up Not Your Funny Up
        </h1>
        <Link href="/home">
          <button>Click Here to Sign up</button>
        </Link>
      </div>
    </section>
  );
}
