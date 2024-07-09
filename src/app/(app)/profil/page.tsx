import { ensureAuth } from "@/server/lib/ensure";

export default async function Profile() {
  const { user } = await ensureAuth();

  return (
    <main className="container flex max-w-screen-sm flex-col gap-8 p-6 text-xl">
      <h1 className="text-3xl font-semibold">Profil</h1>

      <p>Hei, {user.name}!</p>
    </main>
  );
}
