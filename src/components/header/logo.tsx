import Image from "next/image";
import Link from "next/link";

import echoLogo from "@/assets/images/echo-logo.png";

export const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image className="h-14 w-14 brightness-0" src={echoLogo} alt="echo logo" />
      </Link>
    </div>
  );
};
