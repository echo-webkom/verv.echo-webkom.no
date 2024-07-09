"use client";

import { signInAction } from "@/actions/log-in";
import { signOutAction } from "@/actions/log-out";
import { Button } from "../ui/button";

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
    <Button variant="link" onClick={handleClick}>
      {action === "sign-in" ? "Logg inn" : "Logg ut"}
    </Button>
  );
};
