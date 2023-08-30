import { getUser } from "@/lib/session";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SignInButton, SignOutButton } from "./site-footer-client";
import Image from "next/image";

export async function SiteFooter() {
  const user = await getUser();

  return (
    <footer className="bg-[#ffeabb] py-8 space-y-6 border-t-2 border-black">
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
          <a href="https://echo.uib.no">
            <Image
              src="/images/echo-logo.png"
              alt="echo logo"
              className="h-8 my-auto w-auto grayscale brightness-0"
              height={100}
              width={100}
              quality={100}
            />
          </a>
        </div>
      </div>

      <div className="text-center max-w-2xl px-6 mx-auto">
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
