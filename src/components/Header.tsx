import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 px-10">
      <Link href="/">GYMUNYFU</Link>
      <div className="flex justify-center gap-6 align-middle">
        <ThemeToggler />
        <div className="cursor-pointer">Profile</div>
        <SignOutButton />
      </div>
      {/* <UserButton /> */}
    </header>
  );
}
