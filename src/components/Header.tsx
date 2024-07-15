import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 px-10">
      <Link href="/">GYMUNYFU</Link>
      <div className="cursor-pointer">Profile</div>
      {/* <UserButton /> */}
    </header>
  );
}
