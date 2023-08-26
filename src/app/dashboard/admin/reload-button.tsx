"use client";

import { Button } from "@/components/ui/button";
import { useDelayedAnimation } from "@/hooks/use-delayed-animation";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const ReloadButton = () => {
  const router = useRouter();
  const [animate, startAnimation] = useDelayedAnimation(400);

  const handleReload = () => {
    startAnimation();
    router.refresh();
  };

  return (
    <Button onClick={handleReload} disabled={animate}>
      <span className="sr-only">Reload</span>
      <ReloadIcon
        className={cn("w-4 h-4", {
          "animate-spin duration-700": animate,
        })}
      />
    </Button>
  );
};
