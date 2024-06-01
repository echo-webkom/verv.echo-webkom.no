import { auth } from "@/server/auth";

export default async function Home() {
  const { user } = await auth();

  return (
    <main className="container flex flex-col gap-8 text-xl">
      <h1>Hei, verden!</h1>

      {user ? (
        <>
          <p>Velkommen tilbake, {user.name}!</p>
        </>
      ) : (
        <>
          <p>Du er ikke logget inn.</p>
        </>
      )}
    </main>
  );
}
