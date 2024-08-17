"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AvatarIcon,
  ExitIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOutAction } from "@/actions/sign-out";
import { User } from "lucia";

type ProfileIconProps = {
  user: User;
};

export const ProfileIcon = ({ user }: ProfileIconProps) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <AvatarIcon className="h-7 w-7" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mx-3 w-56">
        <DropdownMenuLabel>
          <p className="font-normal">Logget inn som</p>
          <p className="font-bold">{user.name}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profil">
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Min profil</span>
          </Link>
        </DropdownMenuItem>

        {/* {Boolean(user?.groupsMemberships.length) && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LockClosedIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </>
        )} */}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            className="w-full"
            onClick={async () => await signOutAction(pathname)}
          >
            <ExitIcon className="mr-2 h-4 w-4" />
            <span>Logg ut</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};