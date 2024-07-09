"use client";

import { login } from "@/actions/log-in";

export const LogInButton = () => {
  return (
    <button onClick={() => login()} className="group w-full max-w-sm bg-white">
      <div className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
        Logg inn
      </div>
    </button>
  );
};
