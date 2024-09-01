"use client";

import { useEffect, useState } from "react";

import { APPLICATION_DEADLINE } from "@/lib/constants";

export const Countdown = () => {
  const [now, setNow] = useState(new Date());
  const diff = APPLICATION_DEADLINE.getTime() - now.getTime();

  const isOver = diff < 0;

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border p-6 shadow-lg"
      suppressHydrationWarning
    >
      {isOver ? (
        <h1 className="text-center text-2xl font-bold">Søknadsfristen er over</h1>
      ) : (
        <h1 className="mb-4 text-center text-2xl font-bold">Søknadsfristen nærmer seg...</h1>
      )}

      {!isOver && (
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold">{hours}</span>
            <span>timer</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold">{minutes}</span>
            <span>minutter</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold">{seconds}</span>
            <span>sekunder</span>
          </div>
        </div>
      )}
    </div>
  );
};
