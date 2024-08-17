"use client";

import { signOutAction } from "@/actions/sign-out";

export function SignInButton() {
  return (
    <a href="/auth/feide" className="hover:underline">
      Logg inn
    </a>
  );
}

export function SignOutButton() {
  return (
    <button className="hover:underline" onClick={() => signOutAction()}>
      Logg ut
    </button>
  );
}
