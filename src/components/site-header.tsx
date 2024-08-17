import Image from "next/image";

import { auth } from "@/lib/auth/lucia";
import { APPLICATION_DEADLINE } from "@/lib/constants";
import { ProfileIcon } from "./profile-icon";

export async function SiteHeader() {
  const user = await auth();

  return (
    <>
      {user && (
        <div className="z-30 bg-[#ffeabb] py-2">
          <p className="text-center text-sm font-bold">Du er logget inn som {user.name}</p>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b backdrop-blur-xl">
        {new Date() > APPLICATION_DEADLINE && (
          <div className="bg-[#ff9b9b] py-2">
            <p className="text-center text-sm font-bold">
              Søknadsfristen for vårsemesteret 2024 har gått ut.
            </p>
          </div>
        )}

        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-3">
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
