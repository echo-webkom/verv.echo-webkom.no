"use client";

import { logout } from "@/actions/log-out";

export const LogOutButton = () => {
  return (
    <button className="w-fit text-left text-blue-500 hover:underline" onClick={() => logout()}>
      Logg ut
    </button>
  );
};
