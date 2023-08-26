import { ChevronDownIcon } from "@radix-ui/react-icons";

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
    to: "makerspace",
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
    to: "/bar",
    name: "🍻 Programmerbar",
  },
];

export default function Home() {
  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <div className="text-center flex flex-col gap-4 pt-12 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold">Søk verv i echo!</h1>

        <p className="text-lg">
          Echo har nå åpnet for søknader til verv i alle gruppene våre.
          Søknadsfristen er 3. september. Det er lov å søke på flere grupper!
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-4">
          Våre undergrupper
        </h2>

        <ChevronDownIcon className="mx-auto animate-bounce h-6 w-6" />

        <ul className="divide-y">
          {groups.map(({ to, name }) => (
            <li key={name} className="py-6 flex flex-col">
              <h2 className="text-2xl font-bold">{name}</h2>

              <a href={to} className="text-lg py-2 hover:underline">
                Les mer om {name.split(" ")[1]} &rarr;
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
