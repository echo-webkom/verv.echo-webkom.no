"use client";

import Image from "next/image";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";

import { FancyLink } from "@/components/fancy-link";
import { FlipWords } from "@/components/flip-words";
import { GroupLink } from "@/components/group-link";

const groups = [
  "Webkom",
  "Bedkom",
  "Consulting",
  "ESC",
  "Gnist",
  "Hyggkom",
  "Makerspace",
  "Programmerbar",
  "Tilde",
].map((group) => group + "!");

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6">
      <section className="mt-12 mb-32 flex flex-col gap-4 text-center">
        <Image
          src="/images/echo-logo.png"
          className="z-10 mx-auto"
          width={180}
          height={180}
          alt="echo logo"
          quality={100}
        />

        <h1 className="mb-8 space-y-3 text-5xl font-bold text-neutral-800 md:text-6xl">
          <span className="text-4xl">Søk verv i</span> <br />
          <FlipWords words={groups} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.2,
            duration: 0.3,
          }}
          className="text-xl font-medium text-neutral-700"
        >
          echo har nå åpnet for søknader til verv. Søknadsfristen er 1. september. Det er lov å søke
          på flere grupper!
        </motion.p>
      </section>

      <section className="mb-14">
        <div className="mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.1,
              duration: 0.2,
            }}
            className="mb-2 text-center text-3xl font-bold"
          >
            Våre undergrupper
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.1,
              duration: 0.2,
            }}
            className="text-center text-gray-700"
          >
            Trykk på en av undergruppene for å lære mer.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.1,
            duration: 0.2,
          }}
          className="mx-auto h-6 w-6 animate-bounce"
        >
          <ChevronDownIcon />
        </motion.div>

        <ul className="divide-y">
          <GroupLink emoji="💻" name="Webkom" to="/webkom" />
          <GroupLink emoji="👔" name="Bedkom" to="/bedkom" />
          <GroupLink emoji="🤝🏻" name="Consulting" to="/consulting" />
          <GroupLink emoji="🏟️" name="ESC" to="/esc" />
          <GroupLink emoji="✨" name="Gnist" to="/gnist" />
          <GroupLink emoji="🫶🏻" name="Hyggkom" to="/hyggkom" />
          <GroupLink emoji="🛠️" name="Makerspace" to="/makerspace" />
          <GroupLink emoji="🍻" name="Programmerbar" to="/programmerbar" />
          <GroupLink emoji="🥳" name="Tilde" to="/tilde" />
        </ul>
      </section>

      <section className="mb-14">
        <FancyLink href="/faq" className="my-4">
          Ofte stilte spørsmål
        </FancyLink>
      </section>
    </main>
  );
}
