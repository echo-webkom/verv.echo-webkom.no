"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn("feide")} variant="secondary">
      Logg inn med Feide
    </Button>
  );
};
