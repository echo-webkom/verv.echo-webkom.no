import { APPLICATION_DEADLINE } from "@/lib/constants";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

const groups = [
  {
    to: "/webkom",
    name: "💻 Webkom",
  },
  {
    to: "/bedkom",
    name: "👔 Bedkom",
  },
  {
    to: "/tilde",
    name: "🥳 Tilde",
  },
  {
    to: "/makerspace",
    name: "⚒️ Makerspace",
  },
  {
    to: "/hyggkom",
    name: "🫶🏻 Hyggkom",
  },
  {
    to: "/gnist",
    name: "✨ Gnist",
  },
  {
    to: "/esc",
    name: "🏟️ ESC",
  },
  {
    to: "/programmerbar",
    name: "🍻 Programmerbar",
  },
];

export default function Home() {
  const isLastDay = new Date().getDate() === APPLICATION_DEADLINE.getDate();

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      {isLastDay && (
        <h2 className="text-4xl mb-6 py-10 text-center max-w-sm mx-auto px-3">
          Fristen går ut <span className="font-bold">i kveld</span>. Husk å
          søke!
        </h2>
      )}

      <div className="text-center flex flex-col gap-4 pt-12 pb-24">
        <Image
          src="/images/echo-logo.png"
          className="mx-auto"
          width={200}
          height={200}
          alt="echo logo"
          quality={100}
        />

        <h1 className="text-4xl md:text-5xl font-bold">Søk verv i echo!</h1>

        <p className="text-lg">
          echo har nå åpnet for søknader til verv i alle gruppene våre.
          Søknadsfristen er 10. september. Det er lov å søke på flere grupper!
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
          {groups.map(({ to, name }) => {
            const emoji = name.split(" ")[0];
            const title = name.split(" ")[1];

            return (
              <li key={name} className="py-6 flex flex-row items-center">
                <a href={to} className="flex-1">
                  <h2 className="group text-2xl font-bold">
                    <span aria-hidden="true">{emoji}</span>
                    <span className="group-hover:underline ml-2">{title}</span>
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
          })}
        </ul>
      </div>
    </main>
  );
}
