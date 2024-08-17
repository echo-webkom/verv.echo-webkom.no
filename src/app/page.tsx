import { FancyLink } from "@/components/fancy-link";
import { FlipWords } from "@/components/flip-words";
import { GroupLink } from "@/components/group-link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const groups = [
  "Webkom",
  "Bedkom",
  "Consulting",
  "ESC",
  "Gnist",
  "Hyggkom",
  "Makerspace",
  "Programmerbar",
  "Tilde",
].map((group) => group + "!");

export default function Home() {
  return (
    <main className="max-w-2xl w-full mx-auto px-6">
      <section className="text-center flex flex-col gap-4 mt-12 mb-32">
        <Image
          src="/images/echo-logo.png"
          className="mx-auto z-10"
          width={180}
          height={180}
          alt="echo logo"
          quality={100}
        />

        <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 space-y-3 mb-8">
          <span className="text-4xl">Søk verv i</span> <br />
          <FlipWords words={groups} />
        </h1>

        <p className="text-xl text-neutral-700 font-medium">
          echo har nå åpnet for søknader til verv. Søknadsfristen er 1.
          september. Det er lov å søke på flere grupper!
        </p>
      </section>

      <section className="mb-14">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            Våre undergrupper
          </h2>
          <p className="text-center text-gray-700">
            Trykk på en av undergruppene for å lære mer.
          </p>
        </div>

        <ChevronDownIcon className="mx-auto animate-bounce h-6 w-6" />

        <ul className="divide-y">
          <GroupLink emoji="💻" name="Webkom" to="/webkom" />
          <GroupLink emoji="👔" name="Bedkom" to="/bedkom" />
          <GroupLink emoji="🤝🏻" name="Consulting" to="/consulting" />
          <GroupLink emoji="🏟️" name="ESC" to="/esc" />
          <GroupLink emoji="✨" name="Gnist" to="/gnist" />
          <GroupLink emoji="🫶🏻" name="Hyggkom" to="/hyggkom" />
          <GroupLink emoji="🛠️" name="Makerspace" to="/makerspace" />
          <GroupLink emoji="🍻" name="Programmerbar" to="/programmerbar" />
          <GroupLink emoji="🥳" name="Tilde" to="/tilde" />
        </ul>
      </section>

      <section className="mb-14">
        <FancyLink href="/faq" className="my-4">
          Ofte stilte spørsmål
        </FancyLink>
      </section>
    </main>
  );
}
