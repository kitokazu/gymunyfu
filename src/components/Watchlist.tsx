import React from "react";

export default function Watchlist() {
  return (
    <div className="">
      <div className="hidden h-full w-[250px] transform border-r bg-accent transition-all duration-300 ease-in-out sm:flex">
        <aside className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words px-4">
          {/* Top */}
          <div className="relative mt-4 pb-2">
            <h1 className="mt-4 text-center text-lg font-semibold">
              Investment Watchlist
            </h1>
            <p className="text-center">(Coming soon)</p>
            {/* Profile */}
            <div className="flex flex-col items-center justify-center gap-4 align-middle text-lg">
              <div className="text-neutral-500 dark:text-neutral-400"></div>
            </div>
            ≤<div className="mt-8 flex flex-col space-y-4"></div>
          </div>
          {/* Bottom */}
          <div className="sticky bottom-0 mb-4 mt-auto block whitespace-nowrap transition duration-200"></div>
        </aside>
        <div className="relative mt-[calc(calc(90vh)-40px)]"></div>
      </div>
    </div>
  );
}
