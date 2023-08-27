import { getUser } from "@/lib/session";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SignInButton, SignOutButton } from "./site-footer-client";

export async function SiteFooter() {
  const user = await getUser();

  return (
    <footer className="bg-[#ffeabb] py-8 space-y-6">
      <div className="max-w-3xl w-full mx-auto px-6 py-8 flex justify-between">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h2 className="font-bold text-lg uppercase mb-2">Internt</h2>

              <ul>
                <li>
                  <Link className="hover:underline" href="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg uppercase mb-2">Bruker</h2>

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
              <h2 className="font-bold text-lg uppercase mb-2">Annet</h2>

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
          <a
            href="https://instagram.com/echo_uib"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon className="h-7 w-7" />
          </a>
          <a
            href="https://github.com/echo-webkom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="h-7 w-7" />
          </a>
        </div>
      </div>

      <div className="flex flex-col text-center sm:flex-row justify-between px-6 max-w-2xl gap-2 mx-auto">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Logo inspirert{" "}
            <a
              href="https://bekk.no/"
              className="underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bekk
            </a>{" "}
            sin nye logo 🫶🏻
          </p>
        </div>

        <div>
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
      </div>
    </footer>
  );
}
