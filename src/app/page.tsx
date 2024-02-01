import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const groups = [
  {
    to: "/webkom",
    name: "💻 Webkom",
  },
  {
    to: "/gnist",
    name: "✨ Gnist",
  },
];

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

        <h1 className="text-4xl md:text-5xl font-bold">
          Søk verv i Webkom eller Gnist!
        </h1>

        <p className="text-lg">
          Echo har nå åpnet for søknader til verv i noen av gruppene våre.
          Søknadsfristen er 14. februar. Det er lov å søke på begge gruppene!
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

        <ul className="grid grid-cols-2">
          {groups.map(({ to, name }) => {
            const emoji = name.split(" ")[0];
            const title = name.split(" ")[1];

            return (
              <li key={name} className="py-6 flex flex-row items-center">
                <a href={to} className="flex-1">
                  <h2 className="flex flex-col text-2xl font-bold">
                    <span className="flex justify-center group-hover:underline ml-2">
                      {title}
                    </span>
                    <span
                      className="flex justify-center text-5xl"
                      aria-hidden="true"
                    >
                      {emoji}
                    </span>
                    <a
                      href={to}
                      className="flex py-2 hover:underline hover:bg-gray-100 rounded-lg h-14 w-14 items-center justify-center "
                    >
                      <ChevronDownIcon className="mx-auto animate-bounce h-4 w-4" />
                    </a>
                  </h2>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
