import { getSession } from "@/lib/session";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <>
      {session && (
        <div className="bg-[#ffeabb] py-2">
          <p className="text-center text-sm font-bold">
            Du er logget inn som {session.user.name}
          </p>
        </div>
      )}

      <header className="sticky top-0 bg-white mx-auto max-w-3xl w-full flex p-5 justify-between items-center">
        <a href="/">
          <Image
            src="/images/echo-logo.png"
            alt="echo logo"
            width={50}
            height={50}
          />
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
      </header>
    </>
  );
}
