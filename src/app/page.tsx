import { LogOutButton } from "@/components/log-out-button";
import { auth } from "@/server/auth";

export default async function Home() {
  const { user } = await auth();

  return (
    <main className="p-6 text-xl flex flex-col gap-8">
      <h1>Hei, verden!</h1>

      {user ? (
        <>
          <p>Velkommen tilbake, {user.name}!</p>
          <LogOutButton />
        </>
      ) : (
        <>
          <p>Du er ikke logget inn.</p>
          <a href="/auth/feide" className="text-blue-500 hover:underline">
            Logg inn her
          </a>
        </>
      )}
    </main>
  );
}
