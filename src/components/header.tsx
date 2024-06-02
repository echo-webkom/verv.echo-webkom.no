import Link from "next/link";

import { auth } from "@/server/auth";
import { LogOutButton } from "./log-out-button";

export const Header = async () => {
  const { user } = await auth();

  return (
    <div className="mb-10 border-b">
      <header className="container flex items-center justify-between p-4">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">verv</h1>
          </Link>
        </div>

        <div>
          <ul className="flex items-center gap-4">
            {user ? (
              <>
                <li>
                  <Link className="text-blue-500 hover:underline" href="/profil">
                    Profil
                  </Link>
                </li>
                <li>
                  <LogOutButton />
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/auth/feide" className="text-blue-500 hover:underline">
                    Logg inn
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};
