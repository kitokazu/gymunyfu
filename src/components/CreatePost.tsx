"use client";
import React, { useState } from "react";

export default function CreatePost() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="justify-between">
      <div className="px-4 text-slate-800">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          className="mt-2 h-32 w-full p-2 focus:border-none focus:outline-none"
          placeholder="Is your money up?"
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button className="light:border-black w-24 rounded-md border-2 dark:border-white">
          Post
        </button>
      </div>
    </div>
  );
}
