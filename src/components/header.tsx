import Image from "next/image";
import Link from "next/link";

import { auth } from "@/server/auth";
import { LogInButton } from "./log-in-button";
import { LogOutButton } from "./log-out-button";

export const Header = async () => {
  const { user } = await auth();

  return (
    <div className="mb-10 border-b">
      <header className="container flex items-center justify-between p-4">
        <div>
          <Link href="/">
            <Image src="/images/echo_liggende_variant.png" alt="Logo" width={180} height={180} />
          </Link>
        </div>

        <div>
          <ul className="flex items-center gap-4">
            {user ? (
              <>
                <li>
                  <Link className="hover:text-blue-500 hover:underline" href="/profil">
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
                  <LogInButton />
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};
