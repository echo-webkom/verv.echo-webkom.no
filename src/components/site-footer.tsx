import { getUser } from "@/lib/session";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { SignInButton, SignOutButton } from "./site-footer-client";

export async function SiteFooter() {
  const user = await getUser();

  return (
    <footer className="bg-[#ffeabb] py-8">
      <div className="max-w-3xl w-full mx-auto px-6 py-8 flex justify-between items-center">
        <div>
          <div className="flex">
            <div>
              <h2 className="font-bold uppercase mb-2">Internt</h2>

              <ul className="text-sm">
                {user && (
                  <>
                    <li>
                      <Link className="hover:underline" href="/dashboard">
                        Dashboard
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
          </div>
        </div>

        <div className="flex items-center gap-4">
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
      <div>
        <p className="text-sm font-medium text-center text-gray-800">
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
    </footer>
  );
}
