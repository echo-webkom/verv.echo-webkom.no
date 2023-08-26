"use client";

import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <button className="hover:underline" onClick={() => signIn("feide")}>
      Logg inn
    </button>
  );
}

export function SignOutButton() {
  return (
    <button className="hover:underline" onClick={() => signOut()}>
      Logg ut
    </button>
  );
}
