import { FlipWords } from "@/components/flip-words";
import { GroupLink } from "@/components/group-link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const groups = [
  "Webkom",
  "Tilde",
  "Bedkom",
  "Makerspace",
  "Hyggkom",
  "Gnist",
  "ESC",
  "Programmerbar",
  "Consulting",
].map((group) => group + "!");

export default function Home() {
  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <div className="text-center flex flex-col gap-4 pt-12 pb-24">
        <Image
          src="/images/echo-logo.png"
          className="mx-auto"
          width={200}
          height={200}
          alt="echo logo"
          quality={100}
        />

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 space-y-3 mb-4">
          Søk verv i <br />
          <FlipWords words={groups} />
        </h1>

        <p className="text-xl text-neutral-900">
          echo har nå åpnet for søknader til verv. Søknadsfristen er 1.
          september. Det er lov å søke på flere grupper!
        </p>
      </div>

      <div>
        <div className="mb-2">
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
          <GroupLink emoji="🤝🏻" name="Consulting" to="/consutling" />
          <GroupLink emoji="🏟️" name="ESC" to="/esc" />
          <GroupLink emoji="✨" name="Gnist" to="/gnist" />
          <GroupLink emoji="🫶🏻" name="Hyggkom" to="/hyggkom" />
          <GroupLink emoji="🛠️" name="Makerspace" to="/makerspace" />
          <GroupLink emoji="🍻" name="Programmerbar" to="/programmerbar" />
          <GroupLink emoji="🥳" name="Tilde" to="/tilde" />
        </ul>
      </div>
    </main>
  );
}
