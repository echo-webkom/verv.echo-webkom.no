import { AboutVerv } from "@/components/about-verv";

export default async function Home() {
  return (
    <main className="container flex flex-col gap-6">
      <div className="py-24">
        <h1 className="text-center text-7xl">Bli med i echo!</h1>
      </div>

      <div className="mx-auto w-1/2">
        <h1>Velkommen til echo - linjeforeningen for informatikk!</h1>
        <div className="mt-4">
          <AboutVerv />
        </div>
      </div>
    </main>
  );
}
