"use client";

import { useRef } from "react";
import { ChevronRightIcon } from "lucide-react";
import { motion, useInView } from "motion/react";

type GroupLinkProps = {
  emoji: string;
  name: string;
  to: string;
};

export const GroupLink = ({ emoji, name, to }: GroupLinkProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.li
      ref={ref}
      key={to}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
      transition={{
        delay: 0.1,
        duration: 0.2,
      }}
      className="flex flex-row items-center py-6"
    >
      <a href={to} className="flex-1">
        <h2 className="group text-2xl font-bold">
          <span aria-hidden="true">{emoji}</span>
          <span className="ml-2 group-hover:underline">{name}</span>
        </h2>
      </a>

      <a
        href={to}
        className="flex h-14 w-14 items-center justify-center rounded-lg py-2 hover:bg-gray-100 hover:underline"
      >
        <ChevronRightIcon />
      </a>
    </motion.li>
  );
};
