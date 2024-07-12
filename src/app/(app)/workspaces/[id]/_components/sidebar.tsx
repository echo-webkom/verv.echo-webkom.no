"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Cog, Home, List, Users2 } from "lucide-react";

import { cn } from "@/lib/cn";

const items = [
  {
    name: "Generelt",
    to: "/workspaces/{{workspace.id}}",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Skjemaer",
    to: "/workspaces/{{workspace.id}}/forms",
    icon: <List className="h-4 w-4" />,
  },
  {
    name: "Medlemmer",
    to: "/workspaces/{{workspace.id}}/members",
    icon: <Users2 className="h-4 w-4" />,
  },
  {
    name: "Innstillinger",
    to: "/workspaces/{{workspace.id}}/settings",
    icon: <Cog className="h-4 w-4" />,
  },
];

type SidebarProps = {
  workspaceId: string;
};

export const Sidebar = ({ workspaceId }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      className="flex w-full max-w-[270px] flex-col border-r-2"
      initial={{ width: 270, paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24 }}
      animate={{
        width: isCollapsed ? 70 : 270,
        paddingLeft: isCollapsed ? 12 : 24,
        paddingRight: isCollapsed ? 12 : 24,
      }}
    >
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              href={item.to.replace("{{workspace.id}}", workspaceId)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-6 py-2 font-medium text-foreground-muted transition-colors hover:bg-gray-100 hover:text-foreground-muted-hover",
                {
                  "mx-auto h-10 w-10 justify-center p-0": isCollapsed,
                },
              )}
            >
              <span>{item.icon}</span>
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                hidden={isCollapsed}
              >
                {item.name}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "mt-auto flex items-center justify-center gap-2 rounded-lg p-2 font-medium text-foreground-muted transition-colors hover:bg-gray-100 hover:text-foreground-muted-hover",
          {
            "mx-auto h-10 w-10 justify-center": isCollapsed,
          },
        )}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            Kollaps
          </>
        )}
      </button>
    </motion.div>
  );
};
