"use client";

import { logout } from "@/actions/log-out";

export const LogOutButton = () => {
  return (
    <button className="w-fit text-left text-blue-500 hover:underline" onClick={() => logout()}>
      <div className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
        Logg ut
      </div>
    </button>
  );
};
