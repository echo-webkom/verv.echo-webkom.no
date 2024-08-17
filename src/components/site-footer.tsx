import Image from "next/image";
import Link from "next/link";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

import { auth } from "@/lib/auth/lucia";
import { SignInButton, SignOutButton } from "./site-footer-client";

export async function SiteFooter() {
  const user = await auth();

  return (
    <footer className="space-y-6 border-t-2 border-black bg-[#ffeabb] py-8">
      <div className="mx-auto flex w-full max-w-3xl justify-between px-6 py-8">
        <div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h2 className="mb-2 text-lg font-bold uppercase">Internt</h2>

              <ul>
                <li>
                  <Link className="hover:underline" href="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold uppercase">Bruker</h2>

              <ul>
                {user && (
                  <>
                    <li>
                      <Link className="hover:underline" href="/profil">
                        Min profil
                      </Link>
                    </li>
                    <li>
                      <SignOutButton />
                    </li>
                  </>
                )}

                {!user && (
                  <li>
                    <SignInButton />
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold uppercase">Annet</h2>

              <ul>
                <li>
                  <Link className="hover:underline" href="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex h-fit items-center gap-4">
          <a href="https://instagram.com/echo_uib" target="_blank" rel="noopener noreferrer">
            <InstagramLogoIcon className="h-7 w-7" />
          </a>
          <a href="https://github.com/echo-webkom" target="_blank" rel="noopener noreferrer">
            <GitHubLogoIcon className="h-7 w-7" />
          </a>
          <a href="https://echo.uib.no">
            <Image
              src="/images/echo-logo.png"
              alt="echo logo"
              className="my-auto h-8 w-auto brightness-0 grayscale"
              height={100}
              width={100}
              quality={100}
            />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-sm font-medium text-gray-800">
          Laget med ❤️ av{" "}
          <a
            href="https://echo-webkom.no"
            className="underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            echo Webkom
          </a>
        </p>
      </div>
    </footer>
  );
}
