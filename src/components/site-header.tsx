import { getSession } from "@/lib/session";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Logo } from "./logo";
import { APPLICATION_DEADLINE } from "@/lib/constants";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <>
      {session && (
        <div className="z-30 bg-[#ffeabb] py-2">
          <p className="text-center text-sm font-bold">
            Du er logget inn som {session.user.name}
          </p>
        </div>
      )}

      {/* Don't remove "h-20". It fixes header flicker for some reason */}
      <header className="z-30 sticky top-0 bg-white h-20">
        {new Date() > APPLICATION_DEADLINE && (
          <div className="bg-[#ff9b9b] py-2">
            <p className="text-center text-sm font-bold">
              Søknadsfristen for høstsemesteret 2023 har gått ut.
            </p>
          </div>
        )}

        <div className="mx-auto max-w-3xl w-full flex p-5 justify-between">
          <a href="/" className="flex flex-col">
            <Logo />
          </a>

          <nav>
            <ul className="flex">
              <li>
                <a
                  className="underline inline-flex items-center gap-1 hover:no-underline"
                  href="https://echo.uib.no/"
                >
                  <span>echo.uib.no</span>
                  <span>
                    <ExternalLinkIcon />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
