import { AboutVerv } from "@/components/about-verv";
import { GroupsPreview } from "@/components/groups-preview";
import { auth } from "@/server/auth";

export default async function Home() {
  const { user } = await auth();

  return (
    <main className="container flex flex-col gap-6">
      <div className="mx-auto w-1/2">
        <h1>Velkommen til echo - linjeforeningen for informatikk!</h1>
        <div className="mt-4">
          <AboutVerv />
        </div>
      </div>
      <div className="mx-auto w-1/2">
        <GroupsPreview />        
      </div>
      {user ? (
        <></>
      ) : (
        <>
          <p>Du er ikke logget inn.</p>
        </>
      )}
    </main>
  );
}
