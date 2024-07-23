import { auth } from "@/server/auth";
import { AuthButton } from "./auth-button";
import { HeaderLink } from "./header-link";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { NavigationItem } from "./navigation-item";

type HeaderProps = {
  hideLogo?: boolean;
};

export const Header = async ({ hideLogo }: HeaderProps) => {
  const { user } = await auth();

  const isSignedIn = Boolean(user);

  return (
    <div className="border-b-2">
      <header className="flex min-h-16 w-full items-center px-6 py-4">
        {!hideLogo && <Logo />}

        <Navigation>
          <NavigationItem show={isSignedIn}>
            <HeaderLink to="/dashboard">Dashboard</HeaderLink>
          </NavigationItem>
          <NavigationItem show={isSignedIn}>
            <HeaderLink to="/profil">Min profil</HeaderLink>
          </NavigationItem>
          <NavigationItem show={isSignedIn}>
            <AuthButton action="sign-out" />
          </NavigationItem>
          <NavigationItem show={!isSignedIn}>
            <AuthButton action="sign-in" />
          </NavigationItem>
        </Navigation>
      </header>
    </div>
  );
};
