"use client";

import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useDelayedAnimation } from "@/hooks/use-delayed-animation";
import { cn } from "@/lib/utils";

export const ReloadButton = () => {
  const router = useRouter();
  const [animate, startAnimation] = useDelayedAnimation(400);

  const handleReload = () => {
    startAnimation();
    router.refresh();
  };

  return (
    <Button size="icon" onClick={handleReload} disabled={animate}>
      <span className="sr-only">Reload</span>
      <ReloadIcon
        className={cn("size-4", {
          "animate-spin duration-700": animate,
        })}
      />
    </Button>
  );
};
