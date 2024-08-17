import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

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

        <h1 className="text-4xl md:text-5xl font-bold">Søk verv i Webkom!</h1>

        <p className="text-lg">
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

type GroupLinkProps = {
  emoji: string;
  name: string;
  to: string;
};

const GroupLink = ({ emoji, name, to }: GroupLinkProps) => {
  return (
    <li key={to} className="py-6 flex flex-row items-center">
      <a href={to} className="flex-1">
        <h2 className="group text-2xl font-bold">
          <span aria-hidden="true">{emoji}</span>
          <span className="group-hover:underline ml-2">{name}</span>
        </h2>
      </a>

      <a
        href={to}
        className="py-2 hover:underline hover:bg-gray-100 rounded-lg h-14 w-14 items-center justify-center flex"
      >
        <ChevronRightIcon />
      </a>
    </li>
  );
};
