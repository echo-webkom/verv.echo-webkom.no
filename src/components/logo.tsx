"use client";

import { useState, useEffect } from "react";
import { CrazyStepped } from "./icons/echo-bekk";

const getStep = (yOffset: number) => {
  if (yOffset < 20) {
    return 7;
  } else if (yOffset < 30) {
    return 6;
  } else if (yOffset < 40) {
    return 5;
  } else if (yOffset < 60) {
    return 4;
  } else if (yOffset < 80) {
    return 3;
  } else if (yOffset < 100) {
    return 2;
  } else {
    return 1;
  }
};

export const Logo = () => {
  const [step, setStep] = useState(7);

  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.scrollY;

      setStep(getStep(yOffset));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <CrazyStepped step={step} className="h-20 w-20" />;
};
