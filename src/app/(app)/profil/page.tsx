import { requireAuth } from "@/lib/require.server";

export default async function Profile() {
  const { user } = await requireAuth();

  return (
    <main className="container flex flex-col gap-8 text-xl">
      <h1>Profil</h1>

      <p>Hei, {user.name}!</p>
    </main>
  );
}
