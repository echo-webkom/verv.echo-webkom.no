import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LoginButton } from "./login-button";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <main className="space-y-8 p-16 max-w-2xl w-full text-center mx-auto px-6">
      <h1 className="text-3xl font-bold">Velkommen</h1>

      <LoginButton />
    </main>
  );
}
