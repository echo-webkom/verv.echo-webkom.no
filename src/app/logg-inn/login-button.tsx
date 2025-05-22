"use client";

import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href="/auth/feide"
      className="group mx-auto block w-full max-w-sm border-2 border-black bg-white"
    >
      <span className="bg-secondary group-hover:bg-secondary relative -top-2 -right-2 block border-2 border-black px-4 py-1 text-center font-semibold transition-all duration-200 group-hover:-top-1 group-hover:-right-1">
        Logg inn
      </span>
    </Link>
  );
};
