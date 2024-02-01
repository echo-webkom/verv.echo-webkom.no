import { getSession, getUser } from "@/lib/session";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { APPLICATION_DEADLINE } from "@/lib/constants";
import Image from "next/image";
import { ProfileIcon } from "./profile-icon";

export async function SiteHeader() {
  const user = await getUser();

  return (
    <>
      {user && (
        <div className="z-30 bg-[#ffeabb] py-2">
          <p className="text-center text-sm font-bold">
            Du er logget inn som {user.name}
          </p>
        </div>
      )}

      {/* Don't remove "h-20". It fixes header flicker for some reason */}
      <header className="z-30 sticky top-0 bg-white">
        <div className="mx-auto max-w-3xl w-full flex px-6 py-3 justify-between items-center">
          <a href="/">
            <span className="sr-only">Hjem</span>
            <Image
              src="/images/echo-logo.png"
              alt="echo logo"
              width={75}
              height={75}
              className="h-12 w-12"
              quality={100}
            />
          </a>

          <nav>
            <ul className="flex">
              <li>
                {user ? (
                  <ProfileIcon user={user} />
                ) : (
                  <a href="/logg-inn" className="hover:underline">
                    Logg inn
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
