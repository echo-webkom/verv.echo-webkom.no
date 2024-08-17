import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/lucia";
import { LoginButton } from "./login-button";

export default async function LoginPage() {
  const user = await auth();

  if (user) {
    return redirect("/");
  }

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 p-16 px-6 text-center">
      <h1 className="text-3xl font-bold">Velkommen</h1>

      <LoginButton />
    </main>
  );
}
