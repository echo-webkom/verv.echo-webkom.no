import { auth } from "@/server/auth";
import { AuthButton } from "../auth-button";
import { HeaderLink } from "./header-link";
import { Navigation } from "./navigation";
import { NavigationItem } from "./navigation-item";

export const DesktopNavigation = async () => {
  const { user } = await auth();

  const isSignedIn = Boolean(user);

  return (
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
  );
};
