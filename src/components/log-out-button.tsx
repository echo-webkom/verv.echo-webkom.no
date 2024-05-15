"use client";

import { logout } from "@/actions/log-out";

export const LogOutButton = () => {
  return (
    <button
      className="text-blue-500 hover:underline text-left w-fit"
      onClick={() => logout()}
    >
      Logg ut
    </button>
  );
};
