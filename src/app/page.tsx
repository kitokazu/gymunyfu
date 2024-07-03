import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Random home page in disguise
        </h1>
        <Link href="/home">
          <button>Go to About Page</button>
        </Link>
      </div>
    </section>
  );
}
