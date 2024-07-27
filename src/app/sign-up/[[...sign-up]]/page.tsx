import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function page() {
  return (
    <div className="h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <Image src="/images/logo.png" alt={"Logo"} width={250} height={250} />
        <SignUp />
      </div>
    </div>
  );
}
