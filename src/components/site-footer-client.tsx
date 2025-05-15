"use client";

import Link from "next/link";

import { signOutAction } from "@/actions/sign-out";

export function SignInButton() {
  return (
    <Link href="/auth/feide" className="hover:underline">
      Logg inn
    </Link>
  );
}

export function SignOutButton() {
  return (
    <button className="hover:underline" onClick={() => signOutAction()}>
      Logg ut
    </button>
  );
}
