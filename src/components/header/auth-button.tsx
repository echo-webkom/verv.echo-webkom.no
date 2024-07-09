"use client";

import { signInAction } from "@/actions/log-in";
import { signOutAction } from "@/actions/log-out";

type AuthButtonProps = {
  action: "sign-in" | "sign-out";
};

export const AuthButton = ({ action }: AuthButtonProps) => {
  const handleClick = () => {
    if (action === "sign-in") {
      signInAction();
    }

    if (action === "sign-out") {
      signOutAction();
    }
  };

  return (
    <button
      className="text-foreground-muted hover:text-foreground-muted-hover font-medium transition-colors hover:underline"
      onClick={handleClick}
    >
      {action === "sign-in" ? "Logg inn" : "Logg ut"}
    </button>
  );
};
