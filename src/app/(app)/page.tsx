import { AboutVerv } from "@/components/about-verv";
import { WorkspaceDisplay } from "@/components/workspace-display";

export default async function Home() {
  return (
    <main className="container flex flex-col gap-6">
      <div className="py-12 md:py-24">
        <h1 className="text-center text-4xl md:text-7xl max-w-screen-md mx-auto">Bli med i echo!</h1>
      </div>

      <div className="mx-auto w-11/12 md:w-1/2 max-w-screen-md px-4">
        <h1 className="text-xl md:text-2xl">Velkommen til echo - linjeforeningen for informatikk!</h1>
        <div className="mt-4">
          <AboutVerv />
          <WorkspaceDisplay />
        </div>
      </div>
    </main>
  );
}
