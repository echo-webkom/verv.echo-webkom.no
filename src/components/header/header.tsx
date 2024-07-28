import { DesktopNavigation } from "./desktop/desktop-navigation";
import { Logo } from "./logo";
import { MobileNavigation } from "./mobile/mobile-navigation";

export const Header = async () => {
  return (
    <div className="border-b-2 bg-transparent">
      <header className="flex min-h-16 w-full items-center px-6 py-4">
        <Logo />

        <div className="hidden flex-1 md:flex">
          <DesktopNavigation />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:hidden">
          <MobileNavigation />
        </div>
      </header>
    </div>
  );
};
