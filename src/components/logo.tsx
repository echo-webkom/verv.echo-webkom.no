"use client";

import { useState, useEffect } from "react";
import { CrazyStepped } from "./icons/echo-bekk";

export const Logo = () => {
  const [step, setStep] = useState(7);

  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.scrollY;

      if (yOffset < 20) {
        setStep(7);
      } else if (yOffset < 30) {
        setStep(6);
      } else if (yOffset < 40) {
        setStep(5);
      } else if (yOffset < 60) {
        setStep(4);
      } else if (yOffset < 80) {
        setStep(3);
      } else if (yOffset < 100) {
        setStep(2);
      } else {
        setStep(1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <CrazyStepped step={step} className="h-20 w-20" />;
};
