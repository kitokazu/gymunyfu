import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GYMUNYFU",
  description: "A social platform for finance enthusiasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-[100vh] w-[100vw]">
      <body
        className={`${inter.className} h-[100vh] w-[100vw] overflow-hidden`}
      >
        <div className="flex-1 overflow-auto">{children}</div>
      </body>
    </html>
  );
}
