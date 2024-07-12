import { auth } from "@/server/auth";
import { AuthButton } from "./auth-button";
import { HeaderLink } from "./header-link";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { NavigationItem } from "./navigation-item";

export const Header = async () => {
  const { user } = await auth();

  const isSignedIn = Boolean(user);

  return (
    <div className="border-b-2">
      <header className="flex items-center justify-between px-6 py-2">
        <Logo />

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