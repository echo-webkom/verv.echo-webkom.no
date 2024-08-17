import { ChevronRightIcon } from "lucide-react";

type GroupLinkProps = {
  emoji: string;
  name: string;
  to: string;
};

export const GroupLink = ({ emoji, name, to }: GroupLinkProps) => {
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
