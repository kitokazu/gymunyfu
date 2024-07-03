"use client";
import React from "react";
import { useRouter } from "next/router";

export default function RedirectButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Redirect
    </button>
  );
}
