"use client";

import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return <span onClick={() => signOut({ redirectUrl: "/" })}>Sign Out</span>;
}
